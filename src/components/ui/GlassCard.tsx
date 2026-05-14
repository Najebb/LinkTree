'use client';

// ============================================================
// GLASS CARD — Premium glassmorphism + 3D tilt + holographic
// Reusable base card dengan:
//   - 3D tilt yang mengikuti mouse (spring physics)
//   - Holographic color sweep yang bergerak real-time
//   - Light glare/reflection
//   - Edge glow on hover
//   - Cinematic reveal animation
// ============================================================

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glass?: 'thin' | 'standard' | 'strong' | 'frosted';
  tilt?: boolean;
  tiltIntensity?: number;
  shimmer?: boolean;
  holographic?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  glass = 'standard',
  tilt = true,
  tiltIntensity = 8,
  shimmer = false,
  holographic = false,
  glowOnHover = true,
  onClick,
  delay = 0,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt + glare
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [tiltIntensity, -tiltIntensity]),
    { damping: 20, stiffness: 200 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-tiltIntensity, tiltIntensity]),
    { damping: 20, stiffness: 200 }
  );

  // Glare position derived from mouse
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  // Holographic angle derived from mouse
  const holoAngle = useTransform(mouseX, [0, 1], [0, 360]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const glassClass = {
    thin: 'glass-thin',
    standard: 'glass',
    strong: 'glass-strong',
    frosted: 'glass-frosted',
  }[glass];

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-card overflow-hidden',
        glassClass,
        shimmer && 'border-shimmer',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{
        perspective: 1200,
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={glowOnHover ? {
        borderColor: 'var(--color-border-glow)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)',
        y: -3,
      } : undefined}
    >
      {/* ── Holographic color sweep (follows mouse real-time) ── */}
      {holographic && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.25 : 0,
            background: useTransform(
              holoAngle,
              (a) => `linear-gradient(
                ${a}deg,
                transparent 15%,
                rgba(124, 58, 237, 0.2) 30%,
                rgba(37, 99, 235, 0.15) 45%,
                rgba(245, 158, 11, 0.12) 60%,
                rgba(124, 58, 237, 0.1) 75%,
                transparent 85%
              )`
            ),
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* ── Light glare (radial, follows mouse) ── */}
      {tilt && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(
                circle at ${x}% ${y}%,
                rgba(255,255,255,0.1) 0%,
                rgba(255,255,255,0.03) 30%,
                transparent 60%
              )`
            ),
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* ── Edge glow top-line ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, var(--color-primary-light), var(--color-secondary-light), transparent)',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}
