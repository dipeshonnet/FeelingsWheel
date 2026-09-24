# Feelings Wheel · Everyday AI

A standalone feelings wheel for **https://feelings.everydayai.work**. The SVG recreates all 114 labels and their relationships from the supplied reference: six families, 36 middle-ring feelings, and 72 outer-ring feelings. Groq chooses a possible match; the examples and guidance are written locally in advance.

## Publish on Netlify

This website includes a server-side function. **Uploading only `dist` through Netlify Drop will not enable AI matching.** Use either deployment method below. No hosting settings have been changed for you.

### Option 1 — Connect a Git repository

1. Add this project to your Git repository, including `netlify`, `server`, `shared`, and `pnpm-lock.yaml`. Keep `.env`, `node_modules`, and `output` excluded.
2. In Netlify, create a **new project** from that repository. Do not replace the main Everyday AI project.
3. If this folder remains inside the existing EverydayAIWebsite repository, set the **base directory to `feelings-site`**. If this project's files are at the root of a separate repository, leave the base directory empty.
4. Use build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`, relative to the base directory. The supplied `netlify.toml` specifies these values. Use Node 22.
5. In Netlify's environment variables, add **`GROQ_API_KEY`** with your Groq key as its value. Give it the **Functions** scope when scope controls are available. Optionally set `GROQ_MODEL` to `openai/gpt-oss-20b`; this is already the default. Never use a `VITE_` prefix for a secret.
6. Deploy or redeploy after setting the key. Confirm that **match-feeling** appears in Netlify's Functions list and that the deploy log validates the rate-limit rule.
7. At the Netlify address, submit a short example and check that the wheel turns and guidance appears. Then connect `feelings.everydayai.work` using your Netlify and Cloudflare settings.

### Option 2 — Deploy from your computer

Install Node 22 and npm. Open a terminal **inside this folder**, then run:

```sh
npm install
npm run build
npx netlify-cli login
npx netlify-cli init
```

Choose a new project during setup. Add `GROQ_API_KEY` in that project's Netlify environment settings. Then deploy both the frontend and function:

```sh
npx netlify-cli deploy --build --prod
```

If the tool asks for a publish directory, use `dist`. The configuration supplies the function directory; do not omit the function from deployment. Your source ZIP contains everything needed for either method, but not the API key.

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

- Desktop uses a 3:1 wheel-to-panel layout when space permits; mobile stacks input, wheel, and guidance.
- The hand stays fixed while the wheel rotates to the selected segment's midpoint over three seconds. Reduced-motion settings remove the rotation animation.
- Repeated words have ancestry-based IDs (for example, `fear/insecure/inadequate` and `fear/rejected/inadequate`).
- Clicking a segment or using the keyboard-accessible selector explores the same content without an AI call. Zoom controls enlarge the wheel; its frame can be scrolled with touch or keyboard.
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

## Files to deliver

- `feelings-site-source.zip`: full source and Netlify Function, excluding credentials and installed dependencies.
- `feelings-site-frontend.zip`: built static frontend only; useful for static preview, not sufficient for AI matching.
- `dist/`: production frontend build.

The existing main website is separate and unchanged by this project.
