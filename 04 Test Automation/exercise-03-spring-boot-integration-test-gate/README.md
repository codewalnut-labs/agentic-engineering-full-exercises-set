**Exercise 03**

# Spring Boot Integration Test Gate

**Goal:** Create an integration test gate for a React task board backed by a Spring Boot API whose persistence workflow mocks keep missing.

**Outcome:** Mock-heavy confidence is replaced with backend integration tests and a frontend smoke path.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

Seed files:
- [docs/backend-test-gap.md](./docs/backend-test-gap.md)

From the repository root, open the main starter:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Spring Boot testing reference](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Testcontainers Java docs](https://java.testcontainers.org/) when a real dependency boundary is needed
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/backend-test-gap.md`, the Spring Boot API, React API calls, and current mocks to identify what persistence behavior is unprotected.
2. Review the gap list and decide which behaviors require Spring integration coverage instead of another frontend mock.
3. Have the agent add backend tests for create, update, invalid transition, not-found, and persistence-readback paths.
4. Wire a small frontend smoke path to use the API contract or fixture responses that match the integration tests.
5. Ask the agent to explain which mocks remain and why they do not hide the behavior under test.
6. Run a clean-context review where a new agent must choose whether a future bug belongs in backend integration coverage or frontend component coverage.

## Deliver

- Spring Boot integration or controller/service tests for the missing persistence workflow.
- Frontend smoke or contract fixture aligned with backend responses.
- Backend test-gap note updated with protected and still-unprotected behavior.
- Evidence note separating integration confidence from mocked UI confidence.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Backend tests exercise real Spring wiring for the workflow gap that mocks missed.
- Invalid transitions and not-found paths are covered, not only successful persistence.
- React expectations match backend response shapes and status behavior.
- A fresh agent can explain why the new gate catches the original mock blind spot.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
