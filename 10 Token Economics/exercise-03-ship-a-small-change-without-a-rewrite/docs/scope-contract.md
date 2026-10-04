# Export change and scope contract

Required change: `buttonVariantFor("export")` returns `ds-secondary`.

Preserve the real consumers in `src/migration/actionButtons.mjs`:

- `checkout` returns `legacy-primary`.
- `delete` returns `legacy-danger`.
- Other legacy actions continue returning `legacy-primary`.

Before implementation, commit only `evidence/scope-plan.json` and `evidence/scope-plan.md`. Budget: two source files and 30 added-plus-deleted lines. Allowed paths, relative to the exercise, are `scope-budget-app/src/migration/exportButton.mjs` and `scope-budget-app/tests/export-button.test.mjs`. The helper's callers, components, styles, and packages are outside scope. No scope expansion is needed.

The budget covers the complete net diff from `planSha` to `sourceSha`, including the learner test. Multiple focused commits are allowed. Evidence is excluded from the source count, and subsequent commits contain evidence only.

If the diff uses more than 20 changed lines, `scope-budget.json` needs a concrete `lineJustification` explaining why the smaller implementation was insufficient. Do not compress readable tests merely to game the limit.

Changed lines and unchanged paths demonstrate scope control. They do not measure tokens, engineering time, or money saved. Any such measurement requires separate usage records and stated comparison conditions.
