import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, copyFile, rm, chmod } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, basename, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { StringDecoder } from 'node:string_decoder';

export const IMAGE = 'node:22.22.0-bookworm-slim@sha256:dd9d21971ec4395903fa6143c2b9267d048ae01ca6d3ea96f16cb30df6187d94';
const worker = fileURLToPath(new URL('./candidate-worker.mjs', import.meta.url));
const maxOutput = 1024 * 1024;

export function minimalEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([key]) =>
    ['systemroot', 'windir', 'temp', 'tmp'].includes(key.toLowerCase())));
}

export function dockerArgs(directory, name) {
  return ['run', '--rm', '-i', '--pull=never', '--name', name,
    '--network=none', '--read-only', '--cap-drop=ALL', '--security-opt=no-new-privileges',
    '--user=65534:65534', '--pids-limit=32', '--memory=128m', '--memory-swap=128m', '--cpus=1',
    '--ulimit=nofile=64:64', '--log-driver=none', '--workdir=/work',
    '--mount', `type=bind,source=${directory},target=/work,readonly`,
    '--entrypoint=node', IMAGE, '--max-old-space-size=64',
    '/work/worker.mjs', '/work/candidate.mjs'];
}

export class Candidate {
  static async start(source, options = {}) {
    const candidate = new Candidate();
    try {
      await candidate.launch(source, options);
      return candidate;
    } catch (error) {
      await candidate.dispose();
      throw error;
    }
  }

  async launch(source, { trustedLocal = false, timeoutMs = 10000 } = {}) {
    if (!Number.isInteger(timeoutMs) || timeoutMs < 50 || timeoutMs > 60000) throw new Error('Invalid timeout');
    if (source.length > 1024 * 1024) throw new Error('Candidate exceeds 1 MiB');
    if (!trustedLocal) {
      const info = spawnSync('docker', ['info', '--format', '{{.OSType}}'],
        { encoding: 'utf8', timeout: 5000, maxBuffer: maxOutput, windowsHide: true });
      if (info.error || info.status !== 0 || info.stdout.trim() !== 'linux') {
        throw new Error('Linux Docker unavailable; candidate NOT EXECUTED. See evals/comparison/README.md.');
      }
      const image = spawnSync('docker', ['image', 'inspect', IMAGE],
        { timeout: 5000, maxBuffer: maxOutput, windowsHide: true, stdio: 'ignore' });
      if (image.error || image.status !== 0) {
        throw new Error(`Pinned image missing; candidate NOT EXECUTED. Prepare with: docker pull ${IMAGE}`);
      }
    }
    this.directory = await mkdtemp(join(tmpdir(), 'bmg-score-'));
    await writeFile(join(this.directory, 'candidate.mjs'), source, { mode: 0o644 });
    await copyFile(worker, join(this.directory, 'worker.mjs'));
    // Linux mkdtemp is 0700; the unprivileged container user needs traversal.
    if (!trustedLocal) {
      await chmod(this.directory, 0o755);
      await chmod(join(this.directory, 'worker.mjs'), 0o644);
      this.container = `bmg-score-${randomUUID()}`;
    }
    this.sequence = 0;
    this.bytes = 0;
    this.buffer = '';
    this.decoder = new StringDecoder('utf8');
    this.closed = false;
    const ready = new Promise((resolve, reject) => { this.pending = { id: 0, resolve, reject }; });
    const args = trustedLocal
      ? ['--permission', `--allow-fs-read=${this.directory}`, '--max-old-space-size=64',
        join(this.directory, 'worker.mjs'), join(this.directory, 'candidate.mjs')]
      : dockerArgs(this.directory, this.container);
    this.child = spawn(trustedLocal ? process.execPath : 'docker', args, {
      cwd: this.directory, env: trustedLocal ? minimalEnv() : process.env,
      stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true,
    });
    this.exit = new Promise(resolve => {
      this.child.on('error', error => this.fail(new Error(`Candidate launch failed: ${error.message}`)));
      this.child.on('close', (code, signal) => {
        this.closed = true;
        this.exitCode = code;
        this.buffer += this.decoder.end();
        clearTimeout(this.timer);
        if (!this.finishing || this.pending || code !== 0 || this.buffer.length) {
          this.fail(new Error(`Candidate exited before verified completion (code ${code}, signal ${signal})`));
        }
        resolve();
      });
    });
    this.child.stdin.on('error', error => this.fail(new Error(`Candidate input closed: ${error.code}`)));
    this.child.stdout.on('data', chunk => this.receive(chunk));
    this.child.stderr.on('data', chunk => {
      // Count but do not echo arbitrary candidate output (which may contain secrets).
      this.bytes += chunk.length;
      if (this.bytes > maxOutput) this.fail(new Error('Candidate output limit exceeded'));
    });
    this.timer = setTimeout(() => this.fail(new Error('Candidate execution deadline exceeded')), timeoutMs);
    this.onSignal = () => this.fail(new Error('Evaluation interrupted'));
    process.on('SIGINT', this.onSignal);
    process.on('SIGTERM', this.onSignal);
    const message = await ready;
    if (message !== 'ready') throw new Error('Invalid candidate startup');
  }

