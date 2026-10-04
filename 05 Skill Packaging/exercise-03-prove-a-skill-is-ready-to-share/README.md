# Exercise 03 : Prove an Agent Skill Is Ready to Share

## Your Mission

Your team wants to share an incident-summary skill because its reports look polished. Nobody has checked whether it preserves source attribution, separates facts from assumptions, or keeps unfinished follow-ups open.

Your mission is to use **[skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)** to evaluate the skill, improve it from observed failures, and decide whether it deserves distribution. The shared package must contain the exact files that passed evaluation.

The duration for this challenge is 90 min or less after setup; repeated agent runs may take longer.

## Project

[skill-benchmark-app](./skill-benchmark-app) supplies its own weak skill, four incident tasks, grading tools, and archive verification. The [output contract](./docs/incident-output-contract.md) defines source-based reporting; the [benchmark gate](./docs/benchmark-gate.md) defines measurable release conditions.

This standalone challenge evaluates output quality and package identity. Two incident tasks support improvement; two reserved tasks assess the final candidate.

## How To Go About It

1. Run every task three times without a skill and with the unchanged starter. Retain outputs, measured timing and token usage, and raw session records. Record baseline findings in `evidence/before.md`.
2. Load skill-creator and use its evaluate, review, revise workflow. Improve `skills/incident-summary/` from training failures, keeping fixture answers and reserved task wording out of the skill.
3. Freeze the candidate. Run each task three times with it under comparable conditions. Generate grades from saved outputs and aggregate all 36 runs; preserve failures instead of selectively rerunning them.
4. Review reports alongside the scores. Compare source accuracy, critical errors, consistency, time, and tokens. Record the result in `evidence/after.md` and the distribution decision in `evidence/comparison.md`.
5. If the gate passes, generate and verify the archive. If any gate fails, reject the frozen candidate without an archive and explain the evidence. Bind the decision to the generated benchmark.

## Evidence

Submit the candidate, complete benchmark workspace, generated grades and comparison, distribution decision, and actual skill-creator session. A passing candidate also needs its archive and file manifest.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `skill-benchmark-app/` before raising a focused PR.

## Completion Criteria

All 36 runs are traceable and comparable. The candidate is assessed against the published quality, critical-error, consistency, and cost checks. The decision reflects improvement over both baselines or measurable value when a baseline already performs well. A distributed archive matches the evaluated skill byte for byte; a rejected candidate has no archive. Human review confirms source claims and remaining uncertainty.
