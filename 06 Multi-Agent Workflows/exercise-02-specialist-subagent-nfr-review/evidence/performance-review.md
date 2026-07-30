# Frontend performance review

## Scope and method

Reviewed only `nfr-swarm-app`. This is a static React screen: its entry point renders the lab contract and does not invoke the otherwise-present workflow, filtering, evidence, or queue modules. I made a production build with `npm run build` and inspected the emitted entry chunk.

**Measured baseline (2026-07-30)**

| Metric | Result |
| --- | ---: |
| Production JavaScript | 196,202 B raw / 61,682 B gzip |
| Production CSS | 3.99 kB raw / 1.44 kB gzip (Vite output) |
| HTML | 0.43 kB raw / 0.29 kB gzip (Vite output) |
| Transformed modules | 31 |
| App-side runtime fetches/images/external fonts | 0 found in the entry path |

The app has no performance-sensitive asynchronous interaction or large rendered collection in its reachable code. No meaningful frontend performance issue is supported by the current evidence.

## Findings

| ID | Severity / disposition | Exact evidence | Expected cost | Fix or dismissal | Measurement / verification |
| --- | --- | --- | --- | --- | --- |
| PERF-01 | Informational — dismiss | `src/main.tsx:11-15` mounts only `App`; `src/App.tsx:1-72` imports and renders only `domainReadiness`, `labContract`, and CSS. A production build emitted one 61,682 B-gzip JS file. The built file does **not** contain `Atlas Co`, `Selected work item`, or `Draft next action`, demonstrating that the unreferenced workflow components/data were not shipped. | React is the dominant initial JS cost, but 61.7 kB gzip is modest for this small SPA and is not presently a user-visible bottleneck. | Do not add route-level splitting or lazy loading now; that would complicate a single static screen without reducing a demonstrated slow interaction. Reassess only if this page gains a substantially larger dependency or initial bundle budget is exceeded. | Keep a production-bundle budget in CI, for example: `npm run build` and fail if the entry JS exceeds 100 kB gzip. In a representative throttled-browser test, record LCP, INP, and total transferred bytes before accepting a future dependency; investigate only if the established product budget regresses. |
| PERF-02 | Informational — dismiss as a micro-optimization | `src/App.tsx:28-30`, `37-39`, `46-48`, and `57-59` each map a fixed lab-contract list. The source contract has 4 entities (`src/labContract.ts:21-26`), 3 defects (`27-31`), 4 verification gates (`32-37`), and 4 workflow steps (`38-43`). `src/App.tsx:65-69` renders at most the risk groups derived from those 3 defects. | At the current maximum (15 list entries plus 3 group summaries), mapping and DOM creation are negligible; memoization or virtualization would cost more in code and maintenance than it could save. | Do not add `useMemo`, `React.memo`, or virtualization. If these data become user-supplied/unbounded, first introduce pagination or virtualization based on observed list sizes and interaction traces. | Use React DevTools Profiler while repeatedly re-rendering with representative data. For any future unbounded list, test 1,000 and 10,000 rows and require render/commit time and scroll frame time to meet the product interaction budget before choosing virtualization. |
| PERF-03 | Informational — dismiss as unreachable code, not an initial-load risk | `src/services/workflowApi.ts:6-32` defines simulated 220/180/140 ms waits, but it has no import from the reachable entry path (`src/main.tsx:1-15`, `src/App.tsx:1-72`). The strings exclusive to those workflow paths are absent from the emitted JS chunk (PERF-01 measurement). | Zero current user-facing network/timeout cost and zero current bundle contribution from this module. If the workflow UI is later wired in, each operation will intentionally wait 140–220 ms in addition to real network latency. | No change for the current screen. When integrating the workflow UI, replace simulated waits with measured API calls, add cancellation/error handling as appropriate, and preserve responsiveness with a local pending state. | In the integrated UI, record request duration in the browser Network panel or RUM. Test p75/p95 action completion and INP under target network conditions; compare the measured values to an explicit workflow interaction SLO before optimizing. |

## Conclusion

- Meaningful actionable findings: **0**
- Informational/micro-optimization dismissals: **3**
- Deferred items requiring later re-measurement: **0**

The production build completed successfully. This review intentionally does not recommend source changes: each tempting optimization is either outside the shipped path or too small to have a meaningful user impact at the current scale.
