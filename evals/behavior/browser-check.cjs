// Optional maintainer test. Uses an already-installed Playwright and browser.
// PLAYWRIGHT_MODULE may identify an existing package; BROWSER_EXECUTABLE selects a browser.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const output = path.resolve(process.argv[2] || path.join(__dirname, 'browser-output'));
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  const checks = [], errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 680 } });
    page.on('pageerror', error => errors.push(String(error)));
    const focus = () => page.evaluate(() => document.activeElement.id);
    const count = async () => Number((await page.locator('#game-status').innerText()).split(': ')[1]);
    async function check(name, action) { await action(); checks.push({ name, status: 'PASS' }); }
    await page.goto(pathToFileURL(path.join(__dirname, 'modal.html')).href);
    await check('background action works before modal', async () => {
      await page.keyboard.press('g'); assert.equal(await count(), 1);
    });
    await page.locator('#open').click();
    await check('opening places focus inside modal', async () => assert.equal(await focus(), 'close'));
    await page.screenshot({ path: path.join(output, 'modal-open.png') });
    await check('Tab wraps forward within modal', async () => {
      await page.keyboard.press('Tab'); assert.equal(await focus(), 'remove');
      await page.keyboard.press('Tab'); assert.equal(await focus(), 'close');
    });
    await check('Shift+Tab wraps backward within modal', async () => {
      await page.keyboard.press('Shift+Tab'); assert.equal(await focus(), 'remove');
    });
    await check('modal blocks gameplay key', async () => {
      await page.keyboard.press('g'); assert.equal(await count(), 1);
    });
    await check('Escape closes and restores opener focus', async () => {
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#settings').open && document.activeElement.id === 'open');
      assert.equal(await focus(), 'open');
    });
    await check('gameplay resumes after closing', async () => {
      await page.keyboard.press('g'); assert.equal(await count(), 2);
    });
    await check('removed opener returns focus to fallback', async () => {
      await page.locator('#open').click();
      await page.locator('#remove').click();
      await page.screenshot({ path: path.join(output, 'modal-opener-removed.png') });
      await page.locator('#close').click();
      await page.waitForFunction(() => document.activeElement.id === 'fallback');
      assert.equal(await focus(), 'fallback');
      await page.keyboard.press('g'); assert.equal(await count(), 3);
    });
    await check('no page errors', async () => assert.deepEqual(errors, []));
    const result = { browser: browser.version(), checks,
      evidence: ['modal-open.png', 'modal-opener-removed.png'],
      limits: ['Synthetic DOM fixture; not a game build', 'No controller, touch, screen reader or human usability test',
        'Screenshots require a separate visual inspection', 'Not a model-use or skill-effectiveness evaluation'] };
    fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(result, null, 2) + '\n');
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack) + '\n'); process.exitCode = 1; });
