**Exercise 02**

# Release Notes Skill Factory

**Goal:** Build a release-notes skill that turns the supplied changelog fixtures into categorized release notes and flags items missing evidence.

**Outcome:** The skill produces golden release-note output for normal, missing-evidence, breaking-change, and no-user-facing-change cases.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/release-prompt-history.md` with `docs/changelog-fixtures.md`, then extract the repeatable release-note workflow.
2. Review the workflow and decide categories, required evidence, exclusion rules, and how missing evidence should be flagged.
3. Package a release-notes skill with trigger, inputs, grouping rules, unsupported cases, and output format.
4. Build or update a parser fixture that turns the supplied changelog data into categorized release notes.
5. Add snapshot or golden output for normal release, missing evidence, breaking change, and no-user-facing-change cases.
6. Run the harness and revise the skill if output groups or evidence flags are wrong.
7. Run a clean-context skill trial and ask the agent to explain which notes were excluded and why.

## Deliver

- Release-notes skill with clear trigger, categories, evidence rules, and exclusion rules.
- Parser or fixture harness for the changelog examples.
- Golden or snapshot release-note output for the required cases.
- Evidence note showing missing-evidence flags, excluded-change decisions, and final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Release notes separate user-facing changes, fixes, internal changes, and breaking changes.
- Items without evidence are flagged instead of confidently rewritten.
- Snapshot or golden output makes future skill changes reviewable.
- A fresh agent can run the skill on the fixtures and explain its grouping choices.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
