'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Database, Sparkles, Globe, Layers, ChevronDown, ShieldCheck, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function McpDefinitionSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const primitives = [
    {
      id: 'tools',
      title: 'ابزارها (Tools)',
      titleEnglish: 'Callable Capabilities',
      role: 'قابلیت‌های اجرایی با امکان تغییر وضعیت یا واکشی داده',
      controller: 'فراخوانی با درخواست مدل / مدیریت توسط میزبان',
      desc: 'توابع و امکاناتی که سرور عرضه می‌کند و مدل می‌تواند استفاده از آن‌ها را درخواست کند؛ میزبان بسته به ریسک عملیات ممکن است تأیید کاربر را جویا شود.',
      icon: Wrench,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'resources',
      title: 'منابع اطلاعاتی (Resources)',
      titleEnglish: 'Contextual Data & Content',
      role: 'داده‌ها و محتوای زمینه‌ای برای مدل',
      controller: 'انتخاب و ارسال توسط برنامه میزبان',
      desc: 'داده‌ها یا محتوایی که سرور مهیا می‌کند تا برنامه بتواند آن‌ها را انتخاب کرده و به عنوان زمینه (Context) در اختیار مدل بگذارد؛ نه لزوماً بارگذاری خودکار تمام داده‌ها.',
      icon: Database,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30 hover:border-indigo-400/60',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'prompts',
      title: 'الگوهای پرامپت (Prompts)',
      titleEnglish: 'Workflow Templates',
      role: 'الگوها و گردش‌کارهای آماده هدایت‌کننده',
      controller: 'انتخاب‌شده توسط کاربر یا برنامه میزبان',
      desc: 'قالب‌های آماده پیام و دستورالعمل‌های ساختاریافته که سرور به برنامه پیشنهاد می‌دهد تا کاربر یا میزبان مدل را در مسیری استاندارد هدایت کند.',
      icon: Sparkles,
      color: 'text-amber-400',
      border: 'border-amber-500/30 hover:border-amber-400/60',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۳.۴ • تعریف رسمی استاندارد
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تعریف دقیق <span className="font-mono text-cyan-300" dir="ltr">Model Context Protocol</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          یک زبان و استاندارد مشترک برای اتصال امن، ساختاریافته و بی‌طرفانه هوش مصنوعی به منابع و ابزارهای دنیای واقعی.
        </p>
      </div>

      {/* Main Definition & Primitives Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        
        {/* Official Definition Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#121B30] to-indigo-950/40 border border-cyan-400/40 shadow-xl shadow-cyan-950/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5" dir="ltr">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Official Specification Definition
            </span>
            <span className="text-[11px] text-slate-400 font-sans">
              استاندارد باز ارتباطی
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
            «<strong className="text-cyan-300">Model Context Protocol (MCP)</strong> یک استاندارد باز برای ارتباط ساختاریافته میان برنامه‌های هوش مصنوعی و سیستم‌های خارجی است. این پروتکل قرارداد مشترکی فراهم می‌کند تا برنامه‌های سازگار بتوانند قابلیت‌هایی مانند ابزارها، منابع داده و قالب‌های آماده پرامپت را از سرورهای MCP کشف کرده و از آن‌ها استفاده کنند.»
          </p>
        </div>

        {/* Governance & Open Source Heritage Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0e1526] border border-slate-800 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200">نوامبر ۲۰۲۴: انتشار متن‌باز</span>
              <p className="text-[11px] text-slate-400 font-sans">
                معرفی و انتشار اولیه به عنوان استاندارد باز توسط شرکت <span className="font-mono text-slate-300" dir="ltr">Anthropic</span>.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1526] border border-slate-800 flex items-center gap-3">
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200">دسامبر ۲۰۲۵: بنیاد لینوکس (AAIF)</span>
              <p className="text-[11px] text-slate-400 font-sans">
                اهدای رسمی به بنیاد <span className="font-mono text-slate-300" dir="ltr">Agentic AI Foundation</span> ذیل <span className="font-mono text-slate-300" dir="ltr">Linux Foundation</span> جهت حاکمیت مستقل.
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Core Primitives */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-slate-300">
              سه قابلیت بنیادین که سرورهای MCP در اختیار برنامه قرار می‌دهند:
            </span>
            <span className="text-[11px] font-mono text-slate-500" dir="ltr">
              Core Primitives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {primitives.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl bg-[#101828] border ${item.border} transition-all space-y-2.5 flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                        <h4 className="font-bold text-slate-100 text-sm">
                          {item.title}
                        </h4>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.badgeBg} font-mono`} dir="ltr">
                        {item.titleEnglish}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-sans">
                      {item.role}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono" dir="ltr">
                    {item.controller}
                  </div>
                </div>
              );
            })}
          </div>
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
                <div className="mt-3 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5 font-sans">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>متن گفتاری گوینده:</span>
                  </div>
                  <p>
                    «به تعریف رسمی و دانشگاهی می‌رسیم: پروتکل زمینه مدل یا MCP، یک استاندارد باز است که نحوه گفتگوی ساختاریافته میان برنامه‌های کاربردی هوش مصنوعی و محیط‌های بیرونی را تعریف می‌کند. این پروتکل قرارداد معینی است که از طریق آن، برنامه کاربردی می‌تواند بفهمد سرور مقابل چه امکاناتی دارد و چگونه باید با آن تعامل کند. از نظر خاستگاه، MCP در نوامبر ۲۰۲۴ توسط آنتروپیک معرفی شد و در دسامبر ۲۰۲۵ برای تضمین توسعه خنثی و بدون وابستگی به یک شرکت، به بنیاد لینوکس و زیرمجموعه هوش مصنوعی عامل‌محور یعنی AAIF اهدا شد. سرورهای سازگار با MCP سه نوع موهبت یا قابلیت در اختیار برنامه می‌گذارند: اول ابزارها (Tools) که توابع و قابلیت‌های اجرایی هستند و میزبان بسته به ریسک عملیات ممکن است تأییدیه کاربر را درخواست کند؛ دوم منابع اطلاعاتی (Resources) که داده‌ها و اسنادی هستند که برنامه انتخاب کرده و به عنوان زمینه به مدل تزریق می‌کند؛ و سوم الگوهای پرامپت (Prompts) که قالب‌های آماده برای راهبری مدل به شمار می‌آیند. تفکیک دقیق سازوکار این سه مفهوم را در فصل بعد بررسی خواهیم کرد.»
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
