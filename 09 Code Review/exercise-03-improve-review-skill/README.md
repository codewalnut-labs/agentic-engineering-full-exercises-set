# Exercise 03 : Improve a Review Skill Without Adding False Alarms

## Your Mission

Your team's review agent misses regressions and sometimes blocks changes that are safe. A longer checklist is useful only if it improves the reviews.

Your challenge is to improve a reusable review skill and measure whether it catches real defects without adding false alarms. The deliverable is the review method and its evaluation; the supplied application and review cases stay unchanged.

Use the **[writing-skills skill](https://github.com/obra/superpowers/tree/main/skills/writing-skills)** to improve the supplied `regression-review` skill from observed review failures.

The duration for this challenge is 75 min or less after setup; agent runs may take longer.

## Project

[review-skill-app](./review-skill-app) contains a shallow starter skill, two defective review cases, a safe change, and a local scorer. A safe change is the control: the reviewer should approve it without inventing a blocker.

Use the [skill requirements](./docs/skill-contract.md) and [evaluation contract](./docs/evaluation-contract.md). This exercise is standalone.

## How To Go About It

1. Run each case in a fresh agent session without the review skill. Use the supplied runner and an adapter for your agent; preserve the original responses.
2. Record missed defects, unsupported findings, and actual run conditions in `evidence/before.md`.
3. Improve `skills/regression-review/SKILL.md` with a reusable method for tracing behavior, reproducing problems, and reporting evidence. Do not embed case answers or file hints.
4. Commit only the skill changes. Run the same cases in new sessions with the skill available, keeping the agent, model, tools, permissions, and time limit unchanged.
5. Score both sets of runs. Compare defect coverage, supported findings, and behavior on the safe change.
6. Record the result in `evidence/after.md` and `evidence/comparison.md`. If another revision is needed, preserve the previous batch and rerun the complete assisted batch.

## Evidence

Submit the improved skill, runner-captured prompts and responses, scorecard, evaluation report, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill-authoring use, source citations, sealed evidence, and captured output. Follow the [setup instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `review-skill-app/` before opening a focused PR.

## Completion Criteria

The improved skill covers the supplied defects, meets the precision threshold, and creates no blocker for the safe change. Results come from comparable, unedited agent runs. The skill contains a reusable method, all adoption gates pass, and limitations beyond these cases are explicit.
