'use client';

// ============================================================
// FANTASY REALM — useTheme HOOK
// Cara mudah mengakses dan mengganti tema di komponen manapun
// ============================================================

import { useThemeContext } from '@/context/ThemeContext';
import type { ThemeId } from '@/types';

export function useTheme() {
  const { theme, themeId, setTheme, allThemes, isChanging } = useThemeContext();

  return {
    // Data tema aktif
    theme,
    themeId,
    isChanging,

    // Semua tema
    allThemes,

    // Actions
    setTheme,
    nextTheme: () => {
      const ids = allThemes.map(t => t.id) as ThemeId[];
      const idx = ids.indexOf(themeId);
      const next = ids[(idx + 1) % ids.length];
      setTheme(next);
    },

    // Shortcut colors (paling sering digunakan)
    colors:    theme.colors,
    gradients: theme.gradients,
    shadows:   theme.shadows,
  };
}
