import type { WorkItem } from "../types";

export const caseFixtures: WorkItem[] = [
  {
    id: "case-atlas",
    name: "Atlas Co",
    priority: "High",
    status: "Blocked",
    score: 91,
    summary: "Contract review is waiting on supporting evidence.",
    note: "Request the missing ownership document.",
    owner: "Maya Chen",
    dueInDays: 1,
    tags: ["review", "evidence"],
  },
  {
    id: "case-cedar",
    name: "Cedar Labs",
    priority: "Low",
    status: "Ready",
    score: 34,
    summary: "Routine renewal is ready for approval.",
    note: "Confirm the standard renewal terms.",
    owner: "Jon Bell",
    dueInDays: 5,
    tags: ["renewal"],
  },
];
