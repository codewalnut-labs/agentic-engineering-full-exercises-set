import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { PageHeader } from "../src/components/PageHeader"

describe("PageHeader migration behavior", () => {
  it("preserves content, actions, and the action-group label", () => {
    const markup = renderToStaticMarkup(
      <PageHeader
        title="Migration playbook"
        subtitle="One safe slice"
        competency="Skill packaging"
      />,
    )

    expect(markup).toContain("<h1>Migration playbook</h1>")
    expect(markup).toContain("One safe slice")
    expect(markup).toContain("Skill packaging")
    expect(markup).toContain('aria-label="Exercise actions"')
    expect(markup.match(/<button type="button">/g)).toHaveLength(2)
  })
})
