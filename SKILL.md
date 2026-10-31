---
name: bettermakegame
description: >-
  Design and improve game UI/HUD, controls, game feel, feedback, and event
  sequences. Use for bettermakegame, game-feel technique recommendations,
  awkward movement or aiming, weak impact, unclear outcomes, and requested
  usability or polish work. Select, implement, and tune techniques for the
  actual player situation across genres. Does not imply an unsolicited
  whole-game audit, new gameplay content, or economy/balance overhaul.
---

# Better Make Game

Make the player's intended action respond predictably, its consequences readable, and the next action clear. Improve control, feedback, pacing, and satisfying closure while preserving the game's identity and intended challenge. Commercial quality is a standard for complete experiences, not a demand for AAA asset density or more effects.

## Choose the requested scope

Use this skill when creating requested UI or interactions, improving controls or presentation, recommending techniques, or reviewing overall polish. An audit or recommendation produces findings without edits; a build or fix request authorizes scoped implementation and verification. A broad game-feel request can cover input/controller tuning: make that scope explicit instead of treating every adjustment as cosmetic. Existing authorization is sufficient for ordinary implementation choices. Do not expand a narrow task into new enemies, levels, economy changes, or a whole-game audit.

`kill-game-slop` focuses on evidence-based diagnosis and scoped repair of distracting, redundant, misleading, or difficult-to-use presentation. Use `bettermakegame` for requested UI/HUD creation, broader layout or identity alternatives, and interaction or sequence improvements. Either skill may add, simplify, move, or remove an element when the task requires it. They are independent; do not require an automatic sequence or expand the authorized scope. `kill-ai-slop` handles general web product styling and copy.

## Select techniques for the situation

For control feel, impact, camera, or play-flow work, use [game-feel-selection.md](references/game-feel-selection.md). Start with the player's task, observed friction or desired feeling, and actual implementation. Investigate dropped input, broken event routing, frame stalls, and incorrect state before adding forgiveness, smoothing, or spectacle.

Choose relevant candidates from these references; read only the affected family:

- [control-techniques.md](references/control-techniques.md): input timing and intent, movement/traversal, aiming, dragging, and physical controls.
- [feedback-flow-techniques.md](references/feedback-flow-techniques.md): impact and animation, camera, audio/haptics, puzzle/strategy clarity, interaction and repeat-play flow.

These are starting points, not an exhaustive menu or a requirement to add effects. Include techniques outside the library when the situation warrants them; use project/engine evidence and primary sources for unfamiliar mechanisms. A technique must have a problem or design goal to serve, suitable prerequisites, known tradeoffs, tunable parameters, and a concrete check. Compare with the unchanged baseline; select a small useful combination rather than applying every plausible technique.

Distinguish presentation changes from input acceptance, controller motion, and authoritative rules. Coyote time can change jump eligibility; hit stop can change simulation time; aim assistance can change competitive outcomes. In presentation-only work, preserve those rules. When the user requests the relevant control/mechanic improvement, implement within that scope and verify the changed behavior explicitly. Clarify only unresolved design decisions with material effects beyond the request; do not require a separate approval for every technique.

## Design readable and usable UI

For UI/HUD creation or changes to placement, shape, hierarchy, readability, navigation, or thematic fit, read [ui-hud-design.md](references/ui-hud-design.md). Apply only checks relevant to the requested scene and input method; do not turn a button fix into a full-game audit.

Record the player task, intended feeling, important information, authored references, target viewport/input, and what must remain. Attribute documented intent and label inferred intent provisional. For each finding, distinguish a confirmed defect, an unverified usability hypothesis, an optional design proposal, or a justified preservation decision. Priority is separate from judgment.

For requested creation, define requirements and actual states before choosing visual treatment. For redesign, compare the baseline with a small number of bounded alternatives. Describe expected gains, losses, and observable checks; retain an unchanged baseline as a valid outcome. Do not infer player preference from appearance or automated checks.

## Understand and complete the experience

Read the relevant real state transitions and shared UI, animation, art, and audio resources. Establish genre, audience, platform/input methods, core loop, and visual identity. Preserve deliberate extravagance and established player/team cues. Inspect a running scene or available capture; separate source-confirmed facts, runtime observations, user reports, and inference. A screenshot cannot establish timing, sound, latency, or haptics.

