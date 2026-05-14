'use client';

// ============================================================
// SHOOTING STARS — Bintang jatuh yang sesekali melintas
// Muncul secara random untuk memberikan kesan hidup
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  duration: number;
}

export function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const idRef = { current: 0 };

  const spawnStar = useCallback(() => {
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 40,
      angle: Math.random() * 30 + 20,     // 20-50 derajat
      length: Math.random() * 150 + 80,   // 80-230px panjang trail
      duration: Math.random() * 0.8 + 0.4, // 0.4-1.2s
    };

    setStars(prev => [...prev, newStar]);

    // Hapus setelah animasi selesai
    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== newStar.id));
    }, (newStar.duration + 0.5) * 1000);
  }, []);

  useEffect(() => {
    // Spawn shooting star secara random setiap 4-10 detik
    const scheduleNext = () => {
      const delay = Math.random() * 6000 + 4000;
      return setTimeout(() => {
        spawnStar();
        timerRef = scheduleNext();
      }, delay);
    };

    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, [spawnStar]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {stars.map(star => {
          const rad = (star.angle * Math.PI) / 180;
          const dx = Math.cos(rad) * star.length;
          const dy = Math.sin(rad) * star.length;

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                width: `${star.length}px`,
                height: '1.5px',
                background: `linear-gradient(90deg, var(--color-star) 0%, transparent 100%)`,
                transformOrigin: '0 50%',
                rotate: `${star.angle}deg`,
                borderRadius: '2px',
                boxShadow: '0 0 6px var(--color-star)',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: star.duration,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
