import { validateEvidence } from "../../../scripts/test-evidence.mjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const exerciseRoot = path.resolve(appRoot, "..");
const failures = [];

function sha256(absolutePath) {
  const content = fs.readFileSync(absolutePath, "utf8").replaceAll("\r\n", "\n");
  return crypto.createHash("sha256").update(content).digest("hex");
}

function verifyProtectedInputs() {
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

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

verifyProtectedInputs();

const excludedTests = new Set([
  "src/App.weak.test.tsx",
  "src/App.acceptance.test.tsx",
  "src/utils/scoring.test.ts",
]);
const participantTests = walk(path.join(appRoot, "src"))
  .filter((absolutePath) => /\.test\.tsx?$/.test(absolutePath))
  .filter((absolutePath) => !excludedTests.has(path.relative(appRoot, absolutePath).replaceAll("\\", "/")))
  .map((absolutePath) => ({
    relativePath: path.relative(appRoot, absolutePath).replaceAll("\\", "/"),
    source: fs.readFileSync(absolutePath, "utf8"),
  }));
const tests = participantTests.map(({ source }) => source).join("\n");
const setupPath = path.join(appRoot, "src", "test", "setup.ts");
const setup = fs.existsSync(setupPath) ? fs.readFileSync(setupPath, "utf8") : "";

if (participantTests.length === 0) failures.push("no participant network component test was found");
const testCount = [...tests.matchAll(/\b(?:it|test)\s*\(/g)].length;
if (testCount < 6 && !/\b(?:it|test)\.each\s*\(/.test(tests)) failures.push("component coverage must contain six independent cases, including parameterized cases");

for (const term of [
  "Loading cases...",
  "Northstar Health",
  "No cases are assigned yet.",
  "No cases match",
  "We could not load cases",
  "Retry",
  "Recovered Co",
  "/api/cases",
]) {
  if (!tests.includes(term)) failures.push(`participant tests do not prove ${term}`);
}
for (const term of ["server.use", "http.get", "HttpResponse", "userEvent", "screen."]) {
  if (!tests.includes(term)) failures.push(`participant tests do not use ${term}`);
}
if (!/http\.get\s*\(\s*["']\/api\/cases["']/.test(tests)) failures.push("tests do not control the real GET /api/cases seam");
if (!/(?:get|find|query)By(?:Role|LabelText|Text)/.test(tests)) failures.push("tests do not use user-visible Testing Library queries");
if (/(?:vi|jest)\.mock|mockImplementation|spyOn\s*\(|(?:globalThis|global|window)\.fetch|querySelector|\.container\b|getByTestId/.test(tests)) {
  failures.push("tests mock internals, bypass the request seam, or use implementation-coupled queries");
}
if (!/(?:toBe|toEqual)\s*\(\s*1\s*\)/s.test(tests)) {
  failures.push("filtered-empty coverage does not prove filtering sends no new request");
}
if (!/(?:toBe|toEqual)\s*\(\s*2\s*\)/s.test(tests)) {
  failures.push("retry coverage does not prove exactly two total requests");
}
if (!/onUnhandledRequest:\s*["']error["']/.test(setup)) failures.push("MSW does not fail unhandled requests");
if (!/cleanup\s*\(/.test(setup)) failures.push("mounted components must be cleaned up after each test");
if (!/afterEach\s*\([^)]*(?:server\.)?resetHandlers|afterEach\s*\(\s*\(\)\s*=>\s*\{[\s\S]{0,300}server\.resetHandlers/.test(setup)) {
  failures.push("MSW runtime handlers are not reset after every test");
}

try { validateEvidence(appRoot); } catch (error) { failures.push(error.message); }
if (failures.length) {
  console.error("Challenge verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("PASS behavior coverage, actual workflow evidence, ordered captures, and fresh final verification. Human review must assess semantic accuracy.");
