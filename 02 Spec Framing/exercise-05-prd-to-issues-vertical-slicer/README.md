**Exercise 05**

# PRD to Issues Vertical Slicer

**Goal:** Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.

**Outcome:** A broad experiment idea becomes a PRD, dependency graph, and issue set that multiple agents can implement without stepping on each other.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/product-conversation.md](./docs/product-conversation.md)
- [docs/slice-board.md](./docs/slice-board.md)

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `to-prd / to-issues`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Extract product intent from the conversation before writing issues.
4. Inspect the starter to verify what modules already exist.
5. Create vertical slices that reveal integration risk early.
6. Implement one agent-ready issue and leave the rest ready for delegation.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- PRD draft tied to concrete examples.
- Issue board with dependency and ownership notes.
- Working React slice for one upgrade prompt path.
- Evidence that the implemented slice passes local gates.

## Verify

Run at least:

```bash
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react" && npm test
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react" && npm run agent:check
```

Done when:
- PRD includes problem, users, success metric, constraints, non-goals, and examples.
- Issues are vertical slices with acceptance criteria and explicit dependencies.
- At least one issue ships a thin behavior across UI, state, analytics, and test evidence.
- The board marks human-review and agent-ready tasks separately.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
