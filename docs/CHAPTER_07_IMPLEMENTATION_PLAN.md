# برنامه جامع پیاده‌سازی فنی فصل هفتم (CHAPTER 07 IMPLEMENTATION PLAN)
## «MCP در دنیای واقعی: کاربردها، امنیت، محدودیت‌ها و آینده»
### (MCP in the Real World: Use Cases, Security, Limitations, and the Future: Technical Implementation Roadmap)

---

## ۱. یافته‌های معماری سیستم و پیش‌نیازهای پروژه (System Architecture Findings)

فصل هفتم ارائه تعاملی دانشگاهی MCP، فصل جمع‌بندی نهایی، ممیزی امنیتی و انتقال از مفاهیم تئوریک به دنیای واقعی مهندسی نرم‌افزار است. تحلیل معماری پروژه و بررسی پیاده‌سازی موفق فصول ۱ تا ۶ اصول بنیادین زیر را مشخص می‌سازد:

1. **انطباق سناریوی داده‌ای پایدار انبار و زنجیره تأمین:** ادامه بدون تناقض سناریوی باسابقه ارائه با داده‌های تثبیت‌شده و حذف کامل فیلدهای تأییدنشده:
   - قطعه سخت‌افزاری (Product SKU): <span className="font-mono text-cyan-300" dir="ltr">NVMe-4TB</span>
   - موجودی انبار (Quantity): <span className="font-mono text-emerald-300" dir="ltr">6 عدد</span>
   - شناسه رکورد انبار (Inventory ID): <span className="font-mono text-cyan-300" dir="ltr">INV-2026-981</span>
   - ابزار استعلام انبار: `query_inventory`
   - ساختار استعلام مینیمال انبار:
     ```json
     {
       "sku": "NVMe-4TB",
       "quantity": 6,
       "inventory_id": "INV-2026-981"
     }
     ```
   - درخواست صریح اقدام توسط کاربر انسانی (بدون استنتاج خودسرانه کسری): «با توجه به برنامه ارتقای دیتاسنتر، لطفاً یک درخواست تأمین برای ۱۰ ماژول جدید ثبت کن.»
   - ابزار دوم در سناریوی چندابزاری: `create_procurement_ticket` (ثبت درخواست تأمین کالا در سامانه تدارکات).
   - پاسخ تیکت نمونه (برچسب‌گذاری صریح به عنوان Educational Mock Data):
     ```json
     {
       "ticket_id": "PROC-2026-7741",
       "item": "NVMe-4TB",
       "requested_qty": 10,
       "status": "AWAITING_APPROVAL",
       "priority": "NORMAL"
     }
     ```
2. **پشتیبانی کامل از دو حالت ارائه (Dual-Mode Rendering):**
   - **حالت اسلاید (Presentation Mode):** ۶ اسلاید تمام‌صفحه متوالی همگام با زمان‌بندی ۴ دقیقه‌ای (۲۴۰ ثانیه) با ترنزیشن‌های انیمیشنی بهینه‌شده (`AnimatePresence mode="wait"`).
   - **حالت اسکرول پیوسته (Scroll Mode):** چیدمان روایی عمودی با فاصله‌گذاری استاندارد (`space-y-24`) و دسترسی بی‌درنگ به ابزارهای تعاملی.
3. **پرهیز از وابستگی‌های جدید (Zero New Dependencies):** تمامی کامپوننت‌ها بدون نصب حتی یک پکیج جدید، صرفاً با تکیه بر استک تثبیت‌شده فعلی (`next@16.4.6`, `react@19.3.0`, `tailwindcss@4.3.3`, `motion@14.13.0`, `lucide-react`) پیاده‌سازی خواهند شد.
4. **رعایت کامل تایپوگرافی فارسی RTL و ایزولاسیون LTR:** استفاده مداوم از ویژگی `dir="ltr"` برای اصطلاحات پروتکل، توکن‌ها، هدرها، کدهای JSON و شناسه‌های URI.

---

## ۲. ساختار فایل‌ها و سلسله‌مراتب کامپوننت‌ها (Component Hierarchy)

تمامی کدهای کامپوننت فصل هفتم در دایرکتوری اختصاصی `src/components/chapters/chapter07/` و کامپوننت ارکستراتور والد `src/components/chapters/Chapter07.tsx` سازمان‌دهی خواهند شد:

