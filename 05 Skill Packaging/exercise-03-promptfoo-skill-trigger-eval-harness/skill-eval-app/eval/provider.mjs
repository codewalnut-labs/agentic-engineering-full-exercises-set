import fs from "node:fs"
import path from "node:path"

import { selectSkill } from "./skill-selector.mjs"

export default class SkillTriggerProvider {
  id() {
    return "skill-trigger-selector"
  }

  async callApi(prompt, context) {
    const version = context?.vars?.catalogVersion ?? "v2"
    const catalogPath = path.resolve("eval", `skills.${version}.json`)
    const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"))
    return {
      output: JSON.stringify(selectSkill(prompt, catalog)),
      tokenUsage: { total: 0, prompt: 0, completion: 0 },
    }
  }
}
