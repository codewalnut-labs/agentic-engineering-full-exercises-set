# Exercise 02 verification evidence

## Covered UI states

| State | Network boundary | User-visible assertion |
| --- | --- | --- |
| Loading | Delayed `GET /api/cases` response | Named `status` is visible until the queue arrives |
| Success | Default MSW success handler | Atlas Co, Cedar Labs, and the case count render |
| Empty | Per-test MSW override returns `[]` | Server-empty message explains that no cases are assigned |
| Filtered | Success response followed by labeled controls | Priority filter removes Cedar Labs; no-match copy is distinct |
| Error and retry | Per-test MSW override returns `503` | Alert and Retry appear; a successful retry restores the queue |

The Node test server rejects unhandled requests, resets handler overrides after each
test, and closes after the suite.

## Verification

- `npm run agent:check`: passed lint, contract, 7 Vitest tests, format,
  typecheck, and production build.
- Component stability: 10 fresh Vitest processes passed.
- `npm run test:e2e -- --repeat-each=10 --workers=2`: 10/10 Chromium runs
  passed in 1.4 minutes.
- Selector audit: no fetch mocks, spies, timeout sleeps, CSS locators, or DOM
  query selectors in the added tests.

## Browser evidence

The role- and label-based browser smoke fulfills the API response at the network
boundary, loads the case queue, filters to High priority, and attaches a unique
screenshot to every test result. `browser/case-dashboard-filtered.png` is the
separately reviewed canonical image. Playwright tracing is enabled for every
browser run.
