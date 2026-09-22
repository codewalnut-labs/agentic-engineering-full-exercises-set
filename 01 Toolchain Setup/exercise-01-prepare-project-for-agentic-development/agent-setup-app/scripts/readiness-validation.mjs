import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "../../../../scripts/context-document-evidence.mjs";

export const capabilities = ["requirements", "research", "tdd", "review"];
export const appName = "agent-setup-app";
export const normalize = (text) => String(text).replaceAll("\r\n", "\n");
const sha = /^[a-f0-9]{40}$/;
const digest = /^[a-f0-9]{64}$/;
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;

export function inside(root, relative) {
  assert.ok(nonempty(relative) && !relative.includes("\\") && !path.posix.isAbsolute(relative) && !path.win32.isAbsolute(relative), "use relative forward-slash paths");
  const parts = relative.split("/");
  assert.ok(parts.every((part) => part && ![".", "..", ".git", "node_modules"].includes(part)), `invalid artifact path: ${relative}`);
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if (fs.existsSync(current)) assert.ok(!fs.lstatSync(current).isSymbolicLink(), `use portable copies, not symlinks: ${relative}`);
  }
  return current;
}

export function read(root, relative) {
  const absolute = inside(root, relative);
  assert.ok(fs.existsSync(absolute) && fs.statSync(absolute).isFile(), `missing file: ${relative}`);
  const bytes = fs.readFileSync(absolute);
  assert.ok(!bytes.includes(0), `use text-only setup files: ${relative}`);
  return normalize(bytes);
}

function filesUnder(root, directory) {
  const absolute = inside(root, directory);
  assert.ok(fs.existsSync(absolute) && fs.statSync(absolute).isDirectory(), `missing skill root: ${directory}`);
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = `${directory}/${entry.name}`;
    inside(root, relative);
    if (entry.isDirectory()) return filesUnder(root, relative);
    assert.ok(entry.isFile(), `unsupported skill file: ${relative}`);
    return [relative];
  });
}

function checkLocalLinks(root, relative, declared, generated) {
  const text = read(root, relative);
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim().replace(/^<([^>]+)>$/, "$1");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    target = target.split("#")[0];
    if (!target) continue;
    // Optional Markdown link titles are not part of the destination.
    target = target.replace(/\s+["'][^"']*["']$/, "");
    const destination = path.posix.normalize(path.posix.join(path.posix.dirname(relative), decodeURIComponent(target)));
    const absolute = inside(root, destination);
    if (generated.has(destination)) continue;
    assert.ok(fs.existsSync(absolute), `broken local link in ${relative}: ${target}`);
    if (fs.statSync(absolute).isFile() && destination.startsWith(`${appName}/`) && !declared.has(destination)) {
      const protectedManifest = JSON.parse(read(root, `${appName}/challenge-integrity.json`));
      const local = destination.slice(appName.length + 1);
      assert.ok(Object.hasOwn(protectedManifest.protectedFiles, local), `list supporting file in skills.json: ${destination}`);
    }
  }
}

