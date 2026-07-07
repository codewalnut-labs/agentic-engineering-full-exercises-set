**Exercise 03**

# Legacy Rules Engine Untangle

**Goal:** Refactor a Spring Boot rules endpoint and React UI adapter without changing the contract clients depend on.

**Outcome:** A Spring Boot rules endpoint is refactored only after API behavior and logs are protected.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [starter-spring-boot](./starter-spring-boot)

Seed files:
- [docs/legacy-case-table.md](./docs/legacy-case-table.md)
- [docs/rules-contract.md](./docs/rules-contract.md)

From the repository root, open the main starter:

```bash
cd "11 Agentic Refactoring/exercise-03-legacy-rules-engine-untangle/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- [Spring Boot testing reference](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Refactoring catalog by Martin Fowler](https://refactoring.com/catalog/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/legacy-case-table.md`, `docs/rules-contract.md`, the Spring Boot workflow service, and the React adapter to identify public behavior that must not change.
2. Review the behavior list and create golden API cases for valid decisions, invalid transitions, missing workflow items, and log or response shape expectations.
3. Have the agent add Spring characterization or integration tests before refactoring backend rules.
4. Refactor the rules code into clearer decision, validation, and side-effect boundaries while keeping API output stable.
5. Ask the agent to smoke the React adapter against the same response cases so UI assumptions are still valid.
6. Run a clean-context review where a new agent compares the rules contract to final code and names any behavior intentionally left messy.

## Deliver

- Golden case table or tests for the Spring rules endpoint.
- Refactored backend rules code with public contract preserved.
- React adapter smoke or fixture evidence for key responses.
- Evidence note showing before/after API comparison and residual refactor risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Spring tests protect current public behavior before refactoring begins.
- API status codes, response fields, and important log or error behavior do not drift accidentally.
- React adapter assumptions are checked against backend cases.
- A fresh agent can explain which behavior was preserved and which cleanup remains deferred.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
