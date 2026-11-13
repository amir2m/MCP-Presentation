'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BespokeIntegrationSection } from './chapter03/BespokeIntegrationSection';
import { SharedStandardSection } from './chapter03/SharedStandardSection';
import { UsbCAnalogySection } from './chapter03/UsbCAnalogySection';
import { McpDefinitionSection } from './chapter03/McpDefinitionSection';
import { WhatMcpIsNotSection } from './chapter03/WhatMcpIsNotSection';
import { Chapter03Conclusion } from './chapter03/Chapter03Conclusion';

interface Chapter03Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter03({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter03Props) {
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
            {activeSlideIndex === 0 && <BespokeIntegrationSection />}
            {activeSlideIndex === 1 && <SharedStandardSection />}
            {activeSlideIndex === 2 && <UsbCAnalogySection />}
            {activeSlideIndex === 3 && <McpDefinitionSection />}
            {activeSlideIndex === 4 && <WhatMcpIsNotSection />}
            {activeSlideIndex === 5 && (
              <Chapter03Conclusion onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render all 6 sections sequentially with storytelling flow
  return (
    <div className="space-y-24">
      <BespokeIntegrationSection />
      <SharedStandardSection />
      <UsbCAnalogySection />
      <McpDefinitionSection />
      <WhatMcpIsNotSection />
      <Chapter03Conclusion onSelectChapter={onSelectChapter} />
    </div>
  );
}
