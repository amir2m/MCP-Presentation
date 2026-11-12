'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, BookOpen, ChevronLeft } from 'lucide-react';
import { CHAPTERS } from '@/lib/presentation';
import { Badge } from '@/components/ui/Badge';

interface PresentationNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapterId?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function PresentationNavigation({
  isOpen,
  onClose,
  currentChapterId = 1,
  onSelectChapter,
}: PresentationNavigationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#0D1424] border-r border-indigo-500/20 h-full overflow-y-auto flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0D1424]/95 backdrop-blur-md z-10">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>فهرست سرفصل‌های ارائه</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  ۷ فصل آموزشی • مدت زمان کل: ~۲۵ دقیقه
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="بستن فهرست"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter List */}
            <div className="p-6 space-y-4 flex-1">
              {CHAPTERS.map((chapter) => {
                const isActive = chapter.id === currentChapterId;
                const isAvailable = chapter.status === 'active';

                return (
                  <div
                    key={chapter.id}
                    onClick={() => {
                      if (isAvailable && onSelectChapter) {
                        onSelectChapter(chapter.id);
                        onClose();
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-indigo-950/40 border-cyan-400/50 shadow-lg shadow-indigo-950/50 ring-1 ring-cyan-400/20'
                        : isAvailable
                        ? 'bg-[#141C2E] border-slate-800 hover:border-indigo-500/40 hover:bg-[#1A243B] cursor-pointer'
                        : 'bg-[#101726]/60 border-slate-800/50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-indigo-400">
                        {chapter.numberPersian}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {chapter.estimatedMinutes}m
                        </span>
                        {isAvailable ? (
                          <Badge variant="cyan" size="sm">
                            فعال
                          </Badge>
                        ) : (
                          <Badge variant="outline" size="sm">
                            در انتظار تدوین
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-100 text-sm mb-1">
                      {chapter.titlePersian}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {chapter.descriptionPersian}
                    </p>

                    {chapter.slides.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{chapter.slides.length} اسلاید محتوایی</span>
                        {isAvailable && (
                          <span className="text-cyan-400 flex items-center gap-1">
                            <span>ورود به فصل</span>
                            <ChevronLeft className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#090E1A] text-xs text-slate-500 text-center">
              ارائه تعاملی با استاندارد باز MCP
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
