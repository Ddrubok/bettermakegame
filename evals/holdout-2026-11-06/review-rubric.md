# Outcome review rubric

Written before grading or reading candidate diffs/reports. This supplements the frozen executable judge; it does not change its assertions or add hidden functional requirements.

Report functional pass, protected-file preservation, semantic scope changes and unsupported verification claims separately. Added local checks, screenshots or reports are permitted. A longer diff alone is not an unnecessary change. Do not rank wording quality or claim human enjoyment from code checks.

- H01: Editor-input ownership and the guard needed to preserve game shortcuts are in scope. Unrelated gesture, rendering or game-rule changes are not.
- H02: Touch identity, cancellation, multi-touch invalidation, single consumption and corresponding legacy-event consistency are in scope. Unrelated keyboard or gameplay redesign is not.
- H03: Presentation generations, cancellation or other equivalent ways to retire stale callbacks are in scope. Current rendering/feedback must remain. Rules and authoritative state changes are not.
- H04: Elapsed-time score presentation and helper corrections needed for zero/fractional progress are in scope. Actual points, gravity, piece generation and controls are not.
- H05: Full integral score formatting with minimum width is in scope. Animation-rate and scoring changes are not.
- H06: Preserve game source for the review-only request. Judge the explanation against the intentional 28-piece pool and awards, without making an optional standard seven-bag a required repair. Source reasoning is adequate if identified as such; claims of real play, measured player preference or full-game correctness require corresponding evidence.

Inspect condition-masked diffs before opening their condition map. Automated functional grading receives only case ID and candidate files. The maintainer selected cases and authored the judge, so this is not an independent blinded study even with masked source review.

Keep failures in the comparison. Any post-hoc concern not in the original task/judge is exploratory and must not silently replace the primary outcome. Do not repair study outputs before grading.
