'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CHAPTER_01_QUIZ } from '@/lib/presentation';

interface Chapter01Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
}

export function Chapter01({
  mode = 'scroll',
  activeSlideIndex = 0,
}: Chapter01Props) {
  // State for interactive comparison simulation
  const [activeTab, setActiveTab] = useState<'text-only' | 'mcp-action'>('text-only');
  const [isSimulating, setIsSimulating] = useState(false);

  // State for quiz
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);

  const handleSimulate = (type: 'text-only' | 'mcp-action') => {
    setActiveTab(type);
    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
    }, 1800);
  };

  const handleSelectQuizOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setHasSubmittedQuiz(true);
  };

  const handleResetQuiz = () => {
    setSelectedOptionId(null);
    setHasSubmittedQuiz(false);
  };

  // ==========================================
  // SLIDE 1: The Isolated Room & Transition
  // ==========================================
  const renderSlide1 = () => (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۱.۱ • اتاق ایزوله هوش مصنوعی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          گذار از تولید متن به تعامل با ابزارها
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مدل‌های زبانی بزرگ (<span className="font-mono" dir="ltr">LLMs</span>) شگفت‌انگیزند، اما به صورت پیش‌فرض درون یک «اتاق تاریک و بسته» زندگی می‌کنند.
        </p>
      </div>

      {/* Visual Metaphor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Isolated LLM Card */}
        <Card variant="translucent" className="p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                ماهیت پیش‌فرض مدل‌ها
              </span>
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>

            <h4 className="text-lg font-bold text-slate-100 mb-2">
              ۱. موتور پیش‌بینی واژگان (<span className="font-mono text-cyan-300" dir="ltr">Next-Token Predictor</span>)
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
              مدل زبانی بر اساس الگوهای آماری میلیاردی وزن‌ها، تنها به این پرسش پاسخ می‌دهد:{' '}
              <span className="text-indigo-300 font-semibold">«محتمل‌ترین واژه بعدی برای تکمیل این متن چیست؟»</span>
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#0B1020]/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1" dir="ltr">
              <div className="text-slate-500">{'// Model Internal State:'}</div>
              <div className="text-rose-400">× No active network socket</div>
              <div className="text-rose-400">× No file system access</div>
              <div className="text-rose-400">× Knowledge cut-off barrier</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>نتیجه: عدم توانایی در خواندن یا تغییر دنیای واقعی</span>
          </div>
        </Card>

        {/* The Need for Action Card */}
        <Card variant="translucent" className="p-6 border-cyan-500/25 flex flex-col justify-between bg-gradient-to-br from-[#141C2E] to-[#122238]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                هدف غایی مهندسی هوش مصنوعی
              </span>
              <Workflow className="w-6 h-6 text-cyan-400" />
            </div>

            <h4 className="text-lg font-bold text-slate-100 mb-2">
              ۲. هوش مصنوعی عامل‌محور (<span className="font-mono text-cyan-300" dir="ltr">Agentic Action</span>)
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              کاربران تنها یک چت‌بات متنی نمی‌خواهند؛ آنها سیستمی می‌خواهند که بتواند در گیت‌هاب پول‌ریکوئست بسازد، در دیتابیس تراکنش مالی ثبت کند و فایل‌های پروژه را ویرایش نماید.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#0B1020]/80 border border-cyan-500/20 text-xs font-mono text-slate-400 space-y-1" dir="ltr">
              <div className="text-slate-500">{'// Desired Agent Capabilities:'}</div>
              <div className="text-emerald-400">✓ Query live PostgreSQL databases</div>
              <div className="text-emerald-400">✓ Safely edit workspace files</div>
              <div className="text-emerald-400">✓ Trigger cloud pipelines & APIs</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>پل ارتباطی مورد نیاز: پروتکل استاندارد اتصال به ابزار (MCP)</span>
          </div>
        </Card>
      </div>
    </div>
  );

  // ==========================================
  // SLIDE 2: Visual Comparison: Text vs Action
  // ==========================================
  const renderSlide2 = () => (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="cyan" size="md">
          بخش ۱.۲ • مقایسه زنده
        </Badge>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          مقایسه تصویری: حدس زدن متن در برابر اقدام در محیط واقعی
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          سناریو: کاربر درخواست بررسی موجودی قطعه سرور و ثبت سفارش فوری دارد.
        </p>
      </div>

      {/* Simulator Switcher Controls */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => handleSimulate('text-only')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'text-only'
              ? 'bg-rose-950/60 text-rose-300 border border-rose-500/50 shadow-lg shadow-rose-950/40'
              : 'bg-[#141C2E] text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>سناریوی اول: مدل فقط متنی (Text-Only)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSimulate('mcp-action')}
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
      <Card variant="translucent" className="p-6 border-slate-700/60 min-h-[360px] flex flex-col justify-between">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 mr-2" dir="ltr">
              simulation-{activeTab}.log
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {isSimulating ? 'در حال اجرای شبیه‌سازی...' : 'آماده بررسی'}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleSimulate(activeTab)}
              iconStart={<RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />}
            >
              اجرای مجدد شبیه‌سازی
            </Button>
          </div>
        </div>

        {/* Dynamic Simulation Body */}
        <div className="py-6 space-y-4">
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
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>وضعیت مدل: بدون دسترسی به ابزار یا دیتابیس</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  مدل صرفاً واژگان را پیش‌بینی می‌کند: «بله، موجودی قطعه انبار حدوداً ۴۵ عدد است و فاکتور شماره ۱۲۳۴۵ برای شما ثبت گردید!»
                </p>
                <div className="pt-2 border-t border-rose-900/40 text-rose-300 text-[11px] font-sans">
                  ⚠️ <strong>تحلیل فنی:</strong> هیچ اتصال سوکت یا کوئری SQL رخ نداد؛ این شماره فاکتور کاملاً خیالی (Hallucination) است و در دیتابیس سازمان هیچ سفارشی ذخیره نشد!
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-cyan-500/30 text-xs font-mono space-y-2" dir="ltr">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span>[MCP Client] Executing Tool Call:</span>
                  <span className="text-[10px] text-emerald-400">JSON-RPC 2.0</span>
                </div>
                <div className="bg-[#0B1020] p-2.5 rounded-lg border border-slate-800 text-slate-300 text-[11px]">
                  <code>&gt; tools/call: query_inventory({`{ sku: "NVMe-4TB" }`})</code>
                  <br />
                  <span className="text-emerald-400">&lt; response: {`{ in_stock: true, count: 6, warehouse: "Tehran-Central" }`}</span>
                </div>
                <div className="bg-[#0B1020] p-2.5 rounded-lg border border-slate-800 text-slate-300 text-[11px]">
                  <code>&gt; tools/call: reserve_order({`{ sku: "NVMe-4TB", qty: 1 }`})</code>
                  <br />
                  <span className="text-cyan-300">&lt; response: {`{ status: "CONFIRMED", invoice_id: "INV-2026-981" }`}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-200">
                <span className="font-bold text-emerald-300">پاسخ مدل به کاربر:</span> «قطعه در انبار مرکزی تهران ۶ عدد موجود است. فاکتور با شماره رسمی <span className="font-mono text-cyan-300" dir="ltr">INV-2026-981</span> در سامانه ERP با موفقیت ثبت و رزرو شد.»
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary Comparison */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            {activeTab === 'text-only'
              ? 'نتیجه: پیش‌بینی بدون اتصال = غیرقابل اتکا در سامانه‌های تجاری'
              : 'نتیجه: پروتکل استاندارد ابزار = داده قطعی، تراکنش امن و اتصال معتبر'}
          </span>
          <Badge variant={activeTab === 'text-only' ? 'outline' : 'success'} size="sm">
            {activeTab === 'text-only' ? 'توهم متنی' : 'عملیات معتبر (Grounded)'}
          </Badge>
        </div>
      </Card>
    </div>
  );

  // ==========================================
  // SLIDE 3: The Core Educational Question
  // ==========================================
  const renderSlide3 = () => (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۱.۳ • چالش بنیادین مهندسی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          پرسش اصلی ارائه: معماری اتصال چگونه باید باشد؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          اگر هر ارائه‌دهنده مدل و هر ابزار نرم‌افزاری بخواهند زبان خاص خود را بسازند، جهان نرم‌افزار غرق در هرج‌ومرج می‌شود.
        </p>
      </div>

      {/* The Central Question Banner */}
      <Card variant="glow" glowColor="cyan" className="p-8 border-cyan-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 mx-auto flex items-center justify-center text-slate-900 shadow-xl shadow-cyan-500/20">
          <HelpCircle className="w-7 h-7 text-[#0B1020]" />
        </div>

        <blockquote className="text-lg sm:text-2xl font-bold text-slate-100 leading-relaxed max-w-2xl mx-auto">
          «چگونه می‌توان مدل‌های زبانی را <span className="text-cyan-300">بدون به خطر انداختن امنیت</span> و <span className="text-indigo-300">بدون نوشتن کدهای اتصال اختصاصی N×M</span>، به صورت استاندارد، ایمن و قابل‌حمل به ابزارها و داده‌های جهان پیرامون متصل کرد؟»
        </blockquote>
      </Card>

      {/* 3 Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400 w-fit">
            <Boxes className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">۱. عدم وابستگی به مدل (Model Agnostic)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ابزاری که برای یک مدل ساخته می‌شود باید بدون تغییر با مدل‌های دیگر (Claude، GPT، Gemini و مدل‌های متن‌باز محلی) کار کند.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">۲. امنیت و ایزوله‌سازی (Security Boundaries)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            مدل نباید دسترسی آزاد و نامحدود به سیستم عامل پیدا کند؛ هر ابزار نیازمند مرزهای دسترسی مشخص و تایید کاربر انسانی است.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-right space-y-2">
          <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 w-fit">
            <Code2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">۳. استاندارد باز ارتباطی (Open Protocol)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            پروتکلی سبک، شفاف و مبتنی بر استانداردهای پذیرفته‌شده صنعت مانند <span className="font-mono text-cyan-300" dir="ltr">JSON-RPC 2.0</span>.
          </p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // SLIDE 4: Interactive Concept Quiz
  // ==========================================
  const renderSlide4 = () => {
    const quiz = CHAPTER_01_QUIZ;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="cyan" size="md">
            بخش ۱.۴ • سنجش تعاملی درک مفهوم
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            آزمونک کوتاه تشخیصی
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            برای سنجش درک شهودی از محدودیت مدل‌های زبانی، گزینه صحیح را انتخاب کنید.
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
