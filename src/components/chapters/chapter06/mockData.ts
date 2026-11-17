import { AIHost, ExternalService, MatrixConnection, DecisionCriterion, TriadLayerDetail } from './types';

export const CONSTANTS = {
  SKU: 'NVMe-4TB',
  INVENTORY_QUANTITY: 6,
  INVENTORY_ID: 'INV-2026-981',
  PROTOCOL_VERSION: '2026-07-28',
  REST_ENDPOINT: 'GET /api/v1/inventory/NVMe-4TB',
  TOOL_NAME: 'query_inventory',
  STREAMABLE_HTTP_HEADERS: ['MCP-Protocol-Version', 'Mcp-Method', 'Mcp-Name'],
} as const;

export const STREAMABLE_HTTP_HEADER_DETAILS = [
  {
    name: 'MCP-Protocol-Version',
    scope: 'الزامی در تمام درخواست‌های POST به اندپوینت MCP (نسخه 2026-07-28)',
    status: 'MUST on POST',
  },
  {
    name: 'Mcp-Method',
    scope: 'الزامی در تمام درخواست‌ها برای هدایت متد JSON-RPC هدف (مانند tools/call یا server/discover)',
    status: 'MUST on All',
  },
  {
    name: 'Mcp-Name',
    scope: 'الزامی فقط در عملیات‌های نام‌دار (tools/call, resources/read, prompts/get)؛ در سایر متدها ارسال نمی‌شود',
    status: 'Conditional (Named Operations)',
  },
] as const;

export const MATRIX_EDUCATIONAL_DISCLAIMER =
  'مدل مفهومی آموزشی؛ نمایش ساده‌سازی‌شده صرفه‌جویی در واحدهای پیاده‌سازی و کدنویسی (M+N واحد کد مستقل در برابر M×N کدهای سفارشی پراکنده)، نه کاهش اتصالات یا روابط اجرایی ران‌تایم. هر Host برای ارتباط با هر MCP Server، یک نمونه منطقی مستقل از MCP Client مدیریت می‌کند (۳×۳ = ۹ رابطه منطقی کلاینت-سرور). در نسخه 2026-07-28، درخواست‌ها مستقل و خودتوصیفگر هستند و پروتکل دیگر Session یا شناسه Mcp-Session-Id در سطح پروتکل ندارد. در یک سازمان واقعی ممکن است تیم‌ها از پیش از SDKهای مشترک استفاده کنند؛ بنابراین کاهش به ۶ مربوط به بار پیاده‌سازی و نگهداری مستقل کد است، نه تعداد روابط در ران‌تایم.';

export const AI_HOSTS: AIHost[] = [
  {
    id: 'host-ide',
    name: 'IDE Code Assistant',
    namePersian: 'دستیار هوشمند محیط توسعه (IDE)',
    role: 'توسعه‌دهندگان نرم‌افزار',
    iconName: 'Code',
    description: 'دستیار کدنویسی درون ادیتور با دسترسی به فایل‌ها، ترمینال و ابزارهای خارجی.',
  },
  {
    id: 'host-desktop',
    name: 'Desktop AI Chat',
    namePersian: 'برنامه دسکتاپ هوش مصنوعی',
    role: 'کاربران عمومی و مدیران',
    iconName: 'Monitor',
    description: 'نرم‌افزار مستقل چت با واسط گرافیکی و قابلیت اتصال چندمنظوره.',
  },
  {
    id: 'host-agent',
    name: 'Autonomous Agent',
    namePersian: 'ایجنت تحلیل و اجرای خودکار',
    role: 'سیستم‌های اتوماسیون داده',
    iconName: 'Bot',
    description: 'عامل خودمختار پس‌زمینه برای بررسی دوره‌ای و هماهنگی وظایف بین‌سیستمی.',
  },
];

