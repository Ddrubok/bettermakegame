import assert from 'node:assert/strict';
import { JumpInput, replay } from './jump.mjs';
const e = (at, type, value) => ({ at, type, value });
let checks = 0;
function jumps(events, expected, options) {
  assert.deepEqual(replay(events, options).jumps, expected);
  checks++;
}
for (const [bufferMs, graceMs] of [[80,100],[7,3],[0,0]]) {
  for (const offset of [...new Set([Math.max(0, bufferMs - 1), bufferMs, bufferMs + 1])]) {
    jumps([e(0,'ground',false),e(200,'press'),e(200+offset,'ground',true)], offset <= bufferMs ? [200+offset] : [], {bufferMs, graceMs});
  }
  for (const offset of [...new Set([Math.max(0, graceMs - 1), graceMs, graceMs + 1])]) {
    jumps([e(0,'ground',false),e(offset,'press')], offset <= graceMs ? [offset] : [], {bufferMs, graceMs});
  }
}
// Modal opening cancels a pending airborne press, including on the expiry boundary.
for (const at of [201,280]) {
  const state = replay([e(0,'ground',false),e(200,'press'),e(at,'modal',true)]);
  assert.equal(state.pending,null); checks++;
  state.event(e(at,'ground',true)); state.event(e(at,'modal',false));
  assert.deepEqual(state.jumps,[]); checks++;
}
// A close event also cancels pending intent even when no open event was recorded.
jumps([e(0,'ground',false),e(200,'press'),e(201,'modal',false),e(202,'ground',true)],[]);
// Pressing in a modal remains latched until release; repeated presses cannot jump.
jumps([e(0,'modal',true),e(1,'press'),e(2,'modal',false),e(3,'press'),e(4,'release'),e(5,'press')],[5]);
// A pre-modal held press cannot reactivate on closing.
jumps([e(0,'press'),e(1,'modal',true),e(2,'ground',true),e(3,'modal',false),e(4,'press'),e(5,'release'),e(6,'press')],[0,6]);
// Buffer consumption and grace consumption cannot create another jump from repeats.
jumps([e(0,'ground',false),e(200,'press'),e(201,'press'),e(280,'ground',true),e(281,'ground',true),e(282,'press')],[280]);
jumps([e(0,'ground',false),e(100,'press'),e(100,'release'),e(100,'press')],[100]);
// Death and revival each clear pending and grace; held input still requires release.
for (const value of [false,true]) {
  const state = replay([e(0,'ground',false),e(200,'press'),e(201,'alive',value)]);
  assert.equal(state.pending,null); assert.equal(state.leftGroundAt,null); checks++;
}
jumps([e(0,'alive',false),e(1,'press'),e(2,'alive',true),e(3,'press'),e(4,'release'),e(5,'press')],[5]);
for (const value of [-1,0.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) {
  assert.throws(() => new JumpInput({bufferMs:value}),RangeError);
  assert.throws(() => new JumpInput({graceMs:value}),RangeError);
  assert.throws(() => new JumpInput().event(e(value,'release')),RangeError); checks += 3;
}
const clock = new JumpInput(); clock.advance(10);
assert.throws(() => clock.advance(9),RangeError); checks++;
clock.advance(10); checks++;
console.log(`${checks} checks passed`);
