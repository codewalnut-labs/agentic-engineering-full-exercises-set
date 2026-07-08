**Exercise 02**

# Contract-First Scheduling API

**Goal:** Design and implement the contract for a scheduling hold flow between the React UI and Spring Boot availability API before either side drifts.

**Outcome:** The OpenAPI stub, Spring Boot endpoint, React states, and tests all agree on how slots, holds, conflicts, stale selections, and validation errors work.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Spring Boot testing reference](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/api-brief.md`, `docs/openapi-stub.md`, the React client, and the Spring Boot controller, then list mismatches in fields, status codes, time zones, and error shapes.
2. Review the list and decide the exact request/response contract for available slots, creating a hold, duplicate hold, stale slot, invalid time zone, validation failure, and conflict.
3. Update `docs/openapi-stub.md` first so both starters share one vocabulary and status-code table.
4. Implement or repair the Spring Boot endpoint against that contract.
5. Wire the React UI to the documented payload examples for loading, success, validation, conflict, stale, and retry states.
6. Add contract or integration tests for successful hold, duplicate hold, invalid time zone, stale slot, validation error, and conflict response.
7. Walk one behavior from OpenAPI to backend test to UI state and mark intentionally unsupported behavior as a non-goal.

## Deliver

- Updated OpenAPI contract for slot lookup and hold creation.
- Spring Boot endpoint behavior and contract or integration tests for each documented response type.
- React UI states driven by documented payload examples.
- Evidence note tracing every major response type to OpenAPI, backend test, UI state, and final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The OpenAPI contract is updated before implementation and remains the source of truth.
- Backend tests cover status codes and payloads for success, duplicate, validation, stale, and conflict paths.
- The React client handles every documented response state without guessing at undocumented fields.
- A fresh agent can explain the API boundary and name which side owns slots, holds, validation, conflicts, and retry behavior.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