  fail(error) {
    this.failure ??= error;
    this.pending?.reject(this.failure);
    this.pending = null;
    if (!this.closed) this.child?.kill('SIGKILL');
  }

  receive(chunk) {
    this.bytes += chunk.length;
    if (this.bytes > maxOutput) return this.fail(new Error('Candidate output limit exceeded'));
    this.buffer += this.decoder.write(chunk);
    let index;
    while ((index = this.buffer.indexOf('\n')) >= 0) {
      const line = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + 1);
      try {
        const message = JSON.parse(line);
        if (!message || message.id !== this.pending?.id || typeof message.ok !== 'boolean' ||
            (message.ok ? !Object.hasOwn(message, 'value') : typeof message.error !== 'string')) {
          throw new Error('Unexpected candidate response');
        }
        const pending = this.pending;
        this.pending = null;
        if (message.ok) pending.resolve(message.value);
        else pending.reject(Object.assign(new Error(`Candidate threw: ${message.error.slice(0, 500)}`),
          { candidateException: true }));
      } catch {
        this.fail(new Error('Invalid or unsolicited candidate response'));
      }
    }
  }

  request(request) {
    if (this.failure) return Promise.reject(this.failure);
    if (this.closed || this.pending) return Promise.reject(new Error('Candidate not ready'));
    return new Promise((resolve, reject) => {
      const id = ++this.sequence;
      this.pending = { id, resolve, reject };
      this.child.stdin.write(JSON.stringify({ ...request, id }) + '\n');
    });
  }

  call(path, args = [], handle = 0, options = {}) {
    return this.request({ op: 'call', path, args, handle, ...options });
  }
  construct(path, args = []) { return this.request({ op: 'construct', path, args, retain: true }); }
  get(handle, path) { return this.request({ op: 'get', handle, path }); }

  async finish() {
    this.finishing = true;
    if (await this.request({ op: 'finish' }) !== 'finished') throw new Error('Invalid completion response');
    this.child.stdin.end();
    await this.exit;
    if (this.failure) throw this.failure;
    if (this.exitCode !== 0) throw new Error('Candidate did not exit cleanly');
  }

  async dispose() {
    clearTimeout(this.timer);
    if (this.onSignal) {
      process.off('SIGINT', this.onSignal);
      process.off('SIGTERM', this.onSignal);
    }
    if (this.child && !this.closed) this.child.kill('SIGKILL');
    if (this.child) await this.exit;
    if (this.container) {
      // Killing a docker client does not guarantee the container stopped.
      const removed = spawnSync('docker', ['rm', '-f', this.container],
        { encoding: 'utf8', timeout: 5000, windowsHide: true, maxBuffer: maxOutput });
      if (removed.error || (removed.status !== 0 && !removed.stderr.includes('No such container'))) {
        throw new Error(`Could not confirm cleanup of ${this.container}`);
      }
    }
    if (this.directory) {
      const target = resolve(this.directory);
      if (dirname(target) !== resolve(tmpdir()) || !basename(target).startsWith('bmg-score-')) {
        throw new Error('Refusing cleanup outside scorer temporary directory');
      }
      await rm(target, { recursive: true, force: true });
    }
  }
}
