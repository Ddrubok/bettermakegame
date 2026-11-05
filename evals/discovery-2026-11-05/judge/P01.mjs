// Maintainer-only. Never copy this file into an agent input directory.
import assert from 'node:assert/strict';
export async function score(page) {
  const checks = [];
  await page.click('#open');
  assert.equal(await page.locator('.choice').count(), 4); checks.push('four choices preserved');
  await page.locator('[data-choice="Queen"]').dblclick({ delay: 25 });
  await page.waitForTimeout(200);
  assert.deepEqual(await page.evaluate(() => calls), ['Queen']); checks.push('double input commits once');
  await page.evaluate(() => { calls.length = 0; openChoice(); });
  await page.locator('[data-choice="Knight"]').click();
  await page.evaluate(() => openChoice()); await page.waitForTimeout(200);
  assert.deepEqual(await page.evaluate(() => calls), []); checks.push('replaced owner cannot commit later');
  await page.locator('[data-choice="Rook"]').click(); await page.waitForTimeout(200);
  assert.deepEqual(await page.evaluate(() => calls), ['Rook']); checks.push('current choice commits');
  return checks;
}
