import test from 'node:test';
import assert from 'node:assert/strict';
import postgres from 'postgres';
import { databaseOptions } from '../server/submissions.mjs';
import { createServer } from 'node:net';
import { createSecureContext, TLSSocket } from 'node:tls';
import { readFileSync } from 'node:fs';

test('database TLS verification cannot be downgraded by connection-string ssl options', async () => {
  for (const query of ['', '?sslmode=require', '?sslmode=disable', '?ssl=prefer']) {
    // Inspect the actual driver's effective options without connecting to a database.
    const db = postgres(`postgres://fixture:dummy@localhost/test${query}`, databaseOptions({}));
    try {
      assert.equal(db.options.ssl.rejectUnauthorized, true);
      assert.equal(db.options.ssl.checkServerIdentity, undefined); // Node's hostname check stays enabled.
      assert.equal(db.options.ssl.ca, undefined); // Default trusted roots.
    } finally { await db.end(); }
  }
});

test('actual database TLS rejects an untrusted certificate and wrong hostname before startup data', { timeout: 10000 }, async () => {
  const cert = readFileSync(new URL('./fixtures/localhost-test-cert.pem', import.meta.url), 'utf8');
  const key = readFileSync(new URL('./fixtures/localhost-test-key.pem', import.meta.url), 'utf8');
  const secureContext = createSecureContext({ cert, key });
  for (const scenario of [
    { host: 'localhost', env: {}, error: /self.signed certificate/i, startup: false },
    { host: '127.0.0.1', env: { SUPABASE_DB_CA: cert }, error: /IP.*not.*cert/i, startup: false },
    { host: 'localhost', env: { SUPABASE_DB_CA: cert }, startup: true },
  ]) {
    let startup = false;
    const sockets = new Set();
    const server = createServer(socket => {
      sockets.add(socket);
      socket.on('error', () => {});
      socket.once('data', data => {
        assert.equal(data.readInt32BE(4), 80877103); // PostgreSQL SSLRequest.
        socket.write('S');
        const secured = new TLSSocket(socket, { isServer: true, secureContext });
        sockets.add(secured);
        secured.on('error', () => {});
        secured.once('data', () => {
          startup = true;
          // AuthenticationOk and ReadyForQuery make the fake connection usable.
          secured.write(Buffer.from('5200000008000000005a0000000649', 'hex'));
          secured.once('data', () => secured.destroy());
        });
      });
    });
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    const url = `postgres://fixture:dummy@${scenario.host}:${server.address().port}/test`;
    const db = postgres(url, {
      ...databaseOptions({ ...scenario.env, SUPABASE_DB_URL: url }), connect_timeout: 2, fetch_types: false,
    });
    try {
      // The fake server deliberately closes when queried, without a SQL result.
      await assert.rejects(db`select 1`, scenario.error);
      assert.equal(startup, scenario.startup);
    } finally {
      for (const socket of sockets) socket.destroy();
      await db.end({ timeout: 0 });
      await new Promise(resolve => server.close(resolve));
    }
  }
});

test('custom database trust roots retain certificate and hostname verification', async () => {
  const ca = 'test-only CA placeholder';
  const db = postgres('postgres://fixture:dummy@localhost/test?sslmode=require', databaseOptions({ SUPABASE_DB_CA: ca }));
  try {
    assert.equal(db.options.ssl.ca, ca);
    assert.equal(db.options.ssl.rejectUnauthorized, true);
    assert.equal(db.options.ssl.checkServerIdentity, undefined);
  } finally { await db.end(); }
  assert.equal(databaseOptions({ SUPABASE_DB_CA: '   ' }).ssl.ca, undefined);
});
