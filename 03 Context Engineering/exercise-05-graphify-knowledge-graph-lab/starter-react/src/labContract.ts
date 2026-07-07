import type { LabContract } from "./types";

export const labContract = {
  "title": "Graphify Knowledge Graph Lab",
  "competency": "03. Context Engineering",
  "skillPattern": "graphify",
  "domain": "Multi-tenant billing analytics workspace with React dashboards, event ingestion, warehouse tables, scheduled jobs, and owner boundaries.",
  "mission": "Create and verify a codebase knowledge graph before asking an agent to make a cross-cutting billing analytics change.",
  "outcome": "Agents answer architecture questions from a durable graph of code, docs, schema, jobs, and ownership instead of repeatedly scanning raw files.",
  "entities": [
    "DashboardRoute",
    "BillingEvent",
    "WarehouseTable",
    "IngestionJob",
    "MetricDefinition",
    "OwnerTeam"
  ],
  "seededDefects": [
    "The dashboard labels a metric as revenue even though the warehouse column is net of credits.",
    "A scheduled job writes tenant ids while the React filter expects account ids.",
    "The graph omits ownership for the ingestion job, causing agents to edit the wrong module.",
    "The starter context includes duplicate metric definitions in two docs."
  ],
  "verificationGates": [
    "Graph extract contains nodes for UI, API, warehouse, jobs, docs, and owner teams.",
    "At least five agent questions are answered from the graph before files are opened.",
    "A stale or missing edge is corrected and documented.",
    "The implemented change names the graph queries used to choose files."
  ],
  "agentWorkflow": [
    "Build or simulate the graph from the provided extract.",
    "Query the graph to find affected modules and owner boundaries.",
    "Use raw files only after the graph narrows the search space.",
    "Patch one billing metric bug and update the graph notes."
  ],
  "workingDeliverables": [
    "Updated graph snapshot or graph notes.",
    "Working metric behavior in the React starter.",
    "Evidence of graph-guided file selection.",
    "A short list of graph gaps for future agents."
  ],
  "seniorSignals": [
    "The graph reduces file thrash.",
    "Context is durable and queryable.",
    "The agent can explain why each touched file was relevant."
  ],
  "backlog": [
    {
      "id": "05-01",
      "title": "The dashboard labels a metric as revenue even though the warehouse column is net of credits.",
      "owner": "agent candidate",
      "skill": "graphify",
      "risk": "high",
      "done": false
    },
    {
      "id": "05-02",
      "title": "A scheduled job writes tenant ids while the React filter expects account ids.",
      "owner": "senior owner",
      "skill": "graphify",
      "risk": "medium",
      "done": false
    },
    {
      "id": "05-03",
      "title": "The graph omits ownership for the ingestion job, causing agents to edit the wrong module.",
      "owner": "agent candidate",
      "skill": "graphify",
      "risk": "critical",
      "done": false
    },
    {
      "id": "05-04",
      "title": "The starter context includes duplicate metric definitions in two docs.",
      "owner": "senior owner",
      "skill": "graphify",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Graph extract contains nodes for UI, API, warehouse, jobs, docs, and owner teams.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "At least five agent questions are answered from the graph before files are opened.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "A stale or missing edge is corrected and documented.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "The implemented change names the graph queries used to choose files.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Build or simulate the graph from the provided extract.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Query the graph to find affected modules and owner boundaries.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Use raw files only after the graph narrows the search space.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Patch one billing metric bug and update the graph notes.",
      "status": "open"
    }
  ]
} satisfies LabContract;
