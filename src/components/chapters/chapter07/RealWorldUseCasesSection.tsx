'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Code,
  FileText,
  Boxes,
  HelpCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SPEAKER_NOTES } from './mockData';
import { WorkflowTrustExplorer } from './WorkflowTrustExplorer';

export function RealWorldUseCasesSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-1-real-world">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۱ • کاربردهای ملموس در دنیای واقعی
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          <span className="font-mono text-cyan-300" dir="ltr">MCP</span> در دنیای واقعی: از محیط‌های توسعه تا پایگاه‌های دانش سازمانی
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          پس از بررسی چرخه حیات و تفاوت ساختاری با APIها، اکنون زمان آن است که ببینیم پروتکل زمینه مدل در سیستم‌های تولیدی مهندسی نرم‌افزار، اسناد سازمانی و اتوماسیون‌های زنجیره تأمین چگونه کار می‌کند.
        </p>
      </div>

      {/* 2. Three Concrete Industrial Applications Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: IDE Assistant */}
        <Card variant="translucent" className="p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Code className="w-4 h-4" />
            <span>۱. دستیارهای محیط توسعه (IDE)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            محیط توسعه در نقش <span className="font-mono text-cyan-300" dir="ltr">AI Host</span> با سرور محلی Git از طریق <span className="font-mono text-indigo-300" dir="ltr">STDIO</span> ارتباط برقرار کرده و به مخزن راه دور گیت‌هاب از بستر <span className="font-mono text-cyan-300" dir="ltr">Streamable HTTP</span> وصل می‌شود؛ بدون آنکه توکن‌های کاربر افشا گردد.
          </p>
        </Card>

        {/* Card 2: Enterprise Knowledge */}
        <Card variant="translucent" className="p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <FileText className="w-4 h-4" />
            <span>۲. پایگاه‌های دانش سازمانی</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ارائه انتخابی منابع مجاز سازمانی؛ دامنه دسترسی واقعی وابسته به کنترل دسترسی سرور و سیاست‌های هاست است و محلی بودن مدل زبانی به‌تنهایی عدم خروج داده را تضمین نمی‌کند.
          </p>
        </Card>

        {/* Card 3: Supply Chain Automation */}
        <Card variant="translucent" className="p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Boxes className="w-4 h-4" />
            <span>۳. اتوماسیون چندابزاری کسب‌وکار</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            هماهنگی میان چندین سرور مستقل (مانند پایگاه داده انبار و سرویس تدارکات) توسط هاست انجام می‌شود؛ پروتکل ارتباط مستقیم سرور-به-سرور تعریف نمی‌کند و هاست جریان داده و فراخوانی‌ها را مدیریت می‌نماید.
          </p>
        </Card>
      </div>

      {/* 3. Primary Interactive Widget A: WorkflowTrustExplorer */}
      <WorkflowTrustExplorer />

      {/* 4. Collapsible Speaker Notes */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowSpeakerNotes((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all text-xs"
        >
          <span className="flex items-center gap-2 font-semibold">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            {SPEAKER_NOTES[0].title}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showSpeakerNotes ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {showSpeakerNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs text-slate-300"
            >
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed">
                {SPEAKER_NOTES[0].bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="pt-2 text-cyan-300 font-medium border-t border-slate-800/60">
                انتقال به بخش بعد: {SPEAKER_NOTES[0].closingPrompt}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
