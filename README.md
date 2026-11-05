# Better Make Game

[English](README.md) | [한국어](README.ko.md)

Better Make Game is an instruction skill for agents working on game controls, game feel, UI/HUD, feedback, and event flow. It helps an agent identify why an action feels awkward or its result is unclear, compare suitable changes, implement within the requested scope, and check what actually changed. It works with the game's existing engine and tools; it is not a runtime library or effect package.

Use it for a specific problem (a missed jump, nervous steering, an unreadable hit, an unclear turn) or a requested scene review. It also covers creating or revising UI/HUD layouts, navigation, and important sequences such as failure, victory, and reward. A narrow request stays narrow.

## How it works

1. **Describe the moment.** Identify the player's task, intended feeling, platform and input method, observed symptom, and constraints. Inspect the actual input path, state transitions, and relevant camera, animation, audio, and UI owners. Separate observations from inferred intent.
2. **Diagnose the cause.** A dropped input event, collision defect, frame stall, narrow action window, unclear cue, and deliberate challenge call for different responses. Repair a defect at its source before masking it with an assist or effect.
3. **Compare candidates.** Keep current behavior as a baseline. Consider a few mechanisms that fit the evidence, including reducing an excessive cue or leaving good behavior alone. State prerequisites, tradeoffs, affected state, tuning controls, and observable checks.
4. **Implement within scope.** A recommendation request yields recommendations. A build or fix request permits a focused change using the project's existing systems. Preserve intended challenge, identity, accessibility, and unrelated rules.
5. **Verify the result.** Reproduce the same moment before and after where possible. Check boundaries, repetition, interruption, and the busiest relevant case. Report runtime observations, automated checks, and remaining device or player-testing limits separately.

The decision workflow is in [game-feel-selection.md](skills/bettermakegame/references/game-feel-selection.md). Its technique tables are an **open-ended candidate library**, not 52 plug-and-play scripts, recommended defaults, or a checklist of required effects. An agent can use a mechanism outside the tables when the game warrants it.

## Candidate library

The three technique references contain 52 situation-led rows:

| Family | Rows | Representative situation and possible candidate |
| --- | ---: | --- |
| Input intent and timing | 6 | A jump press just before landing disappears: consider a short, once-consumed input buffer. |
| Movement and traversal | 9 | Racing steering is nervous at speed: compare speed-sensitive steering with the current controller. |
| Aiming and manipulation | 7 | A dragged object jumps under the pointer: preserve the grab offset. |
| Impact and motion | 8 | A confirmed hit is hard to locate: consider a local hit cue, with frequency and accessibility limits. |
| Camera | 6 | The route ahead is hidden: test directional framing against visibility in both travel directions. |
| Audio and haptics | 8 | Many contacts muddy the mix: examine voice priority or ducking, then listen to recovery. |
| Comprehension and flow | 8 | A puzzle move has an unclear consequence: show a truthful preview before commitment. |

See [control-techniques.md](skills/bettermakegame/references/control-techniques.md) and [feedback-flow-techniques.md](skills/bettermakegame/references/feedback-flow-techniques.md) for mechanisms, tuning dimensions, limits, and observable checks. The rows are prompts for investigation. Suitability depends on genre, actual mechanics, devices, performance, and intended difficulty. A cozy interaction may need a clear settling cue; a competitive game may reject hidden target snapping. Suggested parameters are trial values to measure and tune in the project, never universal presets.

### Know what the change affects

| Surface | Examples | What to preserve or check |
| --- | --- | --- |
| Presentation | Local sound, visual recoil, camera impulse, result animation | Truthful state, visibility, cleanup, accessibility, and control availability. |
| Input interpretation | Buffer, grace window, drag threshold, stick curve | Which inputs are accepted, expired, replaced, or consumed; unintended actions. |
| Controller motion or game rules | Acceleration, jump gravity, knockback, cancel windows | Reach, positioning, action eligibility, intended challenge, and competitive outcomes. |
| Shared time or authority | Simulation hit stop, time dilation, prediction | Clock ownership, pause and recovery, replay/network agreement, and authoritative results. |

Names alone do not determine safety: camera kick can move an aim ray, and a visual freeze can diverge from a moving collider. The skill asks the agent to trace those effects before implementing. A request to improve movement can authorize bounded controller tuning; a presentation-only request does not authorize rule or time changes.

## UI/HUD and event sequences

