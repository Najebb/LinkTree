'use client';

// ============================================================
// AURORA LAYER — Cahaya aurora yang bergerak lambat
// Efek cahaya utara yang ethereal dan magical
// ============================================================

import { motion } from 'framer-motion';

export function AuroraLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora band 1 — primary color */}
      <motion.div
        className="absolute w-[120%] h-[40%] -left-[10%] top-[5%]"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            var(--color-aurora-1) 30%,
            var(--color-aurora-2) 60%,
            transparent 100%
          )`,
          opacity: 0.06,
          filter: 'blur(80px)',
          transformOrigin: 'center',
        }}
        animate={{
          x: ['-5%', '5%', '-5%'],
          skewX: ['-3deg', '3deg', '-3deg'],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Aurora band 2 — secondary, offset */}
      <motion.div
        className="absolute w-[100%] h-[30%] left-[5%] top-[15%]"
        style={{
          background: `linear-gradient(
            100deg,
            transparent 0%,
            var(--color-aurora-2) 40%,
            var(--color-primary-light) 70%,
            transparent 100%
          )`,
          opacity: 0.04,
          filter: 'blur(100px)',
          transformOrigin: 'center',
        }}
        animate={{
          x: ['3%', '-4%', '3%'],
          skewX: ['2deg', '-2deg', '2deg'],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Aurora band 3 — accent, subtle */}
      <motion.div
        className="absolute w-[80%] h-[20%] left-[10%] top-[25%]"
        style={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            var(--color-accent-glow) 0%,
            transparent 70%
          )`,
          opacity: 0.03,
          filter: 'blur(120px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  );
}
