# MSW Case Dashboard Boundaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the network-backed case dashboard and prove loading, success, empty, error-retry, filtered, and browser-smoke behavior through isolated network boundaries.

**Architecture:** The React app calls one typed `GET /api/cases` service and owns a small loading/ready/error state model. Vitest renders the real app while a strict MSW Node server controls responses; Playwright separately fulfills the same boundary for one accessible browser smoke.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Vitest 3, Testing Library 16, MSW 2, Playwright Test, Python/docx.

## Global Constraints

- Do not mock React hooks, the case service module, or global `fetch`.
- MSW must fail on unhandled requests and reset runtime handlers after every test.
- Component and browser tests must use roles, labels, and visible text rather than CSS selectors or implementation state.
- Keep server-empty and zero-filter-results messages distinct.
- Preserve component transcripts and Playwright HTML, trace, screenshot, and video evidence locally without committing generated artifacts.

---

### Task 1: Loading and Successful Network States

**Files:**
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/package.json`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/vite.config.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/services/caseApi.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/test/caseFixtures.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/test/handlers.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/test/server.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/test/setup.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.test.tsx`
- Replace: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.tsx`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/styles.css`

**Interfaces:**
- Produces: `fetchCases(): Promise<WorkItem[]>`.
- Produces: `caseFixtures: WorkItem[]`.
- Produces: `successHandler` for `GET /api/cases`.
- Produces: `server` from `setupServer(successHandler)`.

- [ ] **Step 1: Install the test boundary dependencies**

Add `msw` and `@playwright/test` as development dependencies. Update scripts:

```json
{
  "test": "vitest run",
  "test:component": "vitest run",
  "test:e2e": "playwright test",
  "test:contract": "node ./scripts/agent-check.mjs",
  "agent:check": "npm run lint && npm run test:contract && npm run test:component && npm run format && npm run typecheck && npm run build"
}
```

Configure Vitest in `vite.config.ts` with `environment: "jsdom"` and
`setupFiles: "./src/test/setup.ts"`.

- [ ] **Step 2: Create the strict MSW test boundary**

Use the official Vitest/MSW lifecycle:

```ts
// src/test/handlers.ts
export const successHandler = http.get("/api/cases", () =>
  HttpResponse.json(caseFixtures),
);

// src/test/server.ts
export const server = setupServer(successHandler);

// src/test/setup.ts
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

The case fixtures must be complete `WorkItem` literals and must include at least
one `High` and one `Low` priority case.

- [ ] **Step 3: Write loading and success tests**

```tsx
test("shows loading status until the case response arrives", async () => {
  server.use(
    http.get("/api/cases", async () => {
      await delay(80);
      return HttpResponse.json(caseFixtures);
    }),
  );
  render(<App />);
  expect(screen.getByRole("status", { name: "Loading cases" })).toBeVisible();
  expect(await screen.findByRole("region", { name: "Case queue" })).toBeVisible();
});

