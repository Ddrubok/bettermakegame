# Game-feel expansion: bounded evaluation

This record accompanies the situation-based technique expansion authored on **2026-10-31** and published on **2026-11-01**. It is maintainer evidence, not a reference that normal skill use needs to load.

## What was run

Two independent `gpt-6-sol` workers received the candidate skill and raw task inputs. One edited a standalone racing-controller fixture; the other answered five recommendation requests. The coordinator reviewed the resulting files and responses and separately reran the controller tests. No expected solution or prior answer was supplied to either worker. This was a bounded forward-use check, **not a before/after benchmark, a fully isolated/blinded study, or a human playtest**.

| Case | Task | Observed outcome | Verification limit |
| --- | --- | --- | --- |
| R | Improve abrupt acceleration/steering while preserving speed and stopping requirements | Applied acceleration/braking, a deadzone and steering rate limits; four Node tests passed | Pure controller model; no rendering, physical controller or driving-feel test |
| A | Recommend collision feedback for an online physics game with fixed simulation and turn timing | Compared local impact cues and bounded camera response; identified simulation-freeze and visual-alignment risks | Recommendation only; no network/runtime exercise |
| B | Improve a puzzle's repeated 0.8-second success input block | Proposed nonblocking local acknowledgement and less repeated interruption | Recommendation only; no player observations |
| C | Clarify successful watering in a calm gardening game | Proposed local feedback while retaining actual growth state | Recommendation only; no sound or motion playback |
| D | Plan a larger close-button touch area while keeping appearance/position | Kept the plan scoped to input bounds, neighbors and supported navigation | No touch device test |
| E | Propose a rhythm-game latency approach without expanding scoring windows | Proposed device measurement and calibrated offsets without invented delay values | No latency measurements or scoring implementation |

The original recommendation outputs are in [responses.ko.txt](responses.ko.txt). Task content and fixture setup are in [cases.md](cases.md). Local machine paths and orchestration logs are not included. The runtime-file SHA-256 hashes in [skill-snapshot.json](skill-snapshot.json) identify the evaluated skill after normalizing text line endings to LF, so Git checkout settings do not change the comparison. Future edits may no longer match that snapshot.

## Reproduce the controller checks

Use Node.js with its built-in test runner. Node **22.18.0** was used for the local publication check; there are no package dependencies.

```sh
node --test evals/game-feel/racer/controller.test.mjs
```

- [before.mjs](racer/before.mjs) is the initial controller fixture.
- [controller.mjs](racer/controller.mjs) is the worker's implementation.
- [controller.test.mjs](racer/controller.test.mjs) checks gradual bounded acceleration, elapsed-time consistency, stopping within the requested limit, stick noise/steering response, and keyboard inputs.

The four tests passed in the original run and the publication check. The first implementation run exposed exact floating-point assertion mismatches; the worker adjusted tolerances/endpoint sampling and reran. These checks cover selected behavior, not every input, integration or performance condition. Parameter values belong to this example and are **not recommended defaults for other games**.

## Repeating the skill evaluation

Give a fresh agent only the selected skill runtime files, the relevant case from `cases.md`, and `racer/before.mjs` copied as its initial `controller.mjs` for case R. Keep this outcome record, responses, tests and completed implementation out of its input. Record model, host instructions, tools, skill revision, outputs and actual checks. Score behavior after the response is complete; do not treat a familiar answer as new evidence of skill quality.

No real-game enjoyment, retention, accessibility-device coverage, cross-host compatibility or online stability has been established by this evaluation. Existing [UI/HUD U and V evaluation records](../ui-hud/README.md) remain separate and **NOT RUN**; these new checks do not change their status.
