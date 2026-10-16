import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'acorn';
import { pathToFileURL } from 'node:url';

export function inspect(source, { allowedImports, forbiddenGlobals = [] }) {
  const tree = parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const imports = [];
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    assert.ok(!['ImportExpression', 'ExportAllDeclaration'].includes(node.type), 'dynamic imports and re-exported modules hide the dependency graph');
    if (node.type === 'ImportDeclaration' || (node.type === 'ExportNamedDeclaration' && node.source)) {
      imports.push(node.source.value);
      assert.ok(allowedImports.includes(node.source.value), 'forbidden dependency: ' + node.source.value);
    }
    if (node.type === 'Identifier') assert.ok(!forbiddenGlobals.includes(node.name), 'forbidden transport/global dependency: ' + node.name);
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(tree); return imports;
}
export function checkArchitecture() {
  const read = name => fs.readFileSync(new URL('../src/' + name, import.meta.url), 'utf8');
  inspect(read('decisionWorkflow.mjs'), { allowedImports: ['./errors.mjs'],
    forbiddenGlobals: ['fetch', 'process', 'global', 'globalThis', 'require', 'eval', 'Function', 'WebSocket', 'XMLHttpRequest', 'Bun', 'Deno'] });
  inspect(read('adapters/http.mjs'), { allowedImports: ['../errors.mjs'], forbiddenGlobals: ['process', 'require', 'eval', 'Function'] });
  const imports = inspect(read('workflow.mjs'), { allowedImports: ['./decisionWorkflow.mjs', './adapters/http.mjs'] });
  assert.deepEqual(imports.sort(), ['./adapters/http.mjs', './decisionWorkflow.mjs'], 'production entry must wire both supplied module and HTTP adapters');
  assert.match(read('workflow.mjs'), /createWorkflow\s*\(/, 'wire the feature module into production');
  assert.match(read('workflow.mjs'), /createHttpAdapters\s*\(/, 'wire actual HTTP adapters');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  checkArchitecture(); console.log('PASS HTTP entry uses the injected workflow and transport remains behind adapters');
}
