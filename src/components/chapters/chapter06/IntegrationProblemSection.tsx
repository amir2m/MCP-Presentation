'use client';

import React from 'react';
import {
  Copy,
  KeyRound,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_06_PRESENTER_NOTES } from './presenterNotes';
import { IntegrationMatrixDemo } from './IntegrationMatrixDemo';

export function IntegrationProblemSection() {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-3-integration-problem">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۳ • چالش مقیاس‌پذیری
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          مسئله اتصالات اختصاصی چندگانه: چالش مفهومی{' '}
          <span className="font-mono text-amber-300" dir="ltr">
            M × N
          </span>
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          هنگامی که برنامه‌های هوش مصنوعی متعدد در سازمان فعال می‌شوند، اتصال اختصاصی نقطه‌به‌نقطه (Ad-hoc) به سرویس‌های مختلف به آشفتگی و تکثیر تصاعدی کدهای چسباننده می‌انجامد.
        </p>
      </div>

      {/* 2. Interactive Integration Matrix Demo Widget */}
      <IntegrationMatrixDemo />

      {/* 3. Three Fundamental Pitfalls of Bespoke Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="solid" className="p-4 sm:p-5 border-amber-500/25 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
            <Copy className="w-4 h-4 shrink-0" />
            <span>۱. تکثیر کدهای چسباننده (Glue Code)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            هر برنامه میزبان باید مجدداً کدهای نگاشت پارامترها، سریال‌سازی HTTP، پارس کردن پاسخ‌ها و تبدیل خطاها را از ابتدا بازنویسی کند.
          </p>
        </Card>

        <Card variant="solid" className="p-4 sm:p-5 border-amber-500/25 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
            <KeyRound className="w-4 h-4 shrink-0" />
            <span>۲. پراکندگی احراز هویت و امنیت</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            مدیریت توکن‌ها، کلیدهای دسترسی API و سطوح مجوزدهی به صورت پراکنده در ده‌ها برنامه پخش شده و سطح آسیب‌پذیری سیستم را افزایش می‌دهد.
          </p>
        </Card>

        <Card variant="solid" className="p-4 sm:p-5 border-amber-500/25 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
            <Wrench className="w-4 h-4 shrink-0" />
            <span>۳. هزینه نگهداری تصاعدی</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            با یک تغییر کوچک در شمای یکی از وب‌سرویس‌ها، چندین تیم توسعه مختلف باید کدهای اتصال برنامه‌های هوش مصنوعی خود را هم‌زمان به‌روزرسانی کنند.
          </p>
        </Card>
      </div>

      {/* 4. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_06_PRESENTER_NOTES[2]} />
    </div>
  );
}
