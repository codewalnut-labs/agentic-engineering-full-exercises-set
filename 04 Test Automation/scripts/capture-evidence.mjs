import { capture } from "./test-evidence.mjs";
try { process.exitCode = capture(process.cwd(), process.argv[2]); }
catch (error) { console.error(error.message); process.exitCode = 1; }
