// Maintainer-only: construct six disjoint task folders, without judge/answers.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const here = fileURLToPath(new URL('.', import.meta.url));
if (!process.argv[2]) throw new Error('Usage: node evals/comparison/prepare.mjs NEW_OUTPUT_DIRECTORY');
const output = resolve(process.argv[2]);
if (existsSync(output)) throw new Error('Output must be a new directory; never overwrites an existing run');
const runtime = resolve(here, '../../skills/bettermakegame');
const sha = p => createHash('sha256').update(readFileSync(p)).digest('hex');
function files(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? files(join(root, entry.name)) : [join(root, entry.name)]);
}
const manifest = { status: 'PREPARED; model evaluation NOT RUN',
  base_commit: '1ad3281d55ec5702325b57faf4a41cef2101382e',
  conditions: ['short', 'skill'], input_hashes: {},
  runtime_hashes: Object.fromEntries(files(runtime).map(p => [relative(runtime, p).replaceAll('\\', '/'), sha(p)])),
  limitations: ['Fresh conversations required; file separation is not an OS sandbox',
    'Judge files are intentionally withheld, but public fixtures and familiar cases prevent a claim of novel/blind research',
    'One run per condition/case; no general improvement-rate estimate'], sessions: [] };
const brief = 'Diagnose the actual cause before adding polish. Make the smallest scoped repair, preserve unrelated rules, check boundaries and lifecycle, and report only checks actually run.\n';
// Validate all source inputs before creating any output folder.
for (const id of ['R01', 'E01', 'J01']) {
  const input = join(here, 'inputs', id);
  manifest.input_hashes[id] = { source: sha(join(input, 'start.mjs')), task: sha(join(input, 'task.md')) };
}
mkdirSync(output, { recursive: true });
for (const [id, filename] of [['R01', 'controller.mjs'], ['E01', 'impact.mjs'], ['J01', 'jump.mjs']]) {
  const input = join(here, 'inputs', id);
  for (const condition of ['short', 'skill']) {
    const folder = join(output, `${id}-${condition}`); mkdirSync(folder);
    cpSync(join(input, 'start.mjs'), join(folder, filename));
    cpSync(join(input, 'task.md'), join(folder, 'TASK.md'));
    writeFileSync(join(folder, 'GUIDANCE.md'), condition === 'short' ? brief :
      'Read skill/SKILL.md and only its relevant references, then apply them to TASK.md.\n');
    if (condition === 'skill') cpSync(runtime, join(folder, 'skill'), { recursive: true });
    manifest.sessions.push({ id, condition, folder: `${id}-${condition}`, filename });
  }
}
writeFileSync(join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ output, sessions: manifest.sessions.length, judge_files_copied: 0 }));
