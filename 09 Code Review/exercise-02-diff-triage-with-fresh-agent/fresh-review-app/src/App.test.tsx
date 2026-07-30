import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { workItems } from "./data/workItems";
import { collectEvidence, fetchWorkItems, saveAction } from "./services/workflowApi";

vi.mock("./services/workflowApi", () => ({
  collectEvidence: vi.fn(),
  fetchWorkItems: vi.fn(),
  saveAction: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchWorkItems);
const mockedCollect = vi.mocked(collectEvidence);
const mockedSave = vi.mocked(saveAction);

beforeEach(() => {
  mockedFetch.mockResolvedValue(workItems.slice(0, 2));
  mockedCollect.mockResolvedValue(["Atlas evidence"]);
  mockedSave.mockImplementation(async (id, draft) => ({
    ...(workItems.find((item) => item.id === id) ?? workItems[0]),
    ...draft,
  }));
});

describe("fresh review workflow UI", () => {
  it("keeps collected evidence scoped to its work item", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole("button", { name: /Atlas Co/i }));
    await user.click(screen.getByRole("button", { name: "Collect" }));
    expect(await screen.findByText("Atlas evidence")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Brightline/i }));

    expect(screen.queryByText("Atlas evidence")).not.toBeInTheDocument();
    expect(screen.getByText("No evidence collected for Brightline yet.")).toBeInTheDocument();
  });

  it("shows a recoverable message when persistence fails", async () => {
    const user = userEvent.setup();
    mockedSave.mockRejectedValueOnce(new Error("quota exceeded"));
    render(<App />);

    await screen.findByRole("button", { name: /Atlas Co/i });
    await user.click(screen.getByRole("button", { name: "Save draft" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Changes could not be saved. Check browser storage and try again.",
    );
  });
});
