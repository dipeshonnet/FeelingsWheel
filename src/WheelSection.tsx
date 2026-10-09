import { memo } from 'react';
import { emotions, emotionById, emotionPath, roots, type Emotion } from '../shared/emotions.mjs';
import { Wheel } from './Wheel';

const options = roots.map(root => ({ root, emotions: emotions.filter(emotion => emotion.family === root.id).map(emotion => ({ emotion, path: emotionPath(emotion) })) }));

export const WheelSection = memo(function WheelSection({ rotation, selected, busy, spinning, selectEmotion }: {
  rotation: number; selected: Emotion | null; busy: boolean; spinning: boolean; selectEmotion: (emotion: Emotion) => void;
}) {
  return <section className="wheel-section" aria-labelledby="wheel-heading">
    <h1 id="wheel-heading" className="sr-only">The feelings wheel</h1>
    <div className="wheel-wrap">
      <Wheel rotation={rotation} selected={selected} disabled={busy} onSelect={selectEmotion} />
    </div>
    <div className="wheel-controls">
      <span className="wheel-hint">
        <span className={`status-dot${spinning ? ' pulsing' : ''}`} />
        {spinning ? 'Finding your place on the wheel…' : selected ? emotionPath(selected) : 'Start at the center. Explore outward.'}
      </span>
    </div>
    <div className="manual-control">
      <label htmlFor="emotion-select">Or explore a feeling</label>
      <select id="emotion-select" disabled={busy} value={selected?.id || ''} onChange={event => { const emotion = emotionById.get(event.target.value); if (emotion) selectEmotion(emotion); }}>
        <option value="" disabled>Choose from the wheel</option>
        {options.map(({ root, emotions: familyOptions }) => <optgroup key={root.id} label={root.label}>
          {familyOptions.map(({ emotion, path }) => <option key={emotion.id} value={emotion.id}>
            {path}
          </option>)}
        </optgroup>)}
      </select>
    </div>
  </section>;
});
