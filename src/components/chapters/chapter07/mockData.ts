import {
  UseCaseScenario,
  MultiToolStep,
  SecurityPolicyItem,
  RoadmapPriority,
  SynthesisChapterNode,
  AntiPatternItem,
} from './types';

// ============================================================================
// 1. REAL-WORLD USE CASES (Section 07.1 & WorkflowTrustExplorer)
// ============================================================================

export const USE_CASE_SCENARIOS: UseCaseScenario[] = [
  {
    id: 'developer-ide',
    titlePersian: 'دستیار مهندسی نرم‌افزار در IDE',
    titleEnglish: 'Developer IDE Assistant',
    category: 'developer',
    hostName: 'VS Code / JetBrains (AI Host)',
    mcpClientRole: 'کلاینت‌های اختصاصی تعبیه‌شده در محیط توسعه',
    mcpServerName: 'سرور محلی Git (STDIO) و سرور راه دور GitHub (HTTP)',
    transportType: 'STDIO (محلی) / Streamable HTTP (راه دور)',
    underlyingService: 'مخزن محلی Git و سرویس ابری GitHub API',
    description:
      'ادیتور به عنوان هاست، یک سرور محلی Git را بر بستر STDIO اجرا کرده و به سرور راه دور سازمانی از طریق HTTP متصل می‌شود. مدل بدون دسترسی مستقیم به توکن‌های کاربر، از طریق ابزارهای استاندارد وضعیت شاخه‌ها را تحلیل می‌کند.',
    securityRiskNote:
      'سرور محلی Git با سطح دسترسی حساب کاربری سیستم‌عامل کاربر اجرا می‌شود؛ در غیاب سندباکس مناسب، هر ابزار محلی می‌تواند به فایل‌های مجاز کاربر دسترسی داشته باشد.',
    toolsExposed: ['git_status', 'git_diff', 'create_pull_request'],
    resourcesExposed: ['workspace://current/status', 'repo://branches/active'],
    activeBoundaries: ['unsandboxed-process', 'network-oauth'],
  },
  {
    id: 'enterprise-knowledge',
    titlePersian: 'پایگاه‌های دانش و مستندات سازمانی',
    titleEnglish: 'Enterprise Knowledge & Retrieval',
    category: 'enterprise',
    hostName: 'چت‌بات سازمانی درون‌شبکه‌ای (Enterprise Host)',
    mcpClientRole: 'کلاینت احراز هویت‌شده با توکن محدود OAuth 2.1',
    mcpServerName: 'سرور دانش اسناد محرمانه (Enterprise Docs Server)',
    transportType: 'Streamable HTTP',
    underlyingService: 'پایگاه داده برداری / سامانه مدیریت اسناد سازمانی',
    description:
      'ارائه انتخابی منابع مجاز سازمانی به صورت منابع یا متون زمینه‌ای؛ دامنه دسترسی واقعی وابسته به کنترل دسترسی سرور، مجوزهای کاربر و سیاست‌های برنامه میزبان است. محلی بودن مدل زبانی به‌تنهایی عدم خروج داده را تضمین نمی‌کند.',
    securityRiskNote:
      'پروتکل MCP مرز داده محرمانه ایجاد نمی‌کند؛ پایگاه اسناد باید مجوزهای کاربر را ممیزی کند تا اطلاعات طبقاتی به دست افراد غیرمجاز یا پرامپت عمومی مدل نرسد.',
    toolsExposed: ['search_documents', 'get_policy_summary'],
    resourcesExposed: ['docs://hr/policies/2026', 'docs://eng/architecture/v2'],
    activeBoundaries: ['untrusted-data', 'network-oauth'],
  },
  {
    id: 'multi-tool-warehouse',
    titlePersian: 'زنجیره تأمین: انبار و تدارکات چندسروره',
    titleEnglish: 'Multi-Server Supply Chain Automation',
    category: 'automation',
    hostName: 'ارکستراتور لجستیک سازمانی (Operations Host)',
    mcpClientRole: 'کلاینت‌های مستقل برای هر سرور زیرین',
    mcpServerName: 'سرور دیتابیس انبار (A) و سرور سامانه تدارکات (B)',
    transportType: 'Streamable HTTP',
    underlyingService: 'پایگاه PostgreSQL انبار و سامانه خرید مبتنی بر REST API',
    description:
      'سناریوی تکمیلی انبار و تدارکات: هاست استعلام قطعه NVMe-4TB را با query_inventory دریافت کرده و بر مبنای درخواست صریح کاربر، تیکت پیگیری تأمین را در سامانه تدارکات ثبت می‌نماید.',
    securityRiskNote:
      'هر سرور قابلیت‌های خود را از طریق اتصال کلاینت اختصاصی به هاست عرضه می‌کند و پروتکل ارتباط مستقیم سرور-به-سرور تعریف نمی‌نماید. هاست جریان کار را هماهنگ کرده و کنترل می‌کند چه اطلاعاتی به مدل یا سایر اجزا منتقل شود. این معماری به خودی خود تضمین‌کننده ذاتی عدم نشت داده یا جداسازی سامانه‌های زیرین نیست.',
    toolsExposed: ['query_inventory', 'create_procurement_ticket'],
    resourcesExposed: ['inventory://parts/NVMe-4TB/status'],
    activeBoundaries: ['untrusted-data', 'network-oauth'],
  },
];

