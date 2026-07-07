**Exercise 02**

# Context Cache Hygiene Challenge

**Goal:** Clean up stale instructions and oversized always-on context so future sessions stop rebilling irrelevant information.

**Outcome:** Always-on context becomes lean, versioned, and cheaper without losing necessary guidance.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/bloated-agents-file.md](./docs/bloated-agents-file.md)
- [docs/stale-context.md](./docs/stale-context.md)

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Audit oversized or stale agent instructions and split deep detail into linked references.
4. Implement a size/check script that fails when always-on context grows past the agreed budget.
5. Update starter rules so repeated corrections live in durable context.
6. Run a simulated agent handoff before and after cleanup.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Lean AGENTS/CLAUDE context plus linked references.
- Context-size or stale-reference check.
- Before/after handoff comparison.
- Evidence that starter checks still pass.

## Verify

Run at least:

```bash
cd "10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react" && npm test
cd "10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react" && npm run agent:check
```

Done when:
- context-size check
- stale command check
- handoff simulation
- cache-churn prevention note
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
