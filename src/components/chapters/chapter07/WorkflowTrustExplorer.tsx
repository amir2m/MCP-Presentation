'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  FileText,
  Boxes,
  Shield,
  ShieldAlert,
  Lock,
  Layers,
  Sparkles,
  Info,
  Terminal,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { USE_CASE_SCENARIOS } from './mockData';
import { UseCaseScenario } from './types';

export function WorkflowTrustExplorer() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('developer-ide');
  const [showTrustBoundaries, setShowTrustBoundaries] = useState<boolean>(true);

  const activeScenario: UseCaseScenario =
    USE_CASE_SCENARIOS.find((s) => s.id === selectedScenarioId) || USE_CASE_SCENARIOS[0];

  return (
    <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h4 className="text-base sm:text-lg font-bold text-white">
              کاوشگر سناریوهای واقعی و نگاشت مرزهای اعتماد
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            کالبدشکافی نقش‌های Host، Client، پروتکل MCP، و سرویس‌های زیرین در سه کاربست صنعتی
          </p>
        </div>

        {/* Trust Boundary Toggle */}
        <button
          type="button"
          onClick={() => setShowTrustBoundaries((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
            showTrustBoundaries
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-sm shadow-rose-950/40'
              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          aria-pressed={showTrustBoundaries}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{showTrustBoundaries ? 'مرزهای اعتماد: روشن' : 'مرزهای اعتماد: خاموش'}</span>
        </button>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {USE_CASE_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          const Icon =
            scenario.id === 'developer-ide'
              ? Code
              : scenario.id === 'enterprise-knowledge'
              ? FileText
              : Boxes;

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`p-3 rounded-xl border text-right transition-all duration-200 flex items-start gap-3 ${
                isSelected
                  ? 'bg-indigo-950/50 border-cyan-500/50 text-white shadow-md shadow-indigo-950/50'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="text-xs font-bold truncate">{scenario.titlePersian}</div>
                <div className="text-[10px] font-mono text-cyan-400/80 truncate" dir="ltr">
                  {scenario.titleEnglish}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scenario Architectural Blueprint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Visual Architecture Flow */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1020]/80 border border-slate-800/90 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                مسیر ارتباطی و لایه‌های پشته فنی:
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" size="sm" isLTR className="font-mono">
                  {activeScenario.transportType}
                </Badge>
                <span className="text-[11px] text-slate-400">
                  {activeScenario.transportType === 'STDIO'
                    ? 'پردازه فرزند محلی (Child Process IPC)'
                    : 'ارتباط تحت شبکه بر بستر HTTP'}
                </span>
              </div>
            </div>

            {/* Architecture Node Chain */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              {/* Node 1: Host Application */}
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-center space-y-1">
                <div className="text-[10px] uppercase font-bold text-indigo-400">AI Host</div>
                <div className="text-xs font-bold text-white">{activeScenario.hostName}</div>
                <div className="text-[10px] text-slate-400">مدیریت پرامپت، UI و کلاینت</div>
              </div>

              {/* Node 2: MCP Client */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center space-y-1">
                <div className="text-[10px] uppercase font-bold text-cyan-400">MCP Client</div>
                <div className="text-xs font-bold text-white">{activeScenario.mcpClientRole}</div>
                <div className="text-[10px] text-slate-400">پروتکل JSON-RPC 2.0</div>
              </div>

              {/* Node 3: MCP Server */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-center space-y-1">
                <div className="text-[10px] uppercase font-bold text-purple-400">MCP Server</div>
                <div className="text-xs font-bold text-white truncate">{activeScenario.mcpServerName}</div>
                <div className="text-[10px] text-slate-400 font-mono" dir="ltr">
                  {activeScenario.toolsExposed.join(', ')}
                </div>
              </div>

              {/* Node 4: Underlying Service */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Backend System</div>
                <div className="text-xs font-bold text-white truncate">{activeScenario.underlyingService}</div>
                <div className="text-[10px] text-slate-400">پایگاه داده یا سرویس سازمانی</div>
              </div>
            </div>

            {/* Trust Boundary Explanations Overlay */}
            {showTrustBoundaries && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 border-t border-slate-800/80 space-y-2.5"
              >
                <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>مرزهای اعتماد فعال در این سناریو:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {activeScenario.activeBoundaries.includes('unsandboxed-process') && (
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200/90 space-y-1">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>مرز پردازه محلی و ملاحظات سندباکس (ترابری STDIO):</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        ترابری STDIO به خودی خود ایزولاسیون سیستم‌عامل یا سندباکس ارائه نمی‌دهد و سرور با اختیارات حساب کاربری سیستم‌عامل اجرا می‌شود. هاست یا محیط استقرار می‌توانند محدودیت‌های فایل، شبکه و حداقل اختیارات را اعمال کنند؛ اجرای پردازه بدون سندباکس ریسک‌های امنیتی ایجاد می‌کند، هرچند سندباکس نیز امنیت مطلق را تضمین نمی‌نماید.
                      </p>
                    </div>
                  )}

                  {activeScenario.activeBoundaries.includes('network-oauth') && (
                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/40 text-cyan-200/90 space-y-1">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>مرز احراز هویت شبکه OAuth 2.1 (منحصراً ترابری شبکه HTTP):</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        در ترابری‌های راه دور HTTP، سرور به عنوان Resource Server موظف به اعتبارسنجی مخاطب هدف (<span className="font-mono text-cyan-300" dir="ltr">aud</span>) بوده و نباید توکن‌های کاربر را مستقیماً فوروارد کند (پیشگیری از Confused Deputy). ترابری‌های محلی STDIO مشمول این مرز شبکه نیستند.
                      </p>
                    </div>
                  )}

                  {activeScenario.activeBoundaries.includes('untrusted-data') && (
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/40 text-rose-200/90 space-y-1">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>مرز داده‌های غیرقابل‌اعتماد (Untrusted Data):</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        خروجی پایگاه اسناد یا سیستم‌های خارجی ممکن است حاوی متن مخرب باشد. هاست باید با داده‌های دریافتی به عنوان ورودی ناامن رفتار کند (OWASP LLM01:2025 و LLM05:2025).
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Detailed Narrative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Functional Mechanics Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>سازوکار عملیاتی در این سناریو:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeScenario.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">ابزارهای مواجه‌شده:</span>
                {activeScenario.toolsExposed.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/30 text-[10px] font-mono text-cyan-300"
                    dir="ltr"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Security Caution Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>مرزبندی واقع‌بینانه امنیت:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeScenario.securityRiskNote}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 font-mono" dir="ltr">
                Notice: MCP provides the protocol wire, not the application logic.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