export function validateSetup(root) {
  const inventory = JSON.parse(read(root, "evidence/skills.json"));
  assert.equal(inventory.version, 1, "skills.json version must be 1");
  assert.ok(Array.isArray(inventory.configurationFiles), "list configurationFiles");
  assert.equal(new Set(inventory.configurationFiles).size, inventory.configurationFiles.length, "duplicate configuration file");
  for (const required of [`${appName}/AGENTS.md`, `${appName}/docs/agent-setup.md`]) {
    assert.ok(inventory.configurationFiles.includes(required), `configurationFiles must include ${required}`);
    assert.ok(read(root, required).trim().length >= 100, `write substantive guidance in ${required}`);
  }
  assert.ok(Array.isArray(inventory.skills) && inventory.skills.length, "install and record engineering skills");
  const names = new Set(); const roots = []; const files = new Set(inventory.configurationFiles);
  for (const relative of files) {
    assert.ok(relative.startsWith(`${appName}/`), "configuration must be inside the application");
    read(root, relative);
  }
  for (const skill of inventory.skills) {
    assert.ok(nonempty(skill.name) && !names.has(skill.name), "installed skill names must be unique");
    names.add(skill.name);
    const source = new URL(skill.source);
    assert.equal(source.protocol, "https:", `record an HTTPS upstream source for ${skill.name}`);
    assert.ok(sha.test(skill.revision) || skill.revision === "unavailable", `record an upstream revision or unavailable for ${skill.name}`);
    assert.ok(nonempty(skill.root) && skill.root.startsWith(`${appName}/`) && skill.root.includes("/skills/"), "install skills in a project skill directory");
    assert.ok(roots.every((other) => skill.root !== other && !skill.root.startsWith(other + "/") && !other.startsWith(skill.root + "/")), "skill roots must not overlap");
    roots.push(skill.root);
    assert.equal(skill.entry, `${skill.root}/SKILL.md`, "each skill needs a root SKILL.md");
    const entry = read(root, skill.entry);
    const frontmatter = entry.match(/^---\n([\s\S]+?)\n---(?:\n|$)/)?.[1];
    assert.ok(frontmatter, `missing skill metadata: ${skill.entry}`);
    const entryName = frontmatter.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
    assert.equal(entryName, skill.name, `skill inventory name differs from metadata: ${skill.entry}`);
    assert.match(frontmatter, /^description:\s*\S.+/m, `missing skill description: ${skill.entry}`);
    assert.ok(Array.isArray(skill.capabilities) && skill.capabilities.every((item) => capabilities.includes(item)), "unknown skill capability");
    assert.ok(Array.isArray(skill.dependsOn) && skill.dependsOn.every(nonempty), "list skill dependencies, using [] when none");
    assert.ok(Array.isArray(skill.files), "list every installed skill file");
    const actualFiles = filesUnder(root, skill.root).sort();
    assert.deepEqual(skill.files.map((item) => item.path).sort(), actualFiles, `incomplete or duplicate installed files: ${skill.name}`);
    for (const item of skill.files) {
      assert.ok(digest.test(item.sha256), `record SHA-256 for ${item.path}`);
      assert.equal(hash(read(root, item.path)), item.sha256, `installed skill hash mismatch: ${item.path}`);
      assert.ok(!files.has(item.path), `duplicate setup file: ${item.path}`);
      files.add(item.path);
    }
  }
  for (const skill of inventory.skills) {
    for (const dependency of skill.dependsOn) {
      assert.ok(dependency !== skill.name && names.has(dependency), `missing or self-referencing dependency ${dependency} for ${skill.name}`);
    }
  }
  // Recursive dependency graphs must resolve; circular requirements cannot bootstrap.
  const visiting = new Set(); const visited = new Set();
  const visit = (name) => {
    assert.ok(!visiting.has(name), `circular skill dependency: ${name}`);
    if (visited.has(name)) return;
    visiting.add(name);
    for (const dependency of inventory.skills.find((skill) => skill.name === name).dependsOn) visit(dependency);
    visiting.delete(name); visited.add(name);
  };
  names.forEach(visit);
  for (const capability of capabilities) assert.ok(inventory.skills.some((skill) => skill.capabilities.includes(capability)), `missing capability: ${capability}`);
  for (const directory of [".agents", ".codex", ".claude", ".cursor"]) {
    const relative = `${appName}/${directory}`;
    if (!fs.existsSync(inside(root, relative))) continue;
    for (const file of filesUnder(root, relative)) assert.ok(files.has(file), `unlisted native setup file: ${file}`);
  }
  const generatedFiles = inventory.generatedFiles ?? [];
  assert.ok(Array.isArray(generatedFiles) && new Set(generatedFiles).size === generatedFiles.length, "generatedFiles must contain unique paths");
  const protectedManifest = JSON.parse(read(root, `${appName}/challenge-integrity.json`));
  for (const relative of generatedFiles) {
    inside(root, relative);
    assert.ok(relative.startsWith(`${appName}/docs/`) || relative === `${appName}/CONTEXT.md`, "generated files must be project knowledge documents");
    assert.ok(!files.has(relative) && !roots.some((skillRoot) => relative.startsWith(skillRoot + "/")), "generated documents cannot replace setup files");
    assert.ok(!Object.hasOwn(protectedManifest.protectedFiles, relative.slice(appName.length + 1)), "generated documents cannot replace protected inputs");
  }
  for (const relative of files) if (relative.endsWith(".md")) checkLocalLinks(root, relative, files, new Set(generatedFiles));
  const guidance = read(root, `${appName}/AGENTS.md`);
  assert.ok(guidance.includes("npm run agent:check"), "AGENTS.md must identify the normal repository check");
  assert.ok(/src\//.test(guidance), "AGENTS.md must identify relevant source locations");
  return { inventory, files: [...files].sort(), generatedFiles };
}

export function transcriptRange(text, range, label) {
  const lines = text.split("\n");
  assert.ok(Number.isInteger(range?.firstLine) && Number.isInteger(range?.lastLine) && range.firstLine >= 1 && range.lastLine >= range.firstLine && range.lastLine <= lines.length, `invalid transcript range: ${label}`);
  const selected = lines.slice(range.firstLine - 1, range.lastLine).join("\n");
  assert.ok(selected.trim().length >= 20, `empty transcript evidence: ${label}`);
  return selected;
}

export function validateReadiness(root) {
  const setup = validateSetup(root);
  for (const relative of setup.generatedFiles) assert.ok(read(root, relative).trim(), `empty generated document: ${relative}`);
  const record = JSON.parse(read(root, "evidence/readiness.json"));
  assert.equal(record.version, 1, "readiness.json version must be 1");
  const session = record.session;
  assert.equal(session?.fresh, true, "use a fresh session after committing the setup");
  assert.equal(session.launchDirectory, appName, "launch the session in the application directory");
  for (const field of ["agent", "version", "model", "inheritedConfiguration"]) assert.ok(nonempty(session[field]), `record session.${field}`);
  assert.ok(Array.isArray(session.interventions) && session.interventions.every(nonempty), "record human input and corrections, using [] when none");
  assert.match(session.setupCommit ?? "", sha, "record a full setup commit SHA");
  assert.ok(Number.isFinite(Date.parse(session.startedAt)), "record a valid session start time");
  const transcript = read(root, "evidence/session.txt");
  const discovery = transcriptRange(transcript, record.discovery, "discovery");
  assert.ok(discovery.includes("AGENTS.md"), "discovery evidence must identify AGENTS.md");
  for (const skill of setup.inventory.skills) assert.ok(discovery.includes(skill.name), `missing discovery evidence for ${skill.name}`);
  assert.ok(Array.isArray(record.scenarios), "record the readiness scenarios");
  assert.deepEqual(record.scenarios.map((scenario) => scenario.id).sort(), [...capabilities].sort(), "include each readiness scenario exactly once");
  for (const scenario of record.scenarios) {
    assert.ok(nonempty(scenario.invocation), `record invocation for ${scenario.id}`);
    assert.ok(Array.isArray(scenario.skills) && scenario.skills.length, `record skills used for ${scenario.id}`);
    for (const name of scenario.skills) assert.ok(setup.inventory.skills.some((skill) => skill.name === name), `unknown invoked skill: ${name}`);
    assert.ok(scenario.skills.some((name) => setup.inventory.skills.find((skill) => skill.name === name).capabilities.includes(scenario.id)), `no capable skill invoked for ${scenario.id}`);
    const proof = transcriptRange(transcript, scenario.proof, scenario.id);
    assert.ok(proof.includes(scenario.invocation), `invocation is absent from transcript for ${scenario.id}`);
    for (const name of scenario.skills) assert.ok(proof.includes(name), `transcript must identify invoked skill ${name}`);
  }
  const baseline = read(root, "evidence/commands/baseline.txt");
  assert.ok(baseline.startsWith("Command: npm run test:behavior\n"), "capture the documented baseline command");
  assert.ok(baseline.includes(`Repository commit: ${session.setupCommit}\n`), "baseline must run at the setup commit");
  assert.match(baseline, /\nexit code: 0\s*$/, "baseline command did not succeed");
  const start = Date.parse(baseline.match(/^Started at: (.+)$/m)?.[1]);
  const end = Date.parse(baseline.match(/^Finished at: (.+)$/m)?.[1]);
  assert.ok(Number.isFinite(start) && Number.isFinite(end) && end >= start && start >= Date.parse(session.startedAt), "baseline must be captured during the fresh session");
  assert.match(baseline, /# tests [1-9]\d*/, "baseline must contain actual test output");
  assert.match(baseline, /# fail 0\b/, "baseline must have no failing tests");
  const research = read(root, "evidence/research.md");
  const urls = new Set([...research.matchAll(/https:\/\/[^\s)>]+/g)].map((match) => match[0]));
  assert.ok(urls.size >= 2, "research must link at least two primary-source pages; reviewer checks their authority");
  assert.ok(read(root, "evidence/tdd.md").includes("evidence/commands/baseline.txt"), "link the testing capture in the TDD report");
  return { ...setup, record };
}

export function verifySetupCommit(root, setup) {
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const commit = setup.record.session.setupCommit;
  git(["merge-base", "--is-ancestor", commit, "HEAD"]);
  const prefix = git(["rev-parse", "--show-prefix"]).trim();
  for (const relative of setup.files) {
    assert.equal(normalize(git(["show", `${commit}:${prefix}${relative}`])), read(root, relative), `setup changed after fresh-session start: ${relative}`);
  }
}

export function expandContract(contract, setup) {
  contract.extraEvidence = [...new Set([...(contract.extraEvidence ?? []), ...setup.files, ...(setup.generatedFiles ?? [])])];
  return contract;
}
