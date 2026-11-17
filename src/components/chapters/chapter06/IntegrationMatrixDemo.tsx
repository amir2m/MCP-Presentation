'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Network,
  Share2,
  AlertTriangle,
  Info,
  Code,
  Monitor,
  Bot,
  Database,
  BookOpen,
  Headphones,
  Sparkles,
  ArrowRightLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MatrixViewMode } from './types';
import {
  AI_HOSTS,
  EXTERNAL_SERVICES,
  MATRIX_CONNECTIONS,
  MATRIX_EDUCATIONAL_DISCLAIMER,
} from './mockData';

export function IntegrationMatrixDemo() {
  const [viewMode, setViewMode] = useState<MatrixViewMode>('custom-m-times-n');
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);

  // Filter connections if a host or service is selected
  const visibleConnections = MATRIX_CONNECTIONS.filter((conn) => {
    if (activeConnectionId) return conn.id === activeConnectionId;
    if (selectedHostId && conn.hostId !== selectedHostId) return false;
    if (selectedServiceId && conn.serviceId !== selectedServiceId) return false;
    return true;
  });

  const getHostIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Monitor':
        return <Monitor className="w-4 h-4 text-indigo-400" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-purple-400" />;
      default:
        return <Code className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4 text-rose-400" />;
      default:
        return <Database className="w-4 h-4 text-emerald-400" />;
    }
  };

  const selectedConnectionObj = MATRIX_CONNECTIONS.find((c) => c.id === activeConnectionId);

  return (
    <div className="space-y-6" id="integration-matrix-demo">
      {/* 1. Interactive Mode Switcher & Metric Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-[#090E1A] border border-slate-800">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-400" />
          <div>
            <h4 className="font-bold text-white text-sm">شبیه‌ساز ماتریس اتصالات سازمانی</h4>
            <span className="text-xs text-slate-400">
              مقایسه رویکرد اتصالات سنتی با استانداردسازی پروتکل MCP
            </span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewMode('custom-m-times-n');
              setActiveConnectionId(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'custom-m-times-n'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>حالت ۱: اتصالات سفارشی (M × N)</span>
          </button>

          <button
            onClick={() => {
              setViewMode('mcp-m-plus-n');
              setActiveConnectionId(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'mcp-m-plus-n'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>حالت ۲: معماری استاندارد (M + N)</span>
          </button>
        </div>
      </div>

      {/* 2. Educational Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1: Runtime Connections */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>روابط منطقی زمان اجرا (Runtime Relationships)</span>
            <span className="font-mono text-cyan-400">3 Hosts × 3 Services</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
            <span>۹ رابطه منطقی فعال</span>
            <Badge variant="cyan" size="sm" className="text-[10px]">
              در هر دو حالت ثابت
            </Badge>
          </div>
          <p className="text-[11px] text-slate-400">
            در توپولوژی کامل، تعداد روابط منطقی کلاینت-سرور میان ۳ هاست و ۳ سرور همواره ۹ رابطه فعال است.
          </p>
        </div>

        {/* Metric 2: Implementation Units */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>واحدهای پیاده‌سازی و کدنویسی (Implementation Units)</span>
            <span className="font-mono text-indigo-400">
              {viewMode === 'custom-m-times-n' ? 'M × N Model' : 'M + N Model'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono flex items-center gap-2">
            {viewMode === 'custom-m-times-n' ? (
              <span className="text-amber-400">۹ کد چسباننده سفارشی</span>
            ) : (
              <span className="text-emerald-400">۶ واحد پیاده‌سازی مستقل (۳+۳)</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {viewMode === 'custom-m-times-n'
              ? 'در مدل تئوری بدون بازاستفاده، هر برنامه برای هر سرویس کدهای اتصال و نگاشت جداگانه می‌نویسد.'
              : '۳ کدبیس کلاینت استاندارد + ۳ سرور مستقل MCP (مدل ساده‌شده آموزشی؛ هر هاست در ران‌تایم برای ارتباط با هر سرور یک نمونه کلاینت منطقی مستقل مدیریت می‌کند؛ در نسخه 2026-07-28 ارتباط در سطح پروتکل بدون حالت و مستقل است).'}
          </p>
        </div>

        {/* Metric 3: Maintenance Status */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>هزینه نگهداری با تغییر یک وب‌سرویس</span>
            <span className="font-mono text-slate-500">Impact Analysis</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono flex items-center gap-2">
            {viewMode === 'custom-m-times-n' ? (
              <span className="text-rose-400 text-lg">۳ بازنویسی مجزا در هاست‌ها</span>
            ) : (
              <span className="text-cyan-400 text-lg">۱ به‌روزرسانی در سرور MCP</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {viewMode === 'custom-m-times-n'
              ? 'تغییر وب‌سرویس انبار نیازمند تغییر کد در تک‌تک برنامه‌های IDE، دسکتاپ و ایجنت است.'
              : 'فقط سرور انبار به‌روزرسانی می‌شود و کلاینت‌ها بدون تغییر کد به کار ادامه می‌دهند.'}
          </p>
        </div>
      </div>

      {/* 3. Main Interactive Canvas: 3 Hosts <---> 3 Services */}
      <Card variant="solid" className="p-4 sm:p-6 border-indigo-500/20 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>برای فیلتر کردن اتصالات، روی هر هاست یا سرویس کلیک کنید:</span>
          </div>

          {(selectedHostId || selectedServiceId || activeConnectionId) && (
            <button
              onClick={() => {
                setSelectedHostId(null);
                setSelectedServiceId(null);
                setActiveConnectionId(null);
              }}
              className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
            >
              نمایش همه ۹ اتصال
            </button>
          )}
        </div>

        {/* Responsive Grid: Column 1 (Hosts), Column 2 (Matrix Lines), Column 3 (Services) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Column 1: AI Hosts (3 units) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-300 border-b border-slate-800 pb-1.5">
              <span>برنامه‌های هوش مصنوعی (M = 3 Hosts)</span>
              <Badge variant="cyan" size="sm" className="text-[10px]">
                {viewMode === 'custom-m-times-n' ? '۳ هاست با کدهای سفارشی' : '۳ کدبیس کلاینت استاندارد'}
              </Badge>
            </div>

            {AI_HOSTS.map((host) => {
              const isSelected = selectedHostId === host.id;
              return (
                <div
                  key={host.id}
                  onClick={() => {
                    setSelectedHostId(isSelected ? null : host.id);
                    setActiveConnectionId(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                        {getHostIcon(host.iconName)}
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {host.namePersian}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/80" dir="ltr">
                      {host.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{host.description}</p>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">{host.role}</span>
                    <span className="font-mono text-indigo-400">۳ اتصال خروجی</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Center Connection Visualization (9 Channels) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="p-3 rounded-xl bg-[#080d1a] border border-slate-800 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300">
                <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                <span>
                  {viewMode === 'custom-m-times-n'
                    ? '۹ اتصال سفارشی مجزا (M × N = 9)'
                    : '۹ رابطه منطقی کلاینت-سرور روی ۶ واحد کد (M + N = 6)'}
                </span>
              </div>

              {/* 9 Connection Badges / Channels */}
              <div className="space-y-1.5 max-h-72 overflow-y-auto p-1 pr-2">
                {MATRIX_CONNECTIONS.map((conn) => {
                  const isVisible = visibleConnections.some((c) => c.id === conn.id);
                  const isActive = activeConnectionId === conn.id;

                  return (
                    <div
                      key={conn.id}
                      onClick={() => setActiveConnectionId(isActive ? null : conn.id)}
                      className={`p-2 rounded-lg text-right transition-all cursor-pointer text-xs border ${
                        !isVisible
                          ? 'opacity-25 grayscale border-transparent'
                          : isActive
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-sm'
                          : viewMode === 'custom-m-times-n'
                          ? 'bg-amber-950/20 border-amber-500/30 text-amber-200 hover:border-amber-500/60'
                          : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200 hover:border-cyan-500/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px]" dir="ltr">
                        <span className="font-bold">{conn.label}</span>
                        <span className="text-[10px] text-slate-400">
                          {viewMode === 'custom-m-times-n' ? 'Custom Glue' : 'MCP Client-Server'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {viewMode === 'custom-m-times-n'
                          ? conn.customGlueCodeDescription
                          : conn.mcpStandardChannel}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500">
                کلیک روی هر اتصال برای مشاهده کالبدشکافی کد و رابطه منطقی کلاینت-سرور
              </div>
            </div>
          </div>

          {/* Column 3: External Services (3 units) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-300 border-b border-slate-800 pb-1.5">
              <span>سرویس‌ها و سیستم‌ها (N = 3 Services)</span>
              <Badge variant="success" size="sm" className="text-[10px]">
                {viewMode === 'custom-m-times-n' ? '۳ درگاه مجزا' : '۳ سرور مستقل MCP'}
              </Badge>
            </div>

            {EXTERNAL_SERVICES.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedServiceId(isSelected ? null : service.id);
                    setActiveConnectionId(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-500 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {service.namePersian}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400" dir="ltr">
                      {service.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{service.description}</p>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-slate-500" dir="ltr">
                      {service.endpoint}
                    </span>
                    <span className="font-mono text-emerald-400">۳ اتصال ورودی</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Active Connection Inspector Card */}
        {selectedConnectionObj && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                کالبدشکافی اتصال فعال:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">
                  {selectedConnectionObj.label}
                </span>
              </span>
              <Badge variant="cyan" size="sm">
                Active Inspection
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-1">
                <span className="text-amber-400 font-bold block">
                  وضعیت در معماری اتصالات سفارشی (Mode A):
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedConnectionObj.customGlueCodeDescription}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-400 font-bold block">
                  وضعیت در معماری استاندارد MCP (Mode B):
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedConnectionObj.mcpStandardChannel}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. Persistent & Mandatory Educational Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs leading-relaxed text-amber-200">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 block">نکته تدقیق علمی و سلب ادعای ریاضی الزامی:</span>
            <p className="text-amber-200/90 text-[11px] leading-relaxed">
              {MATRIX_EDUCATIONAL_DISCLAIMER}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
