// Explicit design alternative; the historical worker output remains unchanged.
import { step as historicalStep } from '../game-feel/racer/controller.mjs';

export function step(state, input, dt) {
  const result = historicalStep(state, input, dt);
  const throttle = Math.max(0, Math.min(1, input.throttle));
  const target = throttle * 12;
  if (throttle > 0 && target < state.speed) {
    // Fixture-only choice: partial reduction 8 m/s²; full release stays 36 m/s².
    result.speed = Math.max(target, state.speed - 8 * Math.max(0, dt));
  }
  return result;
}
