'use client';

// ============================================================
// GRADIENT TEXT — Komponen reusable teks dengan efek gradient
// Mendukung: gradient, holographic, glow
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { magicalReveal } from '@/lib/animations';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'holographic' | 'subtle';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  animated?: boolean;       // Apakah pakai entrance animation
  glow?: boolean;           // Tambahkan text glow
  delay?: number;           // Delay animasi (detik)
}

export function GradientText({
  children,
  variant = 'gradient',
  as: Tag = 'span',
  className,
  animated = false,
  glow = false,
  delay = 0,
}: GradientTextProps) {
  // Pilih class berdasarkan variant
  const variantClass = {
    gradient:    'text-gradient',
    holographic: 'holographic',
    subtle:      'text-gradient-subtle',
  }[variant];

  const glowClass = glow ? 'glow-text-primary' : '';

  // Tanpa animasi — render langsung
  if (!animated) {
    return (
      <Tag className={cn(variantClass, glowClass, className)}>
        {children}
      </Tag>
    );
  }

  // Dengan animasi — pakai Framer Motion
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      variants={magicalReveal}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={cn(variantClass, glowClass, className)}
    >
      {children}
    </MotionTag>
  );
}
