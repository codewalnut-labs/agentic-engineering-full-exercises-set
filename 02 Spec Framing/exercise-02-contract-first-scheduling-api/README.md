**Exercise 02**

# Contract-First Scheduling API

**Goal:** Frame the contract between a scheduling UI and a Spring Boot availability API before implementation begins.

**Outcome:** The UI and Spring Boot scheduling API agree on a testable contract before the implementation drifts.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

Seed files:
- [docs/api-brief.md](./docs/api-brief.md)
- [docs/openapi-stub.md](./docs/openapi-stub.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Spring Boot testing reference](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/api-brief.md`, `docs/openapi-stub.md`, the React client, and the Spring Boot controller for contract gaps.
2. Review the proposed contract and decide exact request and response shapes for slots, holds, time zones, conflicts, validation errors, and stale selections.
3. Have the agent update the OpenAPI stub before implementation so both starters share the same vocabulary and status codes.
4. Implement or repair the Spring endpoint behavior against the contract, then wire the React states to real payload examples.
5. Ask the agent to add contract or integration tests for successful holds, duplicate holds, invalid time zones, stale slots, and conflict responses.
6. Do a final contract walk from OpenAPI to backend test to UI state and mark any intentionally unsupported behavior as a non-goal.

## Deliver

- OpenAPI contract that matches the implemented Spring Boot and React behavior.
- Spring Boot endpoint updates plus contract or integration tests.
- React loading, success, validation, conflict, and retry states driven by contract payloads.
- Evidence note tracing each major response type to a test or smoke check.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The OpenAPI contract is the source of truth for the backend and UI, not an after-the-fact note.
- Backend tests cover status codes and payloads for success, validation, stale data, and conflict paths.
- The React client handles every documented response state without guessing at undocumented fields.
- A fresh agent can explain the API boundary and name which side owns each behavior.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
