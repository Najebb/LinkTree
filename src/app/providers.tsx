'use client';

// ============================================================
// FANTASY REALM — PROVIDERS WRAPPER
// Menggabungkan semua Context Providers di satu tempat
// Digunakan oleh layout.tsx
// ============================================================

import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
