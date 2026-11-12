import React from 'react';
import Link from 'next/link';
import { Cpu, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRESENTATION_METADATA } from '@/lib/presentation';

export function Footer() {
  return (
    <footer className="border-t border-indigo-500/10 bg-[#070A14] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column (Persian Right) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-200 text-sm">
              {PRESENTATION_METADATA.title}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            پروژه ارائه تعاملی و دانشگاهی با هدف تبیین معماری پروتکل زمینه مدل (MCP) و جایگاه آن در اکوسیستم هوش مصنوعی عامل‌محور.
          </p>
        </div>

        {/* Technical Badges / Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141C2E] border border-slate-800 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span dir="ltr">JSON-RPC 2.0 Standard</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141C2E] border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>معماری امن و ایزوله</span>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <Link
            href="/presentation"
            className="hover:text-cyan-300 transition-colors"
          >
            اسلایدهای ارائه
          </Link>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
          >
            <span dir="ltr">modelcontextprotocol.io</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
        طراحی‌شده برای مخاطبان و دانشجویان فنی و دانشگاهی • مدت ارائه: ~۲۵ دقیقه • نسخه آزمایشی ۱.۰
      </div>
    </footer>
  );
}

