import postgres from 'postgres';

let sql;

function getSql() {
  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) throw new Error('SUPABASE_DB_URL is not configured');
  sql ??= postgres(connectionString, { max: 1, prepare: false, ssl: 'require', connect_timeout: 10, idle_timeout: 20 });
  return sql;
}

export async function saveSubmission(text) {
  const db = getSql();
  await db`INSERT INTO private.feeling_submissions (text) VALUES (${text})`;
}
