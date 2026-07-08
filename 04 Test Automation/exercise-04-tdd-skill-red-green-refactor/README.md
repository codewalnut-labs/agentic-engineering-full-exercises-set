**Exercise 04**

# TDD Skill Red-Green Refactor

**Goal:** Use the TDD skill to implement invoice retry rules one failing test at a time, then refactor only after the retry suite is green.

**Outcome:** Retry delay, retry limit, permanent failure, and user-visible invoice status behavior are protected by a red-green-refactor log and working code.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `tdd`
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `tdd`
- [TDD skill guide](https://www.aihero.dev/skill-test-driven-development-claude-code)
- [Test-driven development overview](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills@latest add mattpocock/skills`, select `tdd`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked guide as the workflow.
2. Ask your coding agent to read `docs/behavior-contract.md` and `docs/red-green-log.md`, then order the invoice retry rules: retry delay, retry limit, permanent failure, manual retry, and user-visible status.
3. Review the list and reject any broad rewrite plan that does not start with one failing behavior test.
4. Invoke `/tdd` or have the agent follow the linked guide to write the first failing test for the highest-risk retry rule and capture the red result in the log.
5. Implement only enough production code to make that test pass, then repeat for the next retry rule.
6. After the retry suite is green, run a refactor pass that removes duplication without changing the behavior contract.
7. Review the red-green log and require evidence that each refactor happened after green, not before behavior was protected.

## Deliver

- Ordered retry-rule test list tied to the behavior contract.
- Red-green log showing failing test, minimal implementation, green result, and refactor step for each rule.
- Working invoice retry behavior in the starter.
- Evidence note with final checks, deferred rules, and any contract ambiguity.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Each implemented retry rule has a test that failed before the code change or a clear reason it could not be demonstrated.
- Production changes stay narrow until the corresponding test is green.
- Refactoring preserves retry delay, retry limit, permanent failure, manual retry, and status coverage.
- A fresh agent can continue the loop from the red-green log.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
