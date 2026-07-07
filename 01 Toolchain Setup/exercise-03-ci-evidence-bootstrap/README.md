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
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: project purpose, domain behavior, important files, existing commands, risks, expected outputs, and likely files to change.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- CI workflow or `scripts/ci-check` that runs locally.
- Evidence artifact generator with real command output.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- agent:check
- rules command audit
- The hook simulator accepts safe changes and blocks the intended unsafe changes.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
