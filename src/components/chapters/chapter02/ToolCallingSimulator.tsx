'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Database,
  Bot,
  Info,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ToolCallingSimulator() {
  const [activeMode, setActiveMode] = useState<'no-tool' | 'tool-calling'>('no-tool');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(3); // 3 = finished

  const runSimulation = (mode: 'no-tool' | 'tool-calling') => {
    setActiveMode(mode);
    setIsSimulating(true);
    setExecutionStep(1);

    setTimeout(() => {
      setExecutionStep(2);
    }, 800);

    setTimeout(() => {
      setExecutionStep(3);
      setIsSimulating(false);
    }, 1600);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۲.۴ • شبیه‌ساز مقایسه دو سناریو
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          یک سؤال، دو نتیجه متفاوت
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مشاهده کنید که چگونه افزودن یک ابزار ساده، خروجی مدل را از یک «حدس آماری توهم‌آمیز» به یک «پاسخ متقن و قابل استناد» تبدیل می‌کند.
        </p>
      </div>

      {/* Mode Selector Controls */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => runSimulation('no-tool')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeMode === 'no-tool'
              ? 'bg-rose-950/70 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40'
              : 'bg-[#141C2E] text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4 text-rose-400" />
          <span>حالت اول: بدون ابزار خارجی (تولید صرف متن)</span>
        </button>

        <button
          type="button"
          onClick={() => runSimulation('tool-calling')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeMode === 'tool-calling'
              ? 'bg-indigo-950/80 text-cyan-300 border border-cyan-400/60 shadow-lg shadow-cyan-950/50'
              : 'bg-[#141C2E] text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4 text-cyan-400" />
          <span>حالت دوم: با فراخوانی ابزار (Tool Calling)</span>
        </button>
      </div>

      {/* Simulator Terminal Card */}
      <Card variant="translucent" className="p-6 sm:p-8 border-slate-700/80 space-y-6">
        
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 mr-2" dir="ltr">
              simulator-{activeMode}.sh
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Unobtrusive Educational Disclaimer */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1020] border border-slate-800 text-[11px] text-slate-400">
              <Info className="w-3 h-3 text-cyan-400" />
              <span>شبیه‌سازی آموزشی — بدون اتصال واقعی به پایگاه داده</span>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => runSimulation(activeMode)}
              iconStart={<RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />}
              className="text-xs"
            >
              اجرای مجدد
            </Button>
          </div>
        </div>

        {/* User Prompt Box */}
        <div className="p-4 rounded-xl bg-[#0B1020]/80 border border-slate-800 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            کاربر
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-mono">Input Query:</span>
            <p className="text-sm font-medium text-slate-100">
              «موجودی محصول <span className="font-mono text-cyan-300" dir="ltr">PLC-204</span> در انبار چقدر است؟»
            </p>
          </div>
        </div>

        {/* Simulation Output Area */}
        {activeMode === 'no-tool' ? (
          /* ================= MODE A: NO TOOL ================= */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Execution Trace */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs font-mono space-y-2" dir="ltr">
              <div className="flex items-center justify-between text-rose-400 font-bold">
                <span>[Direct Inference] No Tools Registered</span>
                <span className="text-[10px] bg-rose-900/40 px-2 py-0.5 rounded text-rose-300">UNGROUNDED</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                &gt; Searching weights for &quot;PLC-204&quot; ... No private database connection available.
                <br />
                &gt; Sampling next tokens from statistical probability distribution ...
              </div>
            </div>

            {/* Model Response Card */}
            <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>پاسخ حدسی / تأییدنشده (Unverified Guess)</span>
                </div>
                <Badge variant="outline" size="sm" className="text-rose-300 border-rose-500/40">
                  توهم آماری
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-[#0B1020]/90 border border-rose-900/50 text-slate-100 text-sm font-medium">
                «به نظر می‌رسد موجودی محصول <span className="font-mono text-rose-400 font-bold">۴۵ عدد</span> باشد.»
              </div>

              <p className="text-xs text-rose-200/90 leading-relaxed">
                مدل به داده واقعی انبار دسترسی ندارد؛ بنابراین این عدد از پایگاه داده استخراج نشده است و صرفاً یک پیش‌بینی زبانی بدون استناد است.
              </p>
            </div>
          </motion.div>
        ) : (
          /* ================= MODE B: TOOL CALLING ================= */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Execution Trace */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-cyan-500/30 text-xs font-mono space-y-2.5" dir="ltr">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span>[Host Tool Calling Trace]</span>
                <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-emerald-300">
                  VERIFIED EXECUTION
                </span>
              </div>

              {/* Step 1: Model Request */}
              <div className="bg-[#0B1020] p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                <span className="text-indigo-400 font-bold">1. Model:</span> emits ToolCall: <code>get_inventory({`{ "product_id": "PLC-204" }`})</code>
              </div>

              {/* Step 2: Host Validation */}
              {executionStep >= 2 && (
                <div className="bg-[#0B1020] p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  <span className="text-cyan-400 font-bold">2. Host:</span> validated security permissions and dispatched query to database.
                </div>
              )}

              {/* Step 3: Tool Result */}
              {executionStep >= 3 && (
                <div className="bg-[#0B1020] p-2.5 rounded-lg border border-slate-800 text-[11px]">
                  <span className="text-emerald-400 font-bold">3. Database Result:</span>{' '}
                  <code className="text-cyan-200">{`{ "product_id": "PLC-204", "available_quantity": 12 }`}</code>
                </div>
              )}
            </div>

            {/* Model Response Card */}
            {executionStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>داده دریافت‌شده از ابزار شبیه‌سازی‌شده (Grounded Data)</span>
                  </div>
                  <Badge variant="success" size="sm">
                    تأییدشده و واقعی
                  </Badge>
                </div>

                <div className="p-3 rounded-lg bg-[#0B1020]/90 border border-emerald-900/50 text-slate-100 text-sm font-medium">
                  «موجودی فعلی محصول <span className="font-mono text-cyan-300 font-bold" dir="ltr">PLC-204</span> برابر با <span className="font-mono text-emerald-400 font-bold text-base">۱۲ عدد</span> است.»
                </div>

                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  مدل با استناد مستقیم به نتیجه تابع ابزار، موجودی دقیق را گزارش کرد؛ بدون حدس، بدون توهم و با اطمینان کامل.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Bottom Educational Disclaimer (always visible on mobile) */}
        <div className="pt-2 text-center sm:hidden text-[11px] text-slate-400">
          ⚠️ شبیه‌سازی آموزشی — بدون اتصال واقعی به پایگاه داده
        </div>
      </Card>
    </div>
  );
}
