export interface Emotion {
  id: string; label: string; hindi: string; family: string; parent: string | null;
  depth: number; start: number; end: number; color: string; description: string;
  examples: [string, string][]; recognize: string; actions: string[];
}
export const emotions: Emotion[];
export const emotionById: Map<string, Emotion>;
export const roots: Emotion[];
export function rotationFor(current: number, emotion: Emotion): number;
export function emotionPath(emotion: Emotion): string;
