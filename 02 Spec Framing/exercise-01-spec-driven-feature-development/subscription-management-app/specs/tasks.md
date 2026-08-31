# Tasks: Self-Service Subscription Management

**Input**: Design documents from `specs/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/subscription-management.openapi.yaml`, `quickstart.md`

**Tests**: Required by the project constitution. Write each story's tests first
and confirm they fail for the expected missing behavior before implementation.

**Organization**: Tasks are grouped by user story so each increment is
independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it changes different files and has no
  dependency on an incomplete task.
- **[Story]**: Maps the task to US1, US2, or US3 from `spec.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add test tooling and reusable fixtures without changing feature behavior.

- [ ] T001 Add Vitest, Testing Library, jsdom, and test scripts in `package.json` and test configuration in `vite.config.ts`
- [ ] T002 [P] Create shared Testing Library setup and cleanup in `tests/setup.ts`
- [ ] T003 [P] Create deterministic account, plan, quote, request, and error fixtures in `tests/fixtures/subscriptionManagement.ts`

**Checkpoint**: Existing lint, test, format, typecheck, and build checks still pass.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared domain, contract, and orchestration boundaries.

**CRITICAL**: Complete this phase before any user-story implementation.

- [ ] T004 Expand subscription, plan, quote, request, capability, and typed error models from `specs/data-model.md` in `src/types.ts`
- [ ] T005 Implement the provider-neutral options, quote, confirm, status, and withdrawal HTTP boundary from `specs/contracts/subscription-management.openapi.yaml` in `src/services/subscriptionGateway.ts`
- [ ] T006 Implement pure capability, field-validation, quote-currentness, request-summary, and retry-safety helpers in `src/services/subscriptionService.ts`
- [ ] T007 [P] Add regression tests for existing subscription summaries and renewal-risk behavior in `tests/unit/subscriptionService.regression.test.ts`
- [ ] T008 Create the account-scoped management state coordinator and accessible status region in `src/components/SubscriptionActions.tsx`

**Checkpoint**: The gateway can be stubbed, domain errors are typed, and current
overview behavior remains testable.

---

## Phase 3: User Story 1 - Change Plan or Seats (Priority: P1) - MVP

**Goal**: An account owner or billing admin can quote and confirm eligible plan
or seat changes; a viewer cannot mutate.

**Independent Test**: With a contract-compatible gateway stub, complete a plan
or seat change, verify the disclosed impact and stable request reference, then
repeat confirmation and observe one request.

### Tests for User Story 1

- [ ] T009 [P] [US1] Add failing unit tests for role capabilities, plan eligibility, seat minimums, and assigned-seat limits covering FR-002 through FR-006 and FR-013 in `tests/unit/subscriptionService.test.ts`
- [ ] T010 [P] [US1] Add failing contract tests for options, quote, confirmation, `403`, `409`, `410`, and `422` mapping in `tests/contract/subscriptionGateway.contract.test.ts`
- [ ] T011 [P] [US1] Add failing integration tests for plan/seat quote, confirmation, viewer denial, stale quote, duplicate confirmation, and focus/status announcements in `tests/integration/planSeatManagement.test.tsx`

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement plan and seat selection with role and range guidance in `src/components/PlanSeatChangeForm.tsx`
- [ ] T013 [P] [US1] Implement current/proposed state, money impact, effective date, expiry, and confirmation UI in `src/components/ChangeQuotePanel.tsx`
- [ ] T014 [US1] Implement version-bound quote and idempotent confirmation orchestration for FR-007, FR-008, FR-017 through FR-020 in `src/components/SubscriptionActions.tsx`
- [ ] T015 [US1] Integrate account-scoped management actions and authoritative refresh in `src/App.tsx`
- [ ] T016 [US1] Add responsive, keyboard-visible, non-color-only plan/seat and quote styles in `src/styles.css`
- [ ] T017 [US1] Run and record the plan/seat, viewer, stale-quote, and replay expectations from `specs/quickstart.md`

**Checkpoint**: US1 is independently functional and meets SC-001 through SC-005
for plan and seat changes.

---

## Phase 4: User Story 2 - Change Billing Cadence (Priority: P2)

**Goal**: An authorized admin can quote and schedule a cadence change for the
next renewal without altering current access.

**Independent Test**: Quote a different cadence, confirm it, and verify one
scheduled request at the renewal date; selecting the current cadence creates no
request.

### Tests for User Story 2

- [ ] T018 [P] [US2] Add failing unit tests for cadence no-op detection, renewal-effective summaries, and locale-aware dates in `tests/unit/cadenceChange.test.ts`
- [ ] T019 [P] [US2] Add failing contract tests for cadence quote and scheduled request shapes in `tests/contract/cadenceChange.contract.test.ts`
- [ ] T020 [P] [US2] Add failing integration tests for cadence scheduling, duplicate prevention, conflict refresh, and no-op messaging in `tests/integration/cadenceManagement.test.tsx`

### Implementation for User Story 2

- [ ] T021 [P] [US2] Implement monthly/annual selection and renewal-effective explanation in `src/components/CadenceChangeForm.tsx`
- [ ] T022 [US2] Integrate cadence quote and scheduled confirmation for FR-009, FR-018, and FR-019 in `src/components/SubscriptionActions.tsx`
- [ ] T023 [US2] Add cadence controls, scheduled-state, and responsive styles in `src/styles.css`
- [ ] T024 [US2] Run and record the scheduled cadence, conflict, and no-op expectations from `specs/quickstart.md`

**Checkpoint**: US2 is independently functional and a cadence change never
silently affects the current paid term.

---

## Phase 5: User Story 3 - Cancel or Retain a Subscription (Priority: P3)

**Goal**: An account owner can schedule end-of-term cancellation and withdraw
it before the irreversible cutoff; other roles cannot.

**Independent Test**: Schedule cancellation as owner, verify continued access,
withdraw it, and confirm that billing admin and viewer attempts remain rejected.

### Tests for User Story 3

- [ ] T025 [P] [US3] Add failing unit tests for owner-only cancellation, consequence requirements, cutoff handling, and withdrawal authority in `tests/unit/cancellation.test.ts`
- [ ] T026 [P] [US3] Add failing contract tests for cancellation quote, scheduled cancellation, withdrawal, and forbidden/conflict responses in `tests/contract/cancellation.contract.test.ts`
- [ ] T027 [P] [US3] Add failing integration tests for explicit cancellation confirmation, continued access, withdrawal, role denial, and live status in `tests/integration/cancellationManagement.test.tsx`

### Implementation for User Story 3

- [ ] T028 [P] [US3] Implement owner-only consequence review, explicit confirmation, cutoff, and withdrawal controls in `src/components/CancellationPanel.tsx`
- [ ] T029 [P] [US3] Implement pending request status, requester, effective date, and permitted withdrawal display in `src/components/PendingChangePanel.tsx`
- [ ] T030 [US3] Integrate cancellation and withdrawal orchestration for FR-010 through FR-012 and FR-014 through FR-016 in `src/components/SubscriptionActions.tsx`
- [ ] T031 [US3] Add destructive-action hierarchy, pending status, focus, and responsive styles in `src/styles.css`
- [ ] T032 [US3] Run and record cancellation, withdrawal, role-boundary, and cutoff expectations from `specs/quickstart.md`

**Checkpoint**: US3 is independently functional and every cancellation action
has explicit owner intent, effective date, and reversible-state evidence.

---

## Phase 6: Polish & Cross-Cutting Verification

**Purpose**: Prove shared reliability, accessibility, security, and traceability.

- [ ] T033 [P] Add cross-story integration tests for one-pending-request enforcement, mid-flow role loss, plan/price invalidation, timeout recovery, and audit correlation in `tests/integration/subscriptionManagement.test.tsx`
- [ ] T034 [P] Add keyboard, focus, accessible-name, field-error, and live-region coverage for FR-023 and SC-007 in `tests/integration/subscriptionManagement.accessibility.test.tsx`
- [ ] T035 Verify every contract error maps to a user-visible, retry-safe outcome without exposing provider details in `src/services/subscriptionGateway.ts` and `tests/contract/subscriptionGateway.contract.test.ts`
- [ ] T036 Verify locale-aware dates and exact minor-unit money formatting for FR-022 in `src/services/subscriptionService.ts` and `tests/unit/subscriptionService.test.ts`
- [ ] T037 Run all scenarios in `specs/quickstart.md`, then run `npm run agent:check` and document any external service prerequisites in `specs/quickstart.md`
- [ ] T038 Confirm FR-001 through FR-023 and buildable SC-003 through SC-007 each map to at least one automated test in `specs/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: Starts immediately.
- **Phase 2 Foundational**: Depends on Phase 1 and blocks all stories.
- **US1, US2, US3**: Depend on Phase 2. Story-specific test/component work can
  proceed in parallel; shared `SubscriptionActions.tsx` integration must be
  serialized.
