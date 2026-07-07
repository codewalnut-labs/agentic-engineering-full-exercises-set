**Exercise 02**

# Contract-First Scheduling API

**Goal:** Frame the contract between a scheduling UI and a Spring Boot availability API before implementation begins.

**Outcome:** The UI and Spring Boot scheduling API agree on a testable contract before the implementation drifts.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

React starter (run from the repository root):

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react"
npm install
npm run dev
```

Spring Boot starter (run from the repository root):

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-spring-boot"
mvn spring-boot:run
```

Seed files:
- [docs/api-brief.md](./docs/api-brief.md)
- [docs/openapi-stub.md](./docs/openapi-stub.md)

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Use the OpenAPI draft as the source of truth for slots, holds, conflicts, validation errors, time zones, and concurrency.
4. Implement or repair the Spring Boot endpoints and React client states against that contract.
5. Add contract/integration tests for successful holds, stale slots, duplicate holds, invalid time zones, and conflict responses.
6. Generate a small frontend state matrix from real API payload examples.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Spring Boot endpoint behavior matching the contract.
- React client states for loading, success, validation, conflict, and retry.
- Backend contract or integration tests plus frontend smoke coverage.
- Contract notes that cite the tests and payload examples.

## Verify

Run at least:

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react" && npm test
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react" && npm run agent:check
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-spring-boot" && mvn test
```

Done when:
- OpenAPI contract check
- Spring integration tests
- frontend state smoke
- timezone validation test
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
