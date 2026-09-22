import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const normalizedHash = (value) => createHash("sha256").update(String(value).replaceAll("\r\n", "\n")).digest("hex");

export function sourceEntries(appRoot) {
  const files = [];
  function visit(relative) {
    const absolute = path.join(appRoot, relative);
    const stat = fs.lstatSync(absolute);
    if (stat.isSymbolicLink()) throw new Error(`snapshot inputs cannot be symlinks: ${relative}`);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(absolute).sort()) visit(relative + "/" + name);
    } else if (stat.isFile()) {
      files.push([relative, normalizedHash(fs.readFileSync(absolute, "utf8"))]);
    }
  }
  for (const relative of ["src", "tests", "scripts", "package.json", "package-lock.json", "tsconfig.json", "vite.config.ts"]) visit(relative);
  return files.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
}

export function sourceSnapshot(appRoot) {
  return normalizedHash(JSON.stringify(sourceEntries(appRoot)));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(sourceSnapshot(path.resolve(import.meta.dirname, "..")));
}
