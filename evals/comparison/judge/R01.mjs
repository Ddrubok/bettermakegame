import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { step } = await import(pathToFileURL(process.env.CANDIDATE_FILE));
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
test('release range including boundary stops and stays stopped', () => {
  for (const throttle of [0, .005, .009999, .01]) {
    let state = { speed: 12, steering: 0 };
    for (let n = 0; n < 80; n++) {
      state = step(state, { throttle, steer: 0 }, .01);
      if (n >= 39) close(state.speed, 0);
    }
  }
});
test('above-boundary analog intent remains usable', () => {
  for (const throttle of [.010001, .25, .5, 1]) {
    close(step({ speed: 0, steering: 0 }, { throttle, steer: 0 }, 5).speed, throttle * 12);
  }
});
test('partial-throttle design stays at the specified trajectory', () => {
  const state = { speed: 12, steering: 0 }, input = { throttle: .5, steer: 0 };
  close(step(state, input, .5).speed, 8);
  close(step(state, input, .75).speed, 6);
  close(step(state, input, 2).speed, 6);
});
test('sampling schedules and released jitter preserve behavior', () => {
  let a = { speed: 12, steering: 0 }, b = { ...a };
  for (let n = 0; n < 40; n++) a = step(a, { throttle: [0,.005,.01][n % 3], steer: 0 }, .01);
  b = step(b, { throttle: .005, steer: 0 }, .4);
  close(a.speed, b.speed); close(a.speed, 0);
});
test('maximum speed, steering noise and immutability are preserved', () => {
  const state = Object.freeze({ speed: 0, steering: 0 });
  const input = Object.freeze({ throttle: 1, steer: .1 });
  const next = step(state, input, 3);
  close(next.speed, 12); close(next.steering, 0);
  close(step(state, { throttle: 1, steer: 1 }, .02).steering, .1);
  assert.deepEqual(state, { speed: 0, steering: 0 });
});
