// ============================================================
// FANTASY REALM — ANIMATION CONSTANTS
// Semua nilai durasi, easing, dan delay terpusat di sini
// Gunakan konstanta ini di seluruh project — jangan hardcode
// ============================================================

// ─────────────────────────────────────────
// DURASI (dalam detik)
// ─────────────────────────────────────────
export const DURATION = {
  instant:    0.1,
  fast:       0.2,
  normal:     0.4,
  slow:       0.6,
  cinematic:  1.0,
  epic:       1.6,
  ambient:    3.0,   // Untuk animasi background
  loop:       6.0,   // Untuk animasi looping
} as const;

// ─────────────────────────────────────────
// DELAY (dalam detik)
// ─────────────────────────────────────────
export const DELAY = {
  none:     0,
  short:    0.1,
  medium:   0.2,
  long:     0.4,
  veryLong: 0.8,
  stagger:  0.08,    // Default stagger antar elemen
  staggerFast: 0.05,
  staggerSlow: 0.15,
} as const;

// ─────────────────────────────────────────
// EASING — Framer Motion format
// ─────────────────────────────────────────
export const EASE = {
  // Standard
  easeOut:     [0.0, 0.0, 0.2, 1.0],
  easeIn:      [0.4, 0.0, 1.0, 1.0],
  easeInOut:   [0.4, 0.0, 0.2, 1.0],

  // Magical / cinematic feel
  cinematic:   [0.16, 1, 0.3, 1],     // Overshoot sedikit, landing smooth
  magical:     [0.34, 1.56, 0.64, 1], // Spring-like magical bounce
  elegant:     [0.25, 0.46, 0.45, 0.94],
  dramatic:    [0.12, 0, 0.39, 0],    // Masuk cepat

  // Untuk animasi background / ambient
  smooth:      [0.45, 0, 0.55, 1],
  gentle:      [0.25, 0.1, 0.25, 1],
} as const;

// ─────────────────────────────────────────
// SPRING CONFIG — Framer Motion
// ─────────────────────────────────────────
export const SPRING = {
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 15,
    mass: 0.8,
  },
  stiff: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  slow: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  },
} as const;

// ─────────────────────────────────────────
// GSAP EASE STRINGS
// ─────────────────────────────────────────
export const GSAP_EASE = {
  easeOut:   'power2.out',
  easeIn:    'power2.in',
  easeInOut: 'power2.inOut',
  cinematic: 'expo.out',
  elastic:   'elastic.out(1, 0.3)',
  back:      'back.out(1.7)',
  magical:   'power4.out',
  smooth:    'sine.inOut',
  linear:    'none',
} as const;

// ─────────────────────────────────────────
// TRANSFORM VALUES
// ─────────────────────────────────────────
export const TRANSFORM = {
  // Y offset untuk entrance animations
  enterFromBottom: 40,
  enterFromTop:    -40,
  enterFromLeft:   -60,
  enterFromRight:  60,

  // Scale
  scaleFrom:  0.85,
  scaleHover: 1.05,
  scalePress: 0.97,

  // Rotation
  rotateIn:   -5,
  rotateHover: 2,
} as const;

// ─────────────────────────────────────────
// OPACITY
// ─────────────────────────────────────────
export const OPACITY = {
  hidden:  0,
  dim:     0.3,
  muted:   0.6,
  subtle:  0.8,
  full:    1,
} as const;

// ─────────────────────────────────────────
// VIEWPORT TRIGGER (untuk scroll animations)
// ─────────────────────────────────────────
export const VIEWPORT = {
  once: true,
  margin: '-80px 0px',      // Trigger 80px sebelum masuk viewport
  amount: 0.1,               // 10% elemen terlihat = trigger
} as const;

export const VIEWPORT_EAGER = {
  once: true,
  margin: '-40px 0px',
  amount: 0.05,
} as const;

// ─────────────────────────────────────────
// BACKGROUND ANIMATION CONFIG
// Untuk stars, aurora, particles, dll
// ─────────────────────────────────────────
export const BG_ANIMATION = {
  desktop: {
    stars: {
      count: 200,
      twinkleDuration: [2, 5],    // [min, max] dalam detik
      twinkleDelay: [0, 3],
    },
    aurora: {
      duration: 8,
      amplitude: 80,
      frequency: 0.5,
    },
    fog: {
      duration: 20,
      layers: 3,
    },
    particles: {
      count: 30,
      duration: [8, 15],
      size: [1, 3],
    },
  },
  mobile: {
    stars: {
      count: 80,              // Lebih sedikit untuk performa mobile
      twinkleDuration: [3, 6],
      twinkleDelay: [0, 4],
    },
    aurora: {
      duration: 12,
      amplitude: 50,
      frequency: 0.3,
    },
    fog: {
      duration: 25,
      layers: 2,              // Kurangi layer di mobile
    },
    particles: {
      count: 12,              // Jauh lebih sedikit
      duration: [10, 18],
      size: [1, 2],
    },
  },
} as const;

// ─────────────────────────────────────────
// TRANSITION PRESETS (siap pakai)
// ─────────────────────────────────────────
export const TRANSITION = {
  fast: {
    duration: DURATION.fast,
    ease: EASE.easeOut,
  },
  normal: {
    duration: DURATION.normal,
    ease: EASE.elegant,
  },
  cinematic: {
    duration: DURATION.cinematic,
    ease: EASE.cinematic,
  },
  spring: SPRING.gentle,
  springBouncy: SPRING.bouncy,
} as const;
