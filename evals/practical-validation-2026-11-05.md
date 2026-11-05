# Practical follow-up — 2026-11-05

Base: `17fccc1d1d002a6e099ff033afd12c6fbc141f77`. Current content is identified by [snapshot](practical-validation-2026-11-05-snapshot.json); it does not rewrite historical records.

## Concrete repair

The reported previous-round completion defect was reproduced: active count went **1 → 0** when an old `finish('hit')` callback ran after a new round reused `hit`. Completion now carries a captured owner/generation token. Four new tests cover old-round callbacks, repeated round labels, cross-owner/bare/unknown tokens and disposal/repeated completion. The online fixture passes **17/17**, and the full Node regression set passes **42/42** (12 jump, 9 racing, 17 online, 4 historical racing).

Run the command in [behavior/README.md](behavior/README.md). These tests validate the fixture, not model usefulness, authority/security or a production networking system. Older 38/13-test passes missed the callback boundary; their source hashes/results remain historical. The old comparison inputs and outputs keep their original API.

## Practical work and comparison

The [real ChessAlkkkaegi component case](https://github.com/Ddrubok/kill-game-slop/tree/main/evals/real/promotion-2026-11-05) diagnoses duplicate/stale promotion callbacks, chooses bounded owner/first-commit handling, adapts reduced-motion closing feedback and rechecks the same game component. Original game files were not changed. It is an isolated source-backed case, not a full real-match playtest or an independent three-agent handoff.

The [fresh four-session comparison](discovery-2026-11-05/report.md) uses two cause-unspecified/review tasks. Both short and full-bundle P01 outputs pass 4/4 hidden checks; both N01 reviews preserve the app and offer optional alternatives. **No additional accuracy benefit was demonstrated.** The full condition received all three skills, so individual contributions cannot be isolated.

Runtime instructions were not expanded for this repair. The package already contained the relevant lifetime/evidence principles; this pass improves their examples and execution evidence. U/V, real controller/network/device, human preference and native engine execution of the bettermakegame fixtures remain NOT RUN. The separately published game-vfx Godot scene does not change that status.

See the [cross-skill maintenance matrix](principle-consistency.md) for the document consistency review and optional package checker. It adds no runtime dependency between skills.

## Final package checks

[Machine-readable summary](practical-validation-2026-11-05-results.json): all three skill frontmatters passed the existing validator; selected runtime local file links and licenses passed the maintainer checker; repository Markdown file targets and `git diff --check` passed. New text whitespace was checked separately. Markdown anchor rendering and agent behavior are not established by those static checks. The frozen comparison runtime matches the final runtime byte-for-byte; snapshots also include LF-normalized hashes for cross-platform checkouts.
