import postgres from 'postgres';
import { isIP } from 'node:net';
import { checkServerIdentity } from 'node:tls';

let sql;

export function databaseOptions(env = process.env) {
  // Postgres.js ssl: 'require' encrypts traffic but disables certificate checks.
  const ssl = { rejectUnauthorized: true };
  if (env.SUPABASE_DB_CA?.trim()) ssl.ca = env.SUPABASE_DB_CA;
  if (env.SUPABASE_DB_URL) {
    const hostname = new URL(env.SUPABASE_DB_URL).hostname.replace(/^\[|\]$/g, '');
    // Postgres.js omits SNI for IP addresses; bind identity checks to the actual IP.
    if (isIP(hostname)) ssl.checkServerIdentity = (_name, cert) => checkServerIdentity(hostname, cert);
  }
  return { max: 1, prepare: false, ssl, connect_timeout: 10, idle_timeout: 20 };
}

function getSql() {
  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) throw new Error('SUPABASE_DB_URL is not configured');
  sql ??= postgres(connectionString, databaseOptions());
  return sql;
}

export async function saveSubmission(text) {
  const db = getSql();
  await db`INSERT INTO private.feeling_submissions (text) VALUES (${text})`;
}
