import { memo } from 'react';
import { emotions, emotionPath } from '../shared/emotions.mjs';
export type Emotion = typeof emotions[number];
const radii = [[0, 168], [168, 326], [326, 480]];
function point(radius: number, angle: number) { const radians = angle * Math.PI / 180; return [500 + radius * Math.sin(radians), 500 - radius * Math.cos(radians)]; }
function wedge(inner: number, outer: number, start: number, end: number) {
  const a = point(outer, start), b = point(outer, end), c = point(inner, end), d = point(inner, start);
  return `M${a} A${outer},${outer} 0 0 1 ${b} L${c} ${inner ? `A${inner},${inner} 0 0 0 ${d}` : ''} Z`;
}
export const Wheel = memo(function Wheel({ rotation, selected, onSelect, disabled }: { rotation: number; selected: Emotion | null; onSelect: (emotion: Emotion) => void; disabled: boolean }) {
  return <div className="wheel-viewport">
    <div className="wheel-stage">
      <div className="wheel-rotor" style={{ transform: `rotate(${rotation}deg)` }}>
        <svg viewBox="0 0 1000 1000" role="img" aria-label={selected ? `Selected feeling: ${emotionPath(selected)}` : 'Three-ring feelings wheel: Anger, Disgust, Sad, Happy, Surprise, and Fear'}>
          {emotions.map(emotion => {
            const [inner, outer] = radii[emotion.depth];
            const middle = (emotion.start + emotion.end) / 2;
            const textRadius = emotion.depth === 0 ? 108 : (inner + outer) / 2;
            const [x, y] = point(textRadius, middle);
            const normalized = (middle + 360) % 360;
            const turn = middle - 90 + (normalized > 180 ? 180 : 0);
            const active = selected?.id === emotion.id;
            return <g key={emotion.id} className={`segment depth-${emotion.depth}${active ? ' selected' : ''}${disabled ? ' disabled' : ''}`} onClick={() => !disabled && onSelect(emotion)}>
              <title>{emotionPath(emotion)}</title>
              <path d={wedge(inner, outer, emotion.start, emotion.end)} fill={emotion.color} />
              <text x={x} y={y} transform={`rotate(${turn} ${x} ${y})`} textAnchor="middle" dominantBaseline="central">{emotion.label.toUpperCase()}</text>
            </g>;
          })}
          {selected && <path className="selection-outline" d={wedge(...radii[selected.depth] as [number, number], selected.start, selected.end)} />}
        </svg>
      </div>
      <svg className="clock-hand" viewBox="0 0 1000 1000" aria-hidden="true">
        <path className="hand-shadow" d="M500 500 L500 38" />
        <path d="M500 500 L500 44" stroke="#243e35" strokeWidth="4" />
        <path d="M500 25 L488 53 L512 53 Z" fill="#243e35" stroke="#fffdf8" strokeWidth="2" />
        <circle cx="500" cy="500" r="20" fill="#fffdf8" stroke="#243e35" strokeWidth="3" />
        <circle cx="500" cy="500" r="7" fill="#243e35" />
      </svg>
    </div>
  </div>;
});
