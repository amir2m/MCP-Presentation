import { Chapter, QuizQuestion } from '@/types/presentation';

export const PRESENTATION_METADATA = {
  title: "مدلهای زبانی و Model Context Protocol (MCP): از تولید متن تا تعامل با ابزارهای خارجی",
  titleEnglish: "Language Models and Model Context Protocol (MCP): From Text Generation to External Tool Interaction",
  shortTitle: "ارائه جامع MCP",
  subtitle: "تحلیل معماری، سازوکار و استاندارد باز اتصال هوش مصنوعی به دنیای واقعی",
  targetAudience: "دانشجویان و علاقه‌مندان فنی و دانشگاهی",
  durationMinutes: 25,
  totalChapters: 7,
};

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: 'introduction',
    numberPersian: 'فصل اول',
    titlePersian: 'مقدمه و مسئله اصلی',
    titleEnglish: 'Introduction and the Main Problem',
    descriptionPersian: 'گذار بنیادین از پیش‌بینی آماری متن به کنشگری و تعامل عملیاتی با سامانه‌ها و ابزارهای بیرونی.',
    estimatedMinutes: 3,
    status: 'active',
    slides: [
      {
        id: 'c1-s1',
        chapterId: 1,
        slideNumber: 1,
        title: 'اتاق ایزوله هوش مصنوعی: از متن تا واقعیت',
        subtitle: 'چرا مدل‌های زبانی به خودی خود در دنیای واقعی دست بسته هستند؟',
      },
      {
        id: 'c1-s2',
        chapterId: 1,
        slideNumber: 2,
        title: 'مقایسه تصویری: حدس زدن در برابر اجرای واقعی',
        subtitle: 'شبیه‌سازی تفاوت میان تولید محتوای متنی و اجرای معتبر عملیات در محیط واقعی',
      },
      {
        id: 'c1-s3',
        chapterId: 1,
        slideNumber: 3,
        title: 'پرسش بنیادین مهندسی',
        subtitle: 'چالش مقیاس‌پذیری و امنیت در اتصال انبوه ابزارها به مدل‌های زبانی',
      },
      {
        id: 'c1-s4',
        chapterId: 1,
        slideNumber: 4,
        title: 'سنجش تعاملی درک مفهوم',
        subtitle: 'کوئیز تشخیصی کوتاه پیرامون ماهیت و مرز توانایی مدل‌های زبانی',
      },
    ],
  },
  {
    id: 2,
    slug: 'llm-limits-tools',
    numberPersian: 'فصل دوم',
    titlePersian: 'مدل‌های زبانی و نیاز به ابزارهای خارجی',
    titleEnglish: 'LLMs and the Need for External Tools',
    descriptionPersian: 'بررسی محدودیت‌های ذاتی پایگاه دانش ایستا، محاسبات جبری دقیق و لزوم شکل‌گیری عامل‌های هوشمند.',
    estimatedMinutes: 4,
    status: 'planned',
    slides: [],
  },
  {
    id: 3,
    slug: 'intro-to-mcp',
    numberPersian: 'فصل سوم',
    titlePersian: 'معرفی Model Context Protocol',
    titleEnglish: 'Introduction to MCP',
    descriptionPersian: 'ظهور استاندارد باز، تمثیل یو‌اس‌بی تایپ-سی (USB-C) برای هوش مصنوعی و شکستن سد اتصالات اختصاصی N×M.',
    estimatedMinutes: 4,
    status: 'planned',
    slides: [],
  },
  {
    id: 4,
    slug: 'architecture',
    numberPersian: 'فصل چهارم',
    titlePersian: 'معماری MCP و مؤلفه‌های کلیدی',
    titleEnglish: 'MCP Architecture and Core Components',
    descriptionPersian: 'بررسی دقیق سه نقش Host، Client و Server همراه با تفکیک قابلیت‌های Prompts، Resources و Tools.',
    estimatedMinutes: 4,
    status: 'planned',
    slides: [],
  },
  {
    id: 5,
    slug: 'how-mcp-works',
    numberPersian: 'فصل پنجم',
    titlePersian: 'نحوه کارکرد پروتکل MCP',
    titleEnglish: 'How MCP Works',
    descriptionPersian: 'پروتکل ارتباطی JSON-RPC 2.0، لایه‌های ترابری Stdio و SSE و چرخه دست‌تکانی و تبادل پیام.',
    estimatedMinutes: 4,
    status: 'planned',
    slides: [],
  },
  {
    id: 6,
    slug: 'comparisons',
    numberPersian: 'فصل ششم',
    titlePersian: 'مقایسه MCP با REST API و روش‌های سنتی',
    titleEnglish: 'MCP vs REST API, Function Calling, and Custom Integrations',
    descriptionPersian: 'ماتریس تحلیل تفاوت‌ها، قابلیت حمل، استقلال از مدل ارائه‌دهنده و امنیت در برابر ادغام‌های نقطه-به-نقطه.',
    estimatedMinutes: 3,
    status: 'planned',
    slides: [],
  },
  {
    id: 7,
    slug: 'future-security',
    numberPersian: 'فصل هفتم',
    titlePersian: 'کاربردها، امنیت، محدودیت‌ها و آینده',
    titleEnglish: 'Applications, Security, Limitations, and Future',
    descriptionPersian: 'سناریوهای واقعی در محیط‌های توسعه و سازمانی، مدل کنترل دسترسی انسانی (Human-in-the-loop) و افق استانداردسازی.',
    estimatedMinutes: 3,
    status: 'planned',
    slides: [],
  },
];