- **Phase 6 Polish**: Depends on all stories selected for the release.

### User Story Dependencies

- **US1 (P1)**: No other story dependency; recommended MVP.
- **US2 (P2)**: Uses shared quote/confirm foundation but not US1 behavior.
- **US3 (P3)**: Uses shared quote/status/withdraw foundation but not US1 or US2
  behavior.

### Requirement Coverage

| Requirement(s) | Primary Task Coverage |
| --- | --- |
| FR-001 | T004, T015, T029 |
| FR-002 to FR-006 | T005, T009 to T012, T014 |
| FR-007 to FR-008 | T010, T011, T013, T014 |
| FR-009 | T018 to T023 |
| FR-010 to FR-012 | T025 to T028, T030 to T032 |
| FR-013 | T009, T012 |
| FR-014 to FR-016 | T025 to T030, T033 |
| FR-017 to FR-020 | T005, T010, T011, T014, T033, T035 |
| FR-021 | T033, T037 |
| FR-022 | T018, T036 |
| FR-023 | T011, T016, T027, T031, T034 |
| SC-003 | T009 to T011, T025 to T027, T033 |
| SC-004 | T010, T011, T033 |
| SC-005 | T011, T019, T020, T026, T027 |
| SC-006 | T033, T037 |
| SC-007 | T011, T016, T027, T031, T034 |

