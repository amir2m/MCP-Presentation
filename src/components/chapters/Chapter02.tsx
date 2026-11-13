'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LLMGenerationDiagram } from './chapter02/LLMGenerationDiagram';
import { KnowledgeBoundaryDiagram } from './chapter02/KnowledgeBoundaryDiagram';
import { ToolCallingWorkflow } from './chapter02/ToolCallingWorkflow';
import { ToolCallingSimulator } from './chapter02/ToolCallingSimulator';
import { MissingPieceSection } from './chapter02/MissingPieceSection';
import { Chapter02Quiz } from './chapter02/Chapter02Quiz';

interface Chapter02Props {
  mode?: 'scroll' | 'slides';
  activeSlideIndex?: number;
  onSelectChapter?: (chapterId: number) => void;
}

export function Chapter02({
  mode = 'scroll',
  activeSlideIndex = 0,
  onSelectChapter,
}: Chapter02Props) {
  const handleGoToQuiz = () => {
    if (mode === 'slides') {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    } else {
      const el = document.getElementById('chapter-02-quiz');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            {activeSlideIndex === 0 && <LLMGenerationDiagram />}
            {activeSlideIndex === 1 && <KnowledgeBoundaryDiagram />}
            {activeSlideIndex === 2 && <ToolCallingWorkflow />}
            {activeSlideIndex === 3 && <ToolCallingSimulator />}
            {activeSlideIndex === 4 && (
              <MissingPieceSection onGoToQuiz={handleGoToQuiz} />
            )}
            {activeSlideIndex === 5 && (
              <Chapter02Quiz onSelectChapter={onSelectChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Scroll Mode: Render all 6 sections sequentially with storytelling flow
  return (
    <div className="space-y-24">
      <LLMGenerationDiagram />
      <KnowledgeBoundaryDiagram />
      <ToolCallingWorkflow />
      <ToolCallingSimulator />
      <MissingPieceSection onGoToQuiz={handleGoToQuiz} />
      <div id="chapter-02-quiz">
        <Chapter02Quiz onSelectChapter={onSelectChapter} />
      </div>
    </div>
  );
}

