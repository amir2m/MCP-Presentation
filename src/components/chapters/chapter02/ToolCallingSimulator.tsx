'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Database,
  Bot,
  Info,
  FastForward,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ToolCallingSimulator() {
  const [activeMode, setActiveMode] = useState<'no-tool' | 'tool-calling'>('no-tool');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(3); // 3 = finished
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const runSimulation = (mode: 'no-tool' | 'tool-calling') => {
    clearAllTimers();
    setActiveMode(mode);
    setIsSimulating(true);
    setExecutionStep(1);

    const t1 = setTimeout(() => {
      setExecutionStep(2);
    }, 800);

    const t2 = setTimeout(() => {
      setExecutionStep(3);
      setIsSimulating(false);
      timersRef.current = [];
    }, 1600);

    timersRef.current = [t1, t2];
  };

  const handleSkip = () => {
    clearAllTimers();
    setExecutionStep(3);
    setIsSimulating(false);
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
          مشاهده کنید که چگونه اتصال به ابزار، خروجی مدل را از یک «حدس آماری بدون پشتوانه» به یک «پاسخ مبتنی بر داده‌های ابزار» هدایت می‌کند.
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
      <Card variant="translucent" className="p-6 sm:p-8 border-slate-700/80 space-y-5">
        
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 mr-2" dir="ltr">
              simulator-{activeMode}.sh
            </span>
            {isSimulating && (
              <span className="text-[11px] font-mono text-cyan-300 animate-pulse bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                [گام {executionStep} از ۳]
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSimulating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                iconStart={<FastForward className="w-3.5 h-3.5 text-amber-400" />}
                className="text-xs text-slate-300 hover:text-amber-300"
              >
                نمایش فوری
              </Button>
            )}

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

        {/* Persistent Mock Disclosure Banner (Always visible on desktop and mobile) */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium leading-relaxed">
              شبیه‌سازی آموزشی — بدون اتصال واقعی به پایگاه داده یا سرویس خارجی. داده بازگشتی از ابزار شبیه‌سازی‌شده است.
            </span>
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono hidden md:inline shrink-0" dir="ltr">
            MOCK SIMULATOR
          </span>
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
                «به نظر می‌رسد موجودی محصول <span className="text-rose-400 font-bold">۴۵ عدد</span> باشد.»
              </div>

              <p className="text-xs text-rose-200/90 leading-relaxed">
                مدل به پایگاه داده انبار دسترسی ندارد؛ بنابراین این عدد از پایگاه داده استخراج نشده است و صرفاً یک پیش‌بینی زبانی بدون استناد است.
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
                <span className="text-[10px] bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded text-cyan-300">
                  TOOL-MEDIATED EXECUTION
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
                  <span className="text-emerald-400 font-bold">3. Tool Result (داده ابزار شبیه‌سازی‌شده):</span>{' '}
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
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>داده دریافت‌شده از ابزار شبیه‌سازی‌شده</span>
                  </div>
                  <Badge variant="success" size="sm">
                    داده بازگشتی از ابزار شبیه‌سازی‌شده
                  </Badge>
                </div>

                <div className="p-3 rounded-lg bg-[#0B1020]/90 border border-emerald-900/50 text-slate-100 text-sm font-medium">
                  «موجودی فعلی محصول <span className="font-mono text-cyan-300 font-bold" dir="ltr">PLC-204</span> برابر با <span className="text-emerald-400 font-bold text-base">۱۲ عدد</span> است.»
                </div>

                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  مدل با اتکا به نتیجه تابع ابزار، موجودی انبار را گزارش کرد. این رویکرد خطای حدس بی‌اساس را به شدت کاهش می‌دهد، اما نیازمند صحت عملکرد ابزار، اعتبار مجوزها و تفسیر درست خروجی توسط مدل است.
                </p>

                <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-300">نکته احتیاطی: </span>
                  خطاها ممکن است در انتخاب نادرست ابزار توسط مدل، تولید آرگومان‌های غلط، خطای شبکه/تایم‌اوت، یا کهنگی داده‌های انبار رخ دهند.
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </Card>
    </div>
  );
}