export const CHAPTER_01_QUIZ: QuizQuestion = {
  id: 'c1-q1',
  question: 'چرا یک مدل زبانی بزرگ (LLM) به صورت پیش‌فرض و بدون اتصال به ابزار کمکی، نمی‌تواند موجودی انبار یا آخرین قیمت بیت‌کوین را در لحظه گزارش دهد؟',
  options: [
    {
      id: 'opt-a',
      text: 'زیرا مدل‌های زبانی سرعت پردازش کافی برای محاسبات مالی ندارند.',
      isCorrect: false,
      explanation: 'نادرست. سرعت پردازش پردازنده‌ها یا مدل مانع دسترسی نیست؛ بلکه مدل اساساً دسترسی شبکه یا حسگر زنده‌ای برای واکشی اطلاعات جاری ندارد.'
    },
    {
      id: 'opt-b',
      text: 'زیرا مدل تنها روی داده‌های گذشته آموزش دیده، حافظه زنده از پایگاه‌داده خارجی ندارد و خروجی آن پیش‌بینی محتمل‌ترین واژگان است.',
      isCorrect: true,
      explanation: 'کاملاً صحیح! مدل زبانی تنها دانشی را که تا زمان انقطاع آموزش (Training Cutoff) به صورت وزن‌های آماری ذخیره شده به یاد دارد و بدون یک پروتکل اتصال زنده، دسترسی خواندن به دیتابیس یا سامانه‌های برخط ندارد.'
    },
    {
      id: 'opt-c',
      text: 'زیرا پروتکل اینترنت اجازه ارتباط به هیچ سامانه هوش مصنوعی را نمی‌دهد.',
      isCorrect: false,
      explanation: 'نادرست. سامانه‌های نرم‌افزاری می‌توانند با وب ارتباط برقرار کنند، اما مدل زبانی به خودی خود فقط یک موتور پیش‌بینی ماتریسی وزن‌هاست و بدون لایه ابزاری، سوکت شبکه یا دسترسی I/O ندارد.'
    },
    {
      id: 'opt-d',
      text: 'زیرا همه مدل‌های زبانی به دلایل حقوقی اجازه گزارش اعداد را ندارند.',
      isCorrect: false,
      explanation: 'نادرست. هیچ منع قانونی برای گزارش اعداد وجود ندارد؛ مسئله ناتوانی ساختاری مدل در ارتباط با محیط بیرونی (Lack of Grounded Action) است.'
    }
  ],
  educationalTakeaway: 'مدل‌های زبانی ذاتاً تولیدکننده متن هستند و در خلاء عملیاتی قرار دارند. برای تبدیل آن‌ها به عامل‌های توانا، نیازمند اتصالی امن، استاندارد و دوطرفه با پایگاه‌های داده و ابزارهای سیستم عاملی هستیم؛ ماموریتی که MCP برای آن متولد شده است.'
};

