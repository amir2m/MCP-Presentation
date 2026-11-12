'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HeroFallbackSVGProps {
  reducedMotion?: boolean;
}

export function HeroFallbackSVG({ reducedMotion = false }: HeroFallbackSVGProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full relative z-10 pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connecting vectors from center to external tools */}
      <g stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" strokeDasharray="4 4">
        {/* To Database (Top Right) */}
        <line x1="200" y1="200" x2="310" y2="100" />
        {/* To File System (Top Left) */}
        <line x1="200" y1="200" x2="90" y2="100" />
        {/* To Terminal (Bottom Left) */}
        <line x1="200" y1="200" x2="90" y2="300" />
        {/* To Web APIs (Bottom Right) */}
        <line x1="200" y1="200" x2="310" y2="300" />
      </g>

      {/* Animated Glowing Pulses traveling on paths (disabled if reduced motion) */}
      {!reducedMotion && (
        <>
          <motion.circle
            r="4"
            fill="#22D3EE"
            initial={{ cx: 200, cy: 200 }}
            animate={{
              cx: [200, 310, 200],
              cy: [200, 100, 200],
              opacity: [0, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="#6366F1"
            initial={{ cx: 200, cy: 200 }}
            animate={{
              cx: [200, 90, 200],
              cy: [200, 100, 200],
              opacity: [0, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 2.8, delay: 0.5, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="#22D3EE"
            initial={{ cx: 200, cy: 200 }}
            animate={{
              cx: [200, 90, 200],
              cy: [200, 300, 200],
              opacity: [0, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="#6366F1"
            initial={{ cx: 200, cy: 200 }}
            animate={{
              cx: [200, 310, 200],
              cy: [200, 300, 200],
              opacity: [0, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.0, delay: 1.5, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Outer concentric protocol rings */}
      <circle
        cx="200"
        cy="200"
        r="85"
        stroke="rgba(34, 211, 238, 0.25)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />
      <circle
        cx="200"
        cy="200"
        r="135"
        stroke="rgba(99, 102, 241, 0.15)"
        strokeWidth="1"
        strokeDasharray="8 8"
      />

      {/* Center Node: MCP Protocol Engine & Host */}
      <g>
        <circle cx="200" cy="200" r="46" fill="#141C2E" stroke="#6366F1" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="38" fill="#1E293B" stroke="#22D3EE" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

