// Maintainer-only: judge outputs after all sessions finish; never supply this as task input.
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { score } from './judge/P01.mjs';
const suite = path.dirname(fileURLToPath(import.meta.url));
const runs = path.resolve(process.argv[2] || path.join(suite, 'runs'));
const require = createRequire(path.join(path.resolve(process.env.VFX_TOOL_ROOT || suite), 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ ...(process.env.VFX_BROWSER_PATH ? { executablePath: process.env.VFX_BROWSER_PATH } : {}), headless: true });
const results = {};
try {
  for (const name of ['baseline', 'P01-short', 'P01-skill']) {
    const file = name === 'baseline' ? path.join(suite, 'inputs/P01/index.html') : path.join(runs, name, 'index.html');
    const page = await browser.newPage();
    await page.goto(pathToFileURL(file).href);
    try { results[name] = { status: 'PASS', checks: await score(page) }; }
    catch (error) { results[name] = { status: 'FAIL', failure: error.message }; }
    results[name].sha256 = createHash('sha256').update(await readFile(file)).digest('hex');
    await page.close();
  }
  const json = JSON.stringify(results, null, 2) + '\n';
  if (process.argv[3]) await writeFile(path.resolve(process.argv[3]), json);
  process.stdout.write(json);
  if (results.baseline.status !== 'FAIL' || ['P01-short', 'P01-skill'].some(n => results[n].status !== 'PASS')) process.exitCode = 1;
} finally { await browser.close(); }
