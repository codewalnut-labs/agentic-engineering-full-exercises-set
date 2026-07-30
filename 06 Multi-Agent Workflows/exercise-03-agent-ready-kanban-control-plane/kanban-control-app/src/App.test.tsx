import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import App from "./App"

describe("agent-ready control plane", () => {
  it("renders every triage state and card identifier", () => {
    const html = renderToStaticMarkup(<App />)

    for (const value of [
      "ESC-118",
      "ESC-119",
      "ESC-120",
      "ESC-121",
      "needs-info",
      "ready-for-human",
      "done",
      "blocked",
    ]) {
      expect(html).toContain(value)
    }
  })

  it("shows ownership, commands, and merge criteria for the completed lane", () => {
    const html = renderToStaticMarkup(<App />)

    expect(html).toContain("lane/esc-120-severity")
    expect(html).toContain("vitest")
    expect(html).toContain("Focused severity tests pass")
  })
})
