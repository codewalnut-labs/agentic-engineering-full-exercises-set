import fs from "node:fs"
import path from "node:path"

const skillPath = path.resolve("../.agents/skills/migration-playbook-skill/SKILL.md")
const casesPath = path.resolve(
  "../.agents/skills/migration-playbook-skill/evals/trigger-cases.json",
)
const skill = fs.readFileSync(skillPath, "utf8")
const cases = JSON.parse(fs.readFileSync(casesPath, "utf8"))
const description =
  skill.match(/^---\s*[\s\S]*?^description:\s*(.+)$/m)?.[1]?.toLowerCase() ?? ""
const terms = [
  "migration",
  "migrations",
  "jscodeshift",
  "codemod",
  "legacy react",
  "legacy jsx",
].filter((term) => description.includes(term))
const failures = []

for (const testCase of cases) {
  const prompt = testCase.prompt.toLowerCase()
  const triggered = terms.some(
    (term) => prompt.includes(term) || prompt.includes(term.replace(/s$/, "")),
  )
  if (triggered !== testCase.shouldTrigger) {
    failures.push(testCase.name)
  }
}

if (failures.length > 0) {
  console.error(`trigger smoke failed: ${failures.join(", ")}`)
  process.exit(1)
}

console.log(`trigger smoke passed: ${cases.length} cases against SKILL.md metadata`)
