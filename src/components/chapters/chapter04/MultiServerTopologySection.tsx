'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  HardDrive,
  Database,
  FileCode2,
  ShieldCheck,
  XCircle,
  Layers,
  ChevronDown,
  AppWindow,
  Workflow,
  Network,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function MultiServerTopologySection() {
  const [activeServerId, setActiveServerId] = useState<string>('fs');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const servers = [
    {
      id: 'fs',
      name: 'Filesystem Server',
      namePersian: 'سرور سیستم فایل محلی',
      desc: 'خواندن، ویرایش و جستجوی فایل‌های پروژه در دیسک محلی.',
      icon: HardDrive,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/20',
      tools: ['read_file', 'write_file', 'list_dir'],
      isolationBoundary: 'تنها به مسیرهای مجاز فایل‌سیستم دسترسی دارد و از وضعیت دیتابیس یا گیت کاملاً بی‌خبر است.',
    },
    {
      id: 'db',
      name: 'PostgreSQL Server',
      namePersian: 'سرور پایگاه داده سازمانی',
      desc: 'اجرای کوئری‌های SQL و استخراج شمای جداول پایگاه داده.',
      icon: Database,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-950/20',
      tools: ['execute_query', 'get_schema', 'explain_query'],
      isolationBoundary: 'فقط داده‌های مجاز SQL را برمی‌گرداند؛ هیچ دسترسی به فایل‌های هارد یا مکالمات کاربر ندارد.',
    },
    {
      id: 'git',
      name: 'Git Server',
      namePersian: 'سرور کنترل نسخه گیت',
      desc: 'مشاهده تاریخچه کامیت‌ها، تغییرات شاخه‌ها و مدیریت PRها.',
      icon: FolderGit2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-950/20',
      tools: ['git_status', 'git_diff', 'list_commits'],
      isolationBoundary: 'به تاریخچه مخزن دسترسی دارد اما توانایی تعامل مستقیم با سرور دیتابیس یا اسناد را ندارد.',
    },
    {
      id: 'docs',
      name: 'API Docs Server',
      namePersian: 'سرور اسناد آنلاین کتابخانه‌ها',
      desc: 'واکشی مستندات به‌روز فریم‌ورک‌ها و کتابخانه‌ها از وب.',
      icon: FileCode2,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-950/20',
      tools: ['search_docs', 'get_doc_page'],
      isolationBoundary: 'تنها اسناد وب را جستجو می‌کند و هیچ اطلاعی از کدهای اختصاصی پروژه ندارد.',
    },
  ];

  const activeServer = servers.find((s) => s.id === activeServerId)!;

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-04-3-multi-server-boundaries">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۴.۳ • توپولوژی چندسروری
        </Badge>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          همکاری چند سرور در پناه کنترل برنامه میزبان (<span className="font-mono text-cyan-300" dir="ltr">Host Coordination</span>)
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          یک دستیار مهندسی هوش مصنوعی برای حل مسائل واقعی، معمولاً نیازمند چند سرور تخصصی هم‌زمان است. مرزهای امنیتی و ایزولاسیون چگونه در این چیدمان حفظ می‌شوند؟
        </p>
      </div>

      {/* Main Interactive Diagram Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        
        {/* Conceptual Hub & Spoke Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-200 text-sm sm:text-base">
              مدل مفهومی توپولوژی ستاره‌ای (<span className="font-mono text-cyan-300 text-xs sm:text-sm" dir="ltr">Conceptual Hub & Spoke Topology</span>)
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60" dir="ltr">
            1 Host → N Dedicated Clients → N Servers
          </span>
        </div>

        {/* 2D Schematic: Hub and Spokes */}
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-slate-800/80 space-y-6">
          
          {/* Central Host Box (The Hub) */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-[#131B30] to-slate-900 border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/20 text-center space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AppWindow className="w-5 h-5 text-cyan-400" />
                <span className="font-extrabold text-slate-100 text-sm">
                  برنامه میزبان (Host) — هاب مرکزی هماهنگی و تجمیع کانتکست
                </span>
              </div>
              <Badge variant="cyan" size="sm" isLTR>
                Context Aggregator & Policy Enforcer
              </Badge>
            </div>

            {/* Internal 4 Client Instances */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {servers.map((s, idx) => (
                <div
                  key={s.id}
                  className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                    activeServerId === s.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow'
                      : 'bg-[#101728] border-slate-800 text-slate-400'
                  }`}
                  dir="ltr"
                >
                  <Workflow className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Client {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Spoke Servers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {servers.map((s) => {
              const IconComp = s.icon;
              const isSelected = activeServerId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveServerId(s.id)}
                  className={`p-4 rounded-xl border text-right transition-all cursor-pointer relative ${
                    isSelected
                      ? `${s.bgColor} ${s.borderColor} shadow-lg ring-1 ring-cyan-400/40`
                      : 'bg-[#101728]/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className={`w-5 h-5 ${s.color}`} />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300" dir="ltr">
                      MCP Server
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 mb-1" dir="ltr">
                    {s.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans line-clamp-2">
                    {s.namePersian}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Server Context Detail Banner */}
          <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <activeServer.icon className={`w-4 h-4 ${activeServer.color}`} />
                <span className="text-xs font-bold text-slate-200">
                  وضعیت اتصال اختصاصی: {activeServer.namePersian}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                <span>ابزارهای عرضه شده:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded" dir="ltr">
                  {activeServer.tools.join(', ')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              <strong className="text-amber-300">مرز ایزولاسیون:</strong> {activeServer.isolationBoundary}
            </p>
          </div>
        </div>

        {/* Three Core Architectural Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0e1628] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>عدم تعریف مسیر سرور به سرور</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              پروتکل MCP ارتباط مستقیم میان سرورها را به عنوان سازوکار هماهنگی تعریف نمی‌کند. هر سرور تنها با کلاینت خودش تبادل پیام دارد.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1628] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>تجمیع هوشمند کانتکست</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              برنامه میزبان نتایج و خروجی‌های کلاینت‌های مختلف را فیلتر کرده، کاتالوگ ابزارها را جمع‌آوری نموده و به مدل زبانی تحویل می‌دهد.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1628] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>مرزهای دسترسی و ایزولاسیون</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              سرورها به طور پیش‌فرض به Context و مکالمات سایر سرورها دسترسی ندارند، هرچند خارج از MCP ممکن است با پایگاه‌های داده مشترک در تعامل باشند.
            </p>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed font-sans">
          «در معماری استاندارد MCP، هر Client با یک Server مشخص ارتباط دارد. هماهنگی میان قابلیت‌های چند Server از طریق Host و سیاست‌های دسترسی آن مدیریت می‌شود؛ بنابراین Serverها به‌صورت پیش‌فرض به Context و مکالمات سایر Serverها دسترسی ندارند.»
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
                    «در سناریوهای واقعی مهندسی، ما معمولاً از اصل تفکیک وظایف یا Separation of Concerns استفاده می‌کنیم. در معماری استاندارد MCP، هر Client با یک Server مشخص ارتباط دارد. هماهنگی میان قابلیت‌های چند Server از طریق Host و سیاست‌های دسترسی آن مدیریت می‌شود؛ بنابراین Serverها به‌صورت پیش‌فرض به Context و مکالمات سایر Serverها دسترسی ندارند. برای درک بهتر، این الگو را به عنوان یک مدل مفهومی Hub & Spoke نمایش می‌دهیم که در آن برنامه میزبان نقش مرکز هماهنگی را بازی می‌کند. سرورها کانال پروتکلی مستقیمی برای گفتگو با یکدیگر ندارند—اگرچه ممکن است خارج از قلمرو MCP به منابع داده‌ای مشترکی وصل باشند. این هاست است که تصمیم می‌گیرد کدام ابزارها فراخوانی شوند، چه خروجی‌هایی تجمیع گردند و چه داده‌هایی در اختیار مدل قرار گیرند.»
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
