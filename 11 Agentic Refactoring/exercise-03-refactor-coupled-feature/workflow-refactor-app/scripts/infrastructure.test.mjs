import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { verifyHistory } from './verify-history.mjs';
import { inspect } from './check-architecture.mjs';
import { cases, memoryAdapters, observe } from './scenarios.mjs';
import { observeHttp, assertContract } from './observe-contract.mjs';
test('the coupled starter has real HTTP-backed behavior and stable effect order', async () => {
  assertContract(await observeHttp());
});
test('architecture checks reject transport imports, globals, dynamic loading and re-exports', () => {
  for (const source of ['import x from "node:http";', 'fetch("http://example.invalid");', 'import("./legacy/transport.mjs");', 'export * from "./legacy/store.mjs";'])
    assert.throws(() => inspect(source, { allowedImports: ['./errors.mjs'], forbiddenGlobals: ['fetch'] }));
  assert.deepEqual(inspect('import { WorkflowError } from "./errors.mjs";', { allowedImports: ['./errors.mjs'] }), ['./errors.mjs']);
});
test('contract detects no-op and changed side effects rather than trusting success text', async () => {
  const observations = [];
  for (const scenario of cases) {
    const state = memoryAdapters(scenario);
    observations.push(await observe(scenario, async () => state.snapshot(), state));
  }
  assert.throws(() => assertContract(observations));
  const good = await observeHttp(); good[2].events.push('save:w-1');
  assert.throws(() => assertContract(good));
});
test('historical replay finds nested files and rejects an insensitive participant test', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-replay-test-'));
  const relative = 'chapter with spaces/exercise-refactor-coupled-workflow';
  const exercise = path.join(root, relative);
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: 'pipe' }).trim();
  const write = (file, text) => { const target = path.join(exercise, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); };
  const commit = () => { git('add', '.'); git('commit', '-qm', 'synthetic replay fixture'); return git('rev-parse', 'HEAD'); };
  try {
    git('init', '-q'); git('config', 'user.name', 'Replay test'); git('config', 'user.email', 'fixture@example.invalid'); git('config', 'core.autocrlf', 'false');
    write('workflow-refactor-app/src/workflow.mjs', 'export function submitDecision(){return 1;}\n');
    write('docs/contract-observations.json', '[1]\n'); const startingSha = commit();
    const publicTest = "import assert from 'node:assert/strict';import {submitDecision} from './workflow.mjs';const withServices=callback=>callback();withServices(()=>assert.equal(submitDecision(),1));\n";
    write('workflow-refactor-app/src/decisionWorkflow.characterization.test.mjs', publicTest);
    write('evidence/contract-before.json', '[1]\n'); const characterizationSha = commit();
    write('workflow-refactor-app/src/workflow.mjs', 'const value=1;export function submitDecision(){return value;}\n'); const refactorSha = commit();
    write('evidence/contract-after.json', '[1]\n');
    write('evidence/history.json', JSON.stringify({ characterizationSha, refactorSha })); commit();
    verifyHistory(exercise);
    // A new fixture history with assertions absent must fail the broken-workflow replay.
    git('checkout', '-q', startingSha);
    write('workflow-refactor-app/src/decisionWorkflow.characterization.test.mjs', "import assert from 'node:assert/strict';import {submitDecision} from './workflow.mjs';const withServices=()=>{};assert.ok(withServices);\n");
    write('evidence/contract-before.json', '[1]\n'); const inertSha = commit();
    write('workflow-refactor-app/src/workflow.mjs', 'const value=1;export function submitDecision(){return value;}\n'); const inertSource = commit();
    write('evidence/history.json', JSON.stringify({ characterizationSha: inertSha, refactorSha: inertSource }));
    write('evidence/contract-after.json', '[1]\n');
    assert.throws(() => verifyHistory(exercise), /detect changed public behavior/);
  } finally {
    assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(root, { recursive: true, force: true });
  }
});
