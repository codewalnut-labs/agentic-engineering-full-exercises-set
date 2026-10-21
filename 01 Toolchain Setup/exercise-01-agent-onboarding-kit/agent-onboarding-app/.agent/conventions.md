# Coding Conventions

These conventions describe the code that exists today. Follow them for focused
changes; do not introduce tooling solely to enforce them.

## TypeScript and Modules

- Use strict TypeScript and ES modules.
- Use double quotes and semicolons.
- Prefer `const`; use immutable transformations for collections.
- Use `import type` for type-only imports.
- Keep shared domain contracts in `src/types.ts`.
- Use interfaces for object-shaped domain contracts and union types for closed
  string vocabularies.
- Add explicit return types when they clarify a public helper, but follow the
  current inference style for small local functions.
- Do not add path aliases; imports are currently relative.
- Preserve case-sensitive file/import spelling.

## Naming

- React components and interfaces: `PascalCase`.
- Functions, variables, and object properties: `camelCase`.
- Component files: `PascalCase.tsx`; services and data files: `camelCase.ts`.
- Support-case IDs: `CASE-####`.
- Status, segment, and severity values: lowercase strings such as `mid-market`.
- Engineering teams and tags: lowercase hyphenated identifiers such as
  `support-platform` and `billing-export`.
- CSS classes: descriptive lowercase kebab-case, with simple descendant/state
  selectors where useful.

Do not normalize owner-team strings into support statuses. The mixed naming
reflects separate business vocabularies.

## React

- Use function components and hooks.
- Keep the root component as the default export; use named exports for reusable
  data and service functions.
- Keep derived lists out of JSX. Memoize meaningful derived work when its inputs
  are stable, as `visibleCases` currently does.
- Use stable domain keys (`item.id`) for rendered lists.
- Use semantic HTML and preserve accessibility labels and button types.
- Keep domain decisions in the service layer rather than embedding routing
  branches in event handlers or markup.
- React `StrictMode` is intentional; new code must tolerate development
  double-invocation behavior.

## Domain Services

- Keep routing functions deterministic and free of I/O.
- Pass domain data and policy into helpers instead of reading React state or the
  DOM.
- Preserve decision precedence and document deliberate changes to it.
- Clone before sorting; callers must retain ownership of their arrays.
- Keep boundary comparisons explicit. Current thresholds use `>=`.
- Prefer one policy source of truth. Until the existing mirror is deliberately
  refactored, keep it synchronized with exported configuration.

## Data

- Type exported fixtures explicitly (`QueuePolicy`, `SupportCase[]`).
- Keep sample cases realistic and representative of routing branches.
- When adding a policy branch, add or modify a sample case that demonstrates it.
- Store monetary risk as whole USD numbers and elapsed activity as hours.
- Keep summaries user-facing, concise, and ending with punctuation.

## CSS and UI Copy

- Use the existing global CSS structure; do not introduce CSS-in-JS or a design
  system incidentally.
- Reuse the current spacing, border, radius, and color vocabulary for small
  changes.
- Maintain responsive behavior through flexible layout and `auto-fit`.
- Keep user-facing policy text generated from policy values rather than
  hardcoding thresholds in JSX.
- Preserve readable labels for status, owner, severity, and action.

## Repository Scripts

- Custom checks are plain Node ES modules in `scripts/`.
- Use `node:` prefixes for built-in modules.
- Accumulate validation failures and exit once with status `1`.
- Print a concise success message on completion.
- Resolve repository paths from `process.cwd()` and therefore document that
  scripts run from the app root.

## Documentation

- Use repository paths and exact package command names.
- Separate verified behavior from recommendations or known gaps.
- Update architecture, workflow, testing, or convention docs when a code change
  invalidates them.
- Avoid generic agent advice; every rule should connect to a file, command,
  behavior, or risk in this repository.
