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
    titlePersian: 'از پیش‌بینی کلمه تا انجام عملیات',
    titleEnglish: 'Large Language Models & External Tools',
    descriptionPersian: 'مدل‌های زبانی چگونه فکر می‌کنند، مفهوم توکن، مرز میان دانش ایستا و داده‌های خارجی، پدیده توهم و سازوکار فراخوانی ابزار (Tool Calling).',
    estimatedMinutes: 4,
    status: 'active',
    slides: [
      {
        id: 'c2-s1',
        chapterId: 2,
        slideNumber: 1,
        title: 'مدل زبانی چگونه فکر می‌کند؟',
        subtitle: 'پردازش توکن‌ها و پیش‌بینی محتمل‌ترین توکن بعدی (Next-Token Prediction)',
      },
      {
        id: 'c2-s2',
        chapterId: 2,
        slideNumber: 2,
        title: 'مرز دانش: دانستن سؤال، به معنی دسترسی به داده نیست',
        subtitle: 'تفاوت بنیادین دانش آموخته‌شده مدل با داده‌های زنده و پدیده توهم',
      },
      {
        id: 'c2-s3',
        chapterId: 2,
        slideNumber: 3,
        title: 'وقتی مدل درخواست استفاده از ابزار می‌دهد',
        subtitle: 'چرخه ۸ مرحله‌ای فراخوانی ابزار و نقش محوری برنامه میزبان (Host)',
      },
      {
        id: 'c2-s4',
        chapterId: 2,
        slideNumber: 4,
        title: 'شبیه‌ساز مقایسه: یک سؤال، دو نتیجه متفاوت',
        subtitle: 'مقایسه تعاملی پاسخ بدون ابزار با پاسخ مبتنی بر فراخوانی ابزار',
      },
      {
        id: 'c2-s5',
        chapterId: 2,
        slideNumber: 5,
        title: 'حلقه مفقوده: چرا Tool Calling به تنهایی کافی نیست؟',
        subtitle: 'چالش اتصالات اختصاصی N×M و لزوم شکل‌گیری استاندارد باز MCP',
      },
      {
        id: 'c2-s6',
        chapterId: 2,
        slideNumber: 6,
        title: 'سنجش تعاملی مفاهیم فصل دوم',
        subtitle: 'سه پرسش تشخیصی پیرامون توکن، مرز داده و پروتکل ارتباطی',
      },
    ],
  },
  {
    id: 3,
    slug: 'intro-to-mcp',
    numberPersian: 'فصل سوم',
    titlePersian: 'معرفی Model Context Protocol',
    titleEnglish: 'Introduction to MCP',
    descriptionPersian: 'گذار از اتصالات اختصاصی M×N به استاندارد باز مشترک، تحلیل تمثیل درگاه USB-C، تعریف رسمی و مرزبندی‌های پروتکل MCP.',
    estimatedMinutes: 4,
    status: 'active',
    slides: [
      {
        id: 'c3-s1',
        chapterId: 3,
        slideNumber: 1,
        title: 'مشکل اتصال‌های اختصاصی چه بود؟',
        subtitle: 'چالش مقیاس‌پذیری و هزینه فزاینده در معماری یکپارچه‌سازی نقطه‌به‌نقطه (M×N)',
      },
      {
        id: 'c3-s2',
        chapterId: 3,
        slideNumber: 2,
        title: 'راه‌حل: یک استاندارد ارتباطی مشترک',
        subtitle: 'گذار از آشفتگی درایورها به قرارداد واحد و مقیاس‌پذیری ارتباطات (M+N)',
      },
      {
        id: 'c3-s3',
        chapterId: 3,
        slideNumber: 3,
        title: 'تمثیل درگاه USB-C: فرصت‌ها و مرزها',
        subtitle: 'درک شهودی استانداردسازی و تفکیک نقادانه پروتکل نرم‌افزاری از پورت سخت‌افزاری',
      },
      {
        id: 'c3-s4',
        chapterId: 3,
        slideNumber: 4,
        title: 'Model Context Protocol دقیقاً چیست؟',
        subtitle: 'تعریف رسمی، خاستگاه متن‌باز در بنیاد لینوکس و سه قابلیت Tools، Resources و Prompts',
      },
      {
        id: 'c3-s5',
        chapterId: 3,
        slideNumber: 5,
        title: 'مرزبندی دقیق: MCP چه چیزی نیست؟',
        subtitle: 'پنج تفکیک حیاتی میان پروتکل ارتباطی با مدل زبانی، Tool Calling، پایگاه داده و امنیت',
      },
      {
        id: 'c3-s6',
        chapterId: 3,
        slideNumber: 6,
        title: 'حالا MCP چگونه کار می‌کند؟',
        subtitle: 'پیش‌نمایش پرسش‌های کلیدی معماری و ورود به کالبدشکافی ساختار سه‌لایه در فصل چهارم',
      },
    ],
  },
  {
    id: 4,
    slug: 'architecture',
    numberPersian: 'فصل چهارم',
    titlePersian: 'معماری و اجزای پروتکل Model Context Protocol (MCP)',
    titleEnglish: 'MCP Architecture, Components, and Communication Protocol',
    descriptionPersian: 'بررسی جامع لایه‌های داده و ترابری، سه نقش Host، Client و Server، توپولوژی چندسروری، پیام‌های JSON-RPC 2.0، متد server/discover و هسته بدون نشست، و مقایسه STDIO با Streamable HTTP بر اساس مشخصات ۲۰۲۶-۰۷-۲۸.',
    estimatedMinutes: 7,
    status: 'active',
    slides: [
      {
        id: 'c4-s1',
        chapterId: 4,
        slideNumber: 1,
        title: 'نمای کلی معماری MCP: بازیگران و لایه‌ها',
        subtitle: 'تفکیک لایه داده از لایه ترابری و معرفی مؤلفه‌های سه‌گانه پروتکل',
      },
      {
        id: 'c4-s2',
        chapterId: 4,
        slideNumber: 2,
        title: 'نقش Host، Client و Server در اکوسیستم',
        subtitle: 'مرزبندی وظایف مجاز، اختیارات کاربر انسانی و قاعده زرین ۱ به ۱',
      },
      {
        id: 'c4-s3',
        chapterId: 4,
        slideNumber: 3,
        title: 'معماری چندسروری و مرزهای ارتباطی',
        subtitle: 'توپولوژی Hub & Spoke مفهومی، تجمیع زمینه و ایزولاسیون کامل سرورها',
      },
      {
        id: 'c4-s4',
        chapterId: 4,
        slideNumber: 4,
        title: 'زبان مشترک ارتباط: پروتکل JSON-RPC 2.0',
        subtitle: 'سه رده اصلی پیام، تطبیق ناهمگام با شناسه یکتا و ساختار خطای استاندارد',
      },
      {
        id: 'c4-s5',
        chapterId: 4,
        slideNumber: 5,
        title: 'کشف قابلیت‌ها، نسخه‌بندی و هسته بدون نشست',
        subtitle: 'متد server/discover، فراداده‌های الزامی _meta و تحول مهندسی ۲۰۲۶',
      },
      {
        id: 'c4-s6',
        chapterId: 4,
        slideNumber: 6,
        title: 'لایه‌های انتقال: STDIO در برابر Streamable HTTP',
        subtitle: 'پردازه محلی خط‌محور در برابر وب سرویس راه دور با دو الگوی جریان رویداد SSE',
      },
    ],
  },
  {
    id: 5,
    slug: 'request-lifecycle',
    numberPersian: 'فصل پنجم',
    titlePersian: 'شبیه‌سازی جریان یک درخواست در MCP',
    titleEnglish: 'Interactive MCP Request Lifecycle Simulation',
    descriptionPersian: 'شبیه‌سازی گام‌به‌گام چرخه حیات یک درخواست واقعی از مبدأ تا مقصد، تفکیک نقش‌های شش‌گانه، بررسی پیام‌های tools/call و بازرسی زنده بارهای داده‌ای.',
    estimatedMinutes: 4,
    status: 'active',
    slides: [
      {
        id: 'c5-s1',
        chapterId: 5,
        slideNumber: 1,
        title: 'درخواست کاربر و پیش‌شرط‌های کانتکست',
        subtitle: 'طرح سناریوی استعلام NVMe-4TB، افشای داده ساختگی و اثبات کشف قبلی ابزارها با tools/list',
      },
      {
        id: 'c5-s2',
        chapterId: 5,
        slideNumber: 2,
        title: 'تصمیم مدل و هدایت برنامه میزبان',
        subtitle: 'استنتاج مدل زبانی، نمایش نمونه فراخوانی ابزار و بررسی سیاست‌های امنیتی هاست',
      },
      {
        id: 'c5-s3',
        chapterId: 5,
        slideNumber: 3,
        title: 'ارسال پیام استاندارد tools/call',
        subtitle: 'فرمول‌بندی درخواست رسمی JSON-RPC 2.0 با فراداده الزامی _meta توسط کلاینت MCP',
      },
      {
        id: 'c5-s4',
        chapterId: 5,
        slideNumber: 4,
        title: 'اجرای ابزار در سیستم خارجی انبار',
        subtitle: 'پردازش در سرور MCP، اعتبارسنجی ورودی و استعلام نمونه پایگاه داده با حفظ استقلال پروتکل',
      },
      {
        id: 'c5-s5',
        chapterId: 5,
        slideNumber: 5,
        title: 'بازگشت نتیجه، تفکیک خطا و ادغام کانتکست',
        subtitle: 'ساختار شیء result، تدقیق سناریوهای چهارگانه موفقیت و خطا و ادغام داده در مدل',
      },
      {
        id: 'c5-s6',
        chapterId: 5,
        slideNumber: 6,
        title: 'تولید پاسخ نهایی و جمع‌بندی چرخه حیات',
        subtitle: 'پاسخ روان مدل زبانی، مرور چرخه ۸ مرحله‌ای رفت و برگشت و انتقال به فصل ششم',
      },
    ],
  },
  {
    id: 6,
    slug: 'comparisons',
    numberPersian: 'فصل ششم',
    titlePersian: 'MCP در برابر APIها و روش‌های سنتی اتصال',
    titleEnglish: 'MCP vs APIs, Function Calling, and Traditional Integrations',
    descriptionPersian: 'کالبدشکافی جایگاه لایه‌ای MCP در برابر APIها، سبک معماری REST و مشخصات OpenAPI، تحلیل چالش اتصالات M×N، تفاوت با Function Calling و ماتریس تصمیم‌گیری مهندسی.',
    estimatedMinutes: 4,
    status: 'active',
    slides: [
      {
        id: 'c6-s1',
        chapterId: 6,
        slideNumber: 1,
        title: 'مغالطه بنیادین: MCP در برابر API؟',
        subtitle: 'اگر API وجود دارد، چرا به استاندارد جدیدی برای ارتباط هوش مصنوعی نیاز پیدا کرده‌ایم؟',
      },
      {
        id: 'c6-s2',
        chapterId: 6,
        slideNumber: 2,
        title: 'مفهوم API چیست و چه مساله‌ای را حل می‌کند؟',
        subtitle: 'آناتومی قرارداد API، سبک معماری REST، استاندارد OpenAPI و استعلام انبار NVMe-4TB',
      },
      {
        id: 'c6-s3',
        chapterId: 6,
        slideNumber: 3,
        title: 'چالش اتصالات مستقیم و مکرر در عصر هوش مصنوعی',
        subtitle: 'مسئله اتصالات اختصاصی چندگانه و مدل مفهومی M×N در برابر M+N',
      },
      {
        id: 'c6-s4',
        chapterId: 6,
        slideNumber: 4,
        title: 'ارزش افزوده MCP چیست؟ کالبدشکافی تطبیقی دو معماری',
        subtitle: 'مقایسه پهلوبه‌پهلوی دو معماری با حفظ کامل پایگاه داده و REST API انبار',
      },
      {
        id: 'c6-s5',
        chapterId: 6,
        slideNumber: 5,
        title: 'تفکیک سه‌گانه: MCP در برابر Function Calling و اتصالات سفارشی',
        subtitle: 'منظومه سه‌لایه پشته هوش مصنوعی، متد الزامی server/discover و هم‌زیستی فناوری‌ها',
      },
      {
        id: 'c6-s6',
        chapterId: 6,
        slideNumber: 6,
        title: 'ماتریس تصمیم‌گیری: چه زمانی از API مستقیم و چه زمانی از MCP استفاده کنیم؟',
        subtitle: 'معیارهای عینی انتخاب معماری بهینه و انتقال به فصل هفتم',
      },
    ],
  },
  {
    id: 7,
    slug: 'future-security',
    numberPersian: 'فصل هفتم',
    titlePersian: 'کاربردها، امنیت، محدودیت‌ها و آینده',
    titleEnglish: 'MCP in the Real World: Use Cases, Security, Limitations, and the Future',
    descriptionPersian: 'کاربردهای ملموس در دنیای واقعی، سناریوی تکمیلی انبار و تدارکات، مرزهای اعتماد و احراز هویت شبکه، اصل حداقل اختیارات و نظارت انسانی، محدودیت‌ها و پادالگوها، و نقشه راه باز بنیاد لینوکس.',
    estimatedMinutes: 4,
    status: 'active',
    slides: [
      {
        id: 'c7-s1',
        chapterId: 7,
        slideNumber: 1,
        title: 'کاربردهای ملموس در دنیای واقعی',
        subtitle: 'از محیط‌های توسعه تا پایگاه‌های دانش سازمانی و اتوماسیون',
      },
      {
        id: 'c7-s2',
        chapterId: 7,
        slideNumber: 2,
        title: 'سناریوی تکمیلی انبار و اتوماسیون چندابزاری',
        subtitle: 'هماهنگی میان دو سرور مستقل انبار و تدارکات با ارکستراسیون هاست',
      },
      {
        id: 'c7-s3',
        chapterId: 7,
        slideNumber: 3,
        title: 'معماری امنیت، مرزهای اعتماد و احراز هویت شبکه',
        subtitle: 'خطرات سرورهای محلی STDIO، الزامات هنجاری OAuth 2.1 و پیشگیری از Confused Deputy',
      },
      {
        id: 'c7-s4',
        chapterId: 7,
        slideNumber: 4,
        title: 'مدیریت اختیارات، اصل حداقل دسترسی و دروازه نظارت انسانی',
        subtitle: 'اصل Least Privilege، سطوح ریسک عملیات و دروازه تایید کاربر (HITL)',
      },
      {
        id: 'c7-s5',
        chapterId: 7,
        slideNumber: 5,
        title: 'آنچه MCP حل نمی‌کند: هزینه‌های مهندسی و پادالگوها',
        subtitle: 'تحلیل کیفی زنجیره تأخیر، واقعیت‌های مهندسی و ماتریس چه زمانی نباید از MCP استفاده کرد',
      },
      {
        id: 'c7-s6',
        chapterId: 7,
        slideNumber: 6,
        title: 'افق آینده، استانداردسازی باز و جمع‌بندی نهایی',
        subtitle: 'اولویت‌های پنج‌گانه نقشه راه رسمی، حاکمیت بنیاد لینوکس (AAIF) و تابلوی سنتز کلان ارائه',
      },
    ],
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

export const CHAPTER_02_QUIZ: QuizQuestion[] = [
  {
    id: 'c2-q1',
    question: 'آیا یک مدل زبانی به صورت ذاتی به موجودی لحظه‌ای انبار خصوصی دسترسی دارد؟',
    options: [
      {
        id: 'c2-q1-opt1',
        text: 'بله، چون در زمان آموزش تمام اطلاعات را دریافت کرده است.',
        isCorrect: false,
        explanation: 'نادرست. آموزش مدل روی داده‌های تاریخی عمومی پایان یافته است و مدل دسترسی زنده به اطلاعات داخلی و خصوصی شرکت‌ها ندارد.'
      },
      {
        id: 'c2-q1-opt2',
        text: 'خیر، برای دریافت این داده به اتصال یا ابزار مجاز نیاز دارد.',
        isCorrect: true,
        explanation: 'کاملاً صحیح! اطلاعات خصوصی و لحظه‌ای خارج از دسترس ذاتی مدل هستند و باید از طریق یک اتصال یا ابزار مجاز و احراز هویت شده دریافت شوند.'
      },
      {
        id: 'c2-q1-opt3',
        text: 'بله، چون مدل می‌تواند هر پایگاه داده‌ای را جست‌وجو کند.',
        isCorrect: false,
        explanation: 'نادرست. مدل به خودی خود دسترسی شبکه‌ای یا مجوز اتصال به هیچ دیتابیسی را ندارد.'
      }
    ],
    educationalTakeaway: 'دانش آموخته‌شده درون وزن‌های مدل (Model Knowledge) هرگز جایگزین داده‌های زنده و محرمانه سیستم‌های سازمانی (External Data) نیست.'
  },
  {
    id: 'c2-q2',
    question: 'چه بخشی مسئول اجرای واقعی ابزار است؟',
    options: [
      {
        id: 'c2-q2-opt1',
        text: 'خود مدل زبانی',
        isCorrect: false,
        explanation: 'نادرست. مدل زبانی فقط متن ساختاریافته درخواست (Tool Request) را تولید می‌کند و دسترسی اجرایی به سیستم ندارد.'
      },
      {
        id: 'c2-q2-opt2',
        text: 'برنامه میزبان (Host / Application Runtime)',
        isCorrect: true,
        explanation: 'کاملاً صحیح! مدل درخواست ابزار را تولید می‌کند؛ اما Host درخواست و مجوزها را بررسی و اجرای واقعی ابزار را در محیط امن مدیریت می‌کند.'
      },
      {
        id: 'c2-q2-opt3',
        text: 'توکنایزر (Tokenizer)',
        isCorrect: false,
        explanation: 'نادرست. توکنایزر فقط وظیفه تبدیل رشته‌های متنی به توکن‌ها و برعکس را بر عهده دارد.'
      }
    ],
    educationalTakeaway: 'مدل درخواست‌کننده است، نه مجری. برنامه میزبان (Host) به عنوان دروازه‌بان امنیتی، درخواست را اعتبارسنجی و در محیط کنترل‌شده اجرا می‌نماید.'
  },
  {
    id: 'c2-q3',
    question: 'تفاوت اصلی Tool Calling و MCP چیست؟',
    options: [
      {
        id: 'c2-q3-opt1',
        text: 'هر دو دقیقاً یک مفهوم و نام‌گذاری هستند.',
        isCorrect: false,
        explanation: 'نادرست. Tool Calling قابلیت درون‌مدلی برای درخواست ابزار است، در حالی که MCP پروتکل استاندارد باز ارتباطی است.'
      },
      {
        id: 'c2-q3-opt2',
        text: 'قابلیت Tool Calling برای درخواست اجرای ابزار است؛ MCP یک پروتکل استاندارد برای ارتباط میان برنامه‌ها و سرورهای ابزار فراهم می‌کند.',
        isCorrect: true,
        explanation: 'کاملاً صحیح! Tool Calling به نحوه درخواست استفاده از ابزار توسط مدل مربوط است؛ در حالی که MCP پروتکل استاندارد و جهان‌شمول ارتباط میان برنامه‌های هوش مصنوعی و سیستم‌های خارجی را تعریف می‌کند.'
      },
      {
        id: 'c2-q3-opt3',
        text: 'پروتکل MCP یک مدل زبانی جدیدتر است.',
        isCorrect: false,
        explanation: 'نادرست. MCP مدل هوش مصنوعی نیست، بلکه یک پروتکل باز معماری مبتنی بر JSON-RPC است.'
      }
    ],
    educationalTakeaway: 'فراخوانی ابزار (Tool Calling) شروع داستان است، اما برای پیشگیری از هزاران اتصال اختصاصی و ناسازگار، پروتکل باز MCP مانند USB-C استانداردسازی را محقق می‌سازد.'
  }
];


