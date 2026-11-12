'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  X,
  HelpCircle,
  ScrollText,
} from 'lucide-react';

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onToggleScrollMode?: () => void;
  chapterTitle?: string;
}

export function PresentationControls({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onExit,
  onToggleScrollMode,
  chapterTitle,
}: PresentationControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
    }
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
      {/* Keyboard Shortcuts Popup */}
      {showShortcuts && (
        <div className="bg-[#141C2E]/95 backdrop-blur-md border border-indigo-500/30 rounded-xl p-4 shadow-2xl text-xs text-slate-300 w-72 mb-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between font-bold text-slate-100 pb-2 border-b border-slate-700/60 mb-2">
            <span>کلیدهای میانبر کیبورد</span>
            <button
              onClick={() => setShowShortcuts(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-cyan-400">
                ← یا Space
              </span>
              <span>اسلاید بعدی</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-cyan-400">
                →
              </span>
              <span>اسلاید قبلی</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-cyan-400">
                Esc
              </span>
              <span>خروج از حالت ارائه</span>
            </div>
          </div>
        </div>
      )}

      {/* Main HUD Bar */}
      <div className="flex items-center gap-2 sm:gap-3 bg-[#0B1020]/90 backdrop-blur-lg border border-indigo-500/25 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-2xl shadow-black/80">
        {/* Previous Button (In Persian RTL, pointing Right is previous) */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirstSlide}
          className="p-2 sm:p-2.5 rounded-xl bg-[#141C2E] border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/50 hover:bg-[#1E293B] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="اسلاید قبلی (→)"
          aria-label="اسلاید قبلی"
        >
          <ChevronRight className="w-5 h-5 text-indigo-300" />
        </button>

        {/* Slide Counter Indicator */}
        <div
          title={chapterTitle ? `${chapterTitle} • اسلاید ${currentSlide + 1}` : undefined}
          className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#141C2E]/80 border border-slate-800/80 text-xs sm:text-sm font-mono text-slate-200 flex items-center gap-1.5 select-none"
        >
          <span className="text-cyan-400 font-bold">{currentSlide + 1}</span>
          <span className="text-slate-500">/</span>
          <span>{totalSlides}</span>
        </div>

        {/* Next Button (In Persian RTL, pointing Left is next) */}
        <button
          type="button"
          onClick={onNext}
          disabled={isLastSlide}
          className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-l from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 border border-indigo-400/40 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-900/40 transition-all"
          title="اسلاید بعدی (← یا Space)"
          aria-label="اسلاید بعدی"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="h-5 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 sm:p-2.5 rounded-xl bg-[#141C2E] border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all"
          title={isFullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'}
          aria-label="تمام‌صفحه"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>

        {/* Shortcut Cheat Sheet Trigger */}
        <button
          type="button"
          onClick={() => setShowShortcuts(!showShortcuts)}
          className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
            showShortcuts
              ? 'bg-indigo-600/30 border-cyan-400 text-cyan-300'
              : 'bg-[#141C2E] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="راهنمای کلیدها"
          aria-label="راهنمای کلیدها"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Switch to Scroll Mode Button */}
        {onToggleScrollMode && (
          <button
            type="button"
            onClick={onToggleScrollMode}
            className="p-2 sm:p-2.5 rounded-xl bg-[#141C2E] border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-all hidden md:flex items-center gap-1.5 text-xs"
            title="تغییر به حالت اسکرول"
          >
            <ScrollText className="w-4 h-4" />
            <span>حالت اسکرول</span>
          </button>
        )}

        {/* Exit Presentation Mode */}
        <button
          type="button"
          onClick={onExit}
          className="p-2 sm:p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 hover:bg-rose-900/50 hover:text-white transition-all"
          title="خروج از ارائه (Esc)"
          aria-label="خروج از ارائه"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
