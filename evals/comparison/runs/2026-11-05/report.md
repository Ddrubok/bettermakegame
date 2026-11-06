# Short prompt versus full skill — 2026-11-05

[English](report.md) | [한국어](report.ko.md)

Both conditions repaired all three cases under the predefined checks. **This run did not demonstrate an added correctness benefit from the full skill for these small, explicit repair tasks.** It also does not establish equivalence across other tasks or models.

| Case | Short guidance | Full skill | Observed result |
| --- | --- | --- | --- |
| R01: analog release | 5/5 | 5/5 | Both suppress released-input noise while preserving active analog input and half-throttle behavior |
| E01: finished effect | 4/4 | 4/4 | Both retain per-round completion history and preserve live corrections |
| J01: jump boundary/modal | 5/5 | 5/5 | Both make the same two functional repairs |

The 14 checks per condition are correlated requirements from three cases, not 14 independent game trials. All six candidates also passed syntax checks and the maintaining agent reran their own check scripts successfully. Case tasks, provided skill files and returned file scope were checked. No unrequested game features appeared in the candidate diffs.

## Method and evidence

- Six new contexts via the host's native agent tool, requesting `gpt-6-astra`, with no prior conversation fork. Same host and Node v22.18.0; no explicit reasoning-effort override. Exact serving revision and a complete access transcript were not exposed independently.
- One run per case/condition. R01 short/skill and E01 short ran first; E01 skill and J01 short/skill ran next. Parallel execution was possible, so timing is not a controlled comparison and no speed claim is made.
- Both conditions got identical tasks and starting source. Short received one principle paragraph; full received the frozen runtime package and a relevant-reference reading instruction. Judge files, completed solutions and other responses were excluded from the prepared folders.
- File separation and access instructions were used, not an OS sandbox. We checked returned files, not every filesystem read. This is not a fully blinded/isolated study. The maintaining agent authored and knew the cases and judges; the cases derive from familiar public fixtures.

See [results.json](results.json), [prepared input hashes](prepared-inputs.json), and each candidate/report/check under [outputs](outputs). The original candidate reports are in Korean. Reports only normalize the machine-specific Node executable path; implementation and check-script bytes are preserved.

## Exploratory follow-up

After primary scoring, the same [probe](posthoc-probe.mjs) called `dispose()` followed by `finish('late-cleanup')` on both E01 outputs. Neither recreated an active effect. The short output kept its new finished-ID set empty; the full-skill output added one ID after disposal. The maintained canonical fixture also kept no finished history. This is a cleanup concern in that full-skill candidate, outside the predefined judge, so it did **not** retroactively change the 4/4 score. No follow-up agent repair was applied to the recorded outputs. It is not evidence that using the skill generally worsens results.

## Remaining limits

Existing U/V comparisons are still NOT RUN; these are different cases. Human preference/playtests, Korean automatic discovery, real devices/networks and Unity/Godot/Unreal execution remain untested. Further evaluation should use harder or less explicit held-out cases, repeat each condition, and preserve task scope and human review. Do not expand the skill merely to encode these answers or force a favorable score.
