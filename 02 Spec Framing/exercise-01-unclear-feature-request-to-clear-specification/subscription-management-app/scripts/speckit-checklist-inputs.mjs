import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FEATURE_DIR, readArtifact } from "./spec-validation.mjs";

export function checklistInputs(root) {
  const selection = JSON.parse(readArtifact(root, ".specify/feature.json"));
  assert.equal(selection.feature_directory, FEATURE_DIR, "select specs/subscription-management in .specify/feature.json");
  readArtifact(root, `${FEATURE_DIR}/spec.md`);
  const template = readArtifact(root, ".specify/templates/checklist-template.md");
  return { REPO_ROOT: root, FEATURE_DIR: path.resolve(root, FEATURE_DIR), AVAILABLE_DOCS: ["spec.md"], TEMPLATE_CONTENT: template };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    console.log(JSON.stringify(checklistInputs(path.resolve(import.meta.dirname, "../.."))));
  } catch (error) {
    console.error(`Checklist prerequisites failed: ${error.message}`);
    process.exitCode = 1;
  }
}
