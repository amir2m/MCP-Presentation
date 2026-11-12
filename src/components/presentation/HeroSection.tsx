'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Hero3DContainer } from './Hero3DContainer';

interface HeroSectionProps {
  onOpenChapters: () => void;
  onStartPresentation: () => void;
}

export function HeroSection({
  onOpenChapters,
  onStartPresentation,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 sm:py-24 bg-tech-grid bg-radial-glow">
      {/* Ambient background glow spheres */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (Text / Pitch in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-right space-y-6"
          >
            {/* Academic & Topic Badge */}
            <div className="inline-flex items-center gap-2 p-1.5 px-3.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ارائه علمی و تخصصی هوش مصنوعی دانشگاهی</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="font-mono text-cyan-300" dir="ltr">~25 Min</span>
            </div>

            {/* Main Presentation Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.3] lg:leading-[1.25]">
              مدلهای زبانی و{' '}
              <span className="bg-gradient-to-l from-cyan-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent inline-block font-bold" dir="ltr">
                Model Context Protocol (MCP)
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-semibold mt-2 block">
                از تولید متن تا تعامل با ابزارهای خارجی
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              چرا مدل‌های زبانی به خودی خود درون یک «اتاق ایزوله» محبوس‌اند؟ چگونه پروتکل باز استاندارد{' '}
              <strong className="text-cyan-300 font-mono font-medium" dir="ltr">MCP</strong> همانند درگاه{' '}
              <span className="text-indigo-300 font-mono" dir="ltr">USB-C</span>، ارتباط امن، یکپارچه و مقیاس‌پذیر هوش مصنوعی را با پایگاه‌های داده، سیستم‌های فایل و ابزارهای دنیای واقعی ممکن می‌سازد؟
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartPresentation}
                iconStart={<Tv className="w-5 h-5" />}
                className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-indigo-600/25"
              >
                شروع ارائه تعاملی
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenChapters}
                iconStart={<Layers className="w-5 h-5 text-cyan-400" />}
                className="w-full sm:w-auto text-base px-6 py-3.5"
              >
                مشاهده سرفصل‌ها
              </Button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 w-full text-slate-300 text-xs">
              <div className="flex items-center gap-2 bg-[#141C2E]/60 p-2.5 rounded-xl border border-slate-800">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>حالت اسکرول و اسلاید</span>
              </div>
              <div className="flex items-center gap-2 bg-[#141C2E]/60 p-2.5 rounded-xl border border-slate-800">
                <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                <span dir="ltr">JSON-RPC 2.0</span>
              </div>
              <div className="flex items-center gap-2 bg-[#141C2E]/60 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>معماری امن و ایزوله</span>
              </div>
              <div className="flex items-center gap-2 bg-[#141C2E]/60 p-2.5 rounded-xl border border-slate-800">
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <span>کوئیزهای تعاملی</span>
              </div>
            </div>
          </motion.div>

          {/* Left Column: 3D Connected AI Tool Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <Hero3DContainer />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
