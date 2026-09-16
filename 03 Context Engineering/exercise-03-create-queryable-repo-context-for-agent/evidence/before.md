# Before: manual repository understanding (pre-graph)

## Conditions

- Source commit: `fb48d936ec2e6e205478614a4af4d2550662f650` (2026-09-11T04:40:18+05:30)
- Date of this pass: 2026-09-16
- Input files: manual read-through of `billing-graph-app/src/**` (billing calculations, dashboard, job, components, contract/workflow files) plus `billing-graph-app/scripts/run-billing-tests.mjs` and `billing-graph-app/incidents/REV-482.md` to sanity-check behavior claims. `docs/`, `docs/service-ownership.md`, `docs/legacy-finance-metrics.md`, and `docs/current-metric-contract.md` were **not** consulted in this pass.
- Task/questions: the six questions in [docs/graph-questions.md](../docs/graph-questions.md) (architecture, dependencies, data flow, business rules, ownership, change impact).
- Agent/tool and model: Claude Code, model `claude-sonnet-5` (Sonnet 5). No graph or index available yet — answers come from `Read`/`Glob`/`Grep` over `billing-graph-app/src` and running `npm run test:billing`.
- Time spent: ~20 minutes of manual file reads and one test run, no cross-file search tooling beyond grep/glob.
- Hints or corrections: none received; this is a first, unassisted pass.

## Findings

