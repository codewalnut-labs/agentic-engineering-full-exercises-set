# Exercise 02 : Turn a Specification into a Verified Feature

## Your Mission

Your team has agreed what a feature must do, but agent implementations still miss requirements, skip meaningful tests, and claim completion before review findings are resolved.

Your mission is to use **[Superpowers](https://github.com/obra/superpowers)** to carry an approved specification through design, planning, test-first implementation, code review, and final verification. Another engineer should be able to check that the delivered feature meets the agreed requirements.

The duration for this challenge is 60 min or less after the base tools, Superpowers integration, and application dependencies are ready.

## Project

[team-collaboration-app](./team-collaboration-app) has existing membership rules, an unfinished invitation service, and a supplied [approved specification](./docs/invitation-contract.md). It defines permissions, duplicate handling, expiry, acceptance, revocation, and expected interface behavior.

This standalone challenge supplies its own specification. Product rules are fixed; you decide the implementation design and task breakdown. Build the feature and its tests while preserving the supplied requirements and acceptance tests.

## How To Go About It

1. Inspect the specification, repository, and support incidents. Capture the starting behavior in `evidence/before.md` and identify the requirements the starter does not satisfy.
2. Use `superpowers:brainstorming` to agree on the implementation design, then `superpowers:writing-plans` to create tasks linked to the supplied requirements.
3. Follow the appropriate Superpowers execution skill and `superpowers:test-driven-development`. Add a meaningful regression test, observe it fail for missing behavior, implement the feature, and show the same test passing. Continue testing as you complete the plan.
4. Use `superpowers:requesting-code-review` with an independent reviewer. Supply the approved specification, design, plan, and implementation commit. Resolve findings and demonstrate the feature in the running application.
5. Use `superpowers:verification-before-completion` to check the final code against every requirement. Record the result in `evidence/after.md` and explain what changed in `evidence/comparison.md`.

## Evidence

Submit the working feature, learner-written tests, approved design, implementation plan, actual skill-use sessions, captured failing and passing tests, review findings and resolutions, and requirement coverage.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `team-collaboration-app/` before raising a focused PR.

## Completion Criteria

The feature satisfies the supplied specification through the shared service and a usable interface. Evidence shows actual Superpowers use, design approval before implementation, a genuine test-first cycle, independent review, and verification of the final code. Critical and important findings are resolved or rejected with supporting evidence. Another engineer can reproduce the checks; passing tests alone do not replace requirement coverage and interface review.
