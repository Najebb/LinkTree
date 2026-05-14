'use client';

// ============================================================
// SMOOTH SCROLL PROVIDER — Lenis-powered smooth scrolling
// Wraps the app to provide buttery smooth scroll experience
// Integrated with GSAP ScrollTrigger for compatibility
// ============================================================

import { useEffect, useRef } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default;

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        // Sync with GSAP ScrollTrigger if available
        try {
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          const { gsap } = await import('gsap');
          gsap.registerPlugin(ScrollTrigger);

          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } catch {
          // GSAP not available, use own RAF
          function raf(time: number) {
            lenis.raf(time);
            animationId = requestAnimationFrame(raf);
          }
          animationId = requestAnimationFrame(raf);
        }
      } catch {
        // Lenis not installed, graceful fallback (native scroll)
        console.info('[SmoothScroll] Lenis not available, using native scroll');
      }
    }

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return <>{children}</>;
}
