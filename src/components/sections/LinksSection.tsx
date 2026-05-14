'use client';

// ============================================================
// LINKS SECTION — Holographic Archive Gallery
// Premium layout untuk project cards dengan:
//   - Cinematic section header
//   - Staggered card reveal
//   - Premium spacing
//   - Atmospheric dividers
// ============================================================

import { motion } from 'framer-motion';
import { MagicLinkCard } from '@/components/ui/MagicLinkCard';
import { GradientText } from '@/components/ui/GradientText';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { LINK_ITEMS } from '@/config/site';

export function LinksSection() {
  return (
    <section id="links" className="relative z-content py-24 tablet:py-32 px-6">
      <div className="max-w-linktree mx-auto">

        {/* ── SECTION HEADER ── */}
        <AnimatedSection animation="fadeInUp" viewport once className="text-center mb-16">
          {/* Subtle tag */}
          <motion.p
            className="text-[10px] font-mono text-fantasy-dim uppercase tracking-[0.25em] mb-4"
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            ◇ Archives ◇
          </motion.p>

          {/* Title */}
          <h2 className="font-display text-2xl tablet:text-3xl font-bold mb-4">
            <GradientText variant="gradient">
              The Realm Archives
            </GradientText>
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-fantasy-muted max-w-sm mx-auto leading-relaxed">
            Explore my creations, connections, and digital adventures across the realms.
          </p>

          {/* Magical divider */}
          <div className="flex justify-center mt-8">
            <hr className="divider-magical w-32" />
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {LINK_ITEMS.map((item, index) => (
            <MagicLinkCard
              key={item.label}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* ── BOTTOM DECORATION ── */}
        <AnimatedSection animation="fadeIn" viewport delay={0.8} className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3 text-fantasy-dim">
            <hr className="divider-magical w-12" />
            <p className="text-[10px] font-mono uppercase tracking-[0.2em]">
              ✦ fin ✦
            </p>
            <hr className="divider-magical w-12" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
