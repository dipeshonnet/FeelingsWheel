import { emotionById } from '../shared/emotions.mjs';

// Keep transport and response validation separate from React state updates.
export async function matchFeeling(text, signal, fetchImpl = globalThis.fetch) {
  const response = await fetchImpl('/.netlify/functions/match-feeling', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text.trim() }),
    signal,
  });
  if (response.status === 429) {
    throw new Error('Matching is busy right now. Please wait a minute and try again, or choose a feeling manually.');
  }
  let data;
  try { data = await response.json(); }
  catch { throw new Error('The matching service is unavailable. Please try again, or choose a feeling manually.'); }
  signal.throwIfAborted();
  if (!response.ok) {
    throw new Error(typeof data?.error === 'string' ? data.error : 'We couldn’t make a match. Please try again.');
  }
  if (data?.status === 'clarify' && data.emotionId === null) return null;
  if (data?.status === 'match' && typeof data.emotionId === 'string') {
    const emotion = emotionById.get(data.emotionId);
    if (emotion) return emotion;
  }
  throw new Error('We couldn’t find a clear match. Please try again or choose a feeling manually.');
}
