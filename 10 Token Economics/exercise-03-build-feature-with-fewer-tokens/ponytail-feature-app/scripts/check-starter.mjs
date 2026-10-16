import fs from "node:fs";
import assert from "node:assert/strict";
const lab=JSON.parse(fs.readFileSync("lab-contract.json","utf8"));
assert.equal(lab.title,"Build the Same Feature with Fewer Tokens");
for(const key of ["entities","seededDefects","verificationGates","agentWorkflow","workingDeliverables"]) assert.ok(lab[key].length>=3);
JSON.parse(fs.readFileSync("evidence-contract.json","utf8"));
console.log("PASS starter framework and baseline observation; learner task remains unsolved");
