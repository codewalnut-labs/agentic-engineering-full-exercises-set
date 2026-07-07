import fs from "node:fs";
import path from "node:path";

const files = ["package.json", "lab-contract.json", "tsconfig.json"];
const failures = [];

for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(path.join(process.cwd(), file), "utf8"));
  } catch (error) {
    failures.push(`${file} is not valid JSON: ${error.message}`);
  }
}

const readme = fs.readFileSync(path.join(process.cwd(), "..", "README.md"), "utf8");
if (!readme.includes("## Popular Agent Skill Pattern") || !readme.includes("## Practice Focus")) {
  failures.push("README is missing required senior exercise sections");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("format-check passed");
