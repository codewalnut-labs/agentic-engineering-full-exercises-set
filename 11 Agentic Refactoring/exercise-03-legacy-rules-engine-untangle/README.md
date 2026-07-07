**Exercise 03**

# Legacy Rules Engine Untangle

**Goal:** Refactor a Spring Boot rules endpoint and React UI adapter without changing the contract clients depend on.

**Outcome:** A Spring Boot rules endpoint is refactored only after API behavior and logs are protected.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

React starter (run from the repository root):

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react"
npm install
npm run dev
```

Spring Boot starter (run from the repository root):

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-spring-boot"
mvn spring-boot:run
```

Seed files:
- [docs/legacy-case-table.md](./docs/legacy-case-table.md)
- [docs/rules-contract.md](./docs/rules-contract.md)

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Add characterization and integration tests around the legacy rules endpoint.
4. Separate validation, rule evaluation, persistence, and side effects.
5. Preserve API shape, logs, and frontend behavior unless explicitly categorized as bugs.
6. Compare before/after responses using golden cases.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Spring Boot characterization/integration tests.
- Refactored backend rules code.
- React adapter updates only where needed.
- Golden-case comparison evidence.

## Verify

Run at least:

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react" && npm test
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react" && npm run agent:check
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-spring-boot" && mvn test
```

Done when:
- Spring characterization tests
- API golden comparison
- React adapter smoke
- contract preservation check
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
