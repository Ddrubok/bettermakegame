import test from 'node:test';
import assert from 'node:assert/strict';
import { step } from './racer.mjs';
import { step as historical } from '../game-feel/racer/controller.mjs';
const initial = { speed: 12, steering: 0 };
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

test('characterize historical 12→6 reduction at 1/6 second', () => {
  close(historical(initial, { throttle: .5, steer: 0 }, 1 / 6).speed, 6);
});
test('local alternative keeps partial reduction gradual and settles at 0.75s', () => {
  const half = { throttle: .5, steer: 0 };
  close(step(initial, half, .5).speed, 8);
  assert.ok(step(initial, half, .749).speed > 6);
  close(step(initial, half, .75).speed, 6);
  close(step(initial, half, 2).speed, 6);
});
test('full release still stops within 0.4s, including after partial throttle', () => {
  close(step(initial, { throttle: 0, steer: 0 }, .4).speed, 0);
  const reduced = step(initial, { throttle: .5, steer: 0 }, .2);
  close(step(reduced, { throttle: 0, steer: 0 }, .4).speed, 0);
});
test('different step schedules give the same partial-throttle endpoint', () => {
  const run = times => times.reduce((s, dt) => step(s, { throttle: .5, steer: 0 }, dt), initial);
  close(run(Array(50).fill(.01)).speed, run([.13, .07, .3]).speed);
});
test('maximum speed, full-release and steering behavior remain historical', () => {
  let old = { speed: 0, steering: 0 }, candidate = { ...old };
  for (const input of [{ throttle: 1, steer: .1 }, { throttle: 1, steer: 1 },
    { throttle: 0, steer: -1 }, { throttle: 1, steer: 0 }]) {
    old = historical(old, input, 2);
    candidate = step(candidate, input, 2);
    assert.deepEqual(candidate, old);
    assert.ok(candidate.speed >= 0 && candidate.speed <= 12);
  }
});
