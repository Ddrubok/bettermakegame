import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { JumpInput, replay } = await import(pathToFileURL(process.env.CANDIDATE_FILE));
test('inclusive buffer boundary and expiry', () => {
  for (const [delay, count] of [[79,1],[80,1],[81,0]]) {
    const state = replay([{at:0,type:'ground',value:false}, {at:200,type:'press'},
      {at:201,type:'release'}, {at:200+delay,type:'ground',value:true}]);
    assert.equal(state.jumps.length, count);
  }
});
test('modal transition clears existing pending intent', () => {
  const state = replay([{at:0,type:'ground',value:false},{at:200,type:'press'},
    {at:210,type:'modal',value:true},{at:220,type:'modal',value:false},
    {at:230,type:'ground',value:true}]); assert.deepEqual(state.jumps, []);
});
test('grace boundaries and held input remain constrained', () => {
  for (const [at, count] of [[99,1],[100,1],[101,0]]) {
    assert.equal(replay([{at:0,type:'ground',value:false},{at,type:'press'}]).jumps.length, count);
  }
  assert.deepEqual(replay([{at:0,type:'press'},{at:1,type:'press'},
    {at:300,type:'ground',value:true},{at:301,type:'press'}]).jumps, [0]);
});
test('press during modal needs a fresh post-modal press', () => {
  const state = replay([{at:0,type:'modal',value:true},{at:1,type:'press'},
    {at:2,type:'modal',value:false},{at:3,type:'press'}]); assert.deepEqual(state.jumps, []);
  state.event({at:4,type:'release'}); state.event({at:5,type:'press'});
  assert.deepEqual(state.jumps, [5]);
});
test('death reset, configured windows and clock checks survive', () => {
  const state = replay([{at:0,type:'ground',value:false},{at:200,type:'press'},
    {at:210,type:'alive',value:false},{at:220,type:'alive',value:true},
    {at:230,type:'ground',value:true}]); assert.deepEqual(state.jumps, []);
  assert.equal(replay([{at:0,type:'ground',value:false},{at:51,type:'press'}], {graceMs:50}).jumps.length, 0);
  const input = new JumpInput(); input.advance(20); assert.throws(() => input.advance(19));
});
