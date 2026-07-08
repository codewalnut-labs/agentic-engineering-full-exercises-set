**Exercise 03**

# Migration Playbook Skill

**Goal:** Create a migration playbook skill and use it to convert one legacy starter component into a typed React module with preserved behavior.

**Outcome:** The skill guides characterization, migration, testing, and review for one real component, then proves when it should not trigger.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/legacy-component-map.md`, `docs/migration-notes.md`, and the target legacy component, then extract the repeated migration recipe.
2. Review the recipe and require it to preserve props, user-visible behavior, accessibility labels, error states, and tests before cleanup.
3. Package a migration playbook skill with trigger criteria, non-trigger cases, prerequisites, step order, rollback hint, and review checklist.
4. Use the skill to migrate one real starter component to a typed React module.
5. Add or update focused tests or smoke evidence for the migrated component.
6. Record where the skill prevented over-broad refactors or missing behavior checks.
7. Run a negative trigger case where the task is only a tiny bugfix and confirm the migration skill should not run.

## Deliver

- Migration playbook skill with when-to-use and when-not-to-use guidance.
- One migrated typed React component with preserved public props and behavior.
- Focused tests or smoke evidence for the migrated component.
- Evidence note covering skipped refactors, rollback path, final command output, and negative trigger case.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill orders characterization, migration, tests, and review before optional cleanup.
- The migrated component keeps public props and user-visible behavior intact.
- Negative trigger guidance prevents using the skill for unrelated tiny edits.
- A fresh agent can apply the playbook to the next component without reading the original chat.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
