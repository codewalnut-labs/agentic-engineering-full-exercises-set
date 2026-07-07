**Exercise 03**

# Spring Boot Integration Test Gate

## Competency

04. Test Automation - Reliable E2E test generation

## Your Mission

Create an integration test gate for a React task board backed by a Spring Boot API whose persistence workflow mocks keep missing.

## Starter Project

```text
04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react
04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-spring-boot
```

Run the React starter:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-react"
npm install
npm run dev
```

Run the Spring Boot starter:

```bash
cd "04 Test Automation/exercise-03-spring-boot-integration-test-gate/starter-spring-boot"
mvn spring-boot:run
```

## Lab Outcome

Mock-heavy confidence is replaced with backend integration tests and a frontend smoke path.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Agents can write tests quickly; your job is to make those tests reliable.

Practice signals for this exercise:

- Test real user flows and behavior users notice.
- Use role-based locators rather than brittle CSS or XPath selectors.
- Make every test independent so suites run in parallel without cascading failures.
- Use auto-waiting assertions instead of fixed sleeps.

Common mistake to avoid: Flaky tests train teams to ignore red; green means little when the suite never fails for real regressions.

Mastery signal: Tests fail for regressions, stay green across repeated CI runs, and are trusted enough to refactor behind.

## Hands-On Scope

- Add Spring Boot integration tests for transitions, validation, persistence, and audit logs.
- Fix the backend behavior those tests expose.
- Connect an independent browser smoke flow to deterministic backend fixtures using role locators and web-first assertions.
- Preserve Playwright traces/reports and repeated-run evidence so the gate proves UI plus backend reliability.

## Required Working Deliverables

- Spring Boot integration tests.
- Backend code fixes where the test gate exposes gaps.
- Frontend smoke path against deterministic data.
- Evidence from backend and frontend verification commands.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Review Bar

Does this gate catch the category of regression mocks kept missing?
