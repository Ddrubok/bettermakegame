import test from 'node:test';
import assert from 'node:assert/strict';
import { ImpactPresentation, simulate } from './online-impact.mjs';
const event = (state, revision = 1, extra = {}) => ({
  id: 'hit', round: 'round-1', revision, state, point: { x: 2, y: 3 }, ...extra,
});

test('pending is a preview; confirmation creates only one success burst', () => {
  const view = new ImpactPresentation();
  view.receive(event('pending'));
  assert.equal(view.active.get('hit').kind, 'preview');
  assert.equal(view.bursts, 0);
  view.receive(event('confirmed', 2));
  assert.equal(view.active.get('hit').kind, 'impact');
  for (let i = 0; i < 5; i++) view.receive(event('confirmed', 2));
  assert.equal(view.bursts, 1);
});
test('rejection cancels provisional effects; older confirmation cannot revive them', () => {
  const view = new ImpactPresentation();
  view.receive(event('pending'));
  view.receive(event('rejected', 3));
  assert.equal(view.receive(event('confirmed', 2)), false);
  assert.equal(view.active.size, 0);
  assert.equal(view.bursts, 0);
});
test('newer authoritative correction moves the cue without another burst', () => {
  const view = new ImpactPresentation();
  view.receive(event('confirmed'));
  view.receive(event('confirmed', 2, { point: { x: 7, y: 8 } }));
  assert.deepEqual(view.active.get('hit').point, { x: 7, y: 8 });
  assert.equal(view.bursts, 1);
});
test('ending a visual instance retains duplicate protection', () => {
  const view = new ImpactPresentation();
  view.receive(event('confirmed'));
  view.finish('hit');
  view.receive(event('confirmed'));
  assert.equal(view.active.size, 0);
  assert.equal(view.bursts, 1);
});
test('a completed or rejected event cannot regress to a pending cue', () => {
  for (const state of ['confirmed', 'rejected']) {
    const view = new ImpactPresentation();
    view.receive(event(state));
    assert.equal(view.receive(event('pending', 2)), false);
    assert.equal(view.active.get('hit')?.kind, state === 'confirmed' ? 'impact' : undefined);
  }
});
test('round change drops old callbacks and permits a round-scoped reused ID', () => {
  const view = new ImpactPresentation();
  view.receive(event('pending'));
  view.nextRound('round-2');
  assert.equal(view.receive(event('confirmed', 2)), false);
  assert.equal(view.active.size, 0);
  assert.equal(view.receive(event('confirmed', 1, { round: 'round-2' })), true);
  assert.equal(view.bursts, 1);
});
test('disposal clears instances and prevents late confirmation', () => {
  const view = new ImpactPresentation();
  view.receive(event('pending'));
  view.dispose();
  assert.equal(view.receive(event('confirmed', 2)), false);
  assert.equal(view.active.size, 0);
  assert.equal(view.events.size, 0);
});
test('independent events and callers cannot overwrite one another', () => {
  const view = new ImpactPresentation();
  const a = event('confirmed');
  view.receive(a);
  view.receive(event('confirmed', 1, { id: 'other' }));
  a.point.x = 999;
  assert.equal(view.active.get('hit').point.x, 2);
  view.finish('hit');
  assert.equal(view.active.has('other'), true);
});
test('effects disabled, single and duplicate delivery preserve the simulated world', () => {
  const baseline = simulate();
  const one = new ImpactPresentation(), duplicate = new ImpactPresentation();
  assert.deepEqual(simulate(e => one.receive(e)), baseline);
  assert.deepEqual(simulate(e => { duplicate.receive(e); duplicate.receive(e); }), baseline);
  assert.equal(baseline.collisions, 1);
  assert.equal(duplicate.bursts, 1);
  assert.equal(baseline.tick, 60);
});
