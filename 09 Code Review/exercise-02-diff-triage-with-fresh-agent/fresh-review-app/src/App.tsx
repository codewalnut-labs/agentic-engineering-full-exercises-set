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
import { labContract } from "./labContract";
import { collectEvidence, fetchWorkItems, saveAction } from "./services/workflowApi";
import "./styles.css";
import type { ActionDraft, WorkItem } from "./types";
import { defaultFilters, filterItems } from "./utils/filters";
import { summarizePortfolio } from "./utils/scoring";

export default function App() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [evidenceByItem, setEvidenceByItem] = useState<Record<string, string[]>>({});
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    void fetchWorkItems()
      .then((loaded) => {
        setItems(loaded);
        setSelectedId(loaded[0]?.id ?? "");
      })
      .catch(() => setLoadError("Workflow items could not be loaded."));
  }, []);

  const filteredItems = useMemo(() => filterItems(items, filters), [items, filters]);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const summary = items.length
    ? summarizePortfolio(items)
    : { critical: 0, blocked: 0, averageRisk: 0, ready: 0 };

  async function handleSave(draft: ActionDraft) {
    if (!selected) return;
    setSaveError("");
    try {
      const saved = await saveAction(selected.id, draft);
      setItems((current) => current.map((item) => (item.id === saved.id ? saved : item)));
    } catch {
      setSaveError("Changes could not be saved. Check browser storage and try again.");
    }
  }

  async function handleCollect() {
    if (!selected) return;
    const collected = await collectEvidence(selected);
    setEvidenceByItem((current) => ({ ...current, [selected.id]: collected }));
  }

  return (
    <main className="app-shell">
      <PageHeader
        title={labContract.title}
        subtitle={labContract.domain}
        competency={labContract.competency}
      />
      <MetricStrip
        metrics={[
          { label: "Critical", value: summary.critical, hint: "require review" },
          { label: "Blocked", value: summary.blocked, hint: "cannot progress" },
          { label: "Average risk", value: summary.averageRisk, hint: "portfolio score" },
          { label: "Ready", value: summary.ready, hint: "available now" },
        ]}
      />
      <FilterBar filters={filters} onChange={setFilters} />

      {loadError ? <p role="alert">{loadError}</p> : null}
      {saveError ? <p role="alert">{saveError}</p> : null}
      {!selected && !loadError ? <p role="status">Loading workflow items...</p> : null}
      {selected ? (
        <section className="workspace-grid">
          <WorkQueue items={filteredItems} selectedId={selected.id} onSelect={(item) => setSelectedId(item.id)} />
          <div className="center-stack">
            <DetailPanel item={selected} />
            <ScenarioBoard focus={labContract.verificationGates} />
          </div>
          <div className="side-stack">
            <ActionComposer key={selected.id} item={selected} onSave={handleSave} />
            <EvidencePanel
              item={selected}
              evidence={evidenceByItem[selected.id] ?? []}
              onCollect={handleCollect}
            />
            <ActivityFeed events={activityEvents} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
