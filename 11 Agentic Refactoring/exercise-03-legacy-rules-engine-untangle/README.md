**Exercise 03**

# Legacy Rules Engine Untangle

## Competency

11. Agentic Refactoring - Test-driven tech-debt cleanup

## Your Mission

Refactor a Spring Boot rules endpoint and React UI adapter without changing the contract clients depend on.

## Starter Project

```text
11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react
11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-spring-boot
```

Run the React starter:

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react"
npm install
npm run dev
```

Run the Spring Boot starter:

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-spring-boot"
mvn spring-boot:run
```

## Lab Outcome

A Spring Boot rules endpoint is refactored only after API behavior and logs are protected.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Before the agent cleans up old code, make it prove behavior stays the same.

Practice signals for this exercise:

- Generate a behavior spec from current code before changing structure.
- Add characterization tests and get a green baseline first.
- Mark behavior as must-preserve, intentionally-changing, or actually-a-bug.
- Refactor in small chunks while isolating I/O, validation, side effects, and conditionals.

Common mistake to avoid: A clean-looking rewrite that changes behavior is still a bug.

Mastery signal: A green baseline exists before refactoring, every chunk stays green, and behavior is identical where it must be.

## Hands-On Scope

- Add characterization and integration tests around the legacy rules endpoint.
- Separate validation, rule evaluation, persistence, and side effects.
- Preserve API shape, logs, and frontend behavior unless explicitly categorized as bugs.
- Compare before/after responses using golden cases.

## Required Working Deliverables

- Spring Boot characterization/integration tests.
- Refactored backend rules code.
- React adapter updates only where needed.
- Golden-case comparison evidence.

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

Would you let an agent continue refactoring this service after seeing the safety net?
