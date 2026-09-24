# Setup and workflow

Use Node.js 22.12–24. Run `npm ci` in `case-dashboard-app/` before starting. The supplied smoke test should pass while the acceptance tests expose missing behavior.

Install the [TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) using `npx skills add mattpocock/skills --skill tdd` for your agent. Confirm that the agent can load it, including its linked references. Record the actual source commit, installed path, file hash, and invocation transcript in `evidence/tool-record.md`. The reviewed upstream revision is `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`; record differences if your installed version changes the workflow.

The agreed test boundary is the rendered dashboard plus `GET /api/cases`, intercepted with MSW. Confirm that boundary with the agent before writing tests. Expected behavior comes from the [network contract](./network-contract.md), not the implementation. The skill's broader architecture discussion is unnecessary unless this boundary is unclear.

Commit the starting exercise files, then run:

```text
npm run evidence:capture -- baseline
```

Complete three vertical slices, in order: loading, filtered-empty, retry. Put each learner-written regression in `src/learner/loading.test.tsx`, `src/learner/filtered-empty.test.tsx`, or `src/learner/retry.test.tsx`. The fixed locations let the capture run the same test at red and green; they do not prescribe how to implement it.

For each slice, commit its test while production behavior is unchanged, then run the corresponding red capture. After implementing just that behavior, commit and capture green:

```text
npm run evidence:capture -- red-1
npm run evidence:capture -- green-1
```

Repeat with `red-2`/`green-2` and `red-3`/`green-3`. Red must fail on the behavior assertion, not imports or setup. The matching test must be unchanged at green. Fix test infrastructure separately if necessary and record a new attempt. Complete a slice before writing the next regression. Add independent success, server-empty, and request-error tests under `src/learner/`.

Keep the weak test as a demonstration of inadequate coverage, but make its request setup compatible with strict MSW. Include Testing Library cleanup when resetting test state; Vitest does not expose global hooks in this starter. Do not change the protected acceptance tests. Commit the completed code, tests, and MSW setup, then run:

```text
npm run evidence:capture -- final
npm run verify:exercise
```

The final capture runs acceptance tests, the suite in three shuffled orders, and application quality checks. Capture attempts preserve stdout, stderr, exit codes, commit IDs, and file hashes. Later code edits invalidate final evidence. See the [evidence template](./evidence-template.md).

## Research basis

Reviewed 2026-09-24: the [TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) emphasizes public interfaces and one behavior per cycle. [Testing Library](https://testing-library.com/docs/guiding-principles/) guides observable UI assertions; [MSW resetHandlers](https://mswjs.io/docs/api/setup-server/reset-handlers/) explains removing runtime overrides between tests. Request counts here establish explicit retry and filtering requirements, rather than testing incidental network implementation.
