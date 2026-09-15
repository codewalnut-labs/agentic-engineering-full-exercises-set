import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { evaluateRenewalEligibility } from "./legacyEligibility.mjs";

const goldenCasesPath = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "docs",
  "renewal-golden-cases.json",
);
const goldenCases = JSON.parse(fs.readFileSync(goldenCasesPath, "utf8"));

assert.equal(goldenCases.length, 10, "the characterization must cover all ten observed cases");

for (const goldenCase of goldenCases) {
  const actual = evaluateRenewalEligibility(goldenCase.input);

  assert.deepEqual(
    actual,
    goldenCase.expected,
    `${goldenCase.name} must retain its observed public result`,
  );
}

console.log(`PASS ${goldenCases.length} public renewal eligibility characterizations`);
