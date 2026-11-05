import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { ImpactPresentation } = await import(pathToFileURL(process.env.CANDIDATE_FILE));
const event = (state, revision = 1, extras = {}) => ({ id: 'hit', round: 'round-1', state,
  revision, point: { x: 2, y: 3 }, ...extras });
test('newer revisions do not resurrect finished confirmed or provisional cues', () => {
  for (const state of ['pending', 'confirmed']) {
    const view = new ImpactPresentation(); view.receive(event(state)); view.finish('hit');
    for (const revision of [2, 3, 1]) view.receive(event('confirmed', revision));
    assert.equal(view.active.size, 0); assert.equal(view.bursts, state === 'confirmed' ? 1 : 0);
  }
});
test('another event and another round retain their own lifetimes', () => {
  const view = new ImpactPresentation(); view.receive(event('confirmed')); view.finish('hit');
  view.receive(event('confirmed', 1, { id: 'other' })); assert.equal(view.active.has('other'), true);
  view.nextRound('round-2'); view.receive(event('confirmed', 1, { round: 'round-2' }));
  assert.equal(view.active.has('hit'), true);
});
test('active correction updates position without duplicate bursts', () => {
  const view = new ImpactPresentation(); view.receive(event('pending'));
  assert.equal(view.active.get('hit').kind, 'preview'); assert.equal(view.bursts, 0);
  view.receive(event('confirmed', 2)); view.receive(event('confirmed', 3, { point: { x: 8, y: 9 } }));
  view.receive(event('confirmed', 3)); assert.equal(view.bursts, 1);
  assert.deepEqual(view.active.get('hit').point, { x: 8, y: 9 });
});
test('rejection and disposal still reject late cues', () => {
  const view = new ImpactPresentation(); view.receive(event('pending'));
  view.receive(event('rejected', 3)); view.receive(event('confirmed', 2));
  assert.equal(view.active.size, 0); view.dispose(); view.receive(event('confirmed', 4));
  assert.equal(view.active.size, 0); assert.equal(view.events.size, 0);
});
