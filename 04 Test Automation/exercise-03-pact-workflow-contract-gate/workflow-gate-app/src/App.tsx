import { useEffect, useMemo, useState } from "react";
import { ActionComposer } from "./components/ActionComposer";
import { ActivityFeed } from "./components/ActivityFeed";
import { DetailPanel } from "./components/DetailPanel";
import { EvidencePanel } from "./components/EvidencePanel";
import { FilterBar } from "./components/FilterBar";
import { MetricStrip } from "./components/MetricStrip";
import { PageHeader } from "./components/PageHeader";
import { ScenarioBoard } from "./components/ScenarioBoard";
import { WorkQueue } from "./components/WorkQueue";
import { activityEvents } from "./data/workItems";
import { collectEvidence, fetchWorkItems, saveAction } from "./services/workflowApi";
import type { ActionDraft, WorkItem } from "./types";
import { defaultFilters, filterItems } from "./utils/filters";
import { summarizePortfolio } from "./utils/scoring";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchWorkItems()
      .then((loaded) => {
        if (!active) return;
        setItems(loaded);
        setSelectedId(loaded[0]?.id ?? "");
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Unable to load workflows");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const selected = items.find((item) => item.id === selectedId);
  const visibleItems = useMemo(() => filterItems(items, filters), [items, filters]);
  const metrics = items.length > 0 ? summarizePortfolio(items) : undefined;

  async function handleSave(draft: ActionDraft) {
    if (!selected) return;
    const updated = await saveAction(selected.id, draft);
    setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  }

  async function handleCollect() {
    if (selected) {
      setEvidence(await collectEvidence(selected));
    }
  }

  return (
    <main className="app-shell">
      <PageHeader
        competency="Consumer-driven contract testing"
        title="Workflow Contract Gate"
        subtitle="Workflow decisions backed by the rules API and verified with Pact."
      />

      {error ? <p role="alert">{error}</p> : null}
      {!metrics ? (
        <section className="detail-panel" aria-live="polite">
          Loading workflows...
        </section>
      ) : (
        <>
          <MetricStrip
            metrics={[
              { label: "Critical", value: metrics.critical, hint: "Needs immediate review" },
              { label: "Blocked", value: metrics.blocked, hint: "Cannot progress" },
              { label: "Average risk", value: metrics.averageRisk, hint: "Across the portfolio" },
              { label: "Ready", value: metrics.ready, hint: "Available to advance" },
            ]}
          />
          <FilterBar filters={filters} onChange={setFilters} />
          <section className="workspace-grid">
            <WorkQueue
              items={visibleItems}
              selectedId={selectedId}
              onSelect={(item) => {
                setSelectedId(item.id);
                setEvidence([]);
              }}
            />
            <div className="center-stack">
              {selected ? <DetailPanel item={selected} /> : null}
              <ScenarioBoard
                focus={[
                  "Generate the consumer Pact through the production API client.",
                  "Verify the Spring provider against the same interactions.",
                  "Keep field mappings and workflow states compatible.",
                ]}
              />
              <ActivityFeed events={activityEvents} />
            </div>
            <div className="side-stack">
              {selected ? (
                <>
                  <ActionComposer key={selected.id} item={selected} onSave={handleSave} />
                  <EvidencePanel
                    item={selected}
                    evidence={evidence}
                    onCollect={handleCollect}
                  />
                </>
              ) : null}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
