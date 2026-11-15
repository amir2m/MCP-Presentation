'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/presentation/ScrollProgress';
import { PresentationControls } from '@/components/presentation/PresentationControls';
import { PresentationNavigation } from '@/components/layout/PresentationNavigation';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ChapterSection } from '@/components/presentation/ChapterSection';
import { Chapter01 } from '@/components/chapters/Chapter01';
import { Chapter02 } from '@/components/chapters/Chapter02';
import { Chapter03 } from '@/components/chapters/Chapter03';
import { Chapter04 } from '@/components/chapters/Chapter04';
import { Chapter05 } from '@/components/chapters/Chapter05';
import { CHAPTERS } from '@/lib/presentation';
import { parsePresentationKey } from '@/lib/navigation';
import { PresentationViewMode } from '@/types/presentation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tv } from 'lucide-react';

function PresentationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterParam = searchParams.get('chapter');
  const defaultChapter =
    chapterParam && Number(chapterParam) >= 1 && Number(chapterParam) <= CHAPTERS.length
      ? Number(chapterParam)
      : 1;

  // Mode state: 'slides' (Presentation Mode) or 'scroll' (Scroll Mode)
  const [viewMode, setViewMode] = useState<PresentationViewMode>('slides');
  const [activeChapterOverride, setActiveChapterOverride] = useState<number | null>(null);
  const currentChapterId = activeChapterOverride ?? defaultChapter;
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);

  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const totalSlides = currentChapter.slides.length || 1;

  // Handlers for slide navigation
  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleExitPresentation = useCallback(() => {
    if (viewMode === 'slides') {
      setViewMode('scroll');
    } else {
      router.push('/');
    }
  }, [viewMode, router]);

  // Keyboard navigation listener (active in Presentation Mode)
  useEffect(() => {
    if (viewMode !== 'slides') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { action } = parsePresentationKey(e, true);

      if (action === 'next') {
        e.preventDefault();
        handleNextSlide();
      } else if (action === 'prev') {
        e.preventDefault();
        handlePrevSlide();
      } else if (action === 'exit') {
        e.preventDefault();
        handleExitPresentation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode, handleNextSlide, handlePrevSlide, handleExitPresentation]);

  const handleSelectChapter = (chapterId: number) => {
    setActiveChapterOverride(chapterId);
    setCurrentSlideIndex(0);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`chapter-${chapterId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] flex flex-col justify-between selection:bg-indigo-500/30 selection:text-cyan-300">
      {/* Scroll Progress Bar (visible in scroll mode) */}
      {viewMode === 'scroll' && <ScrollProgress />}

      {/* Top Navbar */}
      <Navbar
        onOpenChapters={() => setIsNavDrawerOpen(true)}
        activeMode={viewMode}
        onToggleMode={(mode) => setViewMode(mode)}
      />

      {/* Chapters Navigation Drawer */}
      <PresentationNavigation
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* ============================================================== */}
        {/* PRESENTATION MODE (Full-Screen Slide View)                     */}
        {/* ============================================================== */}
        {viewMode === 'slides' ? (
          <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sm:p-8 lg:p-12 pb-28 max-w-7xl mx-auto w-full">
            {/* Slide Header HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-indigo-500/15">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-xl">
                  {currentChapter.numberPersian}
                </span>
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-white">
                    {currentChapter.titlePersian}
                  </h2>
                  <span className="text-xs font-mono text-cyan-400/80" dir="ltr">
                    {currentChapter.titleEnglish}
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <ProgressIndicator
                currentChapterId={currentChapterId}
                currentSlideIndex={currentSlideIndex}
                totalSlides={totalSlides}
                mode="slides"
              />
            </div>

            {/* Active Slide Canvas */}
            <div className="flex-1 flex items-center justify-center py-6">
              {currentChapterId === 1 ? (
                <Chapter01
                  mode="slides"
                  activeSlideIndex={currentSlideIndex}
                  onSelectChapter={handleSelectChapter}
                />
              ) : currentChapterId === 2 ? (
                <Chapter02
                  mode="slides"
                  activeSlideIndex={currentSlideIndex}
                  onSelectChapter={handleSelectChapter}
                />
              ) : currentChapterId === 3 ? (
                <Chapter03
                  mode="slides"
                  activeSlideIndex={currentSlideIndex}
                  onSelectChapter={handleSelectChapter}
                />
              ) : currentChapterId === 4 ? (
                <Chapter04
                  mode="slides"
                  activeSlideIndex={currentSlideIndex}
                  onSelectChapter={handleSelectChapter}
                />
              ) : currentChapterId === 5 ? (
                <Chapter05
                  mode="slides"
                  activeSlideIndex={currentSlideIndex}
                  onSelectChapter={handleSelectChapter}
                />
              ) : (
                <div className="text-center py-20 space-y-4 max-w-lg mx-auto">
                  <Badge variant="outline" size="md">
                    فصل در حال تدوین
                  </Badge>
                  <h3 className="text-2xl font-bold text-slate-200">
                    {currentChapter.titlePersian}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    محتوای این فصل پس از تایید ساختار فنی و پژوهش در تسک‌های بعدی بارگذاری خواهد شد.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSelectChapter(5)}
                  >
                    بازگشت به فصل پنجم
                  </Button>
                </div>
              )}
            </div>

            {/* Floating Presentation Controls */}
            <PresentationControls
              currentSlide={currentSlideIndex}
              totalSlides={totalSlides}
              onNext={handleNextSlide}
              onPrev={handlePrevSlide}
              onExit={handleExitPresentation}
              onToggleScrollMode={() => setViewMode('scroll')}
              chapterTitle={currentChapter.titlePersian}
            />
          </div>
        ) : (
          /* ============================================================== */
          /* SCROLL MODE (Cinematic Storytelling Scroll Flow)                 */
          /* ============================================================== */
          <div className="w-full">
            {/* Scroll Mode Header Bar */}
            <div className="bg-[#0e1526]/80 backdrop-blur-md border-b border-indigo-500/10 py-4 px-4 sticky top-16 z-30">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="cyan" size="sm">
                    حالت روایتی (Scroll Mode)
                  </Badge>
                  <span className="text-xs text-slate-400">
                    اسکرول پیوسته و مطالعه گام‌به‌گام فصول
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setViewMode('slides')}
                    iconStart={<Tv className="w-4 h-4" />}
                    className="text-xs"
                  >
                    تغییر به حالت ارائه تمام‌صفحه
                  </Button>
                </div>
              </div>
            </div>

            {/* Chapter 01 Section */}
            <ChapterSection chapter={CHAPTERS[0]}>
              <Chapter01 mode="scroll" onSelectChapter={handleSelectChapter} />
            </ChapterSection>

            {/* Chapter 02 Section */}
            <ChapterSection chapter={CHAPTERS[1]}>
              <Chapter02 mode="scroll" onSelectChapter={handleSelectChapter} />
            </ChapterSection>

            {/* Chapter 03 Section */}
            <ChapterSection chapter={CHAPTERS[2]}>
              <Chapter03 mode="scroll" onSelectChapter={handleSelectChapter} />
            </ChapterSection>

            {/* Chapter 04 Section */}
            <ChapterSection chapter={CHAPTERS[3]}>
              <Chapter04 mode="scroll" onSelectChapter={handleSelectChapter} />
            </ChapterSection>

            {/* Chapter 05 Section */}
            <ChapterSection chapter={CHAPTERS[4]}>
              <Chapter05 mode="scroll" onSelectChapter={handleSelectChapter} />
            </ChapterSection>

            {/* Preview of Upcoming Chapters in Scroll Mode */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-indigo-500/10">
              <div className="text-center mb-10 space-y-2">
                <Badge variant="outline" size="md">
                  نقشه راه سرفصل‌ها
                </Badge>
                <h3 className="text-2xl font-bold text-slate-200">
                  فصول آتی ارائه جامع MCP
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  سایر فصول مطابق سند ساختار محتوایی تدوین خواهند شد.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHAPTERS.slice(5).map((ch) => (
                  <div
                    key={ch.id}
                    className="p-5 rounded-2xl bg-[#141C2E]/60 border border-slate-800/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-indigo-400">
                          {ch.numberPersian}
                        </span>
                        <Badge variant="outline" size="sm">
                          در انتظار تدوین
                        </Badge>
                      </div>
                      <h4 className="text-base font-bold text-slate-200 mb-1">
                        {ch.titlePersian}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {ch.descriptionPersian}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="font-mono" dir="ltr">
                        {ch.titleEnglish}
                      </span>
                      <span>~{ch.estimatedMinutes} دقیقه</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer (shown in scroll mode) */}
      {viewMode === 'scroll' && <Footer />}
    </div>
  );
}

export default function PresentationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1020]" />}>
      <PresentationContent />
    </Suspense>
  );
}
