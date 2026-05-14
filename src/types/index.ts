// ============================================================
// FANTASY REALM — TYPE DEFINITIONS
// Semua type terpusat di sini agar konsisten di seluruh project
// ============================================================

// ─────────────────────────────────────────
// THEME TYPES
// ─────────────────────────────────────────

export type ThemeId =
  | 'fantasy-dark'   // Default: dark fantasy dengan warna ungu & emas
  | 'cyber-neon'     // Cyberpunk: neon hijau & pink di atas hitam
  | 'void-purple'    // Deep space: ungu gelap & biru kosmik
  | 'ember-forge';   // Fire realm: merah & oranye membara

export interface ThemeColors {
  // Background layers
  bgPrimary: string;       // Background utama (paling gelap)
  bgSecondary: string;     // Background layer kedua
  bgTertiary: string;      // Background layer ketiga (card, dll)
  bgGlass: string;         // Glassmorphism background

  // Primary accent
  primary: string;         // Warna utama
  primaryGlow: string;     // Glow effect warna utama
  primaryLight: string;    // Versi terang

  // Secondary accent
  secondary: string;       // Warna sekunder
  secondaryGlow: string;
  secondaryLight: string;

  // Tertiary / highlight
  accent: string;          // Warna highlight / aksen
  accentGlow: string;

  // Text
  textPrimary: string;     // Teks utama
  textSecondary: string;   // Teks sekunder / muted
  textMuted: string;       // Teks sangat muted

  // Border
  borderPrimary: string;   // Border utama
  borderGlow: string;      // Border dengan glow

  // Background effects (stars, particles, aurora)
  starColor: string;
  auroraColor1: string;
  auroraColor2: string;
  particleColor: string;
  fogColor: string;
}

export interface ThemeGradients {
  heroBackground: string;     // Gradient background hero
  cardBackground: string;     // Gradient background card
  textPrimary: string;        // Gradient text utama
  buttonPrimary: string;      // Gradient button
  glowPrimary: string;        // Glow gradient
  overlayDark: string;        // Dark overlay
}

export interface ThemeShadows {
  glowPrimary: string;        // Box shadow glow primary
  glowSecondary: string;      // Box shadow glow secondary
  cardDepth: string;          // Shadow kedalaman card
}

export interface ThemeBlur {
  glass: string;              // Blur level glassmorphism
  modal: string;              // Blur level modal
}

export interface Theme {
  id: ThemeId;
  name: string;               // Nama display
  description: string;        // Deskripsi singkat
  colors: ThemeColors;
  gradients: ThemeGradients;
  shadows: ThemeShadows;
  blur: ThemeBlur;
}

// ─────────────────────────────────────────
// ANIMATION TYPES
// ─────────────────────────────────────────

export type AnimationVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'scaleInRotate'
  | 'slideUp'
  | 'glowPulse'
  | 'float'
  | 'shimmer';

export type AnimationEase =
  | 'easeOut'
  | 'easeInOut'
  | 'spring'
  | 'cinematic'
  | 'magical';

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: AnimationEase;
  repeat?: number | 'infinity';
  stagger?: number;
}

// ─────────────────────────────────────────
// RESPONSIVE / BREAKPOINT TYPES
// ─────────────────────────────────────────

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface DeviceInfo {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  width: number;
  height: number;
}

// ─────────────────────────────────────────
// AUDIO SYSTEM TYPES
// ─────────────────────────────────────────

export type AudioTrackId =
  | 'ambient-fantasy'
  | 'ambient-cyber'
  | 'ambient-void'
  | 'sfx-hover'
  | 'sfx-click'
  | 'sfx-transition';

export interface AudioTrack {
  id: AudioTrackId;
  src: string;
  loop: boolean;
  volume: number;
  label: string;
}

export interface AudioState {
  enabled: boolean;
  volume: number;
  currentTrack: AudioTrackId | null;
  isPlaying: boolean;
}

// ─────────────────────────────────────────
// BACKGROUND SYSTEM TYPES
// ─────────────────────────────────────────

export interface BackgroundLayerConfig {
  stars: {
    count: number;
    speed: number;
    size: [number, number]; // [min, max]
  };
  aurora: {
    enabled: boolean;
    intensity: number;
    speed: number;
  };
  fog: {
    enabled: boolean;
    density: number;
    speed: number;
  };
  particles: {
    count: number;
    speed: number;
    size: [number, number];
  };
  parallax: {
    enabled: boolean;
    strength: number;
  };
}

// ─────────────────────────────────────────
// COMPONENT PROP TYPES (shared/reusable)
// ─────────────────────────────────────────

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animation?: AnimationVariant;
  animationDelay?: number;
  animationDuration?: number;
}

// ─────────────────────────────────────────
// NAVIGATION TYPES
// ─────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// ─────────────────────────────────────────
// SITE CONFIG TYPES
// ─────────────────────────────────────────

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  author: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}
