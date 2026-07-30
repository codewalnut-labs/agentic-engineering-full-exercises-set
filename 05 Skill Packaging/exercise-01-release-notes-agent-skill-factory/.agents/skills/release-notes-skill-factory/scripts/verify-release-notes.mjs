import fs from "node:fs"
import path from "node:path"
import { isComplete, publishedTypes, renderReleaseNotes } from "./release-notes-lib.mjs"

const [, , inputArg, outputArg, triggerArg, skillArg] = process.argv
if (!inputArg || !outputArg || !triggerArg || !skillArg) {
  console.error(
    "Usage: node verify-release-notes.mjs <input.json> <output.md> <trigger-cases.json> <SKILL.md>",
  )
  process.exit(2)
}

const readJson = (file) => JSON.parse(fs.readFileSync(path.resolve(file), "utf8"))
const release = readJson(inputArg)
const actual = fs.readFileSync(path.resolve(outputArg), "utf8")
const triggerCases = readJson(triggerArg)
const skillText = fs.readFileSync(path.resolve(skillArg), "utf8")
const failures = []

if (actual !== renderReleaseNotes(release)) {
  failures.push("generated notes do not match the deterministic snapshot")
}

const diffFiles = new Set(release.diffFiles)
const mappedFiles = new Set(release.changes.flatMap((change) => change.files ?? []))
for (const file of diffFiles) {
  if (!mappedFiles.has(file)) failures.push(`diff file is not mapped to a change: ${file}`)
}
for (const file of mappedFiles) {
  if (!diffFiles.has(file)) failures.push(`change references a file outside the diff: ${file}`)
}

for (const change of release.changes) {
  if (![...publishedTypes, "Internal"].includes(change.type)) {
    failures.push(`${change.id} has unsupported type ${change.type}`)
  }
  const occurrences = actual.split(change.id).length - 1
  if (!change.customerFacing) {
    if (occurrences !== 0) failures.push(`${change.id} internal change leaked into release notes`)
    continue
  }
  if (occurrences !== 1) failures.push(`${change.id} must appear exactly once`)
  if (!isComplete(change)) {
    const blockerStart = actual.indexOf("## Not ready for publication")
    if (actual.indexOf(change.id) < blockerStart) {
      failures.push(`${change.id} missing-evidence item was published`)
    }
  }
  if (change.breaking) {
    const breakingStart = actual.indexOf("## Breaking changes")
    const firstRegularSection = Math.min(
      ...publishedTypes
        .map((type) => actual.indexOf(`## ${type}`))
        .filter((index) => index >= 0),
    )
    const itemIndex = actual.indexOf(change.id)
    if (itemIndex < breakingStart || itemIndex > firstRegularSection) {
      failures.push(`${change.id} breaking change is not prominent`)
    }
  }
}

const descriptionMatch = skillText.match(/^---\s*[\s\S]*?^description:\s*(.+)$/m)
if (!descriptionMatch) failures.push("SKILL.md is missing its trigger description")
const triggerDescription = descriptionMatch?.[1]?.toLowerCase() ?? ""
const triggerTerms = [
  "release notes",
  "changelog",
  "breaking changes",
  "customer impact",
  "rollout",
  "rollback",
].filter((term) => triggerDescription.includes(term))

function triggerDecision(prompt) {
  const text = prompt.toLowerCase()
  return triggerTerms.some(
    (term) =>
      text.includes(term) ||
      text.includes(term.replace(/s$/, "")),
  )
}

for (const testCase of triggerCases) {
  const actualTrigger = triggerDecision(testCase.prompt)
  if (actualTrigger !== testCase.shouldTrigger) {
    failures.push(`trigger smoke failed: ${testCase.name}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log(
  `release-note verification passed: ${release.changes.length} changes, ${release.diffFiles.length} diff files, ${triggerCases.length} trigger cases`,
)
