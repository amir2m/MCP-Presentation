'use client';

import React, { useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Database, FolderGit2, Terminal, Globe } from 'lucide-react';
import { HeroFallbackSVG } from './HeroFallbackSVG';

// Dedicated Client Component dynamic import with ssr: false
const DynamicHero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => null,
});

const emptySubscribe = () => () => {};

// Safe React 19 external store hook to detect client mounting
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Safe React 19 external store hook to subscribe to prefers-reduced-motion
function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    () => false
  );
}

// Safe React 19 external store check for WebGL support
function useWebGLSupported() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === 'undefined') return false;
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    },
    () => false
  );
}

export function Hero3DContainer() {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();
  const isWebGLSupported = useWebGLSupported();
  const [hasContextError, setHasContextError] = useState(false);

  const shouldRender3D = isClient && isWebGLSupported && !hasContextError;

  return (
    <div
      className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-gradient-to-b from-[#141C2E]/80 to-[#0F1626]/90 border border-indigo-500/25 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-indigo-950/60 overflow-hidden flex items-center justify-center select-none"
      style={{ minHeight: '360px' }}
    >
      {/* Radial backdrop glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />

      {/* 3D WebGL Canvas or SVG Fallback */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {shouldRender3D ? (
          <DynamicHero3DCanvas
            reducedMotion={reducedMotion}
            onWebGLError={() => setHasContextError(true)}
          />
        ) : (
          <HeroFallbackSVG reducedMotion={reducedMotion} />
        )}
      </div>

      {/* Center HTML Overlay Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="text-center bg-[#0B1020]/75 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-indigo-500/30 shadow-lg">
          <div className="font-mono font-black text-cyan-300 text-xs sm:text-sm tracking-wider">
            MCP
          </div>
          <div className="text-[9px] sm:text-[10px] text-slate-300 font-mono">
            Protocol Hub
          </div>
        </div>
      </div>

      {/* Orbiting Satellite Overlay Badge: Database (Top Right) */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-4 sm:top-7 right-4 sm:right-7 bg-[#141C2E]/90 border border-cyan-400/40 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-cyan-950/40 flex items-center gap-2 text-xs z-20 pointer-events-none"
      >
        <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 shrink-0">
          <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex flex-col text-right">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-200">Database</span>
          <span className="text-[8px] sm:text-[9px] text-cyan-400">منابع داده (Resources)</span>
        </div>
      </motion.div>

      {/* Orbiting Satellite Overlay Badge: FileSystem (Top Left) */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3.6, delay: 0.5, ease: 'easeInOut' }}
        className="absolute top-4 sm:top-7 left-4 sm:left-7 bg-[#141C2E]/90 border border-indigo-500/40 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-indigo-950/40 flex items-center gap-2 text-xs z-20 pointer-events-none"
      >
        <div className="p-1.5 rounded-lg bg-indigo-950/80 text-indigo-400 shrink-0">
          <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex flex-col text-right">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-200">FileSystem</span>
          <span className="text-[8px] sm:text-[9px] text-indigo-300">سیستم فایل محلی</span>
        </div>
      </motion.div>

      {/* Orbiting Satellite Overlay Badge: CLI / Tools (Bottom Left) */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4.2, delay: 1, ease: 'easeInOut' }}
        className="absolute bottom-4 sm:bottom-7 left-4 sm:left-7 bg-[#141C2E]/90 border border-amber-500/30 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-amber-950/40 flex items-center gap-2 text-xs z-20 pointer-events-none"
      >
        <div className="p-1.5 rounded-lg bg-amber-950/80 text-amber-400 shrink-0">
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex flex-col text-right">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-200">Tools / CLI</span>
          <span className="text-[8px] sm:text-[9px] text-amber-300">ابزارهای اجرایی</span>
        </div>
      </motion.div>

      {/* Orbiting Satellite Overlay Badge: Web / APIs (Bottom Right) */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3.8, delay: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-4 sm:bottom-7 right-4 sm:right-7 bg-[#141C2E]/90 border border-cyan-500/30 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-cyan-950/40 flex items-center gap-2 text-xs z-20 pointer-events-none"
      >
        <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 shrink-0">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex flex-col text-right">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-200">Web / APIs</span>
          <span className="text-[8px] sm:text-[9px] text-cyan-300">سرویس‌های ابری</span>
        </div>
      </motion.div>
    </div>
  );
}
