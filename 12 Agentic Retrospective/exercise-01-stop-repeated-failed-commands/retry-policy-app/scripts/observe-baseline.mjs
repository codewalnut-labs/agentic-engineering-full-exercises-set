import fs from "node:fs";
import { analyzeSession } from "../src/retro/analyzeSession.mjs";
const events = JSON.parse(fs.readFileSync(new URL("../../docs/session-events.json", import.meta.url), "utf8"));
console.log(JSON.stringify(analyzeSession(events), null, 2));
console.log("PASS observed the supplied analyzer; these are uncorrected starter metrics");
