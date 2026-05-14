'use client';

// ============================================================
// COMPANION DIALOGUE — Speech bubble with cinematic appearance
// Anchored from the RIGHT side since companion sits bottom-right
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';

interface CompanionDialogueProps {
  text: string | null;
}

export function CompanionDialogue({ text }: CompanionDialogueProps) {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={text}
          className="absolute"
          style={{
            bottom: '100%',
            right: 0,
            marginBottom: '12px',
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Bubble */}
          <div
            className="relative px-4 py-2 rounded-2xl"
            style={{
              background: 'rgba(17, 11, 36, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(124, 58, 237, 0.1)',
            }}
          >
            <p
              className="text-xs font-body leading-relaxed"
              style={{
                color: 'var(--color-text-secondary)',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{text}&rdquo;
            </p>

            {/* Bubble tail — positioned right-aligned to point at companion */}
            <div
              className="absolute -bottom-1.5 w-3 h-3 rotate-45"
              style={{
                right: '20px',
                background: 'rgba(17, 11, 36, 0.88)',
                borderRight: '1px solid rgba(124, 58, 237, 0.2)',
                borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
