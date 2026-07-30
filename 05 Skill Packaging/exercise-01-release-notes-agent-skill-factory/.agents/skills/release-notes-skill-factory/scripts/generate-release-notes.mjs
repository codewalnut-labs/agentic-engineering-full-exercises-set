import fs from "node:fs"
import path from "node:path"
import { renderReleaseNotes } from "./release-notes-lib.mjs"

const [, , inputArg, outputArg] = process.argv
if (!inputArg || !outputArg) {
  console.error("Usage: node generate-release-notes.mjs <input.json> <output.md>")
  process.exit(2)
}

const inputPath = path.resolve(inputArg)
const outputPath = path.resolve(outputArg)
const release = JSON.parse(fs.readFileSync(inputPath, "utf8"))
const notes = renderReleaseNotes(release)

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, notes)
console.log(`generated ${outputPath}`)
