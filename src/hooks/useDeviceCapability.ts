'use client';

// ============================================================
// USE DEVICE CAPABILITY — Hook deteksi kemampuan device
// Menentukan level efek berdasarkan hardware/connection
// ============================================================

import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

interface DeviceCapability {
  /** Tier performa device */
  tier: PerformanceTier;
  /** Apakah mobile/tablet */
  isMobile: boolean;
  /** Apakah touch device */
  isTouch: boolean;
  /** Apakah user memilih reduced motion */
  prefersReducedMotion: boolean;
  /** Viewport width */
  viewportWidth: number;
}

/**
 * Deteksi kemampuan device untuk adaptive performance
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    tier: 'high',
    isMobile: false,
    isTouch: false,
    prefersReducedMotion: false,
    viewportWidth: 1200,
  });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine tier
    let tier: PerformanceTier = 'high';

    if (prefersReducedMotion) {
      tier = 'low';
    } else if (isMobile) {
      // Check for low-end mobile
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      if (cores <= 2 || memory <= 2) {
        tier = 'low';
      } else {
        tier = 'medium';
      }
    }

    setCapability({
      tier,
      isMobile,
      isTouch,
      prefersReducedMotion,
      viewportWidth: window.innerWidth,
    });
  }, []);

  return capability;
}

/**
 * Returns performance-adjusted counts
 */
export function getAdaptiveCounts(tier: PerformanceTier) {
  switch (tier) {
    case 'high':
      return { stars: 90, particles: 25, enableParallax: true, enableShootingStars: true, enableNebula: true };
    case 'medium':
      return { stars: 50, particles: 15, enableParallax: true, enableShootingStars: true, enableNebula: true };
    case 'low':
      return { stars: 25, particles: 8, enableParallax: false, enableShootingStars: false, enableNebula: false };
  }
}
