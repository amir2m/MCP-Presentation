'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_05_PRESENTER_NOTES } from './presenterNotes';
import { CONSTANTS } from './mockData';

export function ModelDecisionSection() {
  const [activeTab, setActiveTab] = useState<'decision' | 'demarcation'>('decision');

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-2-model-decision">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۵.۲ • هسته تصمیم‌گیری و هماهنگی
        </Badge>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تصمیم مدل زبانی و هدایت برنامه میزبان (<span className="font-mono text-cyan-300" dir="ltr">Host Coordination</span>)
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          مدل زبانی تشخیص می‌دهد که موجودی انبار داده‌ای لحظه‌ای و متغیر است؛ بنابراین با تولید ساختار فراخوانی ابزار، تصمیم خود را به هاست اعلام می‌کند و هاست به عنوان دروازه‌بان امنیتی وارد عمل می‌شود.
        </p>
      </div>

      {/* 2. Interactive Decision and Demarcation Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-purple-500/25 space-y-6">
        {/* Toggle between Decision Output and Critical Demarcation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              کالبدشکافی استنتاج مدل زبانی در برابر نقش هاست
            </h4>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            <button
              onClick={() => setActiveTab('decision')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'decision'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۱. خروجی ابزار مدل (Model Output)
            </button>
            <button
              onClick={() => setActiveTab('demarcation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'demarcation'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۲. مرزبندی فنی و لایه امنیتی هاست
            </button>
          </div>
        </div>

        {/* Tab 1: Decision Payload */}
        <AnimatePresence mode="wait">
          {activeTab === 'decision' ? (
            <motion.div
              key="decision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">
                    نمایش نمونه فراخوانی ابزار توسط مدل (Illustrative Model Tool-Calling Representation):
                  </span>
                  <Badge variant="indigo" size="sm">
                    Host-LLM API Format
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  مدل زبانی به جای تولید متن پاسخ نهایی، یک شیء ساختاریافته تولید می‌کند که نشان‌دهنده نیاز به ابزار انبار است:
                </p>

                <pre
                  dir="ltr"
                  className="font-mono text-xs text-purple-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 overflow-x-auto"
                >
                  <code>{`{
  "tool_call": {
    "name": "${CONSTANTS.TOOL_NAME}",
    "arguments": {
      "sku": "${CONSTANTS.SKU}"
    }
  }
}`}</code>
                </pre>

                <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-purple-300">نکته مهم:</strong> این ساختار صرفاً یک نمایش نمونه از رابط مدل و هاست است؛ فرمت دقیق آن کاملاً به ارائه‌دهنده مدل (Anthropic Tool Use، OpenAI Function Calling یا Gemini Function Calling) وابسته است.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="demarcation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Point 1: Not MCP */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <h5 className="font-bold text-xs">خروجی مدل، پیام MCP نیست!</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    مدل هیچ حسگر یا سوکت شبکه‌ای ندارد و هرگز ترافیکی به سمت سرور MCP ارسال نمی‌کند. خروجی مدل صرفاً یک داده درون‌برنامه‌ای برای هاست است.
                  </p>
                </div>

                {/* Point 2: Host Security Gate */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <h5 className="font-bold text-xs">دروازه‌بان امنیتی و سیاست تایید در هاست</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    هاست خروجی مدل را اعتبارسنجی می‌کند (آیا ابزار مجاز است؟ آیا پارامترها با اسکیما مطابقت دارند؟). برای اعمال خواندنی نظیر استعلام انبار، سیاست تایید خودکار اعمال می‌شود.
                  </p>
                </div>
              </div>

              {/* Delegation to Client */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  پس از اعتبارسنجی موفق، هاست وظیفه اجرا را به <strong className="text-cyan-300">کلاینت MCP اختصاصی سرور انبار</strong> محول می‌کند.
                </span>
                <span className="font-mono text-cyan-400 text-[11px] shrink-0" dir="ltr">
                  Host &rarr; MCP Client
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* 3. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_05_PRESENTER_NOTES[1]} />
    </div>
  );
}
