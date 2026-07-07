**Exercise 05**

# Codebase Graph to Diagrams

**Goal:** Convert a codebase graph snapshot into verified C4 and sequence diagrams, then use those diagrams to guide a safe change.

**Outcome:** Architecture diagrams are generated from actual code relationships and verified by implementing one small notification workflow change.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/diagram-requests.md](./docs/diagram-requests.md)
- [docs/graph-snapshot.md](./docs/graph-snapshot.md)

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `graphify to diagrams`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Start from the graph snapshot instead of freehand diagrams.
4. Verify edges against code before publishing diagrams.
5. Patch one notification behavior or docs drift.
6. Keep diagrams near the code they explain.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated C4-style diagram.
- Updated sequence diagram.
- Working React change or validation check.
- Evidence that diagrams match code paths.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react" && npm run agent:check
```

Done when:
- Diagrams cite graph nodes and code files they were verified against.
- At least one stale diagram edge is corrected.
- A notification behavior change uses the diagrams to identify the safe edit path.
- The final docs include residual diagram uncertainty.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
