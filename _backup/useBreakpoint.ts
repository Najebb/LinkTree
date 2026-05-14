'use client';

// ============================================================
// FANTASY REALM — useBreakpoint HOOK
// Deteksi ukuran layar secara reaktif (update saat resize)
// ============================================================

import { useState, useEffect } from 'react';
import { getDeviceInfo, getPerfConfig } from '@/lib/utils/device';
import type { DeviceInfo } from '@/types';

const DEFAULT_INFO: DeviceInfo = {
  breakpoint: 'desktop',
  isMobile:   false,
  isTablet:   false,
  isDesktop:  true,
  isWide:     false,
  width:      1280,
  height:     800,
};

export function useBreakpoint() {
  const [device, setDevice] = useState<DeviceInfo>(DEFAULT_INFO);

  useEffect(() => {
    function update() {
      setDevice(getDeviceInfo(window.innerWidth, window.innerHeight));
    }

    // Set langsung saat mount
    update();

    // Debounce resize untuk performa
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 100);
    };

    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      clearTimeout(timer);
    };
  }, []);

  const perfConfig = getPerfConfig(device.width);

  return {
    ...device,
    perfConfig,

    // Shortcut helpers
    showCinematic: device.isDesktop || device.isWide,
    show3D:        (device.isDesktop || device.isWide) && perfConfig.enable3D,
  };
}
