import { describe, expect, it } from "vitest";

import { resolveEscalationSeverity } from "./escalationSeverity";

describe("resolveEscalationSeverity", () => {
  it("uses a critical parent severity for inherited escalations", () => {
    expect(resolveEscalationSeverity("medium", "critical", true)).toBe("critical");
  });

  it("keeps a higher local severity for inherited escalations", () => {
    expect(resolveEscalationSeverity("high", "medium", true)).toBe("high");
  });

  it("uses the local severity when the escalation is not inherited", () => {
    expect(resolveEscalationSeverity("medium", "critical", false)).toBe("medium");
  });
});
