# MSW Case Dashboard Boundary Tests Design

## Problem

The exercise contract describes a network-backed case dashboard with loading,
empty, error, recovery, filtered, and successful states. The current application
renders a static lab-contract dashboard instead. Dormant work-queue components
exist, but they are not mounted, `fetchWorkItems()` reads an in-memory array
after a timer instead of crossing a network boundary, MSW is not installed, and
no dashboard component tests exist.

## Goal

Restore the smallest coherent case dashboard and prove its user-visible states
without mocking React state, the service module, or `fetch`. Component tests
must intercept the real HTTP boundary with MSW, remain isolated across tests,
and use accessible queries. A browser smoke must confirm the production page is
operable through role and label locators.

## Selected Approach

Implement a real `GET /api/cases` client boundary, a focused dashboard UI, a
shared MSW handler/server setup for Vitest, five state-oriented component tests,
and one Playwright smoke with route fulfillment.

This is preferred over:

1. Testing the dormant components in isolation, which would not exercise
   loading, network failure, retry, or the application data flow.
2. Adding component tests only, which would satisfy the README but omit the
   lab contract's browser role-locator verification gate.

## Scope

### In scope

- A network-backed case dashboard containing:
  - a named page heading;
  - a loading status while cases are requested;
  - a successful case queue;
  - a server-empty state;
  - a network-error alert with a retry button;
  - labeled search, priority, and status filters;
  - a no-filter-results state distinct from the server-empty state.
- `fetchCases(): Promise<WorkItem[]>` using `GET /api/cases`, response-status
  validation, and runtime array-shape validation.
- MSW v2 handlers using `http`, `HttpResponse`, and `setupServer`.
- Strict unhandled-request errors and handler reset after every test.
- Testing Library coverage for loading, successful, empty, error recovery, and
  filtered states through roles, labels, and visible text.
- One Playwright browser smoke that fulfills `/api/cases`, verifies the heading
  and queue, applies a labeled filter, and preserves trace/report evidence.
- Repeated component and browser runs plus repository verification.
- A concise DOCX exercise review and an upstream pull request.

### Out of scope

- A production backend, persistence, case editing, authentication, pagination,
  sorting, routing, or a browser MSW service worker.
- Mocking React hooks, the service module, `fetch`, or component internals.
- Retaining the unrelated lab-contract dashboard as the application home.
- Coverage-percentage tooling that does not improve the state contract.

## Architecture

### Network client

`src/services/caseApi.ts` will own the single HTTP boundary. It will request
`/api/cases`, reject non-success responses, validate that the payload is an
array of complete `WorkItem` records, and return the typed cases. Tests will run
this production client unchanged.

### Dashboard

`src/App.tsx` will own a small request-state model:

- `loading` before and during a request;
- `ready` with returned cases, including an empty array;
- `error` with a user-readable message and retry affordance.

Once data is ready, existing `FilterBar` and filtering utilities will provide
search, priority, and status behavior. The queue will render semantic list
items with case headings and metadata so component and browser tests can use
roles and accessible names instead of CSS selectors.

### MSW test boundary

`src/test/handlers.ts` will define the default successful `GET /api/cases`
handler and reusable case fixtures. `src/test/server.ts` will create the Node
MSW server. `src/test/setup.ts` will start it with
`onUnhandledRequest: "error"`, reset handlers after each test, close it after
the suite, and install jest-dom matchers.

Individual tests will override only the boundary condition they need:

- delayed successful response for loading;
- default successful cases;
- empty array;
- HTTP 500 followed by the default success handler for retry;
- default success followed by real user interaction with the filter controls.

### Browser smoke

`tests/e2e/case-dashboard.spec.ts` will use Playwright's network routing only for
the browser-level smoke. It will fulfill the same case payload, navigate to the
real Vite application, assert the dashboard and queue by role, choose a priority
through its label, and assert the visible filtered result. Component coverage
remains the authoritative MSW exercise; the smoke proves accessible browser
operability.

## Test Behaviors

1. **Loading:** delayed network response keeps a `status` named
   "Loading cases" visible before results arrive.
2. **Success:** default MSW response renders the case queue and known case
   names, with the loading status removed.
3. **Server empty:** an empty response renders "No cases available" and no
   queue.
4. **Error recovery:** a 500 response renders an alert and `Retry` button;
   replacing the handler and activating retry renders the successful queue.
5. **Filtered:** selecting `High` priority keeps high-priority cases visible,
   removes lower-priority cases, and reports the filtered count. A query with no
   matches renders "No cases match your filters."
6. **Browser smoke:** the page heading, case queue, and priority filter work
   through Playwright role/label locators with no fixed waits.

## Error Handling

- Non-2xx responses become a stable user-facing error message.
- Invalid JSON shapes are treated as request failures rather than empty data.
- Retry starts a fresh request and restores the loading status.
- Empty server data and zero filter matches use distinct messages.
- MSW fails tests on any unhandled request to expose accidental real-network
  coupling.

## Evidence and Verification

- Run the original baseline before changes and record the absence of component
  state tests.
- Watch each new behavior test fail before adding the production behavior it
  requires.
- Run the component suite repeatedly in isolated processes.
- Run the Playwright smoke repeatedly with trace, screenshot, video, and HTML
  report capture.
- Run lint, format, typecheck, build, and the repository agent check.
- Audit tests for direct `fetch` mocks, service-module mocks, CSS selectors,
  fixed waits, and unhandled MSW requests.
- Preserve console transcripts and browser artifacts in ignored local evidence
  directories.

## Acceptance Criteria

- Five component state tests pass through the real service and MSW boundary.
- The error state offers a tested retry path.
- MSW handlers reset after every test and reject unhandled traffic.
- Queries express visible behavior through roles, labels, and text.
- The browser smoke passes using role/label locators and auto-waiting
  assertions.
- Repeated component and browser runs complete with zero failures.
- The full repository verification gate succeeds.
- The DOCX review is technically accurate, rendered, visually inspected, and
  accessibility-audited.
- The branch is pushed to the contributor fork and an upstream PR is opened.
