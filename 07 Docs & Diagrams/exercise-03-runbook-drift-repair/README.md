**Exercise 03**

# Runbook Drift Repair

**Goal:** Repair the stale incident runbook and flow diagram after verifying how the starter app currently handles incident escalation.

**Outcome:** The runbook, diagram, smoke checklist, and starter behavior describe the same incident path.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Google SRE incident management concepts](https://sre.google/sre-book/managing-incidents/)
- [Mermaid flowchart syntax](https://mermaid.js.org/syntax/flowchart.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/stale-runbook.md`, `docs/incident-flow-notes.md`, and the current incident-handling code for drift.
2. Review the drift report and classify each issue as wrong doc, wrong code, missing check, or outdated diagram.
3. Reproduce or simulate the incident escalation path described by the stale runbook before changing docs.
4. Fix the smallest code or check gap needed, then update the runbook steps and diagram to match observed behavior.
5. Add a runbook smoke script, checklist, or manual verification table for future drift checks.
6. Run the smoke or checklist and capture command/manual output.
7. Run a clean-context drill where a new agent follows the repaired runbook and records any unclear command or branch.

## Deliver

- Runbook updated from observed incident behavior, not memory.
- Flow diagram matching the repaired incident path.
- Smoke script, checklist, or manual verification table for the runbook.
- Evidence note showing reproduction, repair, final checks, and clean-context drill results.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every runbook command or action is current, executable, or clearly marked manual.
- The diagram and runbook describe the same incident path.
- At least one drift cause is fixed or guarded against for the next change.
- A fresh agent can follow the runbook without relying on the original stale notes.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
