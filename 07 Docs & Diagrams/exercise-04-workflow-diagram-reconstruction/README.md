**Exercise 04**

# Workflow Diagram Reconstruction

**Goal:** Reverse engineer the feature workflow in the starter app and create diagrams that match the implementation, not the intended story in your head.

**Outcome:** The diagram work produces verified system understanding, not decorative pictures.

## Start Here

Starter folders:
- [starter-react](./starter-react)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-04-workflow-diagram-reconstruction/starter-react"
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

- Sequence and flow diagram sources.
- Trace script/test output proving the diagram steps.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Diagram nodes map to actual files, functions, or user actions.
- The trace script/test proves the main workflow steps.
- Any diagram-code mismatch is fixed or called out as residual risk.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
