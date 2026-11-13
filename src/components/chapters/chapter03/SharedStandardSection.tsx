'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Globe, Database, Sparkles, ArrowRightLeft, Layers, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function SharedStandardSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  const parallels = [
    {
      id: 'http',
      title: 'وب و پروتکل HTTP',
      subtitle: 'ارتباط مرورگرها با سرورها',
      desc: 'مرورگرها و وب‌سرورهای متعدد در سراسر جهان با یک پروتکل باز واحد، وب جهانی مقیاس‌پذیر را خلق کردند.',
      icon: Globe,
      color: 'text-cyan-400',
      badge: 'انقلاب وب',
    },
    {
      id: 'sql',
      title: 'داده‌ها و زبان SQL',
      subtitle: 'پرس‌وجوی مستقل از دیتابیس',
      desc: 'ایجاد قرارداد و دستورالعمل مشترک برای واکشی و دستکاری داده‌ها بدون وابستگی کلاینت به موتور درونی دیتابیس.',
      icon: Database,
      color: 'text-indigo-400',
      badge: 'انقلاب داده',
    },
    {
      id: 'mcp',
      title: 'هوش مصنوعی و MCP',
      subtitle: 'اتصال هوش مصنوعی به دنیای خارج',
      desc: 'پروتکل استاندارد باز برای کشف، اعتبارسنجی و تبادل امن ابزارها، منابع داده و پرامپت‌ها میان مدل و جهان واقعی.',
      icon: Sparkles,
      color: 'text-amber-400',
      badge: 'انقلاب کانتکست',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۳.۲ • ایده استانداردسازی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          گذار از آشفتگی درایورها به قرارداد مشترک
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          تاریخ مهندسی نرم‌افزار نشان داده است که راهکار مقیاس‌پذیری، استانداردسازی پروتکل است: همان‌گونه که وب بر پایه پروتکل <span className="font-mono text-cyan-300" dir="ltr">HTTP</span> و پایگاه‌های داده بر مبنای استاندارد <span className="font-mono text-cyan-300" dir="ltr">SQL</span> شکل گرفتند.
        </p>
      </div>

      {/* Before / After Comparison Visual Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              مقایسه معماری: اتصالات اختصاصی در برابر قرارداد مشترک باز
            </span>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center bg-[#090E1A] p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('after')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'after'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              استاندارد باز مشترک (M + N)
            </button>
            <button
              onClick={() => setActiveTab('before')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'before'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              اتصالات اختصاصی (M × N)
            </button>
          </div>
        </div>

        {/* Dynamic Diagram Canvas */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090E1A] border border-slate-800/80 min-h-[220px] flex flex-col justify-center">
          {activeTab === 'after' ? (
            /* Standard Open Protocol Hub Representation */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                
                {/* 3 Client Apps */}
                <div className="md:col-span-3 space-y-2">
                  <span className="text-xs font-mono text-indigo-300 block text-center font-bold">
                    کلاینت‌های سازگار (M)
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-indigo-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    Claude Desktop
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-indigo-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    VS Code IDE
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-indigo-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    Custom AI Agent
                  </div>
                </div>

                {/* Central Protocol Bus / Contract */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/50 to-cyan-950/40 border border-cyan-400/40 shadow-lg shadow-cyan-950/30 text-center space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                    <ArrowRightLeft className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>گذرگاه پروتکل باز مشترک (Shared Protocol)</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-sans px-2">
                    هر کلاینت یک بار از پروتکل پشتیبانی می‌کند و هر ابزار یک بار سرور استاندارد را پیاده می‌سازد.
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-mono text-emerald-300 font-extrabold bg-emerald-950/40 border border-emerald-500/30" dir="ltr">
                    3 Clients + 4 Servers = 7 Implementations
                  </div>
                </div>

                {/* 4 Tool Servers */}
                <div className="md:col-span-3 space-y-2">
                  <span className="text-xs font-mono text-cyan-300 block text-center font-bold">
                    سرورهای ابزار و داده (N)
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    PostgreSQL Server
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    GitHub Server
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    Slack Server
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141C2E] border border-cyan-500/30 text-center text-xs font-mono text-slate-200" dir="ltr">
                    Filesystem Server
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Chaotic Point to Point State */
            <div className="text-center space-y-4 py-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-500/40" dir="ltr">
                3 Clients × 4 Tools = 12 Custom Integrations
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                بدون پروتکل، هر کلاینت باید درایور جداگانه‌ای بنویسد. با اضافه شدن هر ابزار جدید یا تغییر نسخه API، همه کلاینت‌ها نیازمند بازنویسی کد هستند.
              </p>
            </div>
          )}

          {/* Scientific Clarification Note */}
          <div className="mt-5 p-3 rounded-xl bg-[#0F1626] border border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center font-sans">
            <strong className="text-cyan-300 font-semibold">یادداشت تدقیق علمی: </strong>
            مدل <span className="font-mono text-slate-300" dir="ltr">M + N</span> یک ساده‌سازی مفهومی برای مقایسه معماری است. استاندارد مشترک تمام پیچیدگی‌ها، نیاز به تنظیمات، احراز هویت و نگهداری را از بین نمی‌برد؛ بلکه زبان مشترک کشف و تبادل داده را فراهم می‌سازد.
          </div>
        </div>

        {/* 3 Historical Parallel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {parallels.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#121829] border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                    <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-sans">
                    {item.badge}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-400 font-sans">
                  {item.subtitle}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {item.desc}
                </p>
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
                <div className="mt-3 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5 font-sans">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>متن گفتاری گوینده:</span>
                  </div>
                  <p>
                    «راهکار مهندسی برای حل این بن‌بست، اختراع یک چرخ جدید نیست؛ بلکه به‌کارگیری همان درسی است که دهه‌ها پیش در تاریخ اینترنت فرا گرفتیم. اگر هر مرورگری مجبور بود برای هر وب‌سرور یک پروتکل اختصاصی بنویسد، اینترنت هرگز شکل نمی‌گرفت؛ وب جهانی به این دلیل موفق شد که پروتکل استانداردی به نام HTTP متولد شد. در دنیای هوش مصنوعی نیز راه‌حل، قرار دادن یک استاندارد باز مشترک در میانه است. در این الگو، توسعه‌دهنده برنامه هوش مصنوعی تنها یک بار کلاینت استاندارد را پیاده‌سازی می‌کند و توسعه‌دهنده ابزار یا پایگاه داده نیز تنها یک بار سرور استاندارد را می‌سازد. به جای رابطه ضربی، رابطه به فرم جمعی M + N تبدیل می‌شود. البته باید دقت کنیم که استاندارد، پیچیدگی تنظیمات یا احراز هویت را به صفر نمی‌رساند، بلکه زبان تبادل را یکسان می‌کند.»
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
