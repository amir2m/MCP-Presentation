'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Cpu,
  Network,
  Database,
  ArrowDownUp,
  ChevronDown,
  Globe,
  FileCode,
  Boxes,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ArchitectureOverviewSection() {
  const [activeLayer, setActiveLayer] = useState<'all' | 'data' | 'transport'>('all');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const dataLayerFeatures = [
    {
      title: 'معناشناسی پیام‌های پروتکل',
      desc: 'تعریف ساختارهای استاندارد JSON-RPC 2.0 شامل Request، Response و Notification.',
      icon: FileCode,
    },
    {
      title: 'مدیریت قابلیت‌های سه‌گانه',
      desc: 'عرضه و مدیریت یکپارچه ابزارها (Tools)، منابع داده‌ای (Resources) و پرامپت‌ها (Prompts).',
      icon: Boxes,
    },
    {
      title: 'کشف پویا و اعتبارسنجی',
      desc: 'پشتیبانی از متد استاندارد server/discover و مدیریت فراداده‌های نسخه و قابلیت‌ها در _meta.',
      icon: Database,
    },
  ];

  const transportLayerFeatures = [
    {
      title: 'فریم‌بندی پیام‌ها (Message Framing)',
      desc: 'جداسازی پیام‌ها با خط جدید (\\n) در STDIO و انتقال بدنه در درخواست‌های HTTP POST.',
      icon: ArrowDownUp,
    },
    {
      title: 'تحویل فیزیکی و مدیریت اتصال',
      desc: 'جابه‌جایی بسته‌ها روی لوله‌های سیستم‌عامل (Pipes) یا پروتکل شبکه وب (HTTP/HTTPS).',
      icon: Network,
    },
    {
      title: 'فراداده ترابری، لغو و استریم',
      desc: 'مدیریت هدرهای ترابری، سیگنال‌های لغو (Cancellation) و جریان داده‌ها با Server-Sent Events.',
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-04-1-architecture-overview">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۴.۱ • کالبدشکافی ساختار کلان
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تفکیک لایه داده از لایه انتقال در معماری{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            MCP
          </span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          معماری Model Context Protocol بر پایه یک اصل بنیادین مهندسی طراحی شده است:{' '}
          <strong className="text-cyan-300">
            جداسازی کامل معناشناسی پیام‌ها (Data Layer) از شیوه فیزیکی ارسال آن‌ها (Transport Layer).
          </strong>
        </p>
      </div>

      {/* Main Interactive Schematic Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        {/* Card Header & Layer Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              پشته دولایه‌ای معماری پروتکل (<span className="font-mono text-cyan-300 text-xs sm:text-sm" dir="ltr">Two-Layer Architecture Stack</span>)
            </span>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090E1A] border border-slate-800">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'all'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              نمایش هر دو لایه
            </button>
            <button
              onClick={() => setActiveLayer('data')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'data'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              لایه داده (Data Layer)
            </button>
            <button
              onClick={() => setActiveLayer('transport')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'transport'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-indigo-300'
              }`}
            >
              لایه انتقال (Transport Layer)
            </button>
          </div>
        </div>

        {/* 2D Layered Stack Visual Diagram */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80 space-y-4">
          {/* Top Tier: Application / Model */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-900 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">
                  برنامه میزبان کاربر و مدل زبانی (<span className="font-mono text-xs text-indigo-300" dir="ltr">Host Application & LLM Core</span>)
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  محیط اجرایی هوش مصنوعی، مغز استنتاج، تصمیم‌گیری پیرامون ابزار و تجمیع کانتکست
                </div>
              </div>
            </div>
            <Badge variant="indigo" size="sm" isLTR>
              Host Level
            </Badge>
          </div>

          {/* Central Tier: Data Layer (Cyan) */}
          <motion.div
            animate={{
              opacity: activeLayer === 'transport' ? 0.35 : 1,
              scale: activeLayer === 'data' ? 1.01 : 1,
            }}
            transition={{ duration: 0.25 }}
            className={`p-5 rounded-xl border transition-all ${
              activeLayer === 'data'
                ? 'bg-cyan-950/30 border-cyan-400/60 shadow-lg shadow-cyan-950/40'
                : 'bg-cyan-950/15 border-cyan-500/30'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-extrabold text-cyan-300">
                  لایه داده (<span className="font-mono" dir="ltr">Data Layer</span>) — معناشناسی و عملیات پروتکل
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20" dir="ltr">
                JSON-RPC 2.0 Semantic Core
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {dataLayerFeatures.map((f, idx) => {
                const IconComponent = f.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#0e1628] border border-cyan-500/15 space-y-1"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <IconComponent className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{f.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom Tier: Transport Layer (Indigo) */}
          <motion.div
            animate={{
              opacity: activeLayer === 'data' ? 0.35 : 1,
              scale: activeLayer === 'transport' ? 1.01 : 1,
            }}
            transition={{ duration: 0.25 }}
            className={`p-5 rounded-xl border transition-all ${
              activeLayer === 'transport'
                ? 'bg-indigo-950/30 border-indigo-400/60 shadow-lg shadow-indigo-950/40'
                : 'bg-indigo-950/15 border-indigo-500/30'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-sm font-extrabold text-indigo-300">
                  لایه انتقال (<span className="font-mono" dir="ltr">Transport Layer</span>) — تحویل و فریم‌بندی فیزیکی
                </span>
              </div>
              <span className="text-[11px] font-mono text-indigo-400/90 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20" dir="ltr">
                STDIO & Streamable HTTP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {transportLayerFeatures.map((f, idx) => {
                const IconComponent = f.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#0e1628] border border-indigo-500/15 space-y-1"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <IconComponent className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{f.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Key Takeaway Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/20 via-[#10192D] to-indigo-950/20 border border-slate-700/60 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-200 block">
              اصل استقلال لایه‌ها (Separation of Concerns):
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              «همان پیام استانداردی که به صورت محلی از طریق ترمینال فرستاده می‌شود، می‌تواند بدون تغییر در ساختار و معناشناسی لایه داده، از بستر وب به یک سرور ابری در آن سوی دنیا ارسال گردد.»
            </p>
          </div>
        </div>

        {/* Collapsible Presenter Notes */}
        <div className="pt-2 border-t border-slate-800/80">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            iconEnd={
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showSpeakerNotes ? 'rotate-180' : ''
                }`}
              />
            }
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            {showSpeakerNotes ? 'بستن یادداشت سخنران' : 'مشاهده یادداشت سخنران (Presenter Notes)'}
          </Button>

          <AnimatePresence>
            {showSpeakerNotes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5 font-sans">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>متن گفتاری گوینده:</span>
                  </div>
                  <p>
                    «به فصل چهارم و قلب فنی ارائه خود خوش آمدید. وقتی به Model Context Protocol به عنوان یک استاندارد مهندسی نگاه می‌کنیم، نخستین اصل برجسته، تفکیک کامل لایه داده از لایه انتقال است. لایه داده یا Data Layer مشخص می‌کند که پیام‌ها چه معنایی دارند: ساختار پیام‌های JSON-RPC، متدها، چگونه یک ابزار تعریف می‌شود، چگونه یک منبع اطلاعاتی خوانده می‌شود و قالب پاسخ‌ها چیست. در مقابل، لایه انتقال یا Transport Layer صرفاً جابجایی فیزیکی بایت‌ها نیست؛ بلکه نحوه فریم‌بندی پیام‌ها، تحویل آن‌ها، فراداده‌های اختصاصی ترابری، نحوه لغو درخواست‌ها و ویژگی‌های اتصالی و جریانی را مدیریت می‌کند—خواه روی لوله‌های استاندارد سیستم‌عامل (STDIO) باشد، خواه روی پروتکل وب (Streamable HTTP). این تفکیک هوشمندانه باعث می‌شود که توسعه‌دهنده سرور ابزار، تنها یک بار منطق سرویس خود را بنویسد و نگران شیوه انتقال کلاینت‌ها نباشد.»
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
