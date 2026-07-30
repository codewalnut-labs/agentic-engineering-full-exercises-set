# Playwright Checkout Rescue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken starter dashboard/test pair with a minimal checkout and deterministic, resilient Playwright coverage backed by browser evidence.

**Architecture:** A React page owns the checkout state and calls two small fetch services for tax and authorization. A custom Playwright fixture intercepts those external boundaries per test while the tests exercise the real browser UI through accessible roles and labels.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Playwright Test 1.56, Python/docx for the final review artifact.

## Global Constraints

- Keep the implementation limited to cart, tax quote, payment authorization, confirmation, and decline recovery.
- Do not use fixed sleeps, CSS selectors, DOM traversal, test IDs, or suite-level mutable mock state.
- Mock only `/api/tax-quote` and `/api/payments/authorize`; keep checkout behavior in the real browser application.
- Preserve HTML report, screenshots, video, and traces for the final evidence run.
- Do not add new npm dependencies.

---

### Task 1: Successful Checkout Contract

**Files:**
- Delete: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/tests/e2e/checkout.flaky.spec.ts`
- Create: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/tests/e2e/checkout.spec.ts`
- Create: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/tests/e2e/fixtures/checkout.fixture.ts`
- Create: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/src/services/checkoutApi.ts`
- Replace: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/src/App.tsx`
- Modify: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/src/styles.css`

**Interfaces:**
- Produces: `test` fixture with `paymentOutcome: "approved" | "declined"` and isolated `boundaryCalls`.
- Produces: `quoteTax(postalCode: string): Promise<TaxQuote>`.
- Produces: `authorizePayment(request: PaymentRequest): Promise<PaymentResult>`.

- [ ] **Step 1: Install dependencies and browser, then record the broken baseline**

Run:

```powershell
npm install
npx playwright install chromium
npm run test:e2e -- --reporter=line
```

Expected: the starter test fails because `.queue-item` never appears in the rendered lab dashboard.

- [ ] **Step 2: Write the success-path fixture and failing browser test**

The fixture must install fresh `page.route` handlers inside each test, return
`{ postalCode, tax: 8, total: 108 }` for the tax request, return
`{ status: "approved", orderId: "ORDER-1042" }` for approved payment, and append
parsed request bodies to test-local `tax` and `payments` arrays.

The test must:

```ts
test("completes checkout after deterministic tax and payment boundaries", async ({
  page,
  boundaryCalls,
}) => {
await page.goto("/");
await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
await page.getByLabel("Full name").fill("Maya Chen");
await page.getByLabel("Postal code").fill("10001");
await page.getByLabel("Card number").fill("4242 4242 4242 4242");
await page.getByRole("button", { name: "Calculate tax" }).click();
await expect(page.getByText("Tax $8.00")).toBeVisible();
await expect(page.getByText("Total $108.00")).toBeVisible();
await page.getByRole("button", { name: "Place order" }).click();
await expect(page.getByRole("region", { name: "Order confirmation" })).toContainText("ORDER-1042");
expect(boundaryCalls.tax).toEqual([{ postalCode: "10001" }]);
expect(boundaryCalls.payments).toEqual([
  {
    amount: 108,
    cardNumber: "4242 4242 4242 4242",
    customerName: "Maya Chen",
  },
]);
});
```

It must also assert literal tax and payment payloads captured by the fixture.
This test catches missing accessible controls, incorrect totals, wrong request
payloads, and missing approved-order state.

- [ ] **Step 3: Run the success test to verify RED**

Run:

```powershell
npx playwright test -g "completes checkout" --reporter=line
```

Expected: fail because the page has no `Checkout` heading.

- [ ] **Step 4: Implement the minimal checkout and services**

Create typed tax and payment fetch services that send JSON, validate
`response.ok`, validate the response discriminant/number fields, and throw
human-readable errors. Replace the dashboard with a semantic checkout page
containing the named controls and state transitions required by the test.
Keep the subtotal literal at `100`, format currency with `Intl.NumberFormat`,
and leave payment disabled until a quote and all fields exist.

Use these service contracts:

```ts
export interface TaxQuote {
  postalCode: string;
  tax: number;
  total: number;
}

export interface PaymentRequest {
  amount: number;
  cardNumber: string;
  customerName: string;
}

export type PaymentResult =
  | { status: "approved"; orderId: string }
  | { status: "declined"; reason: string };

export function quoteTax(postalCode: string): Promise<TaxQuote>;
export function authorizePayment(request: PaymentRequest): Promise<PaymentResult>;
```

- [ ] **Step 5: Run the success test to verify GREEN**

Run:

```powershell
npx playwright test -g "completes checkout" --reporter=line
```

Expected: `1 passed`.

- [ ] **Step 6: Commit the approved checkout flow**

```powershell
git add --sparse "04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app"
git commit -m "feat: restore deterministic checkout flow"
```

---

### Task 2: Declined Payment Recovery

