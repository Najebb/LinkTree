// ============================================================
// FANTASY REALM — FRAMER MOTION VARIANTS
// Library lengkap animation variants siap pakai
// Import: import { fadeInUp, staggerContainer } from '@/lib/animations'
// ============================================================

import type { Variants } from 'framer-motion';
import { DURATION, DELAY, EASE, SPRING, TRANSFORM, OPACITY } from '@/constants';

// ─────────────────────────────────────────
// ENTRANCE VARIANTS
// ─────────────────────────────────────────

export const fadeIn: Variants = {
  hidden:  { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.full,
    transition: { duration: DURATION.normal, ease: EASE.easeOut },
  },
};

export const fadeInUp: Variants = {
  hidden:  { opacity: OPACITY.hidden, y: TRANSFORM.enterFromBottom },
  visible: {
    opacity: OPACITY.full,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
};

export const fadeInDown: Variants = {
  hidden:  { opacity: OPACITY.hidden, y: TRANSFORM.enterFromTop },
  visible: {
    opacity: OPACITY.full,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
};

export const fadeInLeft: Variants = {
  hidden:  { opacity: OPACITY.hidden, x: TRANSFORM.enterFromLeft },
  visible: {
    opacity: OPACITY.full,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
};

export const fadeInRight: Variants = {
  hidden:  { opacity: OPACITY.hidden, x: TRANSFORM.enterFromRight },
  visible: {
    opacity: OPACITY.full,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: OPACITY.hidden, scale: TRANSFORM.scaleFrom },
  visible: {
    opacity: OPACITY.full,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE.cinematic },
  },
};

export const scaleInRotate: Variants = {
  hidden:  {
    opacity: OPACITY.hidden,
    scale: TRANSFORM.scaleFrom,
    rotate: TRANSFORM.rotateIn,
  },
  visible: {
    opacity: OPACITY.full,
    scale: 1,
    rotate: 0,
    transition: { duration: DURATION.slow, ease: EASE.magical },
  },
};

// ─────────────────────────────────────────
// CONTAINER / STAGGER VARIANTS
// Untuk menganimasikan children secara berurutan
// ─────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden:  { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.full,
    transition: {
      staggerChildren:  DELAY.stagger,
      delayChildren:    DELAY.short,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden:  { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.full,
    transition: {
      staggerChildren: DELAY.staggerFast,
      delayChildren:   0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden:  { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.full,
    transition: {
      staggerChildren: DELAY.staggerSlow,
      delayChildren:   DELAY.medium,
    },
  },
};

// ─────────────────────────────────────────
// PAGE TRANSITION VARIANTS
// ─────────────────────────────────────────

export const pageEnter: Variants = {
  hidden:  { opacity: OPACITY.hidden, y: 20 },
  visible: {
    opacity: OPACITY.full,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
  exit: {
    opacity: OPACITY.hidden,
    y: -20,
    transition: { duration: DURATION.normal, ease: EASE.easeIn },
  },
};

export const pageFade: Variants = {
  hidden:  { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.full,
    transition: { duration: DURATION.slow },
  },
  exit: {
    opacity: OPACITY.hidden,
    transition: { duration: DURATION.fast },
  },
};

// ─────────────────────────────────────────
// HOVER VARIANTS (untuk elemen interaktif)
// ─────────────────────────────────────────

export const hoverScale = {
  scale: TRANSFORM.scaleHover,
  transition: SPRING.gentle,
};

export const hoverGlow = {
  scale: 1.02,
  filter: 'brightness(1.15)',
  transition: { duration: DURATION.fast, ease: EASE.easeOut },
};

export const tapScale = {
  scale: TRANSFORM.scalePress,
  transition: { duration: DURATION.instant },
};

// ─────────────────────────────────────────
// SPECIAL EFFECT VARIANTS
// ─────────────────────────────────────────

/** Efek float naik turun (untuk elemen dekoratif) */
export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/** Efek pulse glow */
export const glowPulse: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale:   [1, 1.05, 1],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/** Efek shimmer (untuk loading skeleton) */
export const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/** Efek magical appear (untuk heading utama) */
export const magicalReveal: Variants = {
  hidden:  {
    opacity: OPACITY.hidden,
    y: 60,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: OPACITY.full,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.epic,
      ease: EASE.cinematic,
    },
  },
};

/** Glassmorphism card entrance */
export const glassCardEnter: Variants = {
  hidden:  {
    opacity: OPACITY.hidden,
    y: 30,
    scale: 0.96,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: OPACITY.full,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(16px)',
    transition: {
      duration: DURATION.slow,
      ease: EASE.cinematic,
    },
  },
};

// ─────────────────────────────────────────
// HELPER: Membuat variant dengan delay custom
// ─────────────────────────────────────────

/**
 * Buat fadeInUp dengan delay custom
 * Contoh: withDelay(fadeInUp, 0.3)
 */
export function withDelay(variants: Variants, delay: number): Variants {
  return {
    ...variants,
    visible: {
      ...(variants.visible as object),
      transition: {
        ...((variants.visible as { transition?: object })?.transition ?? {}),
        delay,
      },
    },
  };
}

/**
 * Buat variant dengan durasi custom
 */
export function withDuration(variants: Variants, duration: number): Variants {
  return {
    ...variants,
    visible: {
      ...(variants.visible as object),
      transition: {
        ...((variants.visible as { transition?: object })?.transition ?? {}),
        duration,
      },
    },
  };
}
