import { request } from './transport.mjs';
export const check = decision => request('POST', '/risk', decision);
