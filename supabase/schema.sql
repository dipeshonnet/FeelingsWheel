-- Run once in the Supabase SQL Editor. Keep this schema out of API > Exposed schemas.
create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon, authenticated;

create table if not exists private.feeling_submissions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  text text not null check (char_length(text) between 1 and 1000)
);

revoke all on private.feeling_submissions from anon, authenticated;
