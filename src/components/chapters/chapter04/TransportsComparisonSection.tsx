'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Globe,
  ArrowLeft,
  TableProperties,
  Layers,
  ChevronDown,
  Info,
  Server,
  Radio,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TransportsComparisonSectionProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function TransportsComparisonSection({ onSelectChapter }: TransportsComparisonSectionProps) {
  const [selectedTransport, setSelectedTransport] = useState<'stdio' | 'http'>('stdio');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const comparisonRows = [
    {
      metric: 'محیط اجرایی هدف',
      stdio: 'پردازه‌های محلی سیستم‌عامل (Local Process)',
      http: 'سرویس‌های ابری و میکروسرویس‌های راه دور (Remote Services)',
    },
    {
      metric: 'کانال فیزیکی انتقال',
      stdio: 'لوله‌های استاندارد ورودی/خروجی (stdin / stdout)',
      http: 'پروتکل شبکه وب (HTTP / HTTPS)',
    },
    {
      metric: 'نحوه فریم‌بندی پیام‌ها',
      stdio: 'رشته‌های JSON جداشده با خط جدید (\\n-delimited)',
      http: 'بدنه پیام‌های درخواست HTTP POST',
    },
    {
      metric: 'جریان خطای سرور',
      stdio: 'ارسال لاگ‌ها به صورت ایزوله روی جریان stderr',
      http: 'کدهای وضعیت HTTP و هدرهای پاسخ سرور',
    },
    {
      metric: 'قابلیت استریم داده‌ها',
      stdio: 'استریم متوالی داده‌ها روی کانال پایپ محلی',
      http: 'دو الگوی استریم SSE: جریان دارای محدوده درخواست (Request-scoped) و گوش دادن به اشتراک‌ها (Subscription Listening)',
    },
    {
      metric: 'مدیریت نشست و استقرار',
      stdio: 'مقید به چرخه حیات پردازه فرزند در سیستم‌عامل',
      http: 'حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛ بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند.',
    },
    {
      metric: 'سازوکار امنیتی متداول',
      stdio: 'مجوزهای دسترسی کاربر سیستم‌عامل و سندباکس پردازه',
      http: 'پروتکل TLS، توکن‌های دسترسی سازمانی (Bearer Tokens) و OAuth',
    },
    {
      metric: 'نمونه‌های کاربردی',
      stdio: 'اتصال به فایل‌سیستم محلی، ابزار Git، دیتابیس لوکال SQLite',
      http: 'اتصال به دیتابیس‌های ابری، سرویس‌های SaaS، پلتفرم‌های GitHub و Slack',
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Header & Context */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="cyan" size="md">
            بخش ۴.۶ • کالبدشکافی لایه ترابری
          </Badge>
          <span className="text-xs text-slate-400 font-mono" dir="ltr">
            STDIO vs Streamable HTTP
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">مدت زمان تخمینی: ۹۰ ثانیه</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          دو شاهراه انتقال استاندارد: پردازه محلی (
          <span className="font-mono text-cyan-300" dir="ltr">
            STDIO
          </span>
          ) در برابر پروتکل وب (
          <span className="font-mono text-indigo-300" dir="ltr">
            Streamable HTTP
          </span>
          )
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          پیام‌های استاندارد JSON-RPC چگونه از نظر فیزیکی بین کلاینت و سرور ردوبدل می‌شوند؟
          استاندارد MCP دو ترابری رسمی و مکمل را تعریف می‌کند: یکی برای سرعت و امنیت فوق‌العاده در ماشین محلی،
          و دیگری برای مقیاس‌پذیری و ارتباط با سرویس‌های ابری و راه دور.
        </p>
      </div>

      {/* 2. Interactive Two-Transport Schematics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>معماری و مسیر جریان داده‌ها در ترابری‌ها</span>
          </h3>
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedTransport('stdio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedTransport === 'stdio'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>ترابری STDIO (محلی)</span>
            </button>
            <button
              onClick={() => setSelectedTransport('http')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedTransport === 'http'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>ترابری Streamable HTTP (وب)</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTransport === 'stdio' ? (
            <motion.div
              key="stdio-diagram"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Card variant="solid" glowColor="cyan" className="p-6 border-cyan-500/30 bg-slate-900/90">
                <div className="space-y-6">
                  {/* Schematic Bar */}
                  <div className="p-4 sm:p-6 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6" dir="ltr">
                      {/* Host Client Box */}
                      <div className="w-full md:w-56 p-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-cyan-300">
                          <Terminal className="w-5 h-5" />
                          <span className="font-bold font-mono text-sm">Host Process</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Parent Process (Claude Desktop, IDE, etc.)
                        </p>
                      </div>

                      {/* IPC Pipes */}
                      <div className="flex-1 w-full space-y-2.5 py-2">
                        {/* stdin pipe */}
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
                          <span className="text-cyan-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            stdin pipe
                          </span>
                          <span className="text-slate-400 text-[11px]">Request (JSON + \n) &rarr;</span>
                        </div>

                        {/* stdout pipe */}
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono">
                          <span className="text-slate-400 text-[11px]">&larr; Response / Notifications (JSON + \n)</span>
                          <span className="text-emerald-300 flex items-center gap-1.5">
                            stdout pipe
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </span>
                        </div>

                        {/* stderr pipe */}
                        <div className="flex items-center justify-between px-3 py-1 rounded bg-amber-950/20 border border-dashed border-amber-500/30 text-[11px] font-mono">
                          <span className="text-amber-400">stderr pipe (Isolated)</span>
                          <span className="text-amber-300/80">&larr; Diagnostic logs &amp; debug output</span>
                        </div>
                      </div>

                      {/* Child Server Process Box */}
                      <div className="w-full md:w-56 p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-emerald-300">
                          <Server className="w-5 h-5" />
                          <span className="font-bold font-mono text-sm">MCP Child Server</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Spawned Subprocess (Node.js, Python, Rust)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">فریم‌بندی خط‌محور (\n)</span>
                      <p className="text-slate-400 leading-relaxed">
                        هر پیام به صورت یک رشته JSON روی یک خط مجزا فرستاده شده و با کاراکتر <code className="text-cyan-300 font-mono">\n</code> خاتمه می‌یابد.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">تفکیک کامل لاگ با stderr</span>
                      <p className="text-slate-400 leading-relaxed">
                        جریان خطای سیستم‌عامل منحصراً به لاگ‌ها اختصاص دارد تا خروجی ساخت‌یافته پروتکل روی <code className="text-emerald-300 font-mono">stdout</code> مخدوش نشود.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">تأخیر نزدیک به صفر</span>
                      <p className="text-slate-400 leading-relaxed">
                        فاقد هزینه باز کردن سوکت شبکه یا هندشیک TLS؛ اجرای مستقیم در هسته سیستم‌عامل با حداکثر بهره‌وری.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="http-diagram"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Card variant="solid" glowColor="indigo" className="p-6 border-indigo-500/30 bg-slate-900/90">
                <div className="space-y-6">
                  {/* Schematic Bar */}
                  <div className="p-4 sm:p-6 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6" dir="ltr">
                      {/* Web Client Box */}
                      <div className="w-full md:w-56 p-4 rounded-xl bg-slate-900 border border-indigo-500/40 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-indigo-300">
                          <Globe className="w-5 h-5" />
                          <span className="font-bold font-mono text-sm">MCP Client</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Web / Cloud / Distributed Agent
                        </p>
                      </div>

                      {/* HTTP Channels */}
                      <div className="flex-1 w-full space-y-2.5 py-2">
                        {/* HTTP POST with Header */}
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono">
                          <span className="text-indigo-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            HTTP POST
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            Header: MCP-Protocol-Version: 2026-07-28 &rarr;
                          </span>
                        </div>

                        {/* Request-scoped SSE */}
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
                          <span className="text-slate-400 text-[11px]">&larr; Request-Scoped SSE Stream</span>
                          <span className="text-cyan-300 flex items-center gap-1.5">
                            Chunked Data Stream
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          </span>
                        </div>

                        {/* Subscription Listening */}
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono">
                          <span className="text-slate-400 text-[11px]">&larr; Long-lived Subscription SSE</span>
                          <span className="text-emerald-300 flex items-center gap-1.5">
                            Resource Updates
                            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-ping" />
                          </span>
                        </div>
                      </div>

                      {/* Remote Server Box */}
                      <div className="w-full md:w-56 p-4 rounded-xl bg-slate-900 border border-indigo-500/40 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-indigo-300">
                          <Server className="w-5 h-5" />
                          <span className="font-bold font-mono text-sm">Remote MCP Server</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Cloud Service / SaaS / Microservice
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">الگوی ۱: جریان پاسخ دارای محدوده (Request-scoped SSE)</span>
                      <p className="text-slate-400 leading-relaxed">
                        جهت ارسال مرحله‌به‌مرحله و تکه‌ای خروجی‌های حجیم یا پاسخ‌های طولانی در چارچوب یک درخواست خاص ایجاد شده و پس از پایان پاسخ بسته می‌شود.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">الگوی ۲: سازوکار گوش دادن به اشتراک‌ها (Subscription Listening)</span>
                      <p className="text-slate-400 leading-relaxed">
                        برای مطلع شدن مستمر از تغییرات منابع (Resources) یا رویدادهای سرور در طول زمان؛ کلاینت یک اتصال شنونده برای دریافت رویدادها باز نگه می‌دارد.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Comprehensive Technical Comparison Matrix Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TableProperties className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">
            جدول تطبیقی جامع شاخص‌های فنی ترابری‌ها
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-right text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300">
                <th className="p-3.5 sm:p-4 font-bold text-white w-1/4">شاخص مقایسه‌ای</th>
                <th className="p-3.5 sm:p-4 font-bold text-cyan-300 w-[37.5%]">
                  لایه انتقال STDIO (پردازه محلی)
                </th>
                <th className="p-3.5 sm:p-4 font-bold text-indigo-300 w-[37.5%]">
                  لایه انتقال Streamable HTTP (وب و راه دور)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-950/30'
                  }`}
                >
                  <td className="p-3.5 sm:p-4 font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{row.metric}</span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-300 leading-relaxed font-sans">
                    {row.stdio}
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-300 leading-relaxed font-sans">
                    {row.http}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Collapsible Presenter Notes */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-900/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="font-medium text-slate-300">یادداشت تفصیلی ارائه‌دهنده (Presenter Notes)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
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
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 bg-slate-950/60">
                <p className="border-r-2 border-cyan-500 pr-3 my-2 text-slate-300">
                  «به آخرین و جذاب‌ترین بخش معماری فصل چهارم رسیدیم: پیام‌های JSON-RPC چگونه جابه‌جا می‌شوند؟ استاندارد MCP دو شاهراه اصلی را معرفی می‌کند. نخست STDIO که پادشاه سناریوهای محلی است. وقتی در Claude Desktop یک سرور لوکال را اضافه می‌کنید، کلاینت یک پروسس نود یا پایتون در پس‌زمینه ران می‌کند و از طریق stdin و stdout با آن پیام ردوبدل می‌کند؛ هر پیام در یک خط و پایان آن یک کاراکتر خط جدید است. خروجی‌های لاگ هم روی stderr ریخته می‌شوند تا تداخلی با پروتکل ایجاد نکنند. این روش هیچ پورت شبکه‌ای باز نمی‌کند و فوق‌العاده امن و سریع است. اما اگر سرور در یک کلاد دیگر یا یک سرویس SaaS باشد چه؟ اینجا Streamable HTTP وارد میدان می‌شود. کلاینت پیام‌هایش را با متد ساده HTTP POST می‌فرستد و سرور می‌تواند پاسخ را به صورت JSON استاندارد بازگرداند، یا برای داده‌های مرحله‌ای از استریم‌های موقت دارای محدوده درخواست (Request-scoped SSE) بهره بگیرد؛ همچنین برای اعلان‌ها و اشتراک‌ها، مکانیزم گوش دادن طولانی‌مدت به SSE پشتیبانی می‌شود. از منظر زیرساختی، حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛ بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند.»
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Final Transition CTA Box */}
      <Card
        variant="solid"
        glowColor="cyan"
        className="p-8 sm:p-10 border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" size="md">
            پایان فصل چهارم • آماده ورود به شبیه‌سازی تعاملی
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            «حالا اجزای معماری، نقش‌های مشارکت‌کننده، ساختار پیام‌ها و مسیرهای ارتباطی MCP را به طور کامل شناختیم. در فصل بعد، تمام این مفاهیم مهندسی را کنار هم قرار می‌دهیم و چرخه حیات یک درخواست واقعی را از لحظه دریافت ورودی کاربر تا بازگشت پاسخ مدل زبانی شبیه‌سازی می‌کنیم.»
          </h3>

          <p className="text-slate-400 text-sm">
            در فصل ۵، ترافیک واقعی بین کاربر، Host، کلاینت، سرورها و LLM را به صورت گام‌به‌گام و زنده مشاهده خواهید کرد.
          </p>

          <div className="pt-4 flex justify-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => onSelectChapter?.(5)}
              className="gap-3 shadow-lg shadow-cyan-500/25 px-8 py-3 text-base font-bold"
            >
              <span>ورود به فصل پنجم: شبیه‌سازی جریان یک درخواست در MCP</span>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
