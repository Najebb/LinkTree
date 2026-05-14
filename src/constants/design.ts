// ============================================================
// FANTASY REALM — DESIGN TOKENS
// Token design system terpusat: typography, spacing, radius, z-index
// Dipakai oleh komponen & tailwind config
// ============================================================

// ─────────────────────────────────────────
// TYPOGRAPHY SCALE
// Mobile-first, responsive
// ─────────────────────────────────────────
export const TYPOGRAPHY = {
  // Font families (sinkron dengan CSS variables)
  fontDisplay: "'Cinzel', serif",
  fontBody:    "'Inter', sans-serif",
  fontMono:    "'JetBrains Mono', monospace",

  // Font weights
  weight: {
    light:    300,
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },

  // Font sizes — skala yang harmonis
  size: {
    '2xs':    '0.65rem',   // 10.4px
    'xs':     '0.75rem',   // 12px
    'sm':     '0.875rem',  // 14px
    'base':   '1rem',      // 16px
    'lg':     '1.125rem',  // 18px
    'xl':     '1.25rem',   // 20px
    '2xl':    '1.5rem',    // 24px
    '3xl':    '1.875rem',  // 30px
    '4xl':    '2.25rem',   // 36px
    '5xl':    '3rem',      // 48px
    '6xl':    '3.75rem',   // 60px
    '7xl':    '4.5rem',    // 72px
    'hero':   '6rem',      // 96px  — hero heading desktop
    'heroXl': '8rem',      // 128px — hero heading wide
  },

  // Line heights
  leading: {
    none:    1,
    tight:   1.1,
    snug:    1.2,
    normal:  1.5,
    relaxed: 1.6,
    loose:   1.8,
  },

  // Letter spacing
  tracking: {
    tighter:  '-0.05em',
    tight:    '-0.025em',
    normal:   '0',
    wide:     '0.025em',
    wider:    '0.05em',
    widest:   '0.1em',
    heroWide: '0.15em',     // Untuk heading hero display
  },
} as const;

// ─────────────────────────────────────────
// SPACING SCALE (rem based)
// Skala konsisten 4px grid
// ─────────────────────────────────────────
export const SPACE = {
  px:   '1px',
  0:    '0',
  0.5:  '0.125rem',   // 2px
  1:    '0.25rem',     // 4px
  1.5:  '0.375rem',    // 6px
  2:    '0.5rem',      // 8px
  3:    '0.75rem',     // 12px
  4:    '1rem',        // 16px
  5:    '1.25rem',     // 20px
  6:    '1.5rem',      // 24px
  8:    '2rem',        // 32px
  10:   '2.5rem',      // 40px
  12:   '3rem',        // 48px
  16:   '4rem',        // 64px
  20:   '5rem',        // 80px
  24:   '6rem',        // 96px
  32:   '8rem',        // 128px
  40:   '10rem',       // 160px
} as const;

// ─────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────
export const RADIUS = {
  none:   '0',
  sm:     '4px',
  md:     '8px',
  lg:     '12px',       // Default card
  xl:     '16px',       // Modal, panel besar
  '2xl':  '20px',       // Section cards
  '3xl':  '24px',       // Large containers
  full:   '9999px',     // Pill shape
} as const;

// ─────────────────────────────────────────
// Z-INDEX SCALE
// Hierarki lapisan visual
// ─────────────────────────────────────────
export const Z_INDEX = {
  bgDeep:     -20,      // Background paling belakang (3D canvas)
  bgLayer:    -10,      // Background layers (stars, aurora)
  base:       0,        // Default
  content:    10,       // Konten utama
  overlay:    20,       // Overlay effect
  sticky:     30,       // Sticky elements
  nav:        50,       // Navigation bar
  modal:      100,      // Modal/dialog
  toast:      200,      // Toast notification
  tooltip:    300,      // Tooltip
  cursor:     999,      // Custom cursor
} as const;

// ─────────────────────────────────────────
// GLOW SYSTEM
// Preset glow intensities untuk berbagai use case
// ─────────────────────────────────────────
export const GLOW = {
  // Intensitas glow (multiplier opacity)
  subtle:   0.15,
  soft:     0.25,
  medium:   0.4,
  strong:   0.6,
  intense:  0.8,

  // Radius glow (spread)
  sm:       '10px',
  md:       '20px',
  lg:       '40px',
  xl:       '60px',
  '2xl':    '80px',
  '3xl':    '120px',    // Untuk ambient glow besar
} as const;

// ─────────────────────────────────────────
// GLASSMORPHISM PRESETS
// Level blur & transparency untuk berbagai konteks
// ─────────────────────────────────────────
export const GLASS = {
  thin: {
    blur:       '8px',
    opacity:    0.3,
    border:     0.15,
  },
  standard: {
    blur:       '16px',
    opacity:    0.5,
    border:     0.25,
  },
  thick: {
    blur:       '24px',
    opacity:    0.65,
    border:     0.3,
  },
  frosted: {
    blur:       '32px',
    opacity:    0.75,
    border:     0.35,
  },
} as const;

// ─────────────────────────────────────────
// SHADOW SYSTEM
// Depth levels — dari subtle sampai dramatic
// ─────────────────────────────────────────
export const SHADOW = {
  sm:    '0 2px 8px rgba(0,0,0,0.3)',
  md:    '0 4px 16px rgba(0,0,0,0.4)',
  lg:    '0 8px 32px rgba(0,0,0,0.5)',
  xl:    '0 12px 48px rgba(0,0,0,0.6)',
  '2xl': '0 20px 60px rgba(0,0,0,0.7)',
  inner: 'inset 0 1px 0 rgba(255,255,255,0.05)',
} as const;

// ─────────────────────────────────────────
// LAYOUT CONSTANTS
// ─────────────────────────────────────────
export const LAYOUT = {
  maxWidth:        '680px',     // Max width link tree content
  maxWidthWide:    '800px',     // Max width untuk wide screen
  headerHeight:    '64px',
  footerPadding:   '2rem',
  cardGap:         '1rem',      // Gap antar link cards
  sectionGap:      '3rem',      // Gap antar sections
} as const;
