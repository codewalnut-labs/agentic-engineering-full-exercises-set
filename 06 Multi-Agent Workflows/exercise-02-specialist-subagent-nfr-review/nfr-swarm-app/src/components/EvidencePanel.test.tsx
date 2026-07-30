// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import type { WorkItem } from "../types"
import { EvidencePanel } from "./EvidencePanel"

afterEach(cleanup)

const item: WorkItem = {
  id: "a",
  owner: "Asha",
  note: "valid note",
  name: "Atlas",
  priority: "High",
  status: "Ready",
  score: 80,
  summary: "summary",
  dueInDays: 1,
  tags: [],
}

describe("EvidencePanel status feedback", () => {
  it("announces collection progress and completion", async () => {
    let resolveCollect = () => {}
    const onCollect = vi.fn(
      () => new Promise<void>((resolve) => (resolveCollect = resolve)),
    )
    render(<EvidencePanel item={item} evidence={[]} onCollect={onCollect} />)

    fireEvent.click(screen.getByRole("button", { name: "Collect" }))
    expect(screen.getByRole("region", { name: "Evidence panel" }).getAttribute("aria-busy")).toBe("true")
    expect(screen.getByRole("status").textContent).toContain("Collecting evidence")

    resolveCollect()
    expect(await screen.findByText("Evidence collected.")).toBeTruthy()
  })
})
