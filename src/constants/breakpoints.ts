// ============================================================
// FANTASY REALM — BREAKPOINT SYSTEM
// Semua nilai breakpoint terpusat di sini
// Sinkron dengan tailwind.config.ts
// ============================================================

// ─────────────────────────────────────────
// BREAKPOINT VALUES (dalam px)
// ─────────────────────────────────────────
export const BREAKPOINTS = {
  mobile:  0,     // 0px   → 767px
  tablet:  768,   // 768px → 1023px
  desktop: 1024,  // 1024px → 1439px
  wide:    1440,  // 1440px+
} as const;

// ─────────────────────────────────────────
// MEDIA QUERY STRINGS (untuk JS/TS)
// ─────────────────────────────────────────
export const MEDIA_QUERY = {
  mobile:        '(max-width: 767px)',
  tablet:        '(min-width: 768px) and (max-width: 1023px)',
  tabletUp:      '(min-width: 768px)',
  desktop:       '(min-width: 1024px) and (max-width: 1439px)',
  desktopUp:     '(min-width: 1024px)',
  wide:          '(min-width: 1440px)',
  touch:         '(hover: none) and (pointer: coarse)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  darkMode:      '(prefers-color-scheme: dark)',
} as const;

// ─────────────────────────────────────────
// CONTAINER WIDTHS (max-width per breakpoint)
// ─────────────────────────────────────────
export const CONTAINER = {
  sm:   '640px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1280px',
  '2xl':'1440px',
} as const;

// ─────────────────────────────────────────
// SPACING SCALE
// ─────────────────────────────────────────
export const SPACING = {
  // Section padding (vertical)
  sectionY: {
    mobile:  'py-16',   // 64px
    tablet:  'py-24',   // 96px
    desktop: 'py-32',   // 128px
  },
  // Section padding (horizontal)
  sectionX: {
    mobile:  'px-4',    // 16px
    tablet:  'px-8',    // 32px
    desktop: 'px-16',   // 64px
  },
  // Gap antara elemen
  gap: {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-10',
    xl: 'gap-16',
  },
} as const;

// ─────────────────────────────────────────
// ANIMATION PERFORMANCE PER DEVICE
// Desktop = full cinematic, Mobile = optimized
// ─────────────────────────────────────────
export const PERF_CONFIG = {
  desktop: {
    enableParticles:    true,
    enableAurora:       true,
    enableFog:          true,
    enableParallax:     true,
    enableGlowEffects:  true,
    enable3D:           true,
    animationQuality:   'high',
  },
  mobile: {
    enableParticles:    false,  // Dimatikan untuk performa
    enableAurora:       true,   // Aurora tetap tapi lebih ringan
    enableFog:          false,  // Fog dimatikan
    enableParallax:     false,  // Parallax dimatikan
    enableGlowEffects:  true,   // Glow tetap tapi dikurangi
    enable3D:           false,  // Three.js dimatikan
    animationQuality:   'low',
  },
} as const;
