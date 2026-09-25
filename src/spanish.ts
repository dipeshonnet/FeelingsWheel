import type { Emotion } from './Wheel';

// Spanish names are shared by the result panel and its example sentences.
const names: Record<string, string> = {
  Abandoned: 'abandono', Accepted: 'aceptación', Aggravated: 'irritación creciente', Aggressive: 'agresividad', Alienated: 'aislamiento', Amazed: 'asombro', Amused: 'diversión', Anger: 'enojo', Annoyed: 'molestia', Anxious: 'ansiedad', Apathetic: 'apatía', Appalled: 'consternación', Aroused: 'excitación', Ashamed: 'vergüenza', Astonished: 'gran asombro', Aversion: 'aversión', Avoidance: 'deseo de evitar', Awe: 'admiración', Awful: 'malestar', Betrayed: 'traición', Bitter: 'amargura', Bored: 'aburrimiento', Bothered: 'incomodidad', Cheeky: 'picardía', Confident: 'confianza', Confused: 'confusión', Contempt: 'desprecio', Content: 'satisfacción', Courageous: 'valentía', Creative: 'creatividad', Critical: 'actitud crítica', Curious: 'curiosidad', Delighted: 'deleite', Depressed: 'ánimo muy bajo', Despair: 'desesperación', Detestable: 'rechazo profundo', Devastated: 'desolación', Disappointed: 'decepción', Disapproval: 'desaprobación', Disapproving: 'desacuerdo', Disdain: 'desdén', Disgust: 'asco', Disillusioned: 'desilusión', Dismayed: 'desconcierto', Dismissive: 'desinterés', Disrespected: 'falta de respeto', Distant: 'distancia emocional', Eager: 'entusiasmo por empezar', Ecstatic: 'euforia', Embarrassed: 'vergüenza', Empty: 'vacío', Energetic: 'energía', Enraged: 'ira intensa', Enthusiastic: 'entusiasmo', Envious: 'envidia', Excited: 'emoción', Excluded: 'exclusión', Fear: 'miedo', Fearful: 'temor', Fragile: 'fragilidad', Frightened: 'susto', Frustrated: 'frustración', Fulfilled: 'plenitud', Furious: 'furia', Grateful: 'gratitud', Grief: 'duelo', Guilty: 'culpa', Happy: 'alegría', Hateful: 'odio', Helpless: 'impotencia', Hesitant: 'duda', Hopeful: 'esperanza', Horrified: 'horror', Hostile: 'hostilidad', Humiliated: 'humillación', Hurt: 'dolor emocional', Ignored: 'sensación de ser ignorado', Impassioned: 'pasión', Important: 'sensación de importancia', Inadequate: 'sensación de no ser suficiente', Indifferent: 'indiferencia', Indignant: 'indignación', Inferior: 'inferioridad', Infuriated: 'ira', Inquisitive: 'curiosidad por investigar', Insecure: 'inseguridad', Insignificant: 'sensación de insignificancia', Inspired: 'inspiración', Interested: 'interés', Intimate: 'cercanía', Intimidated: 'intimidación', Irked: 'fastidio', Irritable: 'irritabilidad', Irritated: 'irritación', Isolated: 'aislamiento', Jealous: 'celos', Joyful: 'júbilo', Judgmental: 'juicio crítico', 'Let Down': 'decepción', Liberated: 'liberación', Loathing: 'repulsión intensa', Lonely: 'soledad', Lost: 'desorientación', Loving: 'cariño', Mad: 'enojo', Moved: 'emoción profunda', Nauseated: 'náuseas', Nervous: 'nerviosismo', Numb: 'insensibilidad emocional', Open: 'apertura', Optimistic: 'optimismo', Overjoyed: 'alegría inmensa', Overwhelmed: 'agobio', Panicked: 'pánico', Passionate: 'pasión', Peaceful: 'paz', Perplexed: 'perplejidad', Persecuted: 'sensación de persecución', Playful: 'ganas de jugar', Pleased: 'agrado', Powerful: 'fortaleza', Powerless: 'impotencia', Proud: 'orgullo', Provocative: 'deseo de desafiar', Provoked: 'sensación de provocación', Rageful: 'rabia intensa', Rejected: 'rechazo', Remorseful: 'remordimiento', Repelled: 'repulsión', Repugnant: 'repugnancia', Resentful: 'resentimiento', Respected: 'respeto', Revolted: 'repulsión', Revulsion: 'repulsión', Ridiculed: 'sensación de ser ridiculizado', Sad: 'tristeza', Sarcastic: 'sarcasmo', Satisfied: 'satisfacción', Scared: 'miedo', Scornful: 'desdén', Sensitive: 'sensibilidad', Shocked: 'conmoción', Skeptical: 'escepticismo', Sorrow: 'pena profunda', Startled: 'sobresalto', Submissive: 'sumisión', Successful: 'sensación de logro', Surprise: 'sorpresa', Suspicious: 'sospecha', Terrified: 'terror', Threatened: 'sensación de amenaza', Trusting: 'confianza en otros', Unmotivated: 'falta de motivación', Valued: 'sensación de ser valorado', Victimized: 'sensación de injusticia', Violated: 'sensación de invasión', Vulnerable: 'vulnerabilidad', Withdrawn: 'retraimiento', Worried: 'preocupación', Worthless: 'sensación de no valer nada',
};

const familyExamples: Record<string, string> = {
  anger: 'Cuando no se respetan mis límites, noto que necesito hacer una pausa.',
  disgust: 'Cuando algo va en contra de mis valores, puedo tomar distancia.',
  sad: 'Cuando echo de menos algo importante, puedo buscar apoyo.',
  happy: 'Cuando algo bueno sucede, puedo detenerme a disfrutarlo.',
  surprise: 'Cuando sucede algo inesperado, puedo darme tiempo para entenderlo.',
  fear: 'Cuando no sé qué pasará, puedo concentrarme en el siguiente paso.',
};

export function spanishName(emotion: Emotion): string {
  return names[emotion.label];
}

export function spanishExamples(emotion: Emotion): [string, string] {
  return [
    `Siento ${spanishName(emotion)} al pensar en lo que está pasando.`,
    familyExamples[emotion.family],
  ];
}
