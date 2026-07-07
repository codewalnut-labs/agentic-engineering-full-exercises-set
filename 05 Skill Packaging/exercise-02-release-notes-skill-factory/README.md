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
- [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/release-prompt-history.md` with `docs/changelog-fixtures.md` and identify the repeatable release-note workflow.
2. Review the workflow and decide how changes should be grouped, what evidence each item needs, and what should be flagged as missing.
3. Have the agent package a release-notes skill with inputs, grouping rules, unsupported cases, and output format.
4. Build or update a parser fixture that turns the supplied changelog data into categorized release notes.
5. Ask the agent to add snapshot or golden output for normal release, missing evidence, breaking change, and no-user-facing-change cases.
6. Run a clean-context skill trial and ask the agent to explain which notes were excluded and why.

## Deliver

- Release-notes skill with clear trigger and grouping rules.
- Parser or fixture harness for the changelog examples.
- Golden or snapshot release-note output.
- Evidence note showing missing-evidence flags and excluded-change decisions.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Release notes separate user-facing changes, fixes, internal changes, and breaking changes.
- Items without evidence are flagged instead of confidently rewritten.
- Snapshot or golden output makes future skill changes reviewable.
- A fresh agent can run the skill on the fixtures and explain its grouping choices.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
