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

The default runner requires a local Linux Docker daemon and Node 22.13+ on the host. Prepare the pinned image once, outside candidate execution:

```sh
docker pull node:22.22.0-bookworm-slim@sha256:dd9d21971ec4395903fa6143c2b9267d048ae01ca6d3ea96f16cb30df6187d94
```

```sh
node evals/comparison/score.mjs R01 /path/to/controller.mjs
node evals/comparison/score.mjs E01 /path/to/impact.mjs
node evals/comparison/score.mjs J01 /path/to/jump.mjs
```

On Windows with Docker only inside WSL, run these commands from that distribution, using its Linux paths. The caller must already have access to its Docker daemon; this runner does not change Docker permissions or install/start services.

The scorer copies only one standalone candidate module and a transport worker into a temporary directory. The candidate runs as UID 65534 with a read-only filesystem, no network, no added capabilities, no privilege escalation, at most 32 processes, 128 MiB memory, one CPU and a 10-second execution deadline. It receives no host environment variables or project mounts. Candidate output is limited to 1 MiB and is never interpreted as test results. Filesystem staging is for these dependency-free fixtures; relative imports and npm dependencies are intentionally unsupported.

All assertions and the 5/4/5 check inventory remain in the host process. The runner records each completed check, requires all checks to pass, validates startup/completion and requires clean exit. Early exit, missing checks, malformed responses, output overflow and timeout fail. Timed-out/interrupted candidates are killed and their named container is removed; cleanup failure also fails the score. An uncatchable host termination can prevent cleanup; remove only the abandoned `bmg-score-<uuid>` container identified by that run. Never use a broad container prune command.

Docker or image unavailability fails closed. There is no automatic local fallback. For **reviewed, trusted fixture code only**, append `--trusted-local`. That explicit mode uses a separate Node process, an environment allowlist, a temporary read allowlist, no write/process/worker permission, an output limit and the same deadline. **It is not a hostile-code sandbox and does not block network access.** Node's [permission model](https://nodejs.org/docs/latest-v22.x/api/permissions.html) explicitly excludes malicious-code security guarantees. The Docker mode uses the documented [container restrictions](https://docs.docker.com/reference/cli/docker/container/run/); container/kernel/runtime vulnerabilities remain outside this harness's guarantees. Use a disposable isolated machine for actively hostile submissions.

Candidate RPC values are untrusted observations: they never contain a verdict. Parent-side assertions resist candidate assertion monkey-patching and fake TAP success, but a public fixed benchmark cannot prevent an implementation from hard-coding valid outputs. This runner hardens the three comparison modules; it does not sandbox the separate historical Playwright discovery runner or arbitrary model tool sessions.

Stdout is reserved for the transport protocol; candidate logging there fails the run. Stderr is bounded and suppressed. The R01 numeric assertions require finite numbers so JSON conversion of `NaN`/infinity to `null` cannot masquerade as zero; input arguments are frozen in the candidate process for immutability checks.

Run harness regressions separately from the original 42 fixture regressions:

```sh
node --test evals/comparison/scorer.test.mjs
# Linux/WSL: repeat against real containers, including egress/capability checks
BMG_DOCKER_TEST=1 node --test evals/comparison/scorer.test.mjs
```

The first command executes only reviewed synthetic probes using trusted-local mode and skips the Docker-only probe. The second requires the pinned image and runs every probe in Docker; it does not skip missing infrastructure as a success.

Keep `judge/` and these commands outside agent inputs. Grade the completed source with the same checks for both conditions, then review changed files, preservation, unsupported claims and the actual evidence in the final response. Do not score eloquence as correctness. A candidate may use a different valid implementation; tests assert the public task contract rather than a preferred patch.

Before model evaluation, verify that defective starting inputs fail relevant checks and the corrected reference implementations pass. A deliberate presentation-side write must be detectable by the separate world-preservation regression harness. Those self-checks validate the evaluation setup, not the skill.

Record case, condition, input/runtime hashes, exact model/host configuration when available, session ID, changes, commands, pass/fail, scope violations, observed limits and artifacts. If model revision or reasoning parameters were not available, say so. Existing U/V evaluation statuses and human/device/engine tests remain independent.

With one run per case and condition, report per-case observations only. Both conditions passing is a valid result and does not establish a benefit from the full skill. Neither a small advantage nor three familiar cases justify an accuracy percentage, human preference claim or broad superiority statement.

The next effectiveness study is specified in [holdout-protocol.md](holdout-protocol.md). It is **NOT RUN**; the hardened scorer and smaller entrypoint are not substitute effectiveness evidence.
