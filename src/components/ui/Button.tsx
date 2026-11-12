'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1020]';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 shadow-sm',
    md: 'text-sm px-5 py-2.5 gap-2 shadow-md',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-lg',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white hover:from-[#4F46E5] hover:to-[#4338CA] shadow-indigo-900/40 hover:shadow-indigo-600/30 border border-indigo-400/30',
    secondary:
      'bg-[#141C2E] text-[#F8FAFC] hover:bg-[#1E293B] border border-slate-700/60 hover:border-[#22D3EE]/50 shadow-black/30',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 border border-transparent',
    accent:
      'bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] text-[#0B1020] font-semibold hover:from-[#06B6D4] hover:to-[#0891B2] shadow-cyan-950/40 border border-cyan-300/40',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {iconStart && <span className="flex-shrink-0">{iconStart}</span>}
      <span>{children}</span>
      {iconEnd && <span className="flex-shrink-0">{iconEnd}</span>}
    </motion.button>
  );
}

