import assert from 'node:assert/strict';
export const checks = [];
const test = (name, run) => checks.push({ name, run });
const event = (state, revision = 1, extras = {}) => ({ id: 'hit', round: 'round-1', state,
  revision, point: { x: 2, y: 3 }, ...extras });
test('newer revisions do not resurrect finished confirmed or provisional cues', async r => {
  for (const state of ['pending', 'confirmed']) {
    const view = await r.construct('ImpactPresentation');
    await r.call('receive', [event(state)], view); await r.call('finish', ['hit'], view);
    for (const revision of [2, 3, 1]) await r.call('receive', [event('confirmed', revision)], view);
    assert.equal(await r.get(view, 'active.size'), 0);
    assert.equal(await r.get(view, 'bursts'), state === 'confirmed' ? 1 : 0);
  }
});
test('another event and another round retain their own lifetimes', async r => {
  const view = await r.construct('ImpactPresentation');
  await r.call('receive', [event('confirmed')], view); await r.call('finish', ['hit'], view);
  await r.call('receive', [event('confirmed', 1, { id: 'other' })], view);
  assert.equal(await r.call('active.has', ['other'], view), true);
  await r.call('nextRound', ['round-2'], view);
  await r.call('receive', [event('confirmed', 1, { round: 'round-2' })], view);
  assert.equal(await r.call('active.has', ['hit'], view), true);
});
test('active correction updates position without duplicate bursts', async r => {
  const view = await r.construct('ImpactPresentation'); await r.call('receive', [event('pending')], view);
  assert.equal((await r.call('active.get', ['hit'], view)).kind, 'preview');
  assert.equal(await r.get(view, 'bursts'), 0);
  await r.call('receive', [event('confirmed', 2)], view);
  await r.call('receive', [event('confirmed', 3, { point: { x: 8, y: 9 } })], view);
  await r.call('receive', [event('confirmed', 3)], view); assert.equal(await r.get(view, 'bursts'), 1);
  assert.deepEqual((await r.call('active.get', ['hit'], view)).point, { x: 8, y: 9 });
});
test('rejection and disposal still reject late cues', async r => {
  const view = await r.construct('ImpactPresentation'); await r.call('receive', [event('pending')], view);
  await r.call('receive', [event('rejected', 3)], view); await r.call('receive', [event('confirmed', 2)], view);
  assert.equal(await r.get(view, 'active.size'), 0);
  await r.call('dispose', [], view); await r.call('receive', [event('confirmed', 4)], view);
  assert.equal(await r.get(view, 'active.size'), 0); assert.equal(await r.get(view, 'events.size'), 0);
});
