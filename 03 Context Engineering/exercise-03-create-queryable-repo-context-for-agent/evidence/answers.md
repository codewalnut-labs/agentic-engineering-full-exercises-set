# Repository questions - verified answers

Answers to [docs/graph-questions.md](../docs/graph-questions.md), verified against
source after querying the graph. Full command transcript in
[evidence/commands/graphify.txt](commands/graphify.txt). Compare against the
pre-graph pass in [evidence/before.md](before.md); differences are summarized
in [evidence/comparison.md](comparison.md).

## Architecture

Two entry points produce a `RevenueSummary`, both by calling the single shared
`buildRevenueSummary()`:
- `loadRevenueDashboard()` in `billing-graph-app/src/dashboard/loadRevenueDashboard.ts`, wrapping the result as `{ generatedFor: "support-analytics", metrics }`.
- `publishRevenueSnapshot()` in `billing-graph-app/src/jobs/publishRevenueSnapshot.ts`, wrapping the result as `{ schemaVersion: 2, metrics }`.

`graphify affected "buildRevenueSummary()" --depth 2` surfaced a third,
UI-level consumer that a single-file read can miss: `App()` in
`billing-graph-app/src/App.tsx`, which calls `loadRevenueDashboard()` directly
to render the on-screen metrics section.

Unresolved even with the graph: nothing in the indexed corpus (source, tests,
config, or docs) shows what triggers `publishRevenueSnapshot()` in production.
The word "scheduled" appears only in `docs/graph-questions.md` and
`billing-graph-app/src/labContract.ts`'s entity list, never attached to a
cron job, queue consumer, or invocation site. This is an honest gap, not a
graph failure - there is no scheduler in this repository to find.

## Dependencies

Both entry points depend on `buildRevenueSummary()` in
`billing-graph-app/src/billing/revenueSummary.ts`, which composes two
independent calculations: `recognizedRevenueByAccount()` and
`grossVolumeByAccount()`. Both of those, in turn, depend on the single shared
`resolveBillingAccountId()` in
`billing-graph-app/src/billing/tenantAccountDirectory.ts` to map a `tenantId`
to a `billingAccountId` - confirmed both by `graphify explain
"resolveBillingAccountId()"` (shows exactly two callers: `grossVolume.ts` and
`recognizedRevenue.ts`) and by reading both files directly. This is one
dependency chain, not two independent ones: a change to
`resolveBillingAccountId()` risks both metrics at once, which is exactly the
compatibility constraint `billing-graph-app/incidents/REV-482.md` calls out.
`docs/current-metric-contract.md` states the same requirement as policy:
"Every event must resolve through the tenant-to-account directory," and "A
missing tenant mapping is an error and must not create a fallback grouping
key" - matching `resolveBillingAccountId()`'s `throw` on a missing link.

## Data flow

