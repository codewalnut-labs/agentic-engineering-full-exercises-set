import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import App from "./App"

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
})
