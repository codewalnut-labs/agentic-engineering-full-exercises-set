**Exercise 02**

# Token-Budgeted Feature Delivery

**Goal:** Implement a small UI change while staying inside a strict context budget and documenting every file included.

**Outcome:** A feature ships under an explicit context budget, with the agent reading the right files and no more.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/long-architecture-notes.md](./docs/long-architecture-notes.md)
- [docs/token-budget-worksheet.md](./docs/token-budget-worksheet.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
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

- Working feature change in the starter.
- Focused tests for the feature.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The context file is small, relevant, and grounded in repository files.
- The repo map covers the files a fresh agent needs without dumping the whole repo.
- The requested feature behavior is covered by a focused check.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
