import {
  LifecycleStepInfo,
  ScenarioDefinition,
  ScenarioId,
} from './types';

export const MOCK_DISCLOSURE_TEXT =
  'داده‌های این شبیه‌سازی ساختگی هستند و صرفاً برای نمایش جریان ارتباطی MCP استفاده می‌شوند.';

export const CONSTANTS = {
  SKU: 'NVMe-4TB',
  REQUEST_ID: 'req-042',
  INVENTORY_ID: 'INV-2026-981',
  TOOL_NAME: 'query_inventory',
  PROTOCOL_VERSION: '2026-07-28',
  CLIENT_NAME: 'my-ide-host',
  CLIENT_VERSION: '2.1.0',
};

export const LIFECYCLE_STEPS: LifecycleStepInfo[] = [
  {
    stepNumber: 1,
    titlePersian: 'گام ۱: طرح پرسش کاربر',
    titleEnglish: 'Step 1: User Request',
    descriptionPersian:
      'کاربر در رابط کاربری برنامه میزبان (Host) پرسش خود را به زبان طبیعی ثبت می‌کند: «آیا کالای NVMe-4TB در انبار موجود است؟»',
    activeSender: 'user',
    activeReceiver: 'host',
    pathDescription: 'ورود متن طبیعی از کاربر به هسته برنامه میزبان',
    activeLayer: 'user',
    suggestedDebuggerTab: 'model-tool-call',
  },
  {
    stepNumber: 2,
    titlePersian: 'گام ۲: آماده‌سازی تعامل و کانتکست در هاست',
    titleEnglish: 'Step 2: Host Prepares Model Interaction',
    descriptionPersian:
      'برنامه میزبان، مشخصات ابزارهای از پیش کشف‌شده (توسط tools/list در فاز اتصال اولیه) را در چارچوب رابط فراخوانی ابزار مدل، در دسترس LLM قرار می‌دهد.',
    activeSender: 'host',
    activeReceiver: 'llm',
    pathDescription: 'ارسال پرامپت و مشخصات کاتالوگ ابزارها از هاست به مدل زبانی',
    activeLayer: 'host-model',
    suggestedDebuggerTab: 'model-tool-call',
  },
  {
    stepNumber: 3,
    titlePersian: 'گام ۳: تصمیم مدل برای فراخوانی ابزار',
    titleEnglish: 'Step 3: Model Decides to Use a Tool',
    descriptionPersian:
      'مدل تشخیص می‌دهد که پاسخ در حافظه آماری‌اش نیست؛ لذا تصمیم می‌گیرد ابزار query_inventory را فرابخواند و خروجی ساختاریافته (غیر پروتکلی) تولید می‌کند.',
    activeSender: 'llm',
    activeReceiver: 'host',
    pathDescription: 'بازگشت خروجی ساختاریافته ابزار از مدل به برنامه میزبان (خارج از فریم MCP)',
    activeLayer: 'host-model',
    suggestedDebuggerTab: 'model-tool-call',
  },
  {
    stepNumber: 4,
    titlePersian: 'گام ۴: هماهنگی، اعتبارسنجی و اعمال سیاست در هاست',
    titleEnglish: 'Step 4: Host Coordination & Policy Gate',
    descriptionPersian:
      'هاست خروجی مدل را اعتبارسنجی کرده، سیاست‌های امنیتی و تایید کاربر را بررسی می‌کند و سپس فرمان اجرا را به آداپتور داخلی کلاینت MCP واگذار می‌نماید.',
    activeSender: 'host',
    activeReceiver: 'mcp-client',
    pathDescription: 'هدایت عملیات در لایه امنیتی هاست و فراخوانی آداپتور کلاینت MCP',
    activeLayer: 'host-model',
    suggestedDebuggerTab: 'mcp-request',
  },
  {
    stepNumber: 5,
    titlePersian: 'گام ۵: ارسال پیام استاندارد tools/call توسط کلاینت MCP',
    titleEnglish: 'Step 5: MCP Client Sends tools/call',
    descriptionPersian:
      'کلاینت MCP هاست یک پیام رسمی JSON-RPC 2.0 با شناسه req-042 و فراداده الزامی _meta (نسخه 2026-07-28) ساخته و به سرور انبار ارسال می‌کند.',
    activeSender: 'mcp-client',
    activeReceiver: 'mcp-server',
    pathDescription: 'ارسال فریم رسمی JSON-RPC 2.0 از کلاینت به سرور انبار روی ترابری فعال',
    activeLayer: 'mcp-protocol',
    suggestedDebuggerTab: 'mcp-request',
  },
  {
    stepNumber: 6,
    titlePersian: 'گام ۶: پردازش در سرور MCP و استعلام دیتابیس خارجی',
    titleEnglish: 'Step 6: MCP Server Executes Internal Implementation',
    descriptionPersian:
      'سرور MCP فراداده و پارامترها را اعتبارسنجی کرده و کد داخلی ابزار را اجرا می‌کند (استعلام پایگاه‌داده انبار با کوئری نمونه داخلی).',
    activeSender: 'mcp-server',
    activeReceiver: 'external-db',
    pathDescription: 'فراخوانی درایور پایگاه داده توسط لاجیک داخلی ابزار سرور (کاملاً مستقل از پروتکل)',
    activeLayer: 'server-internal',
    suggestedDebuggerTab: 'server-sql',
  },
  {
    stepNumber: 7,
    titlePersian: 'گام ۷: بازگشت نتیجه ابزار، بسته‌بندی پروتکل و ادغام در مدل',
    titleEnglish: 'Step 7: Tool Result Returns to Host and Model',
    descriptionPersian:
      'داده بازگشتی به عنوان شیء استاندارد result با مشخصه resultType: complete بسته‌بندی شده و توسط هاست در حافظه کانتکست مدل زبانی تزریق می‌شود.',
    activeSender: 'mcp-server',
    activeReceiver: 'llm',
    pathDescription: 'مسیر برگشت: پایگاه داده → سرور MCP → کلاینت هاست → حافظه کانتکست مدل زبانی',
    activeLayer: 'return-path',
    suggestedDebuggerTab: 'mcp-result',
  },
  {
    stepNumber: 8,
    titlePersian: 'گام ۸: تولید پاسخ طبیعی مدل و ارائه نهایی به کاربر',
    titleEnglish: 'Step 8: Final Model Answer & User Presentation',
    descriptionPersian:
      'مدل زبانی داده‌های دقیق ابزار را مطالعه کرده و پاسخی طبیعی، مستند و بدون توهم تولید می‌کند که توسط هاست به کاربر تحویل داده می‌شود.',
    activeSender: 'llm',
    activeReceiver: 'user',
    pathDescription: 'تحویل پاسخ نهایی مدل از طریق برنامه میزبان به کاربر',
    activeLayer: 'user',
    suggestedDebuggerTab: 'final-response',
  },
];

