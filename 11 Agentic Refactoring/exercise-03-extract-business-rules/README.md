# Extract Business Rules Without Breaking the API

## Your Mission

A backend service mixes data lookup, validation, result construction, and persistence. Extracting its business rules looks straightforward, but moving a check can change which error users receive or whether rejected requests alter stored data.

Separate the validation policy from orchestration while preserving backend behavior, HTTP responses, and the client contract.

## Project

[workflow-rules-api](./workflow-rules-api) contains the Spring service. [api-refactor-app](./api-refactor-app) contains the client and verification commands. The [rules contract](./docs/rules-contract.md) records the behavior to preserve.

Use the [setup instructions](./docs/setup.md), including Java 21 and the Maven wrapper. Time box: 75 minutes.

## How To Go About It

1. Inspect the service, endpoint, and client parser. Record their current responsibilities and risky boundaries in `evidence/before.md`.
2. Use **[writing-plans](https://github.com/obra/superpowers/tree/main/skills/writing-plans)** to plan the extraction: which responsibility moves, which stays, and which checks prove compatibility. Keep the plan focused on the supplied change.
3. Add a public-service characterization test and capture the before contract. Run the baseline checks and commit the test and snapshot before production edits.
4. Add `DecisionPolicy.java` and update `WorkflowService.java`. Keep repository access, result construction, and persistence in the service; preserve the order of lookup and validation.
5. Run the backend, HTTP, and client checks. Confirm actual test discovery, unchanged errors and JSON fields, one save on acceptance, and no mutation or save on rejection.

## Evidence

Submit the policy extraction, characterization test, extraction plan, before and after contract snapshots, responsibility map, and rollback explanation. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, cite sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- Characterization evidence precedes production changes and remains unchanged.
- The policy validates without accessing persistence.
- Lookup precedence, validation boundaries, accepted legacy states, and exact error text are preserved.
- Backend side effects, HTTP fields, and client behavior remain compatible.
- Real tests are discovered and pass; `npm run verify:exercise` passes.
