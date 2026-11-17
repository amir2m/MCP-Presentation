'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  UserCheck,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SPEAKER_NOTES } from './mockData';
import { SecurityPolicySimulator } from './SecurityPolicySimulator';

export function HumanInTheLoopSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-4-hitl">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۴ • مدیریت اختیارات و کنترل انسانی
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          اصل حداقل اختیارات (<span className="font-mono text-cyan-300" dir="ltr">Least Privilege</span>) و دروازه نظارت انسانی (<span className="font-mono text-indigo-300" dir="ltr">HITL</span>)
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          تنها راه مهار عاملیت بیش از حد مدل‌های زبانی، تعریف دقیق سطوح ریسک عملیات در برنامه میزبان و ایجاد دروازه‌های تایید انسانی برای هرگونه اقدام با اثر مالی، حقوقی یا تخریبی است.
        </p>
      </div>

      {/* 2. Conceptual Foundation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Least Privilege */}
        <Card variant="translucent" className="p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Shield className="w-4 h-4" />
            <span>اصل حداقل اختیارات (Least Privilege)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            هیچ ابزاری نباید اختیاراتی فراتر از وظیفه صریح خود داشته باشد. اگر مدلی صرفاً برای خواندن وضعیت انبار استعلام می‌گیرد، نباید به ابزار تغییر جدول یا صدور دستورات روت دسترسی داشته باشد.
          </p>
        </Card>

        {/* Card 2: Human-in-the-Loop Gate */}
        <Card variant="translucent" className="p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>دروازه تایید کاربر (Human Confirmation Gate)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            تایید انسانی یک سیاست اجرایی در برنامه میزبان (Host) است، نه یک ویژگی جادویی یا الزام پروتکل هسته. این دروازه مدل را متوقف کرده و مسئولیت حقوقی اقدام نهایی را بر عهده انسان می‌گذارد.
          </p>
        </Card>
      </div>

      {/* 3. Primary Interactive Widget B: SecurityPolicySimulator */}
      <SecurityPolicySimulator />

      {/* 4. Collapsible Speaker Notes */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowSpeakerNotes((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all text-xs"
        >
          <span className="flex items-center gap-2 font-semibold">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            {SPEAKER_NOTES[3].title}
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
                {SPEAKER_NOTES[3].bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="pt-2 text-cyan-300 font-medium border-t border-slate-800/60">
                انتقال به بخش بعد: {SPEAKER_NOTES[3].closingPrompt}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
