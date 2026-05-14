'use client';

// ============================================================
// PROJECTS SECTION — The Grimoire (Bento Grid)
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { GradientText } from '@/components/ui/GradientText';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PROJECT_CARDS } from '@/config/site';

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-content py-24 tablet:py-32 px-6">
      <div className="max-w-linktree mx-auto">

        {/* ── SECTION HEADER ── */}
        <AnimatedSection animation="fadeInUp" viewport once className="text-center mb-16">
          <motion.p
            className="text-[10px] font-mono text-fantasy-dim uppercase tracking-[0.25em] mb-4"
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            ◇ The Grimoire ◇
          </motion.p>

          <h2 className="font-display text-2xl tablet:text-3xl font-bold mb-4">
            <GradientText variant="gradient">
              Projects & Portfolios
            </GradientText>
          </h2>

          <p className="text-sm text-fantasy-muted max-w-sm mx-auto leading-relaxed">
            A collection of my finest spells, crafts, and digital artifacts.
          </p>

          <div className="flex justify-center mt-8">
            <hr className="divider-magical w-32" />
          </div>
        </AnimatedSection>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECT_CARDS.map((project, index) => (
            <div 
              key={project.id} 
              className={project.featured ? "md:col-span-2" : "col-span-1"}
            >
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
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
