# Validation — September 25, 2026

## September 25 expansion

- Compared the linked reference image with the supplied image and merged its missing branches into the existing catalog. The wheel now has 204 selectable entries: six families, 61 middle-ring feelings, and 137 outer-ring feelings.
- Added original definitions and contextual English–Hindi examples for the reference branches. Existing duplicate words remain distinguishable by their ancestry.
- Updated segment angles so all leaves cover the circle without gaps despite varying group sizes.
- Eight automated checks pass, including catalog coverage, English–Hindi examples, continuous geometry, pointer alignment, and server matching behavior. The TypeScript check and production Vite build pass.
- Verified the expanded wheel and a newly added feeling in the local browser. The wheel is denser than the original; the selector helps explore narrow segments.

## Earlier baseline

## Passed

- TypeScript check and production Vite build.
- Server-side function bundled successfully as Node ESM.
- Eight automated tests covering 114 unique emotion IDs, 6/36/72 ring counts, continuous 360-degree coverage, parent relationships, Hindi examples, all pointer angles and repeat rotations, input validation, catalog-constrained output, clarification, missing credentials, upstream errors, rate limits, and timeouts.
- Browser verification at desktop (1440 × 1000), mobile (390 × 844), and narrow mobile (320 × 740) widths. No horizontal page overflow; the zoomed wheel scrolls within its own frame.
- Manual selector, rotation, fixed hand, highlighted segment, reset, and mobile zoom checked in the browser. English and Hindi examples render successfully.
- Live Groq calls accepted synthetic English, Hindi, and Hinglish descriptions. English and Hindi worry/overload examples returned `fear/anxious`; the Hinglish humiliation example returned the broader `anger/hurt`. The interface presents results as possible matches and supports choosing a more specific feeling manually.
- The browser-to-function-to-Groq flow returned an emotion and displayed its guidance. A synthetic `hello` submission returned clarification without selecting an emotion.
- An actual Groq 429 response was encountered and handled. Missing-key behavior was also checked in the browser before enabling the local server credential.
- No browser console warnings or errors were reported in the checked UI flows.
- Reduced-motion CSS and the matching JavaScript preference check are implemented and inspected; OS-level preference emulation was not available in the browser used for verification.

## Deployment boundary

No Netlify project, domain record, or Cloudflare setting was changed. Hosted function behavior, Netlify's rate-limit enforcement, and custom-domain HTTPS must be verified after the owner deploys. The supplied key is not included in source or delivery archives; set `GROQ_API_KEY` in Netlify before deploying.

Groq quotas may temporarily prevent matching. The local wheel and all written guidance remain available. AI interpretation is not guaranteed to choose the same specificity a visitor would choose.
