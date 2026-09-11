import { useMemo, useState } from "react";
import { sampleCases, queuePolicy } from "./data/cases";
import { describePolicy, getRoutingHint, needsAttention, sortCasesForTriage } from "./services/caseRouter";
import type { CaseStatus } from "./types";

type Filter = CaseStatus | "all" | "needs-attention";

const filters: Filter[] = ["all", "new", "triaged", "waiting", "blocked", "needs-attention"];

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleCases = useMemo(() => {
    const filtered = filter === "all"
      ? sampleCases
      : filter === "needs-attention"
        ? sampleCases.filter((item) => needsAttention(item, queuePolicy))
        : sampleCases.filter((item) => item.status === filter);
    return sortCasesForTriage(filtered, queuePolicy).map((item) => ({
      item,
      hint: getRoutingHint(item, queuePolicy)
    }));
  }, [filter]);

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Support operations</p>
          <h1>Case routing console</h1>
          <p>{describePolicy(queuePolicy)}</p>
        </div>
        <div className="score">
          <span>{visibleCases.length}</span>
          <small>visible cases</small>
        </div>
      </section>

      <section className="toolbar" aria-label="Case status filters">
        {filters.map((option) => (
          <button
            className={option === filter ? "active" : ""}
            key={option}
            onClick={() => setFilter(option)}
            type="button"
          >
            {option === "needs-attention" ? "Needs Attention" : option}
          </button>
        ))}
      </section>

      <section className="case-grid">
        {visibleCases.map(({ item, hint }) => (
          <article className="case-card" key={item.id}>
            <div>
              <p className="case-id">{item.id}</p>
              <h2>{item.customer}</h2>
            </div>
            <dl>
              <div>
                <dt>Severity</dt>
                <dd>{item.severity}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{hint.owner}</dd>
              </div>
              <div>
                <dt>Action</dt>
                <dd>{hint.action}</dd>
              </div>
            </dl>
            <p>{item.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
