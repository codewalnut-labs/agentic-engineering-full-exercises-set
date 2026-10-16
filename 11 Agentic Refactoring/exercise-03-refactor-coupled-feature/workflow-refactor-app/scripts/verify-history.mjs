import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
export function verifyHistory(root) {
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: 'pipe' }).trim();
const history = JSON.parse(fs.readFileSync(path.join(root, 'evidence/history.json')));
const prefix = git(['rev-parse', '--show-prefix']);
const test = 'workflow-refactor-app/src/decisionWorkflow.characterization.test.mjs';
for (const field of ['characterizationSha', 'refactorSha']) assert.match(history[field] ?? '', /^[a-f0-9]{40}$/);
git(['merge-base', '--is-ancestor', history.characterizationSha, history.refactorSha]);
const added = git(['diff-tree', '--no-commit-id', '--name-only', '-r', history.characterizationSha]).split(/\r?\n/).filter(Boolean).sort();
assert.deepEqual(added, [prefix + 'evidence/contract-before.json', prefix + test].sort(), 'commit only public characterization test and before snapshot together');
const before = JSON.parse(fs.readFileSync(path.join(root, 'evidence/contract-before.json')));
const after = JSON.parse(fs.readFileSync(path.join(root, 'evidence/contract-after.json')));
const expected = JSON.parse(fs.readFileSync(path.join(root, 'docs/contract-observations.json')));
assert.deepEqual(before, expected); assert.deepEqual(after, before);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-history-'));
try {
  for (const sha of [history.characterizationSha, history.refactorSha]) {
    const destination = path.join(temporary, sha);
    const files = git(['ls-tree', '--full-tree', '-r', '--name-only', sha, '--', prefix + 'workflow-refactor-app/src', prefix + 'workflow-refactor-app/scripts', prefix + 'docs']).split(/\r?\n/).filter(Boolean);
    for (const file of files) {
      const target = path.join(destination, file.slice(prefix.length));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, execFileSync('git', ['cat-file', 'blob', sha + ':' + file], { cwd: root }));
    }
    const testPath = path.join(destination, test), source = fs.readFileSync(testPath, 'utf8');
    for (const marker of ['submitDecision', 'withServices', 'assert']) assert.ok(source.includes(marker), 'characterize the public workflow through the provided services');
    const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
    const run = () => spawnSync(process.execPath, [testPath], { env, encoding: 'utf8', timeout: 30000 });
    const result = run(); assert.equal(result.status, 0, 'unchanged participant test must execute against both commits: ' + result.stderr);
    // Mutate an actual result, rather than the expected fixture, to detect an inert test.
    const entry = path.join(destination, 'workflow-refactor-app/src/workflow.mjs');
    fs.writeFileSync(entry, 'export async function submitDecision(){ throw new Error("mutation: workflow unavailable"); }\n');
    assert.notEqual(run().status, 0, 'participant test must detect changed public behavior');
  }
} finally {
  assert.ok(path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep));
  fs.rmSync(temporary, { recursive: true, force: true });
}
console.log('PASS frozen public characterization executes before/after and detects a broken workflow');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) verifyHistory(path.resolve(process.cwd(), '..'));
