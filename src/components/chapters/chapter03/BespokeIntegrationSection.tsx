'use client';

import React from 'react';
import { Unplug, AlertTriangle, Copy, Lock, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_03_PRESENTER_NOTES } from './presenterNotes';

export function BespokeIntegrationSection() {

  const applications = [
    { id: 'claude', name: 'Claude Desktop', desc: 'کلاینت دسکتاپ هوش مصنوعی' },
    { id: 'ide', name: 'IDE Agent', desc: 'افزونه محیط توسعه (VS Code)' },
    { id: 'web', name: 'Web Assistant', desc: 'دستیار هوشمند تحت وب' },
  ];

  const tools = [
    { id: 'pg', name: 'PostgreSQL DB', desc: 'پایگاه داده سازمانی' },
    { id: 'gh', name: 'GitHub API', desc: 'مخازن کد و ایشوها' },
    { id: 'slack', name: 'Slack Bot', desc: 'پیام‌رسان تیمی' },
    { id: 'fs', name: 'Local Filesystem', desc: 'فایل‌های محلی دیسک' },
  ];

  const painPoints = [
    {
      id: 1,
      title: 'تکرار مکرر کد (Code Duplication)',
      desc: 'نوشتن و بازنویسی منطق اتصال و احراز هویت مشابه در تک‌تک نرم‌افزارهای هوش مصنوعی به صورت ایزوله.',
      icon: Copy,
      color: 'text-amber-400',
      bg: 'bg-amber-950/20 border-amber-500/20',
    },
    {
      id: 2,
      title: 'وابستگی شدید به ارائه‌دهنده (Vendor Lock-in)',
      desc: 'قفل شدن ابزارها و درایورها به قالب پرامپت یا ساختار ورودی/خروجی یک مدل زبانی مشخص.',
      icon: Lock,
      color: 'text-rose-400',
      bg: 'bg-rose-950/20 border-rose-500/20',
    },
    {
      id: 3,
      title: 'نگهداری فرساینده (Maintenance Burden)',
      desc: 'هر تغییر جزئی در API یا نسخه ابزارهای بیرونی، نیازمند به‌روزرسانی کد اتصال در تمام برنامه‌های کلاینت است.',
      icon: Wrench,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/20 border-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۳.۱ • ریشه‌یابی چالش یکپارچه‌سازی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          چرا اتصال‌های اختصاصی در مقیاس صنعتی شکست می‌خورند؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          در فصل قبل دیدیم که یک مدل زبانی برای پاسخگویی به ابزار نیاز دارد. اما وقتی تعداد کلاینت‌ها و ابزارها رشد می‌کند، معماری نقطه‌به‌نقطه (<span className="font-mono text-cyan-300" dir="ltr">Point-to-Point</span>) به بن‌بست می‌رسد.
        </p>
      </div>

      {/* Main Schematic Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Unplug className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              معماری اتصالات اختصاصی دوجانبه (<span className="font-mono text-amber-300 text-xs sm:text-sm" dir="ltr">Bespoke Point-to-Point</span>)
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            M × N = 12 Custom Drivers
          </span>
        </div>

        {/* 2D Schematic */}
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* Apps Column (M) */}
            <div className="md:col-span-3 space-y-2.5">
              <span className="text-xs font-mono text-indigo-400 block text-center font-bold">
                برنامه‌های هوش مصنوعی (M)
              </span>
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-[#141C2E] border border-indigo-500/30 text-center shadow-md space-y-0.5"
                >
                  <div className="text-xs font-mono text-slate-200 font-bold" dir="ltr">
                    {app.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {app.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Chaotic Connection Lines Representation */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 text-center space-y-3">
              <div className="w-full py-4 px-3 border-y border-dashed border-amber-500/40 bg-amber-950/15 rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>انباشت فزاینده اتصالات اختصاصی</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-white font-extrabold bg-[#0B1020] p-1.5 rounded-lg border border-slate-800" dir="ltr">
                  3 Clients × 4 Tools = 12 Connectors
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-xs">
                هر تغییر در یک ابزار، نیازمند بازنویسی کد اتصال در تمام برنامه‌های کلاینت است!
              </p>
            </div>

            {/* Tools Column (N) */}
            <div className="md:col-span-3 space-y-2.5">
              <span className="text-xs font-mono text-cyan-400 block text-center font-bold">
                سرویس‌ها و داده‌ها (N)
              </span>
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-3 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-center shadow-md space-y-0.5"
                >
                  <div className="text-xs font-mono text-slate-200 font-bold" dir="ltr">
                    {tool.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {tool.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Scientific Disclaimer Note */}
          <div className="p-3 rounded-xl bg-[#0F1626] border border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
            <strong className="text-amber-300 font-semibold">یادداشت تدقیق علمی: </strong>
            رابطه <span className="font-mono text-slate-300" dir="ltr">M × N</span> یک مدل مفهومی و ساده‌شده برای نشان دادن رشد فزاینده هزینه نگهداری اتصالات نقطه‌به‌نقطه است؛ این فرمول یک قانون قطعی ریاضی در تمام معماری‌ها نیست، اما به خوبی بن‌بست عدم مقیاس‌پذیری را نمایان می‌سازد.
          </div>
        </div>

        {/* 3 Core Pain Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.id}
                className={`p-4 rounded-xl border ${point.bg} space-y-2`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 shrink-0 ${point.color}`} />
                  <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
                    {point.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </Card>

      {/* Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_03_PRESENTER_NOTES[0]} />
    </div>
  );
}
