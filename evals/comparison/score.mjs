// Maintainer-only. Never put this runner or judge files in an agent input folder.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const [id, candidate] = process.argv.slice(2);
if (!['R01', 'E01', 'J01'].includes(id) || !candidate) {
  throw new Error('Usage: node evals/comparison/score.mjs R01|E01|J01 path/to/candidate.mjs');
}
const result = spawnSync(process.execPath, ['--test', fileURLToPath(new URL(`judge/${id}.mjs`, import.meta.url))],
  { encoding: 'utf8', env: { ...process.env, CANDIDATE_FILE: resolve(candidate) } });
if (result.error) throw result.error;
process.stdout.write(result.stdout); process.stderr.write(result.stderr);
process.exitCode = result.status ?? 1;
