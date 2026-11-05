# Reference values and local trials

Read when numerical starting points materially help a selected technique. Prefer the project's existing values and measured behavior. Record **value + units + source/version or local reason + applicability + check**. Distinguish a shipped example, an engine default, a fixture parameter and a measured target result.

## Sourced examples, not presets

Sources checked 2026-11-05. These values explain concrete implementations; they are not universal recommendations or a claim of the best feel.

| Source | Value and context | Use and limit |
| --- | --- | --- |
| [Celeste's published Player source](https://github.com/NoelFB/Celeste/blob/master/Source/Player/Player.cs) | `JumpGraceTime = 0.1f` seconds; `VarJumpTime = .2f` seconds in that controller | A named example of post-edge grace and variable-jump duration. They are separate mechanisms, not input-buffer defaults. The surrounding movement, collision and state logic matter; copy neither the game code nor its tuning wholesale. |
| [Unity Input System 1.13.1 InputSettings](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/api/UnityEngine.InputSystem.InputSettings.html) | Default button press point `0.5`, a dimensionless actuation threshold | This package default is not a stick deadzone or a 0.5-second delay. Check per-control/interaction overrides and release behavior on the actual device. |
| [Unreal Quartz overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-quartz-in-unreal-engine) | Its explanatory example uses 2,048 samples at 48,000 samples/s: about 42.7 ms per buffer | Arithmetic for understanding buffer delay, not a recommended buffer size or measured end-to-end latency. Threading, device and display delays are additional. |

When no transferable value exists, propose a bounded local trial and say why; do not manufacture a published source or a precise improvement percentage. Compare accepted/rejected inputs, event alignment and preserved outcomes before judging feel. Use observed clock resolution and boundaries, not arbitrary precision.

## Half-throttle example

The historical racing fixture uses a deceleration rate of 36 m/s² for every reduction in target speed. Reducing its target from 12 to 6 m/s therefore reaches the target in `6 / 36 = 1/6` second. This follows from source arithmetic; it is not a measured device response or proof of poor feel. Its original request constrained full release to stop within 0.4 seconds and did not specify partial-throttle behavior.

The new regression fixture makes an additional, explicitly local requirement: partial-throttle reductions use a separate rate of 8 m/s², while full release retains the original stopping rule. The new interval is `6 / 8 = 0.75` seconds. This slower transition is a testable design alternative, not an established improvement. Test both the partial reduction and full release, compare update schedules, and play before choosing a real game's setting.