Trace important events through **input/trigger → anticipation → action → impact/change → result → recovery/settling**. Mark inapplicable stages. Do not force a wind-up onto immediate UI input or introduce combat into a game that lacks it. Identify where the player's understanding breaks, particularly when an action succeeds but has weak acknowledgement, a reward is only a number, or a completed challenge lacks closure.

For a broad review or important sequence, read [gameplay-polish.md](references/gameplay-polish.md). It contains the event map, full feedback/UI/camera/audio coverage, evaluation criteria, and reporting format. For a narrow creation or fix task, use its relevant checks without imposing a full-project audit. When creating requested UI, define its actual input, pending, success, failure, cancellation, and exit states before choosing effects; do not invent success behavior unsupported by the logic.

Distinguish **routine actions / important actions / climaxes**. Scale emphasis to importance and frequency. Coordinate important sequences as continuous experiences rather than isolated effects; preserve concise repeat-play paths. A boss finale, where present, may progress through final impact, recognized death, brief aftermath, victory, and reward. Use the game's own genre and pacing for other milestones.

## Implement the minimum useful polish

- Prefer existing engine layout, input, animation, audio, and accessibility systems and shared resources. Inspect callers before changing shared behavior; avoid adding frameworks or effect systems just for this task.
- For presentation-only changes, preserve gameplay rules, timing windows, simulation clocks, and displacement. For authorized input/controller/mechanic changes, declare which behavior may change and what must remain, then verify both. Preserve hidden information, authoritative validation, ownership, rewards, persistence, and purchases unless that exact behavior is in scope. Presentation must distinguish input acknowledgement from confirmed success.
- Keep interpolated values, previews, skipped sequences, and final displays consistent with authoritative state. Check rapid input, cancellation, pause/resume, exit/re-entry, and delayed responses where relevant; obsolete cues must not survive their owner or scene.
- Preserve readable contrast, non-color signals, supported languages, touch targets, controller/keyboard focus, safe areas, audio controls, and reduced-motion paths. Evaluate hover and haptics only on platforms where they apply.
- Keep the meaningful action readable through the supported feedback channels during overlapping events. Choose a small set of useful cues, avoid needless waiting, and disclose the reason for rejecting excessive effects. Keep existing tuning controls or introduce only the few parameters the selected intervention actually needs; do not build a general effect framework.
- Use supported editor/import workflows for serialized or binary resources. If unavailable, give known targets, properties, intended behavior, and verification steps; distinguish unapplied specifications from working changes.

## Verify and report

Exercise initialization, input, acknowledgement, change, result, recovery, exit, and re-entry in the relevant runtime. Compare the same states before/after where possible, then inspect repetition and the busiest relevant case. Use normal project checks for changed code, and measure performance or timing when making such claims. Source inspection or a successful build alone does not prove visual quality.

For selected techniques, use the observable checks and tuning method in [game-feel-selection.md](references/game-feel-selection.md). Verify affected timing boundaries, ownership/cancellation, frame-rate dependence, and multiplayer behavior where applicable. Separate functional correctness, experienced responsiveness/readability, and player preference; none proves the others. If runtime access is missing, deliver the code or unapplied specification appropriate to the request and name the remaining checks.

For UI/HUD work, select the moments and input transitions affected by the change using `ui-hud-design.md`. Recheck those conditions after editing; record what was observed, what was instrumented, and what remains unverified.

For a broad review, evaluate each requested category for **current implementation / problem / expected benefit / implementation difficulty / priority**, with evidence and explicit unverified or not-applicable entries. Evaluate redundant effects, code, unused features, overlapping UI, and inconsistent styles for **keep / consolidate / remove** where they affect the reviewed experience; verify dynamic/serialized references before calling anything unused.

End proposals in this order:

1. **High-impact immediate fixes** — core cause/result clarity, false states, blocked control, and missing closure.
2. **Low-cost improvements** — targeted gains using existing resources and systems.
3. **Later refinements** — lower-impact or device-dependent details.

For each proposed change, identify the smallest intervention and a concrete verification condition. For implemented work, state what changed, what was checked, and unresolved runtime/editor/device limits. Do not claim improved retention or player preference without evidence.
