'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldX,
  UserCheck,
  CheckCircle2,
  XCircle,
  Lock,
  RefreshCw,
  Terminal,
  FileCode,
  Info,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SECURITY_POLICY_ITEMS } from './mockData';
import { SecurityOperationId, SecurityPolicyItem } from './types';

export function SecurityPolicySimulator() {
  const [selectedOpId, setSelectedOpId] = useState<SecurityOperationId>('reorder_inventory');
  // State for the human confirmation gate on the CONFIRM operation
  const [confirmedState, setConfirmedState] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const activeOp: SecurityPolicyItem =
    SECURITY_POLICY_ITEMS.find((item) => item.id === selectedOpId) || SECURITY_POLICY_ITEMS[0];

  const handleSelectOp = (id: SecurityOperationId) => {
    setSelectedOpId(id);
    setConfirmedState('pending');
  };

  const handleApprove = () => {
    // Hard programmatic guard: DENY operations can never be approved
    if (activeOp.defaultDecision === 'DENY') return;
    setConfirmedState('approved');
  };

  const handleReject = () => {
    if (activeOp.defaultDecision === 'DENY') return;
    setConfirmedState('rejected');
  };

  const handleReset = () => {
    setConfirmedState('pending');
  };

  return (
    <Card variant="solid" className="p-5 sm:p-7 border-indigo-500/25 space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base sm:text-lg font-bold text-white">
              شبیه‌ساز سیاست‌های امنیتی هاست و نظارت انسانی (Host Policy & HITL)
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            ارزیابی خط‌مشی مبتنی بر ریسک، اصل حداقل اختیارات (Least Privilege) و دروازه‌های تایید کاربر
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-cyan-300 self-start sm:self-auto">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>محیط آموزشی شبیه‌سازی‌شده (Mock Policy Sandbox)</span>
        </div>
      </div>

      {/* 4 Operations Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SECURITY_POLICY_ITEMS.map((item) => {
          const isSelected = item.id === selectedOpId;

          // Badges and colors per policy decision
          const badgeConfig =
            item.defaultDecision === 'ALLOW'
              ? { text: 'ALLOW', bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', icon: CheckCircle2 }
              : item.defaultDecision === 'CONFIRM'
              ? { text: 'CONFIRM (HITL)', bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30', icon: UserCheck }
              : { text: 'DENY', bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30', icon: XCircle };

          const BadgeIcon = badgeConfig.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectOp(item.id)}
              className={`p-3.5 rounded-xl border text-right transition-all duration-200 flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-indigo-950/50 border-cyan-500/50 shadow-md shadow-indigo-950/40'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white truncate">{item.name}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border ${badgeConfig.bg}`}
                    dir="ltr"
                  >
                    <BadgeIcon className="w-3 h-3" />
                    {badgeConfig.text}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400/80" dir="ltr">
                  {item.toolName}()
                </div>
              </div>

              <div className="text-[11px] text-slate-400 line-clamp-2">
                {item.summaryPersian}
              </div>
            </button>
          );
        })}
      </div>

      {/* Policy Pipeline Lifecycle Visualization */}
      <div className="p-4 rounded-xl bg-[#0B1020]/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80 text-xs">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            جریان تصمیم‌گیری در برنامه میزبان (Policy Enforcement Sequence):
          </span>
          <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
            Intent → Policy Gate → Action
          </span>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
          {/* Stage 1: Intent */}
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Stage 1: Intent</div>
            <div className="font-semibold text-slate-200">پیشنهاد مدل / درخواست کاربر</div>
            <div className="text-[10px] font-mono text-cyan-400" dir="ltr">
              call: {activeOp.toolName}
            </div>
          </div>

          {/* Stage 2: Policy Check */}
          <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 space-y-1">
            <div className="text-[10px] text-indigo-400 uppercase font-mono">Stage 2: Policy Gate</div>
            <div className="font-semibold text-white">ارزیابی سطح ریسک هاست</div>
            <div className="text-[10px] text-indigo-300">{activeOp.riskLevelPersian}</div>
          </div>

          {/* Stage 3: Decision */}
          <div
            className={`p-2.5 rounded-lg border space-y-1 ${
              activeOp.defaultDecision === 'ALLOW'
                ? 'bg-emerald-950/40 border-emerald-500/40'
                : activeOp.defaultDecision === 'CONFIRM'
                ? 'bg-amber-950/40 border-amber-500/40'
                : 'bg-rose-950/40 border-rose-500/40'
            }`}
          >
            <div className="text-[10px] uppercase font-mono text-slate-300">Stage 3: Decision</div>
            <div
              className={`font-bold ${
                activeOp.defaultDecision === 'ALLOW'
                  ? 'text-emerald-300'
                  : activeOp.defaultDecision === 'CONFIRM'
                  ? 'text-amber-300'
                  : 'text-rose-300'
              }`}
            >
              {activeOp.defaultDecision}
            </div>
            <div className="text-[10px] text-slate-300">{activeOp.decisionPersian}</div>
          </div>

          {/* Stage 4: Outcome */}
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Stage 4: Execution</div>
            <div className="font-semibold text-slate-200">وضعیت نهایی ابزار</div>
            <div className="text-[10px] text-slate-400">
              {activeOp.defaultDecision === 'DENY'
                ? 'مسدودسازی قطعی'
                : activeOp.defaultDecision === 'CONFIRM'
                ? confirmedState === 'approved'
                  ? 'تایید شد و اجرا گردید'
                  : confirmedState === 'rejected'
                  ? 'توسط کاربر لغو شد'
                  : 'در انتظار تایید اپراتور'
                : 'اجرا شده'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Active Operation Details & Controls */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOp.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Detailed Policy Reasoning Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Scientific Justification & Security Standards */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>تحلیل علمی و استناد امنیتی:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeOp.riskExplanationPersian}
              </p>

              <div className="space-y-1 pt-2 border-t border-slate-800/80 text-[11px]">
                <div className="text-slate-400">
                  <strong className="text-slate-300">مرجع OWASP 2025:</strong>{' '}
                  <span className="font-mono text-cyan-300" dir="ltr">
                    {activeOp.owaspReference}
                  </span>
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-300">منبع راهنمای پروتکل:</strong>{' '}
                  <span className="text-slate-300">{activeOp.mcpSpecReference}</span>
                </div>
              </div>
            </div>

            {/* Right: Payload & Action Gate */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    پارامترهای ابزار (Payload):
                  </span>
                  <span className="text-[10px] font-mono text-slate-400" dir="ltr">
                    JSON-RPC arguments
                  </span>
                </div>

                <div
                  className="p-2.5 rounded-lg bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto"
                  dir="ltr"
                >
                  <pre>{JSON.stringify(activeOp.mockPayload, null, 2)}</pre>
                </div>
              </div>

              {/* Action Simulation Controls */}
              <div className="pt-2 border-t border-slate-800/80">
                {activeOp.defaultDecision === 'ALLOW' && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{activeOp.mockOutcome}</span>
                  </div>
                )}

                {activeOp.defaultDecision === 'CONFIRM' && (
                  <div className="space-y-2.5">
                    {confirmedState === 'pending' ? (
                      <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 space-y-2">
                        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                          <UserCheck className="w-4 h-4 text-amber-400" />
                          <span>دروازه تایید انسانی هاست (Host HITL Gate): آیا مجوز فراخوانی ابزار صادر شود؟</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          مطابق اصل حداقل اختیارات، فراخوانی create_procurement_ticket منوط به تایید مستقیم اپراتور در هاست است. پس از صدور مجوز، تیکت در سامانه تدارکات در وضعیت سازمانی AWAITING_APPROVAL ثبت خواهد شد.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleApprove}
                            className="bg-emerald-600 hover:bg-emerald-500 text-xs py-1"
                          >
                            تایید صدور مجوز (Approve)
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleReject}
                            className="text-xs py-1"
                          >
                            رد درخواست (Reject)
                          </Button>
                        </div>
                      </div>
                    ) : confirmedState === 'approved' ? (
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          مجوز فراخوانی ابزار توسط هاست صادر شد: تیکت PROC-2026-7741 در سامانه تدارکات با وضعیت سازمانی AWAITING_APPROVAL ثبت گردید.
                        </span>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-[11px] text-slate-400 hover:text-white underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          بازنشانی
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          مجوز توسط اپراتور رد شد. فراخوانی ابزار لغو گردید و داده‌ای به سامانه تدارکات ارسال نشد.
                        </span>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-[11px] text-slate-400 hover:text-white underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          بازنشانی
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeOp.defaultDecision === 'DENY' && (
                  <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/50 text-rose-300 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <ShieldX className="w-4 h-4 text-rose-400" />
                      <span>مسدودسازی قطعی توسط خط‌مشی هاست (Access Denied)</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      هیچ دکمه‌ای برای تایید یا دور زدن این ممنوعیت تعبیه نشده است. فرمان‌های تخریبی ساختاری DDL طبق اصل Least Privilege در سیاست پیش‌فرض هاست مسدود هستند.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
