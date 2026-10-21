# Graph Report - .  (2026-09-16)

## Corpus Check
- Corpus is ~4,712 words - fits in a single context window. You may not need a graph.

## Summary
- 167 nodes · 240 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.88)
- Token cost: 0 input · 105,438 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Recognized-Revenue Business Rules & Ownership|Recognized-Revenue Business Rules & Ownership]]
- [[_COMMUNITY_Package Scripts & Dependencies|Package Scripts & Dependencies]]
- [[_COMMUNITY_App Shell & Lab Contract UI|App Shell & Lab Contract UI]]
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_Exercise Docs & Graphify Setup|Exercise Docs & Graphify Setup]]
- [[_COMMUNITY_Billing Calculation Core|Billing Calculation Core]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Format Check Script|Format Check Script]]
- [[_COMMUNITY_Agent Check Script|Agent Check Script]]
- [[_COMMUNITY_Billing Test Script|Billing Test Script]]
- [[_COMMUNITY_Submission Validation Scripts|Submission Validation Scripts]]
- [[_COMMUNITY_Lint Check Script|Lint Check Script]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 20 edges
2. `compilerOptions` - 16 edges
3. `REV-482: Recognized revenue mismatch` - 9 edges
4. `Repository questions` - 9 edges
5. `TenantAccountLink` - 7 edges
6. `buildRevenueSummary()` - 7 edges
7. `Recognized Revenue Formula (charge = grossAmount - credits; refund = -grossAmount)` - 7 edges
8. `App()` - 6 edges
9. `BillingEvent` - 6 edges
10. `LabContract` - 6 edges

## Surprising Connections (you probably didn't know these)
- `billing-graph-app Project` --references--> `REV-482: Recognized revenue mismatch`  [INFERRED]
  README.md → billing-graph-app/incidents/REV-482.md
- `Refunds increase rather than reduce total (bug)` --conceptually_related_to--> `Recognized Revenue Formula (charge = grossAmount - credits; refund = -grossAmount)`  [INFERRED]
  billing-graph-app/incidents/REV-482.md → docs/current-metric-contract.md
- `billing-graph-app Project` --references--> `billing-graph-app index.html entry point`  [INFERRED]
  README.md → billing-graph-app/index.html
- `REV-482: Recognized revenue mismatch` --references--> `Gross Volume Metric`  [EXTRACTED]
  billing-graph-app/incidents/REV-482.md → docs/current-metric-contract.md
- `Credits still counted as recognized revenue (bug)` --conceptually_related_to--> `Recognized Revenue Formula (charge = grossAmount - credits; refund = -grossAmount)`  [INFERRED]
  billing-graph-app/incidents/REV-482.md → docs/current-metric-contract.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Recognized Revenue Shared-Summary Consumers** — docs_current_metric_contract_shared_revenue_summary, docs_service_ownership_revenue_dashboard_ownership, docs_service_ownership_scheduled_finance_snapshot_ownership, billing_graph_app_incidents_rev_482_dashboard_snapshot_disagreement_bug [INFERRED 0.85]
- **Superseded/Historical Revenue Policy Sources** — docs_legacy_finance_metrics_document, docs_graph_extract_document, docs_previous_agent_progress_document [INFERRED 0.85]
- **Billing Service Ownership Table** — docs_service_ownership_recognized_revenue_formula_ownership, docs_service_ownership_tenant_to_account_directory_ownership, docs_service_ownership_revenue_dashboard_ownership, docs_service_ownership_scheduled_finance_snapshot_ownership [EXTRACTED 1.00]

## Communities (13 total, 3 thin omitted)

### Community 0 - "Recognized-Revenue Business Rules & Ownership"
Cohesion: 0.09
Nodes (36): Credits still counted as recognized revenue (bug), Dashboard and scheduled snapshot disagree after separate fixes (bug), REV-482: Recognized revenue mismatch, Refunds increase rather than reduce total (bug), REV-482 Scope Constraints Rationale, Two tenants in one billing account appear as separate totals (bug), Billing Account Grouping Rule, Recognized Revenue Contract (+28 more)

### Community 1 - "Package Scripts & Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, react, react-dom, name, private, scripts, agent:check, build (+19 more)

### Community 2 - "App Shell & Lab Contract UI"
Cohesion: 0.18
Nodes (15): App(), DecisionLog(), EvidenceLedger(), SkillPatternBoard(), loadRevenueDashboard(), root, evidenceStatus(), readinessScore() (+7 more)

### Community 3 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+10 more)

### Community 4 - "Exercise Docs & Graphify Setup"
Cohesion: 0.15
Nodes (18): billing-graph-app index.html entry point, Before/After/Comparison Evidence Process, Evidence instructions and template, Required Submission Outputs, Source Audit Claims Schema, Architecture Question: entry points for recognized-revenue summaries, Change Impact Question: consumers and tests affected, Dependencies Question: shared calculation and account mapping (+10 more)

### Community 5 - "Billing Calculation Core"
Cohesion: 0.39
Nodes (8): BillingEvent, RevenueSummary, TenantAccountLink, grossVolumeByAccount(), recognizedRevenueByAccount(), buildRevenueSummary(), resolveBillingAccountId(), publishRevenueSnapshot()

### Community 6 - "Dev Dependencies"
Cohesion: 0.33
Nodes (6): devDependencies, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react

### Community 7 - "Format Check Script"
Cohesion: 0.33
Nodes (5): failures, files, missingSections, readme, requiredSections

### Community 8 - "Agent Check Script"
Cohesion: 0.40
Nodes (4): contract, docsDir, failures, root

## Knowledge Gaps
- **69 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+64 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Repository questions` connect `Exercise Docs & Graphify Setup` to `Recognized-Revenue Business Rules & Ownership`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `REV-482: Recognized revenue mismatch` connect `Recognized-Revenue Business Rules & Ownership` to `Exercise Docs & Graphify Setup`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _74 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Recognized-Revenue Business Rules & Ownership` be split into smaller, more focused modules?**
  _Cohesion score 0.08571428571428572 - nodes in this community are weakly interconnected._
- **Should `Package Scripts & Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._