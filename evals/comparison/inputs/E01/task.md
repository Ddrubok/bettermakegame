# Finished contact effect repair

Repair `impact.mjs`. A contact effect returns after it has finished when a higher-revision message for the same event arrives. `finish(id)` means that event's visual lifetime is closed for the current round, including a provisional event that finishes before confirmation. Later messages must not recreate that effect or emit a new success burst. A distinct event in the same round and a reused event ID in a new round must still work.

Preserve the exported `ImpactPresentation` API, pending versus confirmed meaning, duplicate/reordered-message handling, live correction of active effects, round and disposal behavior. Do not alter the simulation, authority or clocks. Change only the needed code in this file; do not add dependencies or new effects. Run appropriate checks and report what changed, what ran and what remains unverified. This trusted-message fixture has no real network or renderer. Respond in Korean.
