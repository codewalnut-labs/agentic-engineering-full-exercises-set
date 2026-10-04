import { runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { validateReviewEvidence } from "../../../scripts/pr-review-evidence.mjs";

await runEvidence({ appRoot: process.cwd(), validate: validateReviewEvidence });
