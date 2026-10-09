import test from 'node:test';
import assert from 'node:assert/strict';
import { matchFeeling } from '../src/matchFeeling.mjs';
import { segments, segmentById } from '../src/wheelGeometry.mjs';
import { emotions, emotionPath } from '../shared/emotions.mjs';

const reply = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });
const match = fetchImpl => matchFeeling('  I feel worried  ', new AbortController().signal, fetchImpl);

test('cached segments retain catalog coverage, ancestry and label positions inside each ring', () => {
  assert.equal(segments.length, emotions.length);
  assert.equal(segmentById.size, emotions.length);
  for (const segment of segments) {
    const { emotion, x, y, path } = segment;
    assert.equal(segmentById.get(emotion.id), segment);
    assert.equal(segment.title, emotionPath(emotion));
    assert.ok(!/NaN|undefined|Infinity/.test(path));
    const radius = Math.hypot(x - 500, y - 500);
    const [inner, outer] = [[0, 168], [168, 326], [326, 480]][emotion.depth];
    assert.ok(radius > inner && radius < outer);
    const angle = Math.atan2(x - 500, 500 - y) * 180 / Math.PI;
    const delta = ((angle - segment.middle + 180) % 360 + 360) % 360 - 180;
    assert.ok(Math.abs(delta) < 0.000001);
  }
});

test('frontend transport trims input and returns only catalog matches or clarification', async () => {
  const emotion = await match(async (url, options) => {
    assert.equal(url, '/.netlify/functions/match-feeling');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), { text: 'I feel worried' });
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify({ status: 'match', emotionId: 'fear/anxious/worried' }));
  });
  assert.equal(emotion.id, 'fear/anxious/worried');
  assert.equal(await match(reply({ status: 'clarify', emotionId: null })), null);
});

test('frontend rejects malformed, unknown and inconsistent responses with useful errors', async () => {
  for (const body of [null, {}, { status: 'match', emotionId: 'invented' }, { status: 'clarify', emotionId: 'happy' }]) {
    await assert.rejects(match(reply(body)), /clear match/);
  }
  await assert.rejects(match(async () => new Response('bad json')), /unavailable/);
  await assert.rejects(match(reply({ error: 'Try later' }, 503)), /Try later/);
  await assert.rejects(match(reply({ error: { detail: 'bad' } }, 503)), /couldn’t make a match/);
  await assert.rejects(match(reply(null, 429)), /wait a minute/);
});

test('cancellation while parsing the response cannot produce a late match', async () => {
  const request = new AbortController();
  const pending = matchFeeling('worried', request.signal, async () => ({
    status: 200,
    ok: true,
    json: async () => {
      request.abort();
      return { status: 'match', emotionId: 'fear/anxious/worried' };
    },
  }));
  await assert.rejects(pending, { name: 'AbortError' });
});
