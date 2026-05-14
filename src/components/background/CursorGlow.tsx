'use client';

// ============================================================
// CURSOR GLOW — Cahaya halus yang mengikuti cursor mouse
// Memberikan kesan interaktif dan magical
// ============================================================

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing agar gerakan halus
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 120 });

  useEffect(() => {
    // Hanya di desktop (tidak ada touch)
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-cursor"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Glow utama */}
      <div
        className="w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            var(--color-primary-glow) 0%,
            transparent 70%
          )`,
          filter: 'blur(35px)',
          opacity: 0.25,
        }}
      />
      {/* Glow sekunder */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            var(--color-accent-glow) 0%,
            transparent 70%
          )`,
          filter: 'blur(25px)',
          opacity: 0.12,
        }}
      />
    </motion.div>
  );
}
