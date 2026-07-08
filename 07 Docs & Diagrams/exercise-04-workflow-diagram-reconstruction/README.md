**Exercise 04**

# Workflow Diagram Reconstruction

**Goal:** Reverse engineer the starter workflow and create a state-flow diagram plus sequence diagram that match the implementation.

**Outcome:** The diagrams are verified by a trace script, test, or checklist, and every label maps to code or UI behavior.

## Start Here

Starter folders:
- [starter-react](./starter-react)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-04-workflow-diagram-reconstruction/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Mermaid flowchart syntax](https://mermaid.js.org/syntax/flowchart.html)
- [Mermaid sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to reverse engineer the workflow from starter code by tracing user actions, state transitions, service calls, and rendered evidence panels.
2. Review the trace and remove guessed product intentions that are not visible in code or UI behavior.
3. Create a compact state-flow diagram and a sequence diagram for the main user action.
4. Write a trace script, test, or manual checklist that proves the diagram steps happen in the app.
5. Update diagram labels until they match actual file, function, state, or user-action names.
6. Run the trace evidence and record mismatches.
7. Run a clean-context diagram review where a new agent starts from the diagram and finds the corresponding code path.

## Deliver

- State-flow diagram source for the workflow.
- Sequence diagram source for the main user action.
- Trace script, test, or manual checklist proving the diagram path.
- Evidence note listing labels changed after code verification and final trace output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Diagram nodes map to actual files, functions, states, or user actions.
- The trace evidence proves the main path rather than describing it by hand.
- Any mismatch between diagram and code is fixed or recorded as residual risk.
- A fresh agent can navigate from diagram node to source file.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
