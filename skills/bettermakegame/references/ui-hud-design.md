# UI and HUD design

Use this reference for requested UI/HUD design or improvement. Select relevant checks; this is not a mandatory audit of every category. Use [gameplay-polish.md](gameplay-polish.md) for event timing and sequence details when those are in scope.

## Establish the task and evidence

Record the scene, player action, intended feeling, information needed now, information needed later, visual identity, viewport, language, input, accessibility settings, and authorized scope. Use supplied intent and consistent existing scenes before asking questions. Label inferred art direction provisional.

Inspect actual display and interaction conditions. A screenshot supports captured layout observations, not reachability, timing, audio, or comprehension claims. Source and hit testing can establish control bounds or routing; user reports remain attributed until reproduced. Missing evidence calls for a targeted check, not a defect by default.

Classify findings as confirmed defect, hypothesis to investigate, optional design proposal, or preserve. Keep severity and priority separate from judgment. No confirmed problems is valid. For new UI, label proposed requirements and design decisions rather than treating missing implementation as a tested defect.

## Inspect relevant design dimensions

1. Hierarchy and placement. Identify what must be noticed during the current action. Check competing emphasis, occlusion and unnecessary visual search. Do not place everything important in the center or make secondary information unreadable. Judge each scene state; an inventory and an aiming view need different priorities.
2. Shape and affordance. Check whether interactive elements are distinguishable from decoration and whether selected, focused, disabled and pending states are understandable. Inspect actual hit regions, spacing and supported inputs. A familiar shape is not mandatory; consistency and task evidence matter more than fashion.
3. Legibility and contrast. Inspect target-size text and symbols over representative bright, dark and busy backgrounds, including supported languages. Measure when making numeric claims and name the applicable standard, units and conditions. Borders, shadows, backplates and configurable colors are alternatives, not mandatory treatments. Preserve non-color cues.
4. Information structure. Group information by the player's task and keep needed values visible together. Check the cost of extra menu steps, memorization and hidden state. Do not apply a universal item limit or hide information solely to make the screen sparse. Preserve useful expert density and accessible labels.
5. Feedback and state truth. Make input acknowledgement and authoritative results distinguishable. Use relevant press, focus, cancellation and pending states; do not make hover required for touch. Motion, sound and haptics are optional channels. Test essential understanding with relevant reduced-motion or audio settings, and preserve immediate interaction timing.
6. Platform and navigation. Check target-size controls, spacing, safe areas, text expansion, screen orientation and focus order. For mobile, consider actual grip, handedness, device size and finger occlusion; desktop emulation does not prove physical reach. For keyboard/controller, check predictable focus, back/close and recovery. Do not mandate a universal corner, anchor system or pixel size without platform context.
7. Identity and representation. Compare shape, typography, palette, texture, icon language, motion and tone with the game's declared intent and authored references. Explain specific relationships and tradeoffs. Do not impose neon on science fiction, parchment on fantasy, or one art resolution on all layers. Diegetic, spatial, meta and overlay representations are design options, not quality ranks. Optional identity improvements need no invented usability defect.
8. Repetition and changing conditions. Inspect relevant state changes, overlapping events, rapid input, long labels, resizing and re-entry. Keep primary play visible and avoid obsolete or duplicate cues. Reuse the event and interruption checks in [gameplay-polish.md](gameplay-polish.md) instead of duplicating a whole audit.

## Make the relevant design decisions explicit

For new UI or a meaningful redesign, connect each important element to a player decision. Record only fields that change the design: purpose; authoritative state and distinct states; when it is needed; display and input bounds; placement rationale; supported input; and an observable acceptance condition. Reuse existing specifications. A local repair needs only the affected element, not a full HUD inventory.

For identity changes, explain how the proposed shape, typography, color role or motion relates to the game's intended feeling and established visual language. Preserve team, status and accessibility meanings. Compare the current version with bounded alternatives. A palette count, familiar silhouette or preferred UI category does not establish quality.

If a control is deliberately unusual, check whether its meaning, state and input remain discoverable under the supported conditions before proposing normalization. Mark interpretation and predicted benefit as hypotheses until supported.

## Check navigation through state changes

For the supported input methods, exercise entry, movement between controls, activation, cancellation and return. After closing a modal, restore focus to its valid invoking control or a documented sensible fallback if that control no longer exists. Recheck after relevant resizing, text expansion and control removal. Decorative overlap is not an input failure; inspect actual routing and hit regions. Do not impose one layout framework or require unsupported input devices.

## Check the moments affected by the design

Choose representative reachable conditions from the changed flow: ordinary use, a relevant crowded state, transient notices, and an overlap of events that can actually coexist. Include the affected display scale and settings. For short-lived information, use playback or timed captures that establish its appearance and disappearance; a still frame cannot establish reading time. A configured duration alone does not establish actual exposure or sufficient reading time under frame delays or interruption.

Record the initial state, trigger, capture method and affected elements. Distinguish normal play, scripted input and injected state. Repeat the same relevant conditions after a change. Check event sequencing with `gameplay-polish.md` only when needed. Do not create a universal capture matrix or require runtime instrumentation for a narrow visual fix. A moment ID, conditions, evidence and result can fit in one or two sentences for a local change.

## Propose and verify a bounded change

Record the judgment, evidence and provenance, observed conditions, task impact, unknowns, smallest change, expected benefit, tradeoff, preservation condition, success condition, and actual verification status. Scale the record to the task; a narrow fix needs no separate report or mandatory full table. Keep proposed, applied and verified separate.

For an optional redesign, compare the baseline with one or two alternatives at the same state and scale. State what each may improve and what it may lose. Do not redesign unrelated screens or replace established accessibility signals to unify a style.

Use concrete tasks such as finding the selected piece, locating the next action, identifying a cooldown state, or returning to the prior screen. Record assistance, errors, time when measured, and sample limits. Alternate comparison order where feasible. Ask about the intended feeling separately from task success; preference is not proven by an automated pass.

Before changing anything, define a task-based success condition and an identity/accessibility preservation condition. Compare equivalent conditions, then exercise relevant stress cases. If only static evidence is available, report dynamic and human checks as unverified. Do not assign a global slop score or infer retention, fun, or preference from code validity.

## Sources and limits

Use applicable platform guidance as scoped requirements, not universal game rules. Relevant references include Microsoft XAG 102 (contrast), XAG 112 (UI navigation), and XAG 117 (visual distractions). Consult their current definitions before numerical claims. The proposed workflow itself requires evaluation; these sources do not validate this skill's effectiveness.

### References

- [Microsoft XAG 102: Contrast](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/102)
- [Microsoft XAG 112: UI navigation](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112)
- [Microsoft XAG 117: Visual distractions and motion settings](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117)