**Files:**
- Modify: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/tests/e2e/checkout.spec.ts`
- Modify: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/tests/e2e/fixtures/checkout.fixture.ts`
- Modify: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/src/App.tsx`

**Interfaces:**
- Consumes: `test.use({ paymentOutcome: "declined" })`.
- Consumes: a declined fixture response `{ status: "declined", reason: "Card was declined" }`.

- [ ] **Step 1: Add the declined-payment browser test**

Fill the same checkout form, calculate tax, submit with the declined fixture,
then assert:

```ts
test.describe("declined payment", () => {
  test.use({ paymentOutcome: "declined" });

  test("keeps checkout available after payment is declined", async ({
    page,
    boundaryCalls,
  }) => {
    await page.goto("/");
    await page.getByLabel("Full name").fill("Maya Chen");
    await page.getByLabel("Postal code").fill("10001");
    await page.getByLabel("Card number").fill("4000 0000 0000 0002");
    await page.getByRole("button", { name: "Calculate tax" }).click();
    await expect(page.getByText("Total $108.00")).toBeVisible();
    await page.getByRole("button", { name: "Place order" }).click();
await expect(page.getByRole("alert")).toHaveText("Card was declined");
await expect(page.getByRole("button", { name: "Place order" })).toBeEnabled();
await expect(page.getByLabel("Card number")).toHaveValue("4000 0000 0000 0002");
expect(boundaryCalls.payments).toHaveLength(1);
  });
});
```

This catches false success, destructive error handling, stuck submitting state,
and leaked authorization attempts.

- [ ] **Step 2: Run the decline test to verify RED**

Run:

```powershell
npx playwright test -g "keeps checkout available" --reporter=line
```

Expected: fail because the UI does not yet announce the declined reason.

- [ ] **Step 3: Implement decline handling**

Handle the payment result discriminant in `App.tsx`: approved results create
confirmation; declined results set the returned reason in a role-alert while
preserving form state and clearing submission state.

```ts
const result = await authorizePayment({
  amount: quote.total,
  cardNumber,
  customerName,
});
if (result.status === "approved") {
  setConfirmation({ orderId: result.orderId, total: quote.total });
} else {
  setError(result.reason);
}
```

- [ ] **Step 4: Run both scenarios to verify GREEN**

Run:

```powershell
npx playwright test --reporter=line
```

Expected: `2 passed`.

- [ ] **Step 5: Commit decline recovery**

```powershell
git add --sparse "04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app"
git commit -m "test: cover declined checkout recovery"
```

---

### Task 3: Evidence Configuration and Verification

**Files:**
- Modify: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/playwright.config.ts`
- Create locally (ignored): `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/evidence/`

**Interfaces:**
- Produces: Playwright HTML report at `playwright-report/index.html`.
- Produces: per-test traces, screenshots, and video in `test-results/`.

- [ ] **Step 1: Configure evidence capture**

Set `fullyParallel: true`, `workers: 2`, dual `line` and `html` reporters,
`trace: "on"`, `screenshot: "on"`, and `video: "on"`. Keep retries disabled
locally so the evidence cannot hide a first-attempt failure.

- [ ] **Step 2: Run a repeated parallel evidence pass**

Run:

```powershell
npx playwright test --repeat-each=10 --workers=2
```

Expected: `20 passed`, with a generated HTML report and test-result artifacts.

- [ ] **Step 3: Run the complete repository gate**

Run:

```powershell
npm run agent:check
```

Expected: lint, agent check, formatting, typecheck, and production build all
exit successfully.

- [ ] **Step 4: Audit selectors and artifacts**

Run:

```powershell
rg -n "waitForTimeout|locator\\(|\\.queue-item|\\.detail-panel|nth\\(|first\\(" tests playwright.config.ts
Get-ChildItem -Recurse playwright-report,test-results
```

Expected: the selector audit has no matches in the new tests; report, trace,
screenshot, and video files are present.

- [ ] **Step 5: Commit evidence configuration**

```powershell
git add --sparse "04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/checkout-e2e-app/playwright.config.ts"
git commit -m "test: preserve checkout browser evidence"
```

---

### Task 4: Exercise Review and PR Readiness

**Files:**
- Create: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/Exercise_01_Playwright_Checkout_Rescue_Review.docx`
- Create: `04 Test Automation/exercise-01-playwright-mcp-checkout-rescue/PR_DESCRIPTION.md`

**Interfaces:**
- Consumes: exact test counts, command output, browser artifacts, and Git diff.
- Produces: a concise rendered review and a ready-to-submit PR narrative.

- [ ] **Step 1: Draft the concise review**

Use the `standard_business_brief` document preset. Cover the upstream mismatch,
the implemented rescue, verification evidence, suitability for juniors versus
seniors, and specific exercise improvements. Distinguish observed facts from
recommendations.

- [ ] **Step 2: Build and render the DOCX**

Use the bundled document runtime and `python-docx`, then run:

```powershell
python render_docx.py "<absolute-docx-path>" --output_dir "<qa-directory>" --emit_pdf
```

Inspect every page PNG at 100% zoom and revise until no clipping, overlap,
awkward breaks, or inconsistent spacing remains.

- [ ] **Step 3: Prepare and validate PR metadata**

Write `PR_DESCRIPTION.md` with summary, root cause, test plan, and evidence
locations. Run `git diff --check`, inspect `git status`, and commit the review
and PR description.

- [ ] **Step 4: Publish only if authorized**

Check `gh auth status` and repository push permissions. If authenticated, push
the branch and open a PR against `main`; otherwise provide the exact branch,
commit, and PR-ready instructions without claiming a remote PR exists.
