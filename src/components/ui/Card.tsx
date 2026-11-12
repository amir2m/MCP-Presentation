'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'solid' | 'translucent' | 'interactive' | 'glow';
  className?: string;
  glowColor?: 'indigo' | 'cyan' | 'none';
}

export function Card({
  children,
  variant = 'solid',
  className = '',
  glowColor = 'none',
  ...props
}: CardProps) {
  const baseClasses =
    'relative rounded-2xl border transition-all duration-300 overflow-hidden';

  const variantClasses = {
    solid: 'bg-[#141C2E] border-slate-800/80 shadow-xl shadow-black/40',
    translucent:
      'bg-[#141C2E]/85 backdrop-blur-md border-indigo-500/15 shadow-2xl shadow-indigo-950/20',
    interactive:
      'bg-[#141C2E] border-slate-800 hover:border-indigo-500/40 hover:bg-[#192338] shadow-lg hover:shadow-indigo-950/50 cursor-pointer',
    glow: 'bg-[#141C2E] border-indigo-500/30 shadow-2xl shadow-indigo-600/10 hover:border-cyan-400/40',
  };

  const glowOverlays = {
    none: null,
    indigo: (
      <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
    ),
    cyan: (
      <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
    ),
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {glowOverlays[glowColor]}
      {children}
    </motion.div>
  );
}

