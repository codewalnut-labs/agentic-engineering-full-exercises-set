---
name: migration-playbook-skill
description: Plan and execute small, behavior-preserving JavaScript or TypeScript migrations with jscodeshift. Use for legacy React or legacy JSX component upgrades, repeatable codemods, migration inventories, characterization tests, dry runs, idempotence checks, batch stop conditions, and reviewer-facing before/after evidence.
---

# Migration Playbook Skill

## Workflow

1. Read `references/migration-phases.md`.
2. Inventory the target files, owners, public APIs, interaction behavior, and
   shared dependencies. Define the batch and stop condition before editing.
3. Add characterization coverage and input/output fixtures.
4. Run the transform against fixtures, then confirm it is idempotent.
5. Run jscodeshift in dry mode on the batch and inspect the proposed diff.
6. Apply only the approved slice. Never expand into shared foundations, public
   API changes, routing, or global styling without explicit ownership.
7. Run behavior tests, typecheck, build, and the codemod tests.
8. Record changed files, preserved behavior, intentional changes, command
   output, and the next safe slice.

## Commands

For the included readonly-props slice, run from `migration-playbook-app/`:

```sh
npm run migration:page-header:dry
npm run migration:page-header
npm run agent:check
```

## Output Contract

- Component boundary, owner, batch size, and stop condition.
- Preserved behaviors and intentional changes.
- Codemod fixture, idempotence, and behavior-test results.
- Applied diff plus the next safe slice.
