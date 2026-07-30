import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { WorkItem } from "../types";
import { ActionComposer } from "./ActionComposer";

const blockedItem: WorkItem = {
  id: "security-01",
  name: "Atlas Co",
  priority: "High",
  status: "Blocked",
  score: 91,
  summary: "Needs manager review",
  note: "Security exception pending",
  owner: "Asha",
  dueInDays: 0,
  tags: ["needs-evidence"],
};

describe("ActionComposer review safeguards", () => {
  it("renders reviewer HTML as inert text", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActionComposer item={blockedItem} onSave={vi.fn()} />);
    const payload = '<img src="x" onerror="alert(1)"> approved';

    await user.clear(screen.getByLabelText("Reviewer note"));
    await user.type(screen.getByLabelText("Reviewer note"), payload);

    expect(screen.getByTestId("review-preview")).toHaveTextContent(payload);
    expect(container.querySelector(".review-preview img")).toBeNull();
  });

  it("submits the explicitly selected status even when a high-priority note says approved", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(<ActionComposer item={blockedItem} onSave={onSave} />);

    await user.clear(screen.getByLabelText("Reviewer note"));
    await user.type(screen.getByLabelText("Reviewer note"), "not approved; evidence still required");
    await user.click(screen.getByRole("button", { name: "Save draft" }));

    expect(onSave).toHaveBeenCalledWith({
      owner: "Asha",
      note: "not approved; evidence still required",
      status: "Blocked",
    });
  });

  it("keeps short notes from being saved", async () => {
    const user = userEvent.setup();
    render(<ActionComposer item={blockedItem} onSave={vi.fn()} />);

    await user.clear(screen.getByLabelText("Reviewer note"));
    await user.type(screen.getByLabelText("Reviewer note"), "short");

    expect(screen.getByRole("button", { name: "Save draft" })).toBeDisabled();
  });
});
