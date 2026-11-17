'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ChevronDown,
  Sparkles,
  Compass,
  Globe2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TechnologyTriadViewer } from './TechnologyTriadViewer';
import { SPEAKER_NOTES, CONSTANTS, STREAMABLE_HTTP_HEADER_DETAILS } from './mockData';

export function FunctionCallingSpectrumSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-06-5-function-calling-spectrum">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۶.۵ • تفکیک معماری
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۵ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تفکیک سه‌گانه: <span className="font-mono text-purple-300" dir="ltr">Function Calling</span>، پروتکل{' '}
          <span className="font-mono text-cyan-300" dir="ltr">MCP</span> و اتصالات سفارشی
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Function Calling قابلیت تصمیم‌گیری درون مدل است؛ MCP پروتکل استاندارد ارتباطی کلاینت-سرور است؛ و REST API سبک پیاده‌سازی سرویس است. این فناوری‌ها رقیب یکدیگر نیستند، بلکه کاملاً مکملند.
        </p>
      </div>

      {/* 2. Interactive Technology Triad Viewer */}
      <TechnologyTriadViewer />

      {/* 3. Discovery Protocol Scope & Streamable HTTP Headers Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Discovery Scope Card */}
        <Card variant="solid" className="p-4 sm:p-5 border-indigo-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>قلمرو پروتکل کشف در نگارش 2026-07-28</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            در نگارش <span className="font-mono text-cyan-300" dir="ltr">{CONSTANTS.PROTOCOL_VERSION}</span>، متد{' '}
            <span className="font-mono text-cyan-300" dir="ltr">server/discover</span>{' '}
            برای سرورها الزامی (<span className="font-mono text-amber-300" dir="ltr">MUST</span>) است تا اطلاعات کشف و نسخه‌بندی را اعلام کنند و کلاینت‌ها مجازند (<span className="font-mono text-indigo-300" dir="ltr">MAY</span>) آن را پیش از سایر متدها فرابخوانند.
          </p>
          <div className="space-y-1.5 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200">
            <p>
              <strong>تفکیک کاتالوگ:</strong> متد <span className="font-mono" dir="ltr">server/discover</span> جایگزین متدهای دریافت کاتالوگ <span className="font-mono" dir="ltr">tools/list</span> یا <span className="font-mono" dir="ltr">resources/list</span> نمی‌شود.
            </p>
            <p className="text-slate-400">
              کشف خودکار پروتکل هرگز جایگزین طراحی دقیق شماها، مستندات انسانی، احراز هویت و سیاست‌های مجوزدهی نمی‌شود.
            </p>
          </div>
        </Card>

        {/* Streamable HTTP Headers Card */}
        <Card variant="solid" className="p-4 sm:p-5 border-cyan-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>هدرهای الزامی و مشروط ترابری Streamable HTTP</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            در بستر ترابری شبکه Streamable HTTP، پروتکل MCP از هدرهای استاندارد HTTP برای اعلام نگارش و متدها بهره می‌برد:
          </p>
          <div className="space-y-2 text-[11px]">
            {STREAMABLE_HTTP_HEADER_DETAILS.map((item) => (
              <div key={item.name} className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono" dir="ltr">
                  <span className="font-bold text-cyan-300">{item.name}</span>
                  <Badge
                    variant={item.status.includes('MUST') ? 'cyan' : 'outline'}
                    size="sm"
                    className="text-[9px]"
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">{item.scope}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
                {SPEAKER_NOTES.section5}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
