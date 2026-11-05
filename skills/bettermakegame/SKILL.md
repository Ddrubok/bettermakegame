---
name: bettermakegame
description: >-
  Design and improve game UI/HUD, controls, game feel, feedback, and event
  sequences. Use for bettermakegame, game-feel technique recommendations,
  awkward movement or aiming, weak impact, unclear outcomes, 게임 조작감 개선,
  타격감·피드백 개선, 게임 UI/HUD 설계·개선, 게임 연출 다듬기, and requested
  usability or polish work. Select, implement, and tune techniques for the
  actual player situation across genres. Does not imply an unsolicited
  whole-game audit, new gameplay content, or economy/balance overhaul.
license: MIT
---

# Better Make Game

Make intended actions respond predictably, consequences readable, and the next action clear while preserving the game's identity and challenge. More effects or AAA asset density are not the goal.

## Scope and evidence

For a review or recommendation, report without edits. For requested creation or fixes, implement and verify within scope. A broad control-feel request can authorize controller tuning; distinguish it from presentation-only work. Use existing authorization, and ask only about unresolved choices with material effects beyond it. Do not expand a local task into new gameplay, economy changes or a whole-game audit.

Read the affected state transitions and existing input, UI, art, animation and audio systems. Record the player action, intended feeling, references, target input/viewport and what must remain. Attribute documented intent; label inferred intent provisional. Inspect a running scene or supplied captures where available, keeping source facts, runtime observations, user reports and inference distinct. Still images do not establish timing, sound, latency or haptics.

Fix dropped input, wrong state, broken routing and frame stalls before adding forgiveness or spectacle. Classify findings as confirmed defects, hypotheses, optional design proposals or preservation decisions; priority is a separate question. No confirmed defect and an unchanged baseline are valid outcomes.

## Read only the relevant route

Do not preload the library or evaluation records. A small task needs only its affected route and checks, not a separate contract or full review.

| Work | Read when needed |
| --- | --- |
| Select/tune control feel, impact or flow | [game-feel-selection.md](references/game-feel-selection.md), then only the affected technique family |
| Input, movement, aiming or dragging | [control-techniques.md](references/control-techniques.md) |
| Impact, camera or play flow | [feedback-flow-techniques.md](references/feedback-flow-techniques.md) |
| Sound, mix, audio timing or haptics | [audio-haptics.md](references/audio-haptics.md) |
| UI/HUD layout, focus, readability or identity | [ui-hud-design.md](references/ui-hud-design.md) |
| Broad polish or an important event sequence | Relevant sections of [gameplay-polish.md](references/gameplay-polish.md) |
| Engine integration or numerical tuning | The selected engine in [engine-notes.md](references/engine-notes.md); [tuning-evidence.md](references/tuning-evidence.md) only when reference values help |
| Art-directed VFX production | [vfx-handoff.md](references/vfx-handoff.md) |

The technique library is a set of candidates, not mandatory features or a closed menu. Select a small combination based on symptom, mechanism, prerequisites, tradeoffs and an observable check. Compare the current version with bounded alternatives; use project evidence and primary sources for unfamiliar mechanisms. Read actual assets and behavior rather than guessing style from a genre name. Preserve deliberate extravagance and meaningful team/state cues.

## Declare what may change

Distinguish **presentation**, **input interpretation**, **controller/rules**, and **shared time/authority**. Coyote time changes jump eligibility; physical knockback changes position; hit stop may change simulation clocks; aim assistance may affect competition. Verify those changes explicitly when authorized. Presentation-only work preserves control availability and rules; even camera kick can alter aiming if it changes the aim ray.

Trace the relevant event through input/trigger, anticipation, action, impact/change, result and recovery. Skip inapplicable stages and avoid adding a wind-up to immediate UI input. Define real pending, success, failure, cancellation and exit states before their effects. Scale emphasis to routine actions, important actions and climaxes; preserve concise repeat-play paths.

Use the existing engine, layout, input, audio and accessibility systems. Inspect callers before changing shared resources. For serialized/binary assets use supported editor/import workflows; without them, identify the actual target and unapplied specification rather than claiming an edit succeeded.

Preserve hidden information, server validation, ownership, persistence, rewards and purchases unless that exact behavior is in scope. Acknowledgement is not confirmed success. Keep previews and final displays consistent with authoritative state; cosmetic randomness must not perturb simulation randomness. Identify effect owner, clock, duplicate policy and cancellation/cleanup so obsolete cues cannot survive their scene or round.

Preserve supported languages, readable contrast, non-color cues, touch targets, keyboard/controller focus, safe areas, audio settings and reduced-motion information. Tune only parameters needed by the selected intervention. Source reference values, project defaults and synthetic trial values are distinct; never call a trial a universal preset.

## Verify and report

Define success and preservation conditions before editing. Exercise the affected flow from input to recovery and re-entry; compare the same starting state before/after. Check boundary inputs, one-time consumption, repeated actions, cancellation, pause, frame-rate dependence and delayed/duplicate/denied responses where relevant. Recheck directly affected shared-resource users. Local mocked networking is not real multi-device verification.

Use normal project checks for code, rendering/playback for presentation, listening for sound and physical devices for haptics. Compilation or screenshots alone cannot prove motion quality. Record proposed, applied and verified separately. Keep functional correctness, perceived responsiveness/readability, runtime cost and player preference separate; measure before claiming improvement. If the trial is unconvincing, adjust it or retain the baseline.

For broad reviews, cover only requested categories with current behavior, evidence, expected benefit, difficulty and priority; mark unknowns and non-applicable areas. Assess keep/consolidate/remove only where elements affect the experience, checking dynamic/serialized references before calling code or assets unused. End with high-impact fixes, low-cost improvements and later refinements as applicable. A local fix needs a short result, actual checks and remaining limits, not a full report.

`kill-game-slop` diagnoses demonstrated presentation costs; this skill leads requested UI/HUD creation, alternatives and interaction design. `game-vfx` can produce scoped effects from the brief. Each works alone; when combined, reuse evidence in the same session, retain review-only scope and do not launch agents or bounce between skills. `kill-ai-slop` covers general web product styling/copy. No skill handoff proves enjoyment, preference or retention.

Maintainers only: repository `evals/` separates historical model-use records from executable fixture regressions and current file snapshots. Do not load evaluation answers for ordinary game work or treat fixture tests as proof of skill effectiveness.