// ============================================================================
// 2. MULTI-TOOL WAREHOUSE SCENARIO (Section 07.2)
// ============================================================================

export const WAREHOUSE_INVENTORY_RESULT = {
  sku: 'NVMe-4TB',
  quantity: 6,
  inventory_id: 'INV-2026-981',
};

export const PROCUREMENT_MOCK_TICKET = {
  ticket_id: 'PROC-2026-7741',
  item: 'NVMe-4TB',
  requested_qty: 10,
  status: 'AWAITING_APPROVAL',
  priority: 'NORMAL',
};

export const MULTI_TOOL_WORKFLOW_STEPS: MultiToolStep[] = [
  {
    stepNumber: 1,
    titlePersian: 'درخواست صریح و مستند کاربر انسانی',
    actor: 'user',
    actionPersian: 'ثبت درخواست ارتقا توسط اپراتور سیستم',
    details:
      '«با توجه به برنامه ارتقای دیتاسنتر، لطفاً یک درخواست تأمین برای ۱۰ ماژول جدید ثبت کن.» (اقدام خرید بر مبنای اراده کاربر است، نه صرفاً کسری خودکار موجودی).',
  },
  {
    stepNumber: 2,
    titlePersian: 'استعلام موجودی جاری از سرور انبار (Server A)',
    actor: 'client-inventory',
    actionPersian: 'فراخوانی ابزار query_inventory(sku: "NVMe-4TB")',
    details:
      'کلاینت ۱ با اتصال به سرور پایگاه داده انبار، موجودی و شناسه رکورد را استعلام می‌کند. پایگاه داده PostgreSQL زیرین دست‌نخورده باقی می‌ماند.',
    payload: WAREHOUSE_INVENTORY_RESULT,
    status: 'موجودی انبار: ۶ عدد • شناسه: INV-2026-981',
  },
  {
    stepNumber: 3,
    titlePersian: 'ارزیابی وضعیت و گیت تایید انسانی هاست (HITL Gate)',
    actor: 'host',
    actionPersian: 'سنتز اطلاعات و بررسی مجوز فراخوانی ابزار خرید',
    details:
      'برنامه میزبان نتیجه استعلام انبار را دریافت کرده و متناسب با درخواست صریح کاربر (تأمین ۱۰ ماژول)، گیت تایید انسانی را برای فراخوانی ابزار تدارکات فعال می‌کند تا مجوز صریح اپراتور اخذ شود.',
  },
  {
    stepNumber: 4,
    titlePersian: 'صدور تیکت تدارکات در وضعیت معلق بازبینی اداری (Server B)',
    actor: 'client-procurement',
    actionPersian: 'فراخوانی ابزار create_procurement_ticket(...)',
    details:
      'پس از صدور مجوز توسط کاربر در هاست، کلاینت درخواست ایجاد تیکت را ارسال می‌کند. سرور تدارکات تیکت را در وضعیت امن AWAITING_APPROVAL (در انتظار بازبینی اداری و تایید تدارکاتی سازمان) ثبت می‌نماید.',
    payload: PROCUREMENT_MOCK_TICKET,
    status: 'تیکت PROC-2026-7741 صادر شد (داده نمایشی و آموزشی)',
    isMockData: true,
  },
  {
    stepNumber: 5,
    titlePersian: 'گزارش شفاف به کاربر بدون ادعای تراکنش مالی قطعی',
    actor: 'host',
    actionPersian: 'پاسخ نهایی مدل زبانی و برنامه میزبان به کاربر',
    details:
      'هاست به کاربر اطلاع می‌دهد که موجودی فعلی ۶ عدد است و درخواست خرید ۱۰ ماژول با شناسه تیکت PROC-2026-7741 در سامانه تدارکات ثبت شده و منتظر تایید ناظر انسانی است.',
  },
];

