// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import type { WorkItem } from "../types"
import { ActionComposer } from "./ActionComposer"

afterEach(cleanup)

const item = (id: string, owner: string, note: string): WorkItem => ({
  id,
  owner,
  note,
  name: id,
  priority: "Medium",
  status: "Ready",
  score: 50,
  summary: "summary",
  dueInDays: 1,
  tags: [],
})

describe("ActionComposer NFR behavior", () => {
  it("explains why a short note disables save", () => {
    render(<ActionComposer item={item("a", "Asha", "short")} onSave={vi.fn()} />)

    expect(screen.getByLabelText("Reviewer note").getAttribute("aria-describedby")).toBe(
      "reviewer-note-help",
    )
    expect(screen.getByText(/at least 8 characters/i)).toBeTruthy()
    expect(
      (screen.getByRole("button", { name: "Save draft" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true)
  })

  it("announces save failures", async () => {
    render(
      <ActionComposer
        item={item("a", "Asha", "valid note")}
        onSave={vi.fn().mockRejectedValue(new Error("Save unavailable"))}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Save draft" }))

    expect((await screen.findByRole("alert")).textContent).toContain("Save unavailable")
  })

  it("resets the draft when selection changes", async () => {
    const { rerender } = render(
      <ActionComposer item={item("a", "Asha", "first note")} onSave={vi.fn()} />,
    )
    fireEvent.change(screen.getByLabelText("Owner"), { target: { value: "Edited" } })

    rerender(
      <ActionComposer item={item("b", "Mateo", "second note")} onSave={vi.fn()} />,
    )

    await waitFor(() =>
      expect((screen.getByLabelText("Owner") as HTMLInputElement).value).toBe("Mateo"),
    )
    expect((screen.getByLabelText("Reviewer note") as HTMLTextAreaElement).value).toBe(
      "second note",
    )
  })
})
