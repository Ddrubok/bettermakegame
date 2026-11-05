# Audio and haptics

Read for an audible or tactile problem; do not load this family for an unrelated layout fix. Inspect existing buses, settings, event routing and available assets first. These eight candidates replace the four audio/haptic entries formerly embedded in `feedback-flow-techniques.md`; they are not eight mandatory additions.

| Situation / candidate | Mechanism and tuning | Limits and observable check |
| --- | --- | --- |
| Impact lacks a clear onset — **transient/body/tail layering** | Use a readable attack and only the body/tail the material needs. Adjust relative gain, duration and alignment. | One good sample may suffice. Audition at comparable loudness; inspect clipping and repeated contacts on target speakers. |
| Important cues are masked — **ducking / voice priority** | Route categories through the existing mix; lower competing channels or retire low-priority voices. Adjust depth, attack/release and voice limits. | Repetition must not keep music or warnings suppressed. Listen to a crowded sequence and its recovery; verify mute/category settings. |
| Repetition sounds mechanical — **bounded variation / material mapping** | Select suitable samples, bounded pitch/gain variation and confirmed material states. | Preserve semantic identity. Keep randomness outside authoritative simulation; audition repetitions and quiet playback. |
| A supported input needs tactile acknowledgement — **event-shaped haptics** | Use available motors/patterns, with event priority, duration and an overlap cap. | Respect off/reduced settings and device support. Keep a non-haptic signal; a simulated command is not a felt-device check. |
| Sound drifts from a known event — **event-time scheduling / calibration** | Trace game, presentation and audio clocks. For predictable events use the engine audio scheduler; measure the actual output path before applying a calibration offset. | Scheduling does not eliminate hardware/Bluetooth delay. Do not delay immediate interaction to reach a musical grid or widen scoring windows without scope. Compare onset and cancellation on the target output device. |
| Sustained motion retriggers many one-shots — **owned parameter-driven loops** | Start one loop per owner; drive existing pitch/gain/filter parameters from the relevant state, then stop or fade on exit. | Parameters must not imply a different speed/charge/result. Check idle, reversal, pause, despawn and re-entry; no orphan loop or permanent ducking. |
| A cue's location or distance is unclear — **spatial source / attenuation / occlusion** | Attach the cue to the correct source/listener and tune the native attenuation/occlusion path at gameplay scale. | Do not reveal hidden actors or make distance-critical cues inaudible. Check left/right, near/far and obstructed positions with the supported speaker/headphone modes; mono needs separate consideration. |
| A result depends on hearing or vibration alone — **paired semantic cues** | Pair the meaningful event with an existing readable text/icon/shape cue; choose audio variants that distinguish actual states. | Do not duplicate every ambience sound on screen. Check mute/haptics-off and overlapping important events. Captions, device commands and waveform data alone do not prove comprehension or mix quality. |

## Trace a short sequence

For the affected event, identify acknowledgement versus confirmed outcome, owner, clock, category, cancellation and repetition policy. Use the same state for sound, VFX and UI; an optimistic click cue must not masquerade as server-confirmed success. On rollback, remove provisional feedback according to the existing game policy rather than inventing a compensating authoritative result.

Use the engine-specific scheduling links in [engine-notes.md](engine-notes.md) only when timing matters. Preserve user volume/mute choices through transient mix changes. Avoid a fixed universal gain, ducking depth or latency offset: the assets, mix, hardware and intended information determine the check.

Report separately: source routing inspected; audio commands exercised; output captured/analyzed; sound actually heard; haptic device actually felt. A video without inspected audio cannot verify sound. Automated timing checks establish command timing, not acoustic latency, loudness safety, or player preference.
