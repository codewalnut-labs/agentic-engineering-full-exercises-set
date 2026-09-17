const EVENT_TYPES = new Set(["claim", "command", "context", "diagnosis", "read", "write"]);

function requireNonEmptyString(value, field, sequence) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`event ${sequence} requires a non-empty ${field}`);
  }
}

function validateEvent(event, index, previousSequence) {
  if (!event || typeof event !== "object" || Array.isArray(event)) {
    throw new TypeError(`event ${index + 1} must be an object`);
  }
  if (!Number.isInteger(event.sequence) || event.sequence < 1 || event.sequence <= previousSequence) {
    throw new TypeError("event sequence numbers must be positive, strictly increasing integers");
  }
  if (!EVENT_TYPES.has(event.type)) {
    throw new TypeError(`event ${event.sequence} has an invalid type`);
  }
  requireNonEmptyString(event.target, "target", event.sequence);
  if (!Number.isInteger(event.workspaceRevision) || event.workspaceRevision < 0) {
    throw new TypeError(`event ${event.sequence} requires a non-negative integer workspaceRevision`);
  }
  requireNonEmptyString(event.result, "result", event.sequence);

  if (event.type === "read" || event.type === "write") {
    requireNonEmptyString(event.contentVersion, "contentVersion", event.sequence);
  }
  if (event.type === "context" && (!Number.isInteger(event.bytes) || event.bytes < 0)) {
    throw new TypeError(`context event ${event.sequence} requires non-negative integer bytes`);
  }
  if (event.type === "command") {
    requireNonEmptyString(event.phase, "phase", event.sequence);
  }
  if (event.type === "command" && event.result !== "failed" && event.result !== "passed") {
    throw new TypeError(`command event ${event.sequence} result must be failed or passed`);
  }
  if (event.type !== "command" && event.result !== "ok") {
    throw new TypeError(`non-command event ${event.sequence} result must be ok`);
  }
}

export function analyzeSession(events) {
  if (!Array.isArray(events)) throw new TypeError("events must be an array");

  const reads = new Set();
  const retryBlockedCommands = new Set();
  let previousSequence = -Infinity;
  let activeRevision;
  let duplicateReads = 0;
  let unchangedFailureRetries = 0;
  let oversizedContextLoads = 0;
  let lastWriteIndex = -1;

  events.forEach((event, index) => {
    validateEvent(event, index, previousSequence);
    previousSequence = event.sequence;

    if (activeRevision !== event.workspaceRevision) {
      retryBlockedCommands.clear();
      activeRevision = event.workspaceRevision;
    }

    if (event.type === "diagnosis") retryBlockedCommands.clear();

    if (event.type === "read") {
      const identity = JSON.stringify([event.target, event.contentVersion]);
      if (reads.has(identity)) duplicateReads += 1;
      else reads.add(identity);
    }

    if (event.type === "context" && event.bytes > 8_000) oversizedContextLoads += 1;

    if (event.type === "command") {
      if (retryBlockedCommands.has(event.target)) unchangedFailureRetries += 1;
      if (event.result === "failed") retryBlockedCommands.add(event.target);
    }

    if (event.type === "write") lastWriteIndex = index;
  });

  const finalVerificationRuns = lastWriteIndex < 0
    ? 0
    : events.slice(lastWriteIndex + 1).filter((event) =>
      event.type === "command" && event.phase === "final-verification" && event.result === "passed").length;

  return {
    totalEvents: events.length,
    duplicateReads,
    unchangedFailureRetries,
    oversizedContextLoads,
    preventableCalls: duplicateReads + unchangedFailureRetries + oversizedContextLoads,
    finalVerificationRuns,
    correctnessPassed: finalVerificationRuns > 0,
  };
}