export const EXTERNAL_SERVICES: ExternalService[] = [
  {
    id: 'service-warehouse',
    name: 'Warehouse REST API',
    namePersian: 'وب‌سرویس انبار سخت‌افزار',
    category: 'Inventory & ERP',
    iconName: 'Database',
    endpoint: '/api/v1/inventory/{sku}',
    description: 'سامانه موجودی انبار با رکورد ۶ عدد قطعه NVMe-4TB و شناسه INV-2026-981.',
  },
  {
    id: 'service-kb',
    name: 'Knowledge Base API',
    namePersian: 'پایگاه اسناد و دانش فنی',
    category: 'Documentation & Search',
    iconName: 'BookOpen',
    endpoint: '/api/v2/docs/search',
    description: 'مخزن اسناد، دیتاشیت‌ها و کاتالوگ‌های سازمانی با جستجوی معنایی.',
  },
  {
    id: 'service-support',
    name: 'Support Ticket API',
    namePersian: 'سامانه تیکتینگ و پشتیبانی',
    category: 'CRM & Ticketing',
    iconName: 'Headphones',
    endpoint: '/api/v1/tickets',
    description: 'سامانه پیگیری و ثبت درخواست‌های پشتیبانی و سفارش‌های مشتریان.',
  },
];

export const MATRIX_CONNECTIONS: MatrixConnection[] = [
  // IDE Assistant connections
  {
    id: 'conn-ide-wh',
    hostId: 'host-ide',
    serviceId: 'service-warehouse',
    label: 'IDE ──► Warehouse',
    customGlueCodeDescription: 'کانکتور اختصاصی IDE: نگاشت دستی HTTP، توکن انبار و پارسر خطای 404',
    mcpStandardChannel: 'رابطه منطقی کلاینت-سرور با پیام‌های استاندارد JSON-RPC 2.0 از طریق نمونه کلاینت MCP ادیتور به سرور انبار',
  },
  {
    id: 'conn-ide-kb',
    hostId: 'host-ide',
    serviceId: 'service-kb',
    label: 'IDE ──► Knowledge Base',
    customGlueCodeDescription: 'کانکتور اختصاصی IDE: لاجیک تبدیل کوئری جستجو به متد POST پایگاه دانش',
    mcpStandardChannel: 'رابطه منطقی کلاینت-سرور با پیام‌های استاندارد JSON-RPC 2.0 به سرور منابع (Resources) پایگاه دانش',
  },
  {
    id: 'conn-ide-ticket',
    hostId: 'host-ide',
    serviceId: 'service-support',
    label: 'IDE ──► Support Ticket',
    customGlueCodeDescription: 'کانکتور اختصاصی IDE: فرمت‌بندی تیکت خطاهای بیلد با احراز هویت مجزا',
    mcpStandardChannel: 'رابطه منطقی کلاینت-سرور با پیام‌های استاندارد JSON-RPC 2.0 به سرور ابزار تیکتینگ',
  },

  // Desktop Chat connections
  {
    id: 'conn-desktop-wh',
    hostId: 'host-desktop',
    serviceId: 'service-warehouse',
    label: 'Desktop ──► Warehouse',
    customGlueCodeDescription: 'کانکتور مجزای دسکتاپ: بازنویسی درخواست HTTP و درایور اعتبارسنجی انبار',
    mcpStandardChannel: 'اتصال کلاینت عمومی دسکتاپ به سرور انبار بدون ۱ خط کد جدید',
  },
  {
    id: 'conn-desktop-kb',
    hostId: 'host-desktop',
    serviceId: 'service-kb',
    label: 'Desktop ──► Knowledge Base',
    customGlueCodeDescription: 'کانکتور مجزای دسکتاپ: رابط کاربری چت با هندلینگ دستی سشن‌های جستجو',
    mcpStandardChannel: 'استعلام استاندارد متدهای resources/list و resources/read پایگاه اسناد',
  },
  {
    id: 'conn-desktop-ticket',
    hostId: 'host-desktop',
    serviceId: 'service-support',
    label: 'Desktop ──► Support Ticket',
    customGlueCodeDescription: 'کانکتور مجزای دسکتاپ: ماژول اختصاصی ثبت فرم تیکت پشتیبانی در چت',
    mcpStandardChannel: 'اجرای ابزار create_ticket روی سرور استاندارد تیکتینگ',
  },

  // Autonomous Agent connections
  {
    id: 'conn-agent-wh',
    hostId: 'host-agent',
    serviceId: 'service-warehouse',
    label: 'Agent ──► Warehouse',
    customGlueCodeDescription: 'اسکریپت پایتونی ایجنت: کتابخانه requests با مدیریت مجدد کلید و کشینگ انبار',
    mcpStandardChannel: 'اتصال Agent Runtime از طریق کتابخانه استاندارد MCP SDK به سرور انبار',
  },
  {
    id: 'conn-agent-kb',
    hostId: 'host-agent',
    serviceId: 'service-kb',
    label: 'Agent ──► Knowledge Base',
    customGlueCodeDescription: 'اسکریپت پایتونی ایجنت: وب‌هوک اختصاصی برای ایندکس و بررسی تغییرات اسناد',
    mcpStandardChannel: 'مشترک شدن در نوتیفیکیشن‌های تغییر منبع (notifications/resources/updated)',
  },
  {
    id: 'conn-agent-ticket',
    hostId: 'host-agent',
    serviceId: 'service-support',
    label: 'Agent ──► Support Ticket',
    customGlueCodeDescription: 'اسکریپت پایتونی ایجنت: ایجاد خودکار تیکت‌های نگهداری با REST Client سوم',
    mcpStandardChannel: 'فراخوانی متد tools/call روی سرور تیکتینگ با تضمین سازگاری ساختار داده',
  },
];

