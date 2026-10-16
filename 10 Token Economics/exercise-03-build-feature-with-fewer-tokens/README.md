# Exercise 03 : Build the Same Feature with Fewer Tokens

## Your Mission

An agent can spend unnecessary tokens building new helpers, export options, or abstractions for a feature the existing project utilities already support. Fewer changed lines alone do not prove lower token usage.

Use the **[ponytail skill](https://github.com/DietrichGebert/ponytail)** and test whether it delivers the same complete feature with fewer total agent tokens. Preserve correctness and count the skill's instruction overhead, failed attempts, and repeated work.

## Project

[ponytail-feature-app](./ponytail-feature-app) contains an unfinished filtered-record export, existing filtering and CSV utilities, and acceptance checks. The [feature request](./docs/feature-request.md) is identical for every trial.

This exercise is standalone. Allow **75 minutes plus agent runtime**. Use the supplied Claude Code runner and pinned Ponytail instructions; see [setup](./docs/setup.md). No custom provider adapter is required.

## How To Go About It

1. Record the starting commit and run three fresh baseline sessions without Ponytail. Preserve the original sessions and generated files, including failures.
2. Run three fresh sessions from the identical starter with Ponytail enabled. Keep the model, effort, tools, permissions, requirements, and limits unchanged.
3. Review each implementation against the same acceptance checks. Check filtering, empty results, CSV escaping, formula safety, and unchanged shared utilities.
4. Select an original successful assisted patch and commit it. Do not repair or shorten a measured patch after the trial; a new experiment needs complete preserved batches.
5. Compare median total input and output tokens, token ranges, correctness, and cost. Record whether Ponytail provides a benefit and what a small experiment cannot establish.

## Evidence

Submit the selected feature implementation, original six sessions and patches, actual skill-use proof, generated scorecard, and evidence/before.md, evidence/after.md, evidence/comparison.md.

Follow the [experiment contract](./docs/experiment-contract.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run npm run verify:exercise from ponytail-feature-app before opening one focused PR.

## Completion Criteria

The selected feature passes acceptance, the six trials are comparable, and every attempt is accounted for. Adoption requires all assisted trials to pass and lower median total tokens. A supported rejection or no additional benefit is valid. Removing requirements, minifying code, or counting changed lines as token savings is insufficient.
