'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  Network,
  Cpu,
  Workflow,
  ArrowLeftRight,
  ShieldCheck,
  Database,
  Server,
  Monitor,
  Terminal,
  Quote,
  ChevronLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SYNTHESIS_CHAPTER_NODES } from './mockData';
import { SynthesisChapterNode } from './types';

interface GrandSynthesisBoardProps {
  onSelectChapter?: (chapterId: number) => void;
}

const ICON_MAP = {
  Sparkles,
  Layers,
  Network,
  Cpu,
  Workflow,
  ArrowLeftRight,
  ShieldCheck,
};

export function GrandSynthesisBoard({ onSelectChapter }: GrandSynthesisBoardProps) {
  const [activeChapterId, setActiveChapterId] = useState<number>(7);

  const activeNode: SynthesisChapterNode =
    SYNTHESIS_CHAPTER_NODES.find((node) => node.chapterId === activeChapterId) ||
    SYNTHESIS_CHAPTER_NODES[6];

  return (
    <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-6">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h4 className="text-base sm:text-lg font-bold text-white">
              تابلوی سنتز کلان ارائه: پیوستگی هفت فصل آموزش MCP
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            روایت یکپارچه از اتاق ایزوله وزن‌ها تا اتصال استاندارد، امن و قابل‌کنترل به دنیای واقعی
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-cyan-300 self-start sm:self-auto">
          <span>۷ فصل • ۱٬۷۶۰ ثانیه آموزش مهندسی</span>
        </div>
      </div>

      {/* 7 Chapter Nodes Navigation Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {SYNTHESIS_CHAPTER_NODES.map((node) => {
          const isSelected = node.chapterId === activeChapterId;
          const IconComponent = ICON_MAP[node.iconName] || Sparkles;

          return (
            <button
              key={node.chapterId}
              type="button"
              onClick={() => setActiveChapterId(node.chapterId)}
              className={`p-2.5 rounded-xl border text-right transition-all duration-200 flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-indigo-950/60 border-cyan-400/60 shadow-lg shadow-indigo-950/50 scale-[1.02]'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {node.numberPersian}
                </span>
                <IconComponent
                  className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}
                />
              </div>

              <div className="text-[11px] font-bold text-slate-200 line-clamp-1">
                {node.titlePersian}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Chapter Detailed Highlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.chapterId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-xl bg-[#0B1020]/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400">
                {activeNode.numberPersian}: {activeNode.titlePersian}
              </span>
              <span className="text-[10px] font-mono text-slate-500" dir="ltr">
                ({activeNode.titleEnglish})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeNode.coreTakeawayPersian}
            </p>
          </div>

          {onSelectChapter && (
            <button
              type="button"
              onClick={() => onSelectChapter(activeNode.chapterId)}
              className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 hover:border-cyan-400/60 text-xs text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 self-end sm:self-center flex-shrink-0"
            >
              <span>مشاهده مجدد فصل</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Full Architectural Synthesis Diagram */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0F172A]/70 to-[#0B1020]/90 border border-slate-800 space-y-4">
        <div className="text-xs font-bold text-slate-300 flex items-center justify-between pb-2 border-b border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <Network className="w-4 h-4 text-cyan-400" />
            معماری کلی اتصال در یک نگاه (The End-to-End Topology):
          </span>
          <span className="text-[10px] font-mono text-slate-400" dir="ltr">
            Host (M) → Clients → Protocol Wire → Servers (N) → Backend Systems
          </span>
        </div>

        {/* Topology Diagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          {/* Layer 1: AI Host */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
            <div className="w-7 h-7 mx-auto rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Monitor className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">AI Host (میزبان هوش مصنوعی)</div>
            <p className="text-[10px] text-slate-300">
              ادیتور، چت‌بات یا ارکستراتور؛ صاحب رابط کاربری، کنترل دسترسی، گیت تایید انسانی و کلاینت‌ها
            </p>
          </div>

          {/* Layer 2: MCP Clients */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
            <div className="w-7 h-7 mx-auto rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">MCP Clients (کلاینت‌ها)</div>
            <p className="text-[10px] text-slate-300">
              پیاده‌سازی استاندارد پروتکل JSON-RPC 2.0؛ ارتباط ۱:۱ کلاینت با هر سرور به صورت مستقل تحت مدیریت هاست
            </p>
          </div>

          {/* Layer 3: MCP Servers */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
            <div className="w-7 h-7 mx-auto rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">MCP Servers (سرورها)</div>
            <p className="text-[10px] text-slate-300">
              آداپتورهای سبک پروتکلی؛ ارائه ابزارها، منابع و پرامپت‌ها بدون افشای سورس اصلی
            </p>
          </div>

          {/* Layer 4: Underlying Backend */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
            <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Backend Systems (سامانه‌ها)</div>
            <p className="text-[10px] text-slate-300">
              پایگاه‌های PostgreSQL، گیت‌هاب، سرویس‌های REST و فایل‌ها؛ کاملاً دست‌نخورده و ایمن
            </p>
          </div>
        </div>
      </div>

      {/* Golden Conclusion Quote */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/40 border border-indigo-500/30 space-y-2.5">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm">
          <Quote className="w-4 h-4 text-cyan-400" />
          <span>پیام طلایی و جمع‌بندی دانشگاهی ارائه:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          «پروتکل زمینه مدل (<span className="font-mono text-cyan-300" dir="ltr">Model Context Protocol</span>) زبانی مشترک و استاندارد برای تعامل هوش مصنوعی با جهان پیرامون فراهم می‌آورد؛ نه جایگزین سامانه‌ها و <span className="font-mono text-indigo-300" dir="ltr">API</span>های زیرین می‌شود و نه جای قضاوت انسانی، مدیریت امنیت، تعیین مرزهای اعتماد و اصول مهندسی نرم‌افزار را می‌گیرد.»
        </p>
        <div className="pt-1 text-[11px] text-slate-400 font-mono" dir="ltr">
          Model Context Protocol — Agentic AI Foundation / Linux Foundation (August 2026 Spec)
        </div>
      </div>
    </Card>
  );
}