// ============================================================================
// 3. SECURITY POLICY SIMULATOR (Section 07.4 & SecurityPolicySimulator)
// ============================================================================

export const SECURITY_POLICY_ITEMS: SecurityPolicyItem[] = [
  {
    id: 'query_log',
    name: 'استعلام لاگ رویدادها',
    toolName: 'query_system_log',
    riskLevel: 'low',
    riskLevelPersian: 'ریسک پایین (عملیات فقط‌خواندنی)',
    defaultDecision: 'ALLOW',
    decisionPersian: 'مجاز (اجرای خودکار با سیاست پیش‌فرض)',
    summaryPersian: 'کوئری محدود و فقط‌خواندنی بر روی لاگ‌های تاریخی سیستم بدون تغییر وضعیت',
    riskExplanationPersian:
      'این عملیات هیچ وضعیتی را تغییر نمی‌دهد و بار پردازشی پایینی دارد. هاست بر اساس اصل حداقل اختیارات (Least Privilege)، چنین ابزارهای صرفاً خواندنی را مجاز می‌شناسد.',
    owaspReference: 'LLM02:2025 — کنترل دسترسی و پیشگیری از افشای اطلاعات حساس',
    mcpSpecReference: 'Model Context Protocol: Tools Specification (Read-only execution)',
    mockPayload: {
      log_level: 'INFO',
      limit: 10,
      service: 'inventory-watcher',
    },
    mockOutcome: 'لاگ‌های درخواستی با موفقیت واکشی و در کانتکست قرار گرفت (۱۰ سطر).',
  },
  {
    id: 'send_email',
    name: 'ارسال اعلان ایمیل به تیم',
    toolName: 'send_team_notification',
    riskLevel: 'medium',
    riskLevelPersian: 'ریسک متوسط (ارسال پیام برگشت‌ناپذیر اما غیرمخرب)',
    defaultDecision: 'ALLOW',
    decisionPersian: 'مجاز مشروط به ممیزی و ثبت در لاگ (Audit Trail)',
    summaryPersian: 'ارسال ایمیل خلاصه‌وضعیت موجودی انبار به کارشناس خرید سازمان',
    riskExplanationPersian:
      'ارسال پیام به کانال‌های ارتباطی اثر بیرونی دارد، اما عملیات مالی یا زیرساختی مخربی نیست. هاست با ثبت رویداد در لاگ ممیزی (Audit Logging) اجرای آن را مجاز می‌داند.',
    owaspReference: 'LLM05:2025 — رفتار با خروجی به عنوان ورودی غیرقابل‌اعتماد',
    mcpSpecReference: 'Security Best Practices: Audit Logging and Action Tracking',
    mockPayload: {
      to: 'ops-lead@company.local',
      subject: 'وضعیت ارتقای ماژول‌های NVMe-4TB',
      body: 'تیکت تأمین ۱۰ ماژول در سامانه صادر شد.',
    },
    mockOutcome: 'ایمیل با موفقیت در صف ارسال قرار گرفت و کد پیگیری در لاگ ممیزی ثبت شد.',
  },
  {
    id: 'reorder_inventory',
    name: 'سفارش مجدد قطعه در انبار',
    toolName: 'create_procurement_ticket',
    riskLevel: 'high',
    riskLevelPersian: 'ریسک بالا (تعهد تدارکاتی / مالی نیازمند کنترل)',
    defaultDecision: 'CONFIRM',
    decisionPersian: 'نیازمند تایید صریح ناظر انسانی برای فراخوانی ابزار (Tool Invocation HITL Gate)',
    summaryPersian: 'صدور تیکت خرید ۱۰ ماژول سخت‌افزاری NVMe-4TB در سامانه تدارکات',
    riskExplanationPersian:
      'هرگونه ابزاری که بار مالی یا تعهد حقوقی ایجاد کند نیازمند تایید انسانی در هاست برای فراخوانی است. پس از تایید کاربر و اجرای ابزار، تیکت در سامانه تدارکات با وضعیت اداری معلق (AWAITING_APPROVAL) صادر می‌شود تا مراحل تأیید سازمانی را طی کند.',
    owaspReference: 'LLM06:2025 — مهار عاملیت بیش از حد (Excessive Agency Protection)',
    mcpSpecReference: 'Security Best Practices: Explicit User Consent for High-Impact Actions',
    mockPayload: {
      sku: 'NVMe-4TB',
      requested_quantity: 10,
      reason: 'برنامه ارتقای دیتاسنتر',
    },
    mockOutcome: 'دروازه نظارت انسانی فعال شد: فراخوانی ابزار تا زمان تایید صریح اپراتور معلق است.',
  },
  {
    id: 'drop_table',
    name: 'حذف جدول پایگاه داده انبار',
    toolName: 'drop_database_table',
    riskLevel: 'critical',
    riskLevelPersian: 'ریسک بحرانی (عملیات تخریبی برگشت‌ناپذیر - DDL)',
    defaultDecision: 'DENY',
    decisionPersian: 'مسدودسازی قطعی (Permanently Denied by Policy)',
    summaryPersian: 'تلاش برای اجرای فرمان DROP TABLE بر روی جدول اصلی موجودی انبار',
    riskExplanationPersian:
      'فرمان‌های تخریبی ساختاری تحت هیچ شرایطی نباید حتی به عنوان ابزار در دسترس مدل قرار گیرند یا در صورت ارسال مسدود می‌شوند. هاست این درخواست را قطعا رد کرده و هیچ سازوکاری برای دور زدن این منع در شبیه‌ساز وجود ندارد.',
    owaspReference: 'LLM06:2025 & Principle of Least Privilege — ممانعت از تخریب داده‌ها',
    mcpSpecReference: 'Security Best Practices: Host Enforcement & Hard Boundary Policies',
    mockPayload: {
      table_name: 'warehouse_inventory',
      cascade: true,
    },
    mockOutcome: 'خطا: اجرای عملیات تخریبی توسط خط‌مشی هاست مسدود شد (Permission Denied).',
  },
];

