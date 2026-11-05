# Short-prompt versus skill comparison

This is a maintainer comparison using three defective synthetic starting projects. It addresses **agent behavior**, separately from tests of completed fixture code. Preparation or a passing judge self-check is not a model evaluation.

The [2026-11-05 six-session run](runs/2026-11-05/report.md) is complete. Both conditions passed the predefined checks; the record includes a separately labeled exploratory cleanup concern and evaluation limits. This does not change the status of older U/V or human/device evaluations.

| Case | Starting problem | Requested preservation |
| --- | --- | --- |
| R01 | Released analog trigger leaves the car moving | Half-throttle trajectory, top speed, steering, input/state immutability |
| E01 | Finished effect returns on a later revision | Live corrections, pending/confirmed meaning, separate event/round ownership |
| J01 | Buffer boundary loses input; modal leaves stale intent | Window sizes, one-shot consumption, death clearing, held-input behavior |

`inputs/` contains the task and defective source. R01/E01 derive from the published `1ad3281` fixtures; J01 has two deliberate seeded faults in that revision's jump fixture. All are familiar maintainer-created cases, not evidence of generalization to unseen games.

## Prepare without exposing answers

```sh
node evals/comparison/prepare.mjs /path/to/new-session-folders
```

This produces three `short` and three `skill` folders. Both conditions receive identical case tasks and starting code. The short condition gets one compact principle paragraph; the skill condition gets only the runtime skill package and instructions to read relevant references. The judge, completed implementations, previous responses and results are not copied into either input folder. Hashes are recorded outside the six task folders.

Use a **fresh conversation for each folder**, with the same model, host, tools, reasoning settings and work limits. Explicitly scope file access to that folder; prohibit browsing parent folders, installed skills, repository history, published solutions or the other condition's output. Run both conditions independently; do not use the first result to improve the second prompt. Do not pass this protocol or judge criteria as extra input. File separation is not an OS sandbox: record that limitation and any observed out-of-scope access.

For the current Default workspace, AGENTS.md restricts subagents. Preparing these folders does not authorize launching evaluation agents; obtain a project-specific exception before separate sessions. No model run has been completed merely by preparing this directory.

## Judge after each response is complete

```sh
node evals/comparison/score.mjs R01 /path/to/controller.mjs
node evals/comparison/score.mjs E01 /path/to/impact.mjs
node evals/comparison/score.mjs J01 /path/to/jump.mjs
```

Keep `judge/` and these commands outside agent inputs. Grade the completed source with the same checks for both conditions, then review changed files, preservation, unsupported claims and the actual evidence in the final response. Do not score eloquence as correctness. A candidate may use a different valid implementation; tests assert the public task contract rather than a preferred patch.

Before model evaluation, verify that defective starting inputs fail relevant checks and the corrected reference implementations pass. A deliberate presentation-side write must be detectable by the separate world-preservation regression harness. Those self-checks validate the evaluation setup, not the skill.

Record case, condition, input/runtime hashes, exact model/host configuration when available, session ID, changes, commands, pass/fail, scope violations, observed limits and artifacts. If model revision or reasoning parameters were not available, say so. Existing U/V evaluation statuses and human/device/engine tests remain independent.

With one run per case and condition, report per-case observations only. Both conditions passing is a valid result and does not establish a benefit from the full skill. Neither a small advantage nor three familiar cases justify an accuracy percentage, human preference claim or broad superiority statement.
