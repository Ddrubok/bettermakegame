# UI/HUD regression evaluation

Prepared on 2026-10-28 from the user's UI/HUD patch guide v1.0. This is maintainer material, not an ordinary skill reference. The companion kill-game-slop repository contains U02, U03, U06, and U08; neither skill requires the other to run.

## Comparison protocol

Use [cases.md](cases.md) and the selected skill snapshot only. Run before and after in fresh conversations with the same model, settings, inputs, tools, and scope. Do not send this protocol, [judge-key.md](judge-key.md), patch explanations, or earlier responses to reviewers. Disable unrelated skills where possible and record unavoidable host instructions. Provide only the selected skill's runtime files and linked references, not the whole evaluation directory.

The before version is commit `d7901b4af891cd934a872e4bb629d52f515e42db`. Identify the after version by commit or an exact snapshot and file hashes; do not label the unchanged base commit as the patched version. Save delivered prompts, raw responses, tool traces, and artifacts before judging. This set tests interpretation of synthetic records; it does not supply the captures those records describe.

After freezing answers, use the separate key. These cases informed the patch, so do not describe them as unseen tests. For actual interaction and comprehension checks, supply small touch and keyboard/controller fixtures and ask first-time users to locate the next action, distinguish states, and return. Record errors, assistance, sample limits, and measured times only when collected. Vary comparison order when feasible.

## Current status

| Case | Before response | After response | Runtime / human checks |
| --- | --- | --- | --- |
| U01 | NOT RUN | NOT RUN | NOT RUN |
| U04 | NOT RUN | NOT RUN | NOT RUN |
| U05 | NOT RUN | NOT RUN | NOT RUN |
| U07 | NOT RUN | NOT RUN | NOT RUN |

No fresh model comparisons or player trials were run for this patch. The editing session followed the workspace's solo-agent preference; the author has already seen the key, so self-review is not a blinded comparison. Runtime fixtures and human observations are not included. Document and package validation must be reported separately from behavior or effectiveness.

## Run record

| Case | Skill commit / snapshot hashes | Host / model / settings | Exact input / starting project | Conditions / tools | Actual behavior | Result | Evidence | Limits / scorer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Case ID | Before or after version | Unknown fields stay unknown | Prompt and fixture paths | Device, viewport, input, language, access | Observed actions only | NOT RUN / PASS / FAIL / MIXED / BLOCKED | Raw response and trace paths | Untested scope; human or AI |

## Supplemental evaluation v2

The supplemental guide v2.0 adds V01–V04 here; kill-game-slop contains V05–V08. Preserve the U inputs, key, and status above as the first patch's separate record. Guide version 2.0 is not a skill release version.

For this comparison, the **before** commit is `28bdd9916b2542164ca242288f9b33a941609ec4`. Pin the after commit or exact snapshot hashes. Provide [supplemental-cases.md](supplemental-cases.md) and the selected skill runtime files only in fresh independent conversations with the same model, settings, tools, and inputs. Exclude both judge keys, previous responses, and patch explanations. Save raw prompts, responses, tool traces, changes, and captures before using [supplemental-judge-key.md](supplemental-judge-key.md). Reuse the run record above, distinguishing NOT RUN from an attempted check blocked by a documented constraint.

These synthetic inputs test judgment, not the described captures or actual game behavior. V01 needs a modal fixture with controller/keyboard navigation and removal of its opener; V04 needs a fixture with coupled display/collision transforms. Reset starting state between runs. Record device, language, settings, and actual observations. Human checks use concrete tasks, record assistance/errors/time only when observed, and disclose sample limits. These cases informed the patch; they are not unseen tests.

| Case | Before response | After response | Runtime / human checks |
| --- | --- | --- | --- |
| V01 | NOT RUN | NOT RUN | NOT RUN |
| V02 | NOT RUN | NOT RUN | NOT RUN |
| V03 | NOT RUN | NOT RUN | NOT RUN |
| V04 | NOT RUN | NOT RUN | NOT RUN |

No independent model comparison, executable fixture run, or human observation was performed for the supplemental patch. This editing session remains solo, and its author has seen the key. Fixtures are not included. Static package checks and maintainer review are separate from these unrun evaluations and cannot establish improved usability or preference.
