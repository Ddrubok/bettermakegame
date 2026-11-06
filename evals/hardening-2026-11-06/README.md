# Scorer hardening and shorter runtime instructions

The comparison scorer now fails incomplete evaluations and separates candidate execution from the verdict. The installed skill adds external-content trust boundaries and lets a clear local repair proceed directly to code and verification. This is a maintainer implementation/verification pass, not a fresh model-effectiveness study or an independent security audit.

Base revision: `c4b128bf2842b4a5fa057070f494f5520680282c`. See [results.json](results.json) for commands/outcomes and [snapshot.json](snapshot.json) for current file hashes. Historical runs and their stored outputs are unchanged.

## Changes

- The host owns the expected check inventory, assertions and completion record. Candidate `process.exit(0)` cannot turn a file-level test result into a functional pass. Startup, each named check, completion, clean exit and cleanup must all succeed.
- The default candidate backend is a pinned Linux Node container with read-only staging, no host environment forwarding or project mount, no network, an unprivileged UID, dropped capabilities and bounded memory, processes, CPU, output and time. Only the candidate module and generic transport enter the container; judges remain outside. Docker/image unavailability refuses execution. The explicit trusted-local option is for reviewed fixtures and is not a hostile-code sandbox. See the [runner's operating limits](../comparison/README.md#judge-after-each-response-is-complete).
- `SKILL.md` and the finding receiver distinguish evidence from embedded instructions or claimed user approvals. Useful findings can still be acted on within the actual conversation's scope. These are instruction defenses, not a demonstrated prompt-injection success-rate result.
- A clear small repair no longer requires a technique reference. References remain available when choosing a mechanism or resolving integration details. The entrypoint shrank from **1,008 to 792 whitespace-delimited words (21.4%)**, including frontmatter. No token, latency or cost saving is inferred from that word count. The runtime still contains 13 documentation/metadata/license files and no executable scripts.

## Verification

| Check | Observed result |
| --- | --- |
| Original game-contract regressions | 42 passed |
| Scorer suite, Windows trusted-local | 27 passed; one Docker-only probe skipped |
| Same scorer suite, WSL with real Docker | 28 passed; none skipped |
| Six archived comparison outputs | All passed, with 5/4/5 checks per condition (28 named checks across six candidates) |
| Three deliberately defective starting inputs | All rejected |
| Import/call `exit(0)`, fake TAP/completion, assertion tampering, missing exports/syntax faults | Rejected |
| Infinite loops, dangling timer, output flood, nonzero final exit, malformed trailing bytes | Rejected within configured bounds |
| Missing Docker | Refused candidate execution; no local fallback |
| Fake parent secret and external file read/write; candidate self-write | Not available/denied; external fake data unchanged |
| Docker egress, UID, capabilities, privilege escalation and mounted files | No route to reserved test address; only loopback, UID 65534, zero effective capabilities, no-new-privileges; only candidate and transport mounted |
| Interrupt handling | Candidate stopped; subsequent requests rejected |
| Runtime format, internal links and license | Valid; 28 links, zero errors |
| Post-run containers | No `bmg-score-` containers remained |

Windows host: Node v22.18.0. WSL host and container: Node v22.22.0. Python validation used Python 3.12 with PyYAML supplied through an isolated `uv run` environment. Real Docker tests used the existing WSL daemon; no global Docker settings or other project containers were changed. The pinned Node image was downloaded for this evaluation and retained for reruns.

## What remains unproven

The short-versus-full skill findings remain unchanged: both conditions passed the earlier 14 checks, and the later study included companion skills. This pass proves neither an accuracy advantage nor faster completion, better feel or lower model cost. The [next holdout protocol](../comparison/holdout-protocol.md) specifies previously unused real-game tasks, Better Make Game alone, repeated independent sessions, actual token/time counters and unnecessary-change review. It is **NOT RUN** under this project's single-agent setting.

The isolation tests use controlled synthetic probes, not kernel/container exploit research. The separate historical browser scorer and agent tools are not hardened by this runner. A public fixed benchmark still permits task-specific hard-coding. No claim is made that previous public results were tampered with; all six archived outputs passed the new runner.
