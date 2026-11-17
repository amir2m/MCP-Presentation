'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Database,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Code2,
  Boxes,
  Lock,
  Workflow,
  FastForward,
  ArrowLeft,
  Server,
  Layers,
  ShieldCheck,
  Cpu,
  Info,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CHAPTER_01_QUIZ } from '@/lib/presentation';
import { AccessBoundaryDiagram } from './chapter01/AccessBoundaryDiagram';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_01_PRESENTER_NOTES } from './chapter01/presenterNotes';

interface Chapter01Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter01({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter01Props) {
  const router = useRouter();

  // State for interactive comparison simulation
  const [activeTab, setActiveTab] = useState<'text-only' | 'mcp-action'>('text-only');
  const [simStep, setSimStep] = useState<number>(2); // Default to fully loaded
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // State for quiz
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);

  // Max steps for each simulation mode
  const maxSteps = activeTab === 'text-only' ? 2 : 5;

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startSimulation = (type: 'text-only' | 'mcp-action') => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setActiveTab(type);
    setIsSimulating(true);
    setSimStep(0);

    const targetMax = type === 'text-only' ? 2 : 5;
    let current = 0;

    timerRef.current = setInterval(() => {
      current += 1;
      setSimStep(current);

      if (current >= targetMax) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsSimulating(false);
      }
    }, 700);
  };

  const handleSkipSimulation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSimStep(maxSteps);
    setIsSimulating(false);
  };

  const handleSelectQuizOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setHasSubmittedQuiz(true);
  };

  const handleResetQuiz = () => {
    setSelectedOptionId(null);
    setHasSubmittedQuiz(false);
  };

  const handleNavigateToChapter02 = () => {
    if (onSelectChapter) {
      onSelectChapter(2);
    } else {
      router.push('/presentation?chapter=2');
    }
  };

  // ==========================================
  // SLIDE 1: The Access Boundary & Foundations
  // ==========================================
  const renderSlide1 = () => (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۱.۱ • مرزهای دسترسی و معماری پایه
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          گذار از تولید متن به تعامل با ابزارها
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          مدل زبانی به‌خودی‌خود دسترسی مستقیمی به سیستم‌عامل، فایل‌ها، شبکه یا پایگاه داده ندارد. این دسترسی‌ها در اختیار محیط اجرایی برنامه میزبان هستند و برنامه می‌تواند از طریق ابزارهای مجاز، قابلیت تعامل با سیستم‌های خارجی را در اختیار مدل قرار دهد.
        </p>
      </div>

      {/* 3 Foundational Architectural Distinctions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layer 1: LLM Core */}
        <Card variant="translucent" className="p-5 border-indigo-500/20 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-lg">
                لایه هسته محاسباتی
              </span>
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>

            <h4 className="text-base font-bold text-slate-100">
              ۱. مدل زبانی؛ پیش‌بینی‌کننده توکن بعدی
            </h4>
            <div className="text-xs font-mono text-cyan-300" dir="ltr">Next-Token Predictor</div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              توکن (<span className="font-mono text-cyan-300" dir="ltr">Token</span>) کوچک‌ترین واحد پردازش متن در مدل است و می‌تواند یک کلمه، زیرکلمه، علامت نگارشی یا بخشی از نویسه‌ها باشد. مدل با دریافت دنباله توکن‌ها، محتمل‌ترین توکن بعدی را محاسبه می‌کند.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>محاسبات تانسوری روی پارامترهای آماری</span>
          </div>
        </Card>

        {/* Layer 2: Host Environment */}
        <Card variant="translucent" className="p-5 border-cyan-500/20 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg">
                محیط اجرایی
              </span>
              <Server className="w-5 h-5 text-cyan-400" />
            </div>

            <h4 className="text-base font-bold text-slate-100">
              ۲. محیط اجرایی برنامه میزبان
            </h4>
            <div className="text-xs font-mono text-cyan-300" dir="ltr">Host Environment</div>

            <p className="text-xs text-slate-300 leading-relaxed">
              برنامه‌ای که روی رایانه کاربر یا سرور اجرا می‌شود (مانند VS Code یا سرویس بک‌اند). این محیط به سوکت شبکه، دسترسی فایل و فراخوانی‌های سیستمی مجهز است و امنیت را پایش می‌کند.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>مدیریت دسترسی‌ها و کنترل اختیارات</span>
          </div>
        </Card>

        {/* Layer 3: Tools */}
        <Card variant="translucent" className="p-5 border-emerald-500/20 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                پل‌های واسط
              </span>
              <Workflow className="w-5 h-5 text-emerald-400" />
            </div>

            <h4 className="text-base font-bold text-slate-100">
              ۳. ابزارهای مجاز واسط
            </h4>
            <div className="text-xs font-mono text-emerald-300" dir="ltr">Authorized Tools</div>

            <p className="text-xs text-slate-300 leading-relaxed">
              توابع استانداردی که توسط میزبان تعریف شده و امکان خواندن از پایگاه داده، فراخوانی API و تغییر ایمن فایل‌ها را تحت نظارت برنامه میزبان مهیا می‌کنند.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>اتصال با ساختار استاندارد</span>
          </div>
        </Card>
      </div>

      {/* 2D Responsive Architecture Diagram */}
      <AccessBoundaryDiagram />

      {/* Slide Presenter Notes (Collapsible) */}
      <SlidePresenterNotes note={CHAPTER_01_PRESENTER_NOTES[0]} />
    </div>
  );

  // ==========================================
  // SLIDE 2: Visual Comparison: Text vs Action
  // ==========================================
  const renderSlide2 = () => (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="cyan" size="md">
          بخش ۱.۲ • مقایسه زنده شبیه‌سازی‌شده
        </Badge>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          مقایسه تصویری: حدس متنی در برابر اقدام ابزارمحور
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          سناریو: کاربر درخواست بررسی موجودی قطعه سرور (<span className="font-mono text-cyan-300" dir="ltr">NVMe-4TB</span>) و ثبت سفارش فوری دارد.
        </p>
      </div>

      {/* Simulator Switcher Controls */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => startSimulation('text-only')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'text-only'
              ? 'bg-rose-950/60 text-rose-300 border border-rose-500/50 shadow-lg shadow-rose-950/40'
              : 'bg-[#141C2E] text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>سناریوی اول: مدل فاقد ابزار (Text-Only)</span>
        </button>

        <button
          type="button"
          onClick={() => startSimulation('mcp-action')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'mcp-action'
              ? 'bg-indigo-950/80 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-950/40'
              : 'bg-[#141C2E] text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4 text-cyan-400" />
          <span>سناریوی دوم: اتصال ابزار استاندارد (MCP Action)</span>
        </button>
      </div>

      {/* Interactive Simulation Window */}
      <Card variant="translucent" className="p-6 border-slate-700/60 min-h-[420px] flex flex-col justify-between">
        {/* Terminal Header & Execution Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 mr-2" dir="ltr">
              simulator-{activeTab}.log
            </span>
            {isSimulating && (
              <span className="text-[11px] font-mono text-cyan-300 animate-pulse bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                [گام {simStep} از {maxSteps}]
              </span>
            )}
          </div>

          {/* Action Buttons: Replay & Skip */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            {isSimulating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipSimulation}
                iconStart={<FastForward className="w-3.5 h-3.5 text-amber-400" />}
                className="text-xs text-slate-300 hover:text-amber-300"
              >
                نمایش فوری
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => startSimulation(activeTab)}
              iconStart={<RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />}
              className="text-xs"
            >
              اجرای مجدد شبیه‌سازی
            </Button>
          </div>
        </div>

        {/* Persistent Mock Data Disclosure Badge */}
        <div className="mt-3 p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              شبیه‌سازی آموزشی — بدون اتصال واقعی به پایگاه داده و سیستم‌های تجاری.
            </span>
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono hidden sm:inline" dir="ltr">
            MOCK ENVIRONMENT
          </span>
        </div>

        {/* Dynamic Simulation Body */}
        <div className="py-5 space-y-4">
          {/* User Request Bubble */}
          <div className="flex items-start gap-3 bg-[#0B1020]/70 p-3.5 rounded-xl border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/40 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
              کاربر
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-200">
                «موجودی قطعه سخت‌افزاری <span className="font-mono text-cyan-300" dir="ltr">NVMe-4TB</span> را در دیتابیس انبار بررسی کن و در صورت وجود، یک فاکتور سفارش رزرو ثبت کن.»
              </p>
            </div>
          </div>

          {/* Execution Trace */}
          {activeTab === 'text-only' ? (
            <div className="space-y-3">
              {simStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs font-mono space-y-2"
                >
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>وضعیت مدل: متکی به دانش زمان آموزش؛ بدون دسترسی به ابزار یا دیتابیس</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    پاسخ فرضی مدل بر اساس توالی متنی: «بله، موجودی قطعه انبار حدوداً ۴۵ عدد است و فاکتور شماره ۱۲۳۴۵ برای شما ثبت گردید!»
                  </p>
                </motion.div>
              )}

              {simStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-[#0e1628] border border-amber-500/20 space-y-2 text-xs"
                >
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>تحلیل علمی پدیده توهم (Hallucination Nuance):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    نبود دسترسی به داده‌های خارجی و لحظه‌ای می‌تواند احتمال تولید پاسخ بی‌پشتوانه را افزایش دهد؛ اما توهم حتی در سیستم‌های مجهز به ابزار نیز ممکن است رخ دهد (مثلاً در تفسیر نادرست داده‌ها توسط مدل).
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Step 1: Host Validating and Processing */}
              {simStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-indigo-950/30 border border-cyan-500/30 text-xs font-mono space-y-1.5"
                  dir="ltr"
                >
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>[HOST] Validating and Processing Tool Request</span>
                    <span className="text-[10px] text-slate-400 font-sans">برنامه میزبان</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans" dir="rtl">
                    در این مرحله، برنامه میزبان درخواست ابزار را مدیریت می‌کند. جزئیات ارتباط استاندارد MCP در فصل‌های بعد بررسی خواهد شد.
                  </div>
                </motion.div>
              )}

              {/* Step 2 & 3: Inventory Query and Response */}
              {simStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-lg bg-[#0B1020] border border-slate-800 text-slate-300 text-[11px] font-mono space-y-1"
                  dir="ltr"
                >
                  <div className="text-cyan-300">&gt; tools/call: query_inventory({`{ sku: "NVMe-4TB" }`})</div>
                  {simStep >= 3 && (
                    <div className="text-emerald-400">
                      &lt; response (داده بازگشتی از ابزار شبیه‌سازی‌شده): {`{ in_stock: true, count: 6, warehouse: "Tehran-Central" }`}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4 & 5: Reservation Call & Response */}
              {simStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-lg bg-[#0B1020] border border-slate-800 text-slate-300 text-[11px] font-mono space-y-1"
                  dir="ltr"
                >
                  <div className="text-cyan-300">&gt; tools/call: reserve_order({`{ sku: "NVMe-4TB", qty: 1 }`})</div>
                  {simStep >= 5 && (
                    <div className="text-cyan-300">
                      &lt; response (داده بازگشتی از ابزار شبیه‌سازی‌شده): {`{ status: "CONFIRMED", invoice_id: "INV-2026-981" }`}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Final Step: Model response based on tool results */}
              {simStep >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-200">
                    <span className="font-bold text-emerald-300">پاسخ مدل به کاربر (مبتنی بر داده‌های ابزار): </span>
                    «بر اساس داده‌های بازگشتی از ابزار، قطعه در انبار ۶ عدد موجود است و فاکتور رزرو با شناسه <span className="font-mono text-cyan-300" dir="ltr">INV-2026-981</span> ثبت گردید.»
                  </div>

                  {/* Scientific Cautionary Note */}
                  <div className="p-3 rounded-xl bg-[#0e1628] border border-amber-500/25 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-amber-300">نکته احتیاطی مهم: </span>
                    استفاده از ابزار به‌تنهایی صحت پاسخ را تضمین نمی‌کند. ابزار ممکن است خطا کند، داده ناقص یا قدیمی برگرداند یا با مشکل دسترسی مواجه شود. همچنین مدل ممکن است نتیجه ابزار را اشتباه تفسیر کند.
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer Concept Distinction: Training Knowledge vs Runtime Context */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0c1222] border border-slate-800 text-slate-300">
              <span className="font-bold text-indigo-300">دانش زمان آموزش (Training Knowledge): </span>
              وزن‌های آماری محاسبه‌شده در دوره آموزش مدل با مرز زمانی محدود (<span className="font-mono text-slate-400" dir="ltr">Knowledge Cutoff</span>).
            </div>

            <div className="p-2.5 rounded-lg bg-[#0c1222] border border-slate-800 text-slate-300">
              <span className="font-bold text-cyan-300">بافتار زمان اجرا (Runtime Context): </span>
              اطلاعات تزریق‌شده به پنجره بافتار در لحظه استنتاج شامل دستور کاربر و داده‌های بازگشتی از ابزارها.
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>
              {activeTab === 'text-only'
                ? 'وضعیت: تولید متن صرفاً بر پایه احتمالات آماری آموزش'
                : 'وضعیت: اجرای ابزار تحت مدیریت برنامه میزبان و تزریق به بافتار زمان اجرا'}
            </span>
            <Badge variant={activeTab === 'text-only' ? 'outline' : 'success'} size="sm">
              {activeTab === 'text-only' ? 'پاسخ فاقد ابزار' : 'اقدام ابزارمحور (Tool-mediated)'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Slide Presenter Notes (Collapsible) */}
      <SlidePresenterNotes note={CHAPTER_01_PRESENTER_NOTES[1]} />
    </div>
  );

  // ==========================================
  // SLIDE 3: The Core Educational Question & N×M
  // ==========================================
  const renderSlide3 = () => (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۱.۳ • نیاز به معماری استاندارد
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          پرسش اصلی ارائه: معماری اتصال چگونه باید باشد؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          اگر هر ارائه‌دهنده مدل و هر ابزار نرم‌افزاری بخواهند زبان خاص خود را بسازند، توسعه نرم‌افزار به اتصالات شکننده و پرهزینه تبدیل می‌شود.
        </p>
      </div>

      {/* The Central Question Banner */}
      <Card variant="glow" glowColor="cyan" className="p-6 sm:p-8 border-cyan-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 mx-auto flex items-center justify-center text-slate-900 shadow-xl shadow-cyan-500/20">
          <HelpCircle className="w-7 h-7 text-[#0B1020]" />
        </div>

        <blockquote className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed max-w-2xl mx-auto">
          «چگونه می‌توان مدل‌های زبانی را <span className="text-cyan-300">بدون به خطر انداختن امنیت</span> و <span className="text-indigo-300">بدون نوشتن کدهای اتصال اختصاصی N×M</span>، به صورت استاندارد، ایمن و قابل‌حمل به ابزارها و داده‌های جهان پیرامون متصل کرد؟»
        </blockquote>
      </Card>

      {/* N×M Complexity Clarification Banner */}
      <div className="p-4 rounded-xl bg-[#0c1322] border border-amber-500/30 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <Layers className="w-4 h-4 text-amber-400 shrink-0" />
          <span>توضیح تحلیلی چالش پیچیدگی N×M:</span>
        </div>
        <p className="leading-relaxed">
          این نمودار یک مدل ساده‌شده از وضعیت اتصال‌های اختصاصی است؛ در آن، با افزایش تعداد برنامه‌ها و سرویس‌ها، تعداد مسیرهای یکپارچه‌سازی و هزینه نگهداری می‌تواند افزایش یابد. استانداردسازی، این رشد پیچیدگی را مهار می‌کند.
        </p>
      </div>

      {/* Section Sub-heading for Desirable Criteria */}
      <div className="text-center pt-2">
        <h4 className="text-sm sm:text-base font-bold text-slate-200">
          ویژگی‌های مورد انتظار از یک استاندارد ارتباطی مناسب
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          معیارهای عمومی یک چارچوب استاندارد پیش از ورود به جزئیات پروتکل
        </p>
      </div>

      {/* 3 Standardization Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400 w-fit">
            <Boxes className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-slate-100 text-sm">۱. عدم وابستگی به مدل (Model Agnostic)</h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            قابلیت کارکرد مستقل با انواع مدل‌های زبانی بدون نیاز به بازنویسی لاجیک اتصال ابزار برای هر مدل یا ارائه‌دهنده.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-slate-100 text-sm">۲. مرزهای مشخص امنیتی (Security Boundaries)</h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            ایزوله‌سازی دسترسی‌ها، کنترل اختیارات توسط برنامه میزبان و نیازمندی به تأیید کاربر انسانی برای اقدامات حساس.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 w-fit">
            <Code2 className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-slate-100 text-sm">۳. پروتکل باز و استاندارد (Open Standard Protocol)</h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            بهره‌گیری از استانداردهای باز و قابل توسعه مانند قالب ساختاریافته پیام‌ها و فرمت‌های سبک تبادل داده.
          </p>
        </div>
      </div>

      {/* Slide Presenter Notes (Collapsible) */}
      <SlidePresenterNotes note={CHAPTER_01_PRESENTER_NOTES[2]} />
    </div>
  );

  // ==========================================
  // SLIDE 4: Interactive Quiz & Chapter 02 Transition
  // ==========================================
  const renderSlide4 = () => {
    const quiz = CHAPTER_01_QUIZ;

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="cyan" size="md">
            بخش ۱.۴ • سنجش تعاملی درک مفهوم
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            آزمونک کوتاه تشخیصی
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            برای سنجش درک شهودی از مرزهای دسترسی مدل‌های زبانی، گزینه صحیح را انتخاب کنید.
          </p>
        </div>

        <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25">
          {/* Question */}
          <div className="mb-6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0">
              ؟
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
              {quiz.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const letter = ['الف', 'ب', 'ج', 'د'][idx];

              let cardStyle =
                'bg-[#0B1020]/70 border-slate-800 hover:border-indigo-500/50 hover:bg-[#121B2F]';

              if (hasSubmittedQuiz) {
                if (option.isCorrect) {
                  cardStyle =
                    'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/40 text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  cardStyle =
                    'bg-rose-950/40 border-rose-500/60 text-rose-200';
                } else {
                  cardStyle = 'bg-[#0B1020]/40 border-slate-900 opacity-50';
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectQuizOption(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${cardStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800/80 text-slate-300 flex items-center justify-center text-xs font-bold">
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-200">
                        {option.text}
                      </span>
                    </div>

                    {hasSubmittedQuiz && (
                      <div>
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Immediate Explanation */}
                  {hasSubmittedQuiz && (isSelected || option.isCorrect) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`text-xs mt-2 pt-2 border-t font-sans leading-relaxed ${
                        option.isCorrect
                          ? 'border-emerald-800/40 text-emerald-300'
                          : 'border-rose-900/40 text-rose-300'
                      }`}
                    >
                      {option.explanation}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Educational Takeaway & Reset */}
          {hasSubmittedQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="text-xs text-slate-300 leading-relaxed bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-500/20 w-full sm:flex-1">
                <span className="font-bold text-cyan-300">💡 نکته کلیدی آموزشی: </span>
                {quiz.educationalTakeaway}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetQuiz}
                iconStart={<RefreshCw className="w-3.5 h-3.5" />}
              >
                پاسخ مجدد
              </Button>
            </motion.div>
          )}
        </Card>

        {/* Chapter 02 Transition CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-[#121B30] to-cyan-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Badge variant="cyan" size="sm">
                گام بعدی
              </Badge>
              <span className="text-xs text-cyan-300 font-mono" dir="ltr">
                Chapter 02 Preview
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              ادامه مسیر: مدل‌های زبانی و ابزارهای خارجی (فصل دوم)
            </h4>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              بررسی عمیق محدودیت‌های ذاتی LLMها، تاریخچه تکامل اتصال به ابزارها و معماری مدرن Function Calling.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleNavigateToChapter02}
            iconEnd={<ArrowLeft className="w-4 h-4" />}
            className="shrink-0 text-xs sm:text-sm shadow-lg shadow-indigo-600/30"
          >
            ورود به فصل دوم
          </Button>
        </div>

        {/* Slide Presenter Notes (Collapsible) */}
        <SlidePresenterNotes note={CHAPTER_01_PRESENTER_NOTES[3]} />
      </div>
    );
  };

  // If in Presentation Mode, render only the active slide
  if (mode === 'slides') {
    return (
      <div className="w-full flex items-center justify-center min-h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeSlideIndex === 0 && renderSlide1()}
            {activeSlideIndex === 1 && renderSlide2()}
            {activeSlideIndex === 2 && renderSlide3()}
            {activeSlideIndex === 3 && renderSlide4()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // If in Scroll Mode, render all sub-sections with smooth flow
  return (
    <div className="space-y-24">
      {renderSlide1()}
      {renderSlide2()}
      {renderSlide3()}
      {renderSlide4()}
    </div>
  );
}
