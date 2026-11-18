'use client';

import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_05_PRESENTER_NOTES } from './presenterNotes';
import { CONSTANTS, SCENARIOS } from './mockData';
import { ScenarioId } from './types';

export function ResultHandlingSection() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>('scenario-a');

  const scenario = SCENARIOS[selectedScenarioId];

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-5-result-handling">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۵.۵ • تحلیل پاسخ و خطا
        </Badge>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          ساختار شیء <span className="font-mono text-cyan-300" dir="ltr">result</span>، تفکیک انواع خطا و ادغام در کانتکست
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          سرور انبار پاسخ خود را با همان شناسه یکتا بازمی‌گرداند؛ اما نحوه بسته‌بندی این داده‌ها و تفکیک موجودی صفر از خطای ابزار یا خطای پروتکل، یکی از مهم‌ترین مباحث مهندسی در MCP است.
        </p>
      </div>

      {/* 2. Scenario Interactive Comparison Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              ماتریس تدقیق علمی سناریوهای چهارگانه پاسخ و خطا
            </h4>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            {(
              [
                'scenario-a',
                'scenario-b',
                'scenario-c',
                'scenario-d',
              ] as ScenarioId[]
            ).map((scId) => {
              const sc = SCENARIOS[scId];
              const isSelected = selectedScenarioId === scId;
              return (
                <button
                  key={scId}
                  onClick={() => setSelectedScenarioId(scId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sc.shortTag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Scenario Code & Explanation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Badge variant={scenario.badgeVariant} size="sm">
                  {scenario.shortTag}
                </Badge>
                <span>{scenario.namePersian}</span>
              </h5>
              <p className="text-xs text-slate-400">{scenario.summaryPersian}</p>
            </div>

            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded" dir="ltr">
              ID: {CONSTANTS.REQUEST_ID}
            </span>
          </div>

          {/* Response Payload Box */}
          <pre
            dir="ltr"
            className="font-mono text-xs sm:text-[13px] text-cyan-300/90 leading-relaxed overflow-x-auto p-4 rounded-xl bg-slate-950/90 border border-slate-800"
          >
            <code>{JSON.stringify(scenario.mcpResultPayload, null, 2)}</code>
          </pre>
        </div>

        {/* Nuance Matrix Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              موجودی صفر، خطا نیست!
            </span>
            <p className="text-slate-400 leading-relaxed">
              استعلام با موفقیت ۱۰۰٪ اجرا شده و نتیجه داده‌ای حاکی از ۰ قطعه است. در این سناریو فیلد <code className="text-cyan-300 font-mono">isError</code> هرگز نباید فعال شود.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              توصیه استاندارد (SHOULD) برای isError
            </span>
            <p className="text-slate-400 leading-relaxed">
              در صورت قطعی دیتابیس یا تایم‌اوت، سرور توصیه می‌شود (SHOULD) فریم سالم JSON-RPC را با شیء <code className="text-amber-300 font-mono">result</code> و پرچم <code className="text-amber-300 font-mono">isError: true</code> بازگرداند.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              کد -32601 منحصراً برای Method not found
            </span>
            <p className="text-slate-400 leading-relaxed">
              کد خطای پروتکل <code className="text-indigo-300 font-mono">-32601</code> صرفاً برای متدهای ناشناخته است و با خطای نحوی (<code className="text-indigo-300 font-mono">-32700</code>) یا درخواست نامعتبر (<code className="text-indigo-300 font-mono">-32600</code>) متفاوت است.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ادغام داده در کانتکست مدل (Context Ingestion)
            </span>
            <p className="text-slate-400 leading-relaxed">
              کلاینت نتیجه را به هاست می‌دهد و هاست داده را از قالب پروتکل خارج کرده و به عنوان پیامی با نقش <code className="text-emerald-300 font-mono">tool</code> در تاریخچه گفتگوی مدل تزریق می‌کند.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_05_PRESENTER_NOTES[4]} />
    </div>
  );
}
