'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ChevronDown,
  CheckCircle2,
  FileCode,
  Globe,
  Database,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CONSTANTS, SPEAKER_NOTES } from './mockData';

export function WhatIsApiSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'openapi' | 'response'>('response');

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-2-what-is-api">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۲ • ادبیات معماری
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۳۵ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          آناتومی <span className="font-mono text-cyan-300" dir="ltr">API</span>: از قرارداد کلی نرم‌افزاری تا سبک‌های وب
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          برای درک جایگاه پروتکل MCP، ابتدا باید مرز میان مفهوم کلی API، سبک معماری REST، و استاندارد توصیف قراردادهای وب (OpenAPI) را کالبدشکافی کنیم.
        </p>
      </div>

      {/* 2. Conceptual Demarcation: General API vs REST vs OpenAPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: General API */}
        <Card variant="solid" className="p-5 border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Terminal className="w-4 h-4" />
            <span>مفهوم عام API</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500" dir="ltr">
            Application Programming Interface
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            یک قرارداد صریح برای تعامل قطعات نرم‌افزاری با یکدیگر بدون نیاز به آگاهی از کدهای درونی. شامل APIهای سیستمی (POSIX)، کتابخانه‌های محلی، SDKها، gRPC، GraphQL و وب‌سرویس‌ها.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300/80">
            نه هر API لزوماً تحت وب است و نه هر وب‌سرویسی REST است.
          </div>
        </Card>

        {/* Card 2: REST Architectural Style */}
        <Card variant="solid" className="p-5 border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>سبک معماری REST</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500" dir="ltr">
            Representational State Transfer (2000)
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            یک سبک معماری شبکه (توسط روی فیلدینگ) بر پایه منابع (Resources)، شناسه‌های یکتا (URI)، عملیات بدون حالت (Stateless) و متدهای استاندارد وب؛ نه صرفاً چند URL یا افعال HTTP.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-indigo-300/80">
            ستون فقرات وب مدرن و ارتباطات کلاینت-سرور برای بیش از دو دهه.
          </div>
        </Card>

        {/* Card 3: OpenAPI Specification */}
        <Card variant="solid" className="p-5 border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <FileCode className="w-4 h-4" />
            <span>مشخصات OpenAPI (OAS)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500" dir="ltr">
            Machine-Readable Contract Standard
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            استاندارد معتبر برای تعریف ماشین‌خوان و دقیق قراردادهای HTTP API. اثبات می‌کند که وب‌سرویس‌های REST فاقد ساختار یا شمای ماشین‌خوان نیستند؛ بلکه چالش در نحوه اتصال به هوش مصنوعی است.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300/80">
            قرارداد دقیق ورودی، خروجی و انواع داده‌ها را مستند می‌سازد.
          </div>
        </Card>
      </div>

      {/* 3. Interactive Warehouse API Inspection Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                وب‌سرویس انبار سازمان: نقطه انتهایی استعلام موجودی
              </h4>
              <span className="text-xs text-slate-400">
                قرارداد معتبر و پایدار موجود در پروژه
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            <button
              onClick={() => setActiveCodeTab('response')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCodeTab === 'response'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۱. پاسخ نمونه HTTP (JSON)
            </button>
            <button
              onClick={() => setActiveCodeTab('openapi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCodeTab === 'openapi'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ۲. شمای ماشین‌خوان OpenAPI
            </button>
          </div>
        </div>

        {/* Endpoint Call Pill */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 font-mono text-xs" dir="ltr">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              GET
            </span>
            <span className="text-slate-200">
              {CONSTANTS.REST_ENDPOINT.replace('GET ', '')}
            </span>
          </div>
          <Badge variant="success" size="sm">
            Status: 200 OK
          </Badge>
        </div>

        {/* Code Display */}
        <AnimatePresence mode="wait">
          {activeCodeTab === 'response' ? (
            <motion.div
              key="response-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-4 rounded-xl bg-[#070b14] border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto"
              dir="ltr"
            >
              <pre>
                <code>{`{
  "sku": "${CONSTANTS.SKU}",
  "in_stock": true,
  "quantity": ${CONSTANTS.INVENTORY_QUANTITY},
  "inventory_id": "${CONSTANTS.INVENTORY_ID}",
  "warehouse_zone": "Central-Rack-04",
  "last_audited": "2026-11-15T12:00:00Z"
}`}</code>
              </pre>
            </motion.div>
          ) : (
            <motion.div
              key="openapi-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-4 rounded-xl bg-[#070b14] border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto"
              dir="ltr"
            >
              <pre>
                <code>{`openapi: 3.1.0
info:
  title: Warehouse Inventory Service
  version: 1.0.0
paths:
  /api/v1/inventory/{sku}:
    get:
      summary: Retrieve hardware component inventory record
      parameters:
        - name: sku
          in: path
          required: true
          schema:
            type: string
            example: "${CONSTANTS.SKU}"
      responses:
        '200':
          description: Inventory record found
          content:
            application/json:
              schema:
                type: object
                properties:
                  sku: { type: string }
                  in_stock: { type: boolean }
                  quantity: { type: integer, example: 6 }
                  inventory_id: { type: string, example: "${CONSTANTS.INVENTORY_ID}" }`}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Takeaway */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            وب‌سرویس انبار سال‌هاست که با بالاترین کیفیت وظیفه خود را انجام می‌دهد. سیستم‌های سازمان مشکلی در ارائه سرویس ندارند؛ چالش از زمانی آغاز می‌شود که مدل‌های زبانی هوش مصنوعی دینامیک وارد معادله می‌شوند.
          </span>
        </div>
      </Card>

      {/* 4. Speaker Notes Section (Collapsible) */}
      <div className="border border-slate-800 rounded-xl bg-[#090E1A]/80 overflow-hidden">
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <span className="font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            یادداشت‌های تفصیلی سخنران (Presenter Notes)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showSpeakerNotes ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {showSpeakerNotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2"
            >
              <p className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                {SPEAKER_NOTES.section2}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
