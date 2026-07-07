**Exercise 02**

# Release Notes Skill Factory

**Goal:** Turn a messy release-note prompt into a reusable skill that reads changes, groups them, and flags missing evidence.

**Outcome:** Release-note generation becomes a repeatable workflow backed by parsing, grouping, and evidence checks.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/changelog-fixtures.md](./docs/changelog-fixtures.md)
- [docs/release-prompt-history.md](./docs/release-prompt-history.md)

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a release-notes skill that reads commit/change fixtures and groups work by customer impact.
4. Build or wire a parser script so deterministic extraction is not spent on expensive model turns.
5. Add snapshot or fixture tests for grouping, missing evidence, and breaking-change detection.
6. Run the skill on the provided release data and refine it from failures.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Release-notes skill and reference files.
- Parser or helper script with tests.
- Generated release notes from the fixture set.
- Eval evidence showing improvements after refinement.

## Verify

Run at least:

```bash
cd "05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react" && npm test
cd "05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react" && npm run agent:check
```

Done when:
- parser fixture test
- snapshot output
- missing evidence check
- skill trigger eval
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
