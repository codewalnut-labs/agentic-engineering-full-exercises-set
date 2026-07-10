import type { QueuePolicy, SupportCase } from "../types";

export const queuePolicy: QueuePolicy = {
  staleAfterHours: 18,
  criticalRevenueFloor: 75000,
  defaultOwner: "support-platform",
  restrictedTags: ["billing-export", "vip-contract"]
};

export const sampleCases: SupportCase[] = [
  {
    id: "CASE-1842",
    customer: "Northstar Health",
    segment: "enterprise",
    severity: "critical",
    status: "blocked",
    ownerTeam: "billing-integrations",
    lastActivityHours: 22,
    revenueRiskUsd: 143000,
    tags: ["billing-export", "sla"],
    summary: "Invoice export failed after contract renewal, blocking monthly close."
  },
  {
    id: "CASE-1847",
    customer: "Bluebird Supply",
    segment: "mid-market",
    severity: "medium",
    status: "new",
    ownerTeam: "support-platform",
    lastActivityHours: 3,
    revenueRiskUsd: 12000,
    tags: ["routing"],
    summary: "Routing rule assigned the case to the wrong regional queue."
  },
  {
    id: "CASE-1851",
    customer: "Aster Labs",
    segment: "enterprise",
    severity: "high",
    status: "waiting",
    ownerTeam: "identity",
    lastActivityHours: 27,
    revenueRiskUsd: 66000,
    tags: ["vip-contract"],
    summary: "SAML group mapping dropped approver access for renewal reviewers."
  },
  {
    id: "CASE-1856",
    customer: "SoloForge",
    segment: "self-serve",
    severity: "low",
    status: "triaged",
    ownerTeam: "growth",
    lastActivityHours: 8,
    revenueRiskUsd: 900,
    tags: ["upgrade"],
    summary: "Upgrade prompt copy is confusing after trial expiration."
  }
];
