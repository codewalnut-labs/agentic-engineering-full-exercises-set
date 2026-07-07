**Exercise 03**

# Spring Boot Integration Test Gate

**Goal:** Create an integration test gate for a React task board backed by a Spring Boot API whose persistence workflow mocks keep missing.

**Outcome:** Mock-heavy confidence is replaced with backend integration tests and a frontend smoke path.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

React starter:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react"
npm install
npm run dev
```

Spring Boot starter:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-spring-boot"
mvn spring-boot:run
```

Seed files:
- [docs/backend-test-gap.md](./docs/backend-test-gap.md)

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Add Spring Boot integration tests for transitions, validation, persistence, and audit logs.
4. Fix the backend behavior those tests expose.
5. Connect an independent browser smoke flow to deterministic backend fixtures using role locators and web-first assertions.
6. Preserve Playwright traces/reports and repeated-run evidence so the gate proves UI plus backend reliability.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Spring Boot integration tests.
- Backend code fixes where the test gate exposes gaps.
- Frontend smoke path against deterministic data.
- Evidence from backend and frontend verification commands.

## Verify

Run at least:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react" && npm test
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react" && npm run agent:check
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-spring-boot" && mvn test
```

Done when:
- Spring integration tests
- role locator smoke
- trace/report capture
- deterministic backend fixture
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
