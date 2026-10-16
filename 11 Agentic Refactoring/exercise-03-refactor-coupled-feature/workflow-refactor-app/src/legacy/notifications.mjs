import { request } from './transport.mjs';
export const send = event => request('POST', '/notifications', event);
