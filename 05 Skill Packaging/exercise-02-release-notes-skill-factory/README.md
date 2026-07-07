**Exercise 02**

# Release Notes Skill Factory

**Goal:** Turn a messy release-note prompt into a reusable skill that reads changes, groups them, and flags missing evidence.

**Outcome:** Release-note generation becomes a repeatable workflow backed by parsing, grouping, and evidence checks.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/changelog-fixtures.md](./docs/changelog-fixtures.md)
- [docs/release-prompt-history.md](./docs/release-prompt-history.md)

From the repository root, open the main starter:

```bash
cd "05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Release-notes skill and reference files.
- Parser or helper script with tests.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Parser fixtures cover the release-note inputs.
- Snapshot or golden output shows the release notes are stable.
- missing evidence check
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
