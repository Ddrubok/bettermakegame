// Maintainer-only. Assertions run here; candidate code runs in a separate process.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Candidate } from './sandbox.mjs';

const expected = Object.freeze({ R01: 5, E01: 4, J01: 5 });
export async function score(id, file, options = {}) {
  if (!Object.hasOwn(expected, id)) throw new Error('Unknown case');
  const { checks } = await import(`./judge/${id}.mjs`);
  if (checks.length !== expected[id] || new Set(checks.map(c => c.name)).size !== expected[id]) {
    throw new Error('Invalid judge inventory');
  }
  const source = await readFile(resolve(file));
  const result = { case: id, status: 'FAIL', mode: options.trustedLocal ? 'trusted-local' : 'docker',
    candidate_sha256: createHash('sha256').update(source).digest('hex'),
    expected: checks.map(c => c.name), completed: [], checks: [], errors: [] };
  let candidate;
  try {
    candidate = await Candidate.start(source, options);
    for (const check of checks) {
      try {
        await check.run(candidate);
        result.checks.push({ name: check.name, status: 'PASS' });
      } catch (error) {
        result.checks.push({ name: check.name, status: candidate.failure ? 'ERROR' : 'FAIL', error: error.message });
        if (candidate.failure) throw error;
      }
      result.completed.push(check.name);
    }
    await candidate.finish();
  } catch (error) {
    result.errors.push(error.message);
  } finally {
    if (candidate) {
      try { await candidate.dispose(); } catch (error) { result.errors.push(error.message); }
    }
  }
  if (!result.errors.length && result.completed.length === expected[id] &&
      result.checks.every(c => c.status === 'PASS')) result.status = 'PASS';
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [id, file, ...flags] = process.argv.slice(2);
    if (!file || !Object.hasOwn(expected, id) || flags.some(f => f !== '--trusted-local') || flags.length > 1) {
      throw new Error('Usage: node evals/comparison/score.mjs R01|E01|J01 candidate.mjs [--trusted-local]');
    }
    const result = await score(id, file, { trustedLocal: flags.includes('--trusted-local') });
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    process.exitCode = result.status === 'PASS' ? 0 : 1;
  } catch (error) {
    process.stderr.write(error.message + '\n');
    process.exitCode = 1;
  }
}
