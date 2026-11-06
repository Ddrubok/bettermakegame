import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { score } from './score.mjs';
import { Candidate } from './sandbox.mjs';

const here = fileURLToPath(new URL('.', import.meta.url));
const docker = process.env.BMG_DOCKER_TEST === '1';
const options = { trustedLocal: !docker };
const counts = { R01: 5, E01: 4, J01: 5 };
const filenames = { R01: 'controller.mjs', E01: 'impact.mjs', J01: 'jump.mjs' };
const racer = await readFile(join(here, 'runs/2026-11-05/outputs/R01-short/controller.mjs'), 'utf8');

async function fixture(t, source) {
  const directory = await mkdtemp(join(tmpdir(), 'bmg-test-'));
  t.after(async () => {
    assert.equal(dirname(resolve(directory)), resolve(tmpdir()));
    assert.ok(basename(directory).startsWith('bmg-test-'));
    await rm(directory, { recursive: true, force: true });
  });
  const file = join(directory, 'candidate.mjs');
  await writeFile(file, source);
  return { directory, file };
}

for (const id of Object.keys(counts)) {
  for (const condition of ['short', 'skill']) {
    test(`${id}-${condition}: archived output completes exactly ${counts[id]} checks`, async () => {
      const result = await score(id, join(here, `runs/2026-11-05/outputs/${id}-${condition}/${filenames[id]}`), options);
      assert.equal(result.status, 'PASS', JSON.stringify(result));
      assert.equal(result.completed.length, counts[id]);
      assert.deepEqual(result.completed, result.expected);
      assert.ok(result.checks.every(c => c.status === 'PASS'));
    });
  }
  test(`${id}: defective starting input is still rejected`, async () => {
    const result = await score(id, join(here, `inputs/${id}/start.mjs`), options);
    assert.equal(result.status, 'FAIL');
    assert.ok(result.checks.some(c => c.status === 'FAIL'));
  });
}

for (const [name, source] of [
  ['import exits zero', 'export function step() { throw new Error("broken"); } process.exit(0);'],
  ['call exits zero', 'export function step() { process.exit(0); }'],
  ['fake TAP success', 'console.log("TAP version 13\\n1..5\\nok 1\\nok 2\\nok 3\\nok 4\\nok 5"); process.exit(0);'],
  ['unsolicited completion', 'console.log(JSON.stringify({id:99,ok:true,value:"finished"})); process.exit(0);'],
  ['missing export', 'export const unrelated = 1;'],
  ['syntax error', 'export function step( {'],
  ['candidate tampers with assertions', 'import assert from "node:assert/strict"; assert.ok = () => {}; export const step = () => ({speed:999,steering:999});'],
  ['mutates frozen input', 'export function step(state) { state.speed = 0; return state; }'],
  ['nonfinite results cannot become zero through JSON', racer.replace('export function step(', 'function correctStep(') +
    '\nexport function step(...args) { const next = correctStep(...args); if (next.speed === 0) next.speed = NaN; return next; }'],
  ['nonzero exit after correct results', racer + '\nprocess.on("beforeExit", () => process.exit(1));'],
  ['incomplete trailing UTF-8 response', racer + '\nprocess.once("beforeExit", () => process.stdout.write(Buffer.from([0xe2])));'],
]) {
  test(`${name} cannot earn a pass`, async t => {
    const { file } = await fixture(t, source);
    const result = await score('R01', file, options);
    assert.equal(result.status, 'FAIL', JSON.stringify(result));
    if (name === 'import exits zero') assert.equal(result.completed.length, 0);
    if (name === 'call exits zero') assert.equal(result.completed.length, 0);
  });
}

for (const [name, source] of [
  ['import loop', 'while (true) {}'],
  ['call loop', 'export function step() { while (true) {} }'],
  ['dangling timer after correct results', racer + '\nsetInterval(() => {}, 100);'],
]) {
  test(`${name} hits the execution deadline`, async t => {
    const { file } = await fixture(t, source);
    const start = Date.now();
    const result = await score('R01', file, { ...options, timeoutMs: docker ? 3000 : 500 });
    assert.equal(result.status, 'FAIL');
    assert.match(result.errors.join(' '), /deadline/);
    assert.ok(Date.now() - start < 15000);
  });
}

