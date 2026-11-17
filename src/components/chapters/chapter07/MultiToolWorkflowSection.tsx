'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Database,
  ShoppingCart,
  Layers,
  HelpCircle,
  FileCode,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MULTI_TOOL_WORKFLOW_STEPS,
  SPEAKER_NOTES,
} from './mockData';
import { MultiToolStep } from './types';

export function MultiToolWorkflowSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const currentStep: MultiToolStep = MULTI_TOOL_WORKFLOW_STEPS[activeStepIndex];

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-2-multi-tool">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۲ • اتوماسیون چندابزاری
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۳۵ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          سناریوی تکمیلی انبار و اتوماسیون چندابزاری: هماهنگی میان دو سرور مستقل
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          مشاهده جریان واقعی تعامل چندابزاری در یک زنجیره تأمین مهندسی؛ هماهنگی هاست میان پایگاه داده انبار و سامانه تدارکات از طریق اتصالات مجزای کلاینت-سرور.
        </p>
      </div>

      {/* 2. Established Warehouse Case Continuity Context Card */}
      <Card variant="translucent" className="p-4 sm:p-5 border-indigo-500/30 bg-[#0E1526]/70 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            تداوم داده‌های پایدار سناریوی انبار ارائه:
          </span>
          <div className="flex items-center gap-2 text-xs font-mono" dir="ltr">
            <span className="text-cyan-300">SKU: NVMe-4TB</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-300">Quantity: 6</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-300">Record: INV-2026-981</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">درخواست صریح و مستند کاربر انسانی:</strong> «با توجه به برنامه ارتقای دیتاسنتر، لطفاً یک درخواست تأمین برای ۱۰ ماژول جدید ثبت کن.»
          <div className="mt-1 text-[11px] text-slate-400">
            (اقدام تدارکاتی بر اساس تصمیم مستند انسان صورت می‌گیرد، نه استنتاج خودسرانه مدل از روی عدد موجودی).
          </div>
        </div>
      </Card>

      {/* 3. Multi-Step Interactive Pipeline Flow */}
      <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              مراحل ۵‌گانه ارکستراسیون میان دو سرور مستقل
            </h4>
            <p className="text-xs text-slate-300">
              روی هر مرحله کلیک کنید تا نقش عامل، داده مبادله‌شده و گیت تایید انسانی را مشاهده نمایید:
            </p>
          </div>

          <Badge variant="outline" size="sm" isLTR className="font-mono text-cyan-300 self-start sm:self-auto">
            Host Orchestrated
          </Badge>
        </div>

        {/* 5 Step Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {MULTI_TOOL_WORKFLOW_STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-950/70 border-cyan-400 text-white shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    گام {step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase" dir="ltr">
                    {step.actor}
                  </span>
                </div>
                <div className="text-[11px] font-bold line-clamp-1">{step.titlePersian}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.stepNumber}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-5 rounded-2xl bg-[#0B1020]/90 border border-slate-800 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  گام {currentStep.stepNumber} از ۵
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {currentStep.titlePersian}
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400" dir="ltr">
                Actor: {currentStep.actor}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentStep.details}
            </p>

            {/* Payload Viewer if Available */}
            {currentStep.payload && (
              <div className="p-3.5 rounded-xl bg-[#070B14] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5" dir="ltr">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    Payload Result ({currentStep.isMockData ? 'Educational Mock Data' : 'Verified State'}):
                  </span>
                  {currentStep.isMockData && (
                    <span className="text-[10px] text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                      داده شبیه‌سازی‌شده تدارکات
                    </span>
                  )}
                </div>
                <pre
                  className="font-mono text-xs text-cyan-300 overflow-x-auto p-2 rounded bg-black/40"
                  dir="ltr"
                >
                  {JSON.stringify(currentStep.payload, null, 2)}
                </pre>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Server Connections & Host Orchestration Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>سرور انبار (Server A - PostgreSQL):</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ابزار <span className="font-mono text-cyan-300" dir="ltr">query_inventory</span> را به کلاینت متناظر ارائه می‌دهد. سرور انبار فاقد ارتباط پروتکلی با سامانه تدارکات است و جریان داده منحصراً توسط هاست تجمیع و هدایت می‌شود.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>سرور تدارکات (Server B - REST API):</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ابزار <span className="font-mono text-emerald-300" dir="ltr">create_procurement_ticket</span> را ارائه می‌دهد و پس از مجوزدهی هاست، تیکت را در وضعیت اولیه <span className="font-mono text-amber-300" dir="ltr">AWAITING_APPROVAL</span> ثبت می‌نماید؛ هاست کنترل می‌کند چه پارامترهایی ارسال شوند.
            </p>
          </div>
        </div>
      </Card>

      {/* 4. Collapsible Speaker Notes */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowSpeakerNotes((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all text-xs"
        >
          <span className="flex items-center gap-2 font-semibold">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            {SPEAKER_NOTES[1].title}
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
                {SPEAKER_NOTES[1].bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="pt-2 text-cyan-300 font-medium border-t border-slate-800/60">
                انتقال به بخش بعد: {SPEAKER_NOTES[1].closingPrompt}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
