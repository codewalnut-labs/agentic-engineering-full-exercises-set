# Testing

There is no JUnit and no Maven/Gradle in this repository. Tests are plain
Java: `src/test/java/com/codewalnut/support/ContractChecks.java` is a
single class with a `main` method that runs assertions and prints `PASS`
or throws an `AssertionError`. `scripts/run-java.mjs` compiles
`src/main/java` and `src/test/java` together into a temporary directory
and runs it.

## Running checks

- `npm test` — compiles everything and runs `ContractChecks` with no
  arguments. This exercises only existing, already-implemented behaviour
  (case listing, workspace access, immutability). It must keep passing
  through any change.
- `npm run test:acceptance` — runs the same class with an `"acceptance"`
  argument, which also exercises the gated block of checks. That block is
  meant for behaviour that is still being implemented, and is expected to
  fail until it lands.
- `npm run dev` — compiles and runs `Main`, a small manual demo of case
  listing. Useful for a quick sanity check outside the test checks.

## Extending `ContractChecks`

- Build fixtures the same way the existing checks do: construct a
  `Repository` with explicit `CaseItem`/`Membership` values covering both
  an allowed case and a denied case, then assert on both.
- Reuse the existing `check(condition, message)` and
  `denied(runnable)` helpers instead of adding a new assertion style.
  `denied` expects a `SecurityException` — see
  [conventions.md](conventions.md).
- New checks for behaviour that isn't implemented yet belong inside the
  `args[0].equals("acceptance")` gated section, alongside the existing
  gated checks, so `npm test` keeps testing only what already works.
- Don't add a new test runner, framework, or file layout — everything
  runs through the one `ContractChecks.main` entry point.
