import assert from "node:assert/strict";
import { buildSavedFilter } from "./filterPersistence.mjs";

// Participant test: the same owner, saved twice under two different display
// labels, must still resolve to the same stable ownerId -- proving identity
// survives a label rename, which is exactly the mistake this module used to
// make. Each save also gets its own injected clock value, proving there is
// no shared or ambient clock state between calls.
function fixedClock(value) {
  return () => value;
}

const first = buildSavedFilter(
  { owner: { id: "user-7", label: "Priya K." }, statusLabel: "  Blocked  " },
  fixedClock("2026-01-01T00:00:00.000Z"),
);
const second = buildSavedFilter(
  { owner: { id: "user-7", label: "Priya Kapoor" }, statusLabel: "blocked" },
  fixedClock("2026-02-02T00:00:00.000Z"),
);

assert.deepEqual(first, { ownerId: "user-7", status: "blocked", updatedAt: "2026-01-01T00:00:00.000Z" });
assert.deepEqual(second, { ownerId: "user-7", status: "blocked", updatedAt: "2026-02-02T00:00:00.000Z" });
assert.equal(first.ownerId, second.ownerId, "same owner must resolve to the same stable id despite a relabeled display name");
assert.equal(first.updatedAt, "2026-01-01T00:00:00.000Z", "updatedAt must come from the injected clock, not an ambient one");
assert.equal(second.updatedAt, "2026-02-02T00:00:00.000Z", "each call must use its own injected clock value independently");

console.log("PASS participant test: relabeled owner resolves to the same stable id across saves, using an independent injected clock each time");
