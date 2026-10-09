import { memo } from 'react';
import { emotionPath, type Emotion } from '../shared/emotions.mjs';
import { segments, segmentById } from './wheelGeometry.mjs';
export const Wheel = memo(function Wheel({ rotation, selected, onSelect, disabled }: { rotation: number; selected: Emotion | null; onSelect: (emotion: Emotion) => void; disabled: boolean }) {
  return <div className="wheel-viewport">
    <div className="wheel-stage">
      <div className="wheel-face">
        <div className="wheel-rotor" style={{ transform: `rotate(${rotation}deg)` }}>
          <svg viewBox="0 0 1000 1000" role="img" aria-label={selected ? `Selected feeling: ${emotionPath(selected)}` : 'Three-ring feelings wheel: Anger, Disgust, Sad, Happy, Surprise, and Fear'}>
            {segments.map(({ emotion, middle, x, y, path, title, label }) => {
              const normalized = ((middle + rotation) % 360 + 360) % 360;
              const turn = middle - 90 + (normalized > 180 ? 180 : 0);
              const active = selected?.id === emotion.id;
              return <g key={emotion.id} className={`segment depth-${emotion.depth}${active ? ' selected' : ''}${disabled ? ' disabled' : ''}`} onClick={() => !disabled && onSelect(emotion)}>
                <title>
                  {title}
                </title>
                <path d={path} fill={emotion.color} />
                <text x={x} y={y} transform={`rotate(${turn} ${x} ${y})`} textAnchor="middle" dominantBaseline="central">
                  {label}
                </text>
              </g>;
            })}
            {selected && <path className="selection-outline" d={segmentById.get(selected.id)?.path} />}
          </svg>
        </div>
      </div>
      <svg className="clock-hand" viewBox="0 0 1000 1000" aria-hidden="true">
        <path className="hand-shadow" d="M500 500 L38 500" />
        <path d="M500 500 L44 500" stroke="#243e35" strokeWidth="4" />
        <path d="M25 500 L53 488 L53 512 Z" fill="#243e35" stroke="#fffdf8" strokeWidth="2" />
        <circle cx="500" cy="500" r="20" fill="#fffdf8" stroke="#243e35" strokeWidth="3" />
        <circle cx="500" cy="500" r="7" fill="#243e35" />
      </svg>
    </div>
  </div>;
});
