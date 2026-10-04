import { runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { validateCodeReviewEvidence } from "../../../scripts/code-review-evidence.mjs";
await runEvidence({ appRoot: process.cwd(), validate: validateCodeReviewEvidence });
