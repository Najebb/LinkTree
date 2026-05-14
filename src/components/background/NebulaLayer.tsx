'use client';

// ============================================================
// NEBULA LAYER — Cosmic dust / nebula clouds
// Gumpalan cahaya warna-warni yang bergerak sangat lambat
// Memberikan kedalaman atmosfer seperti angkasa
// ============================================================

import { motion } from 'framer-motion';

interface NebulaCloudProps {
  color: string;
  size: number;
  x: string;
  y: string;
  blur: number;
  opacity: number;
  duration: number;
  delay?: number;
}

function NebulaCloud({ color, size, x, y, blur, opacity, duration, delay = 0 }: NebulaCloudProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size * 0.6}px`,
        background: `radial-gradient(ellipse at 50% 50%, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        x: ['0%', '3%', '-2%', '0%'],
        y: ['0%', '-2%', '1%', '0%'],
        scale: [1, 1.05, 0.97, 1],
        opacity: [opacity * 0.7, opacity, opacity * 0.8, opacity * 0.7],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function NebulaLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Nebula primer — ungu besar di pusat atas */}
      <NebulaCloud
        color="var(--color-primary-glow)"
        size={600}
        x="20%"
        y="-10%"
        blur={100}
        opacity={0.06}
        duration={20}
      />

      {/* Nebula sekunder — biru di kanan */}
      <NebulaCloud
        color="var(--color-secondary-glow)"
        size={400}
        x="65%"
        y="20%"
        blur={80}
        opacity={0.04}
        duration={25}
        delay={3}
      />

      {/* Nebula aksen — emas di kiri bawah */}
      <NebulaCloud
        color="var(--color-accent-glow)"
        size={300}
        x="5%"
        y="60%"
        blur={90}
        opacity={0.03}
        duration={18}
        delay={6}
      />

      {/* Nebula kecil — highlight */}
      <NebulaCloud
        color="var(--color-primary-glow)"
        size={200}
        x="75%"
        y="65%"
        blur={60}
        opacity={0.04}
        duration={15}
        delay={9}
      />
    </div>
  );
}
