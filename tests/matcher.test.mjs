import test from 'node:test';
import assert from 'node:assert/strict';
import { createMatcher } from '../server/matcher.mjs';
import { emotions, emotionById, rotationFor, roots } from '../shared/emotions.mjs';
const request = (text = 'I feel worried about tomorrow') => new Request('https://example.test/.netlify/functions/match-feeling', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
const success = result => new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(result) } }] }));
const matcher = (fetchImpl, options = {}) => createMatcher({ fetchImpl, getKey: () => 'test-placeholder', ...options });

test('expanded wheel contains the supplied branches and unique ancestral IDs', () => {
  assert.equal(roots.length, 6); assert.equal(emotions.filter(e => e.depth === 1).length, 61); assert.equal(emotions.filter(e => e.depth === 2).length, 137); assert.equal(emotionById.size, 204);
  const leaves = emotions.filter(e => e.depth === 2);
  assert.ok(Math.abs(leaves.reduce((sum, e) => sum + e.end - e.start, 0) - 360) < 0.000001);
  for (const [index, emotion] of leaves.entries()) { assert.ok(Math.abs(emotion.end - emotion.start - 360 / leaves.length) < 0.000001); if (index) assert.equal(emotion.start, leaves[index - 1].end); }
  for (const emotion of emotions) {
    assert.equal(emotion.examples.length, 2); assert.ok(emotion.actions.length >= 2);
    for (const example of emotion.examples) { assert.ok(example[0].length > 15); assert.match(example[1], /[\u0900-\u097f]/); }
    if (emotion.parent) { const parent = emotionById.get(emotion.parent); assert.ok(parent); assert.ok(emotion.start >= parent.start - 0.000001 && emotion.end <= parent.end + 0.000001); }
  }
  assert.equal(emotions.filter(e => e.label === 'Inadequate').length, 2);
  for (const id of ['happy/respected/valued', 'happy/playful/aroused', 'anger/let-down/betrayed', 'sad/sorrow/grief', 'fear/helpless/lost', 'disgust/contempt/scornful', 'surprise/startled/moved']) assert.ok(emotionById.has(id), id);
  assert.notEqual(emotionById.get('happy/respected/valued').description, emotionById.get('happy/respected/valued').recognize);
});
test('every segment aligns its midpoint under the fixed hand, including repeat selections', () => {
  let rotation = 0;
  for (const emotion of [...emotions, ...emotions].reverse()) {
    const next = rotationFor(rotation, emotion);
    assert.ok(next >= rotation + 360);
    const alignment = ((next + (emotion.start + emotion.end) / 2) % 360 + 360) % 360;
    assert.ok(alignment < 0.00001); rotation = next;
  }
});
test('valid English, Hindi and Hinglish input is sent as data; result stays in catalog', async () => {
  for (const text of ['I worry about tomorrow.', 'मुझे कल की चिंता है।', 'Kal ko lekar tension hai.']) {
    const handler = matcher(async (url, options) => {
      assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions');
      const body = JSON.parse(options.body); assert.equal(body.messages[1].content, text);
      assert.equal(body.response_format.json_schema.strict, true);
      return success({ status: 'match', emotionId: 'fear/anxious/worried' });
    });
    const response = await handler(request(text)); assert.equal(response.status, 200); assert.equal((await response.json()).emotionId, 'fear/anxious/worried'); assert.equal(response.headers.get('cache-control'), 'no-store');
  }
});
test('empty, non-string, oversized, malformed and wrong-method requests do not call Groq', async () => {
  const handler = matcher(() => { throw new Error('must not call'); });
  for (const text of ['', '   ', null, 5, 'x'.repeat(1001)]) assert.equal((await handler(request(text))).status, 400);
  assert.equal((await handler(new Request('https://example.test'))).status, 405);
  assert.equal((await handler(new Request('https://example.test', { method: 'POST', body: '{}' }))).status, 415);
  assert.equal((await handler(new Request('https://example.test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' }))).status, 400);
});
test('clarification does not invent an emotion', async () => { const response = await matcher(async () => success({ status: 'clarify', emotionId: null }))(request('hello')); assert.deepEqual(await response.json(), { status: 'clarify', emotionId: null }); });
test('unknown emotion and inconsistent model response are rejected', async () => {
  for (const result of [{ status: 'match', emotionId: 'invented' }, { status: 'clarify', emotionId: 'happy' }, { status: 'match', emotionId: null }]) assert.equal((await matcher(async () => success(result))(request())).status, 502);
});
test('missing credentials, upstream errors, rate limits and malformed JSON are safe', async () => {
  assert.equal((await matcher(() => {}, { getKey: () => '' })(request())).status, 503);
  for (const [upstream, expected] of [[401, 503], [403, 503], [429, 429], [500, 502]]) {
    const response = await matcher(async () => new Response('private upstream details', { status: upstream }))(request()); assert.equal(response.status, expected); assert.ok(!(await response.text()).includes('private upstream details'));
  }
  assert.equal((await matcher(async () => new Response('not json'))(request())).status, 502);
});
test('timed-out upstream requests return a retryable response', async () => {
  const response = await matcher((url, { signal }) => new Promise((resolve, reject) => { signal.addEventListener('abort', () => reject(new Error('aborted'))); }), { timeoutMs: 5 })(request()); assert.equal(response.status, 504);
});
