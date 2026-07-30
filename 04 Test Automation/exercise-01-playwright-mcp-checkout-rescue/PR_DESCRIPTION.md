## Summary

- replace the unrelated lab dashboard with a minimal checkout flow
- replace fixed sleeps and CSS selectors with role/label locators and web-first assertions
- isolate tax and payment boundaries in a fresh Playwright fixture for every test
- cover approved checkout and declined-payment recovery
- preserve HTML reports, traces, screenshots, and videos for browser evidence
- add a rendered Word review of the exercise and recommended improvements

## Root cause

The exercise contract described cart, tax quote, payment authorization, and
trace boundaries, but the shipped application rendered only a static
lab-contract dashboard. The starter test targeted an unmounted work-queue
component, so it failed deterministically while waiting for `.queue-item`
rather than exposing an intermittent checkout regression.

## Test plan

- `npx playwright test --reporter=line` — 2 passed
- `npx playwright test --repeat-each=10 --workers=2` — 20 passed in 40.2 seconds
- `npm run agent:check` — lint, agent check, format, typecheck, and build passed
- selector audit for fixed waits, CSS locators, and positional locators — 0 matches
- final evidence run produced 20 traces, 20 screenshots, and 20 videos

## Browser evidence

Generated locally under:

- `checkout-e2e-app/playwright-report/index.html`
- `checkout-e2e-app/test-results/**/trace.zip`
- `checkout-e2e-app/test-results/**/test-finished-1.png`
- `checkout-e2e-app/test-results/**/video.webm`
- `checkout-e2e-app/evidence/passing-run.txt`

These artifacts are intentionally ignored by Git. Attach the report or selected
artifacts to the PR if the review team requires persisted browser evidence.

## Review artifact

`Exercise_01_Playwright_Checkout_Rescue_Review.docx` contains the implementation
evidence, junior/senior suitability assessment, and recommended exercise
improvements.
