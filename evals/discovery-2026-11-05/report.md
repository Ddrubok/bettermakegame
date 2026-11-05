# Cause-unspecified comparison results — 2026-11-05

Four fresh sessions were requested with model `gpt-6-astra`: P01-short, P01-skill, N01-short, N01-skill. Same task and starting HTML per pair; same available Node/Chrome tooling. Exact serving revision was not independently exposed. The full condition received the three runtime packages; the short condition received the same task and a short evidence/scope reminder. This tests the **bundle**, not the marginal value of each individual skill.

| Task | Short condition | Full-skill condition | Interpretation |
| --- | --- | --- | --- |
| P01: diagnose an unreliable selection without a named cause | 4/4 hidden functional checks | 4/4 hidden functional checks | Both found and repaired repeat submission and stale-owner completion; no accuracy advantage |
| N01: review an intentionally bright celebration; optional proposals allowed | No app edit, no confirmed false defect; 3 bounded optional alternatives | No app edit, no confirmed false defect; 2 bounded optional alternatives | Both preserved the valid design while offering alternatives; alternative counts are not quality scores |

The coordinator ran [P01's hidden checker](judge/P01.mjs) against both final HTML files. The unchanged broken baseline failed the duplicate-submit assertion, providing a negative control. [Functional results](runs/functional-results.json) record hashes and individual assertions. Both N01 HTML hashes match the original; [qualitative review](runs/review-results.json) records the coordinator's report/evidence judgment. N01 session browser observations were inspected, not independently rerun by the coordinator. Their own reports distinguish opened screenshots from saved-only captures and make no human comfort/performance claim.

The coordinator also opened the short condition's 360 px normal-motion still and the full condition's 360 px reduced-motion still: reward text and next action were visible and separate from the decorative area. This narrow image check does not independently verify the sessions' motion or input tests.

## Reproduction packet

- [Preparation script](prepare.mjs), [frozen input manifest](runs/input-manifest.json), and `runs/evaluated-runtime/` preserve the actual full-condition runtime files by SHA-256. It is maintainer evidence, never an installation directory. Judge keys were not included in session inputs.
- Reports, final source, original task/condition and verification artifacts: [P01 short](runs/P01-short/REPORT.md), [P01 full](runs/P01-skill/REPORT.md), [N01 short](runs/N01-short/REPORT.md), [N01 full](runs/N01-skill/REPORT.md).
- Browser: Chrome 156.0.8078.80; Node 22.18.0; Playwright 1.62.1; Windows. Parent scoring uses the same browser executable for the two P01 outputs. The scripts in session outputs may contain the local tool path used by that session; adjust it for another machine without changing the app under test.

To repeat, run `node prepare.mjs NEW_OUTPUT BMG_RUNTIME VFX_RUNTIME SLOP_RUNTIME` using the desired three runtime roots. Give each fresh session only its directory and the task/condition, forbid reading other sessions or judge files, and run the judge afterward. The judge exports a function; see the recorded assertions and the maintainer runner in `score.mjs`. Preserve hashes before execution. Use the same model/tools per pair and report model availability changes.

## Limits

One sample per task/condition, two authored tasks, author-aware grading, no human playtest or OS read sandbox. The agent instructions prohibited outside reads, but no full tool-access trace audit establishes isolation. The coordinator knew the cases and expected behaviors. The full sessions received all three skills, so this does not identify which instruction caused a decision. N01 supports appropriate preservation/proposals in this example only. P01 is derived from the real component with its dependency layer replaced by HTML; it is not another full-game integration.

No timing, token-cost, general accuracy percentage, artistic superiority or cross-model benefit was measured. Previous 14/14 comparisons remain historical and are not relabeled as this test. U/V evaluations, real hardware/network and human studies remain NOT RUN. The useful new evidence is a cause-unspecified repair and a normal-design review with published outputs; the full bundle again shows **no demonstrated accuracy advantage over the short prompt** on these tasks.
