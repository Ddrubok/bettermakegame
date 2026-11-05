// Synthetic input-contract fixture, not a physics controller or engine port.
// Integer milliseconds make this fixture's inclusive boundary explicit.
export class JumpInput {
  constructor({ graceMs = 100, bufferMs = 80 } = {}) {
    for (const value of [graceMs, bufferMs]) {
      if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('invalid window');
    }
    Object.assign(this, { graceMs, bufferMs, now: 0, grounded: true,
      leftGroundAt: null, pending: null, down: false, blocked: false,
      alive: true, jumps: [] });
  }
  advance(at) {
    if (!Number.isSafeInteger(at) || at < this.now) throw new RangeError('nonmonotonic clock');
    this.now = at;
    if (this.pending !== null && at - this.pending > this.bufferMs) this.pending = null;
  }
  event({ at, type, value }) {
    this.advance(at);
    switch (type) {
      case 'ground':
        if (this.grounded && !value) this.leftGroundAt = at;
        this.grounded = value;
        break;
      case 'press':
        if (!this.down && !this.blocked && this.alive) this.pending = at;
        this.down = true;
        break;
      case 'release': this.down = false; break;
      case 'modal':
        this.blocked = value;
        this.pending = null;
        this.leftGroundAt = null;
        break;
      case 'alive':
        this.alive = value;
        this.pending = null;
        this.leftGroundAt = null;
        break;
      default: throw new Error(`unknown event: ${type}`);
    }
    const grace = this.leftGroundAt !== null && at - this.leftGroundAt <= this.graceMs;
    if (this.alive && !this.blocked && this.pending !== null && (this.grounded || grace)) {
      this.jumps.push(at);
      this.pending = null;
      this.leftGroundAt = null;
      this.grounded = false;
    }
  }
}

export function replay(events, options) {
  const input = new JumpInput(options);
  for (const event of events) input.event(event);
  return input;
}
