**Exercise 01**

# ADR for Architecture Change

**Goal:** Write an ADR for moving workflow state out of React-only local state into a service boundary.

**Outcome:** An architecture decision is implemented, tested, and documented while context is fresh.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/adr-template.md](./docs/adr-template.md)
- [docs/architecture-change-brief.md](./docs/architecture-change-brief.md)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [ADR GitHub organization](https://adr.github.io/)
- [Documenting architecture decisions by Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/architecture-change-brief.md`, `docs/adr-template.md`, and the current workflow-state code to identify the decision pressure.
2. Review the options and force the agent to compare keeping local state, extracting a service boundary, and deferring the change.
3. Have the agent draft the ADR before implementation with context, decision, consequences, rejected options, and verification plan.
4. Implement the smallest service-boundary change that proves the decision without moving unrelated UI concerns.
5. Ask the agent to update the ADR after implementation with actual trade-offs, test evidence, and any decision drift.
6. Run a clean-context review where a new agent reads the ADR and identifies which future changes it permits or forbids.

## Deliver

- ADR following the provided template with real alternatives and consequences.
- Service-boundary implementation slice tied to the ADR.
- Tests or smoke evidence for the moved workflow state.
- Evidence note showing what changed between draft ADR and final ADR.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The ADR records why the decision was made, not only what changed.
- Rejected options are credible and include trade-offs.
- The implementation proves the chosen boundary with tests or smoke evidence.
- A fresh agent can use the ADR to avoid reopening the same decision accidentally.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
