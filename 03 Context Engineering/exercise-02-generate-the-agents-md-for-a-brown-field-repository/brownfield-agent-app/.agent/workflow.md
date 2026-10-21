# Workflow

## Setup

Run `npm ci` once from `brownfield-agent-app/`. You need a Java 21 JDK,
Node.js, npm, and git on `PATH`. No Maven, no application server, no paid
API — everything compiles and runs through `javac`/`java` via the npm
scripts.

Compilation and test output are written to a temporary directory per run
and deleted afterwards (`scripts/run-java.mjs`) — don't expect build
artifacts to persist between commands, and don't add a `target/`- or
`build/`-style output directory of your own.

## Commands

- `npm run dev` — compile and run `Main` (demo of current case-listing
  behaviour).
- `npm test` — compile and run the existing-behaviour checks; must pass at
  all times.
- `npm run test:acceptance` — also run the checks for the requested,
  not-yet-implemented feature. See [testing.md](testing.md).
- `npm run verify:exercise` — the full gate used before submitting a
  change; run it before considering a change finished.

## Making a change

- Preserve existing public operation signatures and behaviour described in
  [../docs/maintenance-notes.md](../docs/maintenance-notes.md) — other
  integrations depend on case-list behaviour and on stored records being
  immutable.
- Keep behaviour changes and onboarding-documentation changes
  (`AGENTS.md`, `.agent/**`) in separate commits. A commit that changes
  guidance should contain only Markdown.
- Run `npm test`, then `npm run test:acceptance`, then
  `npm run verify:exercise` before treating a change as done.
