# Short prompt versus full skill — 2026-11-05

Both conditions repaired all three cases under the predefined checks. **This run did not demonstrate an added correctness benefit from the full skill for these small, explicit repair tasks.** It also does not establish equivalence across other tasks or models.

짧은 프롬프트와 전체 스킬 모두 세 사례를 해결했습니다. **이번처럼 요구사항이 명확한 작은 수정에서는 전체 스킬의 추가 정확도 이점이 확인되지 않았습니다.** 다른 작업과 모델에서도 같다는 결론은 아닙니다.

| Case / 사례 | Short / 짧은 지침 | Full skill / 전체 스킬 | Observed result / 관찰 |
| --- | --- | --- | --- |
| R01: analog release / 아날로그 해제 | 5/5 | 5/5 | Both suppress released-input noise while preserving active analog input and half-throttle behavior / 양쪽 모두 잔류 입력을 처리하고 기존 동작 보존 |
| E01: finished effect / 종료된 효과 | 4/4 | 4/4 | Both retain per-round completion history and preserve live corrections / 양쪽 모두 종료 이력과 활성 보정 유지 |
| J01: jump boundary/modal / 점프 경계·모달 | 5/5 | 5/5 | Both make the same two functional repairs / 양쪽 모두 같은 두 동작 수정 |

The 14 checks per condition are correlated requirements from three cases, not 14 independent game trials. All six candidates also passed syntax checks and the maintaining agent reran their own check scripts successfully. Case tasks, provided skill files and returned file scope were checked. No unrequested game features appeared in the candidate diffs.

조건별 14개 검사는 세 사례에 속한 요구사항이며 독립적인 게임 실험 14회가 아닙니다. 여섯 결과물의 문법 검사와 각 에이전트가 만든 검사도 관리자가 다시 실행해 통과했습니다. 과제·제공 스킬 파일의 보존과 반환 파일 범위를 확인했으며, 코드 변경에서 요청하지 않은 게임 기능 추가는 발견하지 못했습니다.

## Method and evidence / 방법과 근거

- Six new contexts via the host's native agent tool, requesting `gpt-6-astra`, with no prior conversation fork. Same host and Node v22.18.0; no explicit reasoning-effort override. Exact serving revision and a complete access transcript were not exposed independently.
- One run per case/condition. R01 short/skill and E01 short ran first; E01 skill and J01 short/skill ran next. Parallel execution was possible, so timing is not a controlled comparison and no speed claim is made.
- Both conditions got identical tasks and starting source. Short received one principle paragraph; full received the frozen runtime package and a relevant-reference reading instruction. Judge files, completed solutions and other responses were excluded from the prepared folders.
- File separation and access instructions were used, not an OS sandbox. We checked returned files, not every filesystem read. This is not a fully blinded/isolated study. The maintaining agent authored and knew the cases and judges; the cases derive from familiar public fixtures.

호스트의 새 Astra 세션 6개를 사용했고, 이전 대화는 전달하지 않았습니다. 입력·시작 코드·도구 조건을 맞추고 채점 파일을 입력 폴더 밖에 두었습니다. 다만 운영체제 수준의 격리가 아니며 모든 파일 읽기를 독립 감사한 것은 아닙니다. 사례와 기준을 만든 관리자는 정답을 알고 있었고, 사례도 기존 공개 예제에서 왔습니다. 실행 속도와 일반적인 성능 향상률은 측정하지 않았습니다.

See [results.json](results.json), [prepared input hashes](prepared-inputs.json), and each candidate/report/check under [outputs](outputs). Reports only normalize the machine-specific Node executable path; implementation and check-script bytes are preserved.

## Exploratory follow-up / 사후 추가 확인

After primary scoring, the same [probe](posthoc-probe.mjs) called `dispose()` followed by `finish('late-cleanup')` on both E01 outputs. Neither recreated an active effect. The short output kept its new finished-ID set empty; the full-skill output added one ID after disposal. The maintained canonical fixture also kept no finished history. This is a cleanup concern in that full-skill candidate, outside the predefined judge, so it did **not** retroactively change the 4/4 score. No follow-up agent repair was applied to the recorded outputs. It is not evidence that using the skill generally worsens results.

사전 채점 뒤 같은 추가 검사에서 E01의 전체 스킬 결과물은 `dispose()` 후 늦게 들어온 `finish()`가 종료 ID를 하나 다시 기록했습니다. 짧은 지침 결과물과 관리자가 수정한 기준 예제에는 이 기록이 생기지 않았습니다. 활성 이펙트가 되살아난 것은 아니지만 정리 경로의 추가 검토 사항입니다. 사전 판정 항목 밖이므로 기존 점수를 사후 변경하지 않았고, 평가 결과물도 다시 고치지 않았습니다. 이를 스킬의 일반적인 열세로 해석할 수는 없습니다.

## Remaining limits / 남은 한계

Existing U/V comparisons are still NOT RUN; these are different cases. Human preference/playtests, Korean automatic discovery, real devices/networks and Unity/Godot/Unreal execution remain untested. Further evaluation should use harder or less explicit held-out cases, repeat each condition, and preserve task scope and human review. Do not expand the skill merely to encode these answers or force a favorable score.

기존 U/V 비교는 별도 사례이므로 NOT RUN을 유지합니다. 사람의 체감·선호, 한국어 자동 호출률, 실기기·실네트워크, Unity·Godot·Unreal 실행은 아직 미검증입니다. 후속 평가는 새로운 사례와 조건별 반복이 필요합니다. 좋은 점수를 만들기 위해 이번 정답을 지침에 추가하는 방식은 피합니다.
