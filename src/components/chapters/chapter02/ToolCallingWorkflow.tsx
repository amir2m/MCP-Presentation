'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  Bot,
  ShieldCheck,
  Database,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Terminal,
  CheckCircle2,
  Server,
  User,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ToolCallingWorkflow() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      actor: 'کاربر (User)',
      icon: <User className="w-4 h-4 text-slate-300" />,
      title: 'ارسال درخواست توسط کاربر',
      desc: 'کاربر سوال می‌پرسد: «موجودی محصول PLC-204 در انبار چقدر است؟»',
      code: 'Prompt: "موجودی محصول PLC-204 در انبار چقدر است؟"',
      activeNode: 'user',
    },
    {
      step: 2,
      actor: 'مدل زبانی (LLM)',
      icon: <Bot className="w-4 h-4 text-indigo-400" />,
      title: 'تشخیص نیاز به داده خارجی و تولید درخواست ابزار',
      desc: 'مدل می‌داند که موجودی انبار را در حافظه ندارد؛ پس درخواست فراخوانی تابع (Tool Call) تولید می‌کند.',
      code: 'Action: call_tool("get_inventory", { "product_id": "PLC-204" })',
      activeNode: 'llm',
    },
    {
      step: 3,
      actor: 'برنامه میزبان (Host)',
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      title: 'دریافت درخواست ساختاریافته توسط Host',
      desc: 'برنامه میزبان (مثل Claude Desktop، واسط چت یا سیستم نرم‌افزاری) پیام خروجی مدل را تحویل می‌گیرد.',
      code: 'Host received: ToolCallRequest { name: "get_inventory", args: { ... } }',
      activeNode: 'host',
    },
    {
      step: 4,
      actor: 'برنامه میزبان (Host)',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      title: 'اعتبارسنجی مجوزها و بررسی آرگومان‌ها',
      desc: 'میزبان بررسی می‌کند: آیا مدل اجازه دسترسی به دیتابیس انبار را دارد؟ آیا ساختار product_id معتبر است؟',
      code: 'Security Check: Permission GRANTED (Scope: inventory:read)',
      activeNode: 'host',
    },
    {
      step: 5,
      actor: 'ابزار خارجی (External Tool)',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      title: 'اجرای استعلام توسط ابزار بر روی پایگاه داده',
      desc: 'ابزار فراخوانی‌شده، کوئری SQL یا درخواست API را به پایگاه داده انبار ارسال می‌نماید.',
      code: 'SQL: SELECT quantity FROM inventory WHERE sku = "PLC-204";',
      activeNode: 'db',
    },
    {
      step: 6,
      actor: 'ابزار خارجی (External Tool)',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      title: 'بازگشت نتیجه ساختاریافته به برنامه میزبان',
      desc: 'پایگاه داده نتیجه را به صورت ساختاریافته در قالب JSON به میزبان بازمی‌گرداند.',
      code: 'Result: { "product_id": "PLC-204", "available_quantity": 12 }',
      activeNode: 'db',
    },
    {
      step: 7,
      actor: 'برنامه میزبان (Host)',
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      title: 'تحویل داده به مدل زبانی به عنوان کانتکست جدید',
      desc: 'میزبان نتیجه ابزار را در قالب پیام Role: Tool به مدل بازمی‌گرداند تا مدل نتیجه را به زبان طبیعی تدوین کند.',
      code: 'Context Append: ToolResult(available_quantity=12)',
      activeNode: 'host',
    },
    {
      step: 8,
      actor: 'مدل زبانی (LLM)',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      title: 'تولید پاسخ نهایی مستند به زبان طبیعی',
      desc: 'مدل با استناد به مقدار ۱۲ پاسخ می‌دهد: «موجودی فعلی محصول PLC-204 برابر با ۱۲ عدد است.»',
      code: 'Final Answer: «موجودی فعلی محصول PLC-204 برابر با ۱۲ عدد است.»',
      activeNode: 'llm',
    },
  ];

  const activeData = steps[currentStep];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۲.۳ • چرخه فراخوانی ابزار
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          وقتی مدل درخواست استفاده از ابزار می‌دهد
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          فراخوانی ابزار (<span className="font-mono text-cyan-300" dir="ltr">Tool Calling</span>) قابلیتی است که مدل از طریق آن به جای حدس زدن، درخواست اجرای یک تابع مشخص را برای سیستم میزبان (<span className="font-mono text-indigo-300" dir="ltr">Host</span>) صادر می‌کند.
        </p>
      </div>

      {/* Interactive 8-Step Lifecycle Canvas */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm">
              چرخه گام‌به‌گام Tool Calling (مرحله {currentStep + 1} از ۸)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="p-1.5 rounded-lg bg-[#141C2E] border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="مرحله قبل"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="text-xs font-mono text-slate-400 px-2">
              Step {currentStep + 1}/8
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1}
              className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed"
              title="مرحله بعد"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep(0)}
              className="text-xs mr-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* 2D Actor Nodes Topology */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Node 1: User */}
          <div className={`p-4 rounded-xl border text-center transition-all ${
            activeData.activeNode === 'user'
              ? 'bg-indigo-950/60 border-cyan-400 shadow-lg shadow-indigo-950/40 ring-1 ring-cyan-400/30'
              : 'bg-[#0B1020]/60 border-slate-800 text-slate-400 opacity-60'
          }`}>
            <User className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="text-xs font-bold text-slate-200 block">کاربر</span>
            <span className="text-[10px] text-slate-400">User Prompt</span>
          </div>

          {/* Node 2: LLM */}
          <div className={`p-4 rounded-xl border text-center transition-all ${
            activeData.activeNode === 'llm'
              ? 'bg-indigo-950/80 border-indigo-400 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/40'
              : 'bg-[#0B1020]/60 border-slate-800 text-slate-400 opacity-60'
          }`}>
            <Bot className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
            <span className="text-xs font-bold text-slate-200 block">مدل زبانی (LLM)</span>
            <span className="text-[10px] text-indigo-300">درخواست‌کننده ابزار</span>
          </div>

          {/* Node 3: Host (Emphasized) */}
          <div className={`p-4 rounded-xl border text-center transition-all ${
            activeData.activeNode === 'host'
              ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-400/50'
              : 'bg-[#0B1020]/80 border-cyan-500/20 text-slate-400'
          }`}>
            <Server className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-200 block">برنامه میزبان (Host)</span>
            <span className="text-[10px] text-emerald-300 font-bold">مجری و ناظر امنیتی</span>
          </div>

          {/* Node 4: External Database / Tool */}
          <div className={`p-4 rounded-xl border text-center transition-all ${
            activeData.activeNode === 'db'
              ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/30'
              : 'bg-[#0B1020]/60 border-slate-800 text-slate-400 opacity-60'
          }`}>
            <Database className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 block">دیتابیس / ابزار</span>
            <span className="text-[10px] text-cyan-400">سرویس داده ابزار</span>
          </div>

        </div>

        {/* Current Active Step Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-5 rounded-2xl bg-[#090E1A] border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 flex items-center justify-center font-mono text-xs font-bold">
                  {activeData.step}
                </span>
                <h5 className="font-bold text-white text-sm sm:text-base">
                  {activeData.title}
                </h5>
              </div>
              <Badge variant="cyan" size="sm">
                کنشگر: {activeData.actor}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeData.desc}
            </p>

            {/* Structured payload / Code Box */}
            <div className="p-3 rounded-xl bg-[#0B1020] border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2" dir="ltr">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="overflow-x-auto text-[11px] sm:text-xs text-cyan-200">
                {activeData.code}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Essential Scientific Highlights */}
        <div className="space-y-2.5 pt-2">
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-300">نقش محوری برنامه میزبان (Host): </strong>
            مدل زبانی هرگز دسترسی مستقیم به سیستم فایل یا دیتابیس ندارد؛ مدل صرفاً متن ساختاریافته درخواست ابزار را صادر می‌کند و این برنامه میزبان است که به عنوان ناظر امنیتی، مجوزها را اعتبارسنجی و ابزار را اجرا می‌نماید.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#0c1322] border border-slate-800 text-slate-300 leading-relaxed">
              <strong className="text-amber-400 block mb-1">شکست در اجرا و کیفیت داده:</strong>
              اجرای ابزار مصون از خطا یا شکست نیست؛ ممکن است به دلایلی مانند قطعی شبکه، خطای <span className="font-mono text-slate-400" dir="ltr">Timeout</span>، رد مجوزها یا پارامترهای نامعتبر با شکست مواجه شود. همچنین حتی در صورت اجرای موفق، ممکن است ابزار داده‌هایی ناقص یا کهنه (<span className="font-mono text-slate-400" dir="ltr">Stale Data</span>) بازگرداند.
            </div>

            <div className="p-3 rounded-xl bg-[#0c1322] border border-slate-800 text-slate-300 leading-relaxed">
              <strong className="text-emerald-400 block mb-1">عملیات خواندن، نوشتن و تراکنش‌ها:</strong>
              عملیات خواندن (<span className="font-mono text-slate-400" dir="ltr">Read</span>) برای دریافت داده انجام می‌شوند و معمولاً وضعیت اصلی سیستم را تغییر نمی‌دهند. عملیات نوشتن یا تغییر وضعیت (<span className="font-mono text-slate-400" dir="ltr">Write / Mutation</span>) داده‌ها یا وضعیت سیستم را تغییر می‌دهند. تراکنش (<span className="font-mono text-slate-400" dir="ltr">Transaction</span>) سازوکاری برای اجرای یک یا چند عملیات پایگاه داده با رعایت ویژگی‌هایی مانند اتمیک‌بودن و سازگاری است. اقدامات حساس ممکن است به تأیید مستقیم انسان (<span className="font-mono text-slate-400" dir="ltr">Human-in-the-loop</span>) نیاز داشته باشند.
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
}
