**Exercise 02**

# Contract-First Scheduling API

## Competency

02. Spec Framing - Requirements decomposition and testable spec creation

## Your Mission

Frame the contract between a scheduling UI and a Spring Boot availability API before implementation begins.

## Starter Project

```text
02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react
02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-spring-boot
```

Run the React starter:

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-react"
npm install
npm run dev
```

Run the Spring Boot starter:

```bash
cd "02 Spec Framing/exercise-02-contract-first-scheduling-api/starter-spring-boot"
mvn spring-boot:run
```

## Senior Lab Outcome

The UI and Spring Boot scheduling API agree on a testable contract before the implementation drifts.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Do not hand the agent a vague ticket. Hand it a contract it can test.

Practice signals for this exercise:

- Have the agent interview the ticket for gaps, assumptions, and product questions before code planning.
- Decompose work into PR-sized chunks that are independent, testable, and reviewable.
- Write acceptance criteria with expected behavior, boundaries, failure states, and done conditions.
- Include concrete inputs, outputs, UI states, API responses, and error messages.

Common mistake to avoid: A spec the agent cannot test is not useful; vague improvement language invites invention.

Mastery signal: The first diff matches intent, acceptance criteria are clear, and each chunk can merge on its own.

## Hands-On Scope

- Use the OpenAPI draft as the source of truth for slots, holds, conflicts, validation errors, time zones, and concurrency.
- Implement or repair the Spring Boot endpoints and React client states against that contract.
- Add contract/integration tests for successful holds, stale slots, duplicate holds, invalid time zones, and conflict responses.
- Generate a small frontend state matrix from real API payload examples.

## Required Working Deliverables

- Spring Boot endpoint behavior matching the contract.
- React client states for loading, success, validation, conflict, and retry.
- Backend contract or integration tests plus frontend smoke coverage.
- Contract notes that cite the tests and payload examples.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Can backend and frontend leads sign off independently without discovering contract gaps in review?
