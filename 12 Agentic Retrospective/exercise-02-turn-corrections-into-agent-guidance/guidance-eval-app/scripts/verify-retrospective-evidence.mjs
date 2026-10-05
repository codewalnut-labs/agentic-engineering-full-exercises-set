import { runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { validateRetrospectiveEvidence } from "../../../scripts/retrospective-evidence.mjs";
await runEvidence({ appRoot: process.cwd(), validate: validateRetrospectiveEvidence });
