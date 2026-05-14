'use client';

// ============================================================
// PARTICLES LAYER — Optimized floating particles
// Uses CSS animations instead of Framer Motion for better FPS
// Client-only to avoid hydration mismatch
// ============================================================

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 40,
    opacity: Math.random() * 0.5 + 0.1,
  }));
}

export function ParticlesLayer({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(count));
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--color-particle)',
            boxShadow: `0 0 ${p.size * 3}px var(--color-particle)`,
            opacity: p.opacity,
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
            willChange: 'transform',
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
