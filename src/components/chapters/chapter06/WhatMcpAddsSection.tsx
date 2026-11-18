'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Table,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_06_PRESENTER_NOTES } from './presenterNotes';
import { ArchitectureComparisonSwitcher } from './ArchitectureComparisonSwitcher';
import { CONSTANTS } from './mockData';

export function WhatMcpAddsSection() {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-4-what-mcp-adds">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۴ • مقایسه لایه‌بندی
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۵۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          ارزش افزوده <span className="font-mono text-cyan-300" dir="ltr">MCP</span>: آداپتور مشترک روی{' '}
          <span className="font-mono text-emerald-300" dir="ltr">API</span>های موجود
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          کالبدشکافی تطبیقی دو معماری ثابت می‌کند که ورود پروتکل MCP مستلزم بازنویسی وب‌سرویس‌های سازمانی یا حذف پایگاه‌های داده نیست؛ بلکه یک لایه آداپتور استاندارد به اکوسیستم اضافه می‌شود.
        </p>
      </div>

      {/* 2. Primary Architecture Comparison Switcher */}
      <ArchitectureComparisonSwitcher />

      {/* 3. Detailed Architectural Comparison Table */}
      <Card variant="solid" className="p-5 sm:p-6 border-indigo-500/25 space-y-4">
        <div className="flex items-center gap-2 text-slate-200 pb-2 border-b border-slate-800 text-xs sm:text-sm font-bold">
          <Table className="w-4 h-4 text-cyan-400" />
          <span>جدول تطبیقی مسئولیت مؤلفه‌ها در دو معماری</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/60">
                <th className="p-3">مؤلفه در سیستم</th>
                <th className="p-3">نقش در اتصال مستقیم (معماری الف)</th>
                <th className="p-3">نقش در اتصال مبتنی بر MCP (معماری ب)</th>
                <th className="p-3 text-center">وضعیت تغییر</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span>پایگاه داده انبار</span>
                  <span className="text-[10px] font-mono text-slate-500" dir="ltr">Database</span>
                </td>
                <td className="p-3">ذخیره رکورد ۶ عدد قطعه {CONSTANTS.SKU}</td>
                <td className="p-3">ذخیره رکورد ۶ عدد قطعه {CONSTANTS.SKU}</td>
                <td className="p-3 text-center">
                  <Badge variant="success" size="sm">
                    بدون تغییر (Unchanged)
                  </Badge>
                </td>
              </tr>

              <tr>
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span>وب‌سرویس انبار</span>
                  <span className="text-[10px] font-mono text-slate-500" dir="ltr">REST API</span>
                </td>
                <td className="p-3 font-mono" dir="ltr">GET /api/v1/inventory/{CONSTANTS.SKU}</td>
                <td className="p-3 font-mono" dir="ltr">GET /api/v1/inventory/{CONSTANTS.SKU}</td>
                <td className="p-3 text-center">
                  <Badge variant="success" size="sm">
                    بدون تغییر (Unchanged)
                  </Badge>
                </td>
              </tr>

              <tr>
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span>واسط اتصال و درایور</span>
                  <span className="text-[10px] font-mono text-slate-500" dir="ltr">Adapter</span>
                </td>
                <td className="p-3 text-amber-300">
                  کد چسباننده دست‌ساز درون برنامه میزبان (Host-side Adapter)
                </td>
                <td className="p-3 text-cyan-300">
                  سرور استاندارد و مستقل انبار (<span className="font-mono" dir="ltr">{CONSTANTS.TOOL_NAME}</span>)
                </td>
                <td className="p-3 text-center">
                  <Badge variant="cyan" size="sm">
                    استانداردسازی و کپسوله‌سازی
                  </Badge>
                </td>
              </tr>

              <tr>
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span>برنامه میزبان هوش مصنوعی</span>
                  <span className="text-[10px] font-mono text-slate-500" dir="ltr">AI Host</span>
                </td>
                <td className="p-3 text-amber-300">
                  نیازمند درایور، هدرها و هندلینگ اختصاصی برای هر سرویس
                </td>
                <td className="p-3 text-cyan-300">
                  مجهز به کلاینت عمومی MCP با قابلیت اتصال به بی‌نهایت سرور
                </td>
                <td className="p-3 text-center">
                  <Badge variant="cyan" size="sm">
                    استقلال و قابلیت بازاستفاده
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Demarcation Note */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>اصل تفکیک وظایف بدون اغراق:</strong> سرور MCP زبان تعامل ابزارها را یکپارچه می‌کند؛ اما امنیت سیستم نیازمند پیاده‌سازی و کنترل دائمی احراز هویت، کلیدها، مجوزهای کاربری و نگهداری مهندسی در لایه‌های مربوطه است.
          </span>
        </div>
      </Card>

      {/* 4. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_06_PRESENTER_NOTES[3]} />
    </div>
  );
}