The [UI/HUD design guide](skills/bettermakegame/references/ui-hud-design.md) covers information hierarchy, placement, shape, focus, touch and controller operation, accessibility, and visual identity. It separates confirmed defects, unverified usability hypotheses, optional proposals, and elements worth preserving. For a redesign, compare the baseline with a small number of alternatives and state their gains, losses, and checks.

The [gameplay polish guide](skills/bettermakegame/references/gameplay-polish.md) traces important events from input and anticipation through action, result, and return of control. It covers feedback across UI, motion, camera, sound, and supported haptics, while keeping routine actions quick. Apply only stages relevant to the game; a puzzle need not gain combat effects, and an immediate button should not acquire an artificial wind-up.

## Use

Give the agent the project and scene, platform and input method, desired outcome, constraints, and whether you want recommendations or implementation. These examples use Codex skill invocation syntax:

**Recommendations only**

```text
$bettermakegame Review this platformer's near-landing jump misses.
Trace input and grounding first. Compare the current behavior with at most
two suitable changes, including tradeoffs and boundary checks. Do not edit.
Keep the intended precision challenge and existing accessibility settings.
```

**Scoped implementation**

```text
$bettermakegame Improve high-speed steering in this racing scene.
Inspect the current controller and input devices. Implement the smallest
useful change, keeping top speed and collision rules unchanged. Check taps,
held steering, reversals, and the same slalom at several speeds. Report
parameters changed and any device checks you could not run.
```

**UI/HUD review**

```text
$bettermakegame Review this mobile aiming HUD's hierarchy and controls.
Compare the current layout with two bounded alternatives. Keep the turn
rules and selection cues. Report findings and checks; proposals only.
```

Screenshots help with layout and state visibility. A playable build or video is needed to assess timing and motion; sound and haptics need suitable playback or devices. Automated tests can establish behavior such as input acceptance, not whether the game feels good to players.

## Make effects that fit the game

