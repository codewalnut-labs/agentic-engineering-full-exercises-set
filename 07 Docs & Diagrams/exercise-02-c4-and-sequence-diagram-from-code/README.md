**Exercise 02**

# C4 and Sequence Diagram From Code

**Goal:** Generate a C4-style component diagram and a sequence diagram for the starter feature directly from traced code paths.

**Outcome:** The diagrams show the real UI, state, service, data transformation, success path, and error path, with a trace table tying every node to code.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [C4 model](https://c4model.com/)
- [Mermaid sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to trace the requested feature from UI action through state, service calls, data transformation, and error handling before drawing anything.
2. Review the trace and require each diagram node to map to a real component, module, service, or external actor.
3. Create a C4-style component view from `docs/diagram-request.md` and `docs/mermaid-starter.md`.
4. Create a sequence diagram for the main success path and at least one error or retry branch, keeping labels close to code names.
5. Add a trace table linking diagram elements and arrows to files, functions, tests, or observed UI behavior.
6. Run a diagram syntax check or render check where possible.
7. Run a clean-context verification where a new agent compares the diagrams to the code and reports drift before editing.

## Deliver

- C4-style diagram source for the feature boundary.
- Sequence diagram source for success and error or retry flow.
- Trace table mapping nodes and arrows to files, functions, tests, or UI behavior.
- Evidence note listing drift found, fixes made, and final diagram/check output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every diagram element corresponds to a real code artifact or external actor.
- The sequence diagram includes an error or retry path, not only the happy path.
- The trace table makes the diagrams reviewable without rereading the whole codebase.
- A fresh agent can identify a diagram-code mismatch if one is introduced.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
