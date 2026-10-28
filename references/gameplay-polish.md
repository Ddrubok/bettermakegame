# Better Make Game: gameplay polish review

Use this reference for comprehensive game presentation audits or important event sequences. For a narrow fix, select relevant checks. Report in the user's language. Review the actual game; examples below are conditional, not requirements to add mechanics.

For UI/HUD layout, affordance, navigation, or identity work, use the relevant dimensions in [ui-hud-design.md](ui-hud-design.md). A narrow UI task does not require a complete event map or every category below. In a combined review, reuse finding IDs and evidence so the same issue is not counted or prescribed twice.

## Establish the event map

Identify platform, input methods, genre, core loop, intended visual identity, and available runtime evidence. Trace real state transitions and their presentation callers. Inventory the game's important interactions: care/feeding, building, movement, attacks, damage, purchases, pickups, progression, failure, or completion only where they exist.

For each important event, record:

| Event and importance | Logic trigger and evidence | Input/trigger | Anticipation | Action | Impact/change | Result | Recovery/settling |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Actual event; routine / important / climax | Source location and/or reproducible runtime state | What initiates it and acknowledges input | What prepares the player, if needed | What visibly happens | When the authoritative change occurs and becomes perceptible | What confirms the outcome | When control, camera, pose, and UI settle |

Prioritize implemented logic with insufficient expression: a successful action with no acknowledgement, damage without readable contact, death without a recognizable transition, a reward or level change visible only as a number, or victory without closure. Distinguish feedback missing in code from feedback present but ineffective in a running scene. Unavailable playback is an evidence gap, not proof that feedback is absent.

## Coverage and evaluation

For every category below in a full audit, report **implemented / partial / absent / unverified / not applicable**, the concrete problem (or no demonstrated problem), expected player benefit, difficulty (low/medium/high with dependencies), and priority (P0/P1/P2 or no change). Include event IDs or source/runtime evidence. Unknown difficulty should remain unknown until the relevant implementation is traced. Do not assume absence means a defect.

| Category | What to inspect |
| --- | --- |
| Immediate input response | Visual/audio/haptic acknowledgement; distinguish a received input from confirmed success. Check denied, invalid, cooldown, and pending actions as well as success. |
| Movement and changing values | Tween/Lerp/easing fit, interruptibility, overshoot, and settling; displayed values remain consistent with authoritative state and do not hide actionable thresholds. |
| Character/object motion | Anticipation, squash and stretch, follow-through, secondary motion where readable and stylistically appropriate; preserve existing action timing. |
| Combat impact, if present | Hit stop, hit flash, knockback, screen shake; distinguish miss/block/hit where the rules already do. Do not alter simulation pauses, displacement, or combat windows as cosmetic work. |
| Visual effects | Particles, trails, impacts, afterimages; ownership, contact position, legibility of enemies/hazards, density and stacking. |
| State changes | Damage preview, trailing health, count-up where useful; preserve hidden information, exact receipts, low-health cues, and the final value after skips or interruptions. |
| Camera | Zoom, kick, movement and tracking; target visibility, orientation, aim stability, motion settings, and restoration after interruption. |
| Entity lifecycle | Entrance, acquisition, level-up, death, exit; readable state transitions and cleanup. Evaluate bosses only if the game has them. |
| Screen and outcome sequences | Transitions, results, victory and game over; clear outcome, reward order, next action, replay pacing, and duplicate-input protection. |
| Controls | Recognizable affordances and actual hit regions; target size and spacing in context; press, release, disabled, pending and keyboard/controller focus; cancelled drags, predictable back/close, and mobile finger occlusion. Never require hover on touch. |
| Information hierarchy | Task-relevant placement, grouping, legibility and competing emphasis across scene states; representative backgrounds, localization, safe areas and playfield visibility. Compare style with authored identity. Do not impose center placement, sparse layouts or genre stereotypes. |
| Entry/exit timing | UI and objects appear when relevant and remain long enough to understand; no overlay hides an unresolved outcome or obsolete cue survives re-entry. |
| Audio synchronization | Sound follows the meaningful contact/change, respects mix/settings, and is not delayed or duplicated by animation and logic both firing it. |
| Mobile haptics | Device support, user settings, event importance and repeat frequency; no reliance on haptics alone or demand to add them to every event. |
| Repeat-play pacing | Repeated celebrations, long count-ups, forced waits, queued notifications; concise repeat paths or existing skip controls preserve outcome and rewards. |
| Competing channels | Multiple effects communicating the same fact, visual/audio masking, simultaneous events; preserve accessible multimodal cues while removing needless interruptions. |

