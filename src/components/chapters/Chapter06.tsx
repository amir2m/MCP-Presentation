'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MisconceptionSection } from './chapter06/MisconceptionSection';
import { WhatIsApiSection } from './chapter06/WhatIsApiSection';
import { IntegrationProblemSection } from './chapter06/IntegrationProblemSection';
import { WhatMcpAddsSection } from './chapter06/WhatMcpAddsSection';
import { FunctionCallingSpectrumSection } from './chapter06/FunctionCallingSpectrumSection';
import { DecisionFrameworkSection } from './chapter06/DecisionFrameworkSection';

interface Chapter06Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter06({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter06Props) {
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
            {activeSlideIndex === 0 && <MisconceptionSection />}
            {activeSlideIndex === 1 && <WhatIsApiSection />}
            {activeSlideIndex === 2 && <IntegrationProblemSection />}
            {activeSlideIndex === 3 && <WhatMcpAddsSection />}
            {activeSlideIndex === 4 && <FunctionCallingSpectrumSection />}
            {activeSlideIndex === 5 && (
              <DecisionFrameworkSection onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render the six narrative sections sequentially
  return (
    <div className="space-y-24">
      <MisconceptionSection />
      <WhatIsApiSection />
      <IntegrationProblemSection />
      <WhatMcpAddsSection />
      <FunctionCallingSpectrumSection />
      <DecisionFrameworkSection onSelectChapter={onSelectChapter} />
    </div>
  );
}
