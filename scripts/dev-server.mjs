import { createServer as createHttpServer } from 'node:http';
import { createServer as createViteServer } from 'vite';
import { createMatcher } from '../server/matcher.mjs';
import { saveSubmission } from '../server/submissions.mjs';
import { existsSync } from 'node:fs';
if (existsSync('.env')) process.loadEnvFile('.env');
const handler = createMatcher({ saveSubmission });
const api = createHttpServer(async (request, response) => {
  if (request.url !== '/.netlify/functions/match-feeling') { response.writeHead(404).end(); return; }
  try {
    const chunks = []; let bytes = 0;
    for await (const chunk of request) { bytes += chunk.length; if (bytes > 16000) { response.writeHead(413).end(); return; } chunks.push(chunk); }
    const body = Buffer.concat(chunks);
    const result = await handler(new Request('http://127.0.0.1:5181' + request.url, { method: request.method, headers: request.headers, ...(request.method !== 'GET' && request.method !== 'HEAD' ? { body } : {}) }));
    response.writeHead(result.status, Object.fromEntries(result.headers)); response.end(await result.text());
  } catch { response.writeHead(500, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'The local matching service could not complete the request.' })); }
});
api.listen(5181, '127.0.0.1');
const vite = await createViteServer(); await vite.listen(); vite.printUrls();
console.log('Local matching service ready. Descriptions are not logged. Configure SUPABASE_DB_URL to save submissions.');
async function close() { await vite.close(); api.close(); process.exit(0); }
process.on('SIGINT', close); process.on('SIGTERM', close);
