// ============================================================
// FANTASY REALM — GSAP UTILITIES
// Helper functions untuk animasi GSAP & ScrollTrigger
// Requires: npm install gsap
// ============================================================

import { DURATION, GSAP_EASE, TRANSFORM, DELAY } from '@/constants';

// ─────────────────────────────────────────
// GSAP LAZY LOADER
// Import GSAP hanya di client side
// ─────────────────────────────────────────

let gsapInstance: typeof import('gsap').gsap | null = null;
let scrollTriggerLoaded = false;

/**
 * Lazy load GSAP + ScrollTrigger (hanya di browser)
 */
export async function loadGSAP() {
  if (typeof window === 'undefined') return null;
  if (gsapInstance) return gsapInstance;

  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  if (!scrollTriggerLoaded) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerLoaded = true;
  }

  gsapInstance = gsap;
  return gsap;
}

// ─────────────────────────────────────────
// ANIMASI MASUK (Entrance)
// ─────────────────────────────────────────

/**
 * Animasi fade in + slide up untuk elemen
 */
export async function animateIn(
  element: string | Element,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y ?? TRANSFORM.enterFromBottom,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? DURATION.slow,
      delay: options?.delay ?? 0,
      ease: GSAP_EASE.cinematic,
    }
  );
}

/**
 * Animasi stagger untuk banyak elemen sekaligus
 */
export async function animateStagger(
  elements: string | Element[],
  options?: {
    delay?: number;
    stagger?: number;
    y?: number;
  }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  gsap.fromTo(
    elements,
    { opacity: 0, y: options?.y ?? TRANSFORM.enterFromBottom },
    {
      opacity: 1,
      y: 0,
      duration: DURATION.slow,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? DELAY.stagger,
      ease: GSAP_EASE.cinematic,
    }
  );
}

// ─────────────────────────────────────────
// SCROLL TRIGGER ANIMATIONS
// ─────────────────────────────────────────

/**
 * Animasi yang trigger saat element masuk viewport
 */
export async function scrollReveal(
  element: string | Element,
  options?: {
    y?: number;
    duration?: number;
    start?: string;
  }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.fromTo(
    element,
    { opacity: 0, y: options?.y ?? TRANSFORM.enterFromBottom },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? DURATION.slow,
      ease: GSAP_EASE.cinematic,
      scrollTrigger: {
        trigger: element as Element,
        start: options?.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animasi stagger dengan scroll trigger
 */
export async function scrollRevealStagger(
  container: string | Element,
  children: string,
  options?: {
    stagger?: number;
    start?: string;
  }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.fromTo(
    `${container} ${children}`,
    { opacity: 0, y: TRANSFORM.enterFromBottom },
    {
      opacity: 1,
      y: 0,
      duration: DURATION.slow,
      stagger: options?.stagger ?? DELAY.stagger,
      ease: GSAP_EASE.cinematic,
      scrollTrigger: {
        trigger: container as Element,
        start: options?.start ?? 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Parallax effect pada elemen saat scroll
 */
export async function parallaxScroll(
  element: string | Element,
  strength: number = 0.3
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.to(element, {
    y: () => window.innerHeight * strength,
    ease: GSAP_EASE.linear,
    scrollTrigger: {
      trigger: element as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ─────────────────────────────────────────
// EFEK KHUSUS
// ─────────────────────────────────────────

/**
 * Magical text reveal — huruf muncul satu per satu
 */
export async function magicalTextReveal(
  element: string | Element,
  options?: { delay?: number }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  const el = typeof element === 'string'
    ? document.querySelector(element)
    : element;
  if (!el) return;

  const text = el.textContent || '';
  el.textContent = '';

  // Buat span untuk setiap karakter
  const spans = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    el.appendChild(span);
    return span;
  });

  gsap.fromTo(
    spans,
    { opacity: 0, y: 20, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: DURATION.normal,
      stagger: 0.03,
      delay: options?.delay ?? 0,
      ease: GSAP_EASE.cinematic,
    }
  );
}

/**
 * Counter animation (angka naik dari 0 ke target)
 */
export async function animateCounter(
  element: string | Element,
  target: number,
  options?: { duration?: number; suffix?: string }
) {
  const gsap = await loadGSAP();
  if (!gsap) return;

  const el = typeof element === 'string'
    ? document.querySelector(element)
    : element;
  if (!el) return;

  const suffix = options?.suffix ?? '';
  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration: options?.duration ?? DURATION.epic,
    ease: GSAP_EASE.cinematic,
    onUpdate: () => {
      el.textContent = Math.round(obj.value) + suffix;
    },
  });
}

// ─────────────────────────────────────────
// CLEANUP
// ─────────────────────────────────────────

/**
 * Kill semua ScrollTrigger instances (untuk cleanup di useEffect)
 */
export async function killScrollTriggers() {
  if (typeof window === 'undefined') return;
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
