export const MAX_SPEED = 12;
const ACCELERATION = 8; // m/s²: full throttle reaches 12 m/s in 1.5 s.
const BRAKING = 36; // m/s²: release stops from 12 m/s in 1/3 s.
const STEER_DEADZONE = 0.12;
const STEER_RATE = 5; // normalized steering units per second.

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const approach = (current, target, change) =>
  current + clamp(target - current, -change, change);

// Standalone controller model: speed is m/s, steering is normalized [-1, 1].
// The host calls this at a variable update rate; dt is elapsed seconds.
export function step(state, input, dt) {
  const elapsed = Math.max(0, dt);
  const targetSpeed = clamp(input.throttle, 0, 1) * MAX_SPEED;
  const rawSteer = clamp(input.steer, -1, 1);
  const steerMagnitude = Math.abs(rawSteer);
  const targetSteering = steerMagnitude <= STEER_DEADZONE
    ? 0
    : Math.sign(rawSteer) * (steerMagnitude - STEER_DEADZONE) / (1 - STEER_DEADZONE);

  return {
    ...state,
    speed: approach(state.speed, targetSpeed,
      (targetSpeed > state.speed ? ACCELERATION : BRAKING) * elapsed),
    steering: approach(state.steering, targetSteering, STEER_RATE * elapsed),
  };
}
