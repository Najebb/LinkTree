'use client';

// ============================================================
// COMPANION EVENTS — Rare ambient magical effects
// Random magical bursts that happen infrequently
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AmbientEvent {
  id: number;
  type: 'sparkle' | 'spell' | 'fallingStar' | 'magicBurst';
  x: number;
  y: number;
}

export function CompanionEvents({ mood }: { mood: string }) {
  const [events, setEvents] = useState<AmbientEvent[]>([]);

  useEffect(() => {
    // Cinematic ambient events: every 15-40 seconds
    const scheduleEvent = () => {
      const delay = Math.random() * 25000 + 15000;
      const timer = setTimeout(() => {
        const roll = Math.random();
        let type: AmbientEvent['type'] = 'sparkle';
        
        if (roll < 0.1) type = 'magicBurst';
        else if (roll < 0.2) type = 'fallingStar';
        else if (roll < 0.5) type = 'spell';

        const event: AmbientEvent = {
          id: Date.now(),
          type,
          x: Math.random() * 60 + 10,
          y: Math.random() * 60 + 10,
        };

        setEvents(prev => [...prev, event]);

        // Remove after animation completes
        setTimeout(() => {
          setEvents(prev => prev.filter(e => e.id !== event.id));
        }, type === 'fallingStar' ? 2000 : 1500);

        scheduleEvent();
      }, delay);
      return timer;
    };

    const t = scheduleEvent();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      <AnimatePresence>
        {events.map(event => {
          if (event.type === 'fallingStar') {
            return (
              <motion.div
                key={event.id}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                style={{ right: '10%', top: '0%' }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: -100, y: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeIn' }}
              />
            );
          }
          if (event.type === 'magicBurst') {
            return (
              <motion.div
                key={event.id}
                className="absolute inset-0 border-2 rounded-full"
                style={{
                  borderColor: mood === 'magical' ? 'var(--color-accent-light)' : 'var(--color-primary-light)',
                  boxShadow: `0 0 20px ${mood === 'magical' ? 'var(--color-accent-glow)' : 'var(--color-primary-glow)'}`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 1.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            );
          }

          return (
            <motion.div
              key={event.id}
              className="absolute"
              style={{
                left: `${event.x}%`,
                top: `${event.y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {event.type === 'sparkle' ? (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    boxShadow: '0 0 8px var(--color-primary-glow)',
                  }}
                />
              ) : (
                <div
                  className="w-3 h-3 rotate-45"
                  style={{
                    border: '1px solid var(--color-primary-light)',
                    boxShadow: '0 0 6px var(--color-primary-glow)',
                    opacity: 0.6,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
