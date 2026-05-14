'use client';

// ============================================================
// MAGIC BUTTON — Button dengan efek glow, hover scale, shimmer
// Reusable untuk CTA, link, dan aksi
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hoverScale, tapScale } from '@/lib/animations';

interface MagicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;       // Link external (target _blank)
  glow?: boolean;           // Tampilkan glow effect
  disabled?: boolean;
}

export function MagicButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  glow = true,
  disabled = false,
}: MagicButtonProps) {

  // Size classes
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm rounded-lg gap-2',
    md: 'px-7 py-3 text-base rounded-xl gap-2.5',
    lg: 'px-9 py-4 text-lg rounded-xl gap-3',
  }[size];

  // Variant classes
  const variantClasses = {
    primary: cn(
      'bg-btn-primary text-white font-semibold',
      'border border-transparent',
      glow && 'shadow-glow-primary',
    ),
    ghost: cn(
      'bg-transparent text-fantasy-text',
      'border border-transparent',
      'hover:bg-bg-glass',
    ),
    outline: cn(
      'bg-transparent text-fantasy-text',
      'border border-fantasy-glow',
      glow && 'hover:shadow-glow-primary',
    ),
  }[variant];

  const baseClasses = cn(
    // Base
    'relative inline-flex items-center justify-center',
    'font-body font-medium',
    'transition-all duration-300 ease-cinematic',
    'cursor-pointer select-none',
    'focus-ring',
    // Disabled
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    // Size & variant
    sizeClasses,
    variantClasses,
    className,
  );

  // Shimmer overlay (hanya untuk primary)
  const shimmerOverlay = variant === 'primary' && (
    <span className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-sweep 2s ease-in-out infinite',
        }}
      />
    </span>
  );

  const content = (
    <>
      {shimmerOverlay}
      <span className="relative z-10 flex items-center gap-inherit">
        {children}
      </span>
    </>
  );

  // Render sebagai link atau button
  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn('group', baseClasses)}
        whileHover={hoverScale}
        whileTap={tapScale}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn('group', baseClasses)}
      whileHover={hoverScale}
      whileTap={tapScale}
    >
      {content}
    </motion.button>
  );
}
