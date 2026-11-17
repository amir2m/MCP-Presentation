'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RealWorldUseCasesSection } from './chapter07/RealWorldUseCasesSection';
import { MultiToolWorkflowSection } from './chapter07/MultiToolWorkflowSection';
import { SecurityTrustSection } from './chapter07/SecurityTrustSection';
import { HumanInTheLoopSection } from './chapter07/HumanInTheLoopSection';
import { LimitationsTradeoffsSection } from './chapter07/LimitationsTradeoffsSection';
import { FutureSynthesisSection } from './chapter07/FutureSynthesisSection';

interface Chapter07Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter07({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter07Props) {
  // Presentation Mode: Render the current active slide
  if (mode === 'slides') {
    return (
      <div className="w-full flex items-center justify-center min-h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeSlideIndex === 0 && <RealWorldUseCasesSection />}
            {activeSlideIndex === 1 && <MultiToolWorkflowSection />}
            {activeSlideIndex === 2 && <SecurityTrustSection />}
            {activeSlideIndex === 3 && <HumanInTheLoopSection />}
            {activeSlideIndex === 4 && <LimitationsTradeoffsSection />}
            {activeSlideIndex === 5 && (
              <FutureSynthesisSection onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render the six narrative sections sequentially
  return (
    <div className="space-y-24">
      <RealWorldUseCasesSection />
      <MultiToolWorkflowSection />
      <SecurityTrustSection />
      <HumanInTheLoopSection />
      <LimitationsTradeoffsSection />
      <FutureSynthesisSection onSelectChapter={onSelectChapter} />
    </div>
  );
}
