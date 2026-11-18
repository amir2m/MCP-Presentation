'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server,
  Database,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_05_PRESENTER_NOTES } from './presenterNotes';
import { CONSTANTS } from './mockData';

export function ToolExecutionSection() {
  const [activeTab, setActiveTab] = useState<'server-steps' | 'six-layers'>('server-steps');

  const sixLayers = [
    {
      num: 1,
      title: '۱. لایه قصد و خواست طبیعی کاربر',
      desc: 'طرح پرسش به زبان طبیعی در رابط هاست بدون دانش فنی.',
    },
    {
      num: 2,
      title: '۲. لایه قرارداد فراخوانی ابزار در API مدل',
      desc: 'تولید شیء نام ابزار و پارامترها توسط مدل بدون فرمت MCP.',
    },
    {
      num: 3,
      title: '۳. لایه فریم پیام رسمی پروتکل MCP',
      desc: 'فرمول‌بندی درخواست tools/call با متادیتای _meta توسط کلاینت هاست.',
    },
    {
      num: 4,
      title: '۴. لایه پردازش و اجرای هندلر در سرور MCP',
      desc: 'اعتبارسنجی پیام و فراخوانی تابع داخلی ابزار در سرور.',
    },
    {
      num: 5,
      title: '۵. لایه سیستم‌های خارجی و منبع داده زیرین',
      desc: 'استعلام پایگاه‌داده یا وب‌سرویس خارجی توسط درایور اختصاصی ابزار.',
    },
    {
      num: 6,
      title: '۶. لایه بازگشت داده و بسته‌بندی در پروتکل',
      desc: 'دریافت داده خام، ساخت پاسخ complete و ادغام در کانتکست مدل.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-4-tool-execution">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۵.۴ • کالبدشکافی لایه سرور
        </Badge>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          پردازش در سرور MCP و استعلام از پایگاه داده خارجی
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          سرور MCP یک پایگاه داده نیست، بلکه آداپتوری هوشمند است که پس از اعتبارسنجی پیام پروتکل، لاجیک اختصاصی ابزار را اجرا کرده و داده‌ها را از سامانه انبار واکشی می‌کند.
        </p>
      </div>

      {/* 2. Interactive Execution Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-emerald-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              کالبدشکافی لایه سرور و تفکیک پروتکل از پایگاه‌داده
            </h4>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            <button
              onClick={() => setActiveTab('server-steps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'server-steps'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              مراحل سرور و کوئری نمونه SQL
            </button>
            <button
              onClick={() => setActiveTab('six-layers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'six-layers'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              لایه‌های شش‌گانه تعامل
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'server-steps' ? (
            <motion.div
              key="server-steps"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Three Steps of Server */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[10px]">
                      ۱
                    </span>
                    اعتبارسنجی پروتکل
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    بررسی فراداده نسخه پروتکل در <code className="text-cyan-300 font-mono">_meta</code> و فریم JSON-RPC.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-[10px]">
                      ۲
                    </span>
                    بررسی ورودی ابزار
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    تطبیق پارامتر ورودی <code className="text-indigo-300 font-mono">sku</code> با شمای اعتبارسنجی داخلی.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[10px]">
                      ۳
                    </span>
                    فراخوانی هندلر اختصاصی
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    اجرای کد محلی ابزار و ارتباط با درایور سیستم پایگاه داده خارجی.
                  </p>
                </div>
              </div>

              {/* SQL Code Box with Official Label */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-400" />
                    اجرای داخلی سرور — پیاده‌سازی نمونه ابزار (Server Internal Execution — Illustrative Implementation):
                  </span>
                  <Badge variant="outline" size="sm">
                    External DB Driver
                  </Badge>
                </div>

                <pre
                  dir="ltr"
                  className="font-mono text-xs text-emerald-300/90 bg-slate-950/90 p-4 rounded-xl border border-emerald-500/30 overflow-x-auto"
                >
                  <code>{`-- اجرای داخلی سرور — پیاده‌سازی نمونه ابزار (Server Internal Execution — Illustrative Implementation)
-- استعلام پایگاه داده انبار توسط تابع داخلی ابزار query_inventory
SELECT sku, in_stock, quantity, inventory_id 
FROM warehouse_inventory 
WHERE sku = '${CONSTANTS.SKU}' 
LIMIT 1;`}</code>
                </pre>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-300">اصل عدم وابستگی پروتکل به پایگاه داده (Database Agnostic):</strong> پروتکل MCP به خودی خود زبان SQL نمی‌فهمد و با هیچ پایگاه‌داده‌ای پیوند ذاتی ندارد؛ سرور MCP می‌تواند به وب‌سرویس REST، سیستم فایل محلی، ترمینال، یا حافظه مقیم متصل باشد.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="six-layers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {sixLayers.map((layer) => (
                <div
                  key={layer.num}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1"
                >
                  <h5 className="font-bold text-xs text-cyan-300">{layer.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* 3. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_05_PRESENTER_NOTES[3]} />
    </div>
  );
}
