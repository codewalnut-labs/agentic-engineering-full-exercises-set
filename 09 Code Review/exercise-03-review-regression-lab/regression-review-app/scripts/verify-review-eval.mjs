import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const before = JSON.parse(
  fs.readFileSync(path.join(root, "evidence", "promptfoo-before.json"), "utf8"),
);
const after = JSON.parse(
  fs.readFileSync(path.join(root, "evidence", "promptfoo-after.json"), "utf8"),
);

const beforeStats = before.results?.stats;
const afterStats = after.results?.stats;
const failures = [];
const afterOutputs = (after.results?.results ?? []).map(
  (result) => result.response?.output ?? "",
);

if (beforeStats?.successes !== 1 || beforeStats?.failures !== 3) {
  failures.push("baseline must preserve the measured 1/4 score");
}
if (afterStats?.successes !== 4 || afterStats?.failures !== 0) {
  failures.push("improved prompt must pass all 4 regression cases");
}
if ((afterStats?.successes ?? 0) <= (beforeStats?.successes ?? 0)) {
  failures.push("improved prompt must outperform the baseline");
}

for (const expected of [
  "owner and note search",
  "blocked work",
  "due-today risk",
  "silently hides every item after the fifth",
  "NO_BLOCKERS",
]) {
  if (!afterOutputs.some((output) => output.includes(expected))) {
    failures.push(`improved evidence is missing per-case output: ${expected}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("review eval verified: baseline 25%, improved 100%, delta +75 points");
