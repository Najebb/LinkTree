'use client';

// ============================================================
// PROJECT CARD — Holographic archive panel
// Premium card untuk project/link dengan:
//   - Icon orb dengan ambient glow
//   - Elegant typography hierarchy
//   - Tech stack pills
//   - Animated bottom accent line
//   - Featured badge with breathing glow
//   - Arrow indicator with hover motion
// ============================================================

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  techStack?: string[];
  url: string;
  external?: boolean;
  accentColor?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const delay = 0.15 + index * 0.1;

  return (
    <GlassCard
      glass={project.featured ? 'strong' : 'standard'}
      tilt
      tiltIntensity={project.featured ? 10 : 6}
      shimmer={project.featured}
      holographic
      glowOnHover
      delay={delay}
      className={cn(
        'group',
        project.featured && 'ring-1 ring-primary/20',
      )}
    >
      <a
        href={project.url}
        target={project.external ? '_blank' : undefined}
        rel={project.external ? 'noopener noreferrer' : undefined}
        className="relative block p-5 tablet:p-6"
      >
        {/* ── MAIN LAYOUT ── */}
        <div className="flex items-start gap-4">

          {/* Icon Orb */}
          <div className={cn(
            'relative flex-shrink-0 w-12 h-12 rounded-2xl',
            'flex items-center justify-center',
            'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
            'border border-white/[0.08]',
            'text-2xl',
            'group-hover:border-primary/30',
            'group-hover:shadow-[0_0_20px_var(--color-primary-glow)]',
            'transition-all duration-500 ease-out',
          )}>
            {/* Ambient glow behind icon on hover */}
            <div className={cn(
              'absolute inset-0 rounded-2xl opacity-0',
              'bg-gradient-to-br from-primary/20 to-secondary/10',
              'group-hover:opacity-100',
              'transition-opacity duration-500',
            )} />
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
              {project.icon}
            </span>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className={cn(
              'font-display text-[15px] tablet:text-base font-semibold',
              'text-fantasy-text leading-tight',
              'group-hover:text-primary-light',
              'transition-colors duration-300',
            )}>
              {project.title}
            </h3>
            <p className={cn(
              'text-[13px] text-fantasy-muted mt-1.5',
              'line-clamp-2 leading-relaxed',
            )}>
              {project.description}
            </p>

            {/* Tech Stack Badges */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'inline-flex items-center px-2 py-[2px] rounded-full',
                      'text-[10px] font-mono tracking-wide',
                      'bg-white/[0.04] text-fantasy-muted',
                      'border border-white/[0.06]',
                      'group-hover:bg-primary/10 group-hover:text-primary-light',
                      'group-hover:border-primary/20',
                      'transition-all duration-300',
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Arrow Indicator */}
          <div className="flex-shrink-0 mt-1">
            <motion.div
              className="text-fantasy-dim group-hover:text-primary-light transition-colors duration-300"
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.5 3.5l5 5.5-5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ── FEATURED BADGE ── */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-30">
            <span className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
              'text-[9px] font-mono uppercase tracking-[0.15em]',
              'bg-accent/10 text-accent/90 border border-accent/15',
            )}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[glow-pulse_2s_ease-in-out_infinite]" />
              Featured
            </span>
          </div>
        )}

        {/* ── BOTTOM ACCENT LINE ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
          <div className={cn(
            'h-full w-0',
            'bg-gradient-to-r from-primary/60 via-secondary/40 to-accent/30',
            'group-hover:w-full',
            'transition-all duration-700 ease-out',
          )} />
        </div>
      </a>
    </GlassCard>
  );
}
