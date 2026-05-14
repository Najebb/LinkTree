'use client';

// ============================================================
// PARALLAX CONTAINER — Mouse-reactive parallax wrapper
// Memberikan efek kedalaman fake 3D pada background layers
// Setiap child layer bisa punya depth berbeda
// ============================================================

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  /** Intensitas parallax (0 = tidak bergerak, 1 = sangat responsif) */
  depth?: number;
  className?: string;
  /** Hanya aktif di desktop */
  desktopOnly?: boolean;
}

export function ParallaxContainer({
  children,
  depth = 0.02,
  className,
  desktopOnly = true,
}: ParallaxContainerProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  // Raw mouse position → spring-smoothed offset
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 30, stiffness: 80, mass: 0.5 });
  const y = useSpring(rawY, { damping: 30, stiffness: 80, mass: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize ke -1..1 dari center
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    rawX.set(cx * depth * 100);
    rawY.set(cy * depth * 100);
  }, [depth, rawX, rawY]);

  useEffect(() => {
    if (desktopOnly && 'ontouchstart' in window) return;
    setIsEnabled(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, desktopOnly]);

  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
