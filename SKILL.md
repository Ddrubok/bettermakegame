---
name: bettermakegame
description: Improve game UI, interaction feedback, game feel, and event sequences to commercial mobile/PC polish standards. Use for bettermakegame, game completeness reviews, weak hit or reward feedback, button states, animation timing, and designing polished presentation for requested game UI or interactions. Prioritize existing logic whose cause and result are poorly communicated. Does not perform a general AI-slop cleanup, invent new gameplay content, or optimize balance.
---

# Better Make Game

Make the player's actions, their consequences, and the next available action immediately understandable. Improve responsiveness, legibility, consistency, and satisfying closure while preserving the game's identity. Commercial quality is a standard for complete experiences, not a demand for AAA asset density or more effects.

## Choose the requested scope

Use this skill when creating requested game UI or presentation, improving an existing interaction, or reviewing overall polish. An audit produces findings without edits; a build or fix request authorizes the scoped implementation. Prioritize logic that already works but lacks clear expression before proposing new content or mechanics.

`kill-game-slop` separately finds and removes generic, noisy, redundant, or misleading game presentation. `kill-ai-slop` handles general web product styling and copy. These are independent skills, not prerequisite passes. A polish fix may simplify an obstructive cue when needed, but do not expand it into a project-wide deslop audit unless requested.

## Understand and complete the experience

Read the relevant real state transitions and shared UI, animation, art, and audio resources. Establish genre, audience, platform/input methods, core loop, and visual identity. Preserve deliberate extravagance and established player/team cues. Inspect a running scene or available capture; separate source-confirmed facts, runtime observations, user reports, and inference. A screenshot cannot establish timing, sound, latency, or haptics.

Trace important events through **input/trigger → anticipation → action → impact/change → result → recovery/settling**. Mark inapplicable stages. Do not force a wind-up onto immediate UI input or introduce combat into a game that lacks it. Identify where the player's understanding breaks, particularly when an action succeeds but has weak acknowledgement, a reward is only a number, or a completed challenge lacks closure.

For a broad review or important sequence, read [gameplay-polish.md](references/gameplay-polish.md). It contains the event map, full feedback/UI/camera/audio coverage, evaluation criteria, and reporting format. For a narrow creation or fix task, use its relevant checks without imposing a full-project audit. When creating requested UI, define its actual input, pending, success, failure, cancellation, and exit states before choosing effects; do not invent success behavior unsupported by the logic.

Distinguish **routine actions / important actions / climaxes**. Scale emphasis to importance and frequency. Coordinate important sequences as continuous experiences rather than isolated effects; preserve concise repeat-play paths. A boss finale, where present, may progress through final impact, recognized death, brief aftermath, victory, and reward. Use the game's own genre and pacing for other milestones.

## Implement the minimum useful polish

- Prefer existing engine layout, input, animation, audio, and accessibility systems and shared resources. Inspect callers before changing shared behavior; avoid adding frameworks or effect systems just for this task.
- Preserve gameplay rules, combat timing windows, simulation pauses, displacement, hidden information, authoritative validation, ownership, rewards, persistence, and purchases. Presentation must distinguish input acknowledgement from confirmed success.
- Keep interpolated values, previews, skipped sequences, and final displays consistent with authoritative state. Check rapid input, cancellation, pause/resume, exit/re-entry, and delayed responses where relevant; obsolete cues must not survive their owner or scene.
- Preserve readable contrast, non-color signals, supported languages, touch targets, controller/keyboard focus, safe areas, audio controls, and reduced-motion paths. Evaluate hover and haptics only on platforms where they apply.
- Keep the meaningful action visible and audible during overlapping events. Choose a small set of useful cues, avoid needless waiting, and disclose the reason for rejecting excessive effects.
- Use supported editor/import workflows for serialized or binary resources. If unavailable, give known targets, properties, intended behavior, and verification steps; distinguish unapplied specifications from working changes.

## Verify and report

Exercise initialization, input, acknowledgement, change, result, recovery, exit, and re-entry in the relevant runtime. Compare the same states before/after where possible, then inspect repetition and the busiest relevant case. Use normal project checks for changed code, and measure performance or timing when making such claims. Source inspection or a successful build alone does not prove visual quality.

For a broad review, evaluate each requested category for **current implementation / problem / expected benefit / implementation difficulty / priority**, with evidence and explicit unverified or not-applicable entries. Evaluate redundant effects, code, unused features, overlapping UI, and inconsistent styles for **keep / consolidate / remove** where they affect the reviewed experience; verify dynamic/serialized references before calling anything unused.

End proposals in this order:

1. **High-impact immediate fixes** — core cause/result clarity, false states, blocked control, and missing closure.
2. **Low-cost improvements** — targeted gains using existing resources and systems.
3. **Later refinements** — lower-impact or device-dependent details.

For each proposed change, identify the smallest intervention and a concrete verification condition. For implemented work, state what changed, what was checked, and unresolved runtime/editor/device limits. Do not claim improved retention or player preference without evidence.
