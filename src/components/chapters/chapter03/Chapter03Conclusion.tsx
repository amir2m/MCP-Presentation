'use client';

import React from 'react';
import { ArrowLeft, HelpCircle, Network, Cpu, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_03_PRESENTER_NOTES } from './presenterNotes';

interface Chapter03ConclusionProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter03Conclusion({ onSelectChapter }: Chapter03ConclusionProps) {

  const teaserQuestions = [
    {
      id: 1,
      q: 'این استاندارد در عمل از چه بازیگرانی تشکیل شده است؟',
      hint: 'تفکیک برنامه کاربردی و میزبان از لایه ارتباطی کلاینت و سرورهای خارجی.',
      icon: Network,
    },
    {
      id: 2,
      q: 'نقش‌های سه‌گانه Host، Client و Server چگونه همکاری می‌کنند؟',
      hint: 'آشنایی مفهومی با تعامل میان میزبان، کلاینت و سرورهای قابلیت‌ها.',
      icon: Cpu,
    },
    {
      id: 3,
      q: 'ابزارها، منابع اطلاعاتی و پرامپت‌ها چگونه در کد نرم‌افزار ارائه می‌شوند؟',
      hint: 'پیش‌نمایش مسیر کشف و استفاده از قابلیت‌ها در فصل چهارم.',
      icon: Terminal,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۳.۶ • پیش‌نمایش گام بعدی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          از ایده تا عمل: کالبدشکافی معماری <span className="font-mono text-cyan-300" dir="ltr">MCP</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          تا اینجا فهمیدیم MCP چیست و چرا به یک استاندارد مشترک نیاز داریم. اما این ارتباط در عمل چگونه برقرار می‌شود؟ چه اجزایی در این فرایند نقش دارند و پیام‌ها چگونه میان آن‌ها جابه‌جا می‌شوند؟
        </p>
      </div>

      {/* Main Bridge Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              پرسش‌های بنیادین مهندسی برای ورود به عمق معماری
            </span>
          </div>

          <span className="text-xs font-mono text-cyan-300/80" dir="ltr">
            Chapter 04 Preview Teaser
          </span>
        </div>

        {/* 3 Core Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teaserQuestions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0e1726] border border-slate-800 hover:border-cyan-500/30 transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-relaxed font-sans">
                    {item.q}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1 border-t border-slate-800/80">
                  {item.hint}
                </p>
              </div>
            );
          })}
        </div>

        {/* Abstract Architectural Teaser Visual */}
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80">
          <div className="text-center text-xs text-slate-400 mb-4">
            پیش‌نمایش شماتیک ارکان معماری MCP (در فصل چهارم کالبدشکافی خواهد شد):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            
            <div className="p-4 rounded-xl bg-[#141C2E] border border-cyan-500/30 space-y-1">
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block" dir="ltr">
                Role 1
              </span>
              <div className="text-xs sm:text-sm font-bold text-white font-mono" dir="ltr">
                Host Application
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                برنامه میزبان کاربر و نقطه اتصال مدل هوش مصنوعی
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141C2E] border border-indigo-500/30 space-y-1">
              <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold block" dir="ltr">
                Role 2
              </span>
              <div className="text-xs sm:text-sm font-bold text-white font-mono" dir="ltr">
                MCP Client
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                مؤلفه اتصال پروتکل و هدایت ارتباطات استاندارد
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141C2E] border border-amber-500/30 space-y-1">
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block" dir="ltr">
                Role 3
              </span>
              <div className="text-xs sm:text-sm font-bold text-white font-mono" dir="ltr">
                MCP Server
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                تأمین‌کننده قابلیت‌ها (ابزارها، منابع داده و پرامپت‌ها)
              </div>
            </div>

          </div>
        </div>

        {/* Transition CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-[#121B30] to-cyan-950/50 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Badge variant="cyan" size="sm">
                گام بعدی
              </Badge>
              <span className="text-xs text-cyan-300 font-mono" dir="ltr">
                Chapter 04 Preview
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              ادامه مسیر: معماری و اجزای MCP (فصل چهارم)
            </h4>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              بررسی عمیق نقش‌های سه‌گانه میزبان (Host)، کلاینت (Client) و سرور (Server) و چگونگی سازمان‌دهی ارتباطات پروتکل در فصل بعدی.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            onClick={() => onSelectChapter?.(4)}
            iconEnd={<ArrowLeft className="w-4 h-4" />}
            className="shrink-0 text-xs sm:text-sm shadow-lg shadow-cyan-950/40"
          >
            ورود به فصل چهارم: معماری و اجزای MCP
          </Button>
        </div>

      </Card>

      {/* Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_03_PRESENTER_NOTES[5]} />
    </div>
  );
}
