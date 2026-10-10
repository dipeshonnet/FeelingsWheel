import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WheelSection } from './WheelSection';
import { GuidancePanel } from './GuidancePanel';
import { useFeelingCheckIn } from './useFeelingCheckIn';
import './style.css';

function App() {
  const [secondLanguage, setSecondLanguage] = useState<'hi' | 'es'>(() => {
    try { return localStorage.getItem('feelings-second-language') === 'es' ? 'es' : 'hi'; }
    catch { return 'hi'; }
  });
  const [text, setText] = useState('');
  const { selected, rotation, loading, spinning, notice, isError, source, selectEmotion, reset: resetCheckIn, submit: submitCheckIn, busy } = useFeelingCheckIn();
  const isSpanish = secondLanguage === 'es';
  useEffect(() => { try { localStorage.setItem('feelings-second-language', secondLanguage); } catch { /* Storage may be unavailable. */ } }, [secondLanguage]);
  const reset = useCallback(() => { resetCheckIn(); setText(''); }, [resetCheckIn]);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    void submitCheckIn(text);
  }
  return <div className="app-shell">
    <header className="site-header">
      <a className="brand" href="https://everydayai.work" aria-label="Everyday AI home">
        <img src="/favicon.svg" alt="" width="28" height="28" />
        <span>everyday<span className="brand-ai">ai</span>
          <span className="brand-divider">/</span>
          <span className="brand-product">THE FEELINGS WHEEL</span>
        </span>
      </a>
      <div className="header-right">
        <span className="header-note">Find the words for what you feel</span>
        <div className="language-control">
          <label htmlFor="second-language">Also in</label>
          <select id="second-language" value={secondLanguage} onChange={event => setSecondLanguage(event.target.value as 'hi' | 'es')} aria-label="Second language">
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </header>
    <main className="experience">
      <WheelSection rotation={rotation} selected={selected} busy={busy} spinning={spinning} selectEmotion={selectEmotion} />
      <section className="input-panel" aria-labelledby="input-heading">
        <div className="step-label">
          <span>01</span> PAUSE & NOTICE</div>
        <h2 id="input-heading">How are you, <em>really?</em>
        </h2>
        <p className="intro">A word, a thought, a whole messy sentence. Just share!</p>
        <form onSubmit={submit}>
          <label htmlFor="feeling-input">What’s on your mind?</label>
          <div className="textarea-wrap">
            <textarea id="feeling-input" value={text} onChange={event => setText(event.target.value)} maxLength={1000} placeholder="I’ve had so much to do today, and I don’t know where to start…" aria-describedby="input-help privacy-note" />
            <span className="character-count">
              {text.length} / 1000</span>
          </div>
          <p id="input-help" className="input-help">
            {isSpanish ? 'English or Spanish. Both welcome.' : 'English, हिंदी, or Hinglish. All welcome.'}
          </p>
          <button className="submit-button" disabled={busy || !text.trim()} type="submit">
            {loading ? <>
              <span className="spinner" /> Listening to your words…</> : spinning ? 'Turning toward your feeling…' : <>Find my feeling <span aria-hidden="true">↗</span>
              </>}
          </button>
          <p className="privacy-note" id="privacy-note">
            <svg width="13" height="15" viewBox="0 0 16 18" fill="none" aria-hidden="true">
              <rect x="3" y="8" width="10" height="8" rx="2" stroke="currentColor" />
              <path d="M5 8V5a3 3 0 0 1 6 0v3" stroke="currentColor" />
            </svg>Submitted words are sent to Groq and may be saved privately by this site.</p>
        </form>
        <div className={`notice${isError ? ' error' : ''}`} role="status" aria-live="polite">
          {notice}
        </div>
      </section>
      <GuidancePanel selected={selected} source={source} secondLanguage={secondLanguage} reset={reset} />
    </main>
    <footer>
      <span>Made for a little more self-understanding.</span>
      <span>A reflection tool, not a diagnosis.</span>
      <a href="https://everydayai.work">Everyday AI <span aria-hidden="true">↗</span>
      </a>
    </footer>
  </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode>
  <App />
</React.StrictMode>);
