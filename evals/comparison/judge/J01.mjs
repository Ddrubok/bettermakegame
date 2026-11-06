import assert from 'node:assert/strict';
export const checks = [];
const test = (name, run) => checks.push({ name, run });
const replay = (r, ...args) => r.call('replay', args, 0, { retain: true });
test('inclusive buffer boundary and expiry', async r => {
  for (const [delay, count] of [[79,1],[80,1],[81,0]]) {
    const state = await replay(r, [{at:0,type:'ground',value:false}, {at:200,type:'press'},
      {at:201,type:'release'}, {at:200+delay,type:'ground',value:true}]);
    assert.equal(await r.get(state, 'jumps.length'), count);
  }
});
test('modal transition clears existing pending intent', async r => {
  const state = await replay(r, [{at:0,type:'ground',value:false},{at:200,type:'press'},
    {at:210,type:'modal',value:true},{at:220,type:'modal',value:false},
    {at:230,type:'ground',value:true}]); assert.deepEqual(await r.get(state, 'jumps'), []);
});
test('grace boundaries and held input remain constrained', async r => {
  for (const [at, count] of [[99,1],[100,1],[101,0]]) {
    const state = await replay(r, [{at:0,type:'ground',value:false},{at,type:'press'}]);
    assert.equal(await r.get(state, 'jumps.length'), count);
  }
  const held = await replay(r, [{at:0,type:'press'},{at:1,type:'press'},
    {at:300,type:'ground',value:true},{at:301,type:'press'}]);
  assert.deepEqual(await r.get(held, 'jumps'), [0]);
});
test('press during modal needs a fresh post-modal press', async r => {
  const state = await replay(r, [{at:0,type:'modal',value:true},{at:1,type:'press'},
    {at:2,type:'modal',value:false},{at:3,type:'press'}]); assert.deepEqual(await r.get(state, 'jumps'), []);
  await r.call('event', [{at:4,type:'release'}], state); await r.call('event', [{at:5,type:'press'}], state);
  assert.deepEqual(await r.get(state, 'jumps'), [5]);
});
test('death reset, configured windows and clock checks survive', async r => {
  const state = await replay(r, [{at:0,type:'ground',value:false},{at:200,type:'press'},
    {at:210,type:'alive',value:false},{at:220,type:'alive',value:true},
    {at:230,type:'ground',value:true}]); assert.deepEqual(await r.get(state, 'jumps'), []);
  const configured = await replay(r, [{at:0,type:'ground',value:false},{at:51,type:'press'}], {graceMs:50});
  assert.equal(await r.get(configured, 'jumps.length'), 0);
  const input = await r.construct('JumpInput'); await r.call('advance', [20], input);
  await assert.rejects(r.call('advance', [19], input), error => error.candidateException === true);
});
