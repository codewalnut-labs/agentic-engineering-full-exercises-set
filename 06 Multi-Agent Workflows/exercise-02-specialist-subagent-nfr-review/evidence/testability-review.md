# Testability Review — NFR Swarm App

Scope: `nfr-swarm-app` only. Application source was not changed.

## Finding 1 — P0: The intended workflow is not reachable from the rendered application

- **Evidence:** `src/main.tsx:3,11-14` renders only `App`. `src/App.tsx:1-74` imports only the lab-contract/readiness modules; it imports none of the workflow components, `workItems`, filters/scoring utilities, or `workflowApi`.
- **Failure mode:** A component test can mount the orphaned workflow components, but no test of the production root can select work, filter, save an action, or collect evidence. The supplied application can therefore pass root rendering/build checks while the intended workflow is entirely unexercised.
- **Recommended fix:** Introduce a single `WorkflowWorkspace` container and render it from `App`. Give the container explicit dependencies (`workflowApi`/repository) and own its selected item, filters, loading/error, action, and evidence state.
- **Concrete deterministic test:** Render `App` with a fake repository returning two fixed work items. Select item B, set status `Ready`, submit a valid note, then collect evidence. Assert the fake received B's id and draft, the detail panel shows the returned B values, and the evidence list contains the three fixed entries.

## Finding 2 — P1: The API exposes shared module state, allowing cross-test contamination

- **Evidence:** `src/services/workflowApi.ts:2` imports the mutable exported array, and `src/services/workflowApi.ts:6-8` returns that exact `workItems` reference.
- **Failure mode:** Any consumer/test mutating an item or the returned array mutates the module fixture. Later tests then start with altered data, causing order-dependent results; production callers receive a writable source-of-truth alias as well.
- **Recommended fix:** Replace the module singleton with an injected repository initialized from immutable fixtures. Return deep copies (or readonly DTOs) from reads and update repository-owned state only through explicit commands; expose a `reset()`/factory for tests.
- **Concrete deterministic test:** Create two fresh repository instances from the same one-item fixture. Mutate the array returned by `repoA.fetchWorkItems()` and assert a subsequent `repoA.fetchWorkItems()` and `repoB.fetchWorkItems()` still return the original item values and length.

## Finding 3 — P1: Time is hard-coded to browser timers, making async tests slow and timer-coupled

- **Evidence:** `src/services/workflowApi.ts:4` binds `window.setTimeout`; `fetchWorkItems`, `saveAction`, and `collectEvidence` wait fixed 220/180/140 ms at lines `7`, `12`, and `27`.
- **Failure mode:** Unit/component tests must either wait on wall-clock time or globally manipulate browser timers. This needlessly makes tests slow and fragile, and the direct `window` dependency prevents the service from running unchanged in a non-DOM unit-test environment.
- **Recommended fix:** Inject a scheduler/delay function into a repository factory; production supplies a real delay while tests supply `async () => {}` or an explicitly controlled fake scheduler. Keep service methods independent of `window`.
- **Concrete deterministic test:** Build the repository with `delay = vi.fn().mockResolvedValue(undefined)`, call all three operations, and assert each resolves in the same microtask turn, with delay called using `[220, 180, 140]` and no fake-clock advancement.

## Finding 4 — P1: ActionComposer couples editable draft state to its first item prop

- **Evidence:** `src/components/ActionComposer.tsx:12-14` initializes `owner`, `status`, and `note` from `item` once with `useState`; lines `17-23` submit those retained values. There is no synchronization when `item` changes.
- **Failure mode:** When a parent keeps the composer mounted and selection changes, the visible/editable draft remains from the previously selected work item. Tests that render each item in isolation miss this selection transition; an integration test can save item B using item A's fields.
- **Recommended fix:** Either key the composer by `item.id` in its container so selection remounts a fresh draft, or add a deliberate `useEffect` reset keyed to `item.id` (with a documented dirty-draft policy). Extract draft initialization into a pure function for focused unit tests.
- **Concrete deterministic test:** Render the composer for item A, edit owner/note, rerender with item B, and assert the owner/status/note controls equal B's values before saving; click save and assert `onSave` receives B's default draft, not A's edited values.

## Finding 5 — P1: The required `test` command does not execute application behavior

- **Evidence:** `package.json:11` maps `test` to `node ./scripts/agent-check.mjs`. That script only reads `lab-contract.json` (`scripts/agent-check.mjs:5`) and validates contract/document conditions (`:6-27`); it imports no application module or component.
- **Failure mode:** `npm test` can pass when filtering, scoring, workflow API behavior, component interactions, and the production-root wiring are broken. It provides no executable seam for meaningful unit or component verification.
- **Recommended fix:** Add Vitest plus React Testing Library (jsdom) and make `npm test` execute the test suite; retain the contract script under a separately named `contract:check` command. Include tests for pure utilities, repository behavior with injected timing, and the workflow container with a fake repository.
- **Concrete deterministic test:** Add a failing mutation to `filterItems` (for example, change `&&` at `src/utils/filters.ts:27` to `||`) and run `npm test`; a table-driven filter unit test with fixed work items must fail, proving the command exercises runtime behavior.

## Finding counts

- P0: 1
- P1: 4
- P2/P3: 0

## Post-fix recheck

Focused verification: `npx vitest run src/App.test.tsx src/components/ActionComposer.test.tsx` passed (2 files, 4 tests). The full suite was not run.

### Finding 1 — Addressed

`src/App.tsx:3-17` now imports the workflow components, data, API functions, and filter utility. Lines `20-40` own the items, selection, filters, and per-item evidence state; lines `58-72` render and connect the queue, details, evidence collection, action composer, and activity feed. `src/App.test.tsx:7-20` confirms the production root contains each workflow region.

**Residual risk:** The root test is a static-markup presence check. It does not select an item, save an action, or collect evidence, and `App` still directly imports its API/data rather than accepting a fake repository. Add one jsdom interaction test with mocked service calls to cover that sequence deterministically.

### Finding 4 — Addressed

`src/components/ActionComposer.tsx:19-25` resets the editable state when the selected item fields change. `src/components/ActionComposer.test.tsx:51-67` rerenders from item A to B after editing and verifies B's owner and note replace the draft. The focused test file passed.

**Residual risk:** The test does not assert the status reset or the subsequent `onSave` payload. The current effect intentionally discards unsaved edits whenever the selected item's synchronized fields change; retain that behavior only if it is the documented dirty-draft policy.

### Finding 5 — Addressed

`package.json:11-12` separates the contract check and runs `vitest run` from `npm test`. Test dependencies include React Testing Library and Vitest (`package.json:22,29`), and the focused tests exercised both a component interaction and the rendered root.

**Residual risk:** Coverage is still narrow: there is no executable test for filtering/scoring, API outcomes, or the end-to-end root interaction. Also, a contract-check failure short-circuits Vitest; this is acceptable for a gate but should be understood when diagnosing whether behavioral tests ran.

### Finding 2 — Open (intentionally deferred)

The shared `workItems` reference from `workflowApi` remains a cross-test state-leak risk.

### Finding 3 — Open (intentionally deferred)

The direct browser timer and fixed waits in `workflowApi` remain timer-coupled; tests need either wall-clock waits or timer mocking.
