'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchitectureOverviewSection } from './chapter04/ArchitectureOverviewSection';
import { ParticipantsRolesSection } from './chapter04/ParticipantsRolesSection';
import { MultiServerTopologySection } from './chapter04/MultiServerTopologySection';
import { JsonRpcPatternsSection } from './chapter04/JsonRpcPatternsSection';
import { DiscoveryStatelessSection } from './chapter04/DiscoveryStatelessSection';
import { TransportsComparisonSection } from './chapter04/TransportsComparisonSection';

interface Chapter04Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter04({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter04Props) {
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
            {activeSlideIndex === 0 && <ArchitectureOverviewSection />}
            {activeSlideIndex === 1 && <ParticipantsRolesSection />}
            {activeSlideIndex === 2 && <MultiServerTopologySection />}
            {activeSlideIndex === 3 && <JsonRpcPatternsSection />}
            {activeSlideIndex === 4 && <DiscoveryStatelessSection />}
            {activeSlideIndex === 5 && (
              <TransportsComparisonSection onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render all 6 sections sequentially with rich storytelling flow
  return (
    <div className="space-y-24">
      <ArchitectureOverviewSection />
      <ParticipantsRolesSection />
      <MultiServerTopologySection />
      <JsonRpcPatternsSection />
      <DiscoveryStatelessSection />
      <TransportsComparisonSection onSelectChapter={onSelectChapter} />
    </div>
  );
}
