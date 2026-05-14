'use client';

// ============================================================
// COMPANION SPRITE — Pure SVG Cinematic Entity
// Ethereal Hooded Spirit with dynamic morphing states
// Responds to mood, cursor, and idle poses (reading, sleeping)
// ============================================================

import { motion, type MotionValue, useTransform } from 'framer-motion';
import type { CompanionMood } from './companionDialogues';
import type { IdlePose } from './useCompanionState';

interface CompanionSpriteProps {
  isBlinking: boolean;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  mood: CompanionMood;
  idlePose: IdlePose;
}

const MOOD_EYE_COLOR: Record<CompanionMood, string> = {
  calm: '#4ADE80',
  curious: '#60E8C0',
  sleepy: '#2D7A4F',
  focused: '#22D3EE',
  magical: '#FBBF24',
  peaceful: '#4ADE80',
};

const MOOD_ORB_COLOR: Record<CompanionMood, string> = {
  calm: '#DC2626',
  curious: '#E879A0',
  sleepy: '#8B2020',
  focused: '#DC2626',
  magical: '#FBBF24',
  peaceful: '#DC2626',
};

export function CompanionSprite({
  isBlinking,
  cursorX,
  cursorY,
  mood,
  idlePose,
}: CompanionSpriteProps) {
  const eyeColor = MOOD_EYE_COLOR[mood];
  const orbColor = MOOD_ORB_COLOR[mood];
  
  const isSleeping = idlePose === 'sleeping';
  const isSitting = idlePose === 'sitting';
  const isReading = idlePose === 'reading';
  const isStargazing = idlePose === 'stargazing';

  // Map cursor position to eye offsets (-1 to 1 space mapped to subtle pixel moves)
  const eyeOffsetX = useTransform(cursorX, [-1, 1], [-2.5, 2.5]);
  const eyeOffsetY = useTransform(cursorY, [-1, 1], [-2, 2]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-[120%] h-[120%] overflow-visible"
        animate={{
          y: isSleeping ? 12 : isSitting || isReading ? 6 : [0, -3, 0],
          scale: isSleeping ? [0.92, 0.94, 0.92] : [1, 1.02, 1],
        }}
        transition={{ 
          y: { duration: isSleeping || isSitting || isReading ? 1.5 : 4, repeat: isSleeping || isSitting || isReading ? 0 : Infinity, ease: 'easeInOut' },
          scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* ── AMBIENT CORE GLOW ── */}
        <motion.circle 
          cx="50" cy="50" r="35"
          fill={eyeColor}
          opacity={0.15}
          filter="blur(15px)"
          animate={{ r: [30, 40, 30], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── CLOAK BACK & BODY ── */}
        <motion.path
          d="M 25 85 C 10 85, 20 40, 50 15 C 80 40, 90 85, 75 85 C 60 95, 40 95, 25 85 Z"
          fill="rgba(15, 10, 25, 0.95)"
          stroke="rgba(124, 58, 237, 0.3)"
          strokeWidth="0.5"
          animate={{
            d: isSleeping || isSitting || isReading
               ? "M 15 90 C 5 90, 25 50, 50 35 C 75 50, 95 90, 85 90 C 65 98, 35 98, 15 90 Z" // Wider base, lowered shoulders
               : "M 25 85 C 10 85, 20 40, 50 15 C 80 40, 90 85, 75 85 C 60 95, 40 95, 25 85 Z" // Floating shape
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* ── THE VOID (FACE) ── */}
        <motion.ellipse
          cx="50" cy="35"
          rx="12" ry="18"
          fill="#05030f"
          animate={{
            cy: isStargazing ? 25 : isReading ? 45 : isSleeping ? 42 : 35,
            rx: isSleeping ? 8 : 12,
            ry: isSleeping ? 10 : isReading ? 14 : 18,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* ── GLOWING EYES ── */}
        <motion.g
          animate={{
            opacity: isBlinking || isSleeping ? 0 : 1,
            y: isStargazing ? -10 : isReading ? 10 : 0,
          }}
          transition={{ duration: isBlinking ? 0.08 : 1.2, ease: 'easeInOut' }}
        >
          {/* Left Eye */}
          <motion.circle 
            cx="46" cy="33" r="1.8" fill={eyeColor} 
            style={{ x: eyeOffsetX, y: eyeOffsetY }}
            filter={`drop-shadow(0 0 4px ${eyeColor})`}
          />
          {/* Right Eye */}
          <motion.circle 
            cx="54" cy="33" r="1.8" fill={eyeColor} 
            style={{ x: eyeOffsetX, y: eyeOffsetY }}
            filter={`drop-shadow(0 0 4px ${eyeColor})`}
          />
        </motion.g>

        {/* ── HOOD OVERHANG ── */}
        <motion.path
          d="M 30 40 C 30 15, 70 15, 70 40 C 60 32, 40 32, 30 40 Z"
          fill="rgba(25, 20, 40, 0.98)"
          stroke="rgba(124, 58, 237, 0.4)"
          strokeWidth="0.5"
          animate={{
            d: isStargazing 
               ? "M 35 28 C 35 8, 65 8, 65 28 C 55 24, 45 24, 35 28 Z" // Tilted back
               : isReading
               ? "M 25 52 C 25 22, 75 22, 75 52 C 60 48, 40 48, 25 52 Z" // Tilted forward/down
               : isSleeping
               ? "M 28 48 C 28 20, 72 20, 72 48 C 60 42, 40 42, 28 48 Z" // Compressed
               : "M 30 40 C 30 15, 70 15, 70 40 C 60 32, 40 32, 30 40 Z" // Default
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* ── FLOATING MAGICAL ORB ── */}
        <motion.circle
          cx="20" cy="50" r="4.5"
          fill={orbColor}
          filter={`drop-shadow(0 0 8px ${orbColor})`}
          animate={{
            cy: isSleeping ? 80 : isReading ? 62 : [47, 53, 47],
            cx: isReading ? 35 : 20,
            opacity: isSleeping ? 0.2 : 1,
            scale: isReading ? 1.3 : 1
          }}
          transition={{ 
            cy: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }, 
            cx: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: 1.2, ease: 'easeInOut' }
          }}
        />
        
        {/* Orb Core Glow */}
        <motion.circle
          cx="20" cy="50" r="2"
          fill="#FFF"
          animate={{
            cy: isSleeping ? 80 : isReading ? 62 : [47, 53, 47],
            cx: isReading ? 35 : 20,
            opacity: isSleeping ? 0.1 : 0.8,
          }}
          transition={{ 
            cy: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }, 
            cx: { duration: 1.5, ease: 'easeInOut' }
          }}
        />

        {/* ── SPELLBOOK & RUNES (Only when reading) ── */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isReading ? 1 : 0, y: isReading ? 0 : 10 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* Book base floating in front */}
          <path d="M 35 68 L 50 72 L 65 68 L 50 63 Z" fill="rgba(40, 30, 60, 0.95)" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="0.5"/>
          <path d="M 35 68 L 50 72 L 50 77 L 35 73 Z" fill="rgba(20, 15, 30, 0.9)"/>
          <path d="M 65 68 L 50 72 L 50 77 L 65 73 Z" fill="rgba(30, 20, 45, 0.9)"/>
          <path d="M 50 63 L 50 72" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="0.5" />
          
          {/* Holographic glowing runes floating from the book */}
          {[1, 2, 3].map(i => (
             <motion.text
               key={i}
               x={45 + i * 2}
               y="62"
               fontSize="6"
               fontWeight="bold"
               fontFamily="monospace"
               fill={eyeColor}
               style={{ textShadow: `0 0 6px ${eyeColor}` }}
               animate={isReading ? { 
                 opacity: [0, 1, 0], 
                 y: [62, 40], 
                 x: [45 + i * 2, 38 + i * 6],
                 scale: [0.8, 1.2, 0.5]
               } : { opacity: 0 }}
               transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
             >
               ⚝
             </motion.text>
          ))}
        </motion.g>

        {/* ── SLEEPING ZZZ ── */}
        <motion.text
          x="65" y="45"
          fontSize="5"
          fill={eyeColor}
          style={{ fontStyle: 'italic', textShadow: `0 0 5px ${eyeColor}` }}
          initial={{ opacity: 0 }}
          animate={isSleeping ? { opacity: [0, 0.8, 0], y: [45, 35], x: [65, 70] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        >
          Z
        </motion.text>
        <motion.text
          x="70" y="40"
          fontSize="4"
          fill={eyeColor}
          style={{ fontStyle: 'italic', textShadow: `0 0 5px ${eyeColor}` }}
          initial={{ opacity: 0 }}
          animate={isSleeping ? { opacity: [0, 0.6, 0], y: [40, 30], x: [70, 73] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
        >
          z
        </motion.text>

      </motion.svg>
    </div>
  );
}
