# Better Make Game

[English](README.md) | [한국어](README.ko.md)

An AI agent skill for creating or improving game UI and HUDs, interaction feedback, and the flow of important events.

Use it when the game works but its actions and results are hard to read: a button responds without acknowledgement, a hit barely registers, or a victory ends without a clear reward and next step. The skill helps the agent inspect those gaps, propose changes, and implement them when requested.

The goal is a complete, understandable experience that fits the game. It does not require more effects or expensive assets.

## What it covers

- Button states, touch feedback, keyboard/controller focus, and readable UI.
- Hit and damage feedback where the game has combat.
- Rewards, growth, victory, failure, and transitions between scenes.
- Animation, camera, sound, and supported mobile haptics working together.
- Rapid input, interrupted animations, pause/resume, and scene re-entry.
- Accessibility, including non-color cues, audio controls, and reduced motion.

UI/HUD reviews cover placement and shape, information grouping, recognizable controls, operation with the intended input, and fit with the game's visual identity. Findings distinguish defects, hypotheses to check, optional design proposals, and elements to preserve. Design alternatives are compared with the current screen, with expected gains and losses stated explicitly.

It preserves the existing gameplay rules, timing, rewards, purchases, and visual identity. It does not invent new gameplay content or rebalance the game as part of a presentation fix.

## How it works

1. Identify the requested scene, platform, and scope. A review reports findings; a fix request allows changes within that scope.
2. Read the actual logic and inspect the running scene or available captures. For UI work, identify the player's task, actual states, and what to preserve. For event work, follow input through action, result, and return of control.
3. Choose the smallest useful change, preferably using the project's existing UI, animation, and audio systems.
4. Check the result in the relevant runtime, including repetition and interruptions. Report what was observed and what remains unverified.

A narrow button fix does not require a full-game audit or a separate report. Use [ui-hud-design.md](references/ui-hud-design.md) for layout, navigation, and design alternatives; use [gameplay-polish.md](references/gameplay-polish.md) for event sequences or a broad presentation review. Combined reviews reuse findings and evidence rather than counting the same issue twice.

## Install

Download this repository or clone it into a skill location recognized by your agent. Keep the folder named `bettermakegame` and preserve `references/` and `agents/` alongside `SKILL.md`.

For an Orca/Codex setup that uses `~/.codex/skills`, as the maintainer's local setup does:

```sh
git clone https://github.com/Ddrubok/bettermakegame.git ~/.codex/skills/bettermakegame
```

If that folder already exists, back up local changes and update the existing copy. Avoid installing a second copy in another discovery location. Start a new session or refresh the host's skill list if needed.

The instructions are Markdown and do not require an API key, a separate MCP connection, or a bundled runtime. Implementation still requires the agent's normal project, editor, and execution tools. Other agents, including Claude and Gemini, can be given `SKILL.md` and its referenced documents; automatic installation and activation depend on the host. This publication does not certify those integrations.

## Use

These invocation examples are for Codex. In another host, use its supported skill activation method or explicitly ask it to read the skill files.

Review an existing scene:

```text
$bettermakegame Review the combat scene's hit feedback and reward sequence.
Report problems and evidence without editing files.
```

Improve a specific interaction:

```text
$bettermakegame Improve the shop purchase button's feedback.
Keep prices, purchase validation, and saved rewards unchanged.
Check pending, success, failure, and rapid repeated input.
```

Compare HUD design alternatives:

```text
$bettermakegame Review the information layout and button shapes of this mobile aiming HUD.
Compare the current screen with two small alternatives, including gains and losses.
Distinguish defects, hypotheses, optional proposals, and elements to preserve.
Keep the board, selection cues, and turn rules. Proposals only for now.
```

Provide the project location, target scene, platform/input method, and whether you want a review or implementation. An executable build or video helps assess timing and sound; screenshots alone cannot establish either.

## What the report contains

For a broad review, findings include the current implementation, problem, evidence, expected benefit, difficulty, priority, and a concrete verification condition. Proposed work is ordered as:

1. High-impact immediate fixes: unclear outcomes, false states, blocked controls, or missing closure.
2. Low-cost improvements using existing resources.
3. Later refinements with smaller impact or device-specific requirements.

For completed changes, the report identifies the changed behavior, checks actually performed, and remaining limits.

## Related skill

| Skill | Main purpose |
| --- | --- |
| `bettermakegame` | Create UI/HUDs, compare broader layout or identity alternatives, and improve interactions and event sequences. |
| [kill-game-slop](https://github.com/Ddrubok/kill-game-slop) | Diagnose and locally repair distracting, redundant, misleading, or difficult-to-use game presentation. |

They are independent. Neither needs to run before the other. Either may add, simplify, move, or remove elements within the requested scope.

## Verification limits

A successful build or source review does not prove that an animation feels good. Screenshots do not verify sound, haptics, latency, or timing. The agent must distinguish runtime observations, source findings, user reports, and inference.

The skill asks for relevant runtime checks; it does not run a game on its own or guarantee better retention, player preference, or commercial success. Publication checks cover the package structure and documents, not a cross-host gameplay evaluation.

The [UI/HUD regression cases](evals/ui-hud/README.md) separate reviewer inputs from maintainer criteria. Their before/after behavior evaluations are **NOT RUN**. Historical checks and document validation do not demonstrate this patch's effectiveness.

## Files

- [SKILL.md](SKILL.md): core workflow and scope.
- [references/ui-hud-design.md](references/ui-hud-design.md): placement, controls, navigation, identity, and bounded design comparisons.
- [references/gameplay-polish.md](references/gameplay-polish.md): detailed review criteria and reporting guidance.
- [agents/openai.yaml](agents/openai.yaml): Codex display metadata.
