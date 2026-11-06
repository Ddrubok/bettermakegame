# Better Make Game alone: effectiveness and cost comparison — 2026-11-06

[English](README.md) | [한국어](README.ko.md)

**The predefined functional checks tied. The full skill used about 6% more time and 13% more total input tokens, and performed better on a separate post-hoc touch-boundary check.** This does not establish a general advantage in accuracy, speed, or player-perceived game feel.

Independent Astra sessions compared the current hardened skill with short guidance. Six component tasks from two public games were run three times per condition, for **36 valid runs**. These are not six new games or a human playtest. The original game checkouts were not modified.

## Main results

| Measure | Short guidance | Full skill |
| --- | ---: | ---: |
| Task runs passed | 18/18 | 18/18 |
| Predefined functional checks | 90/90 | 90/90 |
| Protected-file changes | 0 | 0 |
| Unrelated semantic source changes found in review | 0 | 0 |
| Median elapsed time | 83.9 seconds | 88.6 seconds |
| Median total input tokens | 100,148 | 113,659.5 |
| Median uncached input tokens | 12,974 | 12,633 |
| Median output tokens | 2,654 | 2,864 |

Elapsed time runs from session-process start to completion, including model responses and tool execution. Setup, queueing, and later grading are excluded. Total input tokens are cumulative CLI counters including repeated context and cache reads; they are not the token count of the instruction file. Cache state was not forcibly reset, so increased total input must not be equated with increased monetary cost. No monetary cost was calculated.

Across 18 matched task/repetition pairs, the median differences were **+6.25 seconds**, a time ratio of **+6.4%**, **+8,817** total input tokens, **+219.5** uncached input tokens, and **+99** output tokens. These differ from subtracting the two condition medians in the table. They are descriptive statistics from three repetitions of a small task set, not claims of statistical significance or equivalence.

Valid-run totals were 1,769,428 input / 300,884 uncached input / 56,419 output tokens for short guidance, and 2,081,465 input / 248,505 uncached input / 59,958 output tokens for the full skill. Reasoning-output counters are retained in the raw records and were not added to output totals again. Infrastructure failures and setup/review usage described below are excluded from these totals.

## Tasks and outcomes

Tasks used problems observed in fixed upstream source, without seeded defects. Each task's brief, editable files, and preservation requirements were supplied before execution. Parentheses show the minimum–maximum across three runs.

| Task | Requirement | Predefined pass count per condition | Short median time (range), seconds | Full-skill median time (range), seconds |
| --- | --- | --- | ---: | ---: |
| H01 / 2048 | Keep game shortcuts from intercepting typing in inputs and nested contenteditable elements | 3/3 runs, 15/15 checks | 74.0 (70.9–113.9) | 91.6 (83.1–96.9) |
| H02 / 2048 | Prevent cancellation, multi-touch, and duplicate endings from reusing an earlier swipe | 3/3 runs, 15/15 checks | 135.0 (118.1–205.0) | 154.8 (142.6–159.1) |
| H03 / 2048 | Prevent queued terminal feedback from returning after restart or continue | 3/3 runs, 15/15 checks | 71.4 (66.1–82.3) | 80.4 (79.7–85.6) |
| H04 / Tetris | Advance the displayed score at 60 points per second independently of frame rate | 3/3 runs, 15/15 checks | 85.4 (75.5–88.6) | 85.5 (65.5–99.0) |
| H05 / Tetris | Retain leading digits at 100,000 points and above, with a minimum width of 5 digits | 3/3 runs, 21/21 checks | 65.9 (62.6–70.5) | 63.7 (61.5–67.1) |
| H06 / Tetris | Review the intentional 28-piece pool and scoring rules while preserving source | 3/3 runs, 9/9 checks | 129.7 (116.6–135.1) | 156.3 (134.5–157.2) |

Per-task token medians/ranges and all 36 measurements are in [summary.json](summary.json) and [results.json](results.json). The original inputs passed 2/5, 1/5, 3/5, 1/5, 4/7, and 3/3 checks respectively. Known-good controls passed every check. This [judge self-check](self-check.json) was not counted as evidence of skill effectiveness.

H06 prohibited source edits. It therefore does not show that an agent autonomously preserved a sound design when editing was allowed. Nor was it a defect-free preservation control. All six reports distinguished the intentional rules and additionally identified an excluded final index in random selection and a skipped row 0 in line removal. A separate browser probe [confirmed those observations](posthoc-review.json), without measuring their frequency or reachability in natural play.

## Post-hoc exploration: a second touch outside the board

Condition-masked source review revealed that H02's predefined checks sent every touch to the board. A separate probe was written before opening the condition map.

1. The first finger starts a swipe on the board.
2. A second finger touches and releases outside the board.
3. The first finger completes its swipe on the board.
4. That gesture must not move; the next clean swipe must work.

| Outcome | Original input | Short guidance | Full skill |
| --- | ---: | ---: | ---: |
| Additional boundary check passed | 0/1 | 0/3 | 3/3 |

All three short-guidance implementations missed the outside-board second touch and moved. All three full-skill implementations tracked document-wide contact changes and cancelled the gesture. Both conditions handled the next clean gesture. Document-wide tracking was relevant to the task; a longer diff alone was not classified as an unnecessary change.

**This was a post-hoc probe selected after inspecting output code.** It was not added to the predefined 90/90 score, and success rates were not recalculated. It repeats one boundary three times rather than testing three independent tasks. It suggests a boundary-handling benefit, but a superiority claim needs fresh tasks with this condition specified in advance. [Individual outcomes](posthoc-touch.json) are retained. The short-guidance H02 reports' broad claim to have fixed multi-touch does not cover this previously untested boundary.

