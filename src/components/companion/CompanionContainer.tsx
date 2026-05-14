'use client';

// ============================================================
// COMPANION CONTAINER — Phase 2 Orchestrator
// Integrates: mood system, dialogue, events, section awareness
// ============================================================

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanionSprite } from './CompanionSprite';
import { CompanionAura } from './CompanionAura';
import { CompanionDialogue } from './CompanionDialogue';
import { CompanionEvents } from './CompanionEvents';
import { useCompanionState } from './useCompanionState';
import { useDeviceCapability } from '@/hooks';

export function CompanionContainer() {
  const device = useDeviceCapability();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const {
    mood,
    dialogue,
    isBlinking,
    idlePose,
    smoothCursorX,
    smoothCursorY,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    updateCursorPosition,
  } = useCompanionState();

  // ── ENTRANCE ──
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ── CURSOR TRACKING (desktop only) ──
  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || device.isTouch) return;
    const rect = containerRef.current.getBoundingClientRect();
    updateCursorPosition(e.clientX, e.clientY, rect);
  }, [updateCursorPosition, device.isTouch]);

  useEffect(() => {
    if (device.isTouch) return;
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [handleGlobalMouseMove, device.isTouch]);

  // Don't render on low-tier
  if (device.tier === 'low') return null;

  const size = device.isMobile ? 80 : 110;

  return (
    <AnimatePresence>
      {hasEntered && (
        <motion.div
          className="fixed z-50"
          style={{
            bottom: device.isMobile ? '24px' : '32px',
            right: device.isMobile ? '24px' : '32px',
            width: `${size}px`,
            height: `${size}px`,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dialogue bubble */}
          <CompanionDialogue text={dialogue} />

          {/* Ambient events (rare sparkles) */}
          {!device.isMobile && <CompanionEvents mood={mood} />}

          {/* Floating wrapper */}
          <motion.div
            ref={containerRef}
            className="relative cursor-pointer select-none w-full h-full"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
              y: idlePose === 'sleeping' ? [0, -2, 0] : [0, -6, 0],
            }}
            transition={{
              duration: idlePose === 'sleeping' ? 6 : 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Aura */}
            {!device.isMobile && <CompanionAura mood={mood} />}

            {/* Sprite */}
            <CompanionSprite
              isBlinking={isBlinking}
              cursorX={smoothCursorX}
              cursorY={smoothCursorY}
              mood={mood}
              idlePose={idlePose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
