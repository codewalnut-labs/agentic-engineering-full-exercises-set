import { validateEvidence } from "../../../scripts/test-evidence.mjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const exerciseRoot = path.resolve(appRoot, "..");
const failures = [];

function sha256(absolutePath) {
  const normalized = fs.readFileSync(absolutePath, "utf8").replaceAll("\r\n", "\n");
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function verifyStarterIntegrity() {
  const manifestPath = path.join(appRoot, "challenge-integrity.json");
  if (!fs.existsSync(manifestPath)) {
    failures.push("challenge integrity manifest is missing");
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const [relativePath, expectedHash] of Object.entries(manifest.protectedFiles ?? {})) {
    const absolutePath = path.resolve(appRoot, relativePath);
    if (!fs.existsSync(absolutePath)) failures.push(`protected challenge file is missing: ${relativePath}`);
    else if (sha256(absolutePath) !== expectedHash) failures.push(`protected challenge file was changed: ${relativePath}`);
  }
}

verifyStarterIntegrity();

const testDir = path.join(appRoot, "tests", "e2e");
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const testFiles = walk(testDir).filter((file) => file.endsWith(".ts") && path.basename(file) !== "starter-smoke.spec.ts");
const repairedSpecs = testFiles.filter((file) => file.endsWith(".spec.ts"));
const specs = testFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

if (repairedSpecs.length === 0) failures.push("no repaired checkout specification was found");
if (/waitForTimeout\s*\(/.test(specs)) failures.push("fixed waitForTimeout remains in repaired checkout coverage");
if (/\.checkout-primary-|locator\s*\(\s*["'`]\./i.test(specs)) failures.push("generated or CSS-class selector remains in repaired checkout coverage");
if (/test\.(?:only|skip)|describe\.(?:only|skip)|test\.describe\.configure\s*\(\s*\{[^}]*mode:\s*["']serial/i.test(specs)) {
  failures.push("focused, skipped, or serial-only checkout coverage is not allowed");
}
for (const signal of [
  "x-checkout-session",
  "/api/testing/reset",
  "/api/tax-quote",
  "/api/payments/authorize",
  "country",
  "subtotal",
  "cardholder",
  "cardNumber",
  "total",
  "Payment declined",
  "Try another payment",
  "Order confirmed",
]) {
  if (!specs.includes(signal)) failures.push(`repaired checkout tests do not prove ${signal}`);
}
for (const value of ["IN", "99", "Asha Kumar", "4242424242424242", "4000000000000000", "106.92"]) {
  if (!specs.includes(value)) failures.push(`repaired checkout tests do not assert the contract value ${value}`);
}
if (!/(?:testInfo|parallelIndex|randomUUID|crypto\.randomUUID)/.test(specs)) {
  failures.push("checkout tests do not create a unique session value per test");
}
if (!/setExtraHTTPHeaders|extraHTTPHeaders|newContext\s*\(/.test(specs)) {
  failures.push("checkout session isolation is not applied to browser requests");
}
if (!/waitForRequest|waitForResponse|page\.on\s*\(\s*["']request/.test(specs)) {
  failures.push("checkout tests do not inspect the live request boundary");
}
if (!/toBeDisabled\s*\(|isDisabled\s*\(/.test(specs)) failures.push("tax or submission readiness is not asserted through the disabled state");
if (!/getByRole|getByLabel|getByText/.test(specs)) failures.push("repaired tests do not use user-facing locators");
if (!/(?:toHaveLength|toBe|toEqual)\s*\(\s*1\s*\)/s.test(specs)) {
  failures.push("duplicate-submit coverage does not assert exactly one authorization request");
}
if (!/duplicate[\s\S]{0,1600}(?:(?:\.click|dispatchEvent|evaluate)[\s\S]*){2}/i.test(specs)) {
  failures.push("duplicate-submit coverage does not attempt two submissions");
}

try { validateEvidence(appRoot); } catch (error) { failures.push(error.message); }
if (failures.length) {
  console.error("Challenge verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("PASS behavior coverage, actual workflow evidence, ordered captures, and fresh final verification. Human review must assess semantic accuracy.");
