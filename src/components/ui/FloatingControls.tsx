'use client';

// ============================================================
// FLOATING CONTROLS
// Menyimpan tombol Audio dan Realm Switcher di pojok layar
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeContext';
import { useAudioContext } from '@/context/AudioContext';
import { ALL_THEME_IDS, THEMES } from '@/theme/theme';
import type { ThemeId } from '@/types';

export function FloatingControls() {
  const { themeId, setTheme } = useThemeContext();
  const { state: audioState, toggle: toggleAudio } = useAudioContext();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* ── AUDIO CONTROLS ── */}
      <button
        onClick={toggleAudio}
        className="w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md border transition-all duration-300 group"
        style={{
          backgroundColor: 'var(--color-bg-glass)',
          borderColor: audioState.enabled ? 'var(--color-primary)' : 'var(--color-border-primary)',
          boxShadow: audioState.enabled ? '0 0 15px var(--color-primary-glow)' : 'none',
        }}
        aria-label="Toggle ambient audio"
      >
        <span className="text-xl" style={{ color: audioState.enabled ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}>
          {audioState.enabled ? '🔊' : '🔇'}
        </span>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 10px var(--color-primary-glow)' }} />
      </button>

      {/* ── REALM SWITCHER ── */}
      <div className="relative pointer-events-auto">
        <button
          onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 group"
          style={{
            backgroundColor: 'var(--color-bg-glass)',
            borderColor: isThemeMenuOpen ? 'var(--color-primary)' : 'var(--color-border-primary)',
            boxShadow: isThemeMenuOpen ? '0 0 15px var(--color-primary-glow)' : 'none',
          }}
          title="Switch Realm"
        >
          <span className="text-xl">✨</span>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 10px var(--color-primary-glow)' }} />
        </button>

        <AnimatePresence>
          {isThemeMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 flex flex-col gap-2 p-2 rounded-2xl backdrop-blur-xl border"
              style={{
                backgroundColor: 'var(--color-bg-glass)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              {ALL_THEME_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setTheme(id as ThemeId);
                    setIsThemeMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-left whitespace-nowrap rounded-lg transition-colors hover:bg-white/10"
                  style={{
                    color: themeId === id ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                    fontWeight: themeId === id ? 'bold' : 'normal',
                  }}
                >
                  {THEMES[id].name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
