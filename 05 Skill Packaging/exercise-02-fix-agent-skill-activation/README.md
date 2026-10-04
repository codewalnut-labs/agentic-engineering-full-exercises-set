# Exercise 02 : Make an Agent Skill Activate for the Right Requests

## Your Mission

Your team has a useful code-review skill, but its description makes the agent use it for release notes and incident reports while overlooking real review requests. The skill's instructions are sound; its activation rules are unclear.

Your mission is to use **[skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)** to repair that description and prove when the agent chooses the skill. Improve selection without changing what the skill does.

The duration for this challenge is 60 min or less after setup; repeated agent runs may take longer.

## Project

[skill-trigger-app](./skill-trigger-app) supplies an independent three-skill catalog, the original `change-review` snapshot, 20 protected requests, and scoring tools. The [catalog boundaries](./docs/catalog-boundaries.md) explain which requests belong to code review, release notes, and incident summaries.

Only the `description` field in `skills/change-review/SKILL.md` may change. Twelve requests support improvement; eight reserved requests check whether the description works beyond the examples used to tune it.

## How To Go About It

1. Make the catalog discoverable in an isolated agent workspace. Run each request three times with the original description. Observe actual skill activation and retain raw responses in `evidence/before-results.json`; summarize starting failures in `evidence/before.md`.
2. Load skill-creator and use its description-evaluation workflow. Analyze only training results: which review requests were missed and which neighboring tasks activated the wrong skill.
3. Rewrite the description around the requested action, code artifacts, and review outcome. Preserve the body, neighboring skills, and requests; freeze the candidate before examining reserved results.
4. Repeat requests under the same agent, model, catalog, and runtime settings. Save every decision and its raw evidence. Score training and reserved results with the supplied tools.
5. Record the verified result in `evidence/after.md` and explain accuracy, unwanted activation, consistency, and the adoption decision in `evidence/comparison.md`.

## Evidence

Submit the description change, both 60-decision result sets, raw routing records, training error analysis, and the actual skill-creator session.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `skill-trigger-app/` before raising a focused PR.

## Completion Criteria

Only the description changes. The candidate passes at least 10 of 12 training requests and 7 of 8 reserved requests, identifies at least 75 percent of genuine reviews, and avoids at least 75 percent of unrelated requests. At least 80 percent of requests produce consistent decisions across repetitions. The recorded decision accounts for improvement or an already strong baseline, with no tuning against reserved wording.
