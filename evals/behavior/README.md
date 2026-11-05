# Executable behavior fixtures

These are maintainer regression fixtures added on 2026-11-05. They test bounded interaction contracts, not whether an unseen model follows the skill or makes better games. They contain completed implementations and test assertions; do not supply them as hidden answers in a fresh skill comparison.

| Fixture | Contract exercised | What it cannot establish |
| --- | --- | --- |
| `jump.mjs` | Timestamped input replay, just inside/at/outside grace and buffer windows, consumption, interruption and different polling schedules | Real physics, collision geometry, render/input latency or preferred jump feel |
| `modal.html` | Actual browser keyboard focus, Tab wrapping, gameplay input gate, Escape and removed-opener fallback | Gamepad, touch, screen reader or human task success |
| `online-impact.mjs` | Pending versus confirmed cues, duplicate/reordered trusted events, corrections, round ownership and disposal; unchanged toy simulation | Real transport, server authentication, packet loss, prediction physics, VFX rendering or online stability |
| `racer.mjs` | Historical half-throttle characterization and an explicit separate partial-deceleration alternative; full-release requirement preserved | Which transition a player prefers; a defect in an unspecified original requirement |

The jump fixture uses inclusive integer-millisecond boundaries and configured 100 ms grace / 80 ms buffer. Those are local fixture conditions, not recommended presets. The racing alternative is explained in [tuning-evidence.md](../../skills/bettermakegame/references/tuning-evidence.md). The online fixture is a round-bounded toy: a production adapter needs its protocol's authenticated events, bounded history and real lifecycle. The integration harness deliberately passes shared world state to the adapter so an illegal write is observable; a negative control confirms that the same preservation assertion fails when presentation changes velocity. This test-only exposure is not a recommended production authority API.

## Run

Node with its built-in test runner; no npm dependencies for model tests:

```sh
node --test evals/behavior/jump.test.mjs evals/behavior/racer.test.mjs evals/behavior/online-impact.test.mjs evals/game-feel/racer/controller.test.mjs
```

The optional browser check uses an existing Playwright installation and browser. Set `PLAYWRIGHT_MODULE` to that package's location only if normal Node resolution cannot find it; set `BROWSER_EXECUTABLE` if needed. It does not install packages or change the user's browser profile.

```sh
node evals/behavior/browser-check.cjs /path/to/output-folder
```

Generated browser artifacts go to the selected folder (default `browser-output` beside the test). Open the PNGs with an image tool before describing their appearance. The keyboard checks inspect real browser state, but screenshots do not verify motion or comprehension.

## Evidence and versioning

The [results.json](results.json) and [skill-snapshot.json](skill-snapshot.json) preserve the historical run published in `1ad3281`; their paths/hashes describe the old root-level runtime layout. They are not the current-candidate result. See the [feedback repair record](../review-fixes-2026-11-05/README.md) for the newer checks and relocated runtime. The previous [2026-10-31 snapshot](../game-feel/skill-snapshot.json), worker implementation and four tests are preserved. Its missing later VFX handoff file is a limit of that historical evaluation, not a reason to overwrite the snapshot.

Record the base commit, uncommitted candidate hashes, model/host role, commands, runtime versions, actual result and limits. A snapshot binds files to an artifact check; it does not mean the current instructions underwent a fresh behavioral evaluation. This work uses one maintaining agent, not an independent or blinded evaluator.

Existing UI/HUD U/V before/after model comparisons remain **NOT RUN**. The modal covers part of V01's mechanism but not its full agent behavior or controller conditions; the online toy does not execute V04's visual/collision coupling case. Human playtests, real network/device tests and Unity/Godot/Unreal runs remain **NOT RUN**.

## Later completion-callback repair

The current online fixture takes `finish(completionToken(id))`, with the token captured when scheduling completion. Owner identity and generation prevent a previous round's delayed callback from ending a reused ID, including repeated round labels. Bare IDs are rejected. This is local lifetime tracking, not authentication. The frozen E01 benchmark and older outputs retain their historical `finish(id)` API; do not rewrite prior evidence to pretend it tested this boundary. See the [new record](../practical-validation-2026-11-05.md).
