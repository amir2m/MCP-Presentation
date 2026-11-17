'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Cpu,
  Network,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Server,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TriadTab } from './types';
import { TRIAD_LAYERS, CONSTANTS } from './mockData';

export function TechnologyTriadViewer() {
  const [activeTab, setActiveTab] = useState<TriadTab>('model-function-calling');
  const activeDetail = TRIAD_LAYERS.find((t) => t.id === activeTab) || TRIAD_LAYERS[0];

  return (
    <div className="space-y-6" id="technology-triad-viewer">
      {/* 1. Triad Tab Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#090E1A] border border-slate-800">
        <div className="flex items-center gap-2 px-2 text-xs text-slate-300">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="font-bold">انتخاب لایه برای تحلیل تطبیقی:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('api-layer')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'api-layer'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>۱. وب‌سرویس و OpenAPI (API)</span>
          </button>

          <button
            onClick={() => setActiveTab('model-function-calling')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'model-function-calling'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>۲. فراخوانی تابع مدل (Function Calling)</span>
          </button>

          <button
            onClick={() => setActiveTab('mcp-protocol')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mcp-protocol'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>۳. پروتکل زمینه مدل (MCP)</span>
          </button>
        </div>
      </div>

      {/* 2. Detail Card with Code Snippet and Roles */}
      <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/20 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Header of Active Tab */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      activeTab === 'api-layer'
                        ? 'success'
                        : activeTab === 'model-function-calling'
                        ? 'outline'
                        : 'cyan'
                    }
                    size="sm"
                  >
                    {activeDetail.badge}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400" dir="ltr">
                    {activeDetail.titleEnglish}
                  </span>
                </div>
                <h4 className="text-base sm:text-xl font-bold text-white">
                  {activeDetail.titlePersian}
                </h4>
              </div>

              <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                {activeDetail.roleDescription}
              </div>
            </div>

            {/* Split View: Key Responsibilities & Code Snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Responsibilities & Scientific Boundary (5 cols) */}
              <div className="lg:col-span-5 space-y-4 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-slate-200 block text-xs sm:text-sm">
                    وظایف و کارکردهای اصلی این لایه:
                  </span>
                  <ul className="space-y-2 text-slate-300">
                    {activeDetail.keyResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scientific Demarcation Alert */}
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-purple-300">
                    <AlertCircle className="w-4 h-4 text-purple-400" />
                    <span>مرزبندی علمی دقیق:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-purple-200/90">
                    {activeDetail.scientificDemarcation}
                  </p>
                </div>
              </div>

              {/* Right Column: Code Snippet (7 cols) */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    {activeDetail.codeSnippetTitle}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500" dir="ltr">
                    {activeTab === 'mcp-protocol' ? 'Spec 2026-07-28' : 'Schema Form'}
                  </span>
                </div>

                <div className="rounded-xl bg-[#070b14] border border-slate-800 p-4 overflow-x-auto text-[11px] font-mono text-slate-200" dir="ltr">
                  <pre className="leading-relaxed whitespace-pre font-mono">
                    <code>{activeDetail.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. The Coexistence Flow Diagram (How All 3 Work Together) */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              یک معماری نمونه هم‌افزا (نه یک توالی الزامی در تمام برنامه‌های MCP): این سه فناوری چگونه تعامل می‌کنند؟
            </span>
            <Badge variant="outline" size="sm" className="text-[10px]">
              هم‌پوشانی ندارند؛ مکمل هستند
            </Badge>
          </div>

          {/* Stepper Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-slate-200">گام ۱: درخواست کاربر</span>
                <span className="font-mono text-[10px] text-indigo-400">01</span>
              </div>
              <p className="text-[11px] text-slate-400">
                کاربر می‌پرسد: «آیا قطعه {CONSTANTS.SKU} در انبار موجود است؟»
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
              <div className="flex items-center justify-between text-purple-300">
                <span className="font-bold text-purple-200">گام ۲: Function Calling</span>
                <span className="font-mono text-[10px] text-purple-400">02</span>
              </div>
              <p className="text-[11px] text-slate-300">
                مدل زبانی قصد خود را با شیء ساختاریافته نام تابع و آرگومان به برنامه میزبان اعلام می‌کند.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between text-cyan-300">
                <span className="font-bold text-cyan-200">گام ۳: پروتکل MCP</span>
                <span className="font-mono text-[10px] text-cyan-400">03</span>
              </div>
              <p className="text-[11px] text-slate-300">
                کلاینت MCP برنامه میزبان، فریم استاندارد tools/call را به سرور MCP انبار ارسال می‌کند.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-emerald-300">
                <span className="font-bold text-emerald-200">گام ۴: REST API و مسیر کامل بازگشت</span>
                <span className="font-mono text-[10px] text-emerald-400">04</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                سرور وب‌سرویس انبار را خوانده و نتیجه را در فریم JSON-RPC بازمی‌گرداند؛ کلاینت MCP داده را به میزبان و میزبان آن را به کانتکست مدل می‌سپارد:
                <span className="block mt-1 font-mono text-[10px] text-emerald-300/90" dir="ltr">
                  REST ──► MCP Server ──► MCP Client ──► Host ──► Model
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
