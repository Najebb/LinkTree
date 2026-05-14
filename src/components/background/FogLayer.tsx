'use client';

// ============================================================
// FOG LAYER — Kabut halus yang bergerak lambat
// Memberikan depth dan mystery pada scene
// ============================================================

import { motion } from 'framer-motion';

export function FogLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fog bawah — naik dari bawah */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[50%]"
        style={{
          background: `linear-gradient(
            to top,
            var(--color-fog) 0%,
            transparent 100%
          )`,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Fog tengah — bergerak horizontal */}
      <motion.div
        className="absolute top-[40%] -left-[20%] w-[140%] h-[30%]"
        style={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            var(--color-fog) 0%,
            transparent 70%
          )`,
          filter: 'blur(40px)',
        }}
        animate={{
          x: ['-5%', '5%', '-5%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Fog atas — sangat subtle */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[30%]"
        style={{
          background: `linear-gradient(
            to bottom,
            var(--color-bg-primary) 0%,
            transparent 100%
          )`,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
