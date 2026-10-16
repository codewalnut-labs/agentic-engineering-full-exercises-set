import { runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { validateEconomicsEvidence } from "../../../scripts/economics-evidence.mjs";
await runEvidence({ appRoot: process.cwd(), validate: validateEconomicsEvidence });
