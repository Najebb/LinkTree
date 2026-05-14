import type { NextConfig } from 'next';

// ============================================================
// FANTASY REALM — NEXT.JS CONFIGURATION
// ============================================================

const nextConfig: NextConfig = {
  // Aktifkan React strict mode untuk development
  reactStrictMode: true,

  // Konfigurasi gambar eksternal (jika diperlukan nanti)
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 50, 75, 100],
  },

  // Transpile Three.js packages
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
};

export default nextConfig;
