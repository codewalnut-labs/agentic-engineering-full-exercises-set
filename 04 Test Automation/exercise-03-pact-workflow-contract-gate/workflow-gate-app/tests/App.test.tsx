// @vitest-environment jsdom

import { act } from "react"
import { createRoot } from "react-dom/client"
import { afterEach, describe, expect, it, vi } from "vitest"
import App from "../src/App"

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true

const providerItem = {
  id: "wf-101",
  customer: "Atlas Co",
  status: "Blocked",
  score: 91,
  owner: "Asha",
  note: "Evidence missing",
}

describe("workflow UI API boundary", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ""
  })

  it("loads provider workflows into the visible queue", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([providerItem]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )
    vi.stubGlobal("fetch", fetchMock)
    const container = document.createElement("div")
    document.body.append(container)
    const root = createRoot(container)

    await act(async () => {
      root.render(<App />)
    })

    await vi.waitFor(() => {
      expect(container.textContent).toContain("Atlas Co")
    })
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/workflows"),
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    )

    await act(async () => {
      root.unmount()
    })
  })
})
