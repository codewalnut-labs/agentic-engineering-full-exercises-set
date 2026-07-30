# Migration Phases

1. Inventory: component boundary, props, states, accessibility, and owner.
2. Characterize: add tests for visible behavior and known oddities.
3. Convert: move to typed React without changing public behavior.
4. Verify: typecheck, tests, build, and review note.
5. Refine: update the skill when a missed case appears.

Stop when the next change touches shared foundations, public API shape, routing, or global styling without explicit ownership.

## Batch safety checklist

- Select explicit files rather than a broad source directory for the first run.
- Use the `tsx` parser for React TypeScript.
- Preserve comments and formatting through `toSource`.
- Include an unchanged fixture so unrelated components remain untouched.
- Apply the transform twice in tests; the second result must equal the first.
- Characterize visible text, native controls, ARIA labels, and keyboard behavior
  before applying the migration.
- Treat parse errors, unexpected file counts, or behavior-test failures as stop
  conditions.

