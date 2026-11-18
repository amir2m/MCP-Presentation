'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Boxes,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_05_PRESENTER_NOTES } from './presenterNotes';
import { CONSTANTS, MOCK_DISCLOSURE_TEXT } from './mockData';

export function UserRequestSection() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<'prompt' | 'tools-catalog'>('prompt');

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-1-user-request">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۵.۱ • ورود درخواست و پیش‌شرط‌ها
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{MOCK_DISCLOSURE_TEXT}</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          طرح درخواست کاربر برای قطعه{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            {CONSTANTS.SKU}
          </span>{' '}
          و اصل کشف قبلی ابزارها
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          چرخه حیات یک درخواست زمانی آغاز می‌شود که کاربر سؤالی درباره اطلاعات لحظه‌ای و بیرونی مطرح می‌کند؛ اما پیش از آن، برنامه میزبان باید کاتالوگ ابزارهایی را که قبلاً از طریق{' '}
          <span className="font-mono text-cyan-300" dir="ltr">tools/list</span>{' '}
          شناسایی کرده، در رابط فراخوانی مدل آماده نماید.
        </p>
      </div>

      {/* 2. Interactive Discovery & Prompt Demonstration Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        {/* Toggle between Prompt and Prior Discovery */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              کالبدشکافی وضعیت اولیه سیستم قبل از پردازش
            </h4>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            <button
              onClick={() => setActiveCatalogTab('prompt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCatalogTab === 'prompt'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۱. ورودی طبیعی کاربر
            </button>
            <button
              onClick={() => setActiveCatalogTab('tools-catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCatalogTab === 'tools-catalog'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۲. کاتالوگ ابزارهای پیش‌کشف‌شده (tools/list)
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeCatalogTab === 'prompt' ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 shrink-0">
                  <User className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">
                      طرح پرسش توسط کاربر در Host:
                    </span>
                    <span className="text-[11px] font-mono text-slate-500" dir="ltr">
                      User Natural Query
                    </span>
                  </div>
                  <blockquote className="text-base sm:text-lg font-bold text-white bg-slate-900/60 p-3 rounded-lg border-r-4 border-indigo-500">
                    «آیا کالای {CONSTANTS.SKU} در انبار موجود است؟»
                  </blockquote>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    کاربر به عنوان موجودیت آغازگر، خواسته خود را بدون نیاز به اطلاع از پایگاه‌داده، جداول انبار، متدهای JSON-RPC یا معماری MCP مطرح می‌کند.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tools-catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-200">
                      شمای ابزار استخراج‌شده از اتصال اولیه سرور انبار:
                    </span>
                  </div>
                  <Badge variant="cyan" size="sm">
                    Prior Discovery: tools/list
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  برنامه میزبان (Host) مشخصات و شمای اعتبارسنجی ابزارهای سرور را در زمان برقراری ارتباط (با فراخوانی متد <code className="text-cyan-300 font-mono">tools/list</code>) دریافت و ذخیره کرده است. این تعاریف برای هر درخواست تکرار نمی‌شوند، بلکه به عنوان پیش‌شرط به رابط فراخوانی مدل ارائه می‌گردند:
                </p>

                <pre
                  dir="ltr"
                  className="font-mono text-xs text-cyan-300/90 bg-slate-900/90 p-3 rounded-xl border border-slate-800 overflow-x-auto"
                >
                  <code>{`{
  "name": "${CONSTANTS.TOOL_NAME}",
  "description": "استعلام لحظه‌ای وضعیت موجودی قطعات سخت‌افزاری در پایگاه داده انبار",
  "inputSchema": {
    "type": "object",
    "properties": {
      "sku": {
        "type": "string",
        "description": "شناسه انبارداری قطعه، مانند NVMe-4TB"
      }
    },
    "required": ["sku"]
  }
}`}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Takeaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              تفکیک فاز کشف از اجرای لحظه‌ای
            </span>
            <p className="text-slate-400 leading-relaxed">
              کاتالوگ ابزارها از قبل با <code className="text-slate-300">tools/list</code> کشف شده است و نیازی به کشف مجدد در هر پرامپت نیست.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              رابط مدل در هاست (نه تزریق متنی اجباری)
            </span>
            <p className="text-slate-400 leading-relaxed">
              هاست ابزارها را از طریق ساختار پارامترهای API مدل مهیا می‌کند؛ نه لزوماً درج دستی متن درون پرامپت کاربر.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_05_PRESENTER_NOTES[0]} />
    </div>
  );
}
