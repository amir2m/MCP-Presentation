'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, Tv, ScrollText, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PRESENTATION_METADATA } from '@/lib/presentation';

interface NavbarProps {
  onOpenChapters?: () => void;
  activeMode?: 'scroll' | 'slides';
  onToggleMode?: (mode: 'scroll' | 'slides') => void;
}

export function Navbar({
  onOpenChapters,
  activeMode,
  onToggleMode,
}: NavbarProps) {
  const pathname = usePathname();
  const isPresentationRoute = pathname?.startsWith('/presentation');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-500/10 bg-[#0B1020]/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-400/30 transition-all">
              <div className="w-full h-full bg-[#0B1020] rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {PRESENTATION_METADATA.shortTitle}
                </span>
                <Badge variant="cyan" size="sm" isLTR className="hidden sm:inline-flex">
                  MCP Standard
                </Badge>
              </div>
              <span className="text-[11px] text-slate-400 hidden md:block">
                ارائه دانشگاهی • {PRESENTATION_METADATA.durationMinutes} دقیقه
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher (if on presentation page or interactive) */}
          {onToggleMode && activeMode && (
            <div className="hidden sm:flex items-center bg-[#141C2E] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onToggleMode('scroll')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeMode === 'scroll'
                    ? 'bg-indigo-600/40 text-cyan-300 shadow-sm border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>حالت اسکرول</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleMode('slides')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeMode === 'slides'
                    ? 'bg-indigo-600/40 text-cyan-300 shadow-sm border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>حالت ارائه</span>
              </button>
            </div>
          )}

          {/* Chapters Drawer Trigger */}
          {onOpenChapters && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenChapters}
              iconStart={<Layers className="w-4 h-4 text-cyan-400" />}
              className="text-xs sm:text-sm"
            >
              سرفصل‌ها
            </Button>
          )}

          {/* Quick link to /presentation if on home */}
          {!isPresentationRoute && (
            <Link href="/presentation">
              <Button
                variant="primary"
                size="sm"
                iconEnd={<Tv className="w-4 h-4" />}
                className="text-xs sm:text-sm"
              >
                ورود به ارائه
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
