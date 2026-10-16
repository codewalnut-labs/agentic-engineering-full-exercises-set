import { observeHttp, assertContract } from './observe-contract.mjs';
const actual = await observeHttp(); assertContract(actual);
if (process.argv.includes('--json')) console.log(JSON.stringify(actual, null, 2));
else console.log('PASS 8 HTTP-backed workflow contracts with ordered effects');
