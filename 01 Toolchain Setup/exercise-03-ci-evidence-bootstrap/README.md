**Exercise 03**

# Agent Check Bootstrap

**Goal:** Turn a fragile manual setup into a repeatable agent-safe local gate with rules, hooks, allowed tools, and clear verification commands.

**Outcome:** The starter no longer depends on manual verification; CI can produce a reviewable evidence bundle.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/ci-plan.md`, `docs/evidence-map.md`, package scripts, and existing check scripts, then draft a local-to-CI gate map.
2. Review the map and remove any gate that cannot run from this starter or does not produce useful review evidence.
3. Have the agent wire `agent:check` so it orchestrates the smallest meaningful local gate for type, lint, test, and evidence collection.
4. Add or update evidence output so failures show command, status, and artifact path without dumping noisy logs into the repo.
5. Ask the agent to sketch the CI workflow that would run the same gate and upload the evidence bundle, while keeping secrets and generated folders out of scope.
6. Run a clean-context rehearsal where a new agent reads only the evidence map and explains which checks protect reviewers from trusting a vague green check.

## Deliver

- Working local `agent:check` gate for the starter.
- Evidence map updated with command purpose, artifact location, and reviewer value.
- CI workflow sketch or checked-in workflow file if the exercise asks for one.
- Evidence note with one passing run and one intentionally explained failure or limitation.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- `agent:check` runs the intended checks in a predictable order.
- Evidence artifacts are reviewable and stored outside generated dependency or build folders.
- The CI plan mirrors the local gate instead of inventing a separate path.
- A fresh agent can identify the gate, artifact path, and cleanup rules without extra chat context.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
