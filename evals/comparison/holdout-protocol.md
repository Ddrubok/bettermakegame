# Next effectiveness and cost comparison

Status: **BOUNDED RUN COMPLETED on 2026-11-06**; see the [36-session comparison](../holdout-2026-11-06/README.md). Both arms passed 90/90 primary checks. A separately labeled post-hoc touch boundary favored the skill. The run used six component tasks from two public games, a model alias rather than an independently identified model snapshot, uncontrolled cache state, and a review-only preservation task that also contained defects. It does not fulfill every broader coverage goal below. The original protocol is retained below for future evaluations. Do not load this document or judge keys during ordinary game work.

Before running, freeze six previously unused real-game tasks from projects outside the skill's existing cases. Include input/state repairs, UI/navigation and feedback/lifecycle work; include a sound existing behavior where preserving it is reasonable. Record each source revision, reproducible symptom, authorized scope and preservation conditions. Reject tasks already used to tune the skill. Keep answers and assessor-only checks outside both task environments. A task derived from a familiar published solution is not a holdout.

Compare only two conditions: the task plus the existing short guidance paragraph, and the identical task plus **Better Make Game alone**. Disable automatic companion-skill loading in both conditions. If companions are needed for a separate study, make that a separately labeled arm. Freeze hashes of the input, skill, judge and brief before starting.

Use three fresh sessions per task and condition (36 total), with the same model revision, reasoning settings, tools, machine, work budget and environment. Randomize condition order within task/repetition pairs. Reset each workspace and record cache state. Do not reuse one session's diagnosis or edit to improve the other. This number provides repeated observations, not a statistical-power claim.

Judge completed outputs without showing condition labels where feasible. Separate implementation correctness, new regressions, unnecessary scope changes and verification claims from player preference. Preserve all failed, timed-out and no-edit outcomes. Label infrastructure failures and retries explicitly instead of dropping inconvenient results.

Record one JSON record per session with these fields:

| Fields | Meaning |
| --- | --- |
| `task_id`, `condition`, `repetition`, `session_id` | Stable pairing and source transcript |
| `input_sha256`, `skill_sha256`, `judge_sha256`, `model`, `host`, `settings` | Frozen inputs and available configuration; unknown values are null |
| `started_at`, `ended_at`, `elapsed_ms`, `timeout` | Actual end-to-end task time; report infrastructure setup separately |
| `input_tokens`, `cached_input_tokens`, `output_tokens`, `reasoning_tokens`, `usage_source` | Host usage counters, with their inclusion rules; absent counters remain null |
| `required_checks`, `completed_checks`, `failed_checks`, `regressions` | Assessor checks and evidence, not agent-reported success |
| `changed_files`, `changed_lines`, `unnecessary_changes`, `unsupported_claims` | Diff size plus reviewer explanation; fewer changed lines alone is not better |
| `runtime_evidence`, `unverified`, `scope_violations`, `artifacts` | Traceable checks and remaining limitations |

Publish task-paired correctness outcomes and per-task distributions of elapsed time and tokens, including failures. Report medians and ranges across repeats; do not count repetitions as independent games. Distinguish cached and uncached input cost. Word counts may describe document size but must not be converted to claimed tokens, latency or money without actual counters.

Improved feel needs matched playable builds, blinded player sessions where feasible, and task-specific observations or preferences. A functional pass or a maintainer's impression is insufficient. Keep human/device/network results separate from model repair accuracy.

Preparing this protocol alone does not authorize evaluation workers. For the recorded 2026-11-06 run, the user explicitly authorized 36 independent Astra evaluation sessions as an exception to the Default project's single-agent setting. That exception is not standing authorization for further runs. General added accuracy, speed and game-feel benefits over a short prompt remain unproven; preserve the narrower exploratory finding separately.
