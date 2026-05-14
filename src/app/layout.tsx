// ============================================================
// FANTASY REALM — ROOT LAYOUT
// File paling atas di Next.js App Router
// Berisi: font loading, metadata SEO, providers (Theme + Audio)
// ============================================================

import type { Metadata, Viewport } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { Providers } from './providers';
import { FloatingControls } from '@/components/ui/FloatingControls';
import { MagicCursor } from '@/components/ui/MagicCursor';
import './globals.css';

// ─────────────────────────────────────────
// METADATA SEO
// ─────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  keywords: ['Portfolio', 'Developer', 'LinkTree', 'Digital Realm', SITE_CONFIG.name],
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Digital Realm Preview`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─────────────────────────────────────────
// VIEWPORT — Optimized for mobile
// ─────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#05030F',
};

// ─────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Font preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts — display:swap prevents invisible text during load */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <MagicCursor />
          <FloatingControls />
          {children}
        </Providers>
      </body>
    </html>
  );
}
