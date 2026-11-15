'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  AppWindow,
  Bot,
  Network,
  Server,
  Database,
  LucideIcon,
} from 'lucide-react';
import { ParticipantId } from './types';

interface LifecycleParticipantProps {
  id: ParticipantId;
  titlePersian: string;
  titleEnglish: string;
  roleDescription: string;
  isActive: boolean;
  isSender?: boolean;
  isReceiver?: boolean;
  isEnclosedInHost?: boolean;
  className?: string;
}

const PARTICIPANT_ICONS: Record<ParticipantId, LucideIcon> = {
  user: User,
  host: AppWindow,
  llm: Bot,
  'mcp-client': Network,
  'mcp-server': Server,
  'external-db': Database,
};

const PARTICIPANT_COLORS: Record<
  ParticipantId,
  {
    border: string;
    activeBorder: string;
    bg: string;
    activeBg: string;
    text: string;
    glow: string;
  }
> = {
  user: {
    border: 'border-slate-800',
    activeBorder: 'border-amber-400',
    bg: 'bg-slate-900/80',
    activeBg: 'bg-amber-950/40',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/20',
  },
  host: {
    border: 'border-indigo-500/30',
    activeBorder: 'border-indigo-400',
    bg: 'bg-indigo-950/30',
    activeBg: 'bg-indigo-950/60',
    text: 'text-indigo-300',
    glow: 'shadow-indigo-500/25',
  },
  llm: {
    border: 'border-purple-500/30',
    activeBorder: 'border-purple-400',
    bg: 'bg-purple-950/30',
    activeBg: 'bg-purple-950/60',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/25',
  },
  'mcp-client': {
    border: 'border-cyan-500/30',
    activeBorder: 'border-cyan-400',
    bg: 'bg-cyan-950/30',
    activeBg: 'bg-cyan-950/60',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/25',
  },
  'mcp-server': {
    border: 'border-emerald-500/30',
    activeBorder: 'border-emerald-400',
    bg: 'bg-emerald-950/30',
    activeBg: 'bg-emerald-950/60',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/25',
  },
  'external-db': {
    border: 'border-blue-500/30',
    activeBorder: 'border-blue-400',
    bg: 'bg-blue-950/30',
    activeBg: 'bg-blue-950/60',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/25',
  },
};

export function LifecycleParticipant({
  id,
  titlePersian,
  titleEnglish,
  roleDescription,
  isActive,
  isSender = false,
  isReceiver = false,
  isEnclosedInHost = false,
  className = '',
}: LifecycleParticipantProps) {
  const Icon = PARTICIPANT_ICONS[id];
  const color = PARTICIPANT_COLORS[id];

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`relative p-3.5 sm:p-4 rounded-xl border transition-all duration-300 ${
        isActive
          ? `${color.activeBorder} ${color.activeBg} shadow-lg ${color.glow} ring-1 ring-inset ring-white/10`
          : `${color.border} ${color.bg} opacity-85 hover:opacity-100`
      } ${className}`}
    >
      {/* Active Pulse Indicator */}
      {isActive && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isSender
                ? 'bg-amber-400'
                : isReceiver
                ? 'bg-cyan-400'
                : 'bg-indigo-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              isSender
                ? 'bg-amber-500'
                : isReceiver
                ? 'bg-cyan-500'
                : 'bg-indigo-500'
            }`}
          />
        </span>
      )}

      {/* Header with Icon and Title */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <div
          className={`p-1.5 rounded-lg border ${
            isActive
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {titlePersian}
            </h4>
            {isEnclosedInHost && (
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.2 rounded font-mono">
                داخلی
              </span>
            )}
          </div>
          <p className="text-[10px] font-mono text-slate-400 truncate" dir="ltr">
            {titleEnglish}
          </p>
        </div>
      </div>

      {/* Role Summary */}
      <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2 mt-1">
        {roleDescription}
      </p>

      {/* Active State Banner */}
      {isActive && (
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-slate-300 font-medium">وضعیت در گام جاری:</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded ${
              isSender
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : isReceiver
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            }`}
          >
            {isSender ? 'مبدأ پیام' : isReceiver ? 'مقصد پردازش' : 'فعال در چرخه'}
          </span>
        </div>
      )}
    </motion.div>
  );
}
