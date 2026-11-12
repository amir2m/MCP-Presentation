'use client';

import React from 'react';
import { CHAPTERS } from '@/lib/presentation';

interface ProgressIndicatorProps {
  currentChapterId: number;
  currentSlideIndex?: number;
  totalSlides?: number;
  mode?: 'scroll' | 'slides';
}

export function ProgressIndicator({
  currentChapterId,
  currentSlideIndex = 0,
  totalSlides = 4,
  mode = 'slides',
}: ProgressIndicatorProps) {
  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  return (
    <div className="flex items-center gap-3 bg-[#141C2E]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-indigo-500/20 shadow-lg">
      <div className="flex items-center gap-1.5">
        {CHAPTERS.map((ch) => {
          const isPassed = ch.id < currentChapterId;
          const isCurrent = ch.id === currentChapterId;

          return (
            <div
              key={ch.id}
              title={`${ch.numberPersian}: ${ch.titlePersian}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                  : isPassed
                  ? 'w-2 bg-indigo-500/60'
                  : 'w-2 bg-slate-700/50'
              }`}
            />
          );
        })}
      </div>

      <div className="h-4 w-[1px] bg-slate-700 mx-1" />

      <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
        <span className="text-cyan-400 font-semibold">{currentChapter.numberPersian}</span>
        {mode === 'slides' && totalSlides > 0 && (
          <span className="text-slate-400">
            • اسلاید {currentSlideIndex + 1} از {totalSlides}
          </span>
        )}
      </div>
    </div>
  );
}
