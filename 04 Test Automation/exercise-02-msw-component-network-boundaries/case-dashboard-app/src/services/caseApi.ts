import type { Priority, WorkItem, WorkflowStatus } from "../types";

const priorities: Priority[] = ["Low", "Medium", "High"];
const statuses: WorkflowStatus[] = ["Queued", "Ready", "In Review", "Blocked", "Escalated"];

function isWorkItem(value: unknown): value is WorkItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    priorities.includes(item.priority as Priority) &&
    statuses.includes(item.status as WorkflowStatus) &&
    typeof item.score === "number" &&
    typeof item.summary === "string" &&
    typeof item.note === "string" &&
    typeof item.owner === "string" &&
    typeof item.dueInDays === "number" &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string")
  );
}

export async function fetchCases(): Promise<WorkItem[]> {
  const endpoint = new URL("/api/cases", window.location.origin);
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Cases request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || !payload.every(isWorkItem)) {
    throw new Error("Cases response did not match the expected shape");
  }

  return payload;
}
