// ============================================================
// FANTASY REALM — THEME SYSTEM
// Definisi lengkap untuk semua tema visual
// Setiap tema memiliki: colors, gradients, shadows, blur
// ============================================================

import type { Theme } from '@/types';

// ─────────────────────────────────────────
// TEMA 1: FANTASY DARK (Default)
// Atmosfer: Dark fantasy medieval + futuristic
// Palet: Deep purple, midnight blue, golden accent
// ─────────────────────────────────────────
export const THEME_FANTASY_DARK: Theme = {
  id: 'fantasy-dark',
  name: 'Fantasy Dark',
  description: 'Dark medieval realm dengan sentuhan futuristik',
  colors: {
    bgPrimary:    '#05030F',   // Hitam keunguan sangat gelap
    bgSecondary:  '#0A0618',   // Background panel/section
    bgTertiary:   '#110B24',   // Background card
    bgGlass:      'rgba(17, 11, 36, 0.6)',

    primary:      '#7C3AED',   // Ungu utama (violet-600)
    primaryGlow:  'rgba(124, 58, 237, 0.4)',
    primaryLight: '#A78BFA',   // Ungu terang (violet-400)

    secondary:    '#2563EB',   // Biru royal
    secondaryGlow:'rgba(37, 99, 235, 0.35)',
    secondaryLight:'#60A5FA',

    accent:       '#F59E0B',   // Emas / amber (aksen magic)
    accentGlow:   'rgba(245, 158, 11, 0.4)',

    textPrimary:  '#F3F0FF',   // Putih keunguan
    textSecondary:'#C4B5FD',   // Ungu muda
    textMuted:    '#6B5FA0',   // Ungu muted

    borderPrimary:'rgba(124, 58, 237, 0.3)',
    borderGlow:   'rgba(124, 58, 237, 0.6)',

    starColor:    '#E0D7FF',
    auroraColor1: '#7C3AED',
    auroraColor2: '#2563EB',
    particleColor:'#A78BFA',
    fogColor:     'rgba(124, 58, 237, 0.08)',
  },
  gradients: {
    heroBackground: 'radial-gradient(ellipse at 50% 0%, #1A0A3C 0%, #05030F 60%)',
    cardBackground: 'linear-gradient(135deg, rgba(17,11,36,0.9) 0%, rgba(10,6,24,0.95) 100%)',
    textPrimary:    'linear-gradient(135deg, #F3F0FF 0%, #A78BFA 50%, #F59E0B 100%)',
    buttonPrimary:  'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
    glowPrimary:    'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
    overlayDark:    'linear-gradient(to bottom, transparent 0%, rgba(5,3,15,0.8) 100%)',
  },
  shadows: {
    glowPrimary:   '0 0 20px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)',
    glowSecondary: '0 0 20px rgba(37,99,235,0.5), 0 0 60px rgba(37,99,235,0.2)',
    cardDepth:     '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  blur: {
    glass: 'blur(16px)',
    modal: 'blur(24px)',
  },
};

// ─────────────────────────────────────────
// TEMA 2: CYBER NEON
// Atmosfer: Cyberpunk dystopia, neon city rain
// Palet: Neon pink, electric cyan, dark steel
// ─────────────────────────────────────────
export const THEME_CYBER_NEON: Theme = {
  id: 'cyber-neon',
  name: 'Cyber Neon',
  description: 'Cyberpunk dystopia dengan lampu neon di tengah hujan',
  colors: {
    bgPrimary:    '#020608',
    bgSecondary:  '#040D0F',
    bgTertiary:   '#071318',
    bgGlass:      'rgba(4, 13, 15, 0.6)',

    primary:      '#06B6D4',   // Cyan elektrik
    primaryGlow:  'rgba(6, 182, 212, 0.4)',
    primaryLight: '#67E8F9',

    secondary:    '#EC4899',   // Pink neon
    secondaryGlow:'rgba(236, 72, 153, 0.35)',
    secondaryLight:'#F9A8D4',

    accent:       '#84CC16',   // Hijau matrix
    accentGlow:   'rgba(132, 204, 22, 0.4)',

    textPrimary:  '#E0FBFC',
    textSecondary:'#67E8F9',
    textMuted:    '#164E63',

    borderPrimary:'rgba(6, 182, 212, 0.3)',
    borderGlow:   'rgba(6, 182, 212, 0.7)',

    starColor:    '#C7F5FA',
    auroraColor1: '#06B6D4',
    auroraColor2: '#EC4899',
    particleColor:'#67E8F9',
    fogColor:     'rgba(6, 182, 212, 0.06)',
  },
  gradients: {
    heroBackground: 'radial-gradient(ellipse at 50% 0%, #041A20 0%, #020608 60%)',
    cardBackground: 'linear-gradient(135deg, rgba(7,19,24,0.9) 0%, rgba(4,13,15,0.95) 100%)',
    textPrimary:    'linear-gradient(135deg, #E0FBFC 0%, #67E8F9 50%, #EC4899 100%)',
    buttonPrimary:  'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    glowPrimary:    'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
    overlayDark:    'linear-gradient(to bottom, transparent 0%, rgba(2,6,8,0.8) 100%)',
  },
  shadows: {
    glowPrimary:   '0 0 20px rgba(6,182,212,0.6), 0 0 60px rgba(6,182,212,0.2)',
    glowSecondary: '0 0 20px rgba(236,72,153,0.6), 0 0 60px rgba(236,72,153,0.2)',
    cardDepth:     '0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(6,182,212,0.08)',
  },
  blur: {
    glass: 'blur(14px)',
    modal: 'blur(20px)',
  },
};

