**Exercise 04**

# PR Diff Review

**Goal:** Review the supplied PR diff under a timebox, then verify findings against surrounding code before deciding what blocks merge.

**Outcome:** Timed review practice ends with fixed blockers and proof, not only comments.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [pr/review-target.diff](./pr/review-target.diff)

Fixture note: customer names, people, emails, internal notes, and URLs are fictional exercise data.

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-04-pr-diff-review/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: changed behavior, risky files, security concerns, accessibility concerns, tests, and likely blockers.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Code/test fix for the top blocker.
- Severity-ranked review findings.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every blocker is tied to concrete code behavior.
- The top blocker is fixed with a test or check.
- Non-blocking findings are explicitly deferred or dismissed with reasons.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
