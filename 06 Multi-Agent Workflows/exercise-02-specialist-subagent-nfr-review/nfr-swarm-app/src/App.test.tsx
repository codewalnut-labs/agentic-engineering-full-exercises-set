// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { renderToStaticMarkup } from "react-dom/server"
import { afterEach, describe, expect, it } from "vitest"

import App from "./App"

afterEach(cleanup)

describe("production root", () => {
  it("mounts the intended workflow regions", () => {
    const html = renderToStaticMarkup(<App />)

    for (const label of [
      "Filters",
      "Work queue",
      "Selected work item details",
      "Evidence panel",
      "Action composer",
      "Activity feed",
    ]) {
      expect(html).toContain(`aria-label="${label}"`)
    }
  })

  it("scopes pending evidence status to the initiating selection", () => {
    render(<App />)
    fireEvent.click(screen.getByRole("button", { name: "Collect" }))
    expect(screen.getByRole("status").textContent).toContain("Collecting evidence")

    fireEvent.click(screen.getByRole("button", { name: /Brightline/ }))

    expect(screen.getByRole("status").textContent).not.toContain(
      "Collecting evidence",
    )
  })
})
