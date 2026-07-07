**Exercise 03**

# Runbook Drift Repair

**Goal:** Update stale support docs and diagrams after verifying how the current app actually handles incidents.

**Outcome:** A stale runbook is repaired by changing code, checks, and docs together.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/incident-flow-notes.md](./docs/incident-flow-notes.md)
- [docs/stale-runbook.md](./docs/stale-runbook.md)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Google SRE incident management concepts](https://sre.google/sre-book/managing-incidents/)
- [Mermaid flowchart syntax](https://mermaid.js.org/syntax/flowchart.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/stale-runbook.md`, `docs/incident-flow-notes.md`, and current incident-handling code for drift.
2. Review the drift report and separate wrong docs, wrong code, missing checks, and outdated diagrams.
3. Have the agent reproduce or simulate the incident path described by the stale runbook before changing docs.
4. Fix the smallest code or check gap needed, then update the runbook steps and diagram to match the current behavior.
5. Ask the agent to add a runbook smoke script, checklist, or manual verification table for future drift checks.
6. Run a clean-context drill where a new agent follows the repaired runbook and records any unclear command or branch.

## Deliver

- Runbook updated from observed behavior, not memory.
- Diagram or flow update matching the repaired incident path.
- Smoke script, checklist, or manual verification table for the runbook.
- Evidence note showing reproduction, repair, and clean-context drill results.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every runbook command or action is current, executable, or clearly marked manual.
- The diagram and runbook describe the same incident path.
- At least one drift cause is fixed or guarded against for the next change.
- A fresh agent can follow the runbook without relying on the original stale notes.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
