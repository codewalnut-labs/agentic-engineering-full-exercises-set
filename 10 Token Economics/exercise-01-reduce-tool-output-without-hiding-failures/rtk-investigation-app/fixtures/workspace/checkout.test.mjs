import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutTotal } from './checkout.mjs';
for(let n=1;n<=80;n++)test(`ordinary checkout ${n}`,()=>assert.equal(checkoutTotal(n,0,0),n));
test('CHECKOUT-017 service fees must not receive the merchandise discount',()=>assert.equal(checkoutTotal(100,5,10),95));