SC-001, SC-002, and SC-008 are usability and post-launch outcome measures;
they are validated through product research and production metrics rather than
build tasks.

### Within Each User Story

1. Add tests and verify the expected failures.
2. Implement story-specific component(s).
3. Integrate with shared coordinator.
4. Apply story-specific styles and accessibility behavior.
5. Run the independent quickstart scenario.

## Parallel Opportunities

- T002 and T003 can run in parallel after T001.
- T007 can run in parallel with T004 through T006.
- Within US1, T009 through T011 and T012 through T013 can run in parallel.
- Within US2, T018 through T020 can run in parallel.
- Within US3, T025 through T027 and T028 through T029 can run in parallel.
- T033 and T034 can run in parallel after all story flows are integrated.

## Parallel Examples

### User Story 1

```text
Task T009: Unit-test capabilities and seat validation.
Task T010: Contract-test gateway mappings.
Task T011: Integration-test the plan/seat journey.
```

### User Story 3

```text
Task T025: Unit-test cancellation policy.
Task T026: Contract-test cancellation endpoints.
Task T027: Integration-test cancellation and withdrawal.
```

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases.
2. Complete US1 only.
3. Validate US1 independently, including permission, stale quote, and
   idempotency cases.
4. Demo plan/seat self-service before adding cadence or cancellation.

### Incremental Delivery

1. **MVP**: Plan and seat management.
2. **Increment 2**: Renewal-effective cadence changes.
3. **Increment 3**: Owner-only cancellation and withdrawal.
4. **Release gate**: Cross-story security, accessibility, contract, and
   quickstart verification.

## Notes

- Tasks describe implementation work only; this exercise stops before T001.
- Server-side authorization, billing calculations, audit persistence, and
  provider integration are external deployment prerequisites governed by the
  OpenAPI contract.
- Do not place provider credentials, exact billing authority, or trusted role
  decisions in the browser.