test("renders cases returned by the network boundary", async () => {
  render(<App />);
  expect(await screen.findByRole("heading", { name: "Atlas Co" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Cedar Labs" })).toBeVisible();
  expect(screen.queryByRole("status", { name: "Loading cases" })).not.toBeInTheDocument();
});
```

These tests catch missing loading feedback, bypassed network data, and missing
semantic queue/case structure.

- [ ] **Step 4: Run the focused tests to verify RED**

Run:

```powershell
npx vitest run src/App.test.tsx -t "loading|returned by the network"
```

Expected: fail because the static contract dashboard has no loading status or
case queue.

- [ ] **Step 5: Implement the minimal network client and dashboard**

Use this client contract:

```ts
export async function fetchCases(): Promise<WorkItem[]> {
  const response = await fetch("/api/cases");
  if (!response.ok) throw new Error(`Case request failed with ${response.status}`);
  const payload: unknown = await response.json();
  if (!isWorkItemArray(payload)) throw new Error("Case response was invalid");
  return payload;
}
```

`App` must request cases in an effect, expose a named loading `status`, render a
`region` named `Case queue`, and give each case name a heading. The first green
implementation may show a stable error message when the request rejects, but it
must not add retry or filtering before those behaviors have failing tests.

- [ ] **Step 6: Run the focused tests to verify GREEN**

Run:

```powershell
npx vitest run src/App.test.tsx -t "loading|returned by the network"
```

Expected: `2 passed`.

- [ ] **Step 7: Commit the network-backed success path**

```powershell
git add "04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app"
git commit -m "feat: restore network-backed case dashboard"
```

---

### Task 2: Empty and Filtered States

**Files:**
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.test.tsx`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.tsx`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/styles.css`

**Interfaces:**
- Consumes: `server`, `caseFixtures`, existing `FilterBar`, `defaultFilters`,
  and `filterItems`.

- [ ] **Step 1: Add server-empty and filtered-state tests**

```tsx
test("shows a server-empty state without rendering a case queue", async () => {
  server.use(http.get("/api/cases", () => HttpResponse.json([])));
  render(<App />);
  expect(await screen.findByText("No cases available")).toBeVisible();
  expect(screen.queryByRole("region", { name: "Case queue" })).not.toBeInTheDocument();
});

test("filters visible cases through labeled controls", async () => {
  const user = userEvent.setup();
  render(<App />);
  await screen.findByRole("heading", { name: "Atlas Co" });
  await user.selectOptions(screen.getByLabelText("Priority"), "High");
  expect(screen.getByRole("heading", { name: "Atlas Co" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "Cedar Labs" })).not.toBeInTheDocument();
  await user.type(screen.getByLabelText("Search"), "no matching case");
  expect(screen.getByText("No cases match your filters")).toBeVisible();
});
```

- [ ] **Step 2: Run the two tests to verify RED**

Run:

```powershell
npx vitest run src/App.test.tsx -t "server-empty|filters visible"
```

Expected: fail because the first green dashboard has no empty message or filter
controls.

- [ ] **Step 3: Implement empty and filtered rendering**

Initialize `defaultFilters`, render the existing labeled `FilterBar`, derive
`visibleCases = filterItems(cases, filters)`, and branch explicitly:

```tsx
if (cases.length === 0) return <EmptyState>No cases available</EmptyState>;
if (visibleCases.length === 0) return <EmptyState>No cases match your filters</EmptyState>;
return <CaseQueue cases={visibleCases} />;
```

Use ordinary semantic JSX if no extraction is necessary; do not create a
component abstraction used only once.

- [ ] **Step 4: Run the full component file to verify GREEN**

Run:

```powershell
npx vitest run src/App.test.tsx
```

Expected: `4 passed`.

- [ ] **Step 5: Commit empty and filtered states**

```powershell
git add "04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src"
git commit -m "test: cover empty and filtered case states"
```

---

### Task 3: Error Recovery

**Files:**
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.test.tsx`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src/App.tsx`

**Interfaces:**
- Consumes: `server.use()` for per-test MSW overrides.
- Produces: an alert containing `Unable to load cases.` and a `Retry` button.

- [ ] **Step 1: Add the error-retry test**

```tsx
test("recovers from a network error when the user retries", async () => {
  const user = userEvent.setup();
  server.use(http.get("/api/cases", () => new HttpResponse(null, { status: 500 })));
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to load cases.");
  server.use(successHandler);
  await user.click(screen.getByRole("button", { name: "Retry" }));
  expect(screen.getByRole("status", { name: "Loading cases" })).toBeVisible();
  expect(await screen.findByRole("heading", { name: "Atlas Co" })).toBeVisible();
});
```

This catches missing recovery affordance, retry paths that do not issue a new
request, and stale error state.

- [ ] **Step 2: Run the recovery test to verify RED**

Run:

```powershell
npx vitest run src/App.test.tsx -t "recovers from a network error"
```

Expected: fail because the error state has no `Retry` button.

- [ ] **Step 3: Implement retry**

Extract the request operation into a stable function that sets loading, clears
the previous error, calls `fetchCases()`, and updates ready/error state. Use it
from the initial effect and the button:

```tsx
<div role="alert">
  <p>Unable to load cases.</p>
  <button type="button" onClick={loadCases}>Retry</button>
</div>
```

- [ ] **Step 4: Run all component tests to verify GREEN**

Run:

```powershell
npx vitest run src/App.test.tsx
```

Expected: `5 passed`.

- [ ] **Step 5: Commit recovery behavior**

```powershell
git add "04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/src"
git commit -m "test: prove case dashboard error recovery"
```

---

### Task 4: Role-Locator Browser Smoke

**Files:**
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/playwright.config.ts`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/tests/e2e/case-dashboard.spec.ts`
- Modify: `04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app/tsconfig.json`

**Interfaces:**
- Consumes: the real Vite app and `/api/cases`.
- Produces: HTML report, trace, screenshot, and video artifacts.

- [ ] **Step 1: Write the browser smoke**

```ts
test("loads and filters the case dashboard through accessible controls", async ({ page }) => {
  await page.route("**/api/cases", (route) =>
    route.fulfill({ status: 200, json: caseFixtures }),
  );
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Case dashboard" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Case queue" })).toBeVisible();
  await page.getByLabel("Priority").selectOption("High");
  await expect(page.getByRole("heading", { name: "Atlas Co" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cedar Labs" })).toBeHidden();
});
```

- [ ] **Step 2: Run the smoke to verify its pre-configuration failure**

Run:

```powershell
npm run test:e2e -- --reporter=line
```

Expected: fail because Playwright configuration/browser support is not yet
present.

- [ ] **Step 3: Add Playwright configuration**

Configure Chromium, two workers, local Vite web server, dual line/HTML reporters,
and always-on trace/screenshot/video for evidence. Keep retries at zero locally.
Include `tests` and `playwright.config.ts` in TypeScript.

- [ ] **Step 4: Install Chromium and verify GREEN**

Run:

```powershell
npx playwright install chromium
npm run test:e2e -- --reporter=line
```

Expected: `1 passed`.

- [ ] **Step 5: Commit the browser verification gate**

```powershell
git add "04 Test Automation/exercise-02-msw-component-network-boundaries/case-dashboard-app"
git commit -m "test: add case dashboard browser smoke"
```

---

### Task 5: Stability Evidence, Review, and PR

**Files:**
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/Exercise_02_MSW_Component_Network_Boundaries_Review.docx`
- Create: `04 Test Automation/exercise-02-msw-component-network-boundaries/PR_DESCRIPTION.md`

**Interfaces:**
- Consumes: final commands, test counts, browser artifacts, and Git diff.
- Produces: a concise rendered review and an upstream pull request.

- [ ] **Step 1: Run repeated component and browser verification**

Run the component file ten times in fresh processes, then run the browser smoke
ten times with two workers. Preserve console transcripts under an ignored
`evidence/` directory.

- [ ] **Step 2: Run the full repository gate and audits**

Run:

```powershell
npm run agent:check
rg -n "vi\\.mock|spyOn|globalThis\\.fetch|waitForTimeout|locator\\(|querySelector" src tests
```

Expected: all checks pass and the mock/selector audit has no matches in the new
state tests.

- [ ] **Step 3: Create and verify the DOCX review**

Use the document skill's `standard_business_brief` preset. Cover the upstream
mismatch, implementation evidence, junior/senior suitability, and concrete
exercise improvements. Render all pages, inspect them at 100%, run the
accessibility audit, and verify exact table geometry.

- [ ] **Step 4: Prepare PR metadata and commit**

Write a PR description with summary, root cause, state matrix, verification
commands, and local evidence paths. Commit the report and metadata after
`git diff --check`.

- [ ] **Step 5: Publish through the contributor fork**

Push `fix/msw-case-dashboard-boundaries` to the existing
`vaibhav-codewalnut` fork and open a PR against
`codewalnut-labs/agentic-engineering-full-exercises-set:main`. Verify the PR is
open before reporting its URL.
