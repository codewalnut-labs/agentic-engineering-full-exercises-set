**Exercise 01**

# PR Evidence Pack Automation

**Goal:** Create a PR evidence pack that automatically gathers test output, build proof, screenshots, and residual risks.

**Outcome:** A PR can explain itself with automated proof instead of reviewer guesswork.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/evidence-fixtures.md](./docs/evidence-fixtures.md)
- [docs/pr-brief.md](./docs/pr-brief.md)

From the repository root, open the main starter:

```bash
cd "08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- [GitHub Actions artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [GitHub pull request docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/pr-brief.md`, `docs/evidence-fixtures.md`, and package scripts, then map which evidence a reviewer needs before reading the diff.
2. Review the evidence map and remove noisy artifacts that do not prove behavior, risk, or rollback readiness.
3. Have the agent implement an evidence pack script or template that gathers command results, screenshots or smoke notes, changed behavior, and residual risks.
4. Make the evidence paths deterministic and keep generated outputs out of source control unless the exercise explicitly asks for checked-in fixtures.
5. Ask the agent to fill a PR summary from the generated evidence and cite artifacts by path.
6. Run a clean-context review where a new agent reads only the evidence pack and decides what still needs reviewer attention.

## Deliver

- Evidence pack script, template, or generated sample for the PR.
- PR summary with intent, changed behavior, checks, artifacts, risks, and rollback note.
- Artifact path map showing what is generated and what is committed.
- Evidence note showing one complete evidence-pack run.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The evidence pack helps reviewers judge behavior, risk, and verification without rerunning every step first.
- Artifacts have stable paths and do not include dependency folders, build outputs, secrets, or local logs.
- The PR summary points to concrete evidence rather than claiming that checks passed.
- A fresh agent can identify missing evidence from the pack alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
