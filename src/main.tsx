import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { emotions, emotionById, emotionPath, roots, rotationFor } from '../shared/emotions.mjs';
import { Wheel, type Emotion } from './Wheel';
import { spanishExamples, spanishName } from './spanish';
import './style.css';

function App() {
  const [secondLanguage, setSecondLanguage] = useState<'hi' | 'es'>(() => {
    try { return localStorage.getItem('feelings-second-language') === 'es' ? 'es' : 'hi'; }
    catch { return 'hi'; }
  });
  const [text, setText] = useState('');
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [notice, setNotice] = useState('');
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState<'manual' | 'ai'>('manual');
  const controller = useRef<AbortController | null>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout>>();
  const locked = useRef(false);
  const busy = loading || spinning;
  const isSpanish = secondLanguage === 'es';
  useEffect(() => { try { localStorage.setItem('feelings-second-language', secondLanguage); } catch { /* Storage may be unavailable. */ } }, [secondLanguage]);
  useEffect(() => () => { controller.current?.abort(); clearTimeout(animationTimer.current); }, []);

  function selectEmotion(emotion: Emotion, from: 'manual' | 'ai' = 'manual') {
    setSelected(emotion); setSource(from); setNotice(''); setIsError(false);
    setRotation(current => rotationFor(current, emotion));
    clearTimeout(animationTimer.current);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSpinning(true);
      animationTimer.current = setTimeout(() => setSpinning(false), 3050);
    }
  }
  function reset() {
    controller.current?.abort(); controller.current = null; locked.current = false;
    clearTimeout(animationTimer.current); setSpinning(false); setLoading(false);
    setSelected(null); setNotice(''); setText(''); setIsError(false);
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (locked.current || busy) return;
    if (!text.trim()) { setNotice('Tell us a little about what’s happening, or choose a feeling below the wheel.'); setIsError(true); return; }
    locked.current = true;
    const request = new AbortController(); controller.current = request;
    setLoading(true); setNotice(''); setIsError(false);
    const timeout = setTimeout(() => request.abort(), 25000);
    try {
      const response = await fetch('/.netlify/functions/match-feeling', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text.trim() }), signal: request.signal });
      if (controller.current !== request) return;
      if (response.status === 429) throw new Error('Matching is busy right now. Please wait a minute and try again, or choose a feeling manually.');
      let data;
      try { data = await response.json(); } catch { throw new Error('The matching service is unavailable. Please try again, or choose a feeling manually.'); }
      if (!response.ok) throw new Error(data.error || 'We couldn’t make a match. Please try again.');
      if (data.status === 'clarify') {
        setNotice('Could you share a little more? Describe what happened and what you noticed in your thoughts or body.');
      } else if (data.status === 'match' && emotionById.has(data.emotionId)) {
        selectEmotion(emotionById.get(data.emotionId)!, 'ai');
      } else throw new Error('We couldn’t find a clear match. Please try again or choose a feeling manually.');
    } catch (error) {
      if (controller.current !== request) return;
      setIsError(true);
      setNotice(request.signal.aborted ? 'That took too long. Please try again, or choose a feeling manually.' : error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) { setLoading(false); locked.current = false; controller.current = null; }
    }
  }
  return <div className="app-shell">
    <header className="site-header"><a className="brand" href="https://everydayai.work" aria-label="Everyday AI home"><img src="/favicon.svg" alt="" width="28" height="28"/><span>everyday<span className="brand-ai">ai</span><span className="brand-divider">/</span><span className="brand-product">THE FEELINGS WHEEL</span></span></a><div className="header-right"><span className="header-note">Find the words for what you feel</span><div className="language-control"><label htmlFor="second-language">Also in</label><select id="second-language" value={secondLanguage} onChange={event => setSecondLanguage(event.target.value as 'hi' | 'es')} aria-label="Second language"><option value="hi">Hindi</option><option value="es">Spanish</option></select></div></div></header>
    <main className="experience">
      <section className="wheel-section" aria-labelledby="wheel-heading">
        <h1 id="wheel-heading" className="sr-only">The feelings wheel</h1>
        <div className="wheel-wrap"><Wheel rotation={rotation} selected={selected} disabled={busy} onSelect={emotion => selectEmotion(emotion)} /></div>
        <div className="wheel-controls"><span className="wheel-hint"><span className={`status-dot${spinning ? ' pulsing' : ''}`}/>{spinning ? 'Finding your place on the wheel…' : selected ? emotionPath(selected) : 'Start at the center. Explore outward.'}</span></div>
        <div className="manual-control"><label htmlFor="emotion-select">Or explore a feeling</label><select id="emotion-select" disabled={busy} value={selected?.id || ''} onChange={event => { const emotion = emotionById.get(event.target.value); if (emotion) selectEmotion(emotion); }}><option value="" disabled>Choose from the wheel</option>{roots.map(root => <optgroup key={root.id} label={root.label}>{emotions.filter(emotion => emotion.family === root.id).map(emotion => <option key={emotion.id} value={emotion.id}>{emotionPath(emotion)}</option>)}</optgroup>)}</select></div>
      </section>
      <section className="input-panel" aria-labelledby="input-heading"><div className="step-label"><span>01</span> PAUSE & NOTICE</div><h2 id="input-heading">How are you, <em>really?</em></h2><p className="intro">A word, a thought, a whole messy sentence. Just share!</p><form onSubmit={submit}><label htmlFor="feeling-input">What’s on your mind?</label><div className="textarea-wrap"><textarea id="feeling-input" value={text} onChange={event => setText(event.target.value)} maxLength={1000} placeholder="I’ve had so much to do today, and I don’t know where to start…" aria-describedby="input-help privacy-note"/><span className="character-count">{text.length} / 1000</span></div><p id="input-help" className="input-help">{isSpanish ? 'English or Spanish. Both welcome.' : 'English, हिंदी, or Hinglish. All welcome.'}</p><button className="submit-button" disabled={busy || !text.trim()} type="submit">{loading ? <><span className="spinner"/> Listening to your words…</> : spinning ? 'Turning toward your feeling…' : <>Find my feeling <span aria-hidden="true">↗</span></>}</button><p className="privacy-note" id="privacy-note"><svg width="13" height="15" viewBox="0 0 16 18" fill="none" aria-hidden="true"><rect x="3" y="8" width="10" height="8" rx="2" stroke="currentColor"/><path d="M5 8V5a3 3 0 0 1 6 0v3" stroke="currentColor"/></svg>Your words are sent to Groq for a match.</p></form><div className={`notice${isError ? ' error' : ''}`} role="status" aria-live="polite">{notice}</div></section>
      <section className={`guidance-panel${selected ? ' has-selection' : ''}`} aria-labelledby="guidance-heading" aria-live="polite" aria-atomic="true">
        <div className="step-label"><span>02</span> UNDERSTAND & CARE</div>
        {selected ? <><div className="result-heading"><div><p className="match-label">{source === 'ai' ? 'A possible match' : 'You’re exploring'}</p><h2 id="guidance-heading">{selected.label}</h2><span lang={secondLanguage} className="secondary-title">{isSpanish ? spanishName(selected) : selected.hindi}</span></div><span className="emotion-swatch" style={{ background: roots.find(root => root.id === selected.family)?.color }} aria-hidden="true"/></div><p className="emotion-description">{selected.description}</p><div className="examples"><h3>It might sound like</h3>{selected.examples.map(([english, hindi], index) => <div className="example" key={index}><p>“{english}”</p><p lang={secondLanguage}>{isSpanish ? `“${spanishExamples(selected)[index]}”` : hindi}</p></div>)}</div><div className="care-block"><h3>How to recognize it</h3><p>{selected.recognize}</p></div><div className="care-block"><h3>A little way forward</h3><ul>{selected.actions.map(action => <li key={action}>{action}</li>)}</ul></div><p className="gentle-note">You know your experience best. If this doesn’t fit, try another feeling.</p><button type="button" className="reset-button" onClick={reset}>Start a fresh check-in <span aria-hidden="true">↺</span></button></> : <div className="empty-guidance"><div className="petal-mark" aria-hidden="true">✳</div><h3 id="guidance-heading">Every feeling has a place.</h3><p>Your match will appear here, with English and {isSpanish ? 'Spanish' : 'Hindi'} examples and a few gentle ways to care for yourself.</p><span>No right answers. Just a starting point.</span></div>}
      </section>
    </main>
    <footer><span>Made for a little more self-understanding.</span><span>A reflection tool, not a diagnosis.</span><a href="https://everydayai.work">Everyday AI <span aria-hidden="true">↗</span></a></footer>
  </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
