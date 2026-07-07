**Exercise 03**

# Migration Playbook Skill

**Goal:** Package a migration workflow for converting legacy components to typed React modules with tests and review notes.

**Outcome:** A migration recipe becomes a skill and proves itself by migrating a real starter component.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/legacy-component-map.md](./docs/legacy-component-map.md)
- [docs/migration-notes.md](./docs/migration-notes.md)

From the repository root, open the main starter:

```bash
cd "05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/legacy-component-map.md`, `docs/migration-notes.md`, and the starter component to extract the repeated migration recipe.
2. Review the recipe and require it to preserve props, behavior, accessibility labels, error states, and tests before it talks about cleanup.
3. Have the agent package a migration playbook skill with trigger criteria, prerequisites, step order, rollback hint, and review checklist.
4. Use the skill to migrate one real starter component to a typed React module with focused tests.
5. Ask the agent to record where the skill prevented over-broad refactors or missing behavior checks.
6. Run a negative trigger case where the task is only a tiny bugfix and confirm the migration skill should not run.

## Deliver

- Migration playbook skill with when-to-use and when-not-to-use guidance.
- One migrated typed React component with preserved behavior.
- Focused tests or smoke evidence for the migrated component.
- Evidence note covering skipped refactors, rollback path, and trigger negative case.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill orders characterization, migration, tests, and review before optional cleanup.
- The migrated component keeps the public props and user-visible behavior intact.
- Negative trigger guidance prevents using the skill for unrelated tiny edits.
- A fresh agent can apply the playbook to the next component without reading the original chat.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
