# P01 selection interaction repair

Inspected `task.md`, `CONDITION.md`, and `index.html` within this session only. Ran the actual component from a local file in headless installed Chrome using existing Playwright tooling. No network service, installation, outside source, or delegation was used.

## Observed defect

The original click handler queued an independent 120 ms timer for every click. Removing a menu did not revoke its handlers or pending timer. Browser reproduction before editing (`node check.cjs --baseline`) showed:

- Queen, Rook, and a dispatched Queen click in one opening recorded `["Queen","Rook","Queen"]`.
- Selecting Queen then immediately opening a new menu still recorded `["Queen"]`, while the new overlay remained visible.
- Retaining an old button, replacing the menu, then clicking the detached button still recorded `["Queen"]`.
- No browser page errors occurred; these were state/lifecycle defects rather than crashes.

## Bounded repair

`index.html` now identifies the active overlay. Each opening accepts only its first selection, immediately disables its four buttons, and checks active ownership both at click entry and before the delayed commit. An obsolete opening cannot write a result or remove the new menu. Pending obsolete callbacks return without mutation. A normal choice still closes with the original 120 ms animation and commits afterward. A choice whose menu is superseded before commit is discarded, consistent with the new-owner requirement.

All four choices, wording, CSS, palette, and animation remain unchanged. No production game rules or server behavior were added.

## Executed verification

`check.cjs` is a focused local Playwright check. Executed using `C:/Program Files/nodejs/node.exe check.cjs` after the repair and again after adding the simultaneous old/new selection regression. Both runs passed.

- Repeated native and explicitly dispatched clicks commit Queen exactly once.
- Replacement before the old timer completes leaves zero calls and one new menu.
- Detached old button activation produces no call.
- Selecting Queen, reopening, and selecting Bishop before timers complete commits only Bishop.
- Each of Queen, Rook, Bishop, and Knight commits correctly; result text matches and the overlay is removed.
- Closing class exists and calls are still empty immediately after the normal click, followed by completion after waiting 250 ms.
- Every completed selection can be followed by a new opening and a keyboard Enter selection of Knight.
- No page errors were captured.

Saved `baseline.png` and `repaired.png` at 900 x 650. Viewed the baseline screenshot: heading, explanatory sentence, and all four buttons are present in the centered dark card. SHA256 checks confirmed the two opening screenshots are byte-identical, preserving the rendered initial appearance.

## Limits

These checks cover the supplied standalone component in installed desktop Chrome. Production integration, network/server behavior, full pawn progression, other browsers, touch hardware, screen readers, and a broader accessibility review were not verified. Animation class and timing behavior were checked; animation smoothness was not measured. Rapid/stale activation reproduction used scripted DOM events to exercise the race deterministically; normal selections and keyboard activation used browser automation input.

Changed/added files: `index.html`, `check.cjs`, `baseline.png`, `repaired.png`, `REPORT.md`.
