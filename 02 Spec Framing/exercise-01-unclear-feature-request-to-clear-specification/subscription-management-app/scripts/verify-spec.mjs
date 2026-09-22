import path from "node:path";
import { validateDocuments } from "./spec-validation.mjs";

try {
  validateDocuments(path.resolve(import.meta.dirname, "../.."));
  console.log("Specification structure, decision dependencies, criteria, and review dispositions verified.");
} catch (error) {
  console.error(`Specification verification failed: ${error.message}`);
  process.exitCode = 1;
}