// ============================================================================
// 4. ROADMAP PRIORITIES (Section 07.6)
// ============================================================================

export const ROADMAP_PRIORITIES: RoadmapPriority[] = [
  {
    id: 'agentic-messaging',
    priorityNumber: 1,
    titleEnglish: 'Agentic Messaging Primitives',
    titlePersian: 'پریمیتیوهای پیام‌رسانی عامل‌محور',
    descriptionPersian:
      'توسعه الگوهای استاندارد برای مکالمه، هماهنگی و تبادل پیام میان چند عامل هوشمند مستقل (Multi-Agent Workflows) با حفظ ساختار پیام‌رسانی پروتکل.',
    category: 'core-protocol',
    statusBadge: 'اولویت راهبردی هسته',
  },
  {
    id: 'http-native-transport',
    priorityNumber: 2,
    titleEnglish: 'HTTP-Native Transport Unification and Hardening',
    titlePersian: 'یکپارچه‌سازی و مقاوم‌سازی ترابری بومی HTTP',
    descriptionPersian:
      'تقویت و بهینه‌سازی سازوکار Streamable HTTP جهت ارتباطات ابری مقیاس‌پذیر، مدیریت موثر سشن‌ها و ارتقای عملکرد در مقایسه با روش‌های ترکیبی قدیمی.',
    category: 'transport',
    statusBadge: 'اولویت زیرساختی ترابری',
  },
  {
    id: 'agent-identity-security',
    priorityNumber: 3,
    titleEnglish: 'Agent Identity and Enterprise-Ready Security',
    titlePersian: 'هویت عامل‌ها و امنیت سطح سازمانی',
    descriptionPersian:
      'تعریف الگوهای هویت متمایز برای عامل‌های خودمختار، مدیریت توکن‌های تفویض‌شده، پیشگیری از معاون گیج و یکپارچه‌سازی با زیرساخت‌های احراز هویت سازمانی.',
    category: 'security',
    statusBadge: 'اولویت امنیت سازمانی',
  },
  {
    id: 'improved-primitives',
    priorityNumber: 4,
    titleEnglish: 'Improved Primitives',
    titlePersian: 'بهبود و ارتقای پریمیتیوها',
    descriptionPersian:
      'افزایش قابلیت‌های سه‌گانه منابع (Resources)، پرامپت‌ها (Prompts) و ابزارها (Tools)، پشتیبانی بهتر از داده‌های چندرسانه‌ای و فراداده‌های غنی‌تر.',
    category: 'core-protocol',
    statusBadge: 'اولویت تکامل مشخصات',
  },
  {
    id: 'sdk-developer-experience',
    priorityNumber: 5,
    titleEnglish: 'Improved SDK Developer Experience',
    titlePersian: 'ارتقای تجربه توسعه‌دهندگان در SDKها',
    descriptionPersian:
      'ساده‌سازی نگارش کد در زبان‌های مختلف (TypeScript, Python, Go, Java)، ایجاد توابع ساده‌تر نظیر serveStdio، و ارائه ابزارهای ممیزی و اشکال‌زدایی رسمی.',
    category: 'developer-experience',
    statusBadge: 'اولویت تجربه توسعه',
  },
];

