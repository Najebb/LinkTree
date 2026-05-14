import type { Config } from 'tailwindcss';

// ============================================================
// FANTASY REALM — TAILWIND CONFIG
// Semua token mengacu ke CSS variables dari ThemeContext
// Sehingga saat tema berganti, Tailwind classes ikut berubah
// ============================================================

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {

      // ─────────────────────────────────────────
      // COLORS — semua dari CSS variables
      // Pakai: text-primary, bg-secondary, dll
      // ─────────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light:   'var(--color-primary-light)',
          glow:    'var(--color-primary-glow)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light:   'var(--color-secondary-light)',
          glow:    'var(--color-secondary-glow)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          glow:    'var(--color-accent-glow)',
        },
        bg: {
          primary:   'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary:  'var(--color-bg-tertiary)',
          glass:     'var(--color-bg-glass)',
        },
        fantasy: {
          text:      'var(--color-text-primary)',
          muted:     'var(--color-text-secondary)',
          dim:       'var(--color-text-muted)',
          border:    'var(--color-border-primary)',
          glow:      'var(--color-border-glow)',
        },
      },

      // ─────────────────────────────────────────
      // BACKGROUND GRADIENTS
      // ─────────────────────────────────────────
      backgroundImage: {
        'hero':         'var(--gradient-hero-bg)',
        'card':         'var(--gradient-card-bg)',
        'text-magic':   'var(--gradient-text)',
        'btn-primary':  'var(--gradient-button)',
        'glow':         'var(--gradient-glow)',
        'overlay':      'var(--gradient-overlay)',
      },

      // ─────────────────────────────────────────
      // BOX SHADOWS
      // ─────────────────────────────────────────
      boxShadow: {
        'glow-primary':   'var(--shadow-glow-primary)',
        'glow-secondary': 'var(--shadow-glow-secondary)',
        'card-fantasy':   'var(--shadow-card)',
      },

      // ─────────────────────────────────────────
      // FONT FAMILIES
      // ─────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY SCALE
      // ─────────────────────────────────────────
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'hero-sm':  ['2.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md':  ['4rem',    { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-lg':  ['6rem',    { lineHeight: '1',    letterSpacing: '-0.04em' }],
        'hero-xl':  ['8rem',    { lineHeight: '0.95', letterSpacing: '-0.05em' }],
      },

      // ─────────────────────────────────────────
      // BREAKPOINTS (sinkron dengan constants/breakpoints.ts)
      // ─────────────────────────────────────────
      screens: {
        'mobile':  { max: '767px' },
        'tablet':  '768px',
        'desktop': '1024px',
        'wide':    '1440px',
      },

      // ─────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────
      borderRadius: {
        'glass':  '12px',
        'card':   '16px',
        'modal':  '20px',
        'pill':   '9999px',
      },

      // ─────────────────────────────────────────
      // ANIMATION
      // ─────────────────────────────────────────
      animation: {
        'float':        'float 4s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 2.5s ease-in-out infinite',
        'holographic':  'holographic-shift 4s ease infinite',
        'aurora':       'aurora-shift 8s ease-in-out infinite',
        'twinkle':      'twinkle 3s ease-in-out infinite',
      },

      // ─────────────────────────────────────────
      // TRANSITION
      // ─────────────────────────────────────────
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'magical':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elegant':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1600': '1600ms',
      },

      // ─────────────────────────────────────────
      // BACKDROP BLUR
      // ─────────────────────────────────────────
      backdropBlur: {
        'glass': '16px',
        'modal': '24px',
        'heavy': '32px',
      },

      // ─────────────────────────────────────────
      // Z-INDEX SCALE
      // ─────────────────────────────────────────
      zIndex: {
        'bg':       '-10',   // Background layers
        'canvas':   '-5',    // Three.js canvas
        'base':     '0',
        'content':  '10',
        'overlay':  '20',
        'nav':      '50',
        'modal':    '100',
        'toast':    '200',
        'cursor':   '999',
      },
    },
  },
  plugins: [],
};

export default config;
