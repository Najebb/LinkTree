'use client';

// ============================================================
// MAGIC CURSOR — Custom Pointer with Sparkle Trail
// Dioptimasi hanya untuk perangkat desktop (pointer: fine)
// ============================================================

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeContext';

export function MagicCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useThemeContext();

  // Mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring for the outer ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hanya aktifkan kursor kustom jika perangkat memiliki mouse/trackpad (bukan touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Perbesar kursor jika hover pada tombol, link, atau input
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Sembunyikan kursor asli melalui global CSS jika di desktop
    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* ── CORE DOT ── */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: theme.colors.primaryLight,
          boxShadow: `0 0 10px ${theme.colors.primary}`,
        }}
      />

      {/* ── OUTER MAGIC RING ── */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: theme.colors.primary,
          boxShadow: `inset 0 0 8px ${theme.colors.primaryGlow}, 0 0 8px ${theme.colors.primaryGlow}`,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
          borderWidth: isHovering ? '2px' : '1px',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
