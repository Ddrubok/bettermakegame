import assert from 'node:assert/strict';
import { step, MAX_SPEED } from './controller.mjs';
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);
const state = Object.freeze({ speed: 12, steering: 0.3, tag: 'preserved' });
const releasedValues = [0, 0.000001, 0.005, 0.009999, 0.01];
for (const throttle of releasedValues) {
  const input = Object.freeze({ throttle, steer: 0 });
  for (const times of [[0.4], Array(24).fill(1 / 60), [0.013, 0.077, 0.11, 0.2]]) {
    let current = state;
    for (const dt of times) current = step(current, input, dt);
    assert.equal(current.speed, 0);
    for (let i = 0; i < 120; i++) current = step(current, input, 1 / 60);
    assert.equal(current.speed, 0);
    assert.equal(current.tag, 'preserved');
  }
  close(step(state, input, 1 / 3).speed, 0);
}
let current = state;
for (let i = 0; i < 24; i++) current = step(current, {throttle: releasedValues[i % releasedValues.length], steer: 0}, 1 / 60);
assert.equal(current.speed, 0);
for (let i = 0; i < 120; i++) current = step(current, {throttle: releasedValues[i % releasedValues.length], steer: 0}, 1 / 60);
assert.equal(current.speed, 0);
for (const throttle of [0.010000001, 0.02, 0.25, 0.5, 0.75]) {
  close(step({speed: 0, steering: 0}, {throttle, steer: 0}, 2).speed, throttle * 12);
  close(step(state, {throttle, steer: 0}, 0.1).speed, Math.max(throttle * 12, 11.2));
}
close(step(state, {throttle: 0.5, steer: 0}, 0.75).speed, 6);
current = state;
for (let i = 0; i < 45; i++) current = step(current, {throttle: 0.5, steer: 0}, 1 / 60);
close(current.speed, 6);
assert.equal(MAX_SPEED, 12);
close(step({speed: 0, steering: 0}, {throttle: 1, steer: 0}, 1.5).speed, 12);
close(step(state, {throttle: 2, steer: 0}, 10).speed, 12);
close(step(state, {throttle: -1, steer: 0}, 0.4).speed, 0);
for (const steer of [-2, -1, -0.5, -0.120001, -0.12, 0, 0.12, 0.120001, 0.5, 1, 2]) {
  const raw = Math.max(-1, Math.min(1, steer));
  const target = Math.abs(raw) <= 0.12 ? 0 : Math.sign(raw) * (Math.abs(raw) - 0.12) / 0.88;
  for (const dt of [0, 0.01, 0.1, 1]) {
    close(step(state, {throttle: 0.01, steer}, dt).steering, 0.3 + Math.max(-5 * dt, Math.min(5 * dt, target - 0.3)));
  }
}
for (const dt of [0, -1]) {
  const result = step(state, Object.freeze({throttle: 0.01, steer: 1}), dt);
  assert.deepEqual(result, state);
  assert.notEqual(result, state);
}
assert.deepEqual(state, {speed: 12, steering: 0.3, tag: 'preserved'});
current = step({speed: 0, steering: 0}, {throttle: 0.01, steer: 0}, 1);
assert.equal(current.speed, 0);
current = step(current, {throttle: 1, steer: 0}, 1.5);
assert.equal(current.speed, 12);
current = step(current, {throttle: 0.01, steer: 0}, 0.4);
assert.equal(current.speed, 0);
console.log('PASS: release boundaries, jitter, timestep partitions, analog response, half throttle, max speed, steering, immutability, release/reactivation');
