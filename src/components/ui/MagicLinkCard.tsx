'use client';

// ============================================================
// MAGIC LINK CARD
// Tombol tautan dengan efek 3D tilt, glassmorphism, dan border glow
// ============================================================

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface MagicLinkCardProps {
  item: NavItem;
  index: number;
}

export function MagicLinkCard({ item, index }: MagicLinkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  // ── 3D TILT PHYSICS ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  // Glow position
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? '_blank' : '_self'}
      rel={item.external ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={cn(
        "relative block w-full p-[1px] rounded-2xl overflow-hidden",
        "transition-shadow duration-500",
        isHovered ? "shadow-[0_0_30px_var(--color-primary-glow)]" : "shadow-lg"
      )}
    >
      {/* Dynamic Border Glow */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, var(--color-primary) 0%, transparent 50%)`
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Default Border (Glass) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />

      {/* Inner Content */}
      <div 
        className="relative z-10 flex items-center justify-between p-4 rounded-2xl backdrop-blur-md"
        style={{
          backgroundColor: 'var(--color-bg-glass)',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-xl border transition-colors duration-300"
            style={{
              backgroundColor: isHovered ? 'var(--color-bg-tertiary)' : 'transparent',
              borderColor: isHovered ? 'var(--color-primary)' : 'var(--color-border-primary)',
            }}
          >
            <span className="text-2xl drop-shadow-[0_0_5px_currentColor]" style={{ color: isHovered ? 'var(--color-primary-light)' : 'var(--color-text-secondary)' }}>
              {/* Fallback to emoji if icon is just a string name */}
              {item.label.split(' ')[0]}
            </span>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span 
              className="font-display font-bold text-lg tracking-wide transition-colors duration-300"
              style={{ color: isHovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
            >
              {item.label.replace(/^.*? /, '')}
            </span>
          </div>
        </div>

        {/* Arrow Indicator */}
        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
          className="text-xl"
          style={{ color: 'var(--color-primary)' }}
        >
          ➔
        </motion.div>
      </div>
    </motion.a>
  );
}
