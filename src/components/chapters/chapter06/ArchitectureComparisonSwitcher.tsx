'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Network,
  Cpu,
  Server,
  Database,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Code2,
  Share2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArchitectureMode } from './types';
import { CONSTANTS } from './mockData';

export function ArchitectureComparisonSwitcher() {
  const [mode, setMode] = useState<ArchitectureMode>('direct-api');

  return (
    <div className="space-y-6">
      {/* 1. Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[#090E1A] border border-slate-800">
        <div className="flex items-center gap-2 px-3 py-1 text-xs text-slate-300">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-bold">انتخاب معماری مقایسه‌ای:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('direct-api')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'direct-api'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>معماری الف: اتصال مستقیم به API</span>
            <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[10px]">
              سنتی / سفارشی
            </Badge>
          </button>

          <button
            onClick={() => setMode('mcp-based')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'mcp-based'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>معماری ب: اتصال مبتنی بر سرور MCP</span>
            <Badge variant="cyan" size="sm" className="hidden sm:inline-flex text-[10px]">
              استاندارد باز
            </Badge>
          </button>
        </div>
      </div>

      {/* 2. Visual Architecture Diagram Canvas */}
      <Card variant="solid" className="p-5 sm:p-8 border-indigo-500/20 space-y-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              {mode === 'direct-api' ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  معماری الف: یکپارچه‌سازی مستقیم برنامه هوش مصنوعی با REST API
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  معماری ب: اتصال استاندارد برنامه هوش مصنوعی از طریق سرور MCP
                </>
              )}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              سناریوی باسابقه استعلام قطعه{' '}
              <span className="font-mono text-cyan-300" dir="ltr">
                {CONSTANTS.SKU}
              </span>{' '}
              و بررسی تغییرات لایه‌های اتصال
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">سیستم انبار و پایگاه داده:</span>
            <Badge variant="success" size="sm" className="font-mono text-[11px]">
              UNCHANGED (بدون تغییر)
            </Badge>
          </div>
        </div>

        {/* Diagram Flow Nodes */}
        <AnimatePresence mode="wait">
          {mode === 'direct-api' ? (
            <motion.div
              key="direct-api-flow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-4xl mx-auto"
            >
              {/* Node 1: AI Host / Application */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border-2 border-amber-500/40 shadow-md space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-white text-sm sm:text-base">
                      برنامه میزبان هوش مصنوعی (AI Host / Application)
                    </span>
                  </div>
                  <Badge variant="outline" size="sm" className="text-amber-300 border-amber-500/30">
                    نیازمند کد چسباننده اختصاصی
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* LLM Sub-block */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300 font-semibold">
                      <span>هسته مدل زبانی (LLM Core)</span>
                      <span className="text-[10px] font-mono text-indigo-400">Grounded Logic</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      پرامپت کاربر را دریافت و یک فراخوانی ابزار ساختاریافته (Function Call) برای استعلام{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        {CONSTANTS.SKU}
                      </span>{' '}
                      تولید می‌کند.
                    </p>
                    <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>در معماری نمایش‌داده‌شده، مدل درخواست ساختاریافته را تولید می‌کند و Host مسئول اعتبارسنجی، هماهنگی و اجرای عملیات شبکه‌ای است.</span>
                    </div>
                  </div>

                  {/* Host-side Integration Adapter */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                    <div className="flex items-center justify-between text-amber-300 font-semibold">
                      <span>آداپتور اتصال اختصاصی هاست (Host-side Adapter)</span>
                      <span className="text-[10px] font-mono text-amber-400">Glue Code</span>
                    </div>
                    <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                      <li>دریافت قصد مدل و ساخت درخواست اختصاصی HTTP</li>
                      <li>تزریق دستی کلید احراز هویت (API Key / Bearer Token)</li>
                      <li>پارس کردن خطاهای HTTP (مانند 404 یا 500) و تبدیل به متن</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-amber-300" dir="ltr">
                  <span>HTTP GET {CONSTANTS.REST_ENDPOINT.replace('GET ', '')}</span>
                  <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                </div>
              </div>

              {/* Node 2: Inventory REST API */}
              <div className="p-4 rounded-2xl bg-[#0d1627] border border-emerald-500/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      وب‌سرویس انبار (Inventory REST API)
                    </span>
                  </div>
                  <Badge variant="success" size="sm" className="text-[10px]">
                    نقطه انتهایی موجود و معتبر سازمان (OpenAPI)
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  وب‌سرویس شرکتی که درخواست HTTP را اعتبارسنجی کرده و کوئری SQL متناظر را روی دیتابیس اجرا می‌کند.
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-emerald-400" dir="ltr">
                  <span>SQL: SELECT quantity FROM inventory WHERE sku = &apos;{CONSTANTS.SKU}&apos;</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Node 3: Warehouse Database */}
              <div className="p-4 rounded-2xl bg-[#090E1A] border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">
                      پایگاه داده انبار مرکزی (Warehouse Database)
                    </span>
                    <span className="text-xs text-slate-400">
                      رکورد انبار قطعات سخت‌افزاری با شناسه{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        {CONSTANTS.INVENTORY_ID}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold" dir="ltr">
                  quantity: {CONSTANTS.INVENTORY_QUANTITY} units
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mcp-flow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-4xl mx-auto"
            >
              {/* Node 1: AI Host with Standard MCP Client */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border-2 border-cyan-500/40 shadow-md space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white text-sm sm:text-base">
                      برنامه میزبان هوش مصنوعی (AI Host / Application)
                    </span>
                  </div>
                  <Badge variant="cyan" size="sm" className="text-[10px]">
                    مجهز به کلاینت استاندارد پروتکل
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* LLM Sub-block */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300 font-semibold">
                      <span>هسته مدل زبانی (LLM Core)</span>
                      <span className="text-[10px] font-mono text-cyan-400">Grounded Logic</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      ابزارهای کشف‌شده از طریق{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        tools/list
                      </span>{' '}
                      را ارزیابی و قصد اجرای ابزار{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        {CONSTANTS.TOOL_NAME}
                      </span>{' '}
                      را اعلام می‌کند.
                    </p>
                  </div>

                  {/* Standard MCP Client */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center justify-between text-cyan-300 font-semibold">
                      <span>کلاینت عمومی پروتکل (Standard MCP Client)</span>
                      <span className="text-[10px] font-mono text-cyan-400">Reusable Implementation</span>
                    </div>
                    <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                      <li>تولید فریم استاندارد JSON-RPC 2.0 برای متد tools/call</li>
                      <li>تزریق فراداده‌های رسمی _meta نسخه {CONSTANTS.PROTOCOL_VERSION}</li>
                      <li>ارتباط همگن با هر سرور سازگار بدون تغییر کد درایور</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Arrow 1: Protocol JSON-RPC */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[11px] font-mono text-cyan-300" dir="ltr">
                  <span>JSON-RPC 2.0 (tools/call: {CONSTANTS.TOOL_NAME})</span>
                  <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                </div>
              </div>

              {/* Node 2: Warehouse MCP Server */}
              <div className="p-4 rounded-2xl bg-[#131F38] border-2 border-indigo-500/50 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-white text-sm">
                      سرور استاندارد انبار (Warehouse MCP Server)
                    </span>
                  </div>
                  <Badge variant="outline" size="sm" className="text-indigo-300 border-indigo-500/40 text-[10px]">
                    آداپتور سبک و مستقل پروتکل
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-indigo-300 block mb-0.5">اکسپوز کاتالوگ استاندارد:</span>
                    متدهای server/discover و tools/list با شمای ورودی قطعه سخت‌افزاری.
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-indigo-300 block mb-0.5">آداپتور داخلی REST:</span>
                    فراخوانی وب‌سرویس انبار در شبکه محلی و بازگرداندن شیء result.
                  </div>
                </div>
              </div>

              {/* Arrow 2: Internal HTTP Call */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-emerald-300" dir="ltr">
                  <span>Internal HTTP GET {CONSTANTS.REST_ENDPOINT.replace('GET ', '')}</span>
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Node 3: Inventory REST API (UNCHANGED) */}
              <div className="p-4 rounded-2xl bg-[#0d1627] border border-emerald-500/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      وب‌سرویس انبار (Inventory REST API)
                    </span>
                  </div>
                  <Badge variant="success" size="sm" className="text-[10px]">
                    دست‌نخورده و بدون ۱ خط تغییر (UNCHANGED)
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  همان وب‌سرویس سازمانی که سال‌هاست بدون تغییر کار می‌کند؛ سرور MCP تنها به عنوان یک رابط هوشمند پیش روی آن قرار گرفته است.
                </p>
              </div>

              {/* Arrow 3: SQL */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-emerald-400" dir="ltr">
                  <span>SQL: SELECT quantity FROM inventory WHERE sku = &apos;{CONSTANTS.SKU}&apos;</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Node 4: Warehouse Database (UNCHANGED) */}
              <div className="p-4 rounded-2xl bg-[#090E1A] border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">
                      پایگاه داده انبار مرکزی (Warehouse Database)
                    </span>
                    <span className="text-xs text-slate-400">
                      رکورد قطعه{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        {CONSTANTS.SKU}
                      </span>{' '}
                      با شناسه{' '}
                      <span className="font-mono text-cyan-300" dir="ltr">
                        {CONSTANTS.INVENTORY_ID}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold" dir="ltr">
                  quantity: {CONSTANTS.INVENTORY_QUANTITY} units
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Scientific Comparison Insights & Demarcation Box */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              تغییرناپذیری سیستم داده‌ای
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              وب‌سرویس REST و پایگاه داده انبار در هر دو معماری دقیقاً یکسان هستند. MCP هرگز جایگزین API یا پایگاه داده سازمان نمی‌شود.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-cyan-400" />
              مرز اتصال و قابلیت استفاده مجدد
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              در معماری الف، هر برنامه هوش مصنوعی باید کد اتصال انبار را بازنویسی کند؛ در معماری ب، سرور MCP یک بار نوشته شده و توسط هر کلاینت سازگاری مصرف می‌شود.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-400" />
              پرهیز از ادعای حذف مسئولیت‌های امنیتی
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              MCP منطق اتصال را کپسوله و استاندارد می‌کند؛ اما الزامات مهندسی مانند احراز هویت، اعتبارات و سطوح دسترسی بک‌اند همچنان پابرجا و ضروری هستند.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
