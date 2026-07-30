import type { WorkItem } from "../types";

const cacheKey = "workflow-items";
const priorities = new Set(["Low", "Medium", "High"]);
const statuses = new Set(["Queued", "Ready", "In Review", "Blocked", "Escalated"]);

function isWorkItem(value: unknown): value is WorkItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    priorities.has(String(item.priority)) &&
    statuses.has(String(item.status)) &&
    typeof item.score === "number" &&
    typeof item.summary === "string" &&
    typeof item.note === "string" &&
    typeof item.owner === "string" &&
    typeof item.dueInDays === "number" &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string")
  );
}

export function readCachedWorkflowItems(): WorkItem[] | null {
  let storage: Storage;
  let raw: string | null;
  try {
    storage = window.localStorage;
    raw = storage.getItem(cacheKey);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isWorkItem)) {
      return parsed;
    }
  } catch {
    // Invalid local data is discarded so the caller can use fresh fixtures.
  }

  try {
    storage.removeItem(cacheKey);
  } catch {
    // Recovery still succeeds when blocked storage cannot be cleaned up.
  }
  return null;
}

export function writeCachedWorkflowItems(items: WorkItem[]): boolean {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}
