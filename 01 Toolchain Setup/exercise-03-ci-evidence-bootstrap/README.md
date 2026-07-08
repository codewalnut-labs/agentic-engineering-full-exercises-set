**Exercise 03**

# Agent Check Bootstrap

**Goal:** Add a real `agent:check` gate to `starter-react` that runs the local checks future agents must pass before claiming the exercise is complete.

**Outcome:** The starter has one reliable local verification command and an evidence map that could be mirrored by CI without inventing a second process.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/ci-plan.md](./docs/ci-plan.md)
- [docs/evidence-map.md](./docs/evidence-map.md)

From the repository root, open the main starter:

```bash
cd "01 Toolchain Setup/exercise-03-ci-evidence-bootstrap/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/ci-plan.md`, `docs/evidence-map.md`, `starter-react/package.json`, and existing scripts, then list the exact local checks this starter can run today.
2. Review the list and remove checks that are imaginary, too noisy, or not useful to a reviewer.
3. Have the agent wire `npm run agent:check` so it runs the smallest meaningful gate for this starter: type/build/test/lint or the closest available equivalents.
4. Add an evidence output path or evidence note template that records command, status, and artifact location without committing generated logs.
5. Update `docs/evidence-map.md` so reviewers know what each check proves and what it does not prove.
6. Sketch or update a CI workflow that calls the same `agent:check` command and uploads only useful artifacts.
7. Run a clean-context rehearsal where a new agent reads the evidence map and explains why `agent:check` is the required gate.

## Deliver

- Working `npm run agent:check` script in `starter-react`.
- Evidence map with command purpose, artifact location, reviewer value, and known blind spots.
- CI workflow sketch or workflow file that reuses `agent:check`.
- Evidence note with the final command output and any check intentionally left out.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- `npm run agent:check` runs the intended checks in a predictable order.
- The evidence map explains what each check proves and where evidence lives.
- Generated artifacts are not committed.
- The CI plan mirrors the local gate instead of inventing a separate path.
- A fresh agent can identify the gate, artifact path, cleanup rules, and remaining blind spots without extra chat context.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
