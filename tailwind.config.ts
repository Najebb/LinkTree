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
        'glow-sm':        '0 0 10px var(--color-primary-glow)',
        'glow-primary':   'var(--shadow-glow-primary)',
        'glow-secondary': 'var(--shadow-glow-secondary)',
        'glow-strong':    '0 0 30px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.3)',
        'card-fantasy':   'var(--shadow-card)',
        'depth-sm':       '0 2px 8px rgba(0,0,0,0.3)',
        'depth-md':       '0 4px 16px rgba(0,0,0,0.4)',
        'depth-lg':       '0 8px 32px rgba(0,0,0,0.5)',
        'depth-xl':       '0 12px 48px rgba(0,0,0,0.6)',
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
        '2xs':      ['0.65rem', { lineHeight: '1rem' }],
        'hero-sm':  ['2.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md':  ['4rem',    { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-lg':  ['6rem',    { lineHeight: '1',    letterSpacing: '-0.04em' }],
        'hero-xl':  ['8rem',    { lineHeight: '0.95', letterSpacing: '-0.05em' }],
      },

      // ─────────────────────────────────────────
      // BREAKPOINTS (sinkron dengan constants)
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
      // SPACING (tambahan untuk layout link tree)
      // ─────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─────────────────────────────────────────
      // MAX WIDTH (untuk content container)
      // ─────────────────────────────────────────
      maxWidth: {
        'linktree':  '680px',
        'linktree-wide': '800px',
      },

      // ─────────────────────────────────────────
      // ANIMATION
      // ─────────────────────────────────────────
      animation: {
        'float':            'float 4s ease-in-out infinite',
        'float-gentle':     'float-gentle 6s ease-in-out infinite',
        'glow-pulse':       'glow-pulse 2.5s ease-in-out infinite',
        'glow-breathe':     'glow-breathe 6s ease-in-out infinite',
        'holographic':      'holographic-shift 4s ease infinite',
        'shimmer-border':   'shimmer-border 4s ease infinite',
        'aurora':           'aurora-shift 8s ease-in-out infinite',
        'twinkle':          'twinkle 3s ease-in-out infinite',
        'rune-spin':        'rune-spin 20s linear infinite',
        'slide-up':         'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down':       'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':          'fade-in 0.4s ease forwards',
        'scale-pulse':      'scale-pulse 3s ease-in-out infinite',
        'shimmer-sweep':    'shimmer-sweep 2s ease-in-out infinite',
        'magical-entrance': 'magical-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },

      // ─────────────────────────────────────────
      // TRANSITION TIMING
      // ─────────────────────────────────────────
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'magical':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elegant':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth':    'cubic-bezier(0.45, 0, 0.55, 1)',
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
        'glass':   '16px',
        'modal':   '24px',
        'heavy':   '32px',
        'frosted': '40px',
      },

      // ─────────────────────────────────────────
      // Z-INDEX SCALE
      // ─────────────────────────────────────────
      zIndex: {
        'bg-deep':  '-20',
        'bg':       '-10',
        'canvas':   '-5',
        'base':     '0',
        'content':  '10',
        'overlay':  '20',
        'sticky':   '30',
        'nav':      '50',
        'modal':    '100',
        'toast':    '200',
        'tooltip':  '300',
        'cursor':   '999',
      },
    },
  },
  plugins: [],
};

export default config;
