# Comparison: before vs. after

Comparing [evidence/before.md](before.md) (manual `billing-graph-app/src/` search
only, no graph) against [evidence/after.md](after.md) (Graphify-assisted, all
findings verified against source). Same commit, same six questions from
[docs/graph-questions.md](../docs/graph-questions.md); nothing here claims the
graph made an already-correct answer wrong, or that manual search was
incapable - it just stopped at `src/`'s boundary.

## Changes

- **Architecture**: unchanged on the core answer (two entry points via `buildRevenueSummary()`), but the graph added a finding the before-pass did not have: `App()` is a third, UI-level consumer, surfaced by `graphify affected "buildRevenueSummary()" --depth 2` rather than by reading `revenueSummary.ts` alone.
- **Dependencies**: unchanged on the shared-dependency conclusion (`resolveBillingAccountId()`), but the after-pass adds the written policy backing it (`docs/current-metric-contract.md`), which the before-pass explicitly declined to read.
- **Data flow**: unchanged mechanically; the after-pass adds the policy citation for why dashboard/snapshot agreement is structurally guaranteed by the single shared `buildRevenueSummary()` call.
- **Business rules**: the before-pass could describe the current formula from code but could not resolve whether `incidents/REV-482.md`'s "Status: Open" bug reports were current or stale - it flagged this explicitly as unresolved. The after-pass reaches the same place the graph pointed it (an `INFERRED` link between the incident and the formula) but resolves the actual contradiction by re-reading `recognizedRevenue.ts` and the passing test suite: the incident's reported symptoms do not match current behavior.
- **Ownership**: the single largest change. Before-pass: fully unresolved - "Nothing in `billing-graph-app/src` names an owner, team, or decision author." After-pass: fully resolved via `docs/service-ownership.md`, plus a specific, source-cited breakdown of which older notes (`docs/legacy-finance-metrics.md`, `docs/previous-agent-progress.md`, `docs/graph-extract.md`) still agree and which disagree with current ownership.
- **Change impact**: unchanged on the direct consumer chain, extended to include `App()` (via `--depth 3`) and the shared-dependency risk to gross volume through `resolveBillingAccountId()`. A new limitation was found and verified in the after-pass that the before-pass could not have known to look for: the graph has zero edges between `run-billing-tests.mjs` and the billing modules it actually tests, because the test loads them via a runtime string path (`vite.ssrLoadModule(...)`) invisible to AST extraction.

## Verified

- Every "unresolved from `src/` alone" item flagged in `evidence/before.md` was checked against an actual source file in the after-pass, not just against the graph's own claim - see the per-claim citations in `evidence/source-audit.json` (17 claims, all six topics, each pointing to an exact line in `evidence/answers.md` and an exact line in the cited source).
- The ownership resolution was independently reproduced by a second, fresh agent with no memory of this conversation, using only the graph CLI plus direct source reads (see `evidence/after.md`'s Proof section) - it reached the same three findings (current table; legacy dashboard claim agrees; previous-agent-progress and graph-extract claims disagree) without being told any of them in advance.
- The one INFERRED graph edge this pass relied on for the business-rules finding (formula <-> REV-482 bug nodes) was explicitly not taken at face value: the actual resolution came from re-running `npm run test:billing` and reading `recognizedRevenue.ts` directly, exactly as `docs/setup.md`'s Graphify section requires ("Inferred business concepts still need supporting source references").
- The one genuinely new limitation (dynamic `ssrLoadModule` invisible to the graph) was confirmed by reading `scripts/run-billing-tests.mjs` directly, not inferred from the graph's silence - absence of a graph edge was treated as a lead to check, not as evidence of absence.

## Remaining questions

- **What triggers `publishRevenueSnapshot()` in production?** Still unresolved after the graph. Nothing in the indexed corpus (`billing-graph-app/src/**`, `scripts/run-*.mjs`, `docs/**`, config files) wires it to a cron job, queue consumer, or scheduler of any kind. "Scheduled" is only ever a label (`docs/graph-questions.md`, `labContract.ts`'s entity list). This would need a source outside the indexed corpus (an infra repo, a deploy config, or a person) to resolve - the graph correctly reports it has nothing, rather than inventing a plausible-sounding trigger.
- **Is `incidents/REV-482.md` stale, or was its fix never followed by closing the ticket?** Source and tests contradict the incident's reported symptoms, but nothing in the corpus states which of the two explanations is true. This is a question for whoever owns incident tracking - per `docs/service-ownership.md`, that is most likely Billing Platform, since they own the recognized-revenue formula the incident is about.
- **Does anything outside this repository depend on `publishRevenueSnapshot()`'s output shape (`schemaVersion: 2`)?** Out of scope for a graph built from this exercise's corpus alone; flagged as unresolved in both `evidence/before.md` and `evidence/answers.md` and not resolved here either.
- **Is there UI-level test coverage for `App.tsx`?** No - `npm run test:billing` covers the billing functions and the two library entry points, but nothing renders or asserts against `App()` itself, so a regression introduced only in the dashboard's presentation layer would not be caught by the existing test suite.
