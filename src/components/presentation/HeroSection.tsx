'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  Layers,
  Sparkles,
  Database,
  FolderGit2,
  Globe,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

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

          {/* Left Column: Abstract Animated AI Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-gradient-to-b from-[#141C2E]/80 to-[#0F1626]/90 border border-indigo-500/25 p-6 backdrop-blur-xl shadow-2xl shadow-indigo-950/60 overflow-hidden flex items-center justify-center">
              
              {/* Radial background behind the diagram */}
              <div className="absolute inset-0 bg-radial-glow opacity-80" />

              {/* Animated SVG Vector Graphic */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connecting vectors from center to external tools */}
                <g stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" strokeDasharray="4 4">
                  {/* To Database (Top Right) */}
                  <line x1="200" y1="200" x2="310" y2="100" />
                  {/* To File System (Top Left) */}
                  <line x1="200" y1="200" x2="90" y2="100" />
                  {/* To Terminal (Bottom Left) */}
                  <line x1="200" y1="200" x2="90" y2="300" />
                  {/* To Web APIs (Bottom Right) */}
                  <line x1="200" y1="200" x2="310" y2="300" />
                </g>

                {/* Animated Glowing Pulses traveling on paths */}
                <motion.circle
                  r="4"
                  fill="#22D3EE"
                  initial={{ cx: 200, cy: 200 }}
                  animate={{
                    cx: [200, 310, 200],
                    cy: [200, 100, 200],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                />
                <motion.circle
                  r="4"
                  fill="#6366F1"
                  initial={{ cx: 200, cy: 200 }}
                  animate={{
                    cx: [200, 90, 200],
                    cy: [200, 100, 200],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 2.8, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.circle
                  r="4"
                  fill="#22D3EE"
                  initial={{ cx: 200, cy: 200 }}
                  animate={{
                    cx: [200, 90, 200],
                    cy: [200, 300, 200],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: "easeInOut" }}
                />
                <motion.circle
                  r="4"
                  fill="#6366F1"
                  initial={{ cx: 200, cy: 200 }}
                  animate={{
                    cx: [200, 310, 200],
                    cy: [200, 300, 200],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.0, delay: 1.5, ease: "easeInOut" }}
                />

                {/* Outer concentric protocol rings */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="85"
                  stroke="rgba(34, 211, 238, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                  style={{ transformOrigin: '200px 200px' }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="135"
                  stroke="rgba(99, 102, 241, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
                  style={{ transformOrigin: '200px 200px' }}
                />

                {/* Center Node: MCP Protocol Engine & Host */}
                <g>
                  {/* Glowing halo */}
                  <circle cx="200" cy="200" r="50" fill="url(#center-glow)" />
                  <circle cx="200" cy="200" r="42" fill="#141C2E" stroke="#6366F1" strokeWidth="2.5" />
                  <circle cx="200" cy="200" r="36" fill="#1E293B" stroke="#22D3EE" strokeWidth="1.5" />
                </g>

                {/* Center Gradient Definition */}
                <defs>
                  <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Center HTML Overlay Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-mono font-black text-cyan-300 text-sm tracking-wider">
                    MCP
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    Protocol Hub
                  </div>
                </div>
              </div>

              {/* Orbiting Satellite Node: Database */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute top-10 right-10 bg-[#141C2E] border border-cyan-400/40 rounded-xl p-2.5 shadow-lg shadow-cyan-950/40 flex items-center gap-2 text-xs"
              >
                <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[11px] text-slate-200">Database</span>
                  <span className="text-[9px] text-cyan-400">منابع داده (Resources)</span>
                </div>
              </motion.div>

              {/* Orbiting Satellite Node: File System */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ repeat: Infinity, duration: 3.6, delay: 0.5, ease: 'easeInOut' }}
                className="absolute top-10 left-10 bg-[#141C2E] border border-indigo-500/40 rounded-xl p-2.5 shadow-lg shadow-indigo-950/40 flex items-center gap-2 text-xs"
              >
                <div className="p-1.5 rounded-lg bg-indigo-950/80 text-indigo-400">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[11px] text-slate-200">FileSystem</span>
                  <span className="text-[9px] text-indigo-300">سیستم فایل محلی</span>
                </div>
              </motion.div>

              {/* Orbiting Satellite Node: Terminal / Execution */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4.2, delay: 1, ease: 'easeInOut' }}
                className="absolute bottom-10 left-10 bg-[#141C2E] border border-amber-500/30 rounded-xl p-2.5 shadow-lg shadow-amber-950/40 flex items-center gap-2 text-xs"
              >
                <div className="p-1.5 rounded-lg bg-amber-950/80 text-amber-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[11px] text-slate-200">Tools / CLI</span>
                  <span className="text-[9px] text-amber-300">ابزارهای اجرایی</span>
                </div>
              </motion.div>

              {/* Orbiting Satellite Node: Web APIs */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ repeat: Infinity, duration: 3.8, delay: 1.5, ease: 'easeInOut' }}
                className="absolute bottom-10 right-10 bg-[#141C2E] border border-cyan-500/30 rounded-xl p-2.5 shadow-lg shadow-cyan-950/40 flex items-center gap-2 text-xs"
              >
                <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[11px] text-slate-200">Web / APIs</span>
                  <span className="text-[9px] text-cyan-300">سرویس‌های ابری</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
