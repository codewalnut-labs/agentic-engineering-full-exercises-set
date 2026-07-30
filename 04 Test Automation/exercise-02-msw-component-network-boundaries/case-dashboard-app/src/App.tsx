import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterBar } from "./components/FilterBar";
import { fetchCases } from "./services/caseApi";
import "./styles.css";
import type { WorkItem } from "./types";
import { defaultFilters, filterItems } from "./utils/filters";

type RequestState = "loading" | "ready" | "error";

export default function App() {
  const [cases, setCases] = useState<WorkItem[]>([]);
  const [requestState, setRequestState] = useState<RequestState>("loading");
  const [filters, setFilters] = useState(defaultFilters);
  const filteredCases = useMemo(() => filterItems(cases, filters), [cases, filters]);

  const loadCases = useCallback(async () => {
    setRequestState("loading");

    try {
      setCases(await fetchCases());
      setRequestState("ready");
    } catch {
      setRequestState("error");
    }
  }, []);

  useEffect(() => {
    void loadCases();
  }, [loadCases]);

  return (
    <main className="app-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Operations workspace</p>
          <h1>Case dashboard</h1>
          <p>Review the cases that need attention and keep work moving.</p>
        </div>
      </section>

      {requestState === "loading" && (
        <section className="state-card">
          <p role="status" aria-label="Loading cases">
            Loading cases…
          </p>
        </section>
      )}

      {requestState === "error" && (
        <section className="state-card" role="alert">
          <h2>Cases could not be loaded</h2>
          <p>Try again to reconnect to the case service.</p>
          <button type="button" onClick={() => void loadCases()}>
            Retry
          </button>
        </section>
      )}

      {requestState === "ready" && cases.length === 0 && (
        <section className="state-card">
          <h2>Queue is clear</h2>
          <p>No cases are currently assigned.</p>
        </section>
      )}

      {requestState === "ready" && cases.length > 0 && (
        <>
          <FilterBar filters={filters} onChange={setFilters} />
          <section className="queue-panel" aria-label="Case queue">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Active work</p>
                <h2>Case queue</h2>
              </div>
              <strong>
                {filteredCases.length} {filteredCases.length === 1 ? "case" : "cases"}
              </strong>
            </div>
            {filteredCases.length === 0 ? (
              <div className="filtered-empty">
                <h3>No matching cases</h3>
                <p>No cases match the current filters.</p>
              </div>
            ) : (
              <ul className="case-list">
                {filteredCases.map((item) => (
                  <li key={item.id}>
                    <article className="case-card">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.summary}</p>
                      </div>
                      <dl>
                        <div>
                          <dt>Priority</dt>
                          <dd>{item.priority}</dd>
                        </div>
                        <div>
                          <dt>Status</dt>
                          <dd>{item.status}</dd>
                        </div>
                        <div>
                          <dt>Owner</dt>
                          <dd>{item.owner}</dd>
                        </div>
                      </dl>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
