'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Info,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function JsonRpcPatternsSection() {
  const [activeTab, setActiveTab] = useState<'request' | 'response' | 'notification' | 'error'>('request');
  const [copied, setCopied] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const tabs = [
    {
      id: 'request' as const,
      label: 'Request',
      persianLabel: 'درخواست',
      category: 'رده اصلی ۱: درخواست (نیازمند پاسخ)',
      color: 'text-cyan-300',
      borderActive: 'border-cyan-400 bg-cyan-500/15',
      badgeVariant: 'cyan' as const,
      description: 'فراخوانی یک متد مشخص توسط کلاینت که با ثبت یک شناسه یکتا (id)، منتظر دریافت پاسخ می‌ماند.',
      code: `{
  "jsonrpc": "2.0",
  "id": "req-101",
  "method": "tools/call",
  "params": {
    "name": "query_database",
    "arguments": {
      "sql": "SELECT id, name FROM users LIMIT 5"
    }
  }
}`,
      keyFeatures: [
        { label: '"jsonrpc": "2.0"', desc: 'نسخه استاندارد پروتکل JSON-RPC (الزامی)' },
        { label: '"id": "req-101"', desc: 'شناسه یکتا برای تطبیق ناهمگام پاسخ متناظر (الزامی)' },
        { label: '"method": "tools/call"', desc: 'نام متد عملیاتی درخواست‌شده (الزامی)' },
        { label: '"params": { ... }', desc: 'شیء آرگومان‌ها و پارامترهای ورودی متد (اختیاری)' },
      ],
    },
    {
      id: 'response' as const,
      label: 'Successful Response',
      persianLabel: 'پاسخ موفق',
      category: 'رده اصلی ۲ (واریانت ۱): پاسخ موفق با فیلد result',
      color: 'text-emerald-300',
      borderActive: 'border-emerald-400 bg-emerald-500/15',
      badgeVariant: 'success' as const,
      description: 'پاسخ رسمی سرور به یک درخواست مشخص که با همان id درخواست بازگردانده شده و حاوی داده‌های نتیجه است.',
      code: `{
  "jsonrpc": "2.0",
  "id": "req-101",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 5 records in users table."
      }
    ]
  }
}`,
      keyFeatures: [
        { label: '"id": "req-101"', desc: 'دقیقاً برابر با شناسه درخواست ارسالی جهت جفت‌سازی (الزامی)' },
        { label: '"result": { ... }', desc: 'شیء داده‌ای حاوی نتایج حاصل از پردازش موفقیت‌آمیز (الزامی)' },
        { label: 'تفکیک از خطا', desc: 'در پاسخ موفق فیلد error وجود ندارد و منحصراً result ارسال می‌شود.' },
      ],
    },
    {
      id: 'notification' as const,
      label: 'Notification',
      persianLabel: 'اعلان یک‌طرفه',
      category: 'رده اصلی ۳: اعلان یک‌طرفه (بدون فیلد id و بدون پاسخ)',
      color: 'text-indigo-300',
      borderActive: 'border-indigo-400 bg-indigo-500/15',
      badgeVariant: 'indigo' as const,
      description: 'پیام اطلاع‌رسانی یک‌طرفه که برای گزارش رویداد، درصد پیشرفت یا لغو ارسال می‌شود و هیچ پاسخی ندارد.',
      code: `{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": {
    "progressToken": "tok-42",
    "progress": 50,
    "total": 100
  }
}`,
      keyFeatures: [
        { label: 'فاقد فیلد id', desc: 'شاخصه هویتی اعلان‌ها در JSON-RPC 2.0 عدم وجود فیلد id است.' },
        { label: 'بدون پاسخ', desc: 'دریافت‌کننده هرگز پاسخی برای یک Notification بازنمی‌گرداند.' },
        { label: '"method"', desc: 'نام اعلان رخداد (مانند گزارش پیشرفت کار یا لغو عملیات)' },
      ],
    },
    {
      id: 'error' as const,
      label: 'Response with Error',
      persianLabel: 'پاسخ همراه با خطا',
      category: 'رده اصلی ۲ (واریانت ۲): واریانت خطای ساختاریافته در پیام Response',
      color: 'text-rose-300',
      borderActive: 'border-rose-400 bg-rose-500/15',
      badgeVariant: 'slate' as const,
      description: 'اعلام رسمی ناتوانی در پردازش درخواست. این پیام واریانتی از ساختار Response است (نه رده مستقل چهارم).',
      code: `{
  "jsonrpc": "2.0",
  "id": "req-101",
  "error": {
    "code": -32602,
    "message": "Invalid params: query execution timed out",
    "data": {
      "table": "users",
      "timeoutSeconds": 30
    }
  }
}`,
      keyFeatures: [
        { label: '"id": "req-101"', desc: 'شناسه درخواست متناظری که با شکست مواجه شده است' },
        { label: '"code": -32602', desc: 'کد عددی استاندارد خطا مطابق مشخصات JSON-RPC 2.0' },
        { label: '"message"', desc: 'توصیف کوتاه و رسمی علت خطا' },
        { label: '"data": { ... }', desc: 'شیء اختیاری حاوی اطلاعات جزئی‌تر برای اشکال‌زدایی' },
      ],
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-04-4-json-rpc-patterns">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۴.۴ • ساختار پیام‌رسانی
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تبادل ساختاریافته با استاندارد{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            JSON-RPC 2.0
          </span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          پروتکل MCP از زبان استاندارد و سبک <span className="font-mono text-cyan-300" dir="ltr">JSON-RPC 2.0</span> بهره می‌برد. پیام‌ها به ۳ رده بنیادین تقسیم می‌شوند و پاسخ‌ها دارای دو واریانت موفق و همراه با خطا هستند.
        </p>
      </div>

      {/* Main Container Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        
        {/* Interactive Tabs Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <span className="text-xs font-bold text-slate-300">
              الگوهای پیام و واریانت‌های پاسخ را انتخاب کنید:
            </span>
            <span className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
              3 Primary Categories + Response Variants
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-sans space-y-0.5 ${
                    isSelected
                      ? tab.borderActive + ' shadow-md'
                      : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className={`text-xs font-bold ${isSelected ? tab.color : 'text-slate-200'}`} dir="ltr">
                    {tab.label}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {tab.persianLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pattern Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left / Code Box (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#070B14] border border-slate-800 p-4 space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Code2 className={`w-4 h-4 ${currentTab.color}`} />
                <span className="text-xs font-mono text-slate-300" dir="ltr">
                  payload.json
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  iconStart={
                    copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )
                  }
                  className="text-[11px] h-7 px-2.5"
                >
                  {copied ? 'کپی شد' : 'کپی JSON'}
                </Button>
              </div>
            </div>

            {/* Code Content */}
            <pre
              className="p-3.5 rounded-xl bg-[#0A0F1D] text-xs font-mono text-cyan-200/90 leading-relaxed overflow-x-auto selection:bg-cyan-500/30"
              dir="ltr"
            >
              <code>{currentTab.code}</code>
            </pre>

            {/* Correlation ID Note */}
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                {activeTab === 'notification'
                  ? 'اعلان‌ها فاقد شناسه id هستند (یک‌طرفه).'
                  : 'تطابق شناسه id میان درخواست و پاسخ:'}
              </span>
              <span
                className={`font-mono px-2 py-0.5 rounded font-bold ${
                  activeTab === 'notification'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}
                dir="ltr"
              >
                {activeTab === 'notification' ? 'NO "id" FIELD' : 'id: "req-101"'}
              </span>
            </div>
          </div>

          {/* Right / Explanations & Properties (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <Badge variant={currentTab.badgeVariant} size="sm">
                {currentTab.category}
              </Badge>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {currentTab.description}
              </p>
            </div>

            {/* Field breakdown list */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-200 block">
                تحلیل اجزای ساختار پیام:
              </span>
              <div className="space-y-2">
                {currentTab.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800/80 space-y-0.5"
                  >
                    <div className="text-xs font-mono text-cyan-300 font-bold" dir="ltr">
                      {feat.label}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      {feat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Precision Alert */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/20 via-[#10192D] to-indigo-950/20 border border-slate-700/60 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed font-sans">
            <strong className="text-slate-200 block">نکته علمی پیرامون طبقه‌بندی استاندارد JSON-RPC 2.0:</strong>
            <p className="text-slate-300">
              «استاندارد JSON-RPC 2.0 منحصراً ۳ رده پیام (Request، Response و Notification) را تعریف می‌کند. پاسخ همراه با خطا (Response with Error) یک رده پیام چهارم نیست؛ بلکه ساختار پیام Response است که به جای فیلد result، حامل شیء error می‌باشد.»
            </p>
          </div>
        </div>

        {/* Collapsible Presenter Notes */}
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
                    «پروتکل MCP چرخ را از ابتدا اختراع نکرده است؛ برای زبان گفتگو میان کلاینت و سرور، از استاندارد بالغ و سبک JSON-RPC 2.0 استفاده می‌کند. در مشخصات استاندارد، پیام‌ها به سه رده اصلی تقسیم می‌شوند: اول Request، یعنی زمانی که کلاینت درخواستی را به سرور می‌فرستد و منتظر پاسخ می‌ماند. فیلد id در اینجا نقشی کلیدی دارد؛ زیرا در تبادل ناهمگام (Asynchronous)، کلاینت به کمک این شناسه می‌فهمد کدام پاسخ مربوط به کدام درخواست است. رده دوم Response است که متناظر با همان id بازمی‌گردد. در استاندارد، Response دو حالت دارد: یا نتیجه موفق با فیلد result است، یا پاسخ همراه با خطا (Response with Error) با فیلد error و کدهای خطای مشخص؛ بنابراین پاسخ خطا یک ساختار جدا از پاسخ نیست، بلکه واریانت خطا در پیام پاسخ است. رده سوم هم Notificationها یا اعلان‌های یک‌طرفه هستند؛ پیام‌هایی برای اطلاع‌رسانی وضعیت یا پیشرفت که شاخصه هویتی‌شان نداشتن فیلد id و عدم ارسال پاسخ است.»
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
