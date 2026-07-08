**Exercise 03**

# Spring Boot Integration Test Gate

**Goal:** Add Spring Boot integration coverage for the task-board persistence workflow that frontend mocks failed to protect.

**Outcome:** Create, update, invalid transition, not-found, and readback behavior are protected by backend tests, with the React smoke path aligned to real API responses.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Spring Boot testing reference](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Testcontainers Java docs](https://java.testcontainers.org/) when a real dependency boundary is needed
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/backend-test-gap.md`, the Spring Boot API, React API calls, and current mocks, then list persistence behaviors not protected by mocks.
2. Review the gap list and choose which behaviors require Spring integration coverage instead of another frontend mock.
3. Add backend tests for task create, update, invalid status transition, not-found update, and persistence readback.
4. Wire a small React smoke path or contract fixture to the same response shapes used by the backend tests.
5. Ask the agent to document which mocks remain and why they do not hide the tested persistence behavior.
6. Run backend tests and the React smoke/check command.
7. Run a clean-context review where a new agent must choose whether a future bug belongs in backend integration coverage or frontend component coverage.

## Deliver

- Spring Boot integration or controller/service tests for task create, update, invalid transition, not-found, and readback paths.
- Frontend smoke path or contract fixture aligned with backend responses.
- Backend test-gap note updated with protected and still-unprotected behavior.
- Evidence note separating integration confidence from mocked UI confidence plus final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Backend tests exercise real Spring wiring for the persistence gap that mocks missed.
- Invalid transitions and not-found paths are covered, not only successful persistence.
- React expectations match backend response shapes and status behavior.
- A fresh agent can explain why the new gate catches the original mock blind spot.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
