'use client';

import React from 'react';
import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Zap,
  Network,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_06_PRESENTER_NOTES } from './presenterNotes';

interface DecisionFrameworkSectionProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function DecisionFrameworkSection({ onSelectChapter }: DecisionFrameworkSectionProps) {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-6-decision-framework">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۶ • راهنمای تصمیم‌گیری مهندسی
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          ماتریس انتخاب: چه زمانی <span className="font-mono text-emerald-300" dir="ltr">Direct API</span> و چه زمانی{' '}
          <span className="font-mono text-cyan-300" dir="ltr">MCP</span>؟
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          در مهندسی نرم‌افزار، هیچ راه‌حلی پاسخ مطلق تمام مسائل نیست. این ماتریس به شما کمک می‌کند با معیارهای عینی و فنی، معماری بهینه پروژه خود را برگزینید.
        </p>
      </div>

      {/* 2. Side-by-Side Architectural Decision Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: When Direct API is better */}
        <Card variant="solid" className="p-5 sm:p-6 border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
              <Zap className="w-5 h-5" />
              <span>چه زمانی اتصال مستقیم API بهتر است؟</span>
            </div>
            <Badge variant="success" size="sm">
              Direct API Fit
            </Badge>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>تک‌برنامه و دامنه محدود:</strong> هنگامی که تنها یک اسکریپت یا برنامه هوش مصنوعی مشخص به یک وب‌سرویس اختصاصی متصل می‌شود.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>پروژه‌های سبک یا آزمایشی:</strong> زمانی که پروژه موقتی است و ساخت و نگهداری سرور MCP سربار مهندسی غیرضروری ایجاد می‌کند.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>حساسیت میلی‌ثانیه‌ای شدید:</strong> هنگامی که چند میلی‌ثانیه تأخیر اضافی ناشی از لایه سریال‌سازی پروتکل در سیستم‌های بلادرنگ قابل پذیرش نیست.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>عدم نیاز به اشتراک‌گذاری:</strong> زمانی که هیچ برنامه دیگری در سازمان قرار نیست از این قابلیت‌ها استفاده کند.
              </span>
            </li>
          </ul>
        </Card>

        {/* Column 2: When MCP provides decisive value */}
        <Card variant="solid" className="p-5 sm:p-6 border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
              <Network className="w-5 h-5" />
              <span>چه زمانی استفاده از MCP ارزش افزوده قطعی دارد؟</span>
            </div>
            <Badge variant="cyan" size="sm">
              MCP Standard Fit
            </Badge>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>اکوسیستم چندکلاینتی:</strong> زمانی که چند ابزار سازگار (محیط IDE، چت‌بات، ایجنت‌های اتوماسیون) باید به سرویس‌های سازمانی متصل شوند.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>کشف دینامیک و استاندارد:</strong> هنگامی که کاتالوگ ابزارها، منابع و پرامپت‌ها باید به صورت خودکار توسط کلاینت‌ها شناسایی شوند.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>ترکیب‌پذیری چندسروری:</strong> زمانی که برنامه میزبان باید هم‌زمان به چندین منبع داده و ابزار از تیم‌های مختلف متصل گردد.
              </span>
            </li>

            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>تفکیک وظایف تیمی:</strong> تیم هوش مصنوعی از کدهای درایور خلاص شده و تیم بک‌اند سرور MCP را متناسب با APIها نگهداری می‌کند.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* 3. Golden Takeaway Box */}
      <Card variant="solid" className="p-6 border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0B1020] to-cyan-950/40 space-y-3 text-center">
        <span className="text-xs font-mono text-cyan-400/90 block" dir="ltr">
          Chapter 06 Architectural Synthesis
        </span>
        <h4 className="text-base sm:text-xl font-black text-white leading-relaxed">
          «<span className="text-emerald-400">API</span> سرویس را عرضه می‌کند؛ اما{' '}
          <span className="text-cyan-300">MCP</span> نحوه اتصال استاندارد برنامه‌های هوش مصنوعی به قابلیت‌های سرور را فرمول‌بندی می‌نماید.»
        </h4>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
          این دو فناوری نه تنها در تضاد نیستند، بلکه مکمل یکدیگرند: وب‌سرویس‌های سازمانی به قوت خود باقی می‌مانند و سرورهای MCP درگاه ورود آن‌ها به جهان هوش مصنوعی هستند.
        </p>

        {/* Final CTA Button to Chapter 07 */}
        <div className="pt-4 flex items-center justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onSelectChapter?.(7)}
            iconEnd={<ArrowLeft className="w-4 h-4" />}
            className="text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/20"
          >
            ورود به فصل هفتم: قابلیت‌های سه‌گانه سرور MCP (منابع، پرامپت‌ها و ابزارها)
          </Button>
        </div>
      </Card>

      {/* 4. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_06_PRESENTER_NOTES[5]} />
    </div>
  );
}
