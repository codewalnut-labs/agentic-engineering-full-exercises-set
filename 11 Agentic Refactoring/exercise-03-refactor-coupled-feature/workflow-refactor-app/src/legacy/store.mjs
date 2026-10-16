import { request } from './transport.mjs';
export const find = id => request('GET', '/items/' + encodeURIComponent(id));
export const save = item => request('PUT', '/items/' + encodeURIComponent(item.id), item);
