import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const labContract = fs.readFileSync(path.join(root, "lab-contract.json"), "utf8");
const failures = [];

if (packageJson.name !== path.basename(root)) {
  failures.push(`package name must match folder name: ${path.basename(root)}`);
}

for (const phrase of ["placeholder", "TODO:", "real secret"]) {
  if (labContract.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`lab contract contains weak phrase: ${phrase}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("lint-check passed");