export const TRIAD_LAYERS: TriadLayerDetail[] = [
  {
    id: 'api-layer',
    titlePersian: 'لایه ۱: وب‌سرویس و قراردادهای داده (API / REST & OpenAPI)',
    titleEnglish: 'Service & Data Contracts (REST / OpenAPI / Databases)',
    badge: 'لایه‌بندی سرویس',
    roleDescription: 'اکسپوز کردن قابلیت‌های تجاری و منابع داده از طریق قراردادهای استاندارد وب و شبکه.',
    keyResponsibilities: [
      'ارائه نقاط انتهایی مشخص بر بستر شبکه (مانند GET /api/v1/inventory/{sku})',
      'توصیف ماشین‌خوان و رسمی ساختار درخواست و پاسخ با مشخصات OpenAPI (OAS v3.1)',
      'اعمال منطق تجاری (Business Logic)، کوئری‌های SQL پایگاه داده و مدیریت دسترسی‌ها',
      'پایداری زیرساختی مستقل از اینکه فراخوانی‌کننده انسان، وب‌سایت یا مدل هوش مصنوعی باشد',
    ],
    scientificDemarcation:
      'REST ارتباط درخواست-پاسخ با وب‌سرویس را بر بستر HTTP فراهم می‌کند و OpenAPI قرارداد این وب‌سرویس را به صورت ماشین‌خوان توصیف می‌نماید. در مقابل، پروتکل MCP لایه تعاملی استانداردی برای برنامه‌ها و کلاینت‌های سازگار هوش مصنوعی فراهم می‌سازد تا قابلیت‌های سرور را کشف کرده و اجرا نمایند؛ بدون آنکه جایگزین HTTP، REST یا OpenAPI شود.',
    codeSnippetTitle: 'نمونه قرارداد OpenAPI و پاسخ HTTP انبار:',
    codeSnippet: `// 1. OpenAPI Specification Contract (Snippet)
paths:
  /api/v1/inventory/{sku}:
    get:
      summary: Retrieve hardware component stock
      parameters:
        - name: sku
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Stock retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InventoryRecord'

// 2. HTTP Request & Response
GET /api/v1/inventory/NVMe-4TB HTTP/1.1
Host: api.warehouse.internal
Authorization: Bearer w_sec_tok_99182

HTTP/1.1 200 OK
Content-Type: application/json

{
  "sku": "NVMe-4TB",
  "in_stock": true,
  "quantity": 6,
  "inventory_id": "INV-2026-981"
}`,
    language: 'json',
  },
  {
    id: 'model-function-calling',
    titlePersian: 'لایه ۲: فراخوانی تابع توسط مدل زبانی (Model Function Calling)',
    titleEnglish: 'Model-Facing Structured Intent (Function / Tool Calling)',
    badge: 'لایه‌بندی استنتاج مدل',
    roleDescription: 'تصمیم‌گیری استنتاجی مدل زبانی برای اعلام قصد استفاده از یک ابزار با پارامترهای مشخص.',
    keyResponsibilities: [
      'دریافت تعاریف ابزار در زمینه پرامپت و تطبیق درخواست طبیعی کاربر با آن‌ها',
      'تولید یک ساختار داده‌ای استاندارد JSON حاوی نام ابزار و ورودی‌های اعتبارسنجی‌شده',
      'توقف تولید متن عادی و ارجاع کنترل اجرا به برنامه میزبان (Host Runtime)',
      'در این معماری، مدل تنها قصد ساختاریافته را تولید کرده و اجرای عملیات شبکه و ابزارها بر عهده برنامه میزبان (Host) است',
    ],
    scientificDemarcation:
      'Function Calling قابلیتی درون مدل زبانی است که قصد ساختاریافته تولید می‌کند؛ این ساختار به خودی خود هرگز یک فریم پیام پروتکل MCP یا درخواست شبکه نیست.',
    codeSnippetTitle: 'نمونه ساختار ابزار در پاسخ مدل (فرمت نمونه OpenAI Chat Completions Tools API - نمایشی و غیرپروتکلی):',
    codeSnippet: `// ساختار نمونه ابزار در پاسخ مدل (خروجی استنتاج مدل زبانی - فرمت نمایشی OpenAI Tools، نه پروتکل MCP)
{
  "id": "call_llm_98124_nvme",
  "type": "function",
  "function": {
    "name": "query_inventory",
    "arguments": "{\\"sku\\": \\"NVMe-4TB\\"}"
  }
}`,
    language: 'json',
  },
  {
    id: 'mcp-protocol',
    titlePersian: 'لایه ۳: پروتکل ارتباطی استاندارد (Model Context Protocol)',
    titleEnglish: 'Inter-Process & Network Communication Protocol (MCP 2026-07-28)',
    badge: 'لایه‌بندی پروتکل باز',
    roleDescription: 'زبان ارتباطی مشترک میان برنامه‌های میزبان (کلاینت‌ها) و سرورهای عرضه‌کننده ابزار و داده.',
    keyResponsibilities: [
      'مذاکره قابلیت‌ها و نسخه پروتکل (متد server/discover که پیاده‌سازی آن برای سرور الزامی است و فراخوانی آن پیش از سایر متدها توسط کلاینت اختیاری است)',
      'اکسپوز کاتالوگ ابزارها (tools/list) و منابع (resources/list)؛ سرور کشف (server/discover) جایگزین کاتالوگ ابزارها و منابع نمی‌شود',
      'فرمول‌بندی پیام‌های استاندارد JSON-RPC 2.0 با فراداده‌های رسمی نام‌فضا دار _meta در نگارش 2026-07-28',
      'ترابری روی STDIO یا Streamable HTTP با هدرهای پروتکل (MCP-Protocol-Version, Mcp-Method, Mcp-Name)',
      'کپسوله‌سازی اتصال و دسترسی، بدون حذف نیاز به احراز هویت و مجوزدهی‌های مهندسی',
    ],
    scientificDemarcation:
      'MCP جایگزین APIها یا Function Calling نیست؛ بلکه زبان استاندارد انتقال تصمیم مدل از هاست به سرورهای مختلف و بازگشت نتایج است.',
    codeSnippetTitle: 'نمونه پیام رسمی tools/call در استاندارد MCP 2026-07-28:',
    codeSnippet: `// JSON-RPC 2.0 Request Frame over STDIO / Streamable HTTP (MCP 2026-07-28)
{
  "jsonrpc": "2.0",
  "id": "req-ch6-inv-001",
  "method": "tools/call",
  "params": {
    "name": "query_inventory",
    "arguments": {
      "sku": "NVMe-4TB"
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {},
      "io.modelcontextprotocol/clientInfo": {
        "name": "ide-code-assistant",
        "version": "1.2.0"
      }
    }
  }
}

// Server Response Frame with Grounded Data (JSON-RPC 2.0)
{
  "jsonrpc": "2.0",
  "id": "req-ch6-inv-001",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "قطعه سخت‌افزاری NVMe-4TB به تعداد ۶ عدد در انبار موجود است (شناسه رکورد: INV-2026-981)."
      }
    ],
    "isError": false,
    "_meta": {
      "io.modelcontextprotocol/serverInfo": {
        "name": "warehouse-mcp-server",
        "version": "2.4.0"
      }
    }
  }
}`,
    language: 'json',
  },
];

