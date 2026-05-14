// ============================================================
// FANTASY REALM — DEVICE UTILITIES
// Deteksi breakpoint dan konfigurasi performa per device
// Digunakan oleh useBreakpoint hook
// ============================================================

import { BREAKPOINTS, PERF_CONFIG } from '@/constants';
import type { DeviceInfo, Breakpoint } from '@/types';

/**
 * Tentukan breakpoint aktif berdasarkan lebar layar
 */
export function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.wide)    return 'wide';
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.tablet)  return 'tablet';
  return 'mobile';
}

/**
 * Dapatkan informasi device lengkap
 */
export function getDeviceInfo(width: number, height: number): DeviceInfo {
  const breakpoint = getBreakpoint(width);

  return {
    breakpoint,
    isMobile:  breakpoint === 'mobile',
    isTablet:  breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isWide:    breakpoint === 'wide',
    width,
    height,
  };
}

/**
 * Dapatkan konfigurasi performa berdasarkan lebar layar
 * Desktop = full cinematic, Mobile = optimized
 */
export function getPerfConfig(width: number) {
  const breakpoint = getBreakpoint(width);
  const isDesktopOrWide = breakpoint === 'desktop' || breakpoint === 'wide';
  return isDesktopOrWide ? PERF_CONFIG.desktop : PERF_CONFIG.mobile;
}

/**
 * Cek apakah browser mendukung backdrop-filter (untuk glassmorphism)
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return true;
  return CSS.supports('backdrop-filter', 'blur(1px)');
}

/**
 * Cek apakah user prefer reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