A `BillingEvent` (`tenantId`, `grossAmount`, `credits`, `kind`) is resolved to
a `billingAccountId` via `resolveBillingAccountId()`, which both
`recognizedRevenueByAccount()` and `grossVolumeByAccount()` use to key their
running totals (so multiple tenants under one billing account are summed
together, never reported separately). `buildRevenueSummary()` merges both
totals into one `RevenueSummary`, which `loadRevenueDashboard()` and
`publishRevenueSnapshot()` each wrap independently - both drawing on the same
underlying numbers, so a dashboard/snapshot disagreement (one of
`incidents/REV-482.md`'s reported symptoms) is not currently possible through
this call path, since there is only one shared calculation, not two.
`docs/current-metric-contract.md` states this as policy: "The dashboard and
scheduled snapshot must use the same shared revenue summary." `graphify path`
between `BillingEvent` and each consumer only returns the structural
type-usage edge (`BillingEvent` is an imported parameter type); the causal
chain above comes from the `calls` edges surfaced by `explain`/`affected` on
`buildRevenueSummary()`, `recognizedRevenueByAccount()`, and
`resolveBillingAccountId()`, cross-checked against the source files directly.

## Business rules

`recognizedRevenue.ts` line 8: a `"charge"` event contributes `grossAmount -
credits`; a `"refund"` event contributes `-grossAmount` (credits are not
applied a second time to a refund). `grossVolume.ts` line 8 sums
`grossAmount` for every event regardless of `kind` or `credits` - it does not
net out refunds or credits at all. Both match
`docs/current-metric-contract.md` word for word: "A charge contributes
`grossAmount - credits`," "A refund contributes `-grossAmount`. Credits do
not reduce a refund again," and "Gross volume remains the sum of gross
amounts and is not changed by the recognized-revenue rule." `npm run
test:billing` (8/8 assertions passing, captured in `evidence/before.md`)
confirms this behavior at runtime.

`billing-graph-app/incidents/REV-482.md` is still marked "Status: Open" and
reports exactly the opposite of current behavior ("Credits are still counted
as recognized revenue," "Refunds increase rather than reduce the total").
The graph draws an `INFERRED conceptually_related_to` edge between the
incident's bug descriptions and the current formula purely because the
extraction subagent read both files together - it is not a claim that the
bug is still live. **Verified conclusion: the current code and tests
contradict REV-482's reported symptoms.** Either the incident's fix already
landed in source without the incident being closed, or the incident doc is
stale. This cannot be resolved from source alone and should be confirmed with
whoever owns incident tracking (see Ownership, below, for who that likely is).

## Ownership

`docs/service-ownership.md` ("Status: Current") is the current authority:

| Area | Owner |
|---|---|
| Recognized-revenue formula | Billing Platform |
| Tenant-to-account directory | Billing Platform |
| Revenue dashboard | Support Analytics |
| Scheduled finance snapshot | Finance Operations |

This resolves what `evidence/before.md` could not answer from `src/` alone.
Cross-checking older notes against this table:
- `docs/legacy-finance-metrics.md` ("Status: Superseded draft") claims dashboard metric changes were assigned to Support Analytics - this still **agrees** with current ownership; only the same document's tenant-grouping rule (superseded by billing-account grouping) is actually outdated. Not every older claim in this doc is wrong.
- `docs/previous-agent-progress.md` (an unverified historical note, explicitly "a claim to investigate, not ... a source of current policy") claims the snapshot was "a separate calculation owned by Support Analytics" - this **disagrees** with the current table, which assigns the scheduled finance snapshot to Finance Operations.
- `docs/graph-extract.md` ("Status: Stale and incomplete") claims "Support Analytics owns calculation changes" - this **disagrees** with the current table, which assigns the recognized-revenue formula itself to Billing Platform, not Support Analytics. The document says so about itself: it "predates credits, billing-account consolidation, and the shared revenue summary."

`docs/service-ownership.md` also states consumer teams "must not create
separate revenue formulas" - i.e., ownership of the calculation stays with
Billing Platform even though Support Analytics and Finance Operations each
consume it.

## Change impact

Direct consumers of `recognizedRevenueByAccount()`, per `graphify affected
"recognizedRevenueByAccount()" --depth 3` and confirmed by source: `revenueSummary.ts`
(composer) -> `loadRevenueDashboard.ts` and `publishRevenueSnapshot.ts` ->
transitively `App.tsx` (`App()` renders the dashboard's output).
`resolveBillingAccountId()` is a second shared dependency also used by
`grossVolumeByAccount()`, so a change there risks gross volume too, even
though `incidents/REV-482.md`'s scope explicitly says "Gross volume, public
consumer result shapes, and the tenant-to-account directory must remain
compatible."

Known test coverage: `billing-graph-app/scripts/run-billing-tests.mjs` (`npm
run test:billing`) covers `recognizedRevenueByAccount()`,
`grossVolumeByAccount()`, `loadRevenueDashboard()`, and
`publishRevenueSnapshot()` directly (8 assertions, all passing). **Important
graph limitation, found and verified this pass:** `graphify affected
"recognizedRevenueByAccount()"` does not list this test file at all, and
`graphify explain "run-billing-tests.mjs"` shows zero edges to any `billing/*`
module. The test loads billing code via
`vite.ssrLoadModule("/src/billing/recognizedRevenue.ts")` - a runtime string
path inside a template literal - which static AST extraction cannot see.
Anyone relying on `graphify affected` alone to scope a change would miss the
one test file that actually needs to be run. No test exists yet that renders
`App.tsx` itself, so a UI-level regression in the dashboard section would not
be caught by `npm run test:billing`.
