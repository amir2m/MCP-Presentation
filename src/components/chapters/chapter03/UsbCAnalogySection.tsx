'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Usb, CheckCircle2, AlertCircle, Layers, ChevronDown, TableProperties } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function UsbCAnalogySection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showDetailTable, setShowDetailTable] = useState(false);

  const matchPoints = [
    {
      id: 1,
      title: 'اتصال عمومی (Universal Interface)',
      desc: 'جایگزینی مجموعه‌ای از کابل‌ها و رابط‌های ناهمگون با یک استاندارد واحد و پذیرفته‌شده در صنعت.',
    },
    {
      id: 2,
      title: 'تعویض‌پذیری ابزارها (Interchangeability)',
      desc: 'امکان اتصال، جداسازی یا جایگزینی ابزارها بدون نیاز به بازنویسی زیرساخت اصلی برنامه میزبان.',
    },
    {
      id: 3,
      title: 'استقلال از تولیدکننده (Vendor Agnostic)',
      desc: 'سازگاری دستگاه‌ها و کلاینت‌های متعلق به شرکت‌های مختلف با تجهیزات و سرورهای ثالث.',
    },
  ];

  const limitPoints = [
    {
      id: 1,
      title: 'پروتکل نرم‌افزاری، نه کابل فیزیکی',
      desc: 'پروتکل MCP پیام‌های ساختاریافته سطح برنامه (Application Layer) را مبادله می‌کند، نه سیگنال الکتریکی.',
    },
    {
      id: 2,
      title: 'سازگاری مشروط به قابلیت‌ها (Capability Negotiation)',
      desc: 'همان‌گونه که هر کابل USB-C انتقال ۱۰۰ وات یا تاندربولت را تضمین نمی‌کند، در MCP نیز سازگاری بر پایه اعلام Capabilityها است.',
    },
    {
      id: 3,
      title: 'عدم اتصال جادویی خودکار (No Magic Plug-and-Play)',
      desc: 'برخلاف اتصال فیزیکی، برقراری امنیت و مجوزها وابسته به پیاده‌سازی و لایه انتقال است؛ میزبان بسته به ریسک هر عملیات، ممکن است نیاز به تأیید کاربر داشته باشد.',
    },
  ];

  const comparisonRows = [
    { feature: 'ماهیت ارتباط', usbc: 'کانکتور فیزیکی، پین‌های سخت‌افزاری و جریان الکتریکی', mcp: 'پروتکل نرم‌افزاری سطح کاربرد بر پایه تبادل پیام‌های داده‌ای' },
    { feature: 'نقش کلاینت', usbc: 'دستگاه میزبان تأمین‌کننده یا مصرف‌کننده برق (Host/Device)', usbcDir: 'rtl', mcp: 'اپلیکیشن یا محیط هوش مصنوعی (مانند IDE یا دستیار دسکتاپ)' },
    { feature: 'نقش سرور / ابزار', usbc: 'تجهیزات جانبی متصل (نمایشگر، حافظه، شارژر)', mcp: 'سرویس‌دهنده کانتکست (پایگاه داده، سیستم فایل، وب‌سرویس)' },
    { feature: 'مذاکره قابلیت‌ها', usbc: 'استاندارد Power Delivery و DisplayPort Alt Mode', mcp: 'مذاکره Capabilityها (پشتیبانی از Tools، Resources یا Prompts)' },
    { feature: 'امنیت و کنترل', usbc: 'محافظت فیزیکی در برابر اضافه‌ولتاژ و اتصال کوتاه', mcp: 'سیاست‌های امنیتی میزبان، کنترل سطوح دسترسی و امکان تأیید انسانی برای اقدامات حساس' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۳.۳ • درک شهودی از استانداردسازی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          آیا MCP همان درگاه <span className="font-mono text-cyan-300" dir="ltr">USB-C</span> برای دنیای هوش مصنوعی است؟
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          در جامعه مهندسی، از MCP به عنوان «پورت USB-C برای اپلیکیشن‌های هوش مصنوعی» یاد می‌شود؛ تشبیهی درخشان برای فهم موضوع، اما نیازمند تفکیک دقیق مرزهای علمی.
        </p>
      </div>

      {/* Main Dual-Column Split Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Usb className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              واکاوی نقادانه تمثیل: تطابق‌ها در برابر مرزهای علمی
            </span>
          </div>

          <span className="text-xs text-slate-400 font-sans">
            استعاره برای درک استانداردسازی، نه برابری تکنیکال
          </span>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Column 1: Where the Analogy Works (Green/Emerald Theme) */}
          <div className="p-5 rounded-2xl bg-[#0e1726] border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm sm:text-base text-white">
                نقاط قوت و تطابق تمثیل (Where It Works)
              </h4>
            </div>

            <div className="space-y-3">
              {matchPoints.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-[#141C2E]/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-emerald-300 font-sans">
                    {item.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/30 text-[11px] text-emerald-300 border border-emerald-500/20 leading-relaxed font-sans">
              ✓ <strong>پیام محوری:</strong> رهایی از درایورهای اختصاصی و تبدیل هر سرویس به قطعه‌ای با اتصال استاندارد.
            </div>
          </div>

          {/* Column 2: Where the Analogy Breaks Down (Rose/Amber Theme) */}
          <div className="p-5 rounded-2xl bg-[#0e1726] border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/20 text-amber-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm sm:text-base text-white">
                مرزهای علمی و تفاوت‌ها (Where It Breaks Down)
              </h4>
            </div>

            <div className="space-y-3">
              {limitPoints.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-[#141C2E]/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-amber-300 font-sans">
                    {item.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/30 text-[11px] text-amber-300 border border-amber-500/20 leading-relaxed font-sans">
              ⚠️ <strong>پیام محوری:</strong> پروتکل به تنهایی ضامن امنیت نیست؛ سازوکار احراز هویت، کنترل دسترسی و تأیید انسانی به سیاست میزبان و محیط استقرار وابسته است.
            </div>
          </div>

        </div>

        {/* Expandable Technical Comparison Table */}
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowDetailTable(!showDetailTable)}
            iconStart={<TableProperties className="w-4 h-4 text-cyan-400" />}
            iconEnd={
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showDetailTable ? 'rotate-180' : ''
                }`}
              />
            }
            className="text-xs"
          >
            {showDetailTable ? 'بستن جدول تطبیق فنی' : 'مشاهده جدول تحلیل مقایسه‌ای تفصیلی'}
          </Button>

          <AnimatePresence>
            {showDetailTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="rounded-xl border border-slate-800 overflow-x-auto bg-[#090E1A]">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#141C2E] border-b border-slate-800 text-slate-300">
                      <tr>
                        <th className="p-3 font-bold">شاخص فنی</th>
                        <th className="p-3 font-bold text-cyan-300">درگاه سخت‌افزاری USB-C</th>
                        <th className="p-3 font-bold text-indigo-300">پروتکل نرم‌افزاری MCP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                      {comparisonRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-semibold text-slate-200">{row.feature}</td>
                          <td className="p-3 text-slate-300">{row.usbc}</td>
                          <td className="p-3 text-cyan-200">{row.mcp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                <div className="mt-3 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5 font-sans">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>متن گفتاری گوینده:</span>
                  </div>
                  <p>
                    «برای توضیح دادن نقش MCP، مهندسان معمولاً از تمثیل درگاه USB-C استفاده می‌کنند. سال‌ها پیش برای شارژ کردن یا اتصال لپ‌تاپ، تبلت، هارد اکسترنال و دوربین، مجبور بودیم ده‌ها کابل و پورت اختصاصی ناهمگون را در کشوی میز نگهداری کنیم. USB-C آمد و یک شکل فیزیکی و پروتکل مشترک تعریف کرد تا هر وسیله‌ای با یک درگاه واحد کار کند. MCP نیز در دنیای نرم‌افزار هوش مصنوعی چنین نقشی ایفا می‌کند: کلاینت هوش مصنوعی مانند یک لپ‌تاپ و سرور ابزارها مانند یک وسیله جانبی است که به این استاندارد متصل می‌شود. اما در محیط دانشگاهی ما باید مرزهای دقیق این استعاره را بشناسیم: اولاً MCP کابل و کانکتور فیزیکی نیست، بلکه یک پروتکل نرم‌افزاری مبتنی بر تبادل پیام است. ثانیاً همان‌طور که صرف اتصال یک کابل USB-C تضمین نمی‌کند سرعت تاندربولت فعال شود، در MCP نیز سازگاری بر اساس قابلیت‌های اعلام‌شده دو طرف تعیین می‌شود و امنیت، احراز هویت و تأیید انسانی هرگز خودکار و یکنواخت نیست، بلکه به لایه انتقال و سیاست‌های برنامه میزبان وابسته است.»
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
