'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Bot,
  User,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CONSTANTS, SCENARIOS } from './mockData';
import { RequestLifecycleSimulator } from './RequestLifecycleSimulator';

interface FinalSynthesisSectionProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function FinalSynthesisSection({ onSelectChapter }: FinalSynthesisSectionProps) {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [showFullSimulator, setShowFullSimulator] = useState<boolean>(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-6-final-synthesis">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۵.۶ • سنتز نهایی و نتیجه‌گیری
        </Badge>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تولید پاسخ طبیعی مدل و مرور چرخه حیات درخواست در{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            MCP
          </span>
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          به انتهای چرخه رسیدیم: مدل زبانی با استفاده از نتیجه بازگشتی ابزار در کانتکست، پاسخ نهایی را بر مبنای اطلاعات در دسترس برای کاربر تدوین می‌کند.
        </p>
      </div>

      {/* 2. Model Response Delivery Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/30 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              تحویل پاسخ نهایی مدل بر مبنای شواهد مستند ابزار
            </h4>
          </div>

          <Badge variant="cyan" size="sm">
            Evidence-Based Synthesis
          </Badge>
        </div>

        {/* User Query & Model Answer Dialog */}
        <div className="space-y-4">
          {/* User Bubble */}
          <div className="flex items-start gap-3 justify-end">
            <div className="max-w-md p-3.5 rounded-2xl rounded-tr-none bg-indigo-950/60 border border-indigo-500/30 text-white text-xs sm:text-sm">
              <span className="text-[10px] text-indigo-400 block mb-1 font-bold">
                کاربر:
              </span>
              «آیا کالای {CONSTANTS.SKU} در انبار موجود است؟»
            </div>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
              <User className="w-4 h-4" />
            </div>
          </div>

          {/* Model Bubble */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-xl p-4 rounded-2xl rounded-tl-none bg-cyan-950/40 border border-cyan-500/30 text-white text-xs sm:text-sm space-y-2">
              <span className="text-[10px] text-cyan-400 block font-bold">
                مدل زبانی (مستند به داده‌های ابزار):
              </span>
              <p className="font-semibold text-slate-100 leading-relaxed">
                {SCENARIOS['scenario-a'].finalModelResponse}
              </p>
              <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <span>شناسه مرجع انبار: <code className="text-cyan-300 font-mono">{CONSTANTS.INVENTORY_ID}</code></span>
                <span className="text-emerald-400 font-medium">وضعیت: مستند و اعتبارسنجی‌شده</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Step Round-trip Summary Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h5 className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            مرور خط سیر چرخه رفت و برگشت درخواست (۸ مرحله کلیدی):
          </h5>

          <div className="space-y-2 font-mono text-[11px] text-slate-400" dir="ltr">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 overflow-x-auto text-indigo-300">
              <span className="font-bold text-slate-400 shrink-0">Forward:</span>
              <span>User &rarr; Host &rarr; LLM &rarr; Host &rarr; MCP Client &rarr; MCP Server &rarr; External DB</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 overflow-x-auto text-cyan-300">
              <span className="font-bold text-slate-400 shrink-0">Return:</span>
              <span>External DB &rarr; MCP Server &rarr; MCP Client &rarr; Host &rarr; LLM Context &rarr; User</span>
            </div>
          </div>
        </div>

        {/* Toggle to run the full interactive simulator */}
        <div className="pt-2 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFullSimulator(!showFullSimulator)}
            className="text-xs gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {showFullSimulator
                ? 'بستن شبیه‌ساز کامل تعاملی'
                : 'باز کردن شبیه‌ساز تعاملی کامل چرخه حیات (۸ مرحله‌ای)'}
            </span>
          </Button>
        </div>

        {/* Embedded Simulator */}
        <AnimatePresence>
          {showFullSimulator && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4 overflow-hidden"
            >
              <RequestLifecycleSimulator initialScenario="scenario-a" />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* 3. Speaker Notes Toggle */}
      <div className="border border-slate-800/80 rounded-2xl bg-slate-900/40 overflow-hidden">
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors text-xs sm:text-sm font-medium cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            یادداشت تفصیلی ارائه‌دهنده (Presenter Notes)
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
              transition={{ duration: 0.25 }}
              className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 space-y-2 bg-[#0B1020]/90"
            >
              <p className="border-r-2 border-cyan-500 pr-3 my-2 text-slate-300">
                «به انتهای چرخه رسیدیم. مدل زبانی با استفاده از نتیجه بازگشتی ابزار در کانتکست، پاسخ نهایی را بر مبنای اطلاعات در دسترس تدوین کرد و پاسخی طبیعی و مستند به کاربر تحویل داد: قطعه NVMe-4TB موجود است و ۶ عدد در انبار داریم. مدل با تکیه بر شواهد ابزار پاسخ داد و هیچ دسترسی مستقیمی از مدل به دیتابیس وجود نداشت. این یعنی یک معماری تمیز، تفکیک‌شده و استاندارد. اکنون که کارکرد این چرخه را دیدیم، وقت آن است به مقایسه بپردازیم: چرا این روش بسیار برتر از ساختن صدها REST API سفارشی یا کدهای وابسته به یک مدل خاص است؟ در فصل ششم این موضوع را کالبدشکافی خواهیم کرد.»
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Final Transition CTA Box to Chapter 06 */}
      <Card
        variant="solid"
        glowColor="cyan"
        className="p-8 sm:p-10 border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" size="md">
            پایان فصل پنجم • آماده ورود به مقایسه معماری
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            «شما چرخه حیات کامل یک درخواست را در پروتکل باز و استاندارد MCP مشاهده کردید. اما اکنون یک پرسش اساسی در ذهن هر مهندس نرم‌افزار شکل می‌گیرد: چرا از وب‌سرویس‌های متداول مانند REST API، یا قابلیت‌های سنتی Function Calling استفاده نکنیم؟ برتری معماری MCP در کجاست؟»
          </h3>

          <p className="text-slate-400 text-sm">
            در فصل ششم، ماتریس تحلیل تفاوت‌ها، استقلال از مدل ارائه‌دهنده، امنیت و قابلیت حمل را در برابر روش‌های سفارشی بررسی خواهیم کرد.
          </p>

          <div className="pt-4 flex justify-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => onSelectChapter?.(6)}
              className="gap-3 shadow-lg shadow-cyan-500/25 px-8 py-3 text-base font-bold"
            >
              <span>ورود به فصل ششم: مقایسه MCP با REST API و روش‌های سنتی</span>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