// ─────────────────────────────────────────
// TEMA 3: VOID PURPLE
// Atmosfer: Deep space, cosmic horror, dark matter
// Palet: Indigo gelap, violet kosmik, silver bintang
// ─────────────────────────────────────────
export const THEME_VOID_PURPLE: Theme = {
  id: 'void-purple',
  name: 'Void Purple',
  description: 'Kedalaman luar angkasa yang gelap dan misterius',
  colors: {
    bgPrimary:    '#030008',
    bgSecondary:  '#07000F',
    bgTertiary:   '#0E0020',
    bgGlass:      'rgba(14, 0, 32, 0.6)',

    primary:      '#8B5CF6',   // Violet kosmik
    primaryGlow:  'rgba(139, 92, 246, 0.4)',
    primaryLight: '#C4B5FD',

    secondary:    '#6366F1',   // Indigo
    secondaryGlow:'rgba(99, 102, 241, 0.35)',
    secondaryLight:'#A5B4FC',

    accent:       '#E879F9',   // Fuchsia nebula
    accentGlow:   'rgba(232, 121, 249, 0.4)',

    textPrimary:  '#F5F3FF',
    textSecondary:'#DDD6FE',
    textMuted:    '#5B21B6',

    borderPrimary:'rgba(139, 92, 246, 0.25)',
    borderGlow:   'rgba(139, 92, 246, 0.55)',

    starColor:    '#EDE9FE',
    auroraColor1: '#8B5CF6',
    auroraColor2: '#E879F9',
    particleColor:'#C4B5FD',
    fogColor:     'rgba(139, 92, 246, 0.05)',
  },
  gradients: {
    heroBackground: 'radial-gradient(ellipse at 50% 0%, #1A0038 0%, #030008 60%)',
    cardBackground: 'linear-gradient(135deg, rgba(14,0,32,0.9) 0%, rgba(7,0,15,0.95) 100%)',
    textPrimary:    'linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 50%, #E879F9 100%)',
    buttonPrimary:  'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    glowPrimary:    'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
    overlayDark:    'linear-gradient(to bottom, transparent 0%, rgba(3,0,8,0.85) 100%)',
  },
  shadows: {
    glowPrimary:   '0 0 20px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.15)',
    glowSecondary: '0 0 20px rgba(232,121,249,0.5), 0 0 60px rgba(232,121,249,0.15)',
    cardDepth:     '0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)',
  },
  blur: {
    glass: 'blur(18px)',
    modal: 'blur(28px)',
  },
};

// ─────────────────────────────────────────
// TEMA 4: EMBER FORGE
// Atmosfer: Volcanic forge, fire realm, molten magic
// Palet: Merah bara, oranye magma, hitam arang
// ─────────────────────────────────────────
export const THEME_EMBER_FORGE: Theme = {
  id: 'ember-forge',
  name: 'Ember Forge',
  description: 'Tempaan api yang membara dari kedalaman bumi',
  colors: {
    bgPrimary:    '#080200',
    bgSecondary:  '#110400',
    bgTertiary:   '#1A0800',
    bgGlass:      'rgba(26, 8, 0, 0.6)',

    primary:      '#EF4444',   // Merah api
    primaryGlow:  'rgba(239, 68, 68, 0.4)',
    primaryLight: '#FCA5A5',

    secondary:    '#F97316',   // Oranye magma
    secondaryGlow:'rgba(249, 115, 22, 0.35)',
    secondaryLight:'#FDBA74',

    accent:       '#FCD34D',   // Kuning bara
    accentGlow:   'rgba(252, 211, 77, 0.4)',

    textPrimary:  '#FFF7F7',
    textSecondary:'#FCA5A5',
    textMuted:    '#7F1D1D',

    borderPrimary:'rgba(239, 68, 68, 0.3)',
    borderGlow:   'rgba(239, 68, 68, 0.6)',

    starColor:    '#FECACA',
    auroraColor1: '#EF4444',
    auroraColor2: '#F97316',
    particleColor:'#FCA5A5',
    fogColor:     'rgba(239, 68, 68, 0.07)',
  },
  gradients: {
    heroBackground: 'radial-gradient(ellipse at 50% 0%, #3D0800 0%, #080200 60%)',
    cardBackground: 'linear-gradient(135deg, rgba(26,8,0,0.9) 0%, rgba(17,4,0,0.95) 100%)',
    textPrimary:    'linear-gradient(135deg, #FFF7F7 0%, #FCA5A5 50%, #FCD34D 100%)',
    buttonPrimary:  'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    glowPrimary:    'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
    overlayDark:    'linear-gradient(to bottom, transparent 0%, rgba(8,2,0,0.85) 100%)',
  },
  shadows: {
    glowPrimary:   '0 0 20px rgba(239,68,68,0.5), 0 0 60px rgba(239,68,68,0.2)',
    glowSecondary: '0 0 20px rgba(249,115,22,0.5), 0 0 60px rgba(249,115,22,0.2)',
    cardDepth:     '0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,100,0,0.06)',
  },
  blur: {
    glass: 'blur(16px)',
    modal: 'blur(22px)',
  },
};

// ─────────────────────────────────────────
// KOLEKSI SEMUA TEMA
// ─────────────────────────────────────────
export const THEMES: Record<string, Theme> = {
  'fantasy-dark':  THEME_FANTASY_DARK,
  'cyber-neon':    THEME_CYBER_NEON,
  'void-purple':   THEME_VOID_PURPLE,
  'ember-forge':   THEME_EMBER_FORGE,
};

export const DEFAULT_THEME_ID = 'fantasy-dark';
export const DEFAULT_THEME = THEME_FANTASY_DARK;
export const ALL_THEME_IDS = Object.keys(THEMES);
