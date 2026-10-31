# Select, apply, and tune game-feel techniques

Use for existing or requested interactions in any genre. Select the part of this workflow that changes the decision; a local fix needs no full design report. Recommendation, implementation, and runtime verification are separate outcomes.

## Begin with the moment, not the technique

Identify what the player is trying to do, what they should feel, what actually happens, and which input/device/scene conditions matter. Use documented intent where available; label inferred intent and player-benefit predictions as hypotheses. For a new game, describe the proposed moment and build a bounded prototype. Missing features in a new prototype are not automatically defects.

Inspect the input path and relevant state/camera/audio owners. Distinguish a control bug, an overly narrow acceptance window, an intended challenge, unclear feedback, excessive presentation, and a deliberate style. A dropped release event needs an event-routing fix; an early valid-intent press may justify a buffer. Camera smoothing cannot repair a frame stall. A louder hit cannot repair collision detection. Do not soften intended difficulty solely because an action fails.

For a broad recommendation, explore the relevant families; for a narrow task, stay with its moment:

| Observed need or desired feeling | Candidate family / where to look |
| --- | --- |
| Near-miss inputs, accidental actions, awkward timing | [Control: intent and timing](control-techniques.md) |
| Weight, precision, jump/landing feel, racing or traversal control | [Control: movement](control-techniques.md) |
| Picking, aiming, dragging, charging, touch obstruction | [Control: aiming and manipulation](control-techniques.md) |
| Contact, weight, anticipation, readable attack/reaction | [Feedback: impact and motion](feedback-flow-techniques.md#impact-and-motion) |
| Tracking, spatial orientation, camera obstruction | [Feedback: camera](feedback-flow-techniques.md#camera) |
| Mix, contact synchronization, repetition, physical acknowledgement | [Feedback: audio and haptics](feedback-flow-techniques.md#audio-and-haptics) |
| Puzzles, planning, causality, failure/retry, repeated interactions | [Feedback: comprehension and flow](feedback-flow-techniques.md#comprehension-and-flow) |
| Hierarchy, layout, focus, localization, identity | [UI/HUD design](ui-hud-design.md) |
| A whole important sequence or presentation review | [Gameplay polish](gameplay-polish.md) |

The library is intentionally open-ended. If none of its candidates fits, describe the missing mechanism, inspect the engine's native support, and consult authoritative developer/engine sources when needed. Record assumptions and effects on rules. A novel technique can be used without first enlarging this skill. Never fabricate a familiar-sounding technique name, implementation guarantee, or measured timing.

## Decide what the change actually touches

Classify by actual implementation, not by its name:

| Change surface | Examples | Design and verification consequence |
| --- | --- | --- |
| Presentation | Local contact sound, mesh-only recoil, camera response, result animation | Retain authoritative outcomes and control availability; verify visual alignment, state truth, and cleanup. |
| Input interpretation | Buffer, grace period, drag threshold, snapping, stick curve | Identify accepted/rejected inputs and lifetime of stored intent. Check ambiguity, unwanted actions, expiry, and supported devices. |
| Controller or rules | Acceleration, jump gravity, knockback, hit stun, cancel windows, invulnerability | Explicitly allow only the requested behavior changes. Recheck reach, resources, action eligibility, opponents, and intended challenge as relevant. |
| Shared time or authority | Global hit stop, prediction, reconciliation, time dilation | Trace simulation/render clocks, network authority, replays and turn timers before implementing. A cosmetic request does not authorize changing match results. |

These surfaces can overlap. Screen kick may change aiming if the aim ray follows that camera. Mesh freeze can misrepresent a moving collider. A new telegraph can change reaction difficulty even if the simulation is untouched. Do not label a change harmless from its file location alone.

Use the user's authorization already in the conversation. A request to improve movement permits appropriate movement tuning within the stated constraints; it does not need separate confirmation for every parameter. A request for suggestions does not authorize edits. Resolve routine choices directly; clarify only missing intent that materially changes the requested game, competitive rules, or scope. Do not silently add aim assistance, invulnerability, hidden difficulty adjustment, network architecture, or economic changes as generic polish.

## Choose a bounded intervention

For each serious candidate, state briefly:

> Moment and evidence → candidate and mechanism → why it fits / when to omit it → affected state and parameters → observable success and preservation conditions.

One sentence can suffice for a small change. For a meaningful redesign compare the baseline and a small number of alternatives. Prefer the least complex option that addresses the demonstrated need, including removing excess feedback or leaving good behavior alone. Offer broader alternatives when the user explicitly wants a technique survey, without turning that survey into an implementation checklist.

Check interactions among chosen techniques. A large grace period plus a long buffer may allow unintended jumps. Long input smoothing plus camera damping can compound lag. Hit stop plus slow motion plus an overlay can delay the next action. Audio ducking from frequent collisions can keep music permanently suppressed. Assign each cue a clear purpose and cap accumulation at the owning system.

Reuse the actual engine, animation, input and accessibility systems. Inspect the selected implementation and callers before proposing a new dependency. Choose the relevant parameter units: milliseconds or simulation ticks at a stated tick rate, world units or character dimensions, degrees, normalized input, gain, duration. Any suggested starting value is a trial value with a reason, not a universal preset. Inspect existing values before inventing replacements.

## Implement with ownership and clocks in view

Identify the authoritative trigger, presentation owner, target, clock, cancellation/reset path, and what happens when effects overlap. Use event IDs or existing guards where duplicate network or collision callbacks can replay an effect. A persistent contact is not automatically a new impact on each physics step.

For buffers and delayed actions, define capture, replacement, expiry, validation at execution, and one-time consumption. Clear stale intent after death, scene changes, modal ownership changes, or other relevant invalidation. Do not queue purchases or irreversible actions as an input-feel convenience.

For freezes and time effects, distinguish hit stop (brief stopping), hit stun (restricted recovery), slow motion (slower progression), and an animation hold. Specify exactly which entities and clocks pause and whether input continues to be sampled. Preserve separate audio/UI/network timing when required. Stop/restore ownership must survive interruption; avoid restoring a stale global time scale over another pause. Never stop just one peer's authoritative physics to manufacture online impact. If a requested time effect is not feasible within existing authority, use a truthful presentation alternative or explain the dependency.

Frame-based tuning must name the clock: rendered frames, physics ticks and network ticks differ. Use the engine's supported time-step mechanism; do not let effects change with display refresh unintentionally. A reduced-motion option removes optional motion, not required information or collision outcomes. For deterministic games, keep cosmetic randomness outside simulation randomness.

## Verify the selected behavior

Define success before tuning: accepted intended input, fewer unintended activations, readable contact/target/result, predictable control return, or shorter retry path. Preserve the appropriate identity, accessibility, challenge and state conditions. Numerical success metrics require actual measurement; subjective feel requires playing and comparison.

- Reproduce the same moment before/after. Change one influential parameter or one coherent mechanism at a time, then test the combined sequence. Keep the baseline available for comparison or rollback.
- For input/controller changes, use meaningful boundary checks: just inside/outside a window, held/released, interrupted, re-armed, repeated, and different update rates where applicable. A test of the constant alone proves nothing about the interaction.
- For feedback, inspect onset at the actual event, duration, overlap, target visibility, sound, and recovery in motion. Test repetition and a busy case, plus reduced motion/mute where relevant. Screenshots cannot verify latency, hit stop, mix, or haptics.
- For online play, verify authoritative agreement and delayed/duplicate/denied outcomes on the affected path. Local mock success is not cross-device verification. Client prediction or lag compensation needs its own network scope and tests, not casual inclusion as an effect.
- On target devices, check the changed control and presentation under representative performance. Report unavailable controller/touch/haptics/playback checks as unverified rather than assuming desktop equivalence.

Separate functional checks from player evaluation. Automated tests can establish input acceptance or equal end states, not enjoyment. Small playtests can reveal a problem or preference without proving retention or a universal benefit. If the improvement is unconvincing, reduce it, choose another candidate, or keep the baseline. Report the chosen and materially rejected techniques, actual parameter changes, evidence, and remaining limits at the scale the task needs.
