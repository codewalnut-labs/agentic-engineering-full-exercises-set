export type CaseStatus = "new" | "triaged" | "waiting" | "blocked";

export type CustomerSegment = "enterprise" | "mid-market" | "self-serve";

export type Severity = "low" | "medium" | "high" | "critical";

export interface SupportCase {
  id: string;
  customer: string;
  segment: CustomerSegment;
  severity: Severity;
  status: CaseStatus;
  ownerTeam: string;
  lastActivityHours: number;
  revenueRiskUsd: number;
  tags: string[];
  summary: string;
}

export interface QueuePolicy {
  staleAfterHours: number;
  criticalRevenueFloor: number;
  defaultOwner: string;
  restrictedTags: string[];
}

export interface RoutingHint {
  owner: string;
  action: string;
  riskScore: number;
}
