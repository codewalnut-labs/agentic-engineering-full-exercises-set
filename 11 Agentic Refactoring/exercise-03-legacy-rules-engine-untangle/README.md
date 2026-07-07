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
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: project purpose, domain behavior, important files, existing commands, risks, expected outputs, and likely files to change.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Spring Boot characterization/integration tests.
- Refactored backend rules code.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Spring characterization tests protect current rules behavior.
- API golden comparison shows public behavior did not drift.
- React adapter smoke testing covers the rule responses the UI depends on.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