```
src/components/chapters/
├── Chapter07.tsx                                     # ارکستراتور والد فصل ۷ (Slides & Scroll Controller)
└── chapter07/
    ├── types.ts                                      # تایپ‌های سناریوها، سطوح ریسک، مرزهای اعتماد و تصمیم‌گیری
    ├── mockData.ts                                   # منبع یگانه حقیقت (داده‌های انبار، موارد کاربری، سوالات امنیتی و یادداشت‌ها)
    ├── RealWorldUseCasesSection.tsx                  # بخش ۰۷.۱: کاربردهای ملموس در دنیای واقعی (IDE, Enterprise Knowledge, SaaS)
    ├── MultiToolWorkflowSection.tsx                  # بخش ۰۷.۲: سناریوی تکمیلی انبار و اتوماسیون چندابزاری
    ├── SecurityTrustSection.tsx                      # بخش ۰۷.۳: معماری امنیت، حدود اعتماد و مهار تزریق پرامپت
    ├── HumanInTheLoopSection.tsx                     # بخش ۰۷.۴: مدیریت اختیارات، نظارت انسانی و عملیات حساس
    ├── LimitationsTradeoffsSection.tsx               # بخش ۰۷.۵: محدودیت‌های واقعی، هزینه‌ها و نقاط نامناسب برای MCP
    ├── FutureSynthesisSection.tsx                    # بخش ۰۷.۶: افق آینده، استانداردسازی باز و جمع‌بندی نهایی ارائه
    ├── WorkflowTrustExplorer.tsx                     # ویجت تعاملی ۱: کاوشگر جریان کار و مرزهای اعتماد (Interaction A)
    ├── SecurityPolicySimulator.tsx                   # ویجت تعاملی ۲: شبیه‌ساز سیاست امنیتی و تایید انسانی (Interaction B)
    └── GrandSynthesisBoard.tsx                       # ویجت تعاملی ۳: تابلوی جمع‌بندی کل ارائه و ماتریس تصمیم‌گیری (Interaction C)
```

---

## ۳. مشخصات تفصیلی کامپوننت‌ها و اینترفیس‌ها (Component Specifications)

### ۳.۱. کامپوننت ارکستراتور والد: `Chapter07.tsx`
* **مسیر:** `src/components/chapters/Chapter07.tsx`
* **پراپ‌ها:**
  ```typescript
  interface Chapter07Props {
    mode?: 'scroll' | 'slides';
    activeSlideIndex?: number;
    onSelectChapter?: (chapterId: number) => void;
  }
  ```
* **مسئولیت‌ها:**
  - کنترل نمایش تک‌اسلاید بر مبنای `activeSlideIndex` (از 0 تا 5) در حالت اسلاید شو.
  - رندر متوالی هر ۶ بخش در حالت اسکرول بدون شکست چیدمان یا سرریز افقی.
  - مدیریت تعامل پایانی (دکمه بازگشت به آغاز پرزنتیشن یا پنل پرسش و پاسخ).

---

### ۳.۲. بخش ۰۷.۱: `RealWorldUseCasesSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/RealWorldUseCasesSection.tsx`
* **مدت زمان:** ۴۰ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۱ • کاربست‌های عملیاتی`.
  - تیتر: «MCP در دنیای واقعی: از محیط‌های توسعه تا پایگاه‌های دانش سازمانی».
  - سه کارت ملموس کاربردی:
    1. دستیارهای مهندسی نرم‌افزار در IDE (اتصال محلی به Git با STDIO، اتصال به مخزن با HTTP).
    2. پایگاه‌های دانش و منابع اسناد سازمانی (ارائه انتخابی منابع مجاز؛ دامنه دسترسی واقعی وابسته به کنترل دسترسی سرور، مجوزهای سیستم و سیاست‌های هاست است و محلی بودن مدل زبانی به‌تنهایی عدم خروج داده را تضمین نمی‌کند).
    3. یکپارچه‌سازی ابزارهای اتوماسیون اداری و SaaS.
  - تعبیه کامپوننت تعاملی `WorkflowTrustExplorer`.
  - یادداشت‌های تاشوی سخنران بخش ۰۷.۱.

---

### ۳.۳. بخش ۰۷.۲: `MultiToolWorkflowSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/MultiToolWorkflowSection.tsx`
* **مدت زمان:** ۳۵ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۲ • اتوماسیون چندابزاری`.
  - تیتر: «سناریوی تکمیلی انبار: هماهنگی میان چند سرور مستقل».
  - نمایش جریان پیوسته استعلام قطعه `NVMe-4TB` (موجودی ۶ عدد و رکورد `INV-2026-981`) و درخواست صریح کاربر انسانی («با توجه به برنامه ارتقای دیتاسنتر، لطفاً یک درخواست تأمین برای ۱۰ ماژول جدید ثبت کن.») برای ثبت تیکت پیگیری در سامانه تدارکات (`create_procurement_ticket`) با پاسخ نمایشی `PROC-2026-7741`.
  - کارت استقلال سرورها: عدم اشتراک مستقیم کانتکست میان دو سرور و نظارت مرکزی برنامه میزبان (Host).
  - یادداشت‌های تاشوی سخنران بخش ۰۷.۲.