test('output flood is bounded', async t => {
  const { file } = await fixture(t, 'process.stdout.write("x".repeat(2 * 1024 * 1024));');
  const result = await score('R01', file, options);
  assert.equal(result.status, 'FAIL');
  assert.match(result.errors.join(' '), /output limit/);
});

test('unavailable Docker refuses execution without a local fallback', async t => {
  const { file } = await fixture(t, racer);
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.toLowerCase() !== 'path'));
  env.PATH = '/nonexistent-bmg-tools';
  const result = spawnSync(process.execPath, [join(here, 'score.mjs'), 'R01', file],
    { encoding: 'utf8', env, timeout: 10000, windowsHide: true });
  assert.equal(result.status, 1);
  const report = JSON.parse(result.stdout);
  assert.equal(report.status, 'FAIL');
  assert.equal(report.completed.length, 0);
  assert.match(report.errors[0], /NOT EXECUTED/);
});

test('environment and external file probes use fake data only', async t => {
  const { directory } = await fixture(t, '');
  const secret = join(directory, 'fake-secret.txt');
  const output = join(directory, 'escape.txt');
  await writeFile(secret, 'fake-only');
  const previous = process.env.BMG_FAKE_SECRET;
  process.env.BMG_FAKE_SECRET = 'fake-only';
  t.after(() => { if (previous === undefined) delete process.env.BMG_FAKE_SECRET; else process.env.BMG_FAKE_SECRET = previous; });
  const source = `import fs from 'node:fs';
    export function probe(secret, output) {
      const attempt = fn => { try { fn(); return 'allowed'; } catch { return 'denied'; } };
      return { env: process.env.BMG_FAKE_SECRET ?? null,
        read: attempt(() => fs.readFileSync(secret)), write: attempt(() => fs.writeFileSync(output, 'fake-only')),
        selfWrite: attempt(() => fs.appendFileSync(new URL(import.meta.url), '// modification')) };
    }`;
  const candidate = await Candidate.start(Buffer.from(source), options);
  try {
    assert.deepEqual(await candidate.call('probe', [secret, output]),
      { env: null, read: 'denied', write: 'denied', selfWrite: 'denied' });
    await candidate.finish();
  } finally { await candidate.dispose(); }
  assert.equal(await readFile(secret, 'utf8'), 'fake-only');
  await assert.rejects(readFile(output), { code: 'ENOENT' });
});

test('Docker has no egress, elevated capabilities or judge files', { skip: !docker }, async () => {
  const source = `import fs from 'node:fs'; import os from 'node:os'; import net from 'node:net';
    export async function probe() {
      const network = await new Promise(resolve => {
        const socket = net.connect({ host: '192.0.2.1', port: 9 });
        socket.on('connect', () => { socket.destroy(); resolve('connected'); });
        socket.on('error', e => resolve(e.code));
        socket.setTimeout(500, () => { socket.destroy(); resolve('timeout'); });
      });
      return { uid: process.getuid(), interfaces: Object.keys(os.networkInterfaces()), network,
        files: fs.readdirSync('/work'), status: fs.readFileSync('/proc/self/status', 'utf8') };
    }`;
  const candidate = await Candidate.start(Buffer.from(source));
  try {
    const result = await candidate.call('probe');
    assert.equal(result.uid, 65534);
    assert.deepEqual(result.interfaces, ['lo']);
    assert.equal(result.network, 'ENETUNREACH');
    assert.deepEqual(result.files.sort(), ['candidate.mjs', 'worker.mjs']);
    assert.match(result.status, /CapEff:\s+0+\n/);
    assert.match(result.status, /NoNewPrivs:\s+1\n/);
    await candidate.finish();
  } finally { await candidate.dispose(); }
});

test('interrupt stops the candidate and prevents further requests', async () => {
  const candidate = await Candidate.start(Buffer.from('export const probe = () => 1;'), options);
  try {
    process.emit('SIGTERM');
    await assert.rejects(candidate.call('probe'), /interrupted/);
  } finally { await candidate.dispose(); }
});
