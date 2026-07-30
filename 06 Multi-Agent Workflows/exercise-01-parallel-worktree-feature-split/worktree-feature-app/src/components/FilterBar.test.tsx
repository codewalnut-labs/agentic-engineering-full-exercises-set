import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { defaultFilters } from "../utils/filters";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("renders an enabled reset button with an accessible label when filters differ from defaults", () => {
    const markup = renderToStaticMarkup(
      <FilterBar
        filters={{ ...defaultFilters, query: "release" }}
        onChange={vi.fn()}
      />,
    );

    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-label="Reset filters"');
    expect(markup).toContain(">Reset filters</button>");
    expect(markup).not.toContain("disabled");
  });

  it("disables the reset button when filters match the defaults", () => {
    const markup = renderToStaticMarkup(
      <FilterBar filters={defaultFilters} onChange={vi.fn()} />,
    );

    expect(markup).toContain('aria-label="Reset filters"');
    expect(markup).toContain("disabled");
  });
});
