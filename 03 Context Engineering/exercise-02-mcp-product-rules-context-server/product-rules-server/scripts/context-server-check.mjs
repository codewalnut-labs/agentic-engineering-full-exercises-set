import fs from "node:fs";

const required = ["src/server.ts", "package.json"];
const failures = required.filter((file) => !fs.existsSync(file));
const server = fs.existsSync("src/server.ts") ? fs.readFileSync("src/server.ts", "utf8") : "";
for (const phrase of ["product", "rule", "fixture"]) {
  if (!server.toLowerCase().includes(phrase)) failures.push("server.ts should expose " + phrase + " context");
}
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("context-server-check passed");