export const SCENARIOS: Record<ScenarioId, ScenarioDefinition> = {
  'scenario-a': {
    id: 'scenario-a',
    namePersian: 'سناریوی الف: پاسخ موفق با موجودی کالا',
    nameEnglish: 'Scenario A: Success with Inventory',
    shortTag: 'موجود (۶ عدد)',
    badgeVariant: 'cyan',
    summaryPersian:
      'ابزار با موفقیت کامل اجرا شده و قطعه سخت‌افزاری NVMe-4TB به تعداد ۶ عدد در انبار موجود است.',
    stockStatusText: 'موجودی: ۶ عدد در انبار',
    inventoryReference: CONSTANTS.INVENTORY_ID,
    userQuery: 'آیا کالای NVMe-4TB در انبار موجود است؟',
    modelToolCallPayload: {
      tool_call: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
      },
    },
    mcpRequestPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      method: 'tools/call',
      params: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
        _meta: {
          'io.modelcontextprotocol/protocolVersion': CONSTANTS.PROTOCOL_VERSION,
          'io.modelcontextprotocol/clientCapabilities': {},
          'io.modelcontextprotocol/clientInfo': {
            name: CONSTANTS.CLIENT_NAME,
            version: CONSTANTS.CLIENT_VERSION,
          },
        },
      },
    },
    serverSql: `-- اجرای داخلی سرور — پیاده‌سازی نمونه ابزار (Server Internal Execution — Illustrative Implementation)
SELECT sku, in_stock, quantity, inventory_id
FROM warehouse_inventory
WHERE sku = 'NVMe-4TB'
LIMIT 1;`,
    mcpResultPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      result: {
        resultType: 'complete',
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              sku: CONSTANTS.SKU,
              in_stock: true,
              quantity: 6,
              inventory_id: CONSTANTS.INVENTORY_ID,
            }),
          },
        ],
      },
    },
    finalModelResponse:
      'بله، کالای NVMe-4TB موجود است. در داده‌های شبیه‌سازی‌شده، تعداد موجودی ۶ عدد ثبت شده است.',
  },

  'scenario-b': {
    id: 'scenario-b',
    namePersian: 'سناریوی ب: پاسخ موفق با عدم موجودی کالا',
    nameEnglish: 'Scenario B: Success with Zero Inventory',
    shortTag: 'عدم موجودی (۰ عدد)',
    badgeVariant: 'indigo',
    summaryPersian:
      'کوئری ابزار با سلامت ۱۰۰٪ اجرا شده و نتیجه داده‌ای حاکی از موجودی ۰ است؛ این وضعیت یک پاسخ معتبر تجاری است و خطا محسوب نمی‌شود (isError فعال نمی‌گردد).',
    stockStatusText: 'موجودی: ۰ عدد (ناموجود)',
    userQuery: 'آیا کالای NVMe-4TB در انبار موجود است؟',
    modelToolCallPayload: {
      tool_call: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
      },
    },
    mcpRequestPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      method: 'tools/call',
      params: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
        _meta: {
          'io.modelcontextprotocol/protocolVersion': CONSTANTS.PROTOCOL_VERSION,
          'io.modelcontextprotocol/clientCapabilities': {},
          'io.modelcontextprotocol/clientInfo': {
            name: CONSTANTS.CLIENT_NAME,
            version: CONSTANTS.CLIENT_VERSION,
          },
        },
      },
    },
    serverSql: `-- اجرای داخلی سرور — پیاده‌سازی نمونه ابزار (Server Internal Execution — Illustrative Implementation)
SELECT sku, in_stock, quantity, inventory_id
FROM warehouse_inventory
WHERE sku = 'NVMe-4TB'
LIMIT 1;`,
    mcpResultPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      result: {
        resultType: 'complete',
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              sku: CONSTANTS.SKU,
              in_stock: false,
              quantity: 0,
            }),
          },
        ],
      },
    },
    finalModelResponse:
      'خیر، در داده‌های فعلی شبیه‌سازی‌شده، کالای NVMe-4TB موجود نیست.',
  },

  'scenario-c': {
    id: 'scenario-c',
    namePersian: 'سناریوی ج: شکست در اجرای منطق ابزار',
    nameEnglish: 'Scenario C: Tool Execution Failure',
    shortTag: 'خطای اجرای ابزار',
    badgeVariant: 'outline',
    summaryPersian:
      'فریم پروتکل MCP سالم است، اما ارتباط سرور با دیتابیس دچار قطعی یا Timeout شده است؛ لذا سرور طبق توصیه استاندارد (SHOULD) پاسخ را با isError: true صادر می‌کند.',
    stockStatusText: 'خطای سیستم انبار: قطعی سرویس',
    userQuery: 'آیا کالای NVMe-4TB در انبار موجود است؟',
    modelToolCallPayload: {
      tool_call: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
      },
    },
    mcpRequestPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      method: 'tools/call',
      params: {
        name: CONSTANTS.TOOL_NAME,
        arguments: {
          sku: CONSTANTS.SKU,
        },
        _meta: {
          'io.modelcontextprotocol/protocolVersion': CONSTANTS.PROTOCOL_VERSION,
          'io.modelcontextprotocol/clientCapabilities': {},
          'io.modelcontextprotocol/clientInfo': {
            name: CONSTANTS.CLIENT_NAME,
            version: CONSTANTS.CLIENT_VERSION,
          },
        },
      },
    },
    serverSql: `-- تلاش برای اتصال به دیتابیس انبار...
-- خطای زمان انقضا (Connection Timeout after 3000ms)
-- لاجیک داخلی ابزار شکست خورد و پیام خطا تولید شد`,
    mcpResultPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      result: {
        resultType: 'complete',
        isError: true,
        content: [
          {
            type: 'text',
            text: 'Inventory service is temporarily unavailable.',
          },
        ],
      },
    },
    finalModelResponse:
      'متأسفانه در حال حاضر امکان استعلام موجودی کالای NVMe-4TB وجود ندارد؛ زیرا سامانه انبار در بازه زمانی مقرر پاسخ نداد.',
  },

  'scenario-d': {
    id: 'scenario-d',
    namePersian: 'سناریوی د: خطای متد ناشناخته پروتکل (JSON-RPC)',
    nameEnglish: 'Scenario D: Protocol Error (Method not found)',
    shortTag: 'خطای پروتکل (-32601)',
    badgeVariant: 'slate',
    summaryPersian:
      'کلاینت متد ناشناخته یا پشتیبانی‌نشده‌ای را فراخوانی کرده است؛ سرور به جای شیء result، شیء استاندارد error در JSON-RPC 2.0 را با کد اختصاصی -32601 بازمی‌گرداند.',
    stockStatusText: 'خطای JSON-RPC: متد یافت نشد',
    userQuery: 'آیا کالای NVMe-4TB در انبار موجود است؟',
    modelToolCallPayload: {
      tool_call: {
        name: 'query_inventory',
        arguments: {
          sku: CONSTANTS.SKU,
        },
      },
    },
    mcpRequestPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      method: 'tools/call',
      params: {
        name: 'query_inventory_unknown',
        arguments: {
          sku: CONSTANTS.SKU,
        },
        _meta: {
          'io.modelcontextprotocol/protocolVersion': CONSTANTS.PROTOCOL_VERSION,
          'io.modelcontextprotocol/clientCapabilities': {},
          'io.modelcontextprotocol/clientInfo': {
            name: CONSTANTS.CLIENT_NAME,
            version: CONSTANTS.CLIENT_VERSION,
          },
        },
      },
    },
    serverSql: `-- عدم اجرای کوئری؛ زیرا متد در لایه پروتکل ناشناخته بود
-- سرور پیش از فراخوانی درایور داخلی دیتابیس، خطای -32601 را صادر کرد`,
    mcpResultPayload: {
      jsonrpc: '2.0',
      id: CONSTANTS.REQUEST_ID,
      error: {
        code: -32601,
        message: 'Method not found',
      },
    },
    finalModelResponse:
      'خطای ارتباطی پروتکل: متد درخواستی در سرور MCP انبار تعریف نشده است (کد خطای JSON-RPC: -32601 Method not found).',
  },
};
