'use client';

// ============================================================
// FANTASY REALM — HERO SECTION
// Kesan pertama yang cinematic dan magical
// Semua elemen muncul secara staggered dengan animasi halus
// ============================================================

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/GradientText';
import { MagicButton } from '@/components/ui/MagicButton';
import { TypeWriter } from '@/components/ui/TypeWriter';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';
import { FloatingElement } from '@/components/ui/FloatingElement';
import { SITE_CONFIG } from '@/config/site';
import { staggerContainer, fadeInUp, floatAnimation, glowPulse } from '@/lib/animations';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// TYPEWRITER STRINGS
// ─────────────────────────────────────────
const TYPEWRITER_STRINGS = [
  'Full-Stack Developer',
  'Digital Sorcerer',
  'UI/UX Craftsman',
  'Code Alchemist',
  'Dream Builder',
];

// ─────────────────────────────────────────
// FLOATING RUNE SYMBOLS (dekorasi)
// ─────────────────────────────────────────
const RUNES = ['◇', '✦', '⟡', '◈', '✧'];

const RUNE_PRESETS: Array<{ preset: 'gentle' | 'orbital' | 'sway' | 'breathe'; delay: number }> = [
  { preset: 'gentle',  delay: 0 },
  { preset: 'orbital', delay: 1.2 },
  { preset: 'sway',    delay: 0.6 },
  { preset: 'breathe', delay: 1.8 },
  { preset: 'gentle',  delay: 2.4 },
];

function FloatingRune({ symbol, className, index }: { symbol: string; className?: string; index: number }) {
  const { preset, delay } = RUNE_PRESETS[index % RUNE_PRESETS.length];
  return (
    <div className={cn('absolute pointer-events-none select-none', className)}>
      <FloatingElement preset={preset} delay={delay}>
        <span className="text-primary/20 text-xl tablet:text-2xl">
          {symbol}
        </span>
      </FloatingElement>
    </div>
  );
}

// ─────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── AMBIENT GLOW ORBS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orb utama di belakang title */}
        <motion.div
          variants={glowPulse}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Orb sekunder */}
        <div
          className="absolute top-2/3 -left-32 w-72 h-72 rounded-full animate-glow-breathe"
          style={{
            background: 'radial-gradient(circle, var(--color-secondary-glow) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Orb aksen */}
        <div
          className="absolute bottom-1/4 -right-20 w-48 h-48 rounded-full animate-glow-breathe"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* ── FLOATING RUNES (dekorasi) ── */}
      <div className="absolute inset-0 pointer-events-none hidden tablet:block">
        <FloatingRune symbol={RUNES[0]} className="top-[15%] left-[10%]" index={0} />
        <FloatingRune symbol={RUNES[1]} className="top-[25%] right-[15%]" index={1} />
        <FloatingRune symbol={RUNES[2]} className="bottom-[30%] left-[8%]" index={2} />
        <FloatingRune symbol={RUNES[3]} className="bottom-[20%] right-[12%]" index={3} />
        <FloatingRune symbol={RUNES[4]} className="top-[60%] left-[20%]" index={4} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-content text-center px-6 max-w-linktree mx-auto"
      >

        {/* ── BADGE ── */}
        <AnimatedSection animation="fadeInUp" delay={0}>
          <div className="inline-flex items-center gap-2 glass-thin rounded-pill px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-xs font-mono text-fantasy-muted tracking-wider uppercase">
              Welcome to the Realm
            </span>
          </div>
        </AnimatedSection>

        {/* ── AVATAR / LOGO ── */}
        <AnimatedSection animation="scaleIn" delay={0.2}>
          <div className="relative inline-block mb-8">
            {/* Glow ring di belakang avatar */}
            <div className="absolute inset-0 rounded-full animate-glow-breathe glow-primary scale-110" />
            {/* Avatar image container */}
            <div className={cn(
              'relative w-28 h-28 tablet:w-32 tablet:h-32 rounded-full overflow-hidden',
              'border-[3px] border-primary/60 z-10',
              'shadow-[0_0_25px_var(--color-primary-glow)]',
              'ring-4 ring-bg-primary/50'
            )}>
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                quality={100}
                className="object-cover transition-transform duration-700 hover:scale-110"
                style={{ objectPosition: '50% 20%' }}
                sizes="(max-width: 768px) 256px, 256px"
                priority
              />
              {/* Inner shadow to blend edges perfectly */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] pointer-events-none" />
            </div>
          </div>
        </AnimatedSection>

        {/* ── NAME / TITLE ── */}
        <AnimatedSection animation="magical" delay={0.4}>
          <h1 className="font-display font-bold text-hero-sm tablet:text-hero-md desktop:text-hero-lg mb-4 leading-none">
            <GradientText variant="gradient" glow>
              {SITE_CONFIG.name}
            </GradientText>
          </h1>
        </AnimatedSection>

        {/* ── TYPEWRITER SUBTITLE ── */}
        <AnimatedSection animation="fadeInUp" delay={0.7}>
          <div className="h-8 tablet:h-10 flex items-center justify-center mb-6">
            <span className="text-lg tablet:text-xl text-fantasy-muted font-light">
              {'> '}
              <TypeWriter
                strings={TYPEWRITER_STRINGS}
                typeSpeed={70}
                deleteSpeed={35}
                pauseDuration={2500}
                className="text-primary-light"
              />
            </span>
          </div>
        </AnimatedSection>

        {/* ── DESCRIPTION ── */}
        <AnimatedSection animation="fadeInUp" delay={0.9}>
          <p className="text-fantasy-muted text-base tablet:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            {SITE_CONFIG.description}
          </p>
        </AnimatedSection>

        {/* ── MAGICAL DIVIDER ── */}
        <AnimatedSection animation="fadeIn" delay={1.1}>
          <hr className="divider-magical max-w-xs mx-auto mb-10" />
        </AnimatedSection>

        {/* ── CTA BUTTON ── */}
        <AnimatedSection animation="fadeInUp" delay={1.2}>
          <div className="flex flex-col tablet:flex-row items-center justify-center gap-4">
            <MagneticWrapper strength={0.25} radius={120}>
              <MagicButton
                variant="primary"
                size="lg"
                href="#links"
                glow
              >
                <span>✦</span>
                <span>Explore My Realm</span>
              </MagicButton>
            </MagneticWrapper>

            <MagneticWrapper strength={0.2} radius={100}>
              <MagicButton
                variant="outline"
                size="md"
                href={SITE_CONFIG.socials.github}
                external
                glow={false}
              >
                <span>🐙</span>
                <span>GitHub</span>
              </MagicButton>
            </MagneticWrapper>
          </div>
        </AnimatedSection>

        {/* ── SCROLL INDICATOR ── */}
        <AnimatedSection animation="fadeIn" delay={1.8}>
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-fantasy-dim text-xs font-mono tracking-wider uppercase">
              Scroll Down
            </span>
            <svg
              width="16" height="24" viewBox="0 0 16 24"
              fill="none" className="text-fantasy-dim"
            >
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
              <motion.circle
                cx="8" cy="8" r="2"
                fill="var(--color-primary-light)"
                animate={{ cy: [7, 14, 7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </AnimatedSection>

      </motion.div>
    </section>
  );
}
