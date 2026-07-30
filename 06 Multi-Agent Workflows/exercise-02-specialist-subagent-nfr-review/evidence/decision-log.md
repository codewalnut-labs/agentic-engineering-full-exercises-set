# NFR Finding Decision Log

Date: 2026-07-30  
Accountable owner: integration/main thread

| Finding | Decision | Rationale and evidence |
|---|---|---|
| TEST-01: workflow unreachable | Fix | Mounted the existing workflow components from `App` and added a production-root region test. |
| TEST-04: stale ActionComposer draft | Fix | Reset draft state when `item.id` changes; component test covers rerender from item A to B. |
| TEST-05: test command checks only metadata | Fix | Added Vitest to `npm test` while retaining the metadata gate as `contract:check`. |
| A11Y-01: selection/async changes unannounced | Fix | Added `aria-pressed`, pending/complete status and `aria-busy` for save and evidence collection. Full arrow-key listbox behavior is unnecessary because controls remain native buttons. |
| A11Y-02: save failure silent | Fix | Catch rejection, preserve inputs, and render the error through `role="alert"`; tested with a rejected promise. |
| A11Y-03: disabled-save reason absent | Fix | Added visible helper text linked to the textarea through `aria-describedby`; tested below the threshold. |
| SEC-01: production security headers | Defer | Correct hosting-layer concern, but this repository has no deployment configuration. Owner: deployment platform. Trigger: before first hosted release. |
| TEST-02: shared fixture reference | Defer | Real test-isolation risk, but the selected integration keeps updates in component-owned state. Owner: service layer. Trigger: before adding service unit tests or a real backend. |
| TEST-03: browser-bound fixed delays | Defer | Real determinism issue outside the selected UI fixes. Owner: service layer. Trigger: when replacing the mock API or adding service tests. |
| PERF-01: route splitting | Dismiss | Measured entry bundle was 61.7 kB gzip; no evidence supports added splitting complexity. |
| PERF-02: memoize fixed small lists | Dismiss | Current list sizes are tiny; this is a micro-optimization without measurable benefit. |
| PERF-03: simulated waits affect initial load | Dismiss | The review confirmed the dormant service was absent from the original shipped entry. After mounting, waits affect only explicit actions and have visible pending state. Re-measure when a real API exists. |
| DIS-01/02/03 security hypotheses | Dismiss | React escaping, absence of a real mutation endpoint, and synthetic fixtures mean there is no current XSS, CSRF, or data-disclosure defect. |

## Residual risk

The mock service still uses shared fixtures and browser timers. Production
authorization, CSRF controls, record-level data minimization, and security
headers must be designed with the real backend and host.

## Accountable-owner post-recheck note

The accessibility specialist's first scoped recheck occurred before the final
evidence-status test was added. `ActionComposer.test.tsx` now covers rejected
saves, validation help, and selection changes; `EvidencePanel.test.tsx` covers
pending and completion announcements. The final integrated gate includes both.
