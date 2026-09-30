const ALLOWED = Object.freeze({ allowed: true, reason: "FIRST_OR_INFORMED_ATTEMPT" });
const BLOCKED = Object.freeze({ allowed: false, reason: "DIAGNOSIS_OR_CHANGE_REQUIRED" });

export function evaluateCommandAttempt({ command, workspaceRevision, events }) {
  if (typeof command !== "string" || command.trim() === "") {
    throw new TypeError("command must be a non-empty string");
  }
  if (!Number.isInteger(workspaceRevision) || workspaceRevision < 0) {
    throw new TypeError("workspaceRevision must be a non-negative integer");
  }
  if (!Array.isArray(events)) throw new TypeError("events must be an array");

  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index];

    if (!event || typeof event !== "object") continue;
    if (event.type === "diagnosis") return ALLOWED;
    if (event.workspaceRevision !== workspaceRevision) return ALLOWED;
    if (event.type === "command" && event.target === command && event.result === "failed") {
      return BLOCKED;
    }
  }

  return ALLOWED;
}
