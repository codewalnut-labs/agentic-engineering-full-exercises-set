**Exercise 04**

# Ponytail Minimal-Diff Budget

**Goal:** Practice Ponytail, an external minimal-diff ladder skill, by finishing a design-system migration slice with the smallest safe diff.

**Outcome:** A migration task ships with less new code, less context churn, and no hidden loss of validation, accessibility, or error handling.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/ponytail-ladder-ledger.md](./docs/ponytail-ladder-ledger.md)
- [docs/session-transcript.md](./docs/session-transcript.md)

From the repository root, open the main starter:

```bash
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Ponytail minimal-diff ladder`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- [Ponytail skill](https://github.com/DietrichGebert/ponytail) - use its ladder to try skip, reuse, platform, dependency, and new-code options in that order.

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Ponytail ladder ledger with accepted and rejected rungs.
- Working React migration slice.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Ladder ledger proves skip/reuse/platform/dependency options were considered before new code.
- Final diff changes fewer files than the overbuilt starter plan while preserving required behavior.
- Safety exceptions are explicit for validation, accessibility, error handling, and data-loss protection.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
