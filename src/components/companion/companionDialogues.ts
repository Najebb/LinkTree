// ============================================================
// COMPANION DIALOGUES — Categorized dialogue library
// Organized by type: ambient, emotional, section, welcome, idle
// Each line has mood association and rarity weight
// ============================================================

export interface DialogueLine {
  text: string;
  duration: number;
  /** Which mood triggers this line */
  mood?: CompanionMood;
  /** Rarity: 1 = common, 5 = very rare (cinematic moments) */
  rarity?: number;
}

export type CompanionMood = 
  | 'calm' 
  | 'curious' 
  | 'sleepy' 
  | 'focused' 
  | 'magical' 
  | 'peaceful';

export type DialogueCategory = 
  | 'welcome' 
  | 'ambient' 
  | 'emotional' 
  | 'section' 
  | 'idle' 
  | 'click';

// ─────────────────────────────────────────
// WELCOME — First interaction
// ─────────────────────────────────────────
export const WELCOME_DIALOGUES: DialogueLine[] = [
  { text: 'Welcome to the realm…', duration: 4000, mood: 'calm' },
  { text: 'A new traveler arrives.', duration: 3500, mood: 'curious' },
  { text: 'The stars have been waiting.', duration: 4000, mood: 'peaceful' },
];

// ─────────────────────────────────────────
// AMBIENT — Random atmospheric lines
// ─────────────────────────────────────────
export const AMBIENT_DIALOGUES: DialogueLine[] = [
  { text: 'The night feels peaceful.', duration: 3500, mood: 'peaceful' },
  { text: 'Magic flows through this place.', duration: 4000, mood: 'magical' },
  { text: 'The stars remember everything.', duration: 4000, mood: 'calm', rarity: 2 },
  { text: 'The wind carries ancient secrets.', duration: 4000, mood: 'calm' },
  { text: 'This realm holds many stories.', duration: 3500, mood: 'curious' },
  { text: 'The aurora dances tonight.', duration: 3500, mood: 'peaceful', rarity: 2 },
  { text: 'Every light has a memory.', duration: 3500, mood: 'calm', rarity: 3 },
  { text: 'Silence speaks the loudest here.', duration: 4000, mood: 'peaceful', rarity: 3 },
];

// ─────────────────────────────────────────
// EMOTIONAL — Deeper, rarer lines
// ─────────────────────────────────────────
export const EMOTIONAL_DIALOGUES: DialogueLine[] = [
  { text: 'Time moves differently in this realm.', duration: 4500, mood: 'calm', rarity: 4 },
  { text: 'Some journeys have no end…', duration: 4000, mood: 'peaceful', rarity: 5 },
  { text: 'The past lingers like starlight.', duration: 4500, mood: 'sleepy', rarity: 5 },
  { text: 'I wonder what lies beyond…', duration: 4000, mood: 'curious', rarity: 4 },
  { text: 'Even magic needs rest.', duration: 3500, mood: 'sleepy', rarity: 3 },
  { text: 'The realm feels truly alive tonight.', duration: 4500, mood: 'magical', rarity: 4 },
  { text: 'You\'ve created something beautiful here.', duration: 4500, mood: 'peaceful', rarity: 5 },
  { text: 'The stars seem brighter when you are here.', duration: 4500, mood: 'peaceful', rarity: 5 },
];

// ─────────────────────────────────────────
// SECTION — Context-aware reactions
// ─────────────────────────────────────────
export const SECTION_DIALOGUES: Record<string, DialogueLine[]> = {
  hero: [
    { text: 'The entrance to your realm…', duration: 3500, mood: 'calm' },
    { text: 'A grand beginning.', duration: 3000, mood: 'peaceful' },
  ],
  links: [
    { text: 'These are your creations?', duration: 3500, mood: 'curious' },
    { text: 'So this is your journey…', duration: 3500, mood: 'curious' },
    { text: 'Each one tells a story.', duration: 3500, mood: 'focused' },
    { text: 'You\'ve built many paths.', duration: 3000, mood: 'calm' },
    { text: 'There is much to explore here.', duration: 3500, mood: 'magical' },
  ],
};

// ─────────────────────────────────────────
// GUIDANCE — Subtle navigation nudges
// ─────────────────────────────────────────
export const GUIDANCE_DIALOGUES: DialogueLine[] = [
  { text: 'Take your time, there is no rush.', duration: 3500, mood: 'calm', rarity: 2 },
  { text: 'Scroll further, if you wish.', duration: 3500, mood: 'curious', rarity: 3 },
  { text: 'The paths unfold before you.', duration: 3500, mood: 'peaceful', rarity: 3 },
];

// ─────────────────────────────────────────
// EXTENDED EXPLORATION — Triggers after long sessions
// ─────────────────────────────────────────
export const LONG_EXPLORATION_DIALOGUES: DialogueLine[] = [
  { text: 'We have been here a while.', duration: 4000, mood: 'calm', rarity: 4 },
  { text: 'I enjoy the quiet companionship.', duration: 4500, mood: 'peaceful', rarity: 5 },
  { text: 'The night stretches on, peacefully.', duration: 4500, mood: 'sleepy', rarity: 4 },
];

// ─────────────────────────────────────────
// IDLE — When user is inactive
// ─────────────────────────────────────────
export const IDLE_DIALOGUES: DialogueLine[] = [
  { text: 'Rest a while, traveler.', duration: 3500, mood: 'sleepy' },
  { text: 'The stars are beautiful tonight.', duration: 4000, mood: 'peaceful' },
  { text: 'I\'ll keep watch.', duration: 3000, mood: 'calm' },
  { text: 'A moment of stillness…', duration: 3500, mood: 'peaceful', rarity: 2 },
  { text: 'Even the wind has paused.', duration: 3500, mood: 'sleepy', rarity: 3 },
  { text: 'I shall study my spells until you return.', duration: 4000, mood: 'focused', rarity: 3 },
];

// ─────────────────────────────────────────
// CLICK — Reaction to being clicked
// ─────────────────────────────────────────
export const CLICK_DIALOGUES: DialogueLine[] = [
  { text: 'Ah, you noticed me.', duration: 3000, mood: 'curious' },
  { text: '…a curious soul.', duration: 3000, mood: 'curious' },
  { text: 'The magic stirs.', duration: 2500, mood: 'magical' },
  { text: 'Shall I light the way?', duration: 3000, mood: 'magical' },
  { text: 'A gentle presence.', duration: 2500, mood: 'peaceful' },
  { text: 'You carry light within.', duration: 3000, mood: 'calm', rarity: 3 },
];

// ─────────────────────────────────────────
// HELPER: Pick random dialogue with rarity weighting
// ─────────────────────────────────────────
export function pickDialogue(
  lines: DialogueLine[],
  currentMood?: CompanionMood,
): DialogueLine {
  // Filter by mood if provided (but allow any if no match)
  let pool = currentMood
    ? lines.filter(l => !l.mood || l.mood === currentMood)
    : lines;
  if (pool.length === 0) pool = lines;

  // Weight by rarity (lower rarity = more likely)
  const weighted = pool.flatMap(line => {
    const weight = Math.max(1, 6 - (line.rarity ?? 1));
    return Array(weight).fill(line);
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
}