// ============================================================================
// 5. CHAPTER SYNTHESIS NODES (GrandSynthesisBoard)
// ============================================================================

export const SYNTHESIS_CHAPTER_NODES: SynthesisChapterNode[] = [
  {
    chapterId: 1,
    numberPersian: 'فصل ۱',
    titlePersian: 'مقدمه و مسئله اصلی',
    titleEnglish: 'Introduction & Main Problem',
    coreTakeawayPersian:
      'مدل‌های زبانی در یک اتاق ایزوله وزن‌ها زندگی می‌کنند؛ برای اثرگذاری در دنیای واقعی، نیازمند ابزار و اتصال خارجی هستند.',
    iconName: 'Sparkles',
    badgeColor: 'cyan',
  },
  {
    chapterId: 2,
    numberPersian: 'فصل ۲',
    titlePersian: 'از پیش‌بینی متن تا ابزارها',
    titleEnglish: 'LLMs & External Tools',
    coreTakeawayPersian:
      'فراخوانی ابزار (Tool Calling) استنتاج متن را به ساختار معنادار تبدیل می‌کند، اما به پروتکل استاندارد مستقل برای مقیاس‌پذیری نیاز دارد.',
    iconName: 'Layers',
    badgeColor: 'indigo',
  },
  {
    chapterId: 3,
    numberPersian: 'فصل ۳',
    titlePersian: 'معرفی استاندارد MCP',
    titleEnglish: 'Introduction to MCP',
    coreTakeawayPersian:
      'پروتکل زمینه مدل به عنوان یو‌اس‌بی پورت هوش مصنوعی، یک لایه استاندارد خنثی و باز میان هر هاست و هر سرور منبع بنا می‌نهد.',
    iconName: 'Network',
    badgeColor: 'emerald',
  },
  {
    chapterId: 4,
    numberPersian: 'فصل ۴',
    titlePersian: 'معماری و مؤلفه‌های کلیدی',
    titleEnglish: 'Architecture & Core Components',
    coreTakeawayPersian:
      'تفکیک صریح وظایف Host، Client و Server همراه با پریمیتیوهای سه‌گانه ابزارها، منابع و پرامپت‌ها بر بستر JSON-RPC 2.0.',
    iconName: 'Cpu',
    badgeColor: 'purple',
  },
  {
    chapterId: 5,
    numberPersian: 'فصل ۵',
    titlePersian: 'چرخه حیات یک درخواست',
    titleEnglish: 'Request Lifecycle Simulation',
    coreTakeawayPersian:
      'سه مرحله حیاتی مقداردهی اولیه، کشف قابلیت‌ها، و تبادل پیام که ارتباط امن و پایدار را تضمین می‌کنند.',
    iconName: 'Workflow',
    badgeColor: 'amber',
  },
  {
    chapterId: 6,
    numberPersian: 'فصل ۶',
    titlePersian: 'MCP در برابر APIها',
    titleEnglish: 'MCP vs Traditional APIs',
    coreTakeawayPersian:
      'هم‌افزایی به جای رقابت؛ MCP کلاینت‌های هوش مصنوعی را استاندارد می‌کند و از APIها و پایگاه‌های داده موجود محافظت می‌نماید.',
    iconName: 'ArrowLeftRight',
    badgeColor: 'cyan',
  },
  {
    chapterId: 7,
    numberPersian: 'فصل ۷',
    titlePersian: 'کاربردها، امنیت و آینده',
    titleEnglish: 'Real World, Security & Future',
    coreTakeawayPersian:
      'ارزش واقعی در تعامل امن چندابزاری با رعایت مرزهای اعتماد، نظارت انسانی، اصل حداقل اختیارات و حاکمیت باز بنیاد لینوکس محقق می‌شود.',
    iconName: 'ShieldCheck',
    badgeColor: 'emerald',
  },
];

