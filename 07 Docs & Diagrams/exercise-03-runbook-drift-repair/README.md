**Exercise 03**

# Runbook Drift Repair

**Goal:** Update stale support docs and diagrams after verifying how the current app actually handles incidents.

**Outcome:** A stale runbook is repaired by changing code, checks, and docs together.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/incident-flow-notes.md](./docs/incident-flow-notes.md)
- [docs/stale-runbook.md](./docs/stale-runbook.md)

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Compare the runbook against actual incident handling code and current app behavior.
4. Fix drift in code, scripts, or docs where the current behavior is wrong or unclear.
5. Add an incident smoke test or scripted reproduction.
6. Update diagrams only after the verified behavior is known.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Runbook update grounded in actual code behavior.
- Code/config fixes for discovered drift where needed.
- Incident smoke test or reproduction script.
- Verification evidence for the support path.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react" && npm run agent:check
```

Done when:
- runbook command smoke
- incident reproduction script
- diagram drift check
- support handoff review
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