## Execution and review method

- Model: `gpt-6-astra`, reasoning `high`, Codex CLI `0.167.0`, Windows, Node `v22.18.0`, and the same Playwright/Chromium tools. The alias was identical; the exact serving-model snapshot identifier was not independently available.
- There were 36 fresh sessions, 18 per condition, without shared conversation, diagnoses, or answers. Task/condition order was shuffled with seed `20261106`, concurrency was three, and each session had a 360-second limit. The valid batch had no interrupted sessions, timeouts, or infrastructure errors.
- Short guidance: `Diagnose the actual cause before adding polish. Make the smallest scoped repair, preserve unrelated rules, check boundaries and lifecycle, and report only checks actually run.`
- Full condition: the same task and common instructions plus the 13-file hardened Better Make Game package. Automatic discovery of other skills, project instructions, apps, hooks, web search, and subagents were disabled. A separate diagnostic confirmed that no skill catalog was exposed.
- All 18 full-condition sessions read `SKILL.md` once and no reference documents. This therefore compares **the core instructions and small-repair path with the full package available**, not the effect of reading every reference. It is also not a direct comparison of the previous 1,008-word entrypoint with the current 792-word entrypoint.
- Workspaces and answers were separated, with instructions prohibiting parent/sibling access. Model sessions used previously authorized full tool permissions; folder separation is not claimed as OS isolation. Separate grading used Chromium's sandbox and requests restricted to a local server, with host-owned check lists, completion accounting, and verdicts. This differs from the earlier synthetic evaluator's Docker execution.
- Functional scores did not rely solely on report wording or process exit codes. Thirty fixed, named checks were run three times per condition, alongside protected-file hash and completion checks.
- The coordinator model reviewed source relevance using the [predefined rubric](review-rubric.md), with condition names masked. The same coordinator selected tasks and wrote the judge, so this was neither independent evaluation nor a human blind study. The [review record](masked-source-review.json) is retained.
- The [command-log audit](execution-audit.json) found actual successful self-check and smoke commands in all 36 sessions. No claims of physical-device or human-feel validation were found. Self-reported assertion counts were not independently rescored one by one, and self-test counts were not used as accuracy scores.

CLI JSON events and usage collection followed the [official non-interactive execution documentation](https://learn.chatgpt.com/docs/non-interactive-mode). Exact arguments, the common prompt, and original hashes are in [frozen-protocol.json](frozen-protocol.json).

## Excluded infrastructure failure and additional usage

The first attempt used a Windows `workspace-write` configuration that blocked even file reads. The batch was stopped after 17 sessions had started: 14 had completed with tool-error reports and three were interrupted. No game source changed. Those records were retained under `infrastructure-attempt-1`.

File reads, writes, and browser execution were then checked using the already authorized local full-permission setting. Every task folder was restored to its initial hashes before starting 36 fresh sessions. Global settings were not changed. Retries were not selected by favorable functional outcomes.

Known usage from the failed attempt was **701,076** input, **91,540** uncached input, and **5,384** output tokens. Partial usage from the three interrupted sessions, environment/catalog diagnostics, and coordinator work are not included. The entire project must therefore not be described as using only 36 model calls. The [excluded-attempt record](excluded-infrastructure-usage.json) is separate from the condition comparison.

## Scope and next decision

Tasks came from two public codebases not used in this skill's earlier evaluations. Their absence from model training cannot be guaranteed, so they are not described as code the model had never seen. This is not a complete holdout study covering every original goal for diverse games, navigation, and sound-behavior preservation. Most tasks were narrow, explicit input, display, or callback-lifecycle repairs; high baseline success may have obscured differences.

Current evidence **does not support always applying the full skill to simple repairs**. Retaining the core-only fast path is reasonable. Further evaluation should prioritize new tasks with complex boundaries—input ownership inside/outside a board, focus loss, and intersecting cancellation/restart paths—over expanding documentation. Specify the present post-hoc condition in advance and test it in other games and input modes. Human game feel, enjoyment, physical devices, network latency, and extended play need separate evaluation.

## Artifacts and reproduction

Sources are [2048](https://github.com/gabrielecirulli/2048/tree/478b6ec346e3787f589e4af751378d06ded4cbbc) and [Javascript Tetris](https://github.com/jakesgordon/javascript-tetris/tree/e5c0c42f7dac0f3514a55eff656c6e22e95d68ed); their MIT licenses are retained in the snapshots. Clean source checkouts, frozen judge/input/skill hashes, and 36 unique session IDs were verified. [snapshot.json](snapshot.json) records provenance, hashes, and environment limits.

[artifacts.zip](artifacts.zip) contains original task inputs, actual changed files, added self-checks/screenshots/final reports, all 13 skill files, and the original judge and execution tools. Original absolute paths are preserved as a record of the execution environment. The replay adapter uses the unchanged judge and replaces only Playwright dependency resolution with an environment variable or normal package lookup. Candidate-written check scripts are archived; the replay adapter does not automatically execute them on the host.

Extract into a separate folder and, with Playwright and Chromium installed, recheck **stored code outputs only** as follows. This does not launch new model comparisons.

```powershell
# If needed, specify the absolute path to an installed Playwright module.
$env:BMG_PLAYWRIGHT_MODULE = 'C:/path/to/node_modules/playwright'
node replay.mjs H02-skill-1
node replay.mjs H06-short-1
```

Original JSONL command logs, requests, complete workspaces, and failed attempts remain under `.skill-validation/bmg-comparison-2026-11-06/` in the Default workspace. Complete raw logs were not duplicated into the repository package. The [archive hash](artifact-index.json) and per-result session IDs link the records. Calling the model again is not guaranteed to reproduce the same outputs.
