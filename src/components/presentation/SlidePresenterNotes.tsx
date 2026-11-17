'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Layers,
  Clock,
  Target,
  Sparkles,
  PlayCircle,
  HelpCircle,
  ArrowLeft,
  Quote,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface SlidePresenterNote {
  slideId: string;
  slideNumber: number;
  slideTitle: string;
  allocatedTimePersian: string; // e.g. "۴۵ ثانیه"
  allocatedSeconds: number; // e.g. 45
  learningObjective: string; // هدف آموزشی
  spokenNarration: string; // متن پیشنهادی سخنران
  keyPoints: string[]; // ۳ تا ۵ نکته کلیدی
  presentationGuide: string[]; // راهنمای گام‌به‌گام اجرای اسلاید
  supplementaryExample?: string; // مثال یا توضیح تکمیلی
  audienceQuestion?: {
    question: string;
    answer: string;
  };
  transitionSentence: string; // جمله انتقال به اسلاید یا فصل بعدی
}

interface SlidePresenterNotesProps {
  note: SlidePresenterNote;
  className?: string;
}

export function SlidePresenterNotes({
  note,
  className = '',
}: SlidePresenterNotesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`border border-slate-800/90 rounded-2xl bg-[#080D1A]/90 backdrop-blur-md overflow-hidden transition-all duration-200 ${className}`}
      dir="rtl"
    >
      {/* Toggle Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-xs text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 font-semibold text-right">
          <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white">
              یادداشت تفصیلی سخنران (Presenter Notes)
            </span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">•</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              {note.slideTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Badge
            variant="cyan"
            size="sm"
            className="text-[10px] py-0.5 px-2 font-mono"
          >
            <Clock className="w-3 h-3 ml-1 inline text-cyan-400" />
            {note.allocatedTimePersian}
          </Badge>
          <div
            className={`w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-300 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-cyan-300' : ''
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
              {/* 1. Learning Objective */}
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/25 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Target className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>هدف آموزشی اسلاید:</span>
                </div>
                <p className="text-slate-200 leading-relaxed pr-6 text-[11px] sm:text-xs">
                  {note.learningObjective}
                </p>
              </div>

              {/* 2. Spoken Narration Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-[#0C1322] border border-cyan-500/25 space-y-2">
                <div className="flex items-center justify-between text-cyan-300 font-bold pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>متن پیشنهادی سخنران (Spoken Narration):</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">
                    خوانش روان و طبیعی
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-[13px] whitespace-pre-line font-sans">
                  {note.spokenNarration}
                </p>
              </div>

              {/* 3. Grid: Key Points & Execution Guide */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Key Points */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>نکات کلیدی برای تاکید:</span>
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-[11px] sm:text-xs leading-relaxed pr-1">
                    {note.keyPoints.map((point, idx) => (
                      <li key={idx} className="marker:text-emerald-400">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Presentation Guide */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>راهنمای اجرای اسلاید (Action Guide):</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px] sm:text-xs leading-relaxed pr-1">
                    {note.presentationGuide.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Supplementary Example & Audience Q&A */}
              {(note.supplementaryExample || note.audienceQuestion) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {note.supplementaryExample && (
                    <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/25 space-y-1">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                        <Quote className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>مثال یا تمثیل تکمیلی:</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed pr-5">
                        {note.supplementaryExample}
                      </p>
                    </div>
                  )}

                  {note.audienceQuestion && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-500/25 space-y-1.5">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>پرسش احتمالی مخاطب:</span>
                      </div>
                      <div className="text-[11px] space-y-1 pr-5">
                        <p className="text-slate-200 font-medium">
                          س: {note.audienceQuestion.question}
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                          پاسخ: {note.audienceQuestion.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. Transition Sentence */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30 flex items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-cyan-300 font-bold shrink-0">
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                  <span>جمله انتقال:</span>
                </div>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed text-right flex-1">
                  «{note.transitionSentence}»
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
