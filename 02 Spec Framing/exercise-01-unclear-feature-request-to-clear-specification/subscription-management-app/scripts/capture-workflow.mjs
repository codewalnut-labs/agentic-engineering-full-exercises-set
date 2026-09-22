import path from "node:path";
import { captureStage } from "./workflow-validation.mjs";

try {
  const stage = process.argv[2];
  captureStage(path.resolve(import.meta.dirname, "../.."), stage);
  console.log(`Captured ${stage} output. Retain the real invocation transcript separately.`);
} catch (error) {
  console.error(`Workflow capture failed: ${error.message}`);
  process.exitCode = 1;
}
