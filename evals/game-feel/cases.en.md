# Game-feel use cases — English translation

[English translation](cases.en.md) | [Korean original requests](cases.md)

This is a reading translation of the task inputs for the 2026-10-31 check. The recorded run used the original Korean requests in `cases.md`; this translation was not evaluated. Workspace paths and runner wrapper wording are omitted for portability. These are synthetic situations, not reports from measured play sessions.

Use the selected `bettermakegame/SKILL.md` and relevant references. Provide only the chosen case and raw artifacts. Recommendation cases do not authorize source edits. No evaluation requires access to a real account, production game, or external publishing service.

## R — Scoped implementation

Improve movement in this simple racing prototype. Pressing accelerate immediately jumps to top speed, and even a small analog-stick wobble causes a sharp turn, making control awkward. Keep the top speed at 12m/s, and make the vehicle stop within 0.4 seconds after releasing the button. Continue supporting keyboard steering values of -1/0/1. Select suitable techniques and implement them.

Raw artifact: `racer/before.mjs`, supplied as `controller.mjs` in an isolated workspace. It is the entire controller fixture; no rendering runtime or asset package is provided. The agent may edit that workspace and run meaningful checks with the installed Node runtime. Ask it to state what actually ran and what remains unverified. No new dependencies are needed.

## A — Online physical impacts

Piece collisions feel weak in an online physics battle game. Compare several approaches, including hit stop. Game outcomes, the 60Hz physics progression, and turn duration must remain unchanged. Collision events include an eventId, contact point, and strength; the same contact event may arrive more than once. Recommend approaches without implementing them yet.

## B — Repeated puzzle success

In this puzzle game, every correct placement opens a celebration popup for 0.8 seconds and blocks the next input during that time. Players who place several pieces quickly find this frustrating. Which techniques could improve it? Keep the rules and scoring unchanged. Recommendations only.

## C — Calm gardening feedback

In a gardening game, successful watering only reduces the resource number; the plant's appearance changes only at its next growth stage. Players report uncertainty about whether watering succeeded. Recommend feedback that preserves the calm atmosphere.

## D — Narrow UI scope

Give a short implementation plan to enlarge only the actual touch area of the settings screen's close button. Keep its position and artwork.

## E — Rhythm calibration

Some rhythm-game players using Bluetooth earphones feel that the beat arrives late. Suggest improvements without widening input-judgment windows or changing scoring rules. No measurements are available yet.
