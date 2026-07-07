**Exercise 03**

# Migration Playbook Skill

**Goal:** Package a migration workflow for converting legacy components to typed React modules with tests and review notes.

**Outcome:** A migration recipe becomes a skill and proves itself by migrating a real starter component.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/legacy-component-map.md](./docs/legacy-component-map.md)
- [docs/migration-notes.md](./docs/migration-notes.md)

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Package the migration workflow as a focused skill with references for edge cases.
4. Apply the skill to convert a legacy component to typed React with tests.
5. Add an eval case for when the skill should not run.
6. Record the gaps discovered during real use and refine the skill.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Migration skill folder.
- A completed component migration in `starter-react`.
- Tests proving migrated behavior.
- Before/after skill eval notes.

## Verify

Run at least:

```bash
cd "05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react" && npm test
cd "05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react" && npm run agent:check
```

Done when:
- migration eval
- component behavior test
- trigger negative case
- before/after skill comparison
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
