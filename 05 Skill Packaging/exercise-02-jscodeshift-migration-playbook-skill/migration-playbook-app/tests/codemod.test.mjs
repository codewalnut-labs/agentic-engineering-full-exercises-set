import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import test from "node:test"
import jscodeshift from "jscodeshift"

const require = createRequire(import.meta.url)
const skillRoot = path.resolve("../.agents/skills/migration-playbook-skill")
const transform = require(
  path.join(skillRoot, "transforms/readonly-component-props.cjs"),
)
const tsxJscodeshift = jscodeshift.withParser("tsx")

function apply(source, interfaceName = "PageHeaderProps") {
  return transform(
    { path: "fixture.tsx", source },
    { jscodeshift: tsxJscodeshift },
    { interfaceName },
  )
}

const normalizeLines = (source) => source.replaceAll("\r\n", "\n").trim()

test("migrates the selected props interface", () => {
  const input = fs.readFileSync(
    path.join(skillRoot, "fixtures/page-header.input.tsx"),
    "utf8",
  )
  const expected = fs.readFileSync(
    path.join(skillRoot, "fixtures/page-header.expected.tsx"),
    "utf8",
  )
  assert.equal(normalizeLines(apply(input)), normalizeLines(expected))
})

test("is idempotent", () => {
  const expected = fs.readFileSync(
    path.join(skillRoot, "fixtures/page-header.expected.tsx"),
    "utf8",
  )
  assert.equal(apply(apply(expected)), expected)
})

test("does not migrate an unrelated interface", () => {
  const input = fs.readFileSync(
    path.join(skillRoot, "fixtures/unrelated.input.tsx"),
    "utf8",
  )
  assert.equal(apply(input), input)
})
