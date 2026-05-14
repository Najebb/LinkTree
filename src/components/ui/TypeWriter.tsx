'use client';

// ============================================================
// TYPEWRITER — Efek ketik satu per satu karakter
// Mendukung multiple strings yang bergantian
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypeWriterProps {
  strings: string[];           // Array teks yang akan diketik bergantian
  typeSpeed?: number;          // Kecepatan ketik (ms per karakter)
  deleteSpeed?: number;        // Kecepatan hapus (ms per karakter)
  pauseDuration?: number;      // Pause setelah selesai ketik (ms)
  className?: string;
  cursorColor?: string;        // Warna cursor (CSS variable)
  loop?: boolean;              // Loop terus atau berhenti di akhir
}

export function TypeWriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className,
  cursorColor = 'var(--color-primary-light)',
  loop = true,
}: TypeWriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentString = strings[currentIndex] || '';

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Sedang mengetik
      if (displayText.length < currentString.length) {
        setDisplayText(currentString.slice(0, displayText.length + 1));
      } else {
        // Selesai mengetik — pause dulu
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          // Jika di string terakhir dan tidak loop, berhenti
          if (!loop && currentIndex === strings.length - 1) return;
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Sedang menghapus
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Selesai menghapus — pindah ke string berikutnya
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
      }
    }
  }, [displayText, isDeleting, isPaused, currentString, currentIndex, strings, loop, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, typeSpeed]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayText}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      {/* Cursor berkedip */}
      <motion.span
        className="inline-block w-[2px] h-[1.1em] ml-0.5 rounded-full"
        style={{ backgroundColor: cursorColor }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  );
}
