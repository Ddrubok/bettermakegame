// Exploratory follow-up after the primary scores. Not part of the original judge.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const { ImpactPresentation } = await import(pathToFileURL(resolve(process.argv[2])));
const view = new ImpactPresentation();
view.receive({ id: 'hit', round: 'round-1', revision: 1, state: 'confirmed', point: { x: 0, y: 0 } });
view.dispose();
view.finish('late-cleanup');
console.log(JSON.stringify({ closed: view.closed, active: view.active.size,
  events: view.events.size, finishedIdsAfterLateCleanup: view.finished?.size ?? 0 }));
