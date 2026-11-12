export type PresentationViewMode = 'scroll' | 'slides';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  educationalTakeaway: string;
}

export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  chapterId: number;
}

export interface Chapter {
  id: number;
  slug: string;
  numberPersian: string;
  titlePersian: string;
  titleEnglish: string;
  descriptionPersian: string;
  estimatedMinutes: number;
  status: 'active' | 'planned';
  slides: SlideItem[];
}

