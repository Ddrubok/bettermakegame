import test from 'node:test';
import assert from 'node:assert/strict';
import { JumpInput, replay } from './jump.mjs';

for (const [delay, count] of [[99, 1], [100, 1], [101, 0]]) {
  test(`grace: input at ${delay}ms after leaving yields ${count} jumps`, () => {
    assert.equal(replay([{ at: 0, type: 'ground', value: false },
      { at: delay, type: 'press' }]).jumps.length, count);
  });
}
for (const [delay, count] of [[79, 1], [80, 1], [81, 0]]) {
  test(`buffer: landing ${delay}ms after press yields ${count} jumps`, () => {
    const state = replay([{ at: 0, type: 'ground', value: false },
      { at: 200, type: 'press' }, { at: 201, type: 'release' },
      { at: 200 + delay, type: 'ground', value: true }]);
    assert.equal(state.jumps.length, count);
  });
}
test('a held key and repeated press cannot spend one intent twice', () => {
  const state = replay([{ at: 0, type: 'press' }, { at: 1, type: 'press' },
    { at: 300, type: 'ground', value: true }, { at: 301, type: 'press' }]);
  assert.deepEqual(state.jumps, [0]);
  state.event({ at: 302, type: 'release' });
  state.event({ at: 303, type: 'press' });
  assert.deepEqual(state.jumps, [0, 303]);
});
for (const type of ['modal', 'alive']) {
  test(`${type} transition clears buffered intent and grace`, () => {
    const state = replay([{ at: 0, type: 'ground', value: false },
      { at: 200, type: 'press' },
      { at: 210, type, value: type === 'modal' },
      { at: 220, type, value: type !== 'modal' },
      { at: 230, type: 'ground', value: true }]);
    assert.deepEqual(state.jumps, []);
  });
}
test('press under a modal requires release and a new press after closing', () => {
  const state = replay([{ at: 0, type: 'modal', value: true },
    { at: 1, type: 'press' }, { at: 2, type: 'modal', value: false },
    { at: 3, type: 'press' }]);
  assert.deepEqual(state.jumps, []);
  state.event({ at: 4, type: 'release' });
  state.event({ at: 5, type: 'press' });
  assert.deepEqual(state.jumps, [5]);
});
test('the same timestamped inputs survive sparse and dense polling', () => {
  const run = polls => {
    const state = new JumpInput();
    state.event({ at: 0, type: 'ground', value: false });
    for (const at of polls) state.advance(at);
    state.event({ at: 100, type: 'press' });
    return state.jumps;
  };
  assert.deepEqual(run([16, 32, 48, 64, 80, 96]), run([33, 66, 99]));
  assert.deepEqual(run([]), [100]);
});
test('clock reversal and invalid windows are rejected', () => {
  const state = new JumpInput();
  state.advance(20);
  assert.throws(() => state.advance(19), RangeError);
  assert.throws(() => new JumpInput({ graceMs: -1 }), RangeError);
});
