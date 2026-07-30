export type TriageState =
  | "needs-info"
  | "ready-for-agent"
  | "ready-for-human"
  | "blocked"
  | "done"

export interface AgentReadyCard {
  id: string
  title: string
  state: TriageState
  previousState?: TriageState
  owner: string
  area: string
  branch: string
  command: string
  mergeCriteria: string
}

export const agentCards: AgentReadyCard[] = [
  {
    id: "ESC-118",
    title: "Reproduce escalation order after schedule override",
    state: "needs-info",
    owner: "Support escalation owner",
    area: "schedule ordering",
    branch: "not assigned",
    command: "Attach a sanitized reproduction before implementation",
    mergeCriteria: "Expected order approved by the domain owner",
  },
  {
    id: "ESC-119",
    title: "Rewrite escalation copy",
    state: "ready-for-human",
    owner: "Content design",
    area: "customer-visible copy",
    branch: "not assigned",
    command: "Approve the copy matrix before agent work",
    mergeCriteria: "Named content reviewer approves every string",
  },
  {
    id: "ESC-120",
    title: "Correct inherited-incident severity",
    state: "done",
    previousState: "ready-for-agent",
    owner: "Severity agent",
    area: "severity resolution",
    branch: "lane/esc-120-severity",
    command: "npm exec --yes vitest@3.2.4 run src/escalationSeverity.test.ts",
    mergeCriteria: "Focused severity tests pass and owned-file audit is clean",
  },
  {
    id: "ESC-121",
    title: "Measure export timeout for large accounts",
    state: "blocked",
    owner: "Export service owner",
    area: "export transport",
    branch: "not assigned",
    command: "Capture a sanitized trace and target SLO",
    mergeCriteria: "Measured bottleneck and service-owner approval",
  },
]
