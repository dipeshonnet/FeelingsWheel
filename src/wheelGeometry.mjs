import { emotions, emotionPath } from '../shared/emotions.mjs';

const radii = [[0, 168], [168, 326], [326, 480]];
function point(radius, angle) {
  const radians = angle * Math.PI / 180;
  return [500 + radius * Math.sin(radians), 500 - radius * Math.cos(radians)];
}
function wedge(inner, outer, start, end) {
  const a = point(outer, start), b = point(outer, end), c = point(inner, end), d = point(inner, start);
  return `M${a} A${outer},${outer} 0 0 1 ${b} L${c} ${inner ? `A${inner},${inner} 0 0 0 ${d}` : ''} Z`;
}

// All geometry and ancestry labels are fixed for the lifetime of the catalog.
export const segments = emotions.map(emotion => {
  const [inner, outer] = radii[emotion.depth];
  const middle = (emotion.start + emotion.end) / 2;
  const [x, y] = point(emotion.depth === 0 ? 108 : (inner + outer) / 2, middle);
  return { emotion, middle, x, y, path: wedge(inner, outer, emotion.start, emotion.end), title: emotionPath(emotion), label: emotion.label.toUpperCase() };
});
export const segmentById = new Map(segments.map(segment => [segment.emotion.id, segment]));