export const DECISION_CRITERIA: DecisionCriterion[] = [
  {
    id: 'crit-scope',
    dimension: 'تعداد برنامه‌ها و تنوع مصرف‌کنندگان (Host Variety)',
    directApiRecommendation: 'مناسب برای ۱ برنامه اختصاصی مشخص با دامنه بسته',
    directApiFit: 'high',
    mcpRecommendation: 'ایده‌آل برای استفاده اشتراکی در چند برنامه (IDE، دسکتاپ، ایجنت)',
    mcpFit: 'high',
    explanation:
      'اگر فقط یک چت‌بات یا اسکریپت مشخص می‌سازید، اتصال مستقیم سریع‌تر است؛ اما اگر قابلیت باید در چندین ابزار هوش مصنوعی سازمان بازاستفاده شود، سرور MCP صرفه توسعه دارد.',
  },
  {
    id: 'crit-discovery',
    dimension: 'نیاز به کشف دینامیک ابزارها (Capability Discovery)',
    directApiRecommendation: 'شماها باید دستی در کد کلاینت هاردکد یا با کلاینت OpenAPI ادغام شوند',
    directApiFit: 'low',
    mcpRecommendation: 'کشف خودکار کاتالوگ ابزارها و منابع با متدهای tools/list و server/discover',
    mcpFit: 'high',
    explanation:
      'پروتکل MCP امکان پرس‌وجوی برخط ابزارهای در دسترس سرور را بدون بازنویسی کد هاست فراهم می‌سازد.',
  },
  {
    id: 'crit-latency',
    dimension: 'حساسیت فوق‌العاده به تأخیر (Sub-millisecond Latency)',
    directApiRecommendation: 'حداقل سربار لایه‌ای؛ فراخوانی مستقیم درگاه HTTP یا سوکت محلی',
    directApiFit: 'high',
    mcpRecommendation: 'افزوده شدن لایه سبک سرور MCP و سریال‌سازی JSON-RPC (سربار اندک چند میلی‌ثانیه‌ای)',
    mcpFit: 'medium',
    explanation:
      'در سناریوهای HFT یا بازی‌های لحظه‌ای، هر میکروثانیه اهمیت دارد؛ اما در تعامل با LLMها که زمان پاسخگویی چند ثانیه‌ای دارند، این سربار ناچیز است.',
  },
  {
    id: 'crit-maintenance',
    dimension: 'نگهداری با تغییر نسخه‌های وب‌سرویس (API Evolution)',
    directApiRecommendation: 'تغییر وب‌سرویس مستلزم به‌روزرسانی کد تمامی برنامه‌های کلاینت است',
    directApiFit: 'low',
    mcpRecommendation: 'تغییرات در سرور MCP کپسوله شده و اینترفیس ابزارها برای کلاینت‌ها پایدار می‌ماند',
    mcpFit: 'high',
    explanation:
      'تیم توسعه سرور MCP تغییرات APIهای زیرین را مدیریت می‌کند و کلاینت‌های هوش مصنوعی بدون وقفه به کار ادامه می‌دهند.',
  },
  {
    id: 'crit-multi-server',
    dimension: 'ترکیب‌پذیری چند سرویس خارجی (Multi-Server Composition)',
    directApiRecommendation: 'کد برنامه میزبان باید کدهای اتصال اختصاصی چندین درگاه را ترکیب کند',
    directApiFit: 'low',
    mcpRecommendation: 'هاست کلاینت‌های استاندارد را به چند سرور وصل کرده و ابزارها را یکجا تجمیع می‌کند',
    mcpFit: 'high',
    explanation:
      'معماری چندسروری MCP به کلاینت اجازه می‌دهد به صورت یکدست به سرور انبار، گیت‌هاب و دیتابیس متصل شود.',
  },
];

