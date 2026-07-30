import { useMemo, useState } from "react"

import { ActionComposer } from "./components/ActionComposer"
import { ActivityFeed } from "./components/ActivityFeed"
import { DetailPanel } from "./components/DetailPanel"
import { EvidencePanel } from "./components/EvidencePanel"
import { FilterBar } from "./components/FilterBar"
import { MetricStrip } from "./components/MetricStrip"
import { PageHeader } from "./components/PageHeader"
import { ScenarioBoard } from "./components/ScenarioBoard"
import { WorkQueue } from "./components/WorkQueue"
import { activityEvents, workItems as initialWorkItems } from "./data/workItems"
import { labContract } from "./labContract"
import { collectEvidence, saveAction } from "./services/workflowApi"
import type { ActionDraft, WorkItem } from "./types"
import { defaultFilters, filterItems } from "./utils/filters"
import "./styles.css"

export default function App() {
  const [items, setItems] = useState(initialWorkItems)
  const [selectedId, setSelectedId] = useState(initialWorkItems[0].id)
  const [filters, setFilters] = useState(defaultFilters)
  const [evidence, setEvidence] = useState<Record<string, string[]>>({})
  const filteredItems = useMemo(() => filterItems(items, filters), [filters, items])
  const selected = items.find((item) => item.id === selectedId) ?? initialWorkItems[0]

  async function saveSelected(draft: ActionDraft) {
    const updated = await saveAction(selected.id, draft)
    setItems((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    )
  }

  async function collectSelectedEvidence() {
    const entries = await collectEvidence(selected)
    setEvidence((current) => ({ ...current, [selected.id]: entries }))
  }

  function selectItem(item: WorkItem) {
    setSelectedId(item.id)
  }

  return (
    <main className="app-shell">
      <PageHeader
        competency={labContract.competency}
        title={labContract.title}
        subtitle={labContract.domain}
      />
      <MetricStrip
        metrics={[
          { label: "Visible work", value: filteredItems.length, hint: `${items.length} total` },
          { label: "High priority", value: items.filter((item) => item.priority === "High").length, hint: "needs review" },
          { label: "Blocked", value: items.filter((item) => item.status === "Blocked").length, hint: "workflow risk" },
          { label: "Evidence", value: evidence[selected.id]?.length ?? 0, hint: `for ${selected.name}` },
        ]}
      />
      <FilterBar filters={filters} onChange={setFilters} />
      <section className="workspace-grid">
        <WorkQueue items={filteredItems} selectedId={selected.id} onSelect={selectItem} />
        <div className="center-stack">
          <DetailPanel item={selected} />
          <ScenarioBoard focus={labContract.verificationGates} />
          <EvidencePanel
            key={`evidence-${selected.id}`}
            item={selected}
            evidence={evidence[selected.id] ?? []}
            onCollect={collectSelectedEvidence}
          />
        </div>
        <div className="side-stack">
          <ActionComposer
            key={`action-${selected.id}`}
            item={selected}
            onSave={saveSelected}
          />
          <ActivityFeed events={activityEvents} />
        </div>
      </section>
    </main>
  )
}
