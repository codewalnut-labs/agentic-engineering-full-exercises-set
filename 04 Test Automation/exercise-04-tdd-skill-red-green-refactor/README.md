**Exercise 04**

# TDD Skill Red-Green Refactor

**Goal:** Use a TDD-style skill loop to implement invoice retry rules without letting the agent jump straight to a broad rewrite.

**Outcome:** Payment retry behavior is specified test-first, implemented one rule at a time, and refactored only after the suite proves behavior.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/behavior-contract.md](./docs/behavior-contract.md)
- [docs/red-green-log.md](./docs/red-green-log.md)

From the repository root, open the main starter:

```bash
cd "04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `tdd`
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `tdd`
- [TDD skill guide](https://www.aihero.dev/skill-test-driven-development-claude-code)
- [Test-driven development overview](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills@latest add mattpocock/skills`, select `tdd`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked guide as the workflow.
2. Ask your coding agent to read `docs/behavior-contract.md` and `docs/red-green-log.md`, then list the invoice retry rules in the order they should be tested.
3. Review the list and block any broad rewrite plan that does not start with one failing behavior test.
4. Invoke `/tdd` or have the agent follow the linked guide to write the first failing test for the highest-risk retry rule and capture the red result in the log.
5. Ask the agent to implement only enough production code to make that test pass, then repeat for the next rule.
6. After the retry suite is green, ask for a refactor pass that reduces duplication without changing the test contract.
7. Review the red-green log and require evidence that each refactor happened after green, not before behavior was protected.

## Deliver

- Ordered retry-rule test list tied to the behavior contract.
- Red-green log showing failing test, minimal implementation, and refactor steps.
- Working retry behavior in the starter.
- Evidence note with final checks and any rule deferred from the contract.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Each implemented rule has a test that failed before the code change or a clear reason it could not be demonstrated.
- Production changes stay narrow until the corresponding test is green.
- Refactoring preserves the retry contract and does not delete meaningful edge coverage.
- A fresh agent can continue the loop from the red-green log.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
