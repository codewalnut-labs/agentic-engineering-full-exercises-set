**Exercise 02**

# C4 and Sequence Diagram From Code

**Goal:** Reverse engineer the feature and create C4-style and sequence diagrams that match the actual code paths.

**Outcome:** Diagrams are generated from real code paths and verified by a trace or test.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/diagram-request.md](./docs/diagram-request.md)
- [docs/mermaid-starter.md](./docs/mermaid-starter.md)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: workflow, architecture, source files, existing docs, drift risks, and diagram or doc outputs.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- C4 and sequence diagrams.
- Trace/test artifact validating diagram accuracy.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The diagram has a trace from code files to diagram nodes and flows.
- File references in the documentation point to real repo files.
- Error branches are shown and checked, not only the happy path.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
