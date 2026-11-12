'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/presentation/HeroSection';
import { PresentationNavigation } from '@/components/layout/PresentationNavigation';
import { ChapterSection } from '@/components/presentation/ChapterSection';
import { Chapter01 } from '@/components/chapters/Chapter01';
import { CHAPTERS } from '@/lib/presentation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tv, ScrollText, ChevronLeft } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const handleStartPresentation = () => {
    router.push('/presentation');
  };

  const handleScrollToChapters = () => {
    const el = document.getElementById('syllabus-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsNavDrawerOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] selection:bg-indigo-500/30 selection:text-cyan-300">
      {/* Top Navbar */}
      <Navbar onOpenChapters={() => setIsNavDrawerOpen(true)} />

      {/* Chapters Navigation Drawer */}
      <PresentationNavigation
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onSelectChapter={(id) => {
          if (id === 1) {
            router.push('/presentation');
          }
        }}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenChapters={handleScrollToChapters}
        onStartPresentation={handleStartPresentation}
      />

      {/* Dual Experience Mode Pitch Banner */}
      <section className="py-12 border-y border-indigo-500/10 bg-[#0E1527]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Scroll Mode Card */}
            <Card
              variant="translucent"
              className="p-6 border-indigo-500/20 hover:border-indigo-400/40 group cursor-pointer"
              onClick={() => router.push('/presentation')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 group-hover:text-cyan-300 transition-colors">
                  <ScrollText className="w-6 h-6" />
                </div>
                <Badge variant="indigo" size="sm">
                  مطالعه آزاد و مرور
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ۱. حالت روایتی و اسکرول (Scroll Mode)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                تجربه‌ای پیوسته و گام‌به‌گام با انیمیشن‌های وابسته به اسکرول، نمودارهای تفکیک‌شده و امکان بررسی عمیق و بدون شتاب کانسپت‌ها.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-indigo-400 font-medium flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                <span>مشاهده در حالت روایتی</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
            </Card>

            {/* Presentation Mode Card */}
            <Card
              variant="translucent"
              className="p-6 border-cyan-500/20 hover:border-cyan-400/40 group cursor-pointer"
              onClick={() => router.push('/presentation')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 group-hover:text-cyan-200 transition-colors">
                  <Tv className="w-6 h-6" />
                </div>
                <Badge variant="cyan" size="sm">
                  ارائه زنده کلاسی
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ۲. حالت پرزنتیشن تمام‌صفحه (Presentation Mode)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                طراحی تئاتری ویژه نمایش در پروژکتور و سمینارها با کلیدهای میانبر کیبورد (<span className="font-mono" dir="ltr">ArrowLeft / ArrowRight</span>)، کنترل‌های شناور و بدون حواشی مرورگر.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                <span>اجرای پرزنتیشن تمام‌صفحه</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* Live Preview: Chapter 01 Section */}
      <section className="py-16">
        <ChapterSection chapter={CHAPTERS[0]}>
          <Chapter01 mode="scroll" />
        </ChapterSection>
      </section>

      {/* Chapters Syllabus Roadmap Section */}
      <section id="syllabus-section" className="py-20 border-t border-indigo-500/10 bg-[#070B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="indigo" size="md">
              ساختار ۷ گانه ارائه
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              سرفصل‌های برنامه آموزشی MCP
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              این ارائه در هفت بخش متوالی برای مدت زمان تقریبی ۲۵ دقیقه سازمان‌دهی شده است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS.map((chapter) => {
              const isAvailable = chapter.status === 'active';

              return (
                <div
                  key={chapter.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isAvailable
                      ? 'bg-[#141C2E] border-indigo-500/40 shadow-xl shadow-indigo-950/40 ring-1 ring-cyan-400/20'
                      : 'bg-[#101728]/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-indigo-400">
                        {chapter.numberPersian}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">
                          ~{chapter.estimatedMinutes}m
                        </span>
                        {isAvailable ? (
                          <Badge variant="cyan" size="sm">
                            آماده ارائه
                          </Badge>
                        ) : (
                          <Badge variant="outline" size="sm">
                            در انتظار تدوین
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 mb-1">
                      {chapter.titlePersian}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400/70 mb-3" dir="ltr">
                      {chapter.titleEnglish}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {chapter.descriptionPersian}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    {isAvailable ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => router.push(`/presentation?chapter=${chapter.id}`)}
                        iconEnd={<ChevronLeft className="w-3.5 h-3.5" />}
                        className="w-full text-xs"
                      >
                        ورود به این فصل در حالت ارائه
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-500">
                        محتوای فنی در فازهای بعدی
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
