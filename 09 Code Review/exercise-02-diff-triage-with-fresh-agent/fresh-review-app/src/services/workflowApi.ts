import type { ActionDraft, WorkItem } from "../types";
import { workItems } from "../data/workItems";
import { readCachedWorkflowItems, writeCachedWorkflowItems } from "./workflowCache";

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const orderWorkflowItems = (items: WorkItem[]) =>
  [...items].sort((left, right) => left.dueInDays - right.dueInDays);

export async function fetchWorkItems(): Promise<WorkItem[]> {
  await wait(220);
  return orderWorkflowItems(readCachedWorkflowItems() ?? workItems);
}

export async function saveAction(itemId: string, draft: ActionDraft): Promise<WorkItem> {
  await wait(180);
  const currentItems = orderWorkflowItems(readCachedWorkflowItems() ?? workItems);
  const item = currentItems.find((candidate) => candidate.id === itemId);
  if (!item) {
    throw new Error("Work item was not found");
  }

  const saved = {
    ...item,
    status: draft.status,
    owner: draft.owner,
    note: draft.note,
  };
  const nextItems = orderWorkflowItems(
    currentItems.map((candidate) => (candidate.id === itemId ? saved : candidate)),
  );
  if (!writeCachedWorkflowItems(nextItems)) {
    throw new Error("Workflow changes could not be persisted");
  }
  return saved;
}

export async function collectEvidence(item: WorkItem): Promise<string[]> {
  await wait(140);
  return [
    `Risk score: ${item.score}`,
    `Owner: ${item.owner}`,
    `Tags: ${item.tags.join(", ")}`,
  ];
}
