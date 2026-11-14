'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  History,
  CheckCheck,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Info,
  Server,
  Network,
  ArrowLeft,
  FileCode2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function DiscoveryStatelessSection() {
  const [architectureView, setArchitectureView] = useState<'modern' | 'legacy'>('modern');
  const [copied, setCopied] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [selectedMetaField, setSelectedMetaField] = useState<string | null>(null);

  const discoveryCode = `{
  "jsonrpc": "2.0",
  "id": "disc-01",
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {},
      "io.modelcontextprotocol/clientInfo": {
        "name": "my-ide-host",
        "version": "2.1.0"
      }
    }
  }
}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discoveryCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const metaFieldsInfo = [
    {
      key: 'io.modelcontextprotocol/protocolVersion',
      shortName: 'protocolVersion',
      status: 'الزامی (MUST)',
      badgeVariant: 'cyan' as const,
      color: 'border-cyan-500/50 text-cyan-300',
      description: 'نسخه مورد توافق پروتکل (مانند "2026-07-28"). باید در تمام درخواست‌ها درج شود و در بستر وب با هدر HTTP یکسان باشد.',
    },
    {
      key: 'io.modelcontextprotocol/clientCapabilities',
      shortName: 'clientCapabilities',
      status: 'الزامی (MUST)',
      badgeVariant: 'cyan' as const,
      color: 'border-cyan-500/50 text-cyan-300',
      description: 'شیء اعلان توانمندی‌ها و قابلیت‌های فعال در کلاینت (مانند پشتیبانی از sampling یا ریشه‌ها). درج آن در هر درخواست الزامی است.',
    },
    {
      key: 'io.modelcontextprotocol/clientInfo',
      shortName: 'clientInfo',
      status: 'اختیاری (SHOULD)',
      badgeVariant: 'outline' as const,
      color: 'border-amber-500/50 text-amber-300',
      description: 'اطلاعات هویتی کلاینت شامل نام و نسخه. کلاینت‌ها اکیداً توصیه می‌شوند (SHOULD) خود را معرفی کنند، اما برای تک‌تک درخواست‌ها الزامی قطعی نیست.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Header & Context */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="cyan" size="md">
            بخش ۴.۵ • مشخصات بازنگری ۲۰۲۶
          </Badge>
          <span className="text-xs text-slate-400 font-mono" dir="ltr">
            server/discover &amp; Stateless Protocol Core
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">مدت زمان تخمینی: ۶۵ ثانیه</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          کشف پویا با{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            server/discover
          </span>{' '}
          در معماری مستقل از نشست
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          استاندارد رسمی <span className="font-mono text-cyan-300" dir="ltr">2026-07-28</span> پروتکل MCP،
          هسته پروتکل را به صورت <strong className="text-white">بدون نشست (Stateless Core)</strong> بازطراحی کرده است.
          در این استاندارد، پیام‌ها خوداتکا هستند و هر درخواست فراداده‌های توافق پروتکل و قابلیت‌ها را با خود حمل می‌کند.
        </p>
      </div>

      {/* 2. Interactive Comparison Switch: Modern vs Legacy */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              سیر تکامل پروتکل: مقایسه رویکرد مدرن ۲۰۲۶ با معماری سنتی
            </h3>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setArchitectureView('modern')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                architectureView === 'modern'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>استاندارد ۲۰۲۶ (Stateless Core)</span>
            </button>
            <button
              onClick={() => setArchitectureView('legacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                architectureView === 'legacy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>مدل گذشته ۲۰۲۴/۲۰۲۵ (Stateful)</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {architectureView === 'modern' ? (
            <motion.div
              key="modern-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Card variant="solid" glowColor="cyan" className="p-6 border-cyan-500/30 bg-slate-900/80">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Sparkles className="w-5 h-5" />
                      <h4 className="font-bold text-white text-base">
                        معماری استاندارد کنونی (MCP Specification 2026-07-28)
                      </h4>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>
                          <strong className="text-white">درخواست‌های خوداتکا (Self-Contained Requests):</strong> هر درخواست
                          حامل شناسه نگارش پروتکل و توانمندی‌های کلاینت در بخش فراداده است و به یک نشست سراسری طولانی‌مدت وابسته نیست.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>
                          <strong className="text-white">کشف اختیاری با <code className="text-cyan-300 font-mono">server/discover</code>:</strong> سرور
                          الزام دارد (<span className="text-cyan-300 font-mono text-xs">MUST</span>) این متد را پیاده‌سازی کند؛
                          اما فراخوانی آن توسط کلاینت اختیاری (<span className="text-cyan-300 font-mono text-xs">MAY</span>) است.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>
                          <strong className="text-white">تسهیل مقیاس‌پذیری افقی:</strong> هر نمونه از سرور در کلاستر می‌تواند
                          درخواست‌های کلاینت را بدون نیاز به حافظه اشتراکی نشست (Session Affinity) پردازش کند.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-cyan-500/20 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-cyan-400 block" dir="ltr">
                        Stateless Core Status
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        هسته بدون نشست پروتکلی به معنای فقدان حافظه در سیستم نیست؛
                        اپلیکیشن میزبان و سرور می‌توانند وضعیت، کش و احراز هویت را در لایه‌های کاربردی مدیریت نمایند.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Protocol Spec:</span>
                      <span className="text-cyan-300">2026-07-28</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="legacy-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Card variant="solid" className="p-6 border-dashed border-amber-500/40 bg-slate-900/60">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <History className="w-5 h-5" />
                      <h4 className="font-bold text-white text-base">
                        رویکرد سنتی گذشته (مشخصات اولیه ۲۰۲۴ و اوایل ۲۰۲۵)
                      </h4>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>
                          <strong className="text-amber-200">دست‌تکانی اجباری چندمرحله‌ای:</strong> کلاینت پیش از ارسال هر دستوری،
                          ملزم به اجرای توالی <code className="text-amber-300 font-mono text-xs">initialize</code> و دریافت تأییدیه با
                          <code className="text-amber-300 font-mono text-xs"> notifications/initialized</code> بود.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>
                          <strong className="text-amber-200">نشست سراسری ماندگار (Mcp-Session-Id):</strong> سرور یک شناسه نشست ثابت تولید می‌کرد
                          و تمام درخواست‌ها باید آن را در هدر نگه می‌داشتند که مانع جابه‌جایی راحت بین سرورها بود.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>
                          <strong className="text-amber-200">چالش توزیع بار:</strong> در صورت قطع یا تعویض سرور، نشست باطل می‌شد
                          و چرخه دست‌تکانی باید از ابتدا تکرار می‌گردید.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-500/20 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-amber-400 block" dir="ltr">
                        Legacy Stateful Paradigm
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        این مدل در بازنگری رسمی لینوکس فاندیشن با هسته بدون نشست پروتکلی جایگزین شده تا ترابری وب با کارایی بالاتری عمل کند.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-amber-300">Replaced in 2026 Spec</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Deep Dive: server/discover and params._meta breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side (7 cols): JSON-RPC server/discover request & HTTP sync */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="solid" className="overflow-hidden border-slate-800 bg-slate-900/90">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300">
                  server/discover request with _meta
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
                title="کپی کردن قطعه‌کد"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">کپی شد</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto bg-[#0a0f1d] font-mono text-xs sm:text-sm text-cyan-200/90 leading-relaxed" dir="ltr">
              <pre className="text-slate-300">
                <code>{discoveryCode}</code>
              </pre>
            </div>
          </Card>

          {/* HTTP Header Sync Callout */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">
                همگامی هدر HTTP در ترابری وب (Streamable HTTP)
              </span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 flex items-center justify-between" dir="ltr">
              <span>MCP-Protocol-Version: 2026-07-28</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                MUST match _meta
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              در ترابری وب، مقدار هدر <code className="font-mono text-cyan-300">MCP-Protocol-Version</code> در لایه انتقال HTTP الزاماً باید (<span className="font-mono text-xs text-cyan-300">MUST</span>) با مقدار <code className="font-mono text-cyan-300">protocolVersion</code> در شیء فراداده بدنه درخواست تطابق کامل داشته باشد.
            </p>
          </div>
        </div>

        {/* Right Side (5 cols): Metadata Requirements breakdown */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">
              فیلدهای فراداده <span className="font-mono text-cyan-300" dir="ltr">params._meta</span> در استاندارد ۲۰۲۶
            </h4>
          </div>

          <div className="space-y-3">
            {metaFieldsInfo.map((field) => (
              <div
                key={field.key}
                onClick={() => setSelectedMetaField(field.shortName)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedMetaField === field.shortName
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-md'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-white" dir="ltr">
                    {field.shortName}
                  </span>
                  <Badge variant={field.badgeVariant} size="sm">
                    {field.status}
                  </Badge>
                </div>
                <div className="font-mono text-[11px] text-slate-400 mb-1.5 break-all" dir="ltr">
                  {field.key}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {field.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>قانون کشف قابلیت‌ها:</span>
            </div>
            <p className="leading-relaxed">
              سرورها <strong className="text-white">الزام دارند (MUST)</strong> متد <code className="font-mono text-cyan-300">server/discover</code> را پیاده‌سازی کنند، اما فراخوانی آن توسط کلاینت‌ها یک گام <strong className="text-white">اختیاری (MAY)</strong> است و پیش‌نیاز قطعی ارسال متدهای دیگر نیست.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Engineering Reality: Load Balancers & SSE Callout */}
      <Card variant="solid" glowColor="indigo" className="p-6 border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 shrink-0">
            <Server className="w-6 h-6 text-indigo-300" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Engineering Insight • Load Balancing Reality
              </span>
              <Badge variant="indigo" size="sm">
                نکته کلیدی زیرساخت
              </Badge>
            </div>
            <p className="text-white font-medium text-base sm:text-lg leading-relaxed">
              «حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛
              بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند.»
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              معماری بدون نشست به معنی بی‌نیازی از پیکربندی شبکه نیست. زیرساخت‌های پروکسی معکوس (مانند Nginx یا Caddy)
              باید برای جلوگیری از بافر کردن رویدادهای Server-Sent Events (SSE) و مدیریت صحیح مهلت زمانی (Timeout) اتصالات باز تنظیم گردند.
            </p>
          </div>
        </div>
      </Card>

      {/* 5. Collapsible Speaker Notes */}
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
                  «به یکی از مهم‌ترین اصلاحات علمی در دنیای MCP رسیدیم. اگر آموزش‌ها یا مقالات سال ۲۰۲۴ و اوایل ۲۰۲۵ را در اینترنت بررسی کنید، مکرراً به الگوی دست‌تکانی اولیه اجباری initialize و نگه‌داشتن شناسه نشست در هدرها برمی‌خورید. اما در بازنگری رسمی ۲۸ ژوئیه ۲۰۲۶، کنسرسیوم هسته پروتکل را به یک هسته بدون نشست یا Stateless Core ارتقا داد. در استاندارد کنونی، درخواست‌ها خوداتکا هستند و هر درخواست الزاماً دو فیلد فراداده io.modelcontextprotocol/protocolVersion و io.modelcontextprotocol/clientCapabilities را حمل می‌کند—که در بستر HTTP با هدر MCP-Protocol-Version همگام است؛ درحالی‌که اطلاعات کلاینت (clientInfo) اختیاری بوده و کلاینت‌ها توصیه می‌شوند خود را معرفی نمایند. سرورها برای معرفی توانمندی‌ها متد server/discover را دارند، اما پروتکل کلاینت را مجبور به برقراری یک جلسه سراسری سنگین نمی‌کند. نکته کلیدی مهندسی این است: حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛ بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند و نباید تصور کرد هر لودبالانسری بدون تنظیمات تایم‌اوت و بافر استریم آماده سرویس‌دهی است.»
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Transition to Next Section */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-400">
        <span className="text-slate-300">
          انتقال به بخش بعد: بررسی لایه‌های ترابری فیزیکی و مقایسه STDIO با Streamable HTTP
        </span>
        <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
          <span>بخش ۰۴.۶</span>
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