---

### ۳.۴. بخش ۰۷.۳: `SecurityTrustSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/SecurityTrustSection.tsx`
* **مدت زمان:** ۴۵ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۳ • معماری امنیت و اعتماد`.
  - تیتر: «مرزهای اعتماد، احراز هویت شبکه و خطر تزریق غیرمستقیم پرامپت».
  - سه جعبه تحلیل ریسک:
    1. **سرورهای محلی STDIO:** پردازه‌های بدون سندباکس درونی و خطرات اجرای کد در چارچوب اختیارات حساب کاربری سیستم‌عامل.
    2. **سرورهای راه دور و الزامات OAuth 2.1:** جلوگیری از آسیب‌پذیری Confused Deputy و ممنوعیت فوروارد خام توکن‌ها (No Raw Token Passthrough).
    3. **تزریق غیرمستقیم پرامپت (Indirect Prompt Injection):** آلودگی داده‌های بازگشتی از ابزارها و لزوم رفتار با خروجی ابزار به عنوان ورودی غیرقابل‌اعتماد.
  - یادداشت‌های تاشوی سخنران بخش ۰۷.۳.

---

### ۳.۵. بخش ۰۷.۴: `HumanInTheLoopSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/HumanInTheLoopSection.tsx`
* **مدت زمان:** ۴۰ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۴ • مدیریت اختیارات و کنترل انسانی`.
  - تیتر: «اصل حداقل اختیارات (Least Privilege) و دروازه نظارت انسانی (HITL)».
  - تشریح ۴ طبقه عملیاتی بر مبنای سطح ریسک در برنامه میزبان (Read, Reversible Write, Destructive Write, Financial/Admin).
  - تعبیه کامپوننت تعاملی `SecurityPolicySimulator` (با خروجی `Deny` برای عملیات تخریبی `drop_table`).
  - تصریح علمی بر اینکه تایید انسانی سیاست هاست است، نه الزام جهانی پروتکل.
  - یادداشت‌های تاشوی سخنران بخش ۰۷.۴.

---

