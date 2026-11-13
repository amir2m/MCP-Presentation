'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Terminal, Database, Server, ShieldAlert, Layers, ChevronDown, XCircle, ArrowRightLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function WhatMcpIsNotSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const misconceptions = [
    {
      id: 'not-llm',
      title: '۱. مدل زبانی (LLM) نیست',
      titleEnglish: 'Not an AI Model',
      icon: Brain,
      color: 'text-rose-400',
      border: 'border-slate-800',
      bg: 'bg-[#101726]',
      summary: 'فاقد شبکه عصبی، ماتریس وزن‌ها و توانایی ادراک یا تولید متن است.',
      desc: 'مدل زبانی هوش و استدلال را در برنامه میزبان فراهم می‌سازد؛ MCP صرفاً لوله‌کشی استاندارد ارتباطی (Communication Plumbing) است، نه هوش محاسباتی.',
    },
    {
      id: 'not-tool-calling',
      title: '۲. فراخوانی ابزار (Tool Calling) نیست',
      titleEnglish: 'Not Tool Calling Itself',
      icon: Terminal,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40 ring-1 ring-cyan-500/20',
      bg: 'bg-cyan-950/20',
      isSpecial: true,
      summary: 'Tool Calling شیوه بیان نیاز مدل در جریان کار است؛ MCP پروتکل استاندارد اتصال برنامه به قابلیت‌های بیرونی است.',
      desc: 'میزبان تعاریف ابزارها را در اختیار مدل می‌گذارد و مدل درخواست ساختاریافته تولید می‌کند. برنامه از طریق پروتکل MCP این قابلیت‌ها را به شکل استاندارد از سرورها کشف کرده و اجرا را مدیریت می‌کند؛ این دو مفهوم مکمل یکدیگرند، نه جایگزین هم.',
    },
    {
      id: 'not-database',
      title: '۳. پایگاه داده (Database) نیست',
      titleEnglish: 'Not a Data Store',
      icon: Database,
      color: 'text-rose-400',
      border: 'border-slate-800',
      bg: 'bg-[#101726]',
      summary: 'هیچ داده یا فایلی را در خود ذخیره نمی‌کند و مخزن داده اختصاصی ندارد.',
      desc: 'پروتکل MCP در نقش پل عمل می‌کند؛ یعنی به دیتابیس‌های موجود (نظیر PostgreSQL یا اسناد) متصل شده و داده‌ها را با فرمتی استاندارد به کلاینت منتقل می‌نماید.',
    },
    {
      id: 'not-runtime',
      title: '۴. موتور اجرای مستقل (Execution Runtime) نیست',
      titleEnglish: 'Not an Execution Engine',
      icon: Server,
      color: 'text-rose-400',
      border: 'border-slate-800',
      bg: 'bg-[#101726]',
      summary: 'پروتکل کدهای اجرایی را در درون خود اجرا نمی‌کند و سندباکس پردازشی نیست.',
      desc: 'کد ابزارها در سرور ابزار یا محیط ایزوله میزبان اجرا می‌شود؛ پروتکل تنها وظیفه قالب‌بندی درخواست، ارسال پارامترها و بازگرداندن پاسخ را بر عهده دارد.',
    },
    {
      id: 'not-security-shield',
      title: '۵. سپر امنیتی خودکار (Security Guarantee) نیست',
      titleEnglish: 'Not a Magic Security Shield',
      icon: ShieldAlert,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-950/15',
      summary: 'پروتکل به تنهایی ضامن خودکار امنیت نیست و مجوزدهی یکسان برای تمام ارتباطات ایجاد نمی‌کند.',
      desc: 'پروتکل MCP الگوهای ارتباطی و سازوکارهای مرتبط با مجوزدهی را برای سناریوهای کاربردی تعریف می‌کند، اما امنیت نهایی وابسته به پیاده‌سازی و پیکربندی میزبان، سرور، لایه انتقال و سیاست کنترل دسترسی است.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30">
          بخش ۳.۵ • مرزبندی‌های علمی و ابطال سوءبرداشت‌ها
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          پنج تفکیک حیاتی: <span className="font-mono text-rose-400" dir="ltr">MCP</span> چه چیزی نیست؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          برای درک جایگاه دقیق معماری یک فناوری، زدودن سوءبرداشت‌ها به اندازه شناخت خود آن اهمیت دارد.
        </p>
      </div>

      {/* Misconceptions Grid Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-rose-500/25 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              تفکیک هویتی پروتکل ارتباطی از سایر اجزای پشته هوش مصنوعی
            </span>
          </div>

          <span className="text-xs text-slate-400 font-sans">
            ابطال ۵ توهم رایج مهندسی
          </span>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {misconceptions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border ${item.border} ${item.bg} space-y-2.5 transition-all flex flex-col justify-between ${
                  item.isSpecial ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                      <h4 className="font-bold text-slate-100 text-sm">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400" dir="ltr">
                      {item.titleEnglish}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-300 font-sans leading-relaxed">
                    {item.summary}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                    {item.desc}
                  </p>
                </div>

                {item.isSpecial && (
                  <div className="mt-2 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 flex items-center gap-2 font-sans">
                    <ArrowRightLeft className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>
                      <strong>هم‌افزایی دو مفهوم:</strong> فراخوانی ابزار (Tool Calling) سازوکار درخواست ابزار توسط مدل است؛ MCP پروتکل استاندارد ارتباط میان برنامه‌های سازگار و سرورهای قابلیت‌هاست.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Collapsible Speaker Notes */}
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
                <div className="mt-3 p-4 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5 font-sans">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>متن گفتاری گوینده:</span>
                  </div>
                  <p>
                    «به یکی از کلیدی‌ترین اسلایدهای این ارائه رسیدیم: زدودن توهمات رایج فنی. در دنیای مهندسی بسیار پیش می‌آید که افراد مفاهیم را خلط کنند. اولاً: MCP یک مدل زبانی جدید نیست؛ MCP تفکر نمی‌کند و وزنی ندارد. ثانیاً: MCP همان قابلیت فراخوانی ابزار یا Tool Calling نیست! مدل زبانی قابلیت ساختاریافته درخواست ابزار را دارد؛ این برنامه میزبان است که با پروتکل MCP فهرست این قابلیت‌ها را از سرورها کشف کرده و اجرا را هدایت می‌کند. این دو مکمل هم هستند. ثالثاً: MCP خودش دیتابیس نیست و داده‌ای ذخیره نمی‌کند. رابعاً: پروتکل کد اجرا نمی‌کند؛ کد واقعی در سرور ابزار یا سیستم‌عامل اجرا می‌شود. و در نهایت، MCP به خودی خود تضمین‌کننده امنیت نیست؛ امنیت و احراز هویت به نحوه استقرار، لایه انتقال و سیاست‌های برنامه میزبان وابسته است و میزبان می‌تواند برای اقدامات حساس تأییدیه کاربر را جویا شود.»
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
