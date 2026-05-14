'use client';

// ============================================================
// USE COMPANION STATE — Enhanced Phase 2
// Mood system: calm → curious → sleepy → focused → magical → peaceful
// Natural mood transitions based on time, activity, section
// Dialogue system: categorized, weighted, section-aware
// ============================================================

import { useState, useCallback, useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import {
  type CompanionMood,
  type DialogueLine,
  WELCOME_DIALOGUES,
  AMBIENT_DIALOGUES,
  EMOTIONAL_DIALOGUES,
  IDLE_DIALOGUES,
  CLICK_DIALOGUES,
  SECTION_DIALOGUES,
  GUIDANCE_DIALOGUES,
  LONG_EXPLORATION_DIALOGUES,
  pickDialogue,
} from './companionDialogues';

export type { CompanionMood };

export type IdlePose = 'standing' | 'sitting' | 'reading' | 'stargazing' | 'sleeping';

interface CompanionState {
  mood: CompanionMood;
  dialogue: string | null;
  isBlinking: boolean;
  idlePose: IdlePose;
  activeSection: string;
  smoothCursorX: any;
  smoothCursorY: any;
  handleClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  updateCursorPosition: (mx: number, my: number, rect: DOMRect) => void;
  triggerAmbientEvent: () => void;
}

export function useCompanionState(): CompanionState {
  const [mood, setMood] = useState<CompanionMood>('calm');
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [idlePose, setIdlePose] = useState<IdlePose>('standing');
  const [activeSection, setActiveSection] = useState('hero');
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const dialogueTimer = useRef<NodeJS.Timeout | null>(null);
  const blinkTimer = useRef<NodeJS.Timeout | null>(null);
  const moodTimer = useRef<NodeJS.Timeout | null>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef(Date.now());
  const sessionStartRef = useRef(Date.now());
  const clickIndex = useRef(0);

  // Cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 25, stiffness: 100 });
  const smoothCursorY = useSpring(cursorY, { damping: 25, stiffness: 100 });

  // ── SHOW DIALOGUE ──
  const showDialogue = useCallback((text: string, duration: number) => {
    if (dialogueTimer.current) clearTimeout(dialogueTimer.current);
    setDialogue(text);
    dialogueTimer.current = setTimeout(() => {
      setDialogue(null);
    }, duration);
  }, []);

  // ── BLINK SYSTEM ──
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = Math.random() * 4000 + 2000;
      blinkTimer.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current); };
  }, []);

  // ── WELCOME DIALOGUE (once, after 3s) ──
  useEffect(() => {
    if (hasWelcomed) return;
    const timer = setTimeout(() => {
      const line = pickDialogue(WELCOME_DIALOGUES, 'calm');
      showDialogue(line.text, line.duration);
      setHasWelcomed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasWelcomed, showDialogue]);

  // ── NATURAL MOOD TRANSITIONS ──
  useEffect(() => {
    const cycleMood = () => {
      const delay = Math.random() * 30000 + 20000; // 20-50s
      moodTimer.current = setTimeout(() => {
        const moods: CompanionMood[] = ['calm', 'peaceful', 'curious', 'magical', 'calm', 'peaceful'];
        const timeSinceActivity = Date.now() - lastActivityRef.current;

        if (timeSinceActivity > 60000) {
          // Idle > 1 min → sleepy
          setMood('sleepy');
        } else {
          const next = moods[Math.floor(Math.random() * moods.length)];
          setMood(next);
        }
        cycleMood();
      }, delay);
    };
    cycleMood();
    return () => { if (moodTimer.current) clearTimeout(moodTimer.current); };
  }, []);

  // ── ENVIRONMENTAL SYNCHRONIZATION ──
  useEffect(() => {
    // Companion influences global environment based on mood
    const root = document.documentElement;
    let influenceColor = 'transparent';
    
    switch (mood) {
      case 'magical': influenceColor = 'rgba(251, 191, 36, 0.15)'; break;
      case 'curious': influenceColor = 'rgba(96, 232, 192, 0.1)'; break;
      case 'sleepy': influenceColor = 'rgba(5, 3, 15, 0.4)'; break;
      case 'peaceful': influenceColor = 'rgba(74, 222, 128, 0.08)'; break;
      case 'focused': influenceColor = 'rgba(220, 38, 38, 0.1)'; break;
      default: influenceColor = 'transparent';
    }
    
    root.style.setProperty('--companion-influence', influenceColor);
  }, [mood]);

  // ── AMBIENT DIALOGUE (rare, mood-matched) ──
  useEffect(() => {
    const scheduleAmbient = () => {
      const delay = Math.random() * 35000 + 25000; // 25-60s
      const timer = setTimeout(() => {
        if (dialogue) { scheduleAmbient(); return; } // Don't overlap

        const sessionTime = Date.now() - sessionStartRef.current;
        const roll = Math.random();
        let line: DialogueLine;

        if (sessionTime > 180000 && roll < 0.15) {
          // 15% chance for long exploration dialogue after 3 minutes
          line = pickDialogue(LONG_EXPLORATION_DIALOGUES, mood);
        } else if (roll < 0.25) {
          // 10% emotional (rare)
          line = pickDialogue(EMOTIONAL_DIALOGUES, mood);
        } else if (roll < 0.40 && SECTION_DIALOGUES[activeSection]) {
          // 15% section-aware
          line = pickDialogue(SECTION_DIALOGUES[activeSection], mood);
        } else if (roll < 0.50) {
          // 10% guidance
          line = pickDialogue(GUIDANCE_DIALOGUES, mood);
        } else if (roll < 0.70) {
          // 20% idle
          line = pickDialogue(IDLE_DIALOGUES, mood);
        } else {
          // 30% ambient
          line = pickDialogue(AMBIENT_DIALOGUES, mood);
        }

        showDialogue(line.text, line.duration);
        if (line.mood) setMood(line.mood);
        scheduleAmbient();
      }, delay);
      return timer;
    };

    const t = scheduleAmbient();
    return () => clearTimeout(t);
  }, [mood, activeSection, dialogue, showDialogue]);

  // ── IDLE POSE SYSTEM ──
  useEffect(() => {
    const checkIdle = () => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed > 120000) setIdlePose('sleeping');       // 2 min
      else if (elapsed > 90000) setIdlePose('stargazing');  // 1.5 min
      else if (elapsed > 60000) setIdlePose('reading');     // 1 min
      else if (elapsed > 30000) setIdlePose('sitting');     // 30s
      else setIdlePose('standing');
    };

    idleTimer.current = setInterval(checkIdle, 5000);
    return () => { if (idleTimer.current) clearInterval(idleTimer.current); };
  }, []);

  // ── SECTION OBSERVER ──
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── CLICK HANDLER ──
  const handleClick = useCallback(() => {
    lastActivityRef.current = Date.now();
    setIdlePose('standing');
    setMood('curious');

    const line = CLICK_DIALOGUES[clickIndex.current % CLICK_DIALOGUES.length];
    clickIndex.current++;
    showDialogue(line.text, line.duration);
    if (line.mood) setMood(line.mood);
  }, [showDialogue]);

  // ── HOVER ──
  const handleMouseEnter = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (!dialogue) setMood('curious');
  }, [dialogue]);

  const handleMouseLeave = useCallback(() => {
    if (!dialogue) setMood('calm');
    cursorX.set(0);
    cursorY.set(0);
  }, [dialogue, cursorX, cursorY]);

  // ── CURSOR TRACKING ──
  const updateCursorPosition = useCallback((mx: number, my: number, rect: DOMRect) => {
    lastActivityRef.current = Date.now();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    cursorX.set(Math.max(-1, Math.min(1, (mx - cx) / 200)));
    cursorY.set(Math.max(-1, Math.min(1, (my - cy) / 200)));
  }, [cursorX, cursorY]);

  // ── AMBIENT EVENT TRIGGER ──
  const triggerAmbientEvent = useCallback(() => {
    setMood('magical');
    setTimeout(() => setMood('calm'), 2000);
  }, []);

  // ── CLEANUP ──
  useEffect(() => {
    return () => {
      if (dialogueTimer.current) clearTimeout(dialogueTimer.current);
      if (idleTimer.current) clearInterval(idleTimer.current);
    };
  }, []);

  return {
    mood,
    dialogue,
    isBlinking,
    idlePose,
    activeSection,
    smoothCursorX,
    smoothCursorY,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    updateCursorPosition,
    triggerAmbientEvent,
  };
}
