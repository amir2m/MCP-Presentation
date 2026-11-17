'use client';

import React from 'react';
import { Database, Lock, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_02_PRESENTER_NOTES } from './presenterNotes';

export function KnowledgeBoundaryDiagram() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۲.۲ • مرز دانشی مدل
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          دانستن سؤال، به معنی دسترسی به داده نیست
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مدل زبان فارسی و معنای «موجودی انبار» را به زیبایی متوجه می‌شود؛ اما درک معنایی هرگز به معنی دسترسی به سیستم انبارداری شرکت شما نیست.
        </p>
      </div>

      {/* Model Knowledge vs External Data Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Card 1: Model Knowledge */}
        <Card variant="translucent" className="p-6 border-indigo-500/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 rounded-lg">
                دانش زمان آموزش (Training Knowledge)
              </span>
              <span className="text-xs font-mono text-slate-500" dir="ltr">Static Weights</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">
              الگوهای آماری ذخیره‌شده در زمان آموزش
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              اطلاعاتی که در وزن‌ها و پارامترهای آماری مدل در طول آموزش کدگذاری شده و دارای مرز زمانی مشخص (<span className="font-mono text-cyan-300" dir="ltr">Knowledge Cutoff</span>) است.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#0B1020]/80 border border-slate-800 text-xs space-y-1.5 font-mono text-slate-400" dir="ltr">
              <div className="text-indigo-400">✓ Understands grammar & semantics</div>
              <div className="text-indigo-400">✓ General encyclopedic knowledge</div>
              <div className="text-rose-400">× No real-time updates in weights</div>
              <div className="text-rose-400">× Zero private enterprise visibility</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>پایه استدلال، خلاصه‌سازی و تحلیل عمومی</span>
          </div>
        </Card>

        {/* Card 2: Runtime Context */}
        <Card variant="translucent" className="p-6 border-cyan-500/25 flex flex-col justify-between bg-gradient-to-br from-[#141C2E] to-[#102236]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-lg">
                بافتار زمان اجرا (Runtime Context)
              </span>
              <span className="text-xs font-mono text-slate-500" dir="ltr">Injected In-Context</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">
              داده‌های پویا و نتایج ابزارها در لحظه استنتاج
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              اطلاعات ورودی در پنجره زمینه شامل پرامپت کاربر، تاریخچه گفتگو و خروجی ابزارها که بدون تغییر وزن‌های مدل، در لحظه به بافتار تزریق می‌شوند.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#0B1020]/80 border border-cyan-500/20 text-xs space-y-1.5 font-mono text-slate-400" dir="ltr">
              <div className="text-cyan-400">✓ Injected via Host application</div>
              <div className="text-cyan-400">✓ Live inventory & database records</div>
              <div className="text-cyan-400">✓ Ephemeral: does not alter trained model</div>
              <div className="text-amber-400">! Requires Host orchestration & tools</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-cyan-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>پل ارتباطی: تزریق خروجی ابزارهای مجاز به بافتار جاری</span>
          </div>
        </Card>

      </div>

      {/* The Central Warehouse Disconnection & Hallucination Scenario */}
      <Card variant="solid" className="p-6 sm:p-8 border-rose-500/30 bg-[#121726]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h4 className="font-bold text-white text-base">
              سناریوی نمونه: پدیده توهم (<span className="font-mono text-rose-400" dir="ltr">Hallucination</span>)
            </h4>
          </div>
          <Badge variant="outline" size="sm" className="text-rose-300 border-rose-500/30">
            شکست پیوند با واقعیت
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* User Request */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-indigo-400">پرسش کاربر:</span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              «موجودی محصول <span className="font-mono text-cyan-300" dir="ltr">PLC-204</span> در انبار شرکت چقدر است؟»
            </p>
          </div>

          {/* Impermeable Barrier */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-rose-900/60 text-rose-300 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-rose-300">
              دسترسی مستقیم به پایگاه داده وجود ندارد
            </span>
            <span className="text-[10px] text-slate-400 leading-snug">
              هسته مدل فاقد سوکت شبکه و دسترسی سیستمی است؛ ارتباط منحصراً از طریق برنامه میزبان و ابزار مجاز امکان‌پذیر است.
            </span>
          </div>

          {/* Model Guess / Hallucination */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-rose-400">پاسخ تولیدشده مدل:</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
                پاسخ تولیدشده و تأییدنشده
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              «موجودی این قطعه در انبار <span className="text-rose-400 text-base font-bold">۴۵ عدد</span> است.»
            </div>
            <p className="text-[11px] text-rose-200/80 leading-relaxed pt-1">
              ⚠️ این عدد ۴۵ کاملاً بر اساس احتمال آماری ساخته شده و در انبار واقعی ممکن است ۱۲ عدد یا اصلاً ناموجود باشد!
            </p>
          </div>

        </div>

        {/* Scientific Nuance Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>نکته علمی:</strong> توهم (<span className="font-mono text-cyan-300" dir="ltr">Hallucination</span>) زمانی رخ می‌دهد که مدل اطلاعاتی کاملاً باورپذیر و با لحنی مطمئن اما فاقد پشتوانه واقعی تولید می‌کند. اتصال به ابزارها این چالش را در بازیابی اطلاعات لحظه‌ای به شدت کاهش می‌دهد، اما به تنهایی سلامت و صحت پاسخ را تضمین نمی‌کند؛ چرا که ابزار ممکن است خطا دهد، پاسخ ناقص یا کهنه برگرداند یا مدل نتیجه ابزار را اشتباه تفسیر کند.
          </span>
        </div>
      </Card>

      {/* Slide Presenter Notes (Collapsible) */}
      <SlidePresenterNotes note={CHAPTER_02_PRESENTER_NOTES[1]} />
    </div>
  );
}
