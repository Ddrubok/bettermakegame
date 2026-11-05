# Jump buffer and modal repair

Repair `jump.mjs`. Near-landing presses at the configured buffer boundary are sometimes lost, and a pending jump can fire after a menu opens and closes. In this synthetic contract, the buffer window is 80 ms inclusive and the after-edge grace window is 100 ms inclusive. A new press must be consumed at most once; held/repeated presses do not create additional jumps. Opening or closing a modal clears stale pending intent, and a press made while the modal owns input must require release and a new press after closing.

Preserve the exported `JumpInput` and `replay` interfaces, configurable windows, death/revival clearing and timestamp validation. Do not widen the windows or change other movement rules. Change only the needed code in this file; do not add dependencies or effects. Run appropriate checks and report what changed, what ran and what remains unverified. This is input-state replay, not a physics or device test. Respond in Korean.