P0 means blocked understanding/control or materially false state; P1 means a core event loses clarity or impact repeatedly; P2 means cosmetic refinement with limited play cost. Expected benefit is a design hypothesis until verified, not a claim of improved retention or preference. Difficulty concerns this project's existing systems, not a universal estimate.

## Calibrate emphasis and sequence

- **Routine:** concise acknowledgement that tolerates repetition and overlapping events.
- **Important:** distinct emphasis on the meaningful change, with the next action still clear.
- **Climax:** a coordinated peak and closure; avoid making every event compete at this level.

Do not prescribe the same shake, particle, sound, or zoom for all three. Prefer the smallest set of cues that communicates the event. If several effects fire together, identify which carries the information and which supports it. State which effects to omit and why when rejecting an otherwise plausible addition.

Review an important sequence on one timeline, recording trigger, cue order, overlap, control availability, interruption/skip behavior, and settled state. For example, an existing boss victory can read as **final impact → recognized boss death → brief aftermath → Victory → reward display**. Exact durations must follow the game, available measurements, and repeat frequency; do not invent measured timing. Distinguish proposed timings from observed ones. A care game's major growth event deserves its own appropriate closure rather than borrowed combat spectacle.

## Additional failure checks

- Rapid repeat input, animation cancellation, pause/resume, scene exit/re-entry, and delayed network confirmation must not duplicate rewards, retain stale cues, or strand controls. Cosmetic acknowledgement must not promise authoritative success.
- Completion must remain understandable with audio muted and reduced motion enabled; check relevant non-color cues and settings without replacing the game's identity.
- Observe the busiest relevant scene on the target device when possible. Check effect stacking, UI/layout work, allocations, and audio voice pressure if evidence suggests a problem. Do not claim acceptable frame pacing, latency, or haptics from desktop screenshots.
- Verify pending versus confirmed state, and ensure visual interpolation, skips, and recovery cannot obscure the final outcome. Avoid adding delays to gameplay merely to fit an animation.

## Keep, consolidate, or remove

Inspect duplicated effects, repeated implementation, apparently unused features/assets, overlapping UI roles, and style outliers. For each candidate, give its locations/callers, player or maintenance cost, **keep / consolidate / remove**, smallest change, and regression risk. Retain deliberate distinctions. Consolidate only when behavior and ownership match; visually similar components can have different lifecycle or accessibility needs.

Before calling something unused, check scene/prefab bindings, dynamic loads, configuration, localization, platform variants, and relevant resource references. No text match alone proves dead code. If usage is uncertain, mark it for verification and keep it. Removal proposals do not authorize removal during an audit.

## Deliver the review

Provide the event map, category evaluation, the important sequence findings, and the keep/consolidate/remove decisions with evidence. Reuse event/finding IDs instead of repeating the same recommendation for every effect category. Distinguish runtime-observed, source-confirmed, user-reported, and inferred findings.

End proposals in three ordered groups:

1. **High-impact immediate fixes** — clarify core causes/results, false states, blocked input, or missing closure first; disclose if a high-impact fix is costly.
2. **Low-cost improvements** — reuse existing motion, sounds, styles, and components for demonstrated gaps.
3. **Later refinements** — lower-impact details or device-dependent tuning requiring more evidence.

For each proposed change, state the minimum intervention, expected benefit, difficulty/dependencies, and a concrete verification condition. Include relevant rejected effects or preserved elements so restraint is explicit. If fixing is authorized, apply the scoped changes and report actual checks and remaining limitations; an audit alone produces findings, not edits.
