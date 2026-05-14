'use client';

// ============================================================
// CONTACT SECTION — The Summoning Circle
// Formulir kontak magis menggunakan Formspree
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GradientText } from '@/components/ui/GradientText';
import { MagicButton } from '@/components/ui/MagicButton';
import { useThemeContext } from '@/context/ThemeContext';
import { SITE_CONFIG } from '@/config/site';

export function ContactSection() {
  const { theme } = useThemeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Formspree endpoint (ganti 'YOUR_FORMSPREE_ID' dengan ID formspree yang asli nanti)
  const formAction = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Failed to cast sending spell:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-content py-24 tablet:py-32 px-6">
      <div className="max-w-xl mx-auto relative">
        
        {/* ── MAGICAL BACKGROUND GLOW ── */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Summoning Circle representation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-dashed opacity-20"
               style={{ borderColor: theme.colors.primary, boxShadow: `0 0 40px ${theme.colors.primaryGlow}` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square rounded-full border border-dotted opacity-30"
               style={{ borderColor: theme.colors.secondary }} />
        </motion.div>

        {/* ── CONTENT ── */}
        <AnimatedSection animation="fadeInUp" viewport once className="relative z-10 text-center mb-12">
          <p className="text-[10px] font-mono text-fantasy-dim uppercase tracking-[0.25em] mb-4">
            ◇ Summoning Circle ◇
          </p>

          <h2 className="font-display text-2xl tablet:text-3xl font-bold mb-4">
            <GradientText variant="gradient">
              Send a Message
            </GradientText>
          </h2>

          <p className="text-sm text-fantasy-muted max-w-sm mx-auto leading-relaxed">
            Cast your message into the ether. It shall find its way to my realm.
          </p>
        </AnimatedSection>

        {/* ── FORM ── */}
        <AnimatedSection animation="fadeInUp" viewport delay={0.2} className="relative z-10">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-8 rounded-3xl backdrop-blur-xl border transition-colors duration-500"
            style={{ 
              backgroundColor: theme.colors.bgGlass,
              borderColor: theme.colors.borderPrimary,
              boxShadow: theme.shadows.cardDepth 
            }}
          >
            {/* Input Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-mono tracking-widest text-fantasy-secondary uppercase pl-2">
                True Name
              </label>
              <input 
                id="name"
                name="name"
                type="text" 
                required
                placeholder="Enter your name"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                style={{ 
                  boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5)`,
                }}
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-mono tracking-widest text-fantasy-secondary uppercase pl-2">
                Crystal Address (Email)
              </label>
              <input 
                id="email"
                name="email"
                type="email" 
                required
                placeholder="you@realm.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                style={{ boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5)` }}
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Input Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-mono tracking-widest text-fantasy-secondary uppercase pl-2">
                Incantation (Message)
              </label>
              <textarea 
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Write your message here..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 resize-none"
                style={{ boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5)` }}
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2 text-center">
              <MagicButton 
                disabled={isSubmitting || isSuccess}
                className="w-full"
              >
                {isSubmitting ? 'Casting...' : isSuccess ? 'Spell Sent! ✨' : 'Cast Message'}
              </MagicButton>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
