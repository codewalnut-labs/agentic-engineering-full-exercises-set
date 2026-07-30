# Playwright Checkout Rescue Design

## Problem

The exercise contract describes a checkout workflow with cart, tax quote, and
payment authorization boundaries. The current application renders a static lab
dashboard instead, and the starter Playwright test targets work-queue elements
that are not mounted. The test therefore fails deterministically before it can
exercise the stated checkout behavior.

## Goal

Restore a minimal but realistic checkout workflow and make its browser coverage
reliable enough to detect regressions. The result must use user-facing
Playwright locators, deterministic boundary fixtures, web-first assertions,
parallel-safe tests, repeated-run verification, and preserved browser evidence.

## Scope

### In scope

- A single-page checkout containing:
  - a cart summary with a fixed merchandise subtotal;
  - labeled customer name, postal code, and card number inputs;
  - a tax quote obtained from a `/api/tax-quote` boundary;
  - payment authorization through `/api/payments/authorize`;
  - submitting, successful confirmation, and declined-payment states.
- Accessible names and live status messaging required for resilient locators.
- A Playwright fixture that installs fresh tax and payment routes for every
  test, records boundary calls per test, and exposes configurable payment
  outcomes without shared mutable state.
- Browser tests for successful checkout and declined payment.
- HTML reports, screenshots, video, and traces suitable as browser evidence.
- Repeated parallel verification and a concise Word review of the exercise.

### Out of scope

- A production backend, persistent orders, authentication, inventory, shipping,
  discounts, multiple products, or real payment processing.
- Retaining the unrelated lab-dashboard and dormant work-queue UI.
- Hiding failures with retries, fixed sleeps, or increased assertion timeouts.

## Architecture

`src/App.tsx` will own the small checkout state machine. It will call two
focused browser-side service functions from `src/services/checkoutApi.ts`:
`quoteTax(postalCode)` and `authorizePayment(request)`. These services use
`fetch`, reject non-success responses, and keep the browser flow real while
Playwright controls only the external boundaries.

`tests/e2e/fixtures/checkout.fixture.ts` will extend the Playwright base test.
Each test receives a new route configuration and request log, so payment state
cannot leak across workers or test cases. Route handlers will return stable JSON
for the tax quote and either an approved or declined authorization.

`tests/e2e/checkout.spec.ts` will interact exclusively through roles, labels,
and visible text. Assertions will wait for observable UI states and boundary
calls rather than elapsed time. The success test will prove the complete path
from form input through order confirmation; the decline test will prove error
recovery without mocking away the checkout UI.

## Checkout Flow

1. The shopper sees the cart item, subtotal, and checkout form.
2. Entering a postal code and choosing **Calculate tax** requests a tax quote.
3. The UI displays tax and total using the response values.
4. The shopper supplies name and card number and chooses **Place order**.
5. The button exposes a submitting state while payment authorization is
   pending.
6. Approved authorization replaces the form with a named order-confirmation
   region containing the returned order identifier and total.
7. Declined authorization keeps the form available and announces the returned
   reason in an alert.

## Error Handling

- Tax and payment service failures produce human-readable alerts.
- The order button remains disabled until a tax quote exists and required
  inputs are non-empty.
- A failed authorization clears only the transient submitting state; entered
  form values and the tax quote remain available for correction and retry.
- Unknown or malformed boundary responses are treated as failures rather than
  false success.

## Test Design

- **Successful checkout:** install approved payment routes, fill the form,
  calculate tax, assert the quoted values, place the order, assert confirmation,
  and verify the tax and payment request bodies captured by the fixture.
- **Declined payment:** install a declined payment route, calculate tax, submit,
  assert the alert text, assert the form remains usable, and verify exactly one
  authorization attempt.
- Selectors must not use CSS classes, DOM traversal, element indexes, or test
  IDs when an accessible role or label is available.
- Tests must not use `waitForTimeout`, manual polling, or suite-level shared
  mutable state.
- The configured test run must be parallel-safe and pass under repeated
  execution.

## Evidence and Verification

- Configure Playwright to preserve an HTML report, screenshots, video, and
  traces for the evidence run.
- Run the focused E2E suite first, followed by a repeated parallel run.
- Run repository lint, agent checks, formatting, typecheck, and build.
- Preserve a final passing console transcript, the HTML report, one success-path
  screenshot, and trace archives in an ignored local evidence directory.
- The DOCX review will summarize the defect, implemented rescue, verification
  results, audience fit, and concrete exercise improvements. It will be rendered
  to PNG pages and visually inspected before delivery.

## Acceptance Criteria

- Both checkout scenarios pass without sleeps or brittle selectors.
- Tax and payment fixtures are fresh for each test and safe across workers.
- Successful and declined payment paths assert user-visible outcomes and
  captured boundary requests.
- A repeated parallel run completes with zero failures.
- Browser evidence can be opened locally after the run.
- The complete repository check succeeds.
- The final DOCX review is concise, technically accurate, and visually clean.
- The branch contains a reviewable commit series and a PR description; a remote
  PR is opened only when authenticated repository permissions allow it.
