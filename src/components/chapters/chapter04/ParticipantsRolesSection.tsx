'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AppWindow,
  Workflow,
  Server,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Layers,
  ArrowLeftRight,
  KeyRound,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ParticipantsRolesSection() {
  const [selectedRole, setSelectedRole] = useState<'host' | 'client' | 'server'>('host');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const roles = [
    {
      id: 'host' as const,
      namePersian: 'برنامه میزبان (Host)',
      nameEnglish: 'MCP Host Application',
      subtitle: 'هماهنگ‌کننده محیط کاربر، مدل هوش مصنوعی و امنیت',
      accentColor: 'text-cyan-300',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/20',
      badgeVariant: 'cyan' as const,
      icon: AppWindow,
      responsibilities: [
        'واسط کاربری و ارتباط با مدل زبانی (LLM Brain): دریافت ورودی کاربر و تصمیم‌گیری پیرامون ابزارها.',
        'تجمیع کانتکست (Context Aggregation): ترکیب نتایج چند سرور برای ساخت زمینه ورودی مدل.',
        'مدیریت چرخه حیات کلاینت‌ها: ایجاد، راه‌اندازی، مدیریت خطاها و بستن پردازه‌ها.',
        'اعمال سیاست‌های امنیتی: اخذ تاییدیه و رضایت کاربر (Human-in-the-loop) برای عملیات حساس.',
      ],
      notResponsible: [
        'کدنویسی اختصاصی برای ارتباط مستقیم با دیتابیس یا فایل بدون واسطه کلاینت.',
        'اجرای بدون تایید عملیات تخریبی در سطح سیستم.',
      ],
    },
    {
      id: 'client' as const,
      namePersian: 'کلاینت پروتکل (Client)',
      nameEnglish: 'MCP Client Connector',
      subtitle: 'رابط استاندارد پروتکل با قاعده قطعی ارتباط ۱ به ۱ با سرور',
      accentColor: 'text-indigo-300',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-950/20',
      badgeVariant: 'indigo' as const,
      icon: Workflow,
      responsibilities: [
        'رابطه اختصاصی ۱ به ۱: هر کلاینت دقیقاً به یک سرور متصل است و فقط وظیفه همان کانال را دارد.',
        'ترجمه فراخوانی‌های هاست به پیام‌های ساختاریافته استاندارد JSON-RPC 2.0.',
        'اتصال به لایه ترابری (ارسال پیام روی stdin/stdout یا درخواست HTTP POST).',
        'اعتبارسنجی پاسخ‌ها، مدیریت تایم‌اوت و گزارش وضعیت به برنامه میزبان.',
      ],
      notResponsible: [
        'گفتگو با چند سرور به صورت همزمان درون یک نمونه منفرد کلاینت.',
        'تصمیم‌گیری خودمختار برای اجرای عملیات بدون دستور هاست.',
      ],
    },
    {
      id: 'server' as const,
      namePersian: 'سرور پروتکل (Server)',
      nameEnglish: 'MCP Server Provider',
      subtitle: 'تأمین‌کننده مستقل ابزارها، منابع داده‌ای و الگوهای پرامپت',
      accentColor: 'text-amber-300',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-950/20',
      badgeVariant: 'slate' as const,
      icon: Server,
      responsibilities: [
        'عرضه قابلیت‌ها: معرفی ابزارها (Tools)، منابع داده‌ای (Resources) و پرامپت‌ها (Prompts).',
        'پیاده‌سازی الزامی متد server/discover برای اعلام توانمندی‌ها و نسخه پروتکل.',
        'اجرای عملیات درخواستی در محدوده اختیارات و مجوزهای اعطاشده توسط هاست.',
        'ارسال گزارش پیشرفت کار (Progress Notifications) در حین اجرای کارهای طولانی.',
      ],
      notResponsible: [
        'دریافت کانتکست کامل چت کاربر یا آگاهی از سرورهای مجاور.',
        'تصمیم‌گیری مستقل هوش مصنوعی یا فراخوانی سر خود ابزارها.',
      ],
    },
  ];

  const currentRoleData = roles.find((r) => r.id === selectedRole)!;

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-04-2-participants-roles">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" size="md">
          بخش ۴.۲ • بازیگران اکوسیستم
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          تقسیم مسئولیت‌ها میان{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            Host
          </span>
          ،{' '}
          <span className="font-mono text-indigo-300" dir="ltr">
            Client
          </span>{' '}
          و{' '}
          <span className="font-mono text-amber-300" dir="ltr">
            Server
          </span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          در پروتکل MCP، هیچ جزئی همه وظایف را به تنهایی انجام نمی‌دهد. تفکیک ساختاریافته نقش‌ها میان سه مؤلفه، پایه معماری ماژولار و قابل توسعه اکوسیستم را شکل می‌دهد.
        </p>
      </div>

      {/* Main Container Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-indigo-500/25 space-y-6">
        
        {/* Interactive 3-Participant Diagram */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80 space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono text-slate-400 font-bold block">
              جریان تعامل سه‌گانه در یک اتصال استاندارد MCP
            </span>
          </div>

          {/* Three Connected Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {roles.map((role) => {
              const IconComp = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border text-right transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? `${role.bgColor} ${role.borderColor} ring-2 ring-${role.id === 'host' ? 'cyan-400' : role.id === 'client' ? 'indigo-400' : 'amber-400'}/30 shadow-lg`
                      : 'bg-[#12192B]/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-slate-800/80 text-white">
                      <IconComp className={`w-5 h-5 ${role.accentColor}`} />
                    </div>
                    <Badge variant={role.badgeVariant} size="sm" isLTR>
                      {role.id.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="font-bold text-sm text-slate-100">{role.namePersian}</div>
                  <div className="text-xs font-mono text-slate-400 mb-2" dir="ltr">
                    {role.nameEnglish}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 font-sans">
                    {role.subtitle}
                  </p>

                  {isSelected && (
                    <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Connection Pulse Indication */}
          <div className="hidden md:flex items-center justify-between px-8 text-xs font-mono text-slate-500" dir="ltr">
            <div className="flex items-center gap-2">
              <span>Host coordinates LLM & UI</span>
              <ArrowLeftRight className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 font-bold">1 Client Instance per Server</span>
              <ArrowLeftRight className="w-4 h-4 text-indigo-400 animate-pulse" />
            </div>
            <span>JSON-RPC 2.0 Endpoint</span>
          </div>
        </div>

        {/* Selected Role Detailed Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoleData.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`p-6 rounded-2xl border ${currentRoleData.borderColor} ${currentRoleData.bgColor} space-y-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <currentRoleData.icon className={`w-5 h-5 ${currentRoleData.accentColor}`} />
                <h4 className="text-base font-bold text-white">
                  کالبدشکافی مسئولیت‌های {currentRoleData.namePersian}
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-300" dir="ltr">
                {currentRoleData.nameEnglish}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Allowed Responsibilities */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>وظایف و کارکردهای اصلی:</span>
                </span>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {currentRoleData.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boundary / NOT responsible */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>مرزها و محدودیت‌های قطعی:</span>
                </span>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {currentRoleData.notResponsible.map((notResp, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span>{notResp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Golden Architectural Rule Callout Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-[#161F32] to-indigo-950/30 border border-amber-500/40 flex items-start gap-3.5 shadow-md">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300">
                قانون طلایی معماری (Architectural Golden Rule):
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30" dir="ltr">
                1 Client = 1 Server Connection
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              یک نمونه MCP Client نمی‌تواند به طور همزمان با چندین سرور مجزا صحبت کند. اگر یک برنامه میزبان بخواهد به ۴ سرور متصل شود، <strong>۴ نمونه کلاینت مستقل</strong> ایجاد می‌کند. برنامه میزبان (Host) مرزهای دسترسی و تجمیع کانتکست را هماهنگ می‌سازد و در سطح پروتکل ارتباط مستقیمی میان سرورها تعریف نشده است؛ بااین‌حال، این امر تضمین‌کننده ایزولاسیون کامل زیرساختی نیست زیرا سرورها ممکن است در خارج از MCP به منابع خارجی مشترک دسترسی داشته باشند.
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
                    «در کالبدشکافی MCP، مرزبندی دقیق میان سه بازیگر ضروری است. Host همان برنامه‌ای است که کاربر می‌بیند؛ برای مثال Claude Desktop یا محیط برنامه‌نویسی Cursor. هاست مغز ارتباطی و هماهنگ‌کننده است؛ اوست که تصمیم می‌گیرد با مدل زبانی گفتگو کند، اوست که رابط کاربری را نمایش می‌دهد و سیاست‌های امنیتی را کنترل می‌کند. اما هاست مستقیماً کد اتصال سرورها را در منطق خود مخلوط نمی‌کند؛ بلکه برای هر سروری که می‌خواهد به آن متصل شود، یک MCP Client مستقل می‌سازد. دقت کنید: رابطه کلاینت به سرور همیشه یک‌به‌یک است. اگر به گیت‌هاب و دیتابیس متصل هستید، هاست شما دو کلاینت مجزا ایجاد کرده است. سرورها هم برنامه‌های مستقلی هستند که ابزار و داده در اختیار می‌گذارند و هرگز سر خود کاری انجام نمی‌دهند، مگر با پیام مستقیم کلاینت.»
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
