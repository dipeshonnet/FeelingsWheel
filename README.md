# Feelings Wheel · Everyday AI

This folder is the standalone [FeelingsWheel repository](https://github.com/dipeshonnet/FeelingsWheel). It contains only the Feelings Wheel frontend, emotion catalog, matching backend, Supabase schema, tests, and deployment configuration. The Everyday AI marketing website belongs in the separate `EverydayAIWebsite` project and [EverydayAI repository](https://github.com/dipeshonnet/EverydayAI).

The Everyday AI branding and links point to the main website; they do not import its code. All application imports and build inputs are local to this folder or declared in `package.json`. Run commands from this folder, and leave the Netlify base directory empty.

An interactive reflection tool for [feelings.everydayai.work](https://feelings.everydayai.work/). Explore 204 feelings across six families, describe what is on your mind for a possible AI match, and read examples in English with Hindi or Spanish. Each feeling has a short explanation and gentle suggestions for what to try next. You can use the wheel without AI matching.

The catalog combines the original wheel with branches from the [reference wheel](https://feelingswheel.netlify.app/) and supplied image. Definitions, examples, and guidance are original copy. AI matching uses Groq; the guidance is written in advance. This is a reflection aid, not a clinical assessment.

## Deploy from GitHub to Netlify

This website includes a Netlify Function for AI matching and Supabase Postgres for submitted descriptions. Connect this repository to Netlify. Uploading only `dist` will not include the function.

1. Connect the [FeelingsWheel repository](https://github.com/dipeshonnet/FeelingsWheel) to a **new Netlify project**. Keep the main Everyday AI project separate.
2. Leave the base directory empty because this project's files are at the repository root.
3. Use build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`. The supplied `netlify.toml` specifies these values. Use Node 22.
4. Create a Supabase project. In its **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql) once. If Supabase asks about Row Level Security, choose **Run and enable RLS**. The table lives in the `private` schema; do not add that schema to the Supabase Data API's exposed schemas.
5. In Supabase, choose **Connect → Transaction pooler** and copy the Postgres connection string (port 6543). Replace its password placeholder with the database password. In Netlify's environment variables, set **`SUPABASE_DB_URL`** to that string and **`GROQ_API_KEY`** to your Groq key. Give them **Functions** scope when scope controls are available. Database TLS verifies the certificate and hostname. If the database uses a CA not trusted by Node, set `SUPABASE_DB_CA` to the provider's trusted PEM CA certificate (preserving newlines); certificate failures skip optional saving while matching continues. Never disable verification. Optionally set `GROQ_MODEL` to `openai/gpt-oss-20b`; this is already the default. Never use a `VITE_` prefix for secrets.
6. Deploy or redeploy after setting the variables. Confirm that **match-feeling** appears in Netlify's Functions list and that the deploy log validates the rate-limit rule.
7. At the Netlify address, submit a short example and check that the wheel turns and guidance appears. In Supabase's SQL Editor, run `select created_at, text from private.feeling_submissions order by created_at desc limit 10;` and confirm the submission appears. Then connect `feelings.everydayai.work` using your Netlify and Cloudflare settings.

Official references: [Netlify Functions](https://docs.netlify.com/build/functions/get-started/), [Supabase Postgres connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [server-side environment variables](https://docs.netlify.com/build/functions/environment-variables/), [Groq structured outputs](https://console.groq.com/docs/structured-outputs).

## Run locally

```sh
npm install
```

For full AI matching, copy `.env.example` to `.env` and enter your Groq key. Optionally add your Supabase transaction-pooler URL to save submissions. This file is ignored and must never be shared. `npm run dev:full` needs `GROQ_API_KEY` configured in `.env`; `SUPABASE_DB_URL` is optional.

```sh
npm run dev:full
```

Open **http://127.0.0.1:5180**. Without a key, the wheel, selector, examples, and guidance still work; submitting a description explains that matching is not configured. `npm run dev` runs only the frontend and expects a local function server at port 5181.

## How it works

- Desktop gives the wheel a little more than half the layout width; mobile stacks input, wheel, and guidance.
- The hand stays fixed while the wheel rotates to the selected segment's midpoint over three seconds. Reduced-motion settings remove the rotation animation.
- Repeated words have ancestry-based IDs (for example, `fear/insecure/inadequate` and `fear/rejected/inadequate`).
- Clicking a segment or using the keyboard-accessible selector explores the same content without an AI call.
- The language control switches the second set of examples and feeling names between Hindi and Spanish. The preference is stored in the browser.
- The function accepts `POST /.netlify/functions/match-feeling` with `{ "text": "..." }`, up to 1,000 characters. A 12,000-byte body limit is enforced while reading, before parsing or calling storage/Groq. It returns `{ "status": "match", "emotionId": "..." }` or `{ "status": "clarify", "emotionId": null }`. Errors return `{ "error": "..." }` and an appropriate HTTP status.
- The server restricts responses to the wheel's catalog and validates them again before returning them. Provider errors and credentials are never forwarded to visitors.
- The function attempts to store each valid submitted description in Supabase Postgres in `private.feeling_submissions`, with a database-generated `created_at` timestamp, before matching. If saving fails or storage is not configured, matching continues without showing a storage error to the visitor. Successfully saved submissions remain available even if Groq fails. Typing without submitting is not saved. Selections are not stored. Descriptions are also sent to Groq, whose own data practices apply.
- To inspect saved entries, query `select created_at, text from private.feeling_submissions order by created_at desc;` in the Supabase SQL Editor. There is no public endpoint for reading entries.
- A Netlify rate-limit rule allows 10 requests per minute per IP and domain. Groq account quotas also apply; no frontend code can bypass them.
- Some reference labels describe responses or states rather than emotions. They are preserved as requested. This is a reflection aid, not a clinical assessment.

## Frontend maintenance

`src/main.tsx` assembles the page and owns the draft text and language preference. `useFeelingCheckIn.ts` owns selection, rotation, matching, and timer cleanup; `matchFeeling.mjs` handles transport and validates responses before state is updated. `WheelSection.tsx` and `GuidancePanel.tsx` are memoized with stable callbacks so typing does not rerender them. Fixed SVG paths, label positions, and ancestry titles are calculated once in `wheelGeometry.mjs`; selector options are also prepared once.

## Checks

```sh
npm test
npm run build
```

The automated checks cover hierarchy and label counts, English–Hindi content, every pointer angle, repeat rotations, cached label positions, frontend response validation and cancellation during parsing, request validation, structured responses, clarification, missing configuration, timeouts, invalid output, and upstream rate limits.

Optional live check (uses a small amount of your Groq quota): set `GROQ_API_KEY` in your shell and run `node scripts/live-check.mjs`. It sends synthetic English, Hindi, Hinglish, and ambiguous examples and prints only status and matched emotion IDs.

The existing main website is separate and unchanged by this project.
