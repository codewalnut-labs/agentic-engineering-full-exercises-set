import type { ActionDraft, WorkItem } from "../types";
import { workItems } from "../data/workItems";

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const cacheKey = "workflow-items";

const workItemKeys = ["id", "name", "priority", "status", "score", "summary", "note", "owner", "dueInDays", "tags"];
const priorities = ["Low", "Medium", "High"];
const statuses = ["Queued", "Ready", "In Review", "Blocked", "Escalated"];

function isValidWorkItem(value: unknown): value is WorkItem {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  const keys = Object.keys(item);
  if (keys.length !== workItemKeys.length || workItemKeys.some((key) => !keys.includes(key))) return false;

  return typeof item.id === "string" &&
    typeof item.name === "string" &&
    priorities.includes(item.priority as string) &&
    statuses.includes(item.status as string) &&
    typeof item.score === "number" && Number.isFinite(item.score) &&
    typeof item.summary === "string" &&
    typeof item.note === "string" &&
    typeof item.owner === "string" &&
    typeof item.dueInDays === "number" && Number.isFinite(item.dueInDays) &&
    Array.isArray(item.tags) && item.tags.every((tag) => typeof tag === "string");
}

function loadCachedItems(): WorkItem[] | null {
  const cached = window.localStorage.getItem(cacheKey);
  if (!cached) return null;
  try {
    const parsed: unknown = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.every(isValidWorkItem)) return parsed;
  } catch {
    // Invalid browser state falls back to the source data below.
  }
  window.localStorage.removeItem(cacheKey);
  return null;
}

export async function fetchWorkItems(): Promise<WorkItem[]> {
  await wait(220);
  return loadCachedItems() ?? [...workItems].sort((left, right) => left.dueInDays - right.dueInDays);
}

export async function saveAction(itemId: string, draft: ActionDraft): Promise<WorkItem> {
  await wait(180);
  const items = loadCachedItems() ?? workItems;
  const item = items.find((candidate) => candidate.id === itemId);
  if (!item) {
    throw new Error("Work item was not found");
  }

  const updated = {
    ...item,
    status: draft.status,
    owner: draft.owner,
    note: draft.note,
  };
  window.localStorage.setItem(cacheKey, JSON.stringify(items.map((candidate) => candidate.id === itemId ? updated : candidate)));
  return updated;
}

export async function collectEvidence(item: WorkItem): Promise<string[]> {
  await wait(140);
  return [
    `Risk score: ${item.score}`,
    `Owner: ${item.owner}`,
    `Tags: ${item.tags.join(", ")}`,
  ];
}
