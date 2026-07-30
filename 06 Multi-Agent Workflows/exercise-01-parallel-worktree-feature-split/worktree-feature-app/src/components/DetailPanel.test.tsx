import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { WorkItem } from "../types";
import { DetailPanel, formatDueInDays } from "./DetailPanel";

const item: WorkItem = {
  id: "work-1",
  name: "Review onboarding flow",
  priority: "High",
  status: "Ready",
  score: 8,
  summary: "Review the latest flow.",
  note: "Confirm the launch criteria.",
  owner: "Avery",
  dueInDays: 1,
  tags: ["product"],
};

describe("formatDueInDays", () => {
  it.each([
    [0, "Today"],
    [1, "1 day"],
    [4, "4 days"],
  ])("formats %i as %s", (days, expected) => {
    expect(formatDueInDays(days)).toBe(expected);
  });
});

describe("DetailPanel", () => {
  it("renders the formatted due label", () => {
    const markup = renderToStaticMarkup(<DetailPanel item={item} />);

    expect(markup).toContain("<dt>Due</dt><dd>1 day</dd>");
  });
});
