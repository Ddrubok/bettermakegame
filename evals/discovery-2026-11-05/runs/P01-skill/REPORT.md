# Selection interaction repair

Completed a bounded repair to `index.html`. The task defines one committed choice per opening and a new owner on each reopening. Four choices, all wording, palette, layout, and the normal 120 ms close animation are preserved. Changes affect local input consumption and callback ownership only; no game rules, networking, or new effects were introduced.

## Evidence and findings

Read `task.md`, `CONDITION.md`, all three packaged skill entrypoints, and the relevant UI/presentation/runtime references. Applied kill-game-slop's evidence classification and bettermakegame's input/re-entry checks in this session. Game-vfx production was unnecessary; preserving the existing animation meets scope.

F01 — confirmed duplicate consumption. Source attached a fresh timeout on every click with no consumed flag. In installed Chrome through Playwright, a real browser pointer double-click (15 ms between clicks) produced `["Queen","Queen"]`. Scripted synchronous Queen/Rook activation produced `["Queen","Rook"]`. Both violate one selection per opening.

F02 — confirmed stale-owner callback. Scripted Queen activation followed immediately by the exposed `openChoice()` API produced `["Queen"]` after replacement, although the new menu was still awaiting its choice. Selecting Knight then produced `["Queen","Knight"]`. A retained old DOM button could also record a choice after replacement. These are controlled lifecycle tests, not claims of normal pointer reachability: the overlay covers the page's replacement button. Reopening is nevertheless an explicit component API and task requirement.

Preserve — the open menu's four labeled rows have no demonstrated visual defect in the inspected 960×720 capture. No redesign, wording change, or decorative effect was warranted.

## Applied change and success conditions

Each opening now owns a record containing consumption state and the pending timer. The first accepted activation marks it consumed synchronously and disables its four buttons. Subsequent activations are ignored. Opening another menu clears the old timer; both input and callback paths verify owner identity. A completed callback releases ownership. This also prevents detached controls from scheduling obsolete work.

Success conditions set before editing: accept only the first choice in one opening; an obsolete owner must not append a result or affect its replacement; each fresh opening can select any of the four pieces; preserve the original close animation and screen appearance.

## Executed verification

Executed `checks.cjs before` against the original source and `checks.cjs after` against the final source using Node and installed Chrome, headless, 960×720, local file URL, no network service or installation. `before-results.json` and `after-results.json` preserve actual outputs. The after run asserts all expected results and completed successfully with no page errors.

| Check | Before | After |
| --- | --- | --- |
| Pointer double-click Queen | Two Queen entries | One Queen |
| Scripted Queen then Rook in one opening | Both entries | Queen only |
| Replace owner while closing | Old Queen recorded | No stale entry |
| Select replacement menu | Old Queen plus Knight | Knight only |
| Keyboard Enter, each of four choices on fresh openings | All four recorded in order | All four recorded in order |
| Activate detached old button | Queen recorded | No entry |

The keyboard flow also checks that the closing element exists immediately after activation, computes `animationDuration` as `0.12s`, and is removed after a 200 ms wait. The CSS animation definition is unchanged. Opened and visually inspected both `before-open.png` and `after-open.png`; their layout, wording and colors match. These captures establish static appearance, not animation quality.

## Limits

No production game, server validation, pawn progression, physical touch/controller device, other browser, or human preference test was available or claimed. Re-entry and retained-control checks are explicitly scripted. Animation lifecycle was exercised, but real-time motion quality was not independently judged from a playback recording. No performance, retention, accessibility-audit, or skill-effectiveness claim follows from these checks.

Changed/added: `index.html`, `checks.cjs`, `REPORT.md`, `before-results.json`, `after-results.json`, `before-open.png`, `after-open.png`. Packaged skills and task files were not modified.
