'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Chapter } from '@/types/presentation';

interface ChapterSectionProps {
  chapter: Chapter;
  children: React.ReactNode;
  className?: string;
}

export function ChapterSection({
  chapter,
  children,
  className = '',
}: ChapterSectionProps) {
  return (
    <section
      id={`chapter-${chapter.id}`}
      className={`relative py-16 sm:py-24 border-t border-indigo-500/10 scroll-mt-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 pb-6 border-b border-slate-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-lg">
                {chapter.numberPersian}
              </span>
              <span className="text-xs text-slate-400 font-mono" dir="ltr">
                Chapter {chapter.id.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {chapter.estimatedMinutes} دقیقه زمان تخمینی
              </span>
              {chapter.status === 'active' ? (
                <Badge variant="cyan" size="sm">
                  پیاده‌سازی شده
                </Badge>
              ) : (
                <Badge variant="outline" size="sm">
                  در انتظار تدوین
                </Badge>
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {chapter.titlePersian}
          </h2>
          <div className="text-sm font-mono text-cyan-400/90 mt-1" dir="ltr">
            {chapter.titleEnglish}
          </div>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            {chapter.descriptionPersian}
          </p>
        </motion.div>

        {/* Chapter Main Body */}
        {children}
      </div>
    </section>
  );
}
