// Uses synthetic descriptions only. Never prints credentials or upstream payloads.
import { createMatcher } from '../server/matcher.mjs';
if (!process.env.GROQ_API_KEY) throw new Error('Set GROQ_API_KEY in your shell before running the optional live check.');
const samples = [
  ['English', 'I have so many tasks due today that I cannot decide where to begin. Everything is too much.', ['fear/anxious/overwhelmed', 'fear/anxious']],
  ['Hindi', 'कल की परीक्षा के नतीजे को लेकर मुझे बार-बार चिंता हो रही है।', ['fear/anxious/worried', 'fear/anxious']],
  ['Hinglish', 'Mere dost ne sabke saamne mera mazaak udaya, mujhe bahut insulted feel hua.', ['fear/humiliated/ridiculed', 'fear/humiliated', 'fear/humiliated/disrespected', 'anger/hurt/embarrassed', 'anger/hurt']],
  ['Ambiguous', 'hello', [null]],
];
const handler = createMatcher();
let failed = false;
for (const [language, text, expected] of samples) {
  if (process.argv.length > 2 && !process.argv.slice(2).includes(language)) continue;
  const response = await handler(new Request('http://localhost/.netlify/functions/match-feeling', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }));
  const result = await response.json();
  const pass = response.ok && expected.includes(result.emotionId);
  console.log(`${language}: ${pass ? 'PASS' : 'CHECK'} — HTTP ${response.status}, ${result.status || 'service error'}, ${result.emotionId || 'no match'}`);
  if (!pass) failed = true;
}
if (failed) process.exitCode = 1;
