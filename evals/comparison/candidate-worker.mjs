// Transport only: no assertions, expected values or pass/fail decisions live here.
import { createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';
const send = process.stdout.write.bind(process.stdout);
const stringify = JSON.stringify;
const reply = data => send(stringify(data) + '\n');
const input = createInterface({ input: process.stdin });
const objects = new Map();
let nextHandle = 0;
const module = await import(pathToFileURL(process.argv[2]));
objects.set(0, module);
const freeze = value => {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
};
reply({ id: 0, ok: true, value: 'ready' });
for await (const line of input) {
  const request = JSON.parse(line);
  if (request.op === 'finish') {
    reply({ id: request.id, ok: true, value: 'finished' });
    input.close();
    break;
  }
  try {
    let owner = objects.get(request.handle ?? 0);
    const parts = request.path.split('.');
    const key = parts.pop();
    for (const part of parts) owner = owner[part];
    const args = request.args ?? [];
    if (request.freezeArgs) freeze(args);
    let value;
    if (request.op === 'get') value = owner[key];
    else if (request.op === 'construct') value = Reflect.construct(owner[key], args);
    else if (request.op === 'call') value = await Reflect.apply(owner[key], owner, args);
    else throw new Error('Unknown operation');
    if (request.retain) {
      objects.set(++nextHandle, value);
      value = nextHandle;
    }
    reply({ id: request.id, ok: true, value: value === undefined ? null : value });
  } catch (error) {
    reply({ id: request.id, ok: false, error: String(error.message) });
  }
}