// ============================================================================
// 6. ANTI-PATTERNS & WHEN NOT TO USE MCP (Section 07.5)
// ============================================================================

export const ANTI_PATTERNS: AntiPatternItem[] = [
  {
    id: 'single-script',
    scenarioPersian: 'اسکریپت‌های یک‌بارمصرف یا خط‌فرمان‌های کوچک',
    whyAvoidPersian:
      'افزودن سرور MCP، کلاینت اختصاصی و لایه JSON-RPC برای یک اسکریپت ساده پایتون که فقط یک کوئری محلی اجرا می‌کند، سربار بی‌مورد است.',
    betterAlternativePersian: 'فراخوانی مستقیم اسکریپت یا استفاده از کتابخانه‌های ساده خط فرمان.',
    riskOfUsingMcpPersian: 'پیچیدگی غیرضروری کد، زحمت نگهداری و دشواری در عیب‌یابی محلی.',
  },
  {
    id: 'realtime-ultra-low-latency',
    scenarioPersian: 'سامانه‌های بلادرنگ با حساسیت زیر میلی‌ثانیه',
    whyAvoidPersian:
      'هر لایه پروتکل (سریال‌سازی JSON، انتقال IPC یا شبکه، دیسپچ و پردازش هاست) به طور کیفی تأخیر اضافه می‌کند.',
    betterAlternativePersian: 'اتصال مستقیم بانیفای‌شده حافظه (Direct Memory / Shared Memory) یا پروتکل‌های فشرده باینری (gRPC/Protobuf).',
    riskOfUsingMcpPersian: 'عدم پاسخگویی به الزامات نرخ تبادل بالا و زمان پاسخ بحرانی سیستم‌های ریل‌تایم.',
  },
  {
    id: 'single-app-single-api',
    scenarioPersian: 'یک برنامه ثابت متصل به فقط یک وب‌سرویس مشخص',
    whyAvoidPersian:
      'وقتی قرار نیست مدل با هیچ منبع یا هاست دیگری کار کند، مزیت بازاستفاده‌پذیری معماری MCP پدیدار نمی‌شود.',
    betterAlternativePersian: 'یکپارچه‌سازی سنتی با استفاده از SDK رسمی همان سرویس یا فراخوانی مستقیم REST API.',
    riskOfUsingMcpPersian: 'هزینه نگهداری یک لایه تطبیق اضافی بدون بهره‌مندی از انعطاف‌پذیری اکوسیستم.',
  },
  {
    id: 'expecting-model-safety',
    scenarioPersian: 'انتظار رفع خودکار توهم یا تضمین امنیت منطقی از MCP',
    whyAvoidPersian:
      'پروتکل MCP یک لایه انتقال و قرارداد ارتباطی است، نه گاردریل استنتاجی یا سیستم تایید محتوای معنایی مدل.',
    betterAlternativePersian: 'پیاده‌سازی گاردریل‌های هاست (Host Guardrails)، فیلترهای ورودی/خروجی و دروازه‌های نظارت انسانی (HITL).',
    riskOfUsingMcpPersian: 'احساس کاذب امنیت و مواجهه با حملات تزریق غیرمستقیم پرامپت (Indirect Prompt Injection).',
  },
];

// ============================================================================
// 7. SPEAKER NOTES FOR CHAPTER 07 SECTIONS
// ============================================================================

