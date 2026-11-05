// Explicit design alternative; the historical worker output remains unchanged.
import { step as historicalStep } from '../game-feel/racer/controller.mjs';

export function step(state, input, dt, { releaseDeadzone = .01 } = {}) {
  // Fixture-only calibration: treat small residual trigger readings as release.
  // Inputs above this inclusive boundary retain their original analog magnitude.
  if (!Number.isFinite(releaseDeadzone) || releaseDeadzone < 0 || releaseDeadzone >= 1) {
    throw new RangeError('releaseDeadzone must be in [0, 1)');
  }
  const rawThrottle = Math.max(0, Math.min(1, input.throttle));
  const throttle = rawThrottle <= releaseDeadzone ? 0 : rawThrottle;
  const result = historicalStep(state, { ...input, throttle }, dt);
  const target = throttle * 12;
  if (throttle > 0 && target < state.speed) {
    // Fixture-only choice: partial reduction 8 m/s²; full release stays 36 m/s².
    result.speed = Math.max(target, state.speed - 8 * Math.max(0, dt));
  }
  return result;
}
