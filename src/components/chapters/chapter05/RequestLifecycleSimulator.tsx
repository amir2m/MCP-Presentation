'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import {
  ScenarioId,
  LifecycleStepNumber,
  DebuggerTabId,
  ParticipantId,
} from './types';
import {
  LIFECYCLE_STEPS,
  SCENARIOS,
  MOCK_DISCLOSURE_TEXT,
  CONSTANTS,
} from './mockData';
import { LifecycleParticipant } from './LifecycleParticipant';
import { PayloadDebugger } from './PayloadDebugger';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface RequestLifecycleSimulatorProps {
  initialScenario?: ScenarioId;
  initialStep?: LifecycleStepNumber;
  className?: string;
}

export function RequestLifecycleSimulator({
  initialScenario = 'scenario-a',
  initialStep = 1,
  className = '',
}: RequestLifecycleSimulatorProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>(initialScenario);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(initialStep - 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [customDebuggerTab, setCustomDebuggerTab] = useState<DebuggerTabId | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = SCENARIOS[selectedScenarioId];
  const currentStep = LIFECYCLE_STEPS[currentStepIndex];
  const activeDebuggerTab = customDebuggerTab ?? currentStep.suggestedDebuggerTab;

  // Clean timer on unmount
  const stopPlayback = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

  // Step advancement
  const goToNextStep = useCallback(() => {
    stopPlayback();
    setCustomDebuggerTab(null);
    setCurrentStepIndex((prev) => {
      if (prev < LIFECYCLE_STEPS.length - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  }, [stopPlayback]);

  const goToPrevStep = useCallback(() => {
    stopPlayback();
    setCustomDebuggerTab(null);
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, [stopPlayback]);

  const handleReset = useCallback(() => {
    stopPlayback();
    setCustomDebuggerTab(null);
    setCurrentStepIndex(0);
  }, [stopPlayback]);

  // Playback timer loop
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);
      // If at end, loop back to start
      if (currentStepIndex >= LIFECYCLE_STEPS.length - 1) {
        setCurrentStepIndex(0);
      }
      timerRef.current = setInterval(() => {
        setCustomDebuggerTab(null);
        setCurrentStepIndex((prev) => {
          if (prev < LIFECYCLE_STEPS.length - 1) {
            return prev + 1;
          } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2400);
    }
  }, [isPlaying, currentStepIndex, stopPlayback]);

  // Handle scenario switch
  const handleSelectScenario = (newScenarioId: ScenarioId) => {
    stopPlayback();
    setCustomDebuggerTab(null);
    setSelectedScenarioId(newScenarioId);
    setCurrentStepIndex(0);
  };

  // Helper to determine active state of nodes
  const isNodeActive = (nodeId: ParticipantId) => {
    return (
      currentStep.activeSender === nodeId || currentStep.activeReceiver === nodeId
    );
  };

  return (
    <div
      className={`space-y-6 max-w-6xl mx-auto rounded-3xl p-4 sm:p-7 bg-[#080D1A]/95 border border-indigo-500/20 shadow-2xl shadow-indigo-950/30 ${className}`}
    >
      {/* 1. Header & Educational Scenario Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base sm:text-xl font-extrabold text-white">
              شبیه‌ساز تعاملی چرخه حیات درخواست در MCP
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            ردیابی گام‌به‌گام پیام‌ها میان ۶ بازیگر معماری از پرسش کاربر تا پاسخ نهایی مدل
          </p>
        </div>

        {/* Mock Environment Disclosure Banner */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{MOCK_DISCLOSURE_TEXT}</span>
        </div>
      </div>

      {/* 2. Scenario Selector Switches */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">انتخاب سناریوی اجرایی:</span>
          <span className="text-[11px] text-cyan-400">
            قطعه استعلامی: <span className="font-mono">{CONSTANTS.SKU}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(
            [
              'scenario-a',
              'scenario-b',
              'scenario-c',
              'scenario-d',
            ] as ScenarioId[]
          ).map((scId) => {
            const sc = SCENARIOS[scId];
            const isSelected = selectedScenarioId === scId;
            return (
              <button
                key={scId}
                onClick={() => handleSelectScenario(scId)}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-950/50 ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant={sc.badgeVariant} size="sm">
                    {sc.shortTag}
                  </Badge>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </div>
                <h5 className="text-xs font-bold text-slate-200 truncate">
                  {sc.namePersian}
                </h5>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {sc.stockStatusText}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Central 2D Architectural Diagram with Enclosed Host Boundary */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#060913] border border-slate-800 relative overflow-hidden space-y-6">
        {/* Subtle Background Circuit Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Diagram Nodes Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Node 1: User (col 1-3) */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <LifecycleParticipant
              id="user"
              titlePersian="کاربر انسانی"
              titleEnglish="User"
              roleDescription="طرح پرسش به زبان طبیعی در رابط هاست بدون دانش فنی از پروتکل."
              isActive={isNodeActive('user')}
              isSender={currentStep.activeSender === 'user'}
              isReceiver={currentStep.activeReceiver === 'user'}
            />
          </div>

          {/* Node 2 & 4: Host Application Boundary (col 4-9) - ENCLOSES MCP Client Adapter */}
          <div className="md:col-span-6 p-3 sm:p-4 rounded-2xl bg-indigo-950/20 border-2 border-dashed border-indigo-500/40 space-y-3 relative">
            {/* Host Boundary Label */}
            <div className="flex items-center justify-between pb-1 border-b border-indigo-500/20">
              <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                مرز برنامه میزبان (Host Application Boundary)
              </span>
              <span className="text-[10px] text-indigo-400/80 font-mono" dir="ltr">
                Claude Desktop / Custom IDE
              </span>
            </div>

            {/* Sub-component: Host Core Orchestrator */}
            <LifecycleParticipant
              id="host"
              titlePersian="برنامه میزبان (هسته امنیتی و هماهنگی)"
              titleEnglish="Host Orchestrator & Security Gate"
              roleDescription="مدیریت کانتکست مدل، اعمال سیاست‌های تایید، و فرمان به کلاینت."
              isActive={isNodeActive('host')}
              isSender={currentStep.activeSender === 'host'}
              isReceiver={currentStep.activeReceiver === 'host'}
            />

            {/* Sub-component: Internal MCP Client Adapter */}
            <LifecycleParticipant
              id="mcp-client"
              titlePersian="کلاینت MCP (آداپتور داخلی سرور انبار)"
              titleEnglish="Internal MCP Client Adapter"
              roleDescription="ساخت و ارسال پیام استاندارد JSON-RPC 2.0 به سرور اختصاصی انبار."
              isActive={isNodeActive('mcp-client')}
              isSender={currentStep.activeSender === 'mcp-client'}
              isReceiver={currentStep.activeReceiver === 'mcp-client'}
              isEnclosedInHost={true}
            />
          </div>

          {/* Node 3: LLM (col 10-12) - Connects ONLY to Host */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <LifecycleParticipant
              id="llm"
              titlePersian="مدل زبانی بزرگ (LLM)"
              titleEnglish="Large Language Model"
              roleDescription="استنتاج معنایی، تصمیم‌گیری برای ابزار و تولید پاسخ نهایی (فاقد اتصال شبکه به سرور)."
              isActive={isNodeActive('llm')}
              isSender={currentStep.activeSender === 'llm'}
              isReceiver={currentStep.activeReceiver === 'llm'}
            />
          </div>
        </div>

        {/* Server & External Database Lower Tier (col 1-12) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
          {/* Node 5: MCP Server */}
          <LifecycleParticipant
            id="mcp-server"
            titlePersian="سرور پروتکل MCP انبار"
            titleEnglish="Warehouse MCP Server"
            roleDescription="عرضه متد tools/call، اعتبارسنجی _meta و فراخوانی لاجیک ابزار انبار."
            isActive={isNodeActive('mcp-server')}
            isSender={currentStep.activeSender === 'mcp-server'}
            isReceiver={currentStep.activeReceiver === 'mcp-server'}
          />

          {/* Node 6: External Inventory Database */}
          <LifecycleParticipant
            id="external-db"
            titlePersian="پایگاه داده انبار (سیستم خارجی)"
            titleEnglish="External Warehouse Database"
            roleDescription="منبع اصلی داده که توسط لاجیک داخلی ابزار سرور با کوئری نمونه استعلام می‌شود."
            isActive={isNodeActive('external-db')}
            isSender={currentStep.activeSender === 'external-db'}
            isReceiver={currentStep.activeReceiver === 'external-db'}
          />
        </div>

        {/* Current Active Step Banner */}
        <div className="relative z-10 p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">
                گام {currentStep.stepNumber} از ۸
              </Badge>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {currentStep.titlePersian}
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              {currentStep.descriptionPersian}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded-lg" dir="ltr">
            <span>{currentStep.activeSender}</span>
            <span>&rarr;</span>
            <span>{currentStep.activeReceiver}</span>
          </div>
        </div>
      </div>

      {/* 4. Playback and Step Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
        {/* Step Indicator Badges (1 to 8) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  stopPlayback();
                  setCurrentStepIndex(idx);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 ring-2 ring-cyan-300'
                    : isPast
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-900'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
                title={step.titlePersian}
              >
                {step.stepNumber}
              </button>
            );
          })}
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          {/* Reset / Replay */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white"
            title="شروع مجدد چرخه"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">شروع مجدد</span>
          </Button>

          {/* Previous Step */}
          <Button
            variant="secondary"
            size="sm"
            onClick={goToPrevStep}
            disabled={currentStepIndex === 0}
            className="text-xs"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>گام قبل</span>
          </Button>

          {/* Play / Pause Toggle */}
          <Button
            variant={isPlaying ? 'accent' : 'primary'}
            size="sm"
            onClick={togglePlay}
            className="text-xs font-bold min-w-24 gap-1.5"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>توقف</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>پخش خودکار</span>
              </>
            )}
          </Button>

          {/* Next Step */}
          <Button
            variant="secondary"
            size="sm"
            onClick={goToNextStep}
            disabled={currentStepIndex === LIFECYCLE_STEPS.length - 1}
            className="text-xs"
          >
            <span>گام بعد</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 5. Synchronized Technical Payload Inspector (5 Tabs) */}
      <PayloadDebugger
        scenario={scenario}
        activeTab={activeDebuggerTab}
        onTabChange={setCustomDebuggerTab}
        isCollapsible={true}
      />
    </div>
  );
}
