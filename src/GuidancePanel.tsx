import { memo } from 'react';
import { emotionById, type Emotion } from '../shared/emotions.mjs';
import { spanishExamples, spanishName } from './spanish';

export const GuidancePanel = memo(function GuidancePanel({ selected, source, secondLanguage, reset }: {
  selected: Emotion | null; source: 'manual' | 'ai'; secondLanguage: 'hi' | 'es'; reset: () => void;
}) {
  const isSpanish = secondLanguage === 'es';
  const translatedExamples = selected && isSpanish ? spanishExamples(selected) : [];
  return <section className={`guidance-panel${selected ? ' has-selection' : ''}`} aria-labelledby="guidance-heading" aria-live="polite" aria-atomic="true">
    <div className="step-label">
      <span>02</span> UNDERSTAND & CARE</div>
    {selected ? <>
      <div className="result-heading">
        <div>
          <p className="match-label">
            {source === 'ai' ? 'A possible match' : 'You’re exploring'}
          </p>
          <h2 id="guidance-heading">
            {selected.label}
          </h2>
          <span lang={secondLanguage} className="secondary-title">
            {isSpanish ? spanishName(selected) : selected.hindi}
          </span>
        </div>
        <span className="emotion-swatch" style={{ background: emotionById.get(selected.family)?.color }} aria-hidden="true" />
      </div>
      <p className="emotion-description">
        {selected.description}
      </p>
      <div className="examples">
        <h3>It might sound like</h3>
        {selected.examples.map(([english, hindi], index) => <div className="example" key={index}>
          <p>“{english}”</p>
          <p lang={secondLanguage}>
            {isSpanish ? `“${translatedExamples[index]}”` : hindi}
          </p>
        </div>)}
      </div>
      <div className="care-block">
        <h3>How to recognize it</h3>
        <p>
          {selected.recognize}
        </p>
      </div>
      <div className="care-block">
        <h3>A little way forward</h3>
        <ul>
          {selected.actions.map(action => <li key={action}>
            {action}
          </li>)}
        </ul>
      </div>
      <p className="gentle-note">You know your experience best. If this doesn’t fit, try another feeling.</p>
      <button type="button" className="reset-button" onClick={reset}>Start a fresh check-in <span aria-hidden="true">↺</span>
      </button>
    </> : <div className="empty-guidance">
      <div className="petal-mark" aria-hidden="true">✳</div>
      <h3 id="guidance-heading">Every feeling has a place.</h3>
      <p>Your match will appear here, with English and {isSpanish ? 'Spanish' : 'Hindi'} examples and a few gentle ways to care for yourself.</p>
      <span>No right answers. Just a starting point.</span>
    </div>}
  </section>;
});
