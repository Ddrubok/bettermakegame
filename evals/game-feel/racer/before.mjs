export const MAX_SPEED = 12;

// Standalone controller model: speed is m/s, steering is normalized [-1, 1].
// The host calls this at a variable update rate; dt is elapsed seconds.
export function step(state, input, dt) {
  return {
    ...state,
    speed: Math.max(0, Math.min(1, input.throttle)) * MAX_SPEED,
    steering: Math.max(-1, Math.min(1, input.steer)),
  };
}