For VFX production, use this skill with [game-vfx](https://github.com/Ddrubok/game-vfx). Better Make Game establishes the event's meaning, art direction, and what must stay unchanged. Game VFX uses that short brief to build and inspect the effect, then returns the result for review in the actual scene.

The brief covers relevant shape, surface, color meaning, motion, emphasis, and camera scale. A genre name or a palette swap alone does not establish a style match. Missing references remain a stated assumption; a standalone preview does not prove in-game fit. See [vfx-handoff.md](skills/bettermakegame/references/vfx-handoff.md).

```text
$bettermakegame $game-vfx
Use this project's design references and game scene to make a matching
collision effect. Preserve collision and turn rules. Keep the pieces and
selection cues readable during repeated contacts, then check the result
in the scene.
```

Both skills can be used independently. The handoff applies instructions in the same session; it does not launch workers or install an integration service. The new handoff has passed document/package checks, but an independent end-to-end style-matching evaluation is **NOT RUN**.

## Install

Install only [`skills/bettermakegame`](skills/bettermakegame/SKILL.md) into the directory your host discovers as skills. It contains `SKILL.md`, `references/`, `agents/` and `LICENSE`. The repository root is for development; `evals/` contains completed examples and judge criteria and must stay outside normal skill installation.

Clone the source outside your host's skill directory, then copy the runtime package. These examples use `~/.agents/skills`; use the equivalent path for your actual host/configuration.

```sh
git clone https://github.com/Ddrubok/bettermakegame.git bettermakegame-source
mkdir -p ~/.agents/skills/bettermakegame
cp -R bettermakegame-source/skills/bettermakegame/. ~/.agents/skills/bettermakegame/
```

Windows PowerShell:

```powershell
git clone https://github.com/Ddrubok/bettermakegame.git bettermakegame-source
New-Item -ItemType Directory -Force "$env:USERPROFILE/.agents/skills/bettermakegame" | Out-Null
Copy-Item -Path ".\bettermakegame-source\skills\bettermakegame\*" -Destination "$env:USERPROFILE/.agents/skills/bettermakegame" -Recurse -Force
```

For a project install, use the project's skill-discovery directory. With `$skill-installer`, specify repository `Ddrubok/bettermakegame` and path `skills/bettermakegame`. Other hosts may read the Markdown, but their automatic discovery/activation has not been certified. The maintainer's Orca configuration uses `~/.codex/skills`; avoid duplicate installs in several discovery roots.

If you previously cloned the whole repository into a skill directory, preserve local changes and move that development clone outside skill-discovery roots before installing the runtime folder. Do not delete your checkout or its evaluation history to migrate. Refresh the skill list or start a new session when needed. Keeping judge files outside the runtime reduces accidental exposure; it is not an access-control sandbox for an agent with filesystem access.

The skill needs no separate API key, MCP server or runtime installation. Actual game work still requires its project and normal editor/build/device tools.

## Evaluation and limits

On 2026-10-31, a bounded maintainer-run check used separate workers for five synthetic recommendation scenarios and one Node controller fixture. It was not a fully isolated or blinded study. The fixture's four tests passed. See the [game-feel evaluation record](evals/game-feel/README.md) and run its example with `node --test evals/game-feel/racer/controller.test.mjs`. These checks do not form a before/after benchmark or a real-device or human game-feel test. The [UI/HUD U and V cases](evals/ui-hud/README.md) remain **NOT RUN**.

The skill does not play a game by itself, guarantee player preference, or prove retention or commercial results. It directs the agent to report what was observed in the runtime, what was checked in code, and what remains unverified.

## Related skill

| Skill | Scope |
| --- | --- |
| `bettermakegame` | Create or improve UI/HUD, controls, game feel, feedback, and important event flow. |
| [game-vfx](https://github.com/Ddrubok/game-vfx) | Build, preview, export, and integrate visual effects using the game's references or a VFX brief. |
| [kill-game-slop](https://github.com/Ddrubok/kill-game-slop) | Diagnose and locally repair distracting, redundant, misleading, or hard-to-use game presentation. |

The skills are independent; none is a prerequisite for the others. They can add, simplify, move, or remove elements within the requested scope.

## Files

- [SKILL.md](skills/bettermakegame/SKILL.md): scope and main workflow.
- [references/game-feel-selection.md](skills/bettermakegame/references/game-feel-selection.md): situation-led selection, implementation, and verification.
- [references/control-techniques.md](skills/bettermakegame/references/control-techniques.md): input, movement, aiming, and manipulation candidates.
- [references/feedback-flow-techniques.md](skills/bettermakegame/references/feedback-flow-techniques.md): 22 impact, camera, and comprehension/flow candidates.
- [references/audio-haptics.md](skills/bettermakegame/references/audio-haptics.md): eight audio/haptic candidates and what requires listening or a physical device.
- [references/engine-notes.md](skills/bettermakegame/references/engine-notes.md): conditional Unity, Godot, Unreal and Web integration notes.
- [references/tuning-evidence.md](skills/bettermakegame/references/tuning-evidence.md): sourced reference values, local trials and their limits.
- [references/ui-hud-design.md](skills/bettermakegame/references/ui-hud-design.md): UI/HUD analysis and design comparisons.
- [references/gameplay-polish.md](skills/bettermakegame/references/gameplay-polish.md): event sequences and broad presentation review.
- [references/vfx-handoff.md](skills/bettermakegame/references/vfx-handoff.md): game-style briefs and review of effects made with game-vfx.
- [agents/openai.yaml](skills/bettermakegame/agents/openai.yaml): Codex display metadata.

## This update

The entrypoint now routes to only the affected topic; audio/haptics has its own reference. Four new audio candidates bring the library to 52. Engine notes cover input ownership, modal focus, clocks and audio scheduling. Sourced values are examples, not presets. The package is under the [MIT license](LICENSE); linked third-party material retains its own terms.

The [regression fixtures](evals/behavior/README.md) cover jump-window boundaries, modal focus, online event ownership and an explicit partial-throttle alternative. Their first result and snapshot, published in `1ad3281`, are retained as historical evidence alongside the unchanged 2026-10-31 record. Neither historical snapshot describes the current candidate; use the follow-up record below. Code checks do not establish better model judgment or game feel; the historical U/V behavior comparisons and human/device evaluations remain NOT RUN.

## Feedback follow-up

The [repair record](evals/review-fixes-2026-11-05/README.md) supersedes the first fixture snapshot for the current candidate. It fixes residual analog release input, prevents finished effects returning on newer revisions, adds a world-write negative control, and routes audio work directly. Thirty-eight Node regression tests passed. Runtime files are now under `skills/bettermakegame`; completed examples and judge criteria stay in `evals/`. The description includes Korean task phrases, but Korean automatic activation has not been measured.

A [fresh Astra comparison](evals/comparison/runs/2026-11-05/report.md) ran three defective starts with a short prompt and the full skill: six sessions, one per case/condition. Both conditions passed all 14 predefined checks. This did not demonstrate an added correctness benefit from the full skill for these explicit small repairs. The report preserves a separate post-hoc cleanup concern in one full-skill output and the limits of this small, familiar case set; no general accuracy or speed improvement is claimed.
