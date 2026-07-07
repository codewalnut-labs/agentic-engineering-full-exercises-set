**Exercise 02**

# C4 and Sequence Diagram From Code

**Goal:** Reverse engineer the feature and create C4-style and sequence diagrams that match the actual code paths.

**Outcome:** Diagrams are generated from real code paths and verified by a trace or test.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/diagram-request.md](./docs/diagram-request.md)
- [docs/mermaid-starter.md](./docs/mermaid-starter.md)

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Trace the feature from UI event through state, service, and persistence/mock boundaries.
4. Create C4-style and sequence diagrams from that trace.
5. Add a small script, test, or trace artifact that proves diagram steps still exist in code.
6. Fix any diagram-code mismatch you discover.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- C4 and sequence diagrams.
- Trace/test artifact validating diagram accuracy.
- Any code or docs fixes needed to remove drift.
- Review note explaining verified and intentionally omitted paths.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react" && npm run agent:check
```

Done when:
- diagram step trace
- file-reference check
- error branch verification
- diagram drift test
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