export const SPEAKER_NOTES = {
  section1:
    'سلام به همگی. وقتی برای اولین بار با Model Context Protocol آشنا می‌شویم، بلافاصله این سوال در ذهن هر مهندس نرم‌افزار شکل می‌گیرد: ما سال‌هاست از REST API، گراف‌کیو‌ال و جی‌آر‌پی‌سی استفاده می‌کنیم؛ کلاینت‌ها با درخواست‌های HTTP به سرورها وصل می‌شوند و داده می‌گیرند. پس چرا شرکت‌های بزرگی مثل آنتروپیک و بنیاد لینوکس پروتکل جدیدی به نام MCP معرفی کرده‌اند؟ آیا قرار است تمام وب‌سرویس‌ها بازنویسی شوند؟ پاسخ کوتاه این است: به هیچ وجه! مقایسه مستقیم MCP با API مثل مقایسه موتور خودرو با آیین‌نامه رانندگی در بزرگراه است. API سرویس را اکسپوز می‌کند، اما MCP پروتکل زبان مشترکی است که به برنامه‌های هوش مصنوعی اجازه می‌دهد بدون نوشتن کدهای تکراری، قابلیت‌های آن سرویس را کشف و اجرا نمایند. در این فصل می‌خواهیم این لایه‌بندی را کالبدشکافی کنیم.',
  section2:
    'بیایید ابتدا تعریف دقیق API را مرور کنیم تا دچار خطای اصطلاحی نشویم. API یعنی قرارداد برنامه‌نویسی نرم‌افزار. هر رابطه‌ای که در آن یک ماژول به ماژول دیگر می‌گوید اگر این تابع را با این ورودی صدا بزنی این خروجی را دریافت می‌کنی، یک API است. REST یکی از مشهورترین سبک‌های معماری در وب است که روی فیلدینگ آن را معرفی کرد و فراتر از صرفاً چند متد HTTP است. این وب‌سرویس‌ها با استانداردهایی مثل OpenAPI کاملاً مستند و ماشین‌خوان هستند. در سناریوی آموزشی ما، انبار یک وب‌سرویس تمیز با آدرس GET /api/v1/inventory/{sku} دارد که اگر شناسه NVMe-4TB را به آن بفرستیم، موجودی ۶ عدد و شناسه INV-2026-981 را بازمی‌گرداند. این سیستم کاملاً بی‌نقص است و سال‌هاست به درستی کار می‌کند. اما وقتی پای مدل‌های زبانی به میان می‌آید، تکثیر کدهای اتصال اختصاصی در برنامه‌های مختلف چه چالش‌هایی ایجاد می‌کند؟',
  section3:
    'تصور کنید در سازمان شما، ۳ ابزار مختلف مبتنی بر هوش مصنوعی فعال هستند: دستیار درون IDE، چت‌بات دسکتاپ، و یک ایجنت مستقل. از طرف دیگر، ۳ سرویس مستقل شامل انبار، پایگاه دانش و سامانه تیکت داریم. در روش سنتی اتصالات سفارشی، برای برقراری ارتباط کامل میان این‌ها، باید ۹ کد چسباننده و آداپتور مجزا توسط تیم‌های مختلف نوشته شود؛ هر تیم دوباره هدرهای HTTP، مدیریت کلیدها و پارس کردن خطاها را پیاده می‌کند. این مسئله مشهور M در N است. دقت کنید که در زمان اجرا، همچنان ۹ رابطه ارتباطی میان برنامه‌ها و سرویس‌ها برقرار است؛ اما با معماری استاندارد MCP، به جای ۹ پیاده‌سازی پراکنده و شکننده، ۳ پیاده‌سازی کلاینت استاندارد و ۳ سرور مستقل داریم که همگی زبان مشترکی دارند. این یک مدل مفهومی برای درک صرفه‌جویی در توسعه و نگهداری است.',
  section4:
    'به این اسلاید بسیار دقیق نگاه کنید؛ این مهم‌ترین قاب کل فصل است. در سمت راست معماری اتصال مستقیم سنتی را می‌بینید: مدل زبانی فراخوانی تابع را پیشنهاد می‌دهد، اما برنامه میزبان باید با یک آداپتور اختصاصی درخواست HTTP به انبار بفرستد. در سمت چپ، معماری مبتنی بر MCP را می‌بینید. به دو مولفه پایینی دقت کنید: پایگاه داده انبار و حتی خودِ Inventory REST API کاملاً دست‌نخورده باقی مانده‌اند! ما وب‌سرویس انبار را حذف نکرده‌ایم. اتفاقی که افتاده این است که یک لایه سرور سبک MCP جلوی آن قرار گرفته است. این سرور، خروجی‌های REST API را می‌خواند و آن‌ها را در قالب متدهای استاندارد MCP اکسپوز می‌کند. هاست هم از کلاینت استاندارد خود استفاده می‌کند. البته توجه داشته باشید که MCP وظایف امنیتی مثل احراز هویت و مجوزها را محو نمی‌کند، بلکه آن‌ها را در لایه‌ای مشخص و متمرکز قرار می‌دهد.',
  section5:
    'اشتباه بسیار متداول دیگری که مهندسان مرتکب می‌شوند، خلط میان Function Calling و MCP است. برخی می‌گویند مدل من Function Calling دارد، پس به MCP احتیاجی ندارم! این حرف مثل این است که بگویید من مرورگر وب دارم، پس به کابل شبکه احتیاجی ندارم! این‌ها دو لایه کاملاً مجزا هستند. Function Calling قابلیتی درون مدل است که بر اساس پرامپت، یک شیء جیسون تولید می‌کند و می‌گوید من می‌خواهم تابع query_inventory را صدا بزنم. در این معماری، مدل درخواست ساختاریافته را تولید می‌کند و هاست مسئول اعتبارسنجی و اجرای عملیات شبکه‌ای است. در معماری استاندارد، کلاینت MCP با متد الزامی server/discover سرور را ارزیابی کرده و درخواست tools/call را ارسال می‌کند؛ و سرور هم آن را به وب‌سرویس انبار می‌فرستد. ضمناً متوجه باشیم که کشف خودکار در MCP جایگزین مستندسازی مهندسی، طراحی دقیق شماها یا سیاست‌های امنیتی نمی‌شود؛ بلکه زبانی مشترک برای اعلام این قابلیت‌هاست.',
  section6:
    'در مهندسی نرم‌افزار، هیچ ابزاری چکش طلایی برای حل همه مشکلات نیست. اگر شما در حال ساخت یک اسکریپت ساده پایتون برای خودتان هستید که فقط قرار است از یک API آب‌وهوا استفاده کند، ساختن سرور MCP شاید سربار بی‌مورد باشد؛ اتصال مستقیم بنویسید و کار را تمام کنید! اما اگر در یک سازمان هستید که می‌خواهید دسترسی به پایگاه داده مشتریان یا انبار را برای انواع دستیارهای توسعه‌دهندگان، تحلیل‌گران و ایجنت‌های مستقل باز کنید، ساخت یک سرور MCP باعث می‌شود یک بار برای همیشه این اتصال را بسازید و هر کلاینت سازگاری بتواند بی‌درنگ از آن بهره‌مند شود. جمع‌بندی طلایی ما این است: API سرویس را عرضه می‌کند، و MCP اتصال هوش مصنوعی به آن را استاندارد می‌سازد. در فصل هفتم، سه قابلیت بنیادین این سرورها یعنی منابع، پرامپت‌ها و ابزارها را با هم بررسی خواهیم کرد.',
};
