'use client';

// ============================================================
// ANIMATED SECTION — Wrapper Framer Motion untuk entrance animation
// Bungkus section/element apapun untuk animasi masuk otomatis
// ============================================================

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  magicalReveal,
} from '@/lib/animations';

type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'magical';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  viewport?: boolean;        // Trigger saat masuk viewport (scroll)
  once?: boolean;            // Hanya animasi sekali
}

const ANIMATION_MAP: Record<AnimationType, Variants> = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  magical: magicalReveal,
};

export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className,
  as = 'div',
  viewport = false,
  once = true,
}: AnimatedSectionProps) {
  const variants = ANIMATION_MAP[animation];
  const MotionTag = motion.create(as);

  // Tambahkan delay ke variants
  const delayedVariants: Variants = delay > 0
    ? {
        ...variants,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...((variants.visible as { transition?: object })?.transition ?? {}),
            delay,
          },
        },
      }
    : variants;

  return (
    <MotionTag
      variants={delayedVariants}
      initial="hidden"
      {...(viewport
        ? { whileInView: 'visible', viewport: { once, margin: '-80px 0px' } }
        : { animate: 'visible' }
      )}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
