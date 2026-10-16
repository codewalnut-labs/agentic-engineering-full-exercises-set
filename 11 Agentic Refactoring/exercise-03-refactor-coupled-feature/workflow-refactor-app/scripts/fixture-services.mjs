import http from 'node:http';
import { memoryAdapters } from './scenarios.mjs';
export async function withServices(scenario, action) {
  const state = memoryAdapters(scenario);
  const server = http.createServer(async (req, res) => {
    try {
      const buffers = []; for await (const chunk of req) buffers.push(chunk);
      const body = buffers.length ? JSON.parse(Buffer.concat(buffers)) : undefined;
      let value;
      if (req.method === 'GET' && req.url.startsWith('/items/')) value = await state.adapters.repository.find(decodeURIComponent(req.url.slice(7)));
      else if (req.method === 'PUT' && req.url.startsWith('/items/')) value = await state.adapters.repository.save(body);
      else if (req.method === 'POST' && req.url === '/risk') value = await state.adapters.risk.check(body);
      else if (req.method === 'POST' && req.url === '/notifications') value = await state.adapters.notifications.send(body);
      else { res.writeHead(404); res.end(JSON.stringify({ error: 'Unknown fixture route' })); return; }
      res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(value));
    } catch (error) { res.writeHead(error.status ?? 500, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: error.message })); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const old = process.env.WORKFLOW_BACKEND_URL;
  process.env.WORKFLOW_BACKEND_URL = 'http://127.0.0.1:' + server.address().port;
  try { return await action(state); }
  finally {
    if (old === undefined) delete process.env.WORKFLOW_BACKEND_URL; else process.env.WORKFLOW_BACKEND_URL = old;
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
  }
}
