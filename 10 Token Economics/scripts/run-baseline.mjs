import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const app = process.cwd();
const root = path.resolve(app, "..");
const contract = JSON.parse(fs.readFileSync(path.join(app, "evidence-contract.json"), "utf8"));
const load = (file) => import(pathToFileURL(path.join(app, file)).href);
const json = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
if (contract.kind === "context") {
  const catalog = json("docs/context-catalog.json");
  for (const item of catalog) assert.equal(fs.readFileSync(path.join(root, item.path)).byteLength, item.bytes, "catalog must use real UTF-8 bytes");
  const { selectContext } = await load("src/budget/selectContext.mjs");
  const result = selectContext(catalog, { tags: ["session", "adapter"], questions: ["errors"] }, 2000);
  assert.deepEqual(result.selected.map((item) => item.id), catalog.map((item) => item.id));
  assert.equal(result.totalBytes, catalog.reduce((sum, item) => sum + item.bytes, 0));
  console.log(JSON.stringify({ maximumBytes: 2000, result }, null, 2));
  await load("scripts/run-adapter-acceptance.mjs");
  console.log("PASS baseline records full context and working adapter behavior");
} else if (contract.kind === "routing") {
  const { routeTask } = await load("src/routing/routeTask.mjs");
  const decisions = json("evals/routing-cases.json").map((item) => ({ id: item.id, route: routeTask(item), requiresClarification: item.expectedRoute === "clarify" }));
  assert.ok(decisions.length && decisions.every((item) => item.route === "reasoning"));
  console.log(JSON.stringify({ sourceKind: "deterministic-benchmark-fixture", decisions }, null, 2));
  console.log("PASS baseline records all-reasoning routes including unclear requests");
} else if (contract.kind === "scope") {
  const { buttonVariantFor } = await load("src/migration/exportButton.mjs");
  const variants = Object.fromEntries(["export", "checkout", "delete", "unknown"].map((action) => [action, buttonVariantFor(action)]));
  assert.deepEqual(variants, { export: "legacy-primary", checkout: "legacy-primary", delete: "legacy-danger", unknown: "legacy-primary" });
  console.log(JSON.stringify(variants, null, 2));
  console.log("PASS baseline records the missing export change and legacy behavior");
} else throw new Error("unknown economics challenge");
