import type { ActionDraft, WorkItem, WorkflowStatus } from "../types";

interface ProviderWorkflow {
  id: string;
  customer: string;
  status: WorkItem["status"];
  score: number;
  owner: string;
  note: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const workflowStatuses = new Set<WorkflowStatus>([
  "Queued",
  "Ready",
  "In Review",
  "Blocked",
  "Escalated",
]);

function resolveBaseUrl(baseUrl?: string): string {
  if (baseUrl) {
    return baseUrl;
  }
  if (typeof window !== "undefined") {
    return import.meta.env.VITE_WORKFLOW_RULES_API_URL || window.location.origin;
  }
  throw new Error("A workflow API base URL is required outside the browser");
}

function apiUrl(path: string, baseUrl?: string): string {
  return new URL(path, resolveBaseUrl(baseUrl)).toString();
}

function priorityFor(score: number): WorkItem["priority"] {
  if (score >= 80) return "High";
  if (score >= 55) return "Medium";
  return "Low";
}

function toWorkItem(item: ProviderWorkflow): WorkItem {
  return {
    id: item.id,
    name: item.customer,
    priority: priorityFor(item.score),
    status: item.status,
    score: item.score,
    summary: `Workflow rules score: ${item.score}`,
    note: item.note,
    owner: item.owner,
    dueInDays: 0,
    tags: ["workflow-rules-api"],
  };
}

function isProviderWorkflow(value: unknown): value is ProviderWorkflow {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.customer === "string" &&
    typeof item.status === "string" &&
    workflowStatuses.has(item.status as WorkflowStatus) &&
    typeof item.score === "number" &&
    Number.isFinite(item.score) &&
    typeof item.owner === "string" &&
    typeof item.note === "string"
  );
}

async function readWorkflow(response: Response): Promise<ProviderWorkflow> {
  if (!response.ok) {
    throw new Error(`Workflow API request failed with status ${response.status}`);
  }
  const item: unknown = await response.json();
  if (!isProviderWorkflow(item)) {
    throw new Error("Workflow API returned an invalid workflow");
  }
  return item;
}

export async function fetchWorkItems(baseUrl?: string): Promise<WorkItem[]> {
  const response = await fetch(apiUrl("/api/workflows", baseUrl), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Workflow API request failed with status ${response.status}`);
  }
  const items: unknown = await response.json();
  if (!Array.isArray(items) || !items.every(isProviderWorkflow)) {
    throw new Error("Workflow API returned an invalid workflow list");
  }
  return items.map(toWorkItem);
}

export async function saveAction(
  itemId: string,
  draft: ActionDraft,
  baseUrl?: string,
): Promise<WorkItem> {
  const response = await fetch(
    apiUrl(`/api/workflows/${encodeURIComponent(itemId)}/decisions`, baseUrl),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: draft.status,
        owner: draft.owner,
        evidenceNote: draft.note,
      }),
    },
  );

  return toWorkItem(await readWorkflow(response));
}

export async function collectEvidence(item: WorkItem): Promise<string[]> {
  await wait(140);
  return [
    `Risk score: ${item.score}`,
    `Owner: ${item.owner}`,
    `Tags: ${item.tags.join(", ")}`,
  ];
}
