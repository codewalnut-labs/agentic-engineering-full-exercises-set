**Exercise 04**

# TDD Skill Red-Green Refactor

**Goal:** Use a TDD-style skill loop to implement invoice retry rules without letting the agent jump straight to a broad rewrite.

**Outcome:** Payment retry behavior is specified test-first, implemented one rule at a time, and refactored only after the suite proves behavior.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/behavior-contract.md](./docs/behavior-contract.md)
- [docs/red-green-log.md](./docs/red-green-log.md)

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `tdd`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Confirm the behavior contract and interfaces to test.
4. Write one failing test for the smallest rule.
5. Implement only enough code to pass.
6. Refactor after the test suite protects behavior.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Tests for retry scheduling and copy decisions.
- Working React retry state behavior.
- Refactor notes explaining protected behavior.
- Evidence log showing red, green, and refactor commands.

## Verify

Run at least:

```bash
cd "04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react" && npm test
cd "04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react" && npm run agent:check
```

Done when:
- Tests are written before each behavior change.
- Each red-green-refactor step is recorded with command evidence.
- Mocks are deterministic and cover network failure, expired card, recovery, and enterprise copy.
- Refactoring happens after behavior is green, not as a speculative rewrite.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
