# Feelings Wheel · Everyday AI

An interactive reflection tool for [feelings.everydayai.work](https://feelings.everydayai.work/). Explore 204 feelings across six families, describe what is on your mind for a possible AI match, and read examples in English with Hindi or Spanish. Each feeling has a short explanation and gentle suggestions for what to try next. You can use the wheel without AI matching.

The catalog combines the original wheel with branches from the [reference wheel](https://feelingswheel.netlify.app/) and supplied image. Definitions, examples, and guidance are original copy. AI matching uses Groq; the guidance is written in advance. This is a reflection aid, not a clinical assessment.

## Deploy from GitHub to Netlify

This website includes a Netlify Function for AI matching. Connect this repository to Netlify. Uploading only `dist` will not include the function.

1. Connect the [FeelingsWheel repository](https://github.com/dipeshonnet/FeelingsWheel) to a **new Netlify project**. Keep the main Everyday AI project separate.
2. Leave the base directory empty because this project's files are at the repository root.
3. Use build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`. The supplied `netlify.toml` specifies these values. Use Node 22.
4. In Netlify's environment variables, add **`GROQ_API_KEY`** with your Groq key as its value. Give it the **Functions** scope when scope controls are available. Optionally set `GROQ_MODEL` to `openai/gpt-oss-20b`; this is already the default. Never use a `VITE_` prefix for a secret.
5. Deploy or redeploy after setting the key. Confirm that **match-feeling** appears in Netlify's Functions list and that the deploy log validates the rate-limit rule.
6. At the Netlify address, submit a short example and check that the wheel turns and guidance appears. Then connect `feelings.everydayai.work` using your Netlify and Cloudflare settings.

Official references: [Netlify Functions](https://docs.netlify.com/build/functions/get-started/), [server-side environment variables](https://docs.netlify.com/build/functions/environment-variables/), [Groq structured outputs](https://console.groq.com/docs/structured-outputs).

## Run locally

```sh
npm install
```

For full AI matching, copy `.env.example` to `.env` and enter your key there. This file is ignored and must never be shared. Then:

```sh
npm run dev:full
```

Open **http://127.0.0.1:5180**. Without a key, the wheel, selector, examples, and guidance still work; submitting a description explains that matching is not configured. `npm run dev` runs only the frontend and expects a local function server at port 5181. Alternatively, use `npx netlify-cli dev` to test within Netlify's environment.

## How it works

- Desktop gives the wheel a little more than half the layout width; mobile stacks input, wheel, and guidance.
- The hand stays fixed while the wheel rotates to the selected segment's midpoint over three seconds. Reduced-motion settings remove the rotation animation.
- Repeated words have ancestry-based IDs (for example, `fear/insecure/inadequate` and `fear/rejected/inadequate`).
- Clicking a segment or using the keyboard-accessible selector explores the same content without an AI call.
- The language control switches the second set of examples and feeling names between Hindi and Spanish. The preference is stored in the browser.
- The function accepts `POST /.netlify/functions/match-feeling` with `{ "text": "..." }`, up to 1,000 characters. It returns `{ "status": "match", "emotionId": "..." }` or `{ "status": "clarify", "emotionId": null }`. Errors return `{ "error": "..." }` and an appropriate HTTP status.
- The server restricts responses to the wheel's catalog and validates them again before returning them. Provider errors and credentials are never forwarded to visitors.
- No descriptions or selections are saved in cookies, browser storage, a database, or application logs. Descriptions are sent to Groq, whose own data practices apply. No analytics or third-party frontend assets are included.
- A Netlify rate-limit rule allows 10 requests per minute per IP and domain. Groq account quotas also apply; no frontend code can bypass them.
- Some reference labels describe responses or states rather than emotions. They are preserved as requested. This is a reflection aid, not a clinical assessment.

## Checks

```sh
npm test
npm run build
```

The automated checks cover hierarchy and label counts, English–Hindi content, every pointer angle, repeat rotations, request validation, structured responses, clarification, missing configuration, timeouts, invalid output, and upstream rate limits.

Optional live check (uses a small amount of your Groq quota): set `GROQ_API_KEY` in your shell and run `node scripts/live-check.mjs`. It sends synthetic English, Hindi, Hinglish, and ambiguous examples and prints only status and matched emotion IDs.

The existing main website is separate and unchanged by this project.
