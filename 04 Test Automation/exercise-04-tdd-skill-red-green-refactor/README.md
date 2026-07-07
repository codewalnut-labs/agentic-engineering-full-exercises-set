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
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Tests for retry scheduling and copy decisions.
- Working React retry state behavior.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Tests are written before each behavior change.
- Each red-green-refactor step is recorded with command evidence.
- Mocks are deterministic and cover network failure, expired card, recovery, and enterprise copy.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
