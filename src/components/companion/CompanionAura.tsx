'use client';

// ============================================================
// COMPANION AURA — Phase 2: Theme-synced magical aura
// Aura color changes with mood, syncs with background theme
// ============================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CompanionMood } from './companionDialogues';

interface CompanionAuraProps {
  mood: CompanionMood;
}

const MOOD_AURA: Record<CompanionMood, string> = {
  calm: 'var(--color-primary-glow)',
  curious: 'var(--color-secondary-glow)',
  sleepy: 'var(--color-primary-glow)',
  focused: 'var(--color-primary-glow)',
  magical: 'var(--color-accent-glow)',
  peaceful: 'var(--color-primary-glow)',
};

interface Spark {
  id: number;
  size: number;
  orbitRadius: number;
  duration: number;
  delay: number;
  startAngle: number;
}

export function CompanionAura({ mood }: CompanionAuraProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const isActive = mood === 'curious' || mood === 'magical' || mood === 'focused';
  const isSleepy = mood === 'sleepy';
  const baseOpacity = isActive ? 0.6 : isSleepy ? 0.15 : 0.3;
  const auraColor = MOOD_AURA[mood];

  useEffect(() => {
    setSparks(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1,
        orbitRadius: 40 + Math.random() * 20,
        duration: 4 + Math.random() * 3,
        delay: i * 0.8,
        startAngle: (360 / 5) * i,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Ambient glow — mood colored */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '120px',
          height: '120px',
          background: `radial-gradient(circle, ${auraColor} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [baseOpacity * 0.3, baseOpacity * 0.5, baseOpacity * 0.3],
          scale: isSleepy ? [0.8, 0.85, 0.8] : [0.9, 1.1, 0.9],
        }}
        transition={{ duration: isSleepy ? 6 : 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting sparks — slower when sleepy */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: mood === 'magical' ? 'var(--color-accent)' : 'var(--color-primary-light)',
            boxShadow: `0 0 ${spark.size * 2}px ${auraColor}`,
          }}
          animate={{
            x: [
              Math.cos((spark.startAngle * Math.PI) / 180) * spark.orbitRadius,
              Math.cos(((spark.startAngle + 120) * Math.PI) / 180) * spark.orbitRadius,
              Math.cos(((spark.startAngle + 240) * Math.PI) / 180) * spark.orbitRadius,
              Math.cos((spark.startAngle * Math.PI) / 180) * spark.orbitRadius,
            ],
            y: [
              Math.sin((spark.startAngle * Math.PI) / 180) * spark.orbitRadius * 0.6,
              Math.sin(((spark.startAngle + 120) * Math.PI) / 180) * spark.orbitRadius * 0.6,
              Math.sin(((spark.startAngle + 240) * Math.PI) / 180) * spark.orbitRadius * 0.6,
              Math.sin((spark.startAngle * Math.PI) / 180) * spark.orbitRadius * 0.6,
            ],
            opacity: [0.2, baseOpacity, 0.15, 0.2],
          }}
          transition={{
            duration: isSleepy ? spark.duration * 1.5 : spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
