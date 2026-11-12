'use client';

import React from 'react';
import { ChevronLeft, Unplug } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface MissingPieceSectionProps {
  onGoToChapter3?: () => void;
}

export function MissingPieceSection({ onGoToChapter3 }: MissingPieceSectionProps) {
  const applications = ['Claude Desktop', 'VS Code IDE', 'Custom Web Agent'];
  const tools = ['PostgreSQL DB', 'GitHub API', 'Slack Bot', 'Local Filesystem'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۲.۵ • پل ورود به پروتکل استاندارد
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          اما هنوز یک مشکل بزرگ باقی مانده است...
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          قابلیت فراخوانی ابزار (<span className="font-mono text-cyan-300" dir="ltr">Tool Calling</span>) مشکل نیاز به داده را حل کرد؛ اما برای اتصال ده‌ها برنامه مختلف هوش مصنوعی به صدها ابزار و دیتابیس متنوع، چه باید کرد؟
        </p>
      </div>

      {/* The N×M Spaghetti Dilemma Visual Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/30 bg-[#121829] space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Unplug className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-base">
              چالش اتصالات اختصاصی نقطه-به-نقطه (<span className="font-mono text-amber-300" dir="ltr">The N×M Spaghetti Problem</span>)
            </h4>
          </div>
          <Badge variant="outline" size="sm" className="text-amber-300 border-amber-500/30">
            عدم مقیاس‌پذیری
          </Badge>
        </div>

        {/* 2D Schematic of Bespoke Custom Integrations */}
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-slate-800">
          <div className="text-center text-xs text-slate-400 mb-6">
            بدون یک پروتکل باز استاندارد، هر کلاینت هوش مصنوعی باید برای هر سرویس یک درایور اختصاصی بنویسد:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* Apps Column */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[11px] font-mono text-indigo-400 block text-center font-bold">
                برنامه‌های هوش مصنوعی (N)
              </span>
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#141C2E] border border-indigo-500/30 text-xs font-mono text-slate-200 text-center shadow-md"
                  dir="ltr"
                >
                  {app}
                </div>
              ))}
            </div>

            {/* Chaotic Connection Lines Representation */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 text-center space-y-2">
              <div className="w-full h-16 border-y border-dashed border-amber-500/40 relative flex items-center justify-center bg-amber-950/10 rounded-lg">
                <span className="text-xs text-amber-300 font-bold px-3 py-1 bg-[#090E1A] rounded-full border border-amber-500/30">
                  ۳ برنامه × ۴ ابزار = ۱۲ اتصال اختصاصی!
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                هر تغییر در یک ابزار، نیازمند بازنویسی کد در تمام کلاینت‌هاست!
              </span>
            </div>

            {/* Tools Column */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[11px] font-mono text-cyan-400 block text-center font-bold">
                سرویس‌ها و داده‌ها (M)
              </span>
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-xs font-mono text-slate-200 text-center shadow-md"
                  dir="ltr"
                >
                  {tool}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* The Core Bridge Question */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-[#141C2E] to-cyan-950/50 border border-cyan-500/30 text-center space-y-3">
          <h4 className="text-base sm:text-xl font-bold text-white leading-relaxed">
            «آیا برای هر مدل و هر برنامه باید اتصال اختصاصی به ابزارها بسازیم؟ آیا راهی برای استاندارد کردن این ارتباط وجود دارد؟»
          </h4>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium">
            پاسخ: این دقیقاً همان مشکلی است که <span className="font-mono text-white font-bold" dir="ltr">Model Context Protocol (MCP)</span> برای حل آن به عنوان یک استاندارد باز جهانی متولد شده است.
          </p>
        </div>

        {/* Transition Navigation Action to Chapter 3 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            در فصل بعد می‌بینیم MCP چگونه همانند درگاه <span className="font-mono text-cyan-300" dir="ltr">USB-C</span> این ارتباطات را استاندارد و یکپارچه می‌کند.
          </div>

          {onGoToChapter3 && (
            <Button
              variant="accent"
              size="md"
              onClick={onGoToChapter3}
              iconEnd={<ChevronLeft className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              ورود به فصل سوم: معرفی پروتکل MCP
            </Button>
          )}
        </div>

      </Card>
    </div>
  );
}
