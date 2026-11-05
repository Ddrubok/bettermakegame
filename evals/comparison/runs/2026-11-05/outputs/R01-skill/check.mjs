import assert from 'node:assert/strict';
import { step, MAX_SPEED } from './controller.mjs';
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} != ${b}`);
function run(speed, throttle, duration, pattern) {
  let state = { speed, steering: 0 };
  let elapsed = 0, i = 0;
  while (elapsed < duration) {
    const dt = Math.min(pattern[i++ % pattern.length], duration - elapsed);
    state = step(state, { throttle, steer: 0 }, dt);
    elapsed += dt;
  }
  return state.speed;
}
for (const pattern of [[1/30], [1/60], [1/144], [.003, .07, .011, .09], [.4]]) {
  for (let i = 0; i <= 1000; i++) {
    const throttle = i / 100000;
    near(run(12, throttle, .4, pattern), 0);
    near(run(0, throttle, 2, pattern), 0);
  }
  near(run(12, .5, .75, pattern), 6);
  near(run(12, .5, .5, pattern), 8);
  near(run(0, 1, 1.5, pattern), 12);
  near(run(12, 1, 2, pattern), 12);
  for (const throttle of [.010000000001, .02, .1, .25, .5, .9, 1]) {
    near(run(0, throttle, 3, pattern), throttle * 12);
    near(run(12, throttle, 3, pattern), throttle * 12);
  }
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
for (const steer of [-2, -1, -.120001, -.12, 0, .12, .120001, 1, 2]) {
  for (const dt of [-1, 0, .001, .1, 1]) {
    const state = Object.freeze({ speed: 12, steering: .3, marker: 'keep' });
    const input = Object.freeze({ throttle: .01, steer });
    const out = step(state, input, dt);
    const raw = clamp(steer, -1, 1);
    const target = Math.abs(raw) <= .12 ? 0 : Math.sign(raw) * (Math.abs(raw) - .12) / .88;
    near(out.steering, .3 + clamp(target - .3, -5 * Math.max(0, dt), 5 * Math.max(0, dt)));
    assert.equal(out.marker, 'keep');
    assert.notEqual(out, state);
    assert.deepEqual(state, { speed: 12, steering: .3, marker: 'keep' });
    assert.deepEqual(input, { throttle: .01, steer });
    if (dt <= 0) near(out.speed, 12);
  }
}
let state = { speed: 12, steering: 0 };
for (let i = 0; i < 120; i++) state = step(state, { throttle: (i % 11) / 1000, steer: 0 }, 1/60);
near(state.speed, 0);
near(step(state, { throttle: .5, steer: 0 }, .25).speed, 2);
near(step({ speed: 0, steering: 0 }, { throttle: 2, steer: 0 }, 3).speed, MAX_SPEED);
near(step({ speed: 12, steering: 0 }, { throttle: -1, steer: 0 }, .4).speed, 0);
console.log('PASS: release sweep, time partitions, analog targets, half throttle, steering, immutability, pause, re-entry, clamps');
