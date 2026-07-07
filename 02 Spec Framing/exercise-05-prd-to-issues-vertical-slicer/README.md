**Exercise 05**

# PRD to Issues Vertical Slicer

**Goal:** Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.

**Outcome:** A broad experiment idea becomes a PRD, dependency graph, and issue set that multiple agents can implement without stepping on each other.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/product-conversation.md](./docs/product-conversation.md)
- [docs/slice-board.md](./docs/slice-board.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `to-prd / to-issues`
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

- PRD draft tied to concrete examples.
- Issue board with dependency and ownership notes.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- PRD includes problem, users, success metric, constraints, non-goals, and examples.
- Issues are vertical slices with acceptance criteria and explicit dependencies.
- At least one issue ships a thin behavior across UI, state, analytics, and test evidence.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
