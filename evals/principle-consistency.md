# Cross-skill maintenance checks

These checks belong to maintainers, not each normal task. The three skills remain independently installable; no shared runtime file or required skill order is introduced. Do not use keyword counts as proof that an agent obeys a principle.

| Invariant | bettermakegame | game-vfx | kill-game-slop | Evidence / remaining gap |
| --- | --- | --- | --- | --- |
| Review does not grant edit permission | SKILL scope and finding-handoff | SKILL scope and style-and-handoff | SKILL scope and skill-handoff | N01: both conditions kept the app unchanged; not a general compliance score |
| Preserve observed evidence and uncertainty | selection and finding-handoff | style-and-handoff and visual-validation | presentation-checks and skill-handoff | All four reports disclose limits; source/report review, no full transcript audit |
| Old owner must not affect a replacement | gameplay-polish plus repaired online fixture | event-integration plus event template | runtime-checks and returned verification | BMG 17 online tests; VFX 13 local/11 rendered checks; real promotion replacement case |
| Reduced motion and valid identity survive repairs | UI/HUD and feedback selection | style and validation references | presentation-checks | Real component reduced-motion case and N01 preservation; no human preference claim |
| Applied and verified are separate | success conditions | export/integration checks | reconciliation into original finding | Published before/after records; full match/native game integration still limited |

The coordinator reviewed these routes for contradictions on 2026-11-05. This is a document consistency review, not an automated behavioral pass. The real component case supplies a limited same-session joint example; the four fresh sessions compare short instructions with the whole bundle. Dedicated U/V/handoff sets remain NOT RUN.

Use `python check-packages.py BMG_REPO VFX_REPO KGS_REPO` from this directory for mechanical packaging checks, using an installed Python 3. It verifies license inclusion, local Markdown file targets and exclusion of evaluation directories from runtime. It does not install dependencies, run engines, grade semantics, or make one skill depend on another.
