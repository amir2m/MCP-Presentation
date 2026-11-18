'use client';

import React from 'react';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Network,
  Terminal,
  FileWarning,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_07_PRESENTER_NOTES } from './presenterNotes';

export function SecurityTrustSection() {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-3-security-trust">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۳ • معماری امنیت و اعتماد
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۵ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          معماری امنیت، مرزهای اعتماد و احراز هویت شبکه
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          پروتکل <span className="font-mono text-cyan-300" dir="ltr">MCP</span> یک استاندارد باز تبادل پیام است؛ نه تضمین‌کننده جادویی امنیت! ایمنی سیستم به پیاده‌سازی هاست، احراز هویت دقیق، مهار پرامپت و اعمال سندباکس وابسته است.
        </p>
      </div>

      {/* 2. Three Critical Threat Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Local STDIO Risks */}
        <Card variant="translucent" className="p-5 border-amber-500/30 bg-[#0E1526]/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Terminal className="w-4 h-4" />
            <span>۱. ملاحظات امنیتی سرور محلی (STDIO)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ترابری <span className="font-mono text-cyan-300" dir="ltr">STDIO</span> به خودی خود سندباکس سیستم‌عامل یا تضمین ایزولاسیون پردازه ارائه نمی‌دهد و سرور محلی تحت اختیارات و پیکربندی حساب کاربری سیستم‌عامل اجرا می‌شود. هاست یا محیط استقرار می‌توانند محدودیت‌های فایل، شبکه و کنترل‌های حداقل اختیارات را اعمال کنند؛ اجرای پردازه بدون سندباکس ریسک‌های امنیتی ایجاد می‌کند، هرچند سندباکس‌سازی نیز ایمنی مطلق را تضمین نمی‌نماید.
          </p>
          <div className="text-[10px] font-mono text-amber-300/80 pt-1" dir="ltr">
            Engineering Guidance: Local Process Security &amp; Least Privilege
          </div>
        </Card>

        {/* Pillar 2: Remote OAuth 2.1 & Confused Deputy */}
        <Card variant="translucent" className="p-5 border-cyan-500/30 bg-[#0E1526]/80 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Network className="w-4 h-4" />
            <span>۲. احراز هویت شبکه و معاون گیج</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            در ترابری‌های شبکه HTTP (<span className="font-mono text-cyan-300" dir="ltr">SHOULD</span> طبق مشخصات مجوزدهی MCP)، سرور منبع موظف است مخاطب هدف (<span className="font-mono text-cyan-300" dir="ltr">aud</span>) را اعتبارسنجی کند و تحت هیچ شرایطی نباید توکن را مستقیماً فوروارد نماید (<span className="font-mono text-rose-400" dir="ltr">MUST NOT pass through</span>). ترابری‌های محلی STDIO از این مشخصات استفاده نمی‌کنند (<span className="font-mono text-amber-300" dir="ltr">SHOULD NOT</span>).
          </p>
          <div className="text-[10px] font-mono text-cyan-300/80 pt-1" dir="ltr">
            RFC 8707 & OAuth 2.1 Conformance
          </div>
        </Card>

        {/* Pillar 3: Indirect Prompt Injection */}
        <Card variant="translucent" className="p-5 border-rose-500/30 bg-[#0E1526]/80 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <FileWarning className="w-4 h-4" />
            <span>۳. تزریق غیرمستقیم پرامپت</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            اگر خروجی یک ابزار یا منبع محتوای آلوده داشته باشد، ممکن است مدل آن را به عنوان دستور جدید تفسیر کند (<span className="font-mono text-rose-300" dir="ltr">LLM01:2025</span>). هاست باید خروجی ابزارها را به عنوان داده غیرقابل‌اعتماد تلقی و پالایش نماید.
          </p>
          <div className="text-[10px] font-mono text-rose-300/80 pt-1" dir="ltr">
            OWASP Top 10 for LLM: LLM01 & LLM05
          </div>
        </Card>
      </div>

      {/* 3. Scientific Demarcation Table: What MCP Does vs Does NOT Guarantee */}
      <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm sm:text-base font-bold text-white">
            مرزبندی دقیق دانشگاهی: آنچه MCP تضمین می‌کند در برابر آنچه تضمین نمی‌کند
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Guaranteed by Protocol */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>آنچه پروتکل MCP به عنوان استاندارد تضمین می‌کند:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed">
              <li>قالب استاندارد پیام‌رسانی JSON-RPC 2.0 برای ابزارها، منابع و پرامپت‌ها.</li>
              <li>مذاکره اولیه قابلیت‌ها (Capability Negotiation) در گام Initialize.</li>
              <li>تفکیک لایه‌ای و قابلیت کشف خودکار ابزارها توسط کلاینت.</li>
              <li>پشتیبانی از الزامات استاندارد OAuth 2.1 در ترابری شبکه.</li>
            </ul>
          </div>

          {/* NOT Guaranteed by Protocol */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <XCircle className="w-4 h-4" />
              <span>آنچه MCP به خودی خود هرگز تضمین نمی‌کند:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed">
              <li>قابل‌اعتماد بودن منطق سرور خارجی یا صحت خروجی ابزارها.</li>
              <li>عدم خروج داده‌ها از شبکه محلی (بستگی تام به کانفیگ هاست و سرور دارد).</li>
              <li>مصونیت مدل در برابر فریب معنایی یا تزریق غیرمستقیم پرامپت.</li>
              <li>ایزولاسیون پردازه محلی در غیاب سندباکس سطح سیستم‌عامل.</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B1020] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">نتیجه مهندسی:</strong> امنیت در اکوسیستم هوش مصنوعی عامل‌محور یک ویژگی لایه‌ای است. امنیت MCP بر دوش هاست (اعمال سیاست‌های تایید)، سرور (کنترل دسترسی زیرین) و زیرساخت شبکه (OAuth 2.1 و TLS) استوار است.
        </div>
      </Card>

      {/* 4. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_07_PRESENTER_NOTES[2]} />
    </div>
  );
}
