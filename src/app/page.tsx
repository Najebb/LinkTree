// ============================================================
// FANTASY REALM — MAIN PAGE
// Cinematic Background + Hero + Links + Companion
// ============================================================

import { CinematicBackground } from '@/components/background';
import { HeroSection, LinksSection, ProjectsSection, ContactSection } from '@/components/sections';
import { CompanionContainer } from '@/components/companion';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Cinematic Background System — 8 layers */}
      <CinematicBackground
        showStars
        showNebula
        showAurora
        showShootingStars
        showFog
        showParticles
        showCursorGlow
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Links Section */}
      <LinksSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Fantasy Companion — bottom right */}
      <CompanionContainer />
    </main>
  );
}
