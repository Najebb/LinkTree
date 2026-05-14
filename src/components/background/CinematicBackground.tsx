'use client';

// ============================================================
// CINEMATIC BACKGROUND — Adaptive Performance Orchestrator
//
// Layering (belakang → depan):
//   0. Base gradient (static CSS)
//   1. Stars (CSS animation, parallax far)
//   2. Nebula (Framer Motion, parallax far)
//   3. Aurora (CSS animation, parallax mid)
//   4. Shooting stars (Framer Motion, no parallax)
//   5. Particles (Framer Motion, parallax near)
//   6. Fog (CSS animation, no parallax)
//   7. Vignette (static CSS)
//   8. Cursor Glow (follows mouse)
//
// OPTIMIZATIONS:
//   - Adaptive: effect counts scale with device tier
//   - Mobile: parallax & cursor glow disabled on touch
//   - Reduced motion: minimal effects only
//   - CSS contain: layout paint for each layer
//   - will-change only on animated elements
// ============================================================

import { ParallaxContainer } from './ParallaxContainer';
import { StarsLayer } from './StarsLayer';
import { AuroraLayer } from './AuroraLayer';
import { FogLayer } from './FogLayer';
import { ParticlesLayer } from './ParticlesLayer';
import { CursorGlow } from './CursorGlow';
import { useDeviceCapability, getAdaptiveCounts } from '@/hooks';
import dynamic from 'next/dynamic';

// Lazy load heavy optional layers
const NebulaLayer = dynamic(
  () => import('./NebulaLayer').then(m => ({ default: m.NebulaLayer })),
  { ssr: false }
);
const ShootingStars = dynamic(
  () => import('./ShootingStars').then(m => ({ default: m.ShootingStars })),
  { ssr: false }
);

interface CinematicBackgroundProps {
  showStars?: boolean;
  showNebula?: boolean;
  showAurora?: boolean;
  showShootingStars?: boolean;
  showFog?: boolean;
  showParticles?: boolean;
  showCursorGlow?: boolean;
  starCount?: number;
  particleCount?: number;
}

export function CinematicBackground({
  showStars = true,
  showNebula = true,
  showAurora = true,
  showShootingStars = true,
  showFog = true,
  showParticles = true,
  showCursorGlow = true,
}: CinematicBackgroundProps) {
  const device = useDeviceCapability();
  const counts = getAdaptiveCounts(device.tier);

  // Disable cursor glow on touch devices
  const renderCursorGlow = showCursorGlow && !device.isTouch;

  // Disable heavy effects on low tier
  const renderNebula = showNebula && counts.enableNebula;
  const renderShootingStars = showShootingStars && counts.enableShootingStars;
  const renderParallax = counts.enableParallax;

  // Wrapper: parallax or plain div based on device capability
  const Layer = renderParallax ? ParallaxContainer : PlainLayer;

  return (
    <>
      {/* ── FIXED BACKGROUND CONTAINER ── */}
      <div
        className="fixed inset-0 z-bg-deep overflow-hidden"
        style={{ contain: 'layout paint' }}
      >
        {/* Layer 0: Base gradient (pure CSS — zero JS cost) */}
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero-bg)' }}
        />

        {/* Layer 1: Stars */}
        {showStars && (
          <Layer depth={0.03} className="absolute inset-0">
            <StarsLayer count={counts.stars} />
          </Layer>
        )}

        {/* Layer 2: Nebula (lazy loaded) */}
        {renderNebula && (
          <Layer depth={0.04} className="absolute inset-0">
            <NebulaLayer />
          </Layer>
        )}

        {/* Layer 3: Aurora */}
        {showAurora && (
          <Layer depth={0.05} className="absolute inset-0">
            <AuroraLayer />
          </Layer>
        )}

        {/* Layer 4: Shooting stars (lazy loaded) */}
        {renderShootingStars && <ShootingStars />}

        {/* Layer 5: Particles */}
        {showParticles && (
          <Layer depth={0.07} className="absolute inset-0">
            <ParticlesLayer count={counts.particles} />
          </Layer>
        )}

        {/* Layer 6: Fog */}
        {showFog && <FogLayer />}

        {/* ── ENVIRONMENTAL INFLUENCE (Companion Sync) ── */}
        <div 
          className="absolute inset-0 pointer-events-none transition-colors duration-[3000ms] ease-in-out" 
          style={{ backgroundColor: 'var(--companion-influence, transparent)' }} 
        />

        {/* Layer 7: Vignette */}
        <div className="absolute inset-0 overlay-vignette opacity-50" />
      </div>

      {/* Layer 8: Cursor Glow */}
      {renderCursorGlow && <CursorGlow />}
    </>
  );
}

// ── Plain layer fallback (no parallax, zero overhead) ──
function PlainLayer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  return <div className={className}>{children}</div>;
}
