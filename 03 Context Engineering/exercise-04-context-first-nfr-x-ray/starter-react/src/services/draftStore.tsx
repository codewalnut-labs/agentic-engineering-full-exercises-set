const DEFAULT_DRAFT = {
  vendor: "",
  ownerEmail: "",
  department: "Procurement",
  dataTypes: "",
  estimatedSpend: "50000",
  urgency: "normal",
  justification: "",
};

const STORAGE_KEY = "vendor-risk-draft";
const DEMO_TOKEN_KEY = "vendor-risk-demo-token";
const APPROVAL_EVENT_KEY = "vendor-risk-approval-events";

export function loadDraft() {
  localStorage.setItem(DEMO_TOKEN_KEY, "demo-admin-token");
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_DRAFT;
}

export function saveDraft(draft) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function submitDraft(draft, tenant) {
  return {
    id: `vr-${Date.now()}`,
    tenantId: tenant.id,
    vendor: draft.vendor || "Unreviewed vendor",
    ownerEmail: draft.ownerEmail || tenant.reviewerEmail,
    department: draft.department,
    status: "pending",
    criticality: draft.urgency === "urgent" ? "tier-1" : "tier-3",
    riskScore: draft.urgency === "urgent" ? 82 : 44,
    annualSpend: Number(draft.estimatedSpend),
    renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10),
    region: tenant.region,
    dataTypes: draft.dataTypes.split(",").map((item) => item.trim()),
    controlIds: ["soc2", "dpa"],
    openRisks: ["New intake has not been triaged"],
    slaHours: 0,
    lastUpdated: new Date().toISOString(),
    riskSummaryHtml: draft.justification,
  };
}

export function publishApprovalEvent(event) {
  const existingEvents = JSON.parse(localStorage.getItem(APPROVAL_EVENT_KEY) || "[]");
  existingEvents.push({ ...event, createdAt: new Date().toISOString() });
  localStorage.setItem(APPROVAL_EVENT_KEY, JSON.stringify(existingEvents));
  console.log("approval event", event);
}
