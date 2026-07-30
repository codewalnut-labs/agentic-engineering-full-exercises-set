import test from "node:test"
import assert from "node:assert/strict"

import { selectSkill } from "../eval/skill-selector.mjs"

const catalog = [
  {
    name: "release-notes",
    description:
      "Create release notes from merged pull requests, changelogs, and release diffs. Do not use for incidents, postmortems, or conceptual summaries.",
    triggers: ["release notes", "merged prs", "changelog", "release diff"],
    exclusions: ["incident", "postmortem", "outage", "conceptually"],
  },
  {
    name: "incident-response",
    description:
      "Summarize active incidents, outages, incident pull requests, and postmortems for responders or leadership.",
    triggers: ["incident", "outage", "postmortem", "incident pr", "leadership"],
    exclusions: ["release notes", "changelog"],
  },
]

test("selects release notes for merged PR release evidence", () => {
  assert.equal(
    selectSkill("Turn these merged PRs into release notes.", catalog).selectedSkill,
    "release-notes",
  )
})

test("selects incident response for an incident PR summary", () => {
  assert.equal(
    selectSkill("Summarize this incident PR for leadership.", catalog).selectedSkill,
    "incident-response",
  )
})

test("selects no skill for a conceptual request", () => {
  assert.equal(
    selectSkill("Explain OAuth conceptually.", catalog).selectedSkill,
    "none",
  )
})

test("returns the reviewer-ready result schema", () => {
  const result = selectSkill("Summarize this incident PR for leadership.", catalog)
  assert.deepEqual(Object.keys(result).sort(), [
    "artifact",
    "inspectedFiles",
    "rationale",
    "selectedSkill",
  ])
  assert.equal(result.artifact.status, "ready")
  assert.match(result.rationale, /incident-response/)
})
