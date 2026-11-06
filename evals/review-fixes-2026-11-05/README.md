# Feedback repairs — 2026-11-05

[English](README.md) | [한국어](README.ko.md)

Historical record published in `fd3c15d`. The later [general finding receiver](../handoff-followup-2026-11-05.md) is outside this frozen runtime and its six-session comparison.

This follows published base commit `1ad3281d55ec5702325b57faf4a41cef2101382e`. The first update's results and snapshots remain historical. Current runtime instructions now live under `skills/bettermakegame/`; recorded root-level paths in old snapshots refer to their original revisions.

## Repairs

- **Released analog input:** the racing alternative has a configurable, inclusive release deadzone. Its local default is 0.01, with larger values retaining their analog magnitude. This prevents residual release input from maintaining speed; it does not tune a physical controller or remove every intentional transition at the boundary.
- **Finished effects:** completion history is retained for an event's current-round lifetime. Higher revisions cannot recreate a completed confirmed or provisional effect; a different event or a new round still works.
- **Meaningful world-preservation test:** the synthetic integration adapter receives shared world state so an illegal write is observable. A deliberately mutated presentation method changes velocity; the normal preservation test then fails. This is an evaluation harness, not a recommendation to expose authoritative state to production VFX code.
- **Audio route:** the selection table now links directly to `audio-haptics.md`.
- **Packaging and discovery:** only `skills/bettermakegame` is installable runtime; completed examples, judges and responses remain under repository `evals/`. Korean task phrases were added to the description without claiming a measured activation-rate improvement.

Before repair, a throttle value of 0.005 left speed at 8.8m/s after 0.4 seconds and 0.06m/s after 1.5 seconds; it did not reach a full stop. A higher revision also changed the active-effect count from 0 to 1 for an already finished effect. Both behaviors were reproduced before repair. Separating the runtime folder and adding Korean invocation phrases do not establish automatic-discovery performance or security isolation.

## Checks and their limits

The [current result](results.json) and [snapshot](snapshot.json) identify the checked code/instructions. Thirty-eight Node regression tests passed. Before repair, the targeted new suite reported 7 failures out of 22; two failures reflected the changed integration-harness API, so this is not a count of seven independent bugs. An injected world-write mutation was also detected by the normal preservation assertion.

The comparison judge failed the three defective starts on their relevant checks and passed the corrected references. The [six-session comparison](../comparison/runs/2026-11-05/report.md) then found both the short-prompt and full-skill conditions passed all predefined checks: 14 per condition across three cases. This provides bounded agent-use evidence, **not an observed correctness improvement from the full skill**.

The modal source/test was unchanged, so its earlier 9-browser-check result was not rerun or counted as a new result. Historical U/V, human playtests, physical controller/audio/haptic tests, real networking and native-engine checks remain separate and NOT RUN. Package checks do not certify automatic discovery in every host.

## External reference check

The earlier reviewer could not retrieve some sources; this session retrieved and inspected all three numerical references on 2026-11-05:

| Source | What was checked | What was not established |
| --- | --- | --- |
| [Celeste Player source](https://github.com/NoelFB/Celeste/blob/master/Source/Player/Player.cs) | `JumpGraceTime` is 0.1f and `VarJumpTime` is .2f; the grace timer uses elapsed time | Suitability of those values in another game; input buffering defaults |
| [Unity Input System 1.13.1 InputSettings](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/api/UnityEngine.InputSystem.InputSettings.html) | The default button press point is documented as 0.5 | A stick deadzone, delay or universal device calibration |
| [Unreal Quartz overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-quartz-in-unreal-engine) | Its 2,048-sample / 48 kHz example describes up to about 43 ms of buffer delay; division gives 42.666… ms | Total physical output latency, recommended buffer size or successful engine integration |

Source inspection checked the values and their context. It does not imply execution in those engines.
