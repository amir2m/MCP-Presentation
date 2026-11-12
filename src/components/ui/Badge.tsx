import React from 'react';

export type BadgeVariant = 'indigo' | 'cyan' | 'slate' | 'outline' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  isLTR?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'indigo',
  size = 'md',
  isLTR = false,
  className = '',
}: BadgeProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full select-none';

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wide',
    md: 'text-xs px-3 py-1 tracking-wide',
  };

  const variantClasses: Record<BadgeVariant, string> = {
    indigo:
      'bg-indigo-500/10 text-indigo-300 border border-indigo-500/25',
    cyan:
      'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
    slate:
      'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    outline:
      'bg-transparent text-slate-400 border border-slate-700',
    success:
      'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25',
  };

  return (
    <span
      dir={isLTR ? 'ltr' : undefined}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        isLTR ? 'font-mono' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
}

