import assert from 'node:assert/strict';
import { JumpInput, replay } from './jump.mjs';
let checks = 0;
const e = (at,type,value) => ({at,type,value});
function expect(events, expected, options) {
  assert.deepEqual(replay(events, options).jumps, expected);
  checks++;
}
for (const dt of [79,80,81]) expect([
  e(0,'ground',false), e(200,'press'), e(200+dt,'ground',true)
], dt <= 80 ? [200+dt] : []);
for (const dt of [99,100,101]) expect([
  e(0,'ground',false), e(dt,'press')
], dt <= 100 ? [dt] : []);
expect([e(0,'press'),e(1,'press'),e(2,'ground',true),e(3,'press'),e(4,'release'),e(5,'press')],[0,5]);
expect([e(0,'ground',false),e(200,'press'),e(210,'modal',true),e(220,'ground',true),e(230,'modal',false)],[]);
// Both modal directions clear pending intent, even a standalone close event.
for (const value of [false,true]) {
  const input = replay([e(0,'ground',false),e(200,'press'),e(210,'modal',value)]);
  assert.equal(input.pending,null); checks++;
}
expect([e(0,'modal',true),e(1,'press'),e(2,'modal',false),e(3,'press'),e(4,'ground',true),e(5,'release'),e(6,'press')],[6]);
expect([e(0,'modal',true),e(1,'press'),e(2,'release'),e(3,'modal',false),e(4,'press')],[4]);
expect([e(0,'ground',false),e(1,'modal',true),e(2,'modal',false),e(3,'press')],[]);
expect([e(0,'ground',false),e(200,'press'),e(201,'alive',false),e(202,'ground',true),e(203,'alive',true),e(204,'press'),e(205,'release'),e(206,'press')],[206]);
expect([e(0,'alive',false),e(1,'press'),e(2,'alive',true),e(3,'press'),e(4,'release'),e(5,'press')],[5]);
expect([e(0,'ground',false),e(1,'alive',false),e(2,'alive',true),e(3,'press')],[]);
for (const dt of [6,7,8]) expect([e(0,'ground',false),e(200,'press'),e(200+dt,'ground',true)],dt<=7?[200+dt]:[],{bufferMs:7});
for (const dt of [6,7,8]) expect([e(0,'ground',false),e(dt,'press')],dt<=7?[dt]:[],{graceMs:7});
expect([e(0,'ground',false),e(200,'press'),e(200,'ground',true)],[200],{bufferMs:0});
expect([e(0,'ground',false),e(200,'press'),e(201,'ground',true)],[],{bufferMs:0});
expect([e(0,'ground',false),e(0,'press')],[0],{graceMs:0});
expect([e(0,'ground',false),e(1,'press')],[],{graceMs:0});
for (const value of [-1,0.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) {
  for (const key of ['graceMs','bufferMs']) {
    assert.throws(()=>new JumpInput({[key]:value}),RangeError); checks++;
  }
  assert.throws(()=>new JumpInput().advance(value),RangeError); checks++;
}
const input = new JumpInput(); input.advance(10);
assert.throws(()=>input.advance(9),RangeError); checks++;
input.advance(10); checks++;
console.log(`${checks} checks passed`);
