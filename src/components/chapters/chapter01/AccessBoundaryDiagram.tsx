'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Laptop,
  Wrench,
  Database,
  Globe,
  FileCode2,
  XCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export function AccessBoundaryDiagram() {
  const [activeState, setActiveState] = useState<'isolated' | 'mediated'>('isolated');

  return (
    <div className="w-full bg-[#0c1222] border border-indigo-500/20 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Header and Toggle Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              نمودار معماری: تفکیک هسته مدل از محیط میزبان و ابزارها
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            برای درک مرزهای امنیتی و نحوه جریان داده، حالت‌ها را تغییر دهید.
          </p>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex items-center p-1 bg-[#070b16] rounded-xl border border-slate-800 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveState('isolated')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeState === 'isolated'
                ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>حالت الف: مدل بدون دسترسی مستقیم</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveState('mediated')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeState === 'mediated'
                ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>حالت ب: دسترسی میانجی‌گری‌شده میزبان</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="py-6 min-h-[360px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeState === 'isolated' ? (
            <motion.div
              key="isolated-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full space-y-6"
            >
              {/* Diagram Graphic State A */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* 1. User & Prompt */}
                <div className="p-4 rounded-xl bg-[#141C2E] border border-slate-800 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/70 text-indigo-400 mx-auto flex items-center justify-center border border-indigo-500/30">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-200">ورودی کاربر (Prompt)</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    «موجودی انبار چقدر است؟»
                  </p>
                </div>

                {/* Arrow to LLM */}
                <div className="hidden lg:flex items-center justify-center text-slate-600">
                  <ArrowLeft className="w-6 h-6 text-indigo-400" />
                </div>

                {/* 2. Isolated LLM Core */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181a30] to-[#111322] border-2 border-dashed border-rose-500/40 text-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center justify-center font-medium rounded-full text-[11px] px-2.5 py-0.5 bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      ایزوله / فاقد سوکت
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-rose-950/60 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
                    <Cpu className="w-6 h-6" />
                  </div>

                  <div>
                    <h5 className="font-bold text-sm text-white">هسته مدل زبانی (LLM Core)</h5>
                    <span className="text-[11px] text-cyan-300 font-mono" dir="ltr">Next-Token Predictor</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    پردازش بر پایه تانسورها و وزن‌های استاتیک زمان آموزش. مدل به‌خودی‌خود به هیچ سیستم‌عاملی دسترسی مستقیم ندارد.
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-rose-300 flex items-center justify-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>تولید متن صرفاً بر اساس احتمالات آماری</span>
                  </div>
                </div>

                {/* 3. Blocked External Systems */}
                <div className="lg:col-span-3 p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-3">
                  <div className="flex items-center justify-between text-xs text-rose-300 font-bold border-b border-rose-900/40 pb-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>مسیرهای مسدود دسترسی مستقیم به محیط بیرون:</span>
                    </div>
                    <span className="text-[10px] text-rose-400 font-mono" dir="ltr">BLOCKED: Direct Syscalls Disabled</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-rose-900/40 flex items-center gap-2.5 text-xs text-slate-400">
                      <Database className="w-4 h-4 text-rose-400/80 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-300">پایگاه‌های داده</div>
                        <div className="text-[10px] text-rose-400" dir="ltr">No SQL/DB Connection</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-rose-900/40 flex items-center gap-2.5 text-xs text-slate-400">
                      <FileCode2 className="w-4 h-4 text-rose-400/80 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-300">سیستم فایل محلی</div>
                        <div className="text-[10px] text-rose-400" dir="ltr">No Filesystem Access</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-rose-900/40 flex items-center gap-2.5 text-xs text-slate-400">
                      <Globe className="w-4 h-4 text-rose-400/80 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-300">شبکه و اینترنت زنده</div>
                        <div className="text-[10px] text-rose-400" dir="ltr">No Socket / HTTP Calls</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* State A Key Scientific Rule */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">اصل بنیادین: </span>
                  مدل زبانی یک الگوریتم ریاضی پیش‌بینی نمادها است، نه یک فرآیند اجرایی سیستم‌عامل. مدل هیچ پورت شبکه، کانکشن استخر یا درایوری برای ارتباط با دنیای خارج ندارد.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mediated-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full space-y-6"
            >
              {/* Diagram Graphic State B */}
              <div className="space-y-4">
                {/* 4 Nodes Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                  {/* Node 1: User / Host Application */}
                  <div className="p-3.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        مرحله ۱ و ۳
                      </span>
                      <Laptop className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">برنامه میزبان (Host App)</h5>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">Host Environment</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      برنامه اجرایی که دسترسی‌های سیستمی و مجوزها را کنترل می‌کند و پل میان کاربر، مدل و ابزارهاست.
                    </p>
                  </div>

                  {/* Node 2: LLM Core */}
                  <div className="p-3.5 rounded-xl bg-[#141C2E] border border-indigo-500/30 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                        مرحله ۲
                      </span>
                      <Bot className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">هسته مدل (LLM Core)</h5>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">Reasoning & Tool Selection</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      درخواست را تحلیل کرده و در قالب متنی ساختاریافته (JSON) درخواست فراخوانی ابزار صادر می‌کند.
                    </p>
                  </div>

                  {/* Node 3: Authorized Tools */}
                  <div className="p-3.5 rounded-xl bg-[#141C2E] border border-emerald-500/30 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        مرحله ۴
                      </span>
                      <Wrench className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">ابزارهای مجاز (Tools)</h5>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">Authorized Handlers</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      توابع تعریف‌شده توسط برنامه میزبان که با تایید اعتبار و مجوز، با سیستم‌های خارجی تبادل داده می‌کنند.
                    </p>
                  </div>

                  {/* Node 4: External Systems */}
                  <div className="p-3.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        مرحله ۵
                      </span>
                      <Database className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">سیستم‌های خارجی</h5>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">Databases, APIs, OS</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      پایگاه‌های داده سازمانی، سرویس‌های ابری و فایل‌سیستم که فقط با ابزار مجاز پاسخ می‌دهند.
                    </p>
                  </div>
                </div>

                {/* Flow Sequence Bar */}
                <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-center gap-2" dir="ltr">
                  <span className="text-cyan-300 font-sans font-bold">گردش داده:</span>
                  <span className="text-slate-400">User</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-cyan-400">Host Application</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-indigo-400">LLM (Tool Call Spec)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-cyan-400">Host (Validation)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-emerald-400">Tool Execution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-cyan-400">Host (Inject to Context)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-emerald-300 font-bold">Final Response</span>
                </div>
              </div>

              {/* State B Key Scientific Rule */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">نقش محوری برنامه میزبان: </span>
                  مدل زبانی هرگز مستقیماً به دیتابیس وصل نمی‌شود؛ مدل تنها متنی در قالب مشخص صادر می‌کند و برنامه میزبان است که ابزار را صدا زده و خروجی آن را در بافتار زمان اجرا (<span className="font-mono text-cyan-300" dir="ltr">Runtime Context</span>) در اختیار مدل می‌گذارد.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
