'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CONSTANTS } from './mockData';

export function ProtocolDispatchSection() {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  const requestJson = {
    jsonrpc: '2.0',
    id: CONSTANTS.REQUEST_ID,
    method: 'tools/call',
    params: {
      name: CONSTANTS.TOOL_NAME,
      arguments: {
        sku: CONSTANTS.SKU,
      },
      _meta: {
        'io.modelcontextprotocol/protocolVersion': CONSTANTS.PROTOCOL_VERSION,
        'io.modelcontextprotocol/clientCapabilities': {},
        'io.modelcontextprotocol/clientInfo': {
          name: CONSTANTS.CLIENT_NAME,
          version: CONSTANTS.CLIENT_VERSION,
        },
      },
    },
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-05-3-protocol-dispatch">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">
          بخش ۵.۳ • تبادل پروتکلی
        </Badge>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          فرمول‌بندی درخواست رسمی{' '}
          <span className="font-mono text-cyan-300" dir="ltr">
            tools/call
          </span>{' '}
          با فراداده‌های الزامی{' '}
          <span className="font-mono text-indigo-300" dir="ltr">
            _meta
          </span>
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          اینجا پروتکل MCP متولد می‌شود: کلاینت MCP اختصاصی هاست، خروجی مدل را به یک فریم خوداتکای JSON-RPC 2.0 با فراداده‌های استاندارد نسخه ۲۰۲۶-۰۷-۲۸ تبدیل کرده و به سمت سرور شلیک می‌کند.
        </p>
      </div>

      {/* 2. Main Protocol Message Card */}
      <Card variant="solid" className="p-6 sm:p-8 border-cyan-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              فریم رسمی پروتکل MCP JSON-RPC 2.0 (ارسالی توسط کلاینت)
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">
              Method: tools/call
            </Badge>
            <Badge variant="indigo" size="sm">
              ID: {CONSTANTS.REQUEST_ID}
            </Badge>
          </div>
        </div>

        {/* JSON Code Box */}
        <div className="space-y-2">
          <pre
            dir="ltr"
            className="font-mono text-xs sm:text-[13px] text-cyan-300/90 leading-relaxed overflow-x-auto p-4 rounded-xl bg-slate-950/90 border border-slate-800"
          >
            <code>{JSON.stringify(requestJson, null, 2)}</code>
          </pre>
        </div>

        {/* Architectural Dissections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              شناسه یکتا ({CONSTANTS.REQUEST_ID})
            </span>
            <p className="text-slate-400 leading-relaxed">
              جهت تطبیق ناهمگام پاسخ سرور با درخواست ارسالی کلاینت در محیط‌های مالتی‌پلکس.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              فراداده الزامی _meta
            </span>
            <p className="text-slate-400 leading-relaxed">
              حمل الزامی نسخه پروتکل (2026-07-28) و قابلیت‌های کلاینت بر پایه هسته بدون نشست.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              استقلال کامل از ترابری
            </span>
            <p className="text-slate-400 leading-relaxed">
              این ساختار معنایی، چه روی لوله‌های محلی STDIO فرستاده شود و چه بدنه HTTP POST، یکسان است.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Speaker Notes Toggle */}
      <div className="border border-slate-800/80 rounded-2xl bg-slate-900/40 overflow-hidden">
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors text-xs sm:text-sm font-medium cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            یادداشت تفصیلی ارائه‌دهنده (Presenter Notes)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
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
              transition={{ duration: 0.25 }}
              className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 space-y-2 bg-[#0B1020]/90"
            >
              <p className="border-r-2 border-cyan-500 pr-3 my-2 text-slate-300">
                «اینجا دقیقاً همان نقطه‌ای است که پروتکل MCP متولد می‌شود! کلاینت MCP یک پیام JSON-RPC 2.0 رسمی با متد tools/call می‌سازد. به ساختار پیام دقت کنید: یک شناسه منحصر‌به‌فرد مثل req-042 برای پیگیری ناهمگام، نام ابزار و پارامترها، و از همه مهم‌تر در استاندارد ۲۰۲۶، شیء _meta که نسخه پروتکل و قابلیت‌های کلاینت را حمل می‌کند. کلاینت این پیام خوداتکا را از طریق ترابری فعال—چه پایپ‌های ورودی/خروجی STDIO و چه وب‌سرویس Streamable HTTP—به سمت سرور انبار شلیک می‌کند.»
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