export const SPEAKER_NOTES: Record<number, { title: string; bullets: string[]; closingPrompt: string }> = {
  0: {
    title: 'نکات سخنران: بخش ۰۷.۱ • کاربردهای ملموس در دنیای واقعی (۴۰ ثانیه)',
    bullets: [
      'ارائه را با اتصال به دنیای واقعی آغاز کنید: در فصول قبل دیدیم MCP چطور کار می‌کند، حالا ببینیم شرکت‌ها و مهندسان عملاً چه استفاده‌ای از آن می‌کنند.',
      'سه حوزه اصلی را برجسته نمایید: دستیارهای IDE مانند VS Code، پایگاه‌های دانش و مستندات سازمانی، و سامانه‌های اتوماسیون زنجیره تأمین.',
      'روی کاوشگر تعاملی کلیک کنید و نشان دهید که هاست چطور کلاینت‌ها را به سرورهای محلی یا ابری متصل می‌کند.',
      'تأکید کنید که اتصال مدل زبانی به یک پایگاه اسناد محلی به‌خودی‌خود به معنای نشت نکردن داده نیست؛ هاست و سرور باید سیاست‌های دسترسی را کنترل کنند.',
    ],
    closingPrompt: 'اکنون بیایید ببینیم وقتی یک عملیات نیازمند همکاری چند سرور مستقل است، چه اتفاقی می‌افتد...',
  },
  1: {
    title: 'نکات سخنران: بخش ۰۷.۲ • سناریوی تکمیلی انبار و اتوماسیون چندابزاری (۳۵ ثانیه)',
    bullets: [
      'سناریوی باسابقه قطعه NVMe-4TB با موجودی ۶ عدد و کد INV-2026-981 را به خاطر بیاورید.',
      'تصریح کنید که خرید ۱۰ ماژول جدید، بر مبنای درخواست صریح کاربر («با توجه به برنامه ارتقا، درخواست تأمین برای ۱۰ ماژول ثبت کن») است و مدل خودسرانه خرید نکرده است.',
      'تفکیک اتصالات دو سرور: هر سرور از طریق کلاینت متناظر به هاست وصل است و پروتکل ارتباط مستقیم سرور-به-سرور ندارد؛ هاست مشخص می‌کند چه اطلاعاتی به اشتراک گذاشته شود، بدون آنکه پروتکل به خودی خود ایزولاسیون یا عدم نشت داده را تضمین کند.',
      'یادآوری کنید که نتیجه تیکت تأمین (PROC-2026-7741) داده نمایشی و آموزشی است و در وضعیت AWAITING_APPROVAL قرار دارد.',
    ],
    closingPrompt: 'اما در این میان، مرزهای امنیتی و حدود اعتماد میان این همه مؤلفه کجاست؟ اسلاید بعد پاسخ می‌دهد...',
  },
  2: {
    title: 'نکات سخنران: بخش ۰۷.۳ • معماری امنیت، حدود اعتماد و مهار آسیب‌پذیری‌ها (۴۵ ثانیه)',
    bullets: [
      'این بخش مهم‌ترین اسلاید امنیتی ارائه است. صریحاً بگویید: MCP یک پروتکل استاندارد است، نه یک قرص جادویی امنیت!',
      'ملاحظات امنیتی ترابری محلی STDIO را تشریح کنید: ترابری STDIO به خودی خود سندباکس یا ایزولاسیون سیستم‌عامل ارائه نمی‌دهد و سرور تحت اختیارات حساب کاربری سیستم‌عامل اجرا می‌شود؛ هاست یا محیط استقرار باید سیاست‌های حداقل اختیارات و سندباکس را اعمال نمایند.',
      'الزامات هنجاری شبکه را ذکر کنید: سرورهای منبع در ارتباطات HTTP مبتنی بر OAuth 2.1 موظفند شناسه مخاطب هدف (aud) را اعتبارسنجی کنند و فوروارد خام توکن ممنوع است (پیشگیری از Confused Deputy).',
      'ریسک تزریق غیرمستقیم پرامپت (OWASP LLM01:2025): اگر متنی آلوده از دیتابیس خوانده شود، هاست باید با آن به عنوان ورودی غیرقابل‌اعتماد رفتار کند.',
    ],
    closingPrompt: 'برای مهار این ریسک‌ها در عمل، چگونه باید خط‌مشی‌های کنترلی و تاییدیه انسانی را پیاده کنیم؟',
  },
  3: {
    title: 'نکات سخنران: بخش ۰۷.۴ • اصل حداقل اختیارات و دروازه نظارت انسانی (۴۰ ثانیه)',
    bullets: [
      'اصل حداقل اختیارات (Least Privilege) را تعریف کنید: هر ابزار تنها مجاز به انجام وظیفه محدود خود است.',
      'چهار عملیات شبیه‌ساز را معرفی کنید: خواندن لاگ (مجاز)، ارسال ایمیل (مجاز با لاگ)، سفارش کالا (نیازمند تایید کاربر)، و حذف دیتابیس (کاملاً مسدود).',
      'روی دکمه Drop Table کلیک کنید و نشان دهید که سیستم حتی گزینه تایید به کاربر نمی‌دهد و بلافاصله DENY اعمال می‌شود.',
      'روی دکمه Re-order Inventory کلیک کنید و نشان دهید که گیت نظارت انسانی چطور مانع از اجرای خودسرانه عملیات مالی می‌شود.',
    ],
    closingPrompt: 'آیا همیشه و همه‌جا باید از MCP استفاده کرد؟ خیر! بیایید به محدودیت‌ها و هزینه‌های مهندسی نگاه کنیم...',
  },
  4: {
    title: 'نکات سخنران: بخش ۰۷.۵ • محدودیت‌های واقعی، هزینه‌ها و نقاط نامناسب برای MCP (۴۰ ثانیه)',
    bullets: [
      'دیدگاه مهندسی متعادل ارائه دهید: پروتکل‌های خوب را با شناختن نقاط نامناسب‌شان تعریف می‌کنند، نه با ادعای بی‌نقص بودن.',
      'تحلیل کیفی سربار درخواست بر مبنای مشخصات رسمی ۲۰۲۶-۰۷-۲۸: پردازش بدون‌حالت (Stateless) در HTTP مستقل از لایه احراز هویت است و اتصالات ترابری از نشست‌های پروتکلی متمایزند؛ پروتکل JSON-RPC 2.0 خود الزام مستقلی برای تکرار توکن‌ها یا شناسه‌ها تعیین نکرده و سربار به صورت کیفی ناشی از فراداده‌ها، سریال‌سازی و تأخیر ترابری است (استاندارد RFC 9457 صرفاً ساختار خطاهای HTTP یا Problem Details است و نباید به عنوان مشخصات نشست پروتکل تلقی شود).',
      'پادالگوها را مرور کنید: برای یک اسکریپت ساده محلی یا یک برنامه تک‌منظوره که فقط با یک REST API کار می‌کند، سربار MCP ارزش افزوده ندارد.',
      'MCP نمی‌تواند توهم مدل زبانی را برطرف کند یا قطعی سرویس‌های زیرین را ترمیم نماید.',
    ],
    closingPrompt: 'و در نهایت، این اکوسیستم با پشتیبانی بنیاد لینوکس به کدام سو می‌رود و جمع‌بندی کل ارائه چیست؟',
  },
  5: {
    title: 'نکات سخنران: بخش ۰۷.۶ • نقشه راه، حاکمیت بنیاد لینوکس و جمع‌بندی نهایی ارائه (۴۰ ثانیه)',
    bullets: [
      'پنج اولویت نقشه راه رسمی اوت ۲۰۲۶ را به عنوان جهت‌گیری‌های جاری توسعه معرفی کنید (پیام‌رسانی عامل‌ها، ترابری بومی HTTP، امنیت سازمانی، غنی‌سازی پریمیتیوها و ارتقای SDKها).',
      'تشکیل بنیاد هوش مصنوعی عامل‌محور (AAIF) ذیل بنیاد لینوکس در دسامبر ۲۰۲۵ را به عنوان خانه حقوقی بی‌طرف و ضامن ماندگاری استاندارد باز تبیین کنید.',
      'تابلوی جمع‌بندی کل ارائه (Grand Synthesis Board) را به عنوان نقشه هفت‌فصلی گذار از اتاق ایزوله مدل‌های زبانی تا تعامل استاندارد ابزارها به نمایش بگذارید.',
      'سخن پایانی طلایی را با لحنی محکم و علمی قرائت کرده و صمیمانه از حضار برای ورود به بخش پرسش و پاسخ دعوت به عمل آورید.',
    ],
    closingPrompt: 'از توجه شما به ارائه جامع پروتکل زمینه مدل (MCP) بسیار سپاسگزاریم. اکنون آماده پاسخ‌گویی به پرسش‌های شما هستیم.',
  },
};
