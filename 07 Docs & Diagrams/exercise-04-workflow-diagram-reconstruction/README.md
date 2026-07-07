**Exercise 04**

# Workflow Diagram Reconstruction

**Goal:** Reverse engineer the feature workflow in the starter app and create diagrams that match the implementation, not the intended story in your head.

**Outcome:** The diagram work produces verified system understanding, not decorative pictures.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "07 Docs & Diagrams/exercise-04-workflow-diagram-reconstruction/starter-react"
npm install
npm run dev
```

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and click through the workflow before asking for diagrams.
2. Ask your coding agent for a short trace plan that names files, user actions, and expected diagram nodes.
3. Trace the workflow through code and user actions.
4. Generate sequence and flow diagram sources from that trace.
5. Add a small trace script or test that outputs the workflow steps used by the diagrams.
6. Correct either the code comments/docs or the diagrams when they disagree.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Sequence and flow diagram sources.
- Trace script/test output proving the diagram steps.
- Any drift fixes discovered during verification.
- Short evidence note linking diagram nodes to files.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-04-workflow-diagram-reconstruction/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-04-workflow-diagram-reconstruction/starter-react" && npm run agent:check
```

Done when:
- Diagram nodes map to actual files, functions, or user actions.
- The trace script/test proves the main workflow steps.
- Any diagram-code mismatch is fixed or called out as residual risk.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
