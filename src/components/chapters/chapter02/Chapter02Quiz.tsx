'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Award, HelpCircle, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CHAPTER_02_QUIZ } from '@/lib/presentation';

interface Chapter02QuizProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter02Quiz({ onSelectChapter }: Chapter02QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Calculate score
  const totalQuestions = CHAPTER_02_QUIZ.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = CHAPTER_02_QUIZ.filter((q) => {
    const selected = selectedAnswers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return selected && correctOpt && selected === correctOpt.id;
  }).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۲.۶ • سنجش درک مفاهیم
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          آزمونک تعاملی فصل دوم
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          برای سنجش یادگیری مفاهیم کلیدی این فصل (توکن، دسترسی به داده و فراخوانی ابزار)، به سه پرسش زیر پاسخ دهید.
        </p>
      </div>

      {/* Quiz Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-8">
        
        {/* Score & Progress Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-slate-200 text-sm">
              آزمون ۳ گزینه‌ای فصل دوم
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              پاسخ داده‌شده: {answeredCount} از {totalQuestions}
            </span>
            {isSubmitted && (
              <Badge
                variant={score === totalQuestions ? 'success' : score >= 2 ? 'cyan' : 'outline'}
                size="sm"
              >
                امتیاز شما: {score} از {totalQuestions}
              </Badge>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-8">
          {CHAPTER_02_QUIZ.map((q, qIndex) => {
            const selectedOptId = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-[#090E1A] border border-slate-800/90 space-y-4">
                
                {/* Question Title */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {qIndex + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOptId === opt.id;
                    const letter = ['الف', 'ب', 'ج'][optIdx];

                    let optionClasses =
                      'bg-[#141C2E] border-slate-800 hover:border-indigo-500/40 hover:bg-[#192338] text-slate-200';

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        optionClasses =
                          'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/40 text-emerald-200';
                      } else if (isSelected && !opt.isCorrect) {
                        optionClasses =
                          'bg-rose-950/40 border-rose-500/60 text-rose-200';
                      } else {
                        optionClasses = 'bg-[#141C2E]/50 border-slate-900 opacity-40 text-slate-400';
                      }
                    } else if (isSelected) {
                      optionClasses =
                        'bg-indigo-950/60 border-cyan-400/60 text-cyan-200 shadow-md ring-1 ring-cyan-400/20';
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${optionClasses}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-800/80 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                              {letter}
                            </span>
                            <span className="text-xs sm:text-sm font-medium">
                              {opt.text}
                            </span>
                          </div>

                          {isSubmitted && (
                            <div>
                              {opt.isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              ) : isSelected ? (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              ) : null}
                            </div>
                          )}
                        </div>

                        {/* Explanation on submit */}
                        {isSubmitted && (isSelected || opt.isCorrect) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`text-xs mt-2 pt-2 border-t font-sans leading-relaxed ${
                              opt.isCorrect
                                ? 'border-emerald-800/40 text-emerald-300'
                                : 'border-rose-900/40 text-rose-300'
                            }`}
                          >
                            {opt.explanation}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Question Takeaway if submitted */}
                {isSubmitted && (
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-cyan-300">نکته کلیدی: </strong>
                      {q.educationalTakeaway}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            iconStart={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            شروع مجدد آزمونک
          </Button>

          {!isSubmitted ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsSubmitted(true)}
              disabled={answeredCount < totalQuestions}
              className="text-xs sm:text-sm px-6"
            >
              ثبت و مشاهده پاسخ‌های تشریحی
            </Button>
          ) : (
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>
                {score === totalQuestions
                  ? 'عالی! تمام مفاهیم فصل دوم را با موفقیت فرا گرفتید.'
                  : `آزمون پایان یافت. نمره شما: ${score} از ${totalQuestions}`}
              </span>
            </div>
          )}
        </div>

      </Card>

      {/* Chapter 03 Transition CTA Banner */}
      {onSelectChapter && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-[#121B30] to-cyan-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Badge variant="cyan" size="sm">
                گام بعدی
              </Badge>
              <span className="text-xs text-cyan-300 font-mono" dir="ltr">
                Chapter 03 Preview
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              ادامه مسیر: معرفی Model Context Protocol (فصل سوم)
            </h4>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              بررسی ظهور استاندارد باز جهانی، تمثیل درگاه USB-C برای هوش مصنوعی و حل چالش اتصالات اسپاگتی N×M.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onSelectChapter(3)}
            iconEnd={<ArrowLeft className="w-4 h-4" />}
            className="shrink-0 text-xs sm:text-sm shadow-lg shadow-indigo-600/30"
          >
            ورود به فصل سوم
          </Button>
        </div>
      )}
    </div>
  );
}
