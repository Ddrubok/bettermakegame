# Feedback repairs — 2026-11-05

This follows published base commit `1ad3281d55ec5702325b57faf4a41cef2101382e`. The first update's results and snapshots remain historical. Current runtime instructions now live under `skills/bettermakegame/`; recorded root-level paths in old snapshots refer to their original revisions.

## Repairs

- **Released analog input:** the racing alternative has a configurable, inclusive release deadzone. Its local default is 0.01, with larger values retaining their analog magnitude. This prevents residual release input from maintaining speed; it does not tune a physical controller or remove every intentional transition at the boundary.
- **Finished effects:** completion history is retained for an event's current-round lifetime. Higher revisions cannot recreate a completed confirmed or provisional effect; a different event or a new round still works.
- **Meaningful world-preservation test:** the synthetic integration adapter receives shared world state so an illegal write is observable. A deliberately mutated presentation method changes velocity; the normal preservation test then fails. This is an evaluation harness, not a recommendation to expose authoritative state to production VFX code.
- **Audio route:** the selection table now links directly to `audio-haptics.md`.
- **Packaging and discovery:** only `skills/bettermakegame` is installable runtime; completed examples, judges and responses remain under repository `evals/`. Korean task phrases were added to the description without claiming a measured activation-rate improvement.

기존 코드에서 스로틀 0.005는 0.4초 후 8.8m/s, 1.5초 후 0.06m/s였습니다. 완전 정지가 아니었습니다. 종료된 효과도 더 높은 revision을 받으면 active 개수가 0에서 1로 바뀌었습니다. 이를 재현한 후 수정했습니다. 런타임 폴더 분리와 한국어 호출 문구 추가는 자동 호출 성능이나 보안 격리를 입증하지 않습니다.

## Checks and their limits

The [current result](results.json) and [snapshot](snapshot.json) identify the checked code/instructions. Thirty-eight Node regression tests passed. Before repair, the targeted new suite reported 7 failures out of 22; two failures reflected the changed integration-harness API, so this is not a count of seven independent bugs. An injected world-write mutation was also detected by the normal preservation assertion.

The comparison judge failed the three defective starts on their relevant checks and passed the corrected references. The [six-session comparison](../comparison/runs/2026-11-05/report.md) then found both the short-prompt and full-skill conditions passed all predefined checks: 14 per condition across three cases. This provides bounded agent-use evidence, **not an observed correctness improvement from the full skill**.

38개 회귀 검사를 통과했고, 일부러 월드를 바꾸는 결함도 기존 보존 검사에서 실패하는 것을 확인했습니다. 이후 새 Astra 세션 6회 비교에서 짧은 지침과 전체 스킬이 모두 통과했습니다. 요구사항이 분명한 이번 작은 수정에서는 전체 스킬의 추가 이점이 확인되지 않았습니다. 결과와 한계를 그대로 남겼습니다.

The modal source/test was unchanged, so its earlier 9-browser-check result was not rerun or counted as a new result. Historical U/V, human playtests, physical controller/audio/haptic tests, real networking and native-engine checks remain separate and NOT RUN. Package checks do not certify automatic discovery in every host.

## External reference check

The earlier reviewer could not retrieve some sources; this session retrieved and inspected all three numerical references on 2026-11-05:

| Source | What was checked | What was not established |
| --- | --- | --- |
| [Celeste Player source](https://github.com/NoelFB/Celeste/blob/master/Source/Player/Player.cs) | `JumpGraceTime` is 0.1f and `VarJumpTime` is .2f; the grace timer uses elapsed time | Suitability of those values in another game; input buffering defaults |
| [Unity Input System 1.13.1 InputSettings](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/api/UnityEngine.InputSystem.InputSettings.html) | The default button press point is documented as 0.5 | A stick deadzone, delay or universal device calibration |
| [Unreal Quartz overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-quartz-in-unreal-engine) | Its 2,048-sample / 48 kHz example describes up to about 43 ms of buffer delay; division gives 42.666… ms | Total physical output latency, recommended buffer size or successful engine integration |

원문 대조는 수치와 문맥을 확인한 것입니다. 엔진에서 실제 실행했다는 의미는 아닙니다.
