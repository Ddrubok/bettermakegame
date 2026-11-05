# Art-directed VFX with game-vfx

Use when an effect must fit the game's visual identity, event meaning and feedback. This is a lightweight instruction handoff, not automatic orchestration or an additional tool dependency. Existing user scope and approval conditions continue to apply.

## Establish the effect's job

Start with the actual interaction: what happened, which state is authoritative, what the player should understand, and the intended feeling. Identify whether the event is routine, important or a climax and how often it repeats. A VFX request does not require new camera motion, audio, hit-stop or controls; coordinate those channels only where the task requires them.

Inspect the relevant game scene and supplied art references, using image/runtime tools where available. Turn the visible direction into concrete choices about silhouette/edges, surface/light, semantic colors, motion and relative emphasis. Attribute each consequential choice to a supplied requirement, observation or provisional inference. Still images cannot establish motion timing. Do not assign a style from the genre name alone, erase intentional excess by default, or treat color changes as sufficient when other properties conflict.

Use the current user direction and designated reference, then the project's relevant art guide and existing scene. If they conflict in a way that matters, resolve that specific conflict; do not silently invent a combined style. When references are missing, offer or use a bounded provisional direction appropriate to the request without claiming it matches the existing game.

## Pass a short VFX brief

Reuse already-recorded intent and parameters. Include only the information that changes production: **event and scope; references and their status; style decisions; preservation conditions; runtime/output; observable checks**. One paragraph is sufficient for a local effect. Do not require a new file, full design contract or repeated user confirmation.

If this starts from a `kill-game-slop` finding, retain its ID, judgment, provenance and unknowns. A hypothesis or optional proposal does not become a confirmed defect in the handoff. For an event-bound effect, add only relevant owner/round identity, pending/confirmed meaning, ordering, clock and cancellation details from the existing implementation. If sound is in scope, read [audio-haptics.md](audio-haptics.md) and coordinate channels from the same event; do not add sound merely because VFX is requested.

For example, given actual references establishing the direction:

> Confirm a committed placement, using the supplied matte rounded-piece scene. Keep the piece outline and legal-move markers visible. Use a short local settling arc with soft edges and the scene's confirmation accent; avoid a damage-like burst. Timing is provisional until viewed in motion. Produce an effect in the existing renderer, preserve commitment logic, and check repeated placements plus reduced motion at the gameplay camera distance.

That example is a hypothetical brief, not evidence about any installed project. Do not manufacture source paths, measurements, user approval or semantic color assignments.

When `game-vfx` is selected or useful and available, locate its entrypoint through the host's skill discovery, read the relevant instructions, and pass the brief as task context. Its `references/style-and-handoff.md` describes the detailed producer/consumer record. Do not depend on a hardcoded neighboring installation path or a supposed command named after the skill.

For a joint request, `bettermakegame` owns the event's purpose and preservation criteria, while `game-vfx` owns effect construction, rendering, export and integration checks within that scope. The same agent can perform both roles. For an effect-focused request, `game-vfx` can own the whole task using the brief; for broader polish, keep the effect as one bounded part of the requested work.

If the companion is unavailable, continue the scoped work with available tools or deliver the appropriate specification. Do not claim the handoff executed, install tools automatically for this reason, or block an otherwise feasible task. Review-only input remains review-only throughout the handoff.

## Review the returned result

Consume the returned **VFX result**: reference/brief used, changed files and key parameters, applied choices or departures, actual evidence and unresolved conditions. Reuse that result in the final report rather than producing competing checklists.

Review in the relevant game scene when available:

- Does the player understand the correct event and state, with important silhouettes and cues still visible?
- Do shape, surface, color meaning, motion and emphasis follow the supplied direction at the real camera scale?
- Does a frequently repeated event remain readable when effects overlap? Are meaningful cues retained with reduced motion?
- Were gameplay/authority and control availability preserved, and were actual event routing and cleanup tested?

Separate **style fit**, **functional correctness**, **performance evidence** and **player preference**. A standalone preview may support a particular visual choice but cannot prove in-game fit, responsiveness or device performance. Missing scene, playback or device evidence stays unverified. No style score, screenshot count or handoff success proves fun or quality improvement.

If a material mismatch remains, return a targeted adjustment tied to the reference and success condition. Revisit only affected choices; do not restart a whole-game review, recursively invoke both skills, or force extra variants. Keep an unchanged baseline or a deliberately simpler effect as valid outcomes. Change the game's art direction only when that redesign is within the user's request.
