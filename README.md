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

The decision workflow is in [game-feel-selection.md](references/game-feel-selection.md). Its technique tables are an **open-ended candidate library**, not 48 plug-and-play scripts, recommended defaults, or a checklist of required effects. An agent can use a mechanism outside the tables when the game warrants it.

## Candidate library

The two technique references contain 48 situation-led rows:

| Family | Rows | Representative situation and possible candidate |
| --- | ---: | --- |
| Input intent and timing | 6 | A jump press just before landing disappears: consider a short, once-consumed input buffer. |
| Movement and traversal | 9 | Racing steering is nervous at speed: compare speed-sensitive steering with the current controller. |
| Aiming and manipulation | 7 | A dragged object jumps under the pointer: preserve the grab offset. |
| Impact and motion | 8 | A confirmed hit is hard to locate: consider a local hit cue, with frequency and accessibility limits. |
| Camera | 6 | The route ahead is hidden: test directional framing against visibility in both travel directions. |
| Audio and haptics | 4 | Many contacts muddy the mix: examine voice priority or ducking, then listen to recovery. |
| Comprehension and flow | 8 | A puzzle move has an unclear consequence: show a truthful preview before commitment. |

See [control-techniques.md](references/control-techniques.md) and [feedback-flow-techniques.md](references/feedback-flow-techniques.md) for mechanisms, tuning dimensions, limits, and observable checks. The rows are prompts for investigation. Suitability depends on genre, actual mechanics, devices, performance, and intended difficulty. A cozy interaction may need a clear settling cue; a competitive game may reject hidden target snapping. Suggested parameters are trial values to measure and tune in the project, never universal presets.

### Know what the change affects

| Surface | Examples | What to preserve or check |
| --- | --- | --- |
| Presentation | Local sound, visual recoil, camera impulse, result animation | Truthful state, visibility, cleanup, accessibility, and control availability. |
| Input interpretation | Buffer, grace window, drag threshold, stick curve | Which inputs are accepted, expired, replaced, or consumed; unintended actions. |
| Controller motion or game rules | Acceleration, jump gravity, knockback, cancel windows | Reach, positioning, action eligibility, intended challenge, and competitive outcomes. |
| Shared time or authority | Simulation hit stop, time dilation, prediction | Clock ownership, pause and recovery, replay/network agreement, and authoritative results. |

Names alone do not determine safety: camera kick can move an aim ray, and a visual freeze can diverge from a moving collider. The skill asks the agent to trace those effects before implementing. A request to improve movement can authorize bounded controller tuning; a presentation-only request does not authorize rule or time changes.

## UI/HUD and event sequences

The [UI/HUD design guide](references/ui-hud-design.md) covers information hierarchy, placement, shape, focus, touch and controller operation, accessibility, and visual identity. It separates confirmed defects, unverified usability hypotheses, optional proposals, and elements worth preserving. For a redesign, compare the baseline with a small number of alternatives and state their gains, losses, and checks.

The [gameplay polish guide](references/gameplay-polish.md) traces important events from input and anticipation through action, result, and return of control. It covers feedback across UI, motion, camera, sound, and supported haptics, while keeping routine actions quick. Apply only stages relevant to the game; a puzzle need not gain combat effects, and an immediate button should not acquire an artificial wind-up.

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

## Install

OpenAI's [Build skills documentation](https://learn.chatgpt.com/docs/build-skills) describes user skills under `~/.agents/skills` and repository skills under `.agents/skills`. Clone this repository as one skill directory, keeping `SKILL.md`, `references/`, and `agents/` together:

```sh
mkdir -p ~/.agents/skills
git clone https://github.com/Ddrubok/bettermakegame.git ~/.agents/skills/bettermakegame
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE/.agents/skills" | Out-Null
git clone https://github.com/Ddrubok/bettermakegame.git "$env:USERPROFILE\.agents\skills\bettermakegame"
```

For a project-specific install, clone into that repository's `.agents/skills/bettermakegame` instead. You can also ask `$skill-installer` to install from this public [GitHub repository](https://github.com/Ddrubok/bettermakegame). The maintainer's Orca configuration additionally recognizes `~/.codex/skills`; that is environment-specific. Use one discovery location for a given host to avoid duplicate copies. Refresh the host's skill list or start a new session if needed. Other agent hosts can read the Markdown instructions, but automatic discovery and activation depend on the host and have not been verified across hosts.

The skill needs no bundled runtime or separate API key. Implementing a change still requires access to the actual game project and its normal editor, build, and execution tools.

## Evaluation and limits

On 2026-10-31, an independent evaluation used five synthetic recommendation scenarios and one Node controller fixture. The fixture's four tests passed. See the [game-feel evaluation record](evals/game-feel/README.md) and run its example with `node --test evals/game-feel/racer/controller.test.mjs`. These checks do not form a before/after benchmark or a real-device or human game-feel test. The [UI/HUD U and V cases](evals/ui-hud/README.md) remain **NOT RUN**.

The skill does not play a game by itself, guarantee player preference, or prove retention or commercial results. It directs the agent to report what was observed in the runtime, what was checked in code, and what remains unverified.

## Related skill

| Skill | Scope |
| --- | --- |
| `bettermakegame` | Create or improve UI/HUD, controls, game feel, feedback, and important event flow. |
| [kill-game-slop](https://github.com/Ddrubok/kill-game-slop) | Diagnose and locally repair distracting, redundant, misleading, or hard-to-use game presentation. |

The skills are independent; neither is a prerequisite for the other. Both can add, simplify, move, or remove elements within the requested scope.

## Files

- [SKILL.md](SKILL.md): scope and main workflow.
- [references/game-feel-selection.md](references/game-feel-selection.md): situation-led selection, implementation, and verification.
- [references/control-techniques.md](references/control-techniques.md): input, movement, aiming, and manipulation candidates.
- [references/feedback-flow-techniques.md](references/feedback-flow-techniques.md): impact, camera, audio/haptics, and comprehension/flow candidates.
- [references/ui-hud-design.md](references/ui-hud-design.md): UI/HUD analysis and design comparisons.
- [references/gameplay-polish.md](references/gameplay-polish.md): event sequences and broad presentation review.
- [agents/openai.yaml](agents/openai.yaml): Codex display metadata.
