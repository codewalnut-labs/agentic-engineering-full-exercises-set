import assert from "node:assert/strict";
import fs from "node:fs";
import { evaluateRenewalEligibility } from "./legacyEligibility.mjs";

const goldenCasesUrl = [
  new URL("../../../docs/renewal-golden-cases.json", import.meta.url),
  new URL("../../../../exercise/docs/renewal-golden-cases.json", import.meta.url),
].find((url) => fs.existsSync(url));
const cases = JSON.parse(fs.readFileSync(goldenCasesUrl, "utf8"));

const observations = cases.map(({ name, input }) => ({
  name,
  input,
  output: evaluateRenewalEligibility(structuredClone(input)),
}));

assert.deepEqual(
  observations,
  cases.map(({ name, input, expected }) => ({ name, input, output: expected })),
  "the public renewal evaluator must preserve every observed result and exact reason",
);

assert.deepEqual(
  observations.find(({ name }) => name === "enterprise accepts negative late payments")?.output,
  { status: "eligible", discountPercent: 15, reason: "enterprise-tenure" },
  "the accepted negative-payment validation gap remains characterized",
);

assert.deepEqual(
  observations.find(({ name }) => name === "support override wins on enterprise arrears")?.output,
  { status: "eligible", discountPercent: 0, reason: "legacy-support-override" },
  "support override precedence remains characterized",
);

console.log(`PASS ${observations.length} public renewal characterization cases`);
