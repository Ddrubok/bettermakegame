import assert from 'node:assert/strict';
import test from 'node:test';
import { MAX_SPEED, step } from './controller.mjs';

const initial = () => ({ speed: 0, steering: 0 });
const run = (state, input, dt, count) => {
  for (let i = 0; i < count; i++) state = step(state, input, dt);
  return state;
};

test('acceleration is gradual, frame-rate independent, and capped at 12 m/s', () => {
  const input = { throttle: 1, steer: 0 };
  assert.equal(step(initial(), input, 0.1).speed, 0.8);
  assert.ok(Math.abs(run(initial(), input, 0.1, 10).speed -
    run(initial(), input, 0.02, 50).speed) < 1e-10);
  assert.equal(run(initial(), input, 0.1, 20).speed, MAX_SPEED);
});

test('release stops from maximum speed within 0.4 seconds', () => {
  let state = { speed: MAX_SPEED, steering: 0 };
  state = run(state, { throttle: 0, steer: 0 }, 0.02, 19);
  assert.equal(state.speed, 0);
});

test('small stick noise is ignored; larger steering changes are rate limited', () => {
  const input = { throttle: 0, steer: 0.1 };
  assert.equal(step(initial(), input, 0.1).steering, 0);
  const turned = step(initial(), { throttle: 0, steer: 1 }, 0.02);
  assert.equal(turned.steering, 0.1);
  assert.equal(step(turned, { throttle: 0, steer: -1 }, 0.02).steering, 0);
});

test('keyboard -1/0/1 steering remains reachable and recenters', () => {
  const throttle = 0;
  let state = run(initial(), { throttle, steer: -1 }, 0.02, 11);
  assert.equal(state.steering, -1);
  state = run(state, { throttle, steer: 0 }, 0.02, 11);
  assert.equal(state.steering, 0);
  state = run(state, { throttle, steer: 1 }, 0.02, 11);
  assert.equal(state.steering, 1);
});
