import assert from "node:assert/strict";
import { after, test } from "node:test";
import path from "node:path";
import { createServer } from "vite";

const appRoot = path.resolve(import.meta.dirname, "..");
const vite = await createServer({ root: appRoot, appType: "custom", logLevel: "silent", server: { middlewareMode: true } });
after(async () => { await vite.close(); });
const { getRoutingHint, sortCasesForTriage } = await vite.ssrLoadModule("/src/services/caseRouter.ts");
const { queuePolicy, sampleCases } = await vite.ssrLoadModule("/src/data/cases.ts");
const makeCase = (overrides = {}) => ({ ...sampleCases[1], tags: [], ...overrides });

test("revenue risk at the configured boundary retains the named owner", () => {
  const hint = getRoutingHint(makeCase({ revenueRiskUsd: 75000, ownerTeam: "identity" }), queuePolicy);
  assert.equal(hint.owner, "identity");
  assert.equal(hint.action, "Keep with named owner");
});

test("stale restricted cases require owner approval at the time boundary", () => {
  const item = makeCase({ tags: ["vip-contract"], lastActivityHours: 18 });
  assert.equal(getRoutingHint(item, queuePolicy).action, "Escalate with owner approval");
  assert.equal(getRoutingHint({ ...item, lastActivityHours: 17 }, queuePolicy).action, "Keep with named owner");
});

test("ordinary cases without an owner use the configured default", () => {
  assert.equal(getRoutingHint(makeCase({ ownerTeam: "" }), queuePolicy).owner, "support-platform");
});

test("low severity self-serve cases use the lifecycle queue", () => {
  const hint = getRoutingHint(makeCase({ segment: "self-serve", severity: "low" }), queuePolicy);
  assert.equal(hint.owner, "growth");
  assert.equal(hint.action, "Route to lifecycle queue");
});

test("triage ordering preserves the caller's array", () => {
  const items = [makeCase({ id: "low", severity: "low" }), makeCase({ id: "critical", severity: "critical" })];
  const original = structuredClone(items);
  assert.deepEqual(sortCasesForTriage(items).map((item) => item.id), ["critical", "low"]);
  assert.deepEqual(items, original);
});
