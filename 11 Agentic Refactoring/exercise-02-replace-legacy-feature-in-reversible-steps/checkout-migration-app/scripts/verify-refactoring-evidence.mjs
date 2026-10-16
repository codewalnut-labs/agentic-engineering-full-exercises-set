import { runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { validatePhaseEvidence } from "../../../../scripts/challenge-phase-evidence.mjs";
await runEvidence({ appRoot: process.cwd(), validate: validatePhaseEvidence });
