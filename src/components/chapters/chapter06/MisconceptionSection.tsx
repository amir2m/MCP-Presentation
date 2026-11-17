'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Layers,
  Server,
  Network,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SPEAKER_NOTES } from './mockData';

export function MisconceptionSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-1-misconception">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۱ • مغالطه بنیادین
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۳۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          اگر <span className="font-mono text-cyan-300" dir="ltr">API</span> وجود دارد، چرا به{' '}
          <span className="font-mono text-indigo-300" dir="ltr">MCP</span> نیاز داریم؟
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          یکی از متداول‌ترین سوءتفاهم‌ها در میان مهندسان نرم‌افزار، مقایسه دوگانه «MCP در برابر API» است؛ در حالی که این دو مفهوم در دو لایه کاملاً متفاوت و هم‌افزا فعالیت می‌کنند.
        </p>
      </div>

      {/* 2. Cognitive Conflict Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-slate-200">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h4 className="font-bold text-sm sm:text-base">
            کالبدشکافی چالش ذهنی مهندسی: مغالطه دسته‌بندی (Category Mistake)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Misconception Box */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>باور اشتباه (The Misconception):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              «دهه‌هاست که وب‌سرویس‌ها، REST APIها و پایگاه‌های داده وجود دارند و سیستم‌ها را به هم وصل می‌کنند. آیا استاندارد جدید MCP می‌خواهد همه آن‌ها را منسوخ کند یا جایگزین REST API شود؟»
            </p>
            <div className="pt-2 text-[11px] text-rose-300/80 font-mono" dir="ltr">
              Fallacy: Viewing MCP as a direct rival to REST APIs
            </div>
          </div>

          {/* Architectural Truth Box */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>حقیقت معماری (Architectural Reality):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              «<strong className="text-white">خیر!</strong> MCP هرگز جایگزین API نیست. API قرارداد ارائه سرویس را مشخص می‌کند؛ در حالی که MCP پروتکل ارتباطی استاندارد میان کلاینت‌های هوش مصنوعی و سرورهایی است که اتفاقاً می‌توانند همان APIهای موجود را فراخوانی کنند.»
            </p>
            <div className="pt-2 text-[11px] text-emerald-300/80 font-mono" dir="ltr">
              Synergy: MCP Servers wrap and adapt existing APIs
            </div>
          </div>
        </div>

        {/* Visual Category Demarcation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white text-xs sm:text-sm block">
                محور اول: مفهوم عام API
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                قرارداد برنامه‌نویسی برای تعامل هر دو ماژول نرم‌افزاری (کتابخانه‌ها، وب‌سرویس‌ها، دیتابیس‌ها و سیستم‌عامل).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
              <Network className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white text-xs sm:text-sm block">
                محور دوم: پروتکل زمینه مدل (MCP)
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                پروتکل باز استاندارد برای اتصال کلاینت‌های هوش مصنوعی به قابلیت‌های ابزاری، منابع و پرامپت‌های سرور.
              </p>
            </div>
          </div>
        </div>

        {/* Golden Rule Banner */}
        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-center">
          <span className="text-xs sm:text-sm text-indigo-200 font-bold">
            «MCP رقیب API نیست؛ MCP نحوه اتصال استاندارد برنامه‌های هوش مصنوعی به قابلیت‌های سرور را فرمول‌بندی می‌نماید.»
          </span>
        </div>
      </Card>

      {/* 3. Speaker Notes Section (Collapsible) */}
      <div className="border border-slate-800 rounded-xl bg-[#090E1A]/80 overflow-hidden">
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <span className="font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            یادداشت‌های تفصیلی سخنران (Presenter Notes)
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2"
            >
              <p className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                {SPEAKER_NOTES.section1}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
