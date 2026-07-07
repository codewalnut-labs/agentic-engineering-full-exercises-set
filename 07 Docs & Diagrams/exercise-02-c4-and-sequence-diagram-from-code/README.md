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
- [C4 model](https://c4model.com/)
- [Mermaid sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to trace the feature from UI action through state, service calls, data transformation, and error handling before drawing anything.
2. Review the trace and require each diagram node to map to a real component, module, service, or external actor.
3. Have the agent create a C4-style container or component view from `docs/diagram-request.md` and `docs/mermaid-starter.md`.
4. Create a sequence diagram for the main success path and at least one error branch, keeping labels close to code names.
5. Ask the agent to add a trace table linking diagram elements and arrows to files, functions, or tests.
6. Run a clean-context verification where a new agent compares the diagrams to the code and reports any drift before editing.

## Deliver

- C4-style diagram source for the feature boundary.
- Sequence diagram source for success and error flow.
- Trace table mapping nodes and arrows to files or functions.
- Evidence note listing drift found and fixed during verification.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every diagram element corresponds to a real code artifact or external actor.
- The sequence diagram includes an error or retry path, not only the happy path.
- The trace table makes the diagrams reviewable without rereading the whole codebase.
- A fresh agent can identify a diagram-code mismatch if one is introduced.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