1. **Architecture — which entry points produce recognized-revenue summaries?**
   Two entry points build a `RevenueSummary` by calling the shared `buildRevenueSummary`:
   - `loadRevenueDashboard` in [src/dashboard/loadRevenueDashboard.ts](../billing-graph-app/src/dashboard/loadRevenueDashboard.ts), which wraps the summary as `{ generatedFor: "support-analytics", metrics }`.
   - `publishRevenueSnapshot` in [src/jobs/publishRevenueSnapshot.ts](../billing-graph-app/src/jobs/publishRevenueSnapshot.ts), which wraps it as `{ schemaVersion: 2, metrics }`.
   `App.tsx` calls `loadRevenueDashboard` directly with three hard-coded sample events to render the on-screen metrics section. I found no scheduler/cron wiring for `publishRevenueSnapshot` inside `src/` — it looks like a callable job function, but nothing in `src/` invokes it. **Unresolved from src alone**: what actually triggers the "scheduled snapshot" in production (the word "scheduled" appears only in the question and in `labContract`'s entity list, not in any src code or comment).

2. **Dependencies — which shared calculation and account mapping do those entry points depend on?**
   Both entry points depend on `buildRevenueSummary` in [src/billing/revenueSummary.ts](../billing-graph-app/src/billing/revenueSummary.ts), which composes two independent calculations:
   - `recognizedRevenueByAccount` ([src/billing/recognizedRevenue.ts](../billing-graph-app/src/billing/recognizedRevenue.ts))
   - `grossVolumeByAccount` ([src/billing/grossVolume.ts](../billing-graph-app/src/billing/grossVolume.ts))
   Both of those, in turn, depend on `resolveBillingAccountId` in [src/billing/tenantAccountDirectory.ts](../billing-graph-app/src/billing/tenantAccountDirectory.ts) to map a `tenantId` to a `billingAccountId`, and both consume the shared `BillingEvent`/`TenantAccountLink` types from [src/billing/billingTypes.ts](../billing-graph-app/src/billing/billingTypes.ts). This is a single dependency chain, not two parallel ones — a change to `resolveBillingAccountId` affects every consumer.

3. **Data flow — trace an event from tenant to billing-account dashboard total and scheduled snapshot.**
   A `BillingEvent` carries `tenantId`, `grossAmount`, `credits`, `kind`. `resolveBillingAccountId(tenantId, links)` looks up the matching `TenantAccountLink` and returns its `billingAccountId` (throws if no link exists). `recognizedRevenueByAccount`/`grossVolumeByAccount` each reduce the event list into a `Record<billingAccountId, number>` keyed by that resolved account id (not by tenant id), so multiple tenants under one account are summed together. `buildRevenueSummary` merges both records into `RevenueSummary`. `loadRevenueDashboard` and `publishRevenueSnapshot` each call `buildRevenueSummary` independently and wrap the same shape differently. From `src/` I can confirm the dashboard path end-to-end (`App.tsx` → `loadRevenueDashboard` → render), but the snapshot's caller (what "publishes" it, and to where) is not visible in `src/`.

4. **Business rules — how do refunds and credits affect recognized revenue, and how does gross volume differ?**
   From [src/billing/recognizedRevenue.ts](../billing-graph-app/src/billing/recognizedRevenue.ts): for a `"charge"`, recognized revenue adds `grossAmount - credits`; for a `"refund"`, it subtracts the full `grossAmount` (credits are not applied to refunds). Gross volume ([src/billing/grossVolume.ts](../billing-graph-app/src/billing/grossVolume.ts)) simply sums `grossAmount` for every event regardless of `kind` or `credits` — it does not net out refunds or credits at all, so it is expected to diverge from recognized revenue whenever refunds/credits are present. I ran `npm run test:billing` and all 8 assertions in [scripts/run-billing-tests.mjs](../billing-graph-app/scripts/run-billing-tests.mjs) passed, which is consistent with this reading (credits subtracted once, refunds subtract gross, tenants grouped by account, missing mapping throws, gross volume untouched by credits/refund sign).
   [incidents/REV-482.md](../billing-graph-app/incidents/REV-482.md) describes exactly these symptoms as a *previously reported* bug ("credits still counted as recognized revenue", "refunds increase rather than reduce the total", incident still marked "Status: Open"). The current code and passing tests do not reproduce the reported bug, so either the incident doc is stale relative to `src/`, or the fix landed in code without the incident being closed. I cannot resolve which from `src/` alone.

5. **Ownership — who owns the current metric decision and who owns its consumers? How do older notes differ?**
   **Unresolved.** Nothing in `billing-graph-app/src` names an owner, team, or decision author for the recognized-revenue rule or its consumers. `src/labContract.ts`'s `backlog` entries have `"owner": "participant"`, which is a placeholder for this exercise, not a real team. `docs/service-ownership.md` and `docs/legacy-finance-metrics.md` (outside `src/`) are the likely sources for this and were intentionally not read in this pass, so this answer needs the docs or the graph to resolve.

6. **Change impact — which consumers and tests need checking if the recognized-revenue rule changes?**
   Direct consumers found by grepping `src/` for `recognizedRevenueByAccount`/`buildRevenueSummary`: `src/billing/revenueSummary.ts` (composer), `src/dashboard/loadRevenueDashboard.ts`, `src/jobs/publishRevenueSnapshot.ts`, and transitively `src/App.tsx` (renders the dashboard's output). `resolveBillingAccountId` is a shared dependency also used by `grossVolumeByAccount`, so any change there risks gross volume too, even though REV-482 explicitly scopes the fix to recognized revenue only and says gross volume "must remain compatible." Known test coverage: [scripts/run-billing-tests.mjs](../billing-graph-app/scripts/run-billing-tests.mjs) (`npm run test:billing`) covers `recognizedRevenueByAccount`, `grossVolumeByAccount`, `loadRevenueDashboard`, and `publishRevenueSnapshot` directly. I did not find any test that exercises `App.tsx` rendering itself. **Unresolved from src alone**: whether other services/repos outside this app also depend on the snapshot's shape (`schemaVersion: 2`) — that's out of scope for a `src/`-only search.

## Proof

- Source reads: [src/billing/billingTypes.ts](../billing-graph-app/src/billing/billingTypes.ts), [src/billing/grossVolume.ts](../billing-graph-app/src/billing/grossVolume.ts), [src/billing/recognizedRevenue.ts](../billing-graph-app/src/billing/recognizedRevenue.ts), [src/billing/revenueSummary.ts](../billing-graph-app/src/billing/revenueSummary.ts), [src/billing/tenantAccountDirectory.ts](../billing-graph-app/src/billing/tenantAccountDirectory.ts), [src/dashboard/loadRevenueDashboard.ts](../billing-graph-app/src/dashboard/loadRevenueDashboard.ts), [src/jobs/publishRevenueSnapshot.ts](../billing-graph-app/src/jobs/publishRevenueSnapshot.ts), [src/App.tsx](../billing-graph-app/src/App.tsx), [src/types.ts](../billing-graph-app/src/types.ts), [src/labContract.ts](../billing-graph-app/src/labContract.ts), [src/skillWorkflow.ts](../billing-graph-app/src/skillWorkflow.ts), [src/components/DecisionLog.tsx](../billing-graph-app/src/components/DecisionLog.tsx), [src/components/EvidenceLedger.tsx](../billing-graph-app/src/components/EvidenceLedger.tsx), [src/components/SkillPatternBoard.tsx](../billing-graph-app/src/components/SkillPatternBoard.tsx).
- Supporting reads outside `src/` used only to verify behavior, not ownership: [scripts/run-billing-tests.mjs](../billing-graph-app/scripts/run-billing-tests.mjs), [incidents/REV-482.md](../billing-graph-app/incidents/REV-482.md), [package.json](../billing-graph-app/package.json).
- Command run and raw output:

  ```
  $ npm run test:billing
  > billing-graph-app@0.1.0 test:billing
  > node ./scripts/run-billing-tests.mjs

  PASS subtracts credits from charge revenue
  PASS subtracts refund gross without applying credits twice
  PASS groups multiple tenants under one billing account
  PASS rejects an event without an account mapping
  PASS does not mutate events or account links
  PASS keeps the dashboard on the shared corrected summary
  PASS keeps the scheduled snapshot on the shared corrected summary
  PASS preserves the existing gross-volume metric

  8 billing checks passed.
  ```

- Exact excerpt, recognized-revenue rule ([src/billing/recognizedRevenue.ts](../billing-graph-app/src/billing/recognizedRevenue.ts) line 8):
  `    const recognized = event.kind === "refund" ? -event.grossAmount : event.grossAmount - event.credits;`
- Exact excerpt, gross-volume rule ([src/billing/grossVolume.ts](../billing-graph-app/src/billing/grossVolume.ts) line 8):
  `    totals[accountId] = (totals[accountId] ?? 0) + event.grossAmount;`
- Exact excerpt, incident status ([incidents/REV-482.md](../billing-graph-app/incidents/REV-482.md) line 3):
  `Status: Open`
