'use client';

// ============================================================
// CINEMATIC REVEAL — GSAP ScrollTrigger powered section reveal
// Animasi masuk yang dramatis saat elemen masuk viewport
// Mendukung berbagai efek: blur, slide, scale, split
// ============================================================

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type RevealEffect = 'fade-up' | 'fade-blur' | 'scale-blur' | 'slide-left' | 'slide-right' | 'split-lines';

interface CinematicRevealProps {
  children: React.ReactNode;
  /** Efek reveal yang digunakan */
  effect?: RevealEffect;
  /** Durasi animasi (detik) */
  duration?: number;
  /** Delay sebelum animasi (detik) */
  delay?: number;
  /** Kapan trigger mulai (GSAP start format) */
  start?: string;
  /** Stagger children (jika ada multiple child elements) */
  stagger?: number;
  className?: string;
  /** Tag HTML yang digunakan */
  as?: 'div' | 'section' | 'article' | 'aside';
}

const effectConfigs: Record<RevealEffect, { from: gsap.TweenVars }> = {
  'fade-up': {
    from: { opacity: 0, y: 50 },
  },
  'fade-blur': {
    from: { opacity: 0, y: 30, filter: 'blur(8px)' },
  },
  'scale-blur': {
    from: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  },
  'slide-left': {
    from: { opacity: 0, x: -60 },
  },
  'slide-right': {
    from: { opacity: 0, x: 60 },
  },
  'split-lines': {
    from: { opacity: 0, y: 30, rotateX: 15 },
  },
};

export function CinematicReveal({
  children,
  effect = 'fade-blur',
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  stagger = 0,
  className,
  as: Tag = 'div',
}: CinematicRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    let cleanup: (() => void) | undefined;

    async function init() {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        if (!ref.current) return;

        const config = effectConfigs[effect];
        const targets = stagger > 0
          ? ref.current.children
          : ref.current;

        const to: gsap.TweenVars = {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration,
          delay,
          ease: 'power3.out',
          ...(stagger > 0 ? { stagger } : {}),
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
            once: true,
          },
        };

        gsap.fromTo(targets, config.from, to);
        hasAnimated.current = true;

        cleanup = () => {
          ScrollTrigger.getAll()
            .filter(t => t.trigger === ref.current)
            .forEach(t => t.kill());
        };
      } catch {
        // GSAP not available — show content immediately
        if (ref.current) {
          ref.current.style.opacity = '1';
        }
      }
    }

    init();

    return () => cleanup?.();
  }, [effect, duration, delay, start, stagger]);

  return (
    <Tag ref={ref as any} className={cn('will-change-transform', className)} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
