'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, RotateCcw, Brain, Split } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_02_PRESENTER_NOTES } from './presenterNotes';
import { Button } from '@/components/ui/Button';

export function LLMGenerationDiagram() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const clearAutoPlayTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setIsAutoPlaying(false);
  };

  // Sample tokens for the prompt
  const persianTokens = [
    { id: 1, text: 'موجودی', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
    { id: 2, text: 'محصول', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
    { id: 3, text: 'PLC', color: 'border-amber-500/40 bg-amber-950/40 text-amber-300', isLTR: true },
    { id: 4, text: '-204', color: 'border-amber-500/40 bg-amber-950/40 text-amber-300', isLTR: true },
    { id: 5, text: 'در', color: 'border-slate-500/40 bg-slate-900/60 text-slate-300' },
    { id: 6, text: 'انبار', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
    { id: 7, text: 'چقدر', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
    { id: 8, text: 'است', color: 'border-slate-500/40 bg-slate-900/60 text-slate-300' },
    { id: 9, text: '؟', color: 'border-rose-500/40 bg-rose-950/40 text-rose-300' },
  ];

  const englishTokens = [
    { id: 'en-1', text: 'Hello' },
    { id: 'en-2', text: ',' },
    { id: 'en-3', text: ' world' },
    { id: 'en-4', text: '!' },
  ];

  const handleNextStep = () => {
    clearAutoPlayTimers();
    setActiveStep((prev) => (prev + 1) % 4);
  };

  const handleAutoPlay = () => {
    clearAutoPlayTimers();
    setIsAutoPlaying(true);
    setActiveStep(0);

    const t1 = setTimeout(() => setActiveStep(1), 700);
    const t2 = setTimeout(() => setActiveStep(2), 1700);
    const t3 = setTimeout(() => {
      setActiveStep(3);
      setIsAutoPlaying(false);
      timersRef.current = [];
    }, 2800);

    timersRef.current = [t1, t2, t3];
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۲.۱ • درک عملکرد مدل‌های زبانی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          مدل زبانی چگونه فکر می‌کند؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مدل زبانی بزرگ (<span className="font-mono text-cyan-300" dir="ltr">LLM</span>) پایگاه داده‌ای از پاسخ‌های ذخیره‌شده نیست؛ بلکه مدلی آماری است که پاسخ‌ها را توکن به توکن (<span className="font-mono text-cyan-300" dir="ltr">Next-Token Prediction</span>) بر پایه الگوهای یادگرفته‌شده تولید می‌کند.
        </p>
      </div>

      {/* Conceptual Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card variant="translucent" className="p-5 border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2 text-indigo-400">
            <Brain className="w-5 h-5" />
            <h4 className="font-bold text-slate-100 text-sm sm:text-base">
              ۱. مدل زبانی بزرگ (LLM) چیست؟
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            مدلی از هوش مصنوعی که روی حجم عظیمی از داده‌های متنی آموزش دیده تا ساختار، معانی و روابط میان توکن‌ها را بیاموزد. در زمان استنتاج، مدل توکن‌های ورودی را پردازش کرده و مکرراً با تخمین احتمال توکن بعدی، متن جدید را تولید می‌کند.
          </p>
        </Card>

        <Card variant="translucent" className="p-5 border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <Split className="w-5 h-5" />
            <h4 className="font-bold text-slate-100 text-sm sm:text-base">
              ۲. توکن (Token) چیست؟
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            متن‌ها پیش از ورود به مدل، به واحدهای کوچک‌تری به نام <span className="font-mono text-cyan-300" dir="ltr">Token</span> خرد می‌شوند. یک توکن ممکن است یک کلمه کامل، زیرکلمه (Subword)، علامت نگارشی یا قطعات کاراکتری باشد.
          </p>
          {/* English Token Example */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">نمونه توکنایز انگلیسی:</span>
            <div className="flex items-center gap-1 font-mono" dir="ltr">
              <span className="text-slate-400">&quot;Hello, world!&quot; →</span>
              {englishTokens.map((t) => (
                <span key={t.id} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[11px]">
                  {t.text}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 2D Interactive Generation Pipeline */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm">
              شبیه‌ساز گام‌به‌گام پردازش توکن و پیش‌بینی توکن بعدی
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAutoPlay}
              disabled={isAutoPlaying}
              iconStart={<Play className="w-3.5 h-3.5 text-cyan-400" />}
              className="text-xs"
            >
              پخش متوالی انیمیشن
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextStep}
              iconStart={<RotateCcw className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              گام بعدی ({activeStep + 1}/4)
            </Button>
          </div>
        </div>

        {/* Pipeline Stage Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className={`p-2 rounded-xl border transition-all ${activeStep === 0 ? 'bg-indigo-950/60 border-cyan-400 text-cyan-300 font-bold' : 'bg-[#0B1020]/60 border-slate-800 text-slate-400'}`}>
            ۱. ورودی متن کاربر
          </div>
          <div className={`p-2 rounded-xl border transition-all ${activeStep === 1 ? 'bg-indigo-950/60 border-cyan-400 text-cyan-300 font-bold' : 'bg-[#0B1020]/60 border-slate-800 text-slate-400'}`}>
            ۲. خردسازی به توکن‌ها
          </div>
          <div className={`p-2 rounded-xl border transition-all ${activeStep === 2 ? 'bg-indigo-950/60 border-cyan-400 text-cyan-300 font-bold' : 'bg-[#0B1020]/60 border-slate-800 text-slate-400'}`}>
            ۳. تخمین احتمال توکن بعدی
          </div>
          <div className={`p-2 rounded-xl border transition-all ${activeStep === 3 ? 'bg-indigo-950/60 border-cyan-400 text-cyan-300 font-bold' : 'bg-[#0B1020]/60 border-slate-800 text-slate-400'}`}>
            ۴. تولید متن خروجی
          </div>
        </div>

        {/* Visual Pipeline Canvas */}
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80 min-h-[200px] flex flex-col justify-center gap-6">
          
          {/* Step 0: User Input */}
          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-mono">Input Prompt:</span>
            <div className="p-3.5 rounded-xl bg-[#141C2E] border border-slate-700 text-slate-200 text-sm font-medium">
              «موجودی محصول <span className="font-mono text-cyan-300" dir="ltr">PLC-204</span> در انبار چقدر است؟»
            </div>
          </div>

          {/* Step 1: Token Chips */}
          <motion.div
            animate={{ opacity: activeStep >= 1 ? 1 : 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Tokenized Representation ({persianTokens.length} Tokens):</span>
              {activeStep >= 1 && <span className="text-cyan-400">واحدهای ورودی به شبکه عصبی</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              {persianTokens.map((token, idx) => (
                <motion.span
                  key={token.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={activeStep >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0.3 }}
                  transition={{ delay: idx * 0.05 }}
                  dir={token.isLTR ? 'ltr' : undefined}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium shadow-sm ${token.color}`}
                >
                  {token.text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Step 2 & 3: Next Token Probability Distribution & Output */}
          {activeStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80"
            >
              {/* Distribution Table */}
              <div className="p-3.5 rounded-xl bg-[#141C2E]/70 border border-indigo-500/20 space-y-2.5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-300 block">
                    محتمل‌ترین گزینه‌های ادامه پاسخ (Top-3 Candidates):
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    احتمال هر گزینه با توجه به توکن‌های قبلی و بافتار ورودی مدل تعیین می‌شود.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between bg-indigo-950/60 p-1.5 px-2.5 rounded border border-indigo-500/40 text-cyan-300 font-bold">
                    <span>&quot;موجودی&quot;</span>
                    <span>78.4% ★</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/50 p-1.5 px-2.5 rounded text-slate-400">
                    <span>&quot;بر اساس&quot;</span>
                    <span>14.2%</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/50 p-1.5 px-2.5 rounded text-slate-400">
                    <span>&quot;اطلاعات&quot;</span>
                    <span>5.1%</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/30 p-1 px-2.5 rounded text-slate-500 text-[11px] border border-slate-800/50">
                    <span className="font-sans">سایر کاندیداها در دایره واژگان:</span>
                    <span>2.3%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400 font-sans leading-relaxed">
                  <p>
                    <strong className="text-indigo-300">نکته آموزشی:</strong> انتخاب گزینه دارای بیشترین احتمال، نمونه‌ای از گزینش حریصانه (<span className="font-mono text-slate-300" dir="ltr">Greedy Decoding</span>) است. در روش‌های نمونه‌برداری (<span className="font-mono text-slate-300" dir="ltr">Sampling</span>)، ممکن است گزینه‌های دیگری نیز انتخاب شوند.
                  </p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    * اعداد این نمودار فرضی و صرفاً برای نمایش آموزشی مفهوم احتمال هستند؛ این مقادیر از خروجی واقعی یک مدل مشخص استخراج نشده‌اند.
                  </p>
                </div>
              </div>

              {/* Generated Text */}
              <div className="p-3.5 rounded-xl bg-[#141C2E]/70 border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  خروجی مدل زبانی در مرحله جاری:
                </span>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans p-2 rounded bg-[#0B1020] border border-slate-800">
                  {activeStep === 2 ? (
                    <span className="text-slate-400 animate-pulse">در حال پیش‌بینی توکن بعدی...</span>
                  ) : (
                    <span>
                      «موجودی این محصول در آخرین گزارش‌ها <strong className="text-rose-400 font-bold">۴۵ عدد</strong> ذکر شده است.»
                    </span>
                  )}
                </div>
                {activeStep === 3 && (
                  <div className="text-[11px] text-amber-400 flex items-center gap-1.5 pt-1">
                    <span>⚠️ اما آیا این عدد متکی بر پایگاه داده است یا صرفاً برآمده از احتمال توکن‌های متنی؟</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </Card>

      {/* Slide Presenter Notes (Collapsible) */}
      <SlidePresenterNotes note={CHAPTER_02_PRESENTER_NOTES[0]} />
    </div>
  );
}