### ۳.۶. بخش ۰۷.۵: `LimitationsTradeoffsSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/LimitationsTradeoffsSection.tsx`
* **مدت زمان:** ۴۰ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۵ • محدودیت‌ها و پادالگوها`.
  - تیتر: «آنچه MCP حل نمی‌کند: هزینه‌های مهندسی و پادالگوها».
  - کارت ۴گانه واقعیت مهندسی (عدم حل توهم مدل، عدم رفع قطعی وب‌سرویس زیرین، عدم جایگزینی طراحی شما، سربار لایه‌ای).
  - تحلیل کیفی تأخیر (بدون انتساب اعداد ثابت) و جدول پادالگوها (Anti-Patterns): چه زمانی از MCP استفاده نکنیم؟ (اسکریپت‌های تک‌منظوره ساده، سیستم‌های فوق‌سریع کمتر از میلی‌ثانیه).
  - یادداشت‌های تاشوی سخنران بخش ۰۷.۵.

---

### ۳.۷. بخش ۰۷.۶: `FutureSynthesisSection.tsx`
* **مسیر:** `src/components/chapters/chapter07/FutureSynthesisSection.tsx`
* **مدت زمان:** ۴۰ ثانیه
* **المان‌های محتوایی:**
  - نشان بالای اسلاید: `بخش ۷.۶ • افق آینده و جمع‌بندی نهایی`.
  - تیتر: «نقشه راه مصوب اوت ۲۰۲۶، حاکمیت بنیاد لینوکس و جمع‌بندی جامع ارائه».
  - تبیین پنج اولویت رسمی نقشه راه (پیام‌رسانی عامل‌محور، ترابری بومی HTTP، هویت عامل‌ها و امنیت سازمانی، بهبود مفاهیم بنیادین، و ارتقای SDKها) به عنوان بیانیه‌ای از اولویت‌های جاری و جهت‌گیری کلی پروژه (نه تعهد زمانی صلب یا ضمانت انتشار قطعی).
  - شفاف‌سازی نقش بنیاد لینوکس (AAIF) به عنوان چتر حقوقی و هدایت فنی توسط نگه‌دارندگان.
  - تعبیه کامپوننت تعاملی `GrandSynthesisBoard`.
  - پیام طلایی و سخن پایانی سخنران همراه با دعوت به پرسش و پاسخ.

---

## ۴. مشخصات ویجت‌های تعاملی سه‌گانه و مدیریت زمان‌بندی

برای هماهنگی دقیق با بودجه ۴ دقیقه‌ای فصل هفتم، سه مؤلفه تعاملی تفکیک وظیفه شده‌اند:

### ۴.۱. ویجت تعاملی ۱: `WorkflowTrustExplorer.tsx` (کاوشگر بصری هدایت‌شده)
* **مسیر:** `src/components/chapters/chapter07/WorkflowTrustExplorer.tsx`
* **هدف:** بررسی بصری جریان کار بدون درگیر کردن کاربر با کلیک‌های پیچیده در ۴۰ ثانیه بخش ۰۷.۱.
* **قابلیت‌ها:**
  - انتخاب میان ۳ سناریو: «دستیار IDE»، «دانش سازمانی»، «انبار و تدارکات».
  - کلید تعاملی روشن/خاموش کردن لایه امنیتی (Show/Hide Trust Boundaries).
  - در حالت روشن، مرزهای قرمز رنگ داده غیرقابل‌اعتماد، مرز زرد رنگ پردازه فاقد سندباکس STDIO، و مرز سبز رنگ احراز هویت OAuth نمایش داده می‌شوند.

### ۴.۲. ویجت تعاملی ۲: `SecurityPolicySimulator.tsx` (تعامل زنده اصلی پرزنتیشن)
* **مسیر:** `src/components/chapters/chapter07/SecurityPolicySimulator.tsx`
* **هدف:** ایجاد تجربه تعاملی سریع و جذاب برای شرکت‌کنندگان پیرامون تصمیم‌گیری امنیتی در بخش ۰۷.۴.
* **قابلیت‌ها:**
  - نمایش ۴ عملیات ابزاری واقعی با گزینه‌های تصمیم‌گیری:
    1. `query_inventory (NVMe-4TB)` ← پاسخ بهینه: اجرای خودکار (`auto-allow`).
    2. `search_internal_docs` ← پاسخ بهینه: اعتبارسنجی و پالایش (`validate-filter`).
    3. `add_procurement_label` ← پاسخ بهینه: اجرای کنترل‌شده با ثبت لاگ (`allow-with-audit`).
    4. `drop_production_table` ← پاسخ بهینه: **مسدودسازی کامل در خط‌مشی پیش‌فرض (`deny`)**.
  - ارائه بازخورد فوری علمی با رنگ‌های سبز (تصمیم بهینه) یا قرمز/زرد (ریسک بالقوه) همراه با استناد به اصول OWASP Top 10 for LLM Applications 2025 (رده‌های LLM01:2025، LLM05:2025 و LLM06:2025) و مشخصات MCP.

### ۴.۳. ویجت تعاملی ۳: `GrandSynthesisBoard.tsx` (محتوای جمع‌بندی ایستا و پرسش و پاسخ)
* **مسیر:** `src/components/chapters/chapter07/GrandSynthesisBoard.tsx`
* **هدف:** تثبیت نهایی مفاهیم هفت فصل و آماده‌سازی برای بخش پرسش و پاسخ دانشگاهی (بدون ایجاد بار زمانی اضافی).
* **قابلیت‌ها:**
  - جدول ماتریس جمع‌بندی سه‌گانه (چه زمانی مستقیم؟ چه زمانی MCP؟).
  - نمایش ۳ اصل زرین کل ارائه هفت‌فصلی با نشان‌های شاخص بصری.
  - کارت‌های تعاملی پرسش و پاسخ (Q&A Prompts) برای جلب مشارکت حضار.

---

## ۵. تعاریف داده‌ای و مدل‌های TypeScript (`types.ts`)

```typescript
export type TrustBoundaryType = 'untrusted-data' | 'unsandboxed-process' | 'network-oauth';

