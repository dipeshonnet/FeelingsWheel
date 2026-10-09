import { useCallback, useEffect, useRef, useState } from 'react';
import { rotationFor, type Emotion } from '../shared/emotions.mjs';
import { matchFeeling } from './matchFeeling.mjs';

const REQUEST_TIMEOUT_MS = 25000;
const ROTATION_DURATION_MS = 3050;

export function useFeelingCheckIn() {
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [notice, setNotice] = useState('');
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState<'manual' | 'ai'>('manual');
  const controller = useRef<AbortController | null>(null);
  const requestTimer = useRef<ReturnType<typeof setTimeout>>();
  const animationTimer = useRef<ReturnType<typeof setTimeout>>();

  const cancelRequest = useCallback(() => {
    controller.current?.abort();
    controller.current = null;
    clearTimeout(requestTimer.current);
  }, []);

  useEffect(() => () => {
    cancelRequest();
    clearTimeout(animationTimer.current);
  }, [cancelRequest]);

  const selectEmotion = useCallback((emotion: Emotion, from: 'manual' | 'ai' = 'manual') => {
    setSelected(emotion);
    setSource(from);
    setNotice('');
    setIsError(false);
    setRotation(current => rotationFor(current, emotion));
    clearTimeout(animationTimer.current);
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setSpinning(animate);
    if (animate) animationTimer.current = setTimeout(() => setSpinning(false), ROTATION_DURATION_MS);
  }, []);

  const reset = useCallback(() => {
    cancelRequest();
    clearTimeout(animationTimer.current);
    setSpinning(false);
    setLoading(false);
    setSelected(null);
    setNotice('');
    setIsError(false);
  }, [cancelRequest]);

  async function submit(text: string) {
    if (controller.current || loading || spinning) return;
    if (!text.trim()) {
      setNotice('Tell us a little about what’s happening, or choose a feeling below the wheel.');
      setIsError(true);
      return;
    }
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setNotice('');
    setIsError(false);
    requestTimer.current = setTimeout(() => request.abort(), REQUEST_TIMEOUT_MS);
    try {
      const emotion = await matchFeeling(text, request.signal);
      // Reset/unmount can happen while either fetch or response.json is pending.
      if (controller.current !== request) return;
      if (request.signal.aborted) throw new Error('Request timed out');
      if (emotion) selectEmotion(emotion, 'ai');
      else setNotice('Could you share a little more? Describe what happened and what you noticed in your thoughts or body.');
    } catch (error) {
      if (controller.current !== request) return;
      setIsError(true);
      setNotice(request.signal.aborted
        ? 'That took too long. Please try again, or choose a feeling manually.'
        : error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      if (controller.current === request) {
        clearTimeout(requestTimer.current);
        controller.current = null;
        setLoading(false);
      }
    }
  }

  return { selected, rotation, loading, spinning, notice, isError, source, selectEmotion, reset, submit, busy: loading || spinning };
}
