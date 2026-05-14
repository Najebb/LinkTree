'use client';

// ============================================================
// FLOATING ELEMENT — Reusable floating animation wrapper
// Memberikan efek melayang halus pada elemen dekoratif
// Mendukung berbagai preset gerakan
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FloatPreset = 'gentle' | 'medium' | 'orbital' | 'breathe' | 'sway';

interface FloatingElementProps {
  children: React.ReactNode;
  /** Preset gerakan float */
  preset?: FloatPreset;
  /** Durasi satu siklus (detik) */
  duration?: number;
  /** Delay awal (detik) */
  delay?: number;
  /** Custom range Y (pixel) */
  rangeY?: number;
  /** Custom range X (pixel) */
  rangeX?: number;
  className?: string;
}

const presetConfigs: Record<FloatPreset, {
  y: number[];
  x?: number[];
  rotate?: number[];
  scale?: number[];
  duration: number;
}> = {
  gentle: {
    y: [0, -6, 0],
    duration: 5,
  },
  medium: {
    y: [0, -12, 0],
    duration: 4,
  },
  orbital: {
    y: [0, -8, 0, 8, 0],
    x: [0, 6, 0, -6, 0],
    rotate: [0, 2, 0, -2, 0],
    duration: 6,
  },
  breathe: {
    y: [0, -4, 0],
    scale: [1, 1.05, 1],
    duration: 4,
  },
  sway: {
    y: [0, -5, 0],
    x: [0, 8, 0, -8, 0],
    rotate: [0, 1, 0, -1, 0],
    duration: 7,
  },
};

export function FloatingElement({
  children,
  preset = 'gentle',
  duration,
  delay = 0,
  rangeY,
  rangeX,
  className,
}: FloatingElementProps) {
  const config = presetConfigs[preset];
  const finalDuration = duration ?? config.duration;

  // Apply custom ranges if provided
  const animateProps: Record<string, number[]> = {
    y: rangeY ? [0, -rangeY, 0] : config.y,
  };
  if (config.x || rangeX) {
    animateProps.x = rangeX ? [0, rangeX, 0, -rangeX, 0] : config.x!;
  }
  if (config.rotate) animateProps.rotate = config.rotate;
  if (config.scale) animateProps.scale = config.scale;

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      animate={animateProps}
      transition={{
        duration: finalDuration,
        delay,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}
