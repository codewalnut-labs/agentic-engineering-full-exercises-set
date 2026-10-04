# Exercise 01 : Turn a Repeated Task into a Reusable Agent Skill

## Your Mission

Your team repeats the same release-note task by pasting a large prompt into every agent session. It mixes current rules with obsolete advice, loads unrelated material, and produces notes that miss a breaking change and publish internal work.

Your mission is to use **[skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)** to turn this workflow into a reusable Agent Skill. Another engineer should be able to use it on a Git range and get accurate notes while loading only the guidance that request needs.

The duration for this challenge is 60 min or less after setup.

## Project

[release-notes-app](./release-notes-app) supplies the validation tools. The protected [Git bundle](./fixtures/release-history.bundle), [release policy](./docs/release-policy.md), and [monolithic draft](./docs/monolithic-skill-draft.md) define the starting problem.

This standalone challenge covers skill structure, selective loading, and a reusable Git extractor. The supplied [scenarios](./docs/eval-scenarios.md) cover a full release, a hotfix, and changes that are entirely internal.

## How To Go About It

1. Run the full-release request with the monolithic draft in a fresh session. Save the output and record its accuracy, loaded guidance, and measured bytes in `evidence/before.md`.
2. Load skill-creator and use its draft, evaluate, and revise workflow. Build `.agents/skills/release-notes/` with clear metadata, short main instructions, conditional policy references, and one Git extractor.
3. Make the extractor accept any repository, base, and head. Test it against the protected fixture and an unrelated repository; keep fixture answers out of the implementation.
4. Use the packaged skill in fresh sessions for all three scenarios. Keep the primary full-release conditions comparable. Save the notes and actual resource reads; measure guidance bytes with the supplied command.
5. Evaluate the outputs, refine from observed failures, and record the final result in `evidence/after.md`. Explain accuracy, portability, and selective loading in `evidence/comparison.md`.

## Evidence

Submit the skill folder, extractor, three quality evaluations, baseline and final release notes, resource-use records, and the actual skill-creator session.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `release-notes-app/` before raising a focused PR.

## Completion Criteria

The final notes trace customer changes to Git, identify breaking migration and missing verification evidence, and exclude internal work. The hotfix and internal-only runs load only relevant references. The extractor works on an unrelated repository. Measured skill guidance is smaller than the monolithic draft without reducing release accuracy, and another engineer can inspect and reproduce the evidence.