export interface UseCaseScenario {
  id: string;
  titlePersian: string;
  titleEnglish: string;
  category: 'developer' | 'enterprise' | 'automation';
  hostName: string;
  mcpClientRole: string;
  mcpServerName: string;
  transportType: 'STDIO' | 'Streamable HTTP';
  underlyingService: string;
  description: string;
  securityRiskNote: string;
}

export type RiskTier = 'read-only' | 'reversible-mutation' | 'destructive' | 'financial-admin';
export type SecurityAction = 'auto-allow' | 'validate-filter' | 'allow-with-audit' | 'deny';

export interface SecurityChallenge {
  id: string;
  toolName: string;
  targetResource: string;
  riskTier: RiskTier;
  description: string;
  recommendedAction: SecurityAction;
  justification: string;
}

export interface FutureClaim {
  id: string;
  category: 'established-fact' | 'active-development' | 'reasonable-expectation' | 'rejected-speculation';
  titlePersian: string;
  explanation: string;
  badgeLabel: string;
}
```

---

## ۶. ملاحظات واکنش‌گرایی، دسترسی‌پذیری و عملکرد (QA Matrix)

1. **واکنش‌گرایی (Responsive Design):**
   - تمامی کامپوننت‌ها در ۵ ویوپورت استاندارد تست خواهند شد:
     * Mobile Narrow (360px): چیدمان تک‌ستونه، کنترل‌های بزرگ‌تر و متن‌های خوانا.
     * Mobile Standard (390px): بهینه‌سازی فاصله‌گذاری و پدهای لمسی.
     * Tablet Portrait (768px): تبدیل کارت‌ها به شبکه ۲ستونه.
     * Laptop (1024px) و Desktop Wide (1440px): چیدمان پیشرفته سه‌ستونه با نمایش هم‌زمان دیاگرام‌ها.
2. **پشتیبانی از صفحه‌کلید (Keyboard Accessibility):**
   - کلیدهای جهت‌نمای `ArrowLeft` و `ArrowRight` برای جابه‌جایی میان ۶ اسلاید.
   - کلید `Escape` برای بازگشت به نمای فهرست یا بستن دراور ناوبری.
   - قابلیت فوکوس‌پذیری تمام تب‌ها، دکمه‌های سناریو و آزمون‌ها با کلید `Tab`.
3. **عملکرد و مدیریت منابع (Performance & Bundle Size):**
   - هیچ کتابخانه سنگین سه‌بعدی یا پکیج محاسباتی جدیدی افزوده نخواهد شد.
   - رندرینگ تعاملی صرفاً بر مبنای محاسبات محلی State در کامپوننت‌های سبک React 19 صورت می‌پذیرد.
   - شاخص‌های CWV به ویژه CLS روی مقدار صفر و INP زیر ۵۰ میلی‌ثانیه حفظ خواهند شد.

---

## ۷. ترتیب فازبندی پیاده‌سازی برای وظیفه آتی (TASK-007.2 Roadmap)

پس از تصویب این مستند و صدور مجوز پیاده‌سازی، مراحل کدنویسی به ترتیب زیر در TASK-007.2 اجرا خواهد شد:
1. **مرحله ۱: ایجاد تعاریف داده‌ای و تایپ‌ها:** ایجاد `src/components/chapters/chapter07/types.ts` و `mockData.ts`.
2. **مرحله ۲: پیاده‌سازی ویجت‌های تعاملی پایه:** ساخت `WorkflowTrustExplorer.tsx`، `SecurityPolicySimulator.tsx` و `GrandSynthesisBoard.tsx`.
3. **مرحله ۳: پیاده‌سازی بخش‌های شش‌گانه:** ساخت بخش‌های ۰۷.۱ تا ۰۷.۶ با رعایت کامل چیدمان، یادداشت‌های سخنران و نشان‌ها.
4. **مرحله ۴: پیاده‌سازی ارکستراتور والد و یکپارچه‌سازی:** ایجاد `src/components/chapters/Chapter07.tsx` و اتصال آن به `src/app/presentation/page.tsx` و `src/lib/presentation.ts`.
5. **مرحله ۵: اعتبارسنجی فنی و آزمون‌های مرورگر:** اجرای `npx tsc --noEmit`، `npm run lint`، `npm run build` و آزمون‌های چندویوپورتی در حالت‌های Presentation و Scroll.
