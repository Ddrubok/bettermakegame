// Trusted-event adapter model. No sockets, renderer, prediction physics or server.
// Callers must validate/authenticate messages before this presentation boundary.
export class ImpactPresentation {
  constructor(round = 'round-1') {
    this.round = round;
    this.closed = false;
    this.events = new Map();
    this.active = new Map();
    this.finished = new Set();
    this.bursts = 0;
  }
  receive(event) {
    if (this.closed || event.round !== this.round) return false;
    if (!event.id || !Number.isSafeInteger(event.revision) || event.revision < 1 ||
        !['pending', 'confirmed', 'rejected'].includes(event.state)) throw new TypeError('bad event');
    const previous = this.events.get(event.id);
    if (previous && event.revision <= previous.revision) return false;
    if (previous && previous.state !== 'pending' && event.state === 'pending') return false;
    const confirmedBefore = previous?.confirmedBefore || false;
    this.events.set(event.id, { revision: event.revision, state: event.state,
      confirmedBefore: confirmedBefore || event.state === 'confirmed' });
    if (this.finished.has(event.id)) return true;
    if (event.state === 'rejected') this.active.delete(event.id);
    else {
      this.active.set(event.id, { kind: event.state === 'pending' ? 'preview' : 'impact',
        point: { ...event.point } });
      if (event.state === 'confirmed' && !confirmedBefore) this.bursts++;
    }
    return true;
  }
  finish(id) {
    if (this.closed) return;
    this.finished.add(id); // Visual lifetime stays closed for this round.
    this.active.delete(id);
  }
  nextRound(round) {
    if (this.closed) throw new Error('disposed owner');
    this.round = round;
    this.events.clear();
    this.active.clear();
    this.finished.clear();
  }
  dispose() { this.closed = true; this.events.clear(); this.active.clear(); this.finished.clear(); }
}

export function simulate(presentation, ticks = 60) {
  // Synthetic fixed-step wall collision; the presentation callback receives no
  // mutable world reference. This is not a real multiplayer/physics integration.
  const world = { tick: 0, x: 0, velocity: 1, collisions: 0 };
  for (let i = 0; i < ticks; i++) {
    world.tick++;
    world.x += world.velocity / 60;
    if (world.x >= .25 && world.velocity > 0) {
      world.velocity = -world.velocity;
      world.collisions++;
      presentation?.(Object.freeze({ id: 'wall-1', round: 'round-1', revision: 1,
        state: 'confirmed', point: Object.freeze({ x: world.x, y: 0 }) }));
    }
  }
  return world;
}
