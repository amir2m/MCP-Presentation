'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRequestSection } from './chapter05/UserRequestSection';
import { ModelDecisionSection } from './chapter05/ModelDecisionSection';
import { ProtocolDispatchSection } from './chapter05/ProtocolDispatchSection';
import { ToolExecutionSection } from './chapter05/ToolExecutionSection';
import { ResultHandlingSection } from './chapter05/ResultHandlingSection';
import { FinalSynthesisSection } from './chapter05/FinalSynthesisSection';
import { RequestLifecycleSimulator } from './chapter05/RequestLifecycleSimulator';

interface Chapter05Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter05({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter05Props) {
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
            {activeSlideIndex === 0 && <UserRequestSection />}
            {activeSlideIndex === 1 && <ModelDecisionSection />}
            {activeSlideIndex === 2 && <ProtocolDispatchSection />}
            {activeSlideIndex === 3 && <ToolExecutionSection />}
            {activeSlideIndex === 4 && <ResultHandlingSection />}
            {activeSlideIndex === 5 && (
              <FinalSynthesisSection onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render the interactive simulator followed by all 6 narrative sections
  return (
    <div className="space-y-24">
      {/* Featured Full Interactive Simulator at the start of Scroll Mode */}
      <section className="space-y-6">
        <RequestLifecycleSimulator initialScenario="scenario-a" />
      </section>

      {/* Six Narrative Sections */}
      <UserRequestSection />
      <ModelDecisionSection />
      <ProtocolDispatchSection />
      <ToolExecutionSection />
      <ResultHandlingSection />
      <FinalSynthesisSection onSelectChapter={onSelectChapter} />
    </div>
  );
}
