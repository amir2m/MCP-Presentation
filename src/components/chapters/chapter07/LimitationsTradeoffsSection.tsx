'use client';

import React from 'react';
import {
  Sparkles,
  XCircle,
  Gauge,
  Flame,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_07_PRESENTER_NOTES } from './presenterNotes';
import { ANTI_PATTERNS } from './mockData';

export function LimitationsTradeoffsSection() {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-5-limitations">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۵ • محدودیت‌ها و پادالگوها
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          آنچه <span className="font-mono text-cyan-300" dir="ltr">MCP</span> حل نمی‌کند: هزینه‌های مهندسی و پادالگوها
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          یک استاندارد مهندسی معتبر با شناخت دقیق نقاط ضعف و مرزهای عدم کاربردش سنجیده می‌شود؛ نه با ادعای فراگیر بودن برای هر سناریو و هر سیستم نرم‌افزاری.
        </p>
      </div>

      {/* 2. Qualitative Latency & Operational Overhead Breakdown */}
      <Card variant="translucent" className="p-5 border-amber-500/30 bg-[#0E1526]/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base">
            <Gauge className="w-5 h-5" />
            <span>تحلیل کیفی زنجیره تأخیر در ارتباطات MCP (Latency Breakdown):</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400" dir="ltr">
            Multi-stage Roundtrip
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-mono">1. LLM Inference</div>
            <div className="font-bold text-white">استنتاج مدل زبانی</div>
            <div className="text-[10px] text-slate-400">تولید ساختار JSON ابزار</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-mono">2. Serialization</div>
            <div className="font-bold text-white">سریال‌سازی JSON</div>
            <div className="text-[10px] text-slate-400">تبدیل به پیام JSON-RPC</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-mono">3. Transport Wire</div>
            <div className="font-bold text-white">ترابری IPC / شبکه</div>
            <div className="text-[10px] text-slate-400">STDIO یا HTTP Stream</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-mono">4. Server Execution</div>
            <div className="font-bold text-white">اجرا در سرور منبع</div>
            <div className="text-[10px] text-slate-400">کوئری به سیستم زیرین</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-mono">5. Host Orchestration</div>
            <div className="font-bold text-white">ارکستراسیون هاست</div>
            <div className="text-[10px] text-slate-400">گیت امنیتی و تزریق کانتکست</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
          <strong className="text-amber-300">نکته مهندسی:</strong> وجود این زنجیره چندمرحله‌ای باعث می‌شود که MCP برای سیستم‌های فوق‌سریع و زمان‌بحرانی (زیر میلی‌ثانیه یا High-Frequency Trading) کاملاً نامناسب باشد.
        </p>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-1">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ملاحظه علمی پیرامون سربار درخواست در ترابری HTTP (مشخصات رسمی ۲۰۲۶-۰۷-۲۸):</span>
          </div>
          <p>
            مدیریت بدون‌حالت (Stateless) درخواست‌های HTTP از لایه احراز هویت و نشست‌های پروتکلی تفکیک‌پذیر است؛ JSON-RPC 2.0 خود الزام مستقلی برای تکرار شناسه‌ها یا توکن‌ها در هر درخواست تحمیل نمی‌کند. سربار ارتباطی به طور کیفی ناشی از فراداده‌های همراه، پردازش سریال‌سازی و تأخیر انتقال شبکه است (استاندارد RFC 9457 صرفاً فرمت استاندارد نمایش خطاهای Problem Details است، نه پروتکل نشست MCP).
          </p>
        </div>
      </Card>

      {/* 3. Anti-Patterns Grid: When NOT to use MCP */}
      <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Flame className="w-5 h-5 text-rose-400" />
          <h4 className="text-sm sm:text-base font-bold text-white">
            ماتریس پادالگوها (Anti-Patterns): چه زمانی نباید از MCP استفاده کنیم؟
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANTI_PATTERNS.map((pattern) => (
            <div
              key={pattern.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{pattern.scenarioPersian}</span>
              </div>

              <div className="text-slate-300 leading-relaxed">
                <strong className="text-slate-200">چرا نامناسب است:</strong> {pattern.whyAvoidPersian}
              </div>

              <div className="pt-1.5 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]">
                <div className="text-emerald-300">
                  <strong>جایگزین بهینه:</strong> {pattern.betterAlternativePersian}
                </div>
                <div className="text-slate-400">
                  <strong>هزینه تحمیل MCP:</strong> {pattern.riskOfUsingMcpPersian}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_07_PRESENTER_NOTES[4]} />
    </div>
  );
}
