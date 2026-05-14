'use client';

// ============================================================
// MAGNETIC WRAPPER — Magnetic hover effect
// Elemen "ditarik" ke arah kursor saat di-hover
// Cocok untuk buttons, icons, dan small interactive elements
// ============================================================

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticWrapperProps {
  children: React.ReactNode;
  /** Kekuatan tarikan (0-1, default 0.3) */
  strength?: number;
  /** Jarak aktif magnetic dalam pixel */
  radius?: number;
  className?: string;
  /** Apakah aktif di mobile */
  mobileEnabled?: boolean;
}

export function MagneticWrapper({
  children,
  strength = 0.3,
  radius = 150,
  className,
  mobileEnabled = false,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 15, stiffness: 200, mass: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < radius) {
      x.set(distX * strength);
      y.set(distY * strength);
    }
  }, [strength, radius, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
