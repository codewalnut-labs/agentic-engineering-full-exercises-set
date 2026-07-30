export type Severity = "low" | "medium" | "high" | "critical";

const severityRank: Record<Severity, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};

export function resolveEscalationSeverity(
  local: Severity,
  parent: Severity,
  inherited: boolean,
): Severity {
  if (!inherited) {
    return local;
  }

  return severityRank[parent] > severityRank[local] ? parent : local;
}
