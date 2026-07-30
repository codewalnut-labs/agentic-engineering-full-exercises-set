import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { workItems } from "../data/workItems";
import { WorkQueue } from "./WorkQueue";

describe("WorkQueue accessibility", () => {
  it("exposes queue rows as keyboard-operable buttons", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <WorkQueue items={workItems.slice(0, 2)} selectedId={workItems[0].id} onSelect={onSelect} />,
    );

    const atlas = screen.getByRole("button", { name: /Atlas Co/i });
    const brightline = screen.getByRole("button", { name: /Brightline/i });
    expect(atlas).toHaveAttribute("type", "button");

    brightline.focus();
    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith(workItems[1]);
  });
});
