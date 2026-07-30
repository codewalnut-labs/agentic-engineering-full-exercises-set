import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ActivityFeed } from "./ActivityFeed";

describe("ActivityFeed", () => {
  it("renders a clear empty state when there are no events", () => {
    const markup = renderToStaticMarkup(<ActivityFeed events={[]} />);

    expect(markup).toContain("No activity yet.");
    expect(markup).not.toContain("<article");
  });

  it("renders each event time semantically", () => {
    const markup = renderToStaticMarkup(
      <ActivityFeed
        events={[
          {
            id: "event-1",
            actor: "Ari",
            text: "Created the project",
            time: "2026-07-30T09:00:00Z",
          },
        ]}
      />,
    );

    expect(markup).toContain(
      '<time dateTime="2026-07-30T09:00:00Z">2026-07-30T09:00:00Z</time>',
    );
  });
});
