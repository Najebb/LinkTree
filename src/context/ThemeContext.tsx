'use client';

// ============================================================
// FANTASY REALM — THEME CONTEXT
// Mengelola tema aktif dan menginjeksi CSS variables ke <html>
// Tema tersimpan di localStorage agar persist saat refresh
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { THEMES, DEFAULT_THEME_ID, DEFAULT_THEME } from '@/constants';
import type { Theme, ThemeId } from '@/types';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface ThemeContextValue {
  theme:       Theme;           // Tema aktif saat ini
  themeId:     ThemeId;         // ID tema aktif
  setTheme:    (id: ThemeId) => void;
  allThemes:   Theme[];         // Semua tema yang tersedia
  isChanging:  boolean;         // True saat transisi tema sedang berlangsung
}

// ─────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─────────────────────────────────────────
// CSS VARIABLE INJECTOR
// Mengubah tema menjadi CSS custom properties di :root
// ─────────────────────────────────────────

function injectThemeCSSVars(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const { colors, gradients, shadows, blur } = theme;

  // Colors
  root.style.setProperty('--color-bg-primary',     colors.bgPrimary);
  root.style.setProperty('--color-bg-secondary',   colors.bgSecondary);
  root.style.setProperty('--color-bg-tertiary',    colors.bgTertiary);
  root.style.setProperty('--color-bg-glass',       colors.bgGlass);

  root.style.setProperty('--color-primary',        colors.primary);
  root.style.setProperty('--color-primary-glow',   colors.primaryGlow);
  root.style.setProperty('--color-primary-light',  colors.primaryLight);

  root.style.setProperty('--color-secondary',      colors.secondary);
  root.style.setProperty('--color-secondary-glow', colors.secondaryGlow);
  root.style.setProperty('--color-secondary-light',colors.secondaryLight);

  root.style.setProperty('--color-accent',         colors.accent);
  root.style.setProperty('--color-accent-glow',    colors.accentGlow);

  root.style.setProperty('--color-text-primary',   colors.textPrimary);
  root.style.setProperty('--color-text-secondary', colors.textSecondary);
  root.style.setProperty('--color-text-muted',     colors.textMuted);

  root.style.setProperty('--color-border-primary', colors.borderPrimary);
  root.style.setProperty('--color-border-glow',    colors.borderGlow);

  // Background effect colors
  root.style.setProperty('--color-star',           colors.starColor);
  root.style.setProperty('--color-aurora-1',       colors.auroraColor1);
  root.style.setProperty('--color-aurora-2',       colors.auroraColor2);
  root.style.setProperty('--color-particle',       colors.particleColor);
  root.style.setProperty('--color-fog',            colors.fogColor);

  // Gradients
  root.style.setProperty('--gradient-hero-bg',     gradients.heroBackground);
  root.style.setProperty('--gradient-card-bg',     gradients.cardBackground);
  root.style.setProperty('--gradient-text',        gradients.textPrimary);
  root.style.setProperty('--gradient-button',      gradients.buttonPrimary);
  root.style.setProperty('--gradient-glow',        gradients.glowPrimary);
  root.style.setProperty('--gradient-overlay',     gradients.overlayDark);

  // Shadows
  root.style.setProperty('--shadow-glow-primary',  shadows.glowPrimary);
  root.style.setProperty('--shadow-glow-secondary',shadows.glowSecondary);
  root.style.setProperty('--shadow-card',          shadows.cardDepth);

  // Blur
  root.style.setProperty('--blur-glass',           blur.glass);
  root.style.setProperty('--blur-modal',           blur.modal);

  // Theme ID di attribute (untuk CSS selector theming jika diperlukan)
  root.setAttribute('data-theme', theme.id);
}

// ─────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────

const STORAGE_KEY = 'fantasy-realm-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [isChanging, setIsChanging] = useState(false);

  // Ambil tema dari localStorage saat pertama kali mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && THEMES[stored]) {
      setThemeId(stored);
      injectThemeCSSVars(THEMES[stored]);
    } else {
      injectThemeCSSVars(DEFAULT_THEME);
    }
  }, []);

  // Ganti tema dengan animasi transisi singkat
  const setTheme = useCallback((id: ThemeId) => {
    if (!THEMES[id] || id === themeId) return;

    setIsChanging(true);

    // Sedikit delay agar transisi CSS berjalan mulus
    setTimeout(() => {
      setThemeId(id);
      injectThemeCSSVars(THEMES[id]);
      localStorage.setItem(STORAGE_KEY, id);
      setIsChanging(false);
    }, 150);
  }, [themeId]);

  const theme = useMemo(() => THEMES[themeId] ?? DEFAULT_THEME, [themeId]);
  const allThemes = useMemo(() => Object.values(THEMES), []);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    themeId,
    setTheme,
    allThemes,
    isChanging,
  }), [theme, themeId, setTheme, allThemes, isChanging]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─────────────────────────────────────────
// HOOK (digunakan di komponen)
// ─────────────────────────────────────────

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext harus digunakan di dalam <ThemeProvider>');
  }
  return ctx;
}
