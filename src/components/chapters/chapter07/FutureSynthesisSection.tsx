'use client';

import React from 'react';
import {
  Sparkles,
  Compass,
  Building2,
  MessageSquare,
  Code2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlidePresenterNotes } from '@/components/presentation/SlidePresenterNotes';
import { CHAPTER_07_PRESENTER_NOTES } from './presenterNotes';
import { ROADMAP_PRIORITIES } from './mockData';
import { GrandSynthesisBoard } from './GrandSynthesisBoard';

interface FutureSynthesisSectionProps {
  onSelectChapter?: (chapterId: number) => void;
}

export function FutureSynthesisSection({ onSelectChapter }: FutureSynthesisSectionProps) {

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="section-07-6-future-synthesis">
      {/* 1. Header with Badges */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="cyan" size="md">
            بخش ۷.۶ • افق آینده و جمع‌بندی نهایی
          </Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>مدت زمان ارائه: ۴۰ ثانیه</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          افق آینده، استانداردسازی باز و جمع‌بندی نهایی ارائه
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          استاندارد باز MCP ذیل بنیاد لینوکس مسیر تکامل اکوسیستم عامل‌های هوشمند را تعیین می‌کند؛ نگاهی به پنج اولویت نقشه راه و جمع‌بندی هفت فصل آموزش دانشگاهی.
        </p>
      </div>

      {/* 2. Governance Context & Linux Foundation (AAIF) Callout */}
      <Card variant="translucent" className="p-4 sm:p-5 border-cyan-500/30 bg-[#0E1526]/80 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            حاکمیت باز و خانه حقوقی بی‌طرف (Agentic AI Foundation - AAIF):
          </span>
          <Badge variant="outline" size="sm" isLTR className="font-mono text-cyan-300">
            Linux Foundation • Dec 2025
          </Badge>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          در ۹ دسامبر ۲۰۲۵، بنیاد لینوکس تشکیل بنیاد هوش مصنوعی عامل‌محور (<span className="font-mono text-cyan-300" dir="ltr">AAIF</span>) را اعلام نمود و پروژه <span className="font-mono text-indigo-300" dir="ltr">MCP</span> به عنوان یکی از پروژه‌های بنیان‌گذار به این نهاد خنثی اهدا شد. این امر تضمین می‌کند که استاندارد متعلق به هیچ شرکت تجاری خاصی نخواهد بود و در فضایی متن‌باز و بی‌طرف تکامل خواهد یافت.
        </p>
      </Card>

      {/* 3. Five Official Roadmap Priorities */}
      <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              پنج اولویت راهبردی نقشه راه رسمی MCP (نسخه اوت ۲۰۲۶)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            (بیان اولویت‌ها و جهت‌گیری جاری پروژه، نه تعهد زمانی صلب)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {ROADMAP_PRIORITIES.map((priority) => (
            <div
              key={priority.id}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono" dir="ltr">
                  Priority #{priority.priorityNumber}
                </span>
                <span className="text-[10px] text-cyan-400/80 font-medium">
                  {priority.statusBadge}
                </span>
              </div>

              <div className="font-bold text-slate-200 line-clamp-1">{priority.titlePersian}</div>
              <div className="text-[10px] font-mono text-slate-400" dir="ltr">
                {priority.titleEnglish}
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                {priority.descriptionPersian}
              </p>
            </div>
          ))}

          {/* Sixth Box: Invitation to Open Contribution */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Code2 className="w-4 h-4" />
                <span>مشارکت باز در توسعه استاندارد</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                جامعه متن‌باز و مهندسان هوش مصنوعی می‌توانند با ثبت RFCها و مشارکت در SDKها، در تکامل آینده این اکوسیستم نقش‌آفرینی کنند.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-400" dir="ltr">
              github.com/modelcontextprotocol
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Primary Interactive Widget C: GrandSynthesisBoard */}
      <GrandSynthesisBoard onSelectChapter={onSelectChapter} />

      {/* 5. Q&A Participation Prompt */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-purple-950/40 border border-cyan-500/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>پایان اسلایدهای ارائه دانشگاهی</span>
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-white">
          از توجه، همراهی و مشارکت علمی شما کمال تشکر را داریم
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          اکنون زمان بخش پرسش و پاسخ، بررسی چالش‌های پیاده‌سازی و بحث آزاد فنی پیرامون Model Context Protocol است.
        </p>
      </div>

      {/* 6. Slide Presenter Notes (Standardized 8-Section System) */}
      <SlidePresenterNotes note={CHAPTER_07_PRESENTER_NOTES[5]} />
    </div>
  );
}
