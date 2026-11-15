'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCode2,
  Copy,
  Check,
  Info,
  Terminal,
  Database,
  Bot,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DebuggerTabId, ScenarioDefinition } from './types';

interface PayloadDebuggerProps {
  scenario: ScenarioDefinition;
  activeTab: DebuggerTabId;
  onTabChange: (tab: DebuggerTabId) => void;
  className?: string;
  isCollapsible?: boolean;
}

interface TabConfig {
  id: DebuggerTabId;
  labelPersian: string;
  labelEnglish: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  category: 'model' | 'mcp' | 'internal' | 'user';
}

const TABS: TabConfig[] = [
  {
    id: 'model-tool-call',
    labelPersian: 'نمونه فراخوانی ابزار مدل',
    labelEnglish: 'Illustrative Model Tool-Calling Representation',
    icon: Bot,
    tag: 'رابط Host-LLM',
    category: 'model',
  },
  {
    id: 'mcp-request',
    labelPersian: 'درخواست رسمی tools/call',
    labelEnglish: 'MCP JSON-RPC Request (_meta)',
    icon: Send,
    tag: 'پروتکل MCP',
    category: 'mcp',
  },
  {
    id: 'server-sql',
    labelPersian: 'اجرای داخلی ابزار در سرور',
    labelEnglish: 'Server Internal Execution (Illustrative)',
    icon: Database,
    tag: 'سیستم خارجی',
    category: 'internal',
  },
  {
    id: 'mcp-result',
    labelPersian: 'پاسخ ابزار در پروتکل MCP',
    labelEnglish: 'MCP Result Payload (complete)',
    icon: Terminal,
    tag: 'پروتکل MCP',
    category: 'mcp',
  },
  {
    id: 'final-response',
    labelPersian: 'پاسخ نهایی مدل به کاربر',
    labelEnglish: 'Final Model Natural Response',
    icon: MessageSquare,
    tag: 'خروجی نهایی',
    category: 'user',
  },
];

export function PayloadDebugger({
  scenario,
  activeTab,
  onTabChange,
  className = '',
  isCollapsible = false,
}: PayloadDebuggerProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const getActiveContent = (): { code: string; banner: string; isJson: boolean } => {
    switch (activeTab) {
      case 'model-tool-call':
        return {
          code: JSON.stringify(scenario.modelToolCallPayload, null, 2),
          banner:
            'نمایش نمونه فراخوانی ابزار توسط مدل (Illustrative Model Tool-Calling Representation): این شیء بازنمایی قرارداد داده‌ای در رابط Host–Model است و ساختار دقیق آن وابسته به ارائه‌دهنده مدل (Anthropic / OpenAI / Gemini) است. این شیء پیام پروتکل MCP نیست!',
          isJson: true,
        };
      case 'mcp-request':
        return {
          code: JSON.stringify(scenario.mcpRequestPayload, null, 2),
          banner:
            'پیام رسمی پروتکل MCP JSON-RPC 2.0 با متد tools/call: ساخته‌شده توسط کلاینت MCP با فراداده الزامی _meta بر مبنای استاندارد مصوب ۲۰۲۶-۰۷-۲۸ (هسته مستقل از ترابری و بدون نشست).',
          isJson: true,
        };
      case 'server-sql':
        return {
          code: scenario.serverSql,
          banner:
            'اجرای داخلی سرور — پیاده‌سازی نمونه ابزار (Server Internal Execution — Illustrative Implementation): پروتکل MCP به خودی خود دستور SQL اجرا نکرده و مقید به هیچ پایگاه‌داده‌ای نیست. استفاده از کوئری SQL در این سناریو، صرفاً یک پیاده‌سازی نمونه از منطق داخلی ابزار انبار است.',
          isJson: false,
        };
      case 'mcp-result':
        return {
          code: JSON.stringify(scenario.mcpResultPayload, null, 2),
          banner:
            'پاسخ ابزار در مشخصات رسمی پروتکل MCP نسخه ۲۰۲۶-۰۷-۲۸: در صورت اجرای موفق حاوی تفکیک‌کننده رسمی resultType: complete است. توجه: صفر بودن موجودی، اجرای موفق است و هرگز خطای ابزار نیست! در زمان شکست ابزار نیز پرچم isError: true مطابق توصیه استاندارد (SHOULD) تنظیم می‌شود.',
          isJson: true,
        };
      case 'final-response':
        return {
          code: scenario.finalModelResponse,
          banner:
            'پاسخ نهایی مدل زبانی (Final Model Natural Response): مدل با استفاده از نتیجه بازگشتی ابزار در کانتکست، پاسخ نهایی را بر مبنای اطلاعات در دسترس به زبان فارسی برای کاربر تدوین می‌کند.',
          isJson: false,
        };
    }
  };

  const activeContent = getActiveContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800/90 bg-[#0A0F1D]/90 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800 bg-[#0E1528]/80">
        <div className="flex items-center gap-2.5">
          <FileCode2 className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs sm:text-sm font-bold text-white">
            دیباگر فنی بارهای داده‌ای (<span className="font-mono text-cyan-300" dir="ltr">Payload Inspector</span>)
          </h4>
          <span className="text-[10px] text-slate-400 hidden sm:inline-block">
            تفکیک دقیق ۵ لایه تبادل داده
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer"
            title="کپی محتوا"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 text-[11px]">کپی شد</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>

          {/* Optional Collapse Toggle */}
          {isCollapsible && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {/* Scrollable Tabs Bar */}
            <div className="flex items-center gap-1.5 p-2 border-b border-slate-800/80 bg-slate-950/40 overflow-x-auto scrollbar-thin">
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-500/50 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <TabIcon
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    />
                    <span>{tab.labelPersian}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isSelected
                          ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {tab.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanatory Banner */}
            <div className="px-4 py-2.5 bg-indigo-950/20 border-b border-indigo-500/15 flex items-start gap-2.5 text-[11px] text-slate-300 leading-relaxed">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>{activeContent.banner}</p>
            </div>

            {/* Code / Content Area */}
            <div className="p-4 bg-[#070B14]">
              <pre
                dir="ltr"
                className="font-mono text-xs sm:text-[13px] text-cyan-300/90 leading-relaxed overflow-x-auto p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 max-h-72 select-text"
              >
                <code>{activeContent.code}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
