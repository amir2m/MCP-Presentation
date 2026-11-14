# برنامه جامع پیاده‌سازی فنی فصل چهارم (CHAPTER 04 IMPLEMENTATION PLAN)
## «معماری و اجزای پروتکل Model Context Protocol (MCP)»

**پروژه:** ارائه تعاملی دانشگاهی Model Context Protocol (MCP)  
**فصل:** 04 — MCP Architecture and Core Components  
**نوع سند:** مستندات برنامه‌ریزی، معماری کامپوننت‌ها و نقشه‌راه پیاده‌سازی (Implementation Roadmap)  
**مخزن:** `D:\web-img\React\mcp-presentation`  
**وضعیت:** مصوب برای فاز پیاده‌سازی کد در تسک بعدی (TASK-004.2)  
**نسخه مرجع پروتکل:** `MCP Specification: 2026-07-28` (بنیاد لینوکس / AAIF)

---

## ۱. یافته‌های معماری سیستم و پیش‌نیازهای پروژه (System Architecture Findings)

بازرسی جامع مخزن کد پروژه، مشخصات فنی و محدودیت‌های قطعی زیر را اثبات می‌کند:

1. **پشته فناوری پایه:**
   * **Next.js:** نسخه 16.4.6 با App Router و کامپایلر Turbopack.
   * **React:** نسخه 19.3.0 با معماری سرور/کلاینت مدرن.
   * **TypeScript:** نسخه 5 در حالت تایپ اکید (`strict: true`).
   * **Tailwind CSS:** نسخه v4.3.3 بر پایه توکن‌های CSS مدرن.
   * **انیمیشن:** پکیج `motion/react` (Motion for React).
2. **پوسته ارائه و پشتیبانی دوگانه (Dual-Mode Presentation Shell):**
   * **Presentation Mode:** ارائه اسلاید به اسلاید تمام‌صفحه با دکمه‌های کنترل شناور (`PresentationControls`)، نشانگر پیشرفت و هدایت با کیبورد (`ArrowLeft` برای اسلاید بعد و `ArrowRight` برای اسلاید قبل در چیدمان RTL فارسی).
   * **Scroll Mode:** حالت روایتی پیوسته عمودی در قالب بخش‌های مدون (`ChapterSection`) همراه با نوار پیشرفت بالای صفحه (`ScrollProgress`).
3. **وضعیت کنونی فصل چهارم در کد:**
   * پوشه `src/components/chapters/chapter04/` و کامپوننت `Chapter04.tsx` هنوز ایجاد نشده‌اند.
   * در `src/lib/presentation.ts`، متادیتای فصل ۴ دارای وضعیت `'planned'` و آرایه خالی `slides: []` است.
   * در `src/app/presentation/page.tsx`، رندر فصل ۴ به صفحه نگه‌دارنده موقت (Fallback) منتهی می‌شود.
4. **دستورالعمل حیاتی پرهیز از 3D غیرضروری:**
   * صحنه سه‌بعدی سنگین فقط منحصر به هیروی فصل ۱ است.
   * تمام دیاگرام‌ها و المان‌های بصری فصل ۴ باید منحصراً با گرافیک‌های برداری دوبعدی سبک (2D Vector Schematics)، ترکیب کامپوننت‌های مدرن Tailwind و انیمیشن‌های نرم `motion/react` پیاده‌سازی شوند.

---

## ۲. ساختار پیشنهادی کامپوننت‌ها و فایل‌ها (Proposed File Hierarchy)

معماری کامپوننت‌های فصل چهارم به صورت کاملاً ماژولار و مطابق با استاندارد فصول پیشین به شرح زیر خواهد بود:

```
src/components/chapters/
├── Chapter04.tsx                                  # کامپوننت والد هماهنگ‌کننده (Slides & Scroll Mode)
└── chapter04/
    ├── ArchitectureOverviewSection.tsx            # بخش ۴.۱: نمای کلی، تفکیک Data Layer از Transport Layer
    ├── ParticipantsRolesSection.tsx               # بخش ۴.۲: نقش‌های سه‌گانه Host، Client و Server (اصل ۱ به ۱)
    ├── MultiServerTopologySection.tsx             # بخش ۴.۳: معماری چندسروری، مرزهای ارتباطی، ایزولاسیون و تجمیع کانتکست
    ├── JsonRpcPatternsSection.tsx                 # بخش ۴.۴: زبان ارتباط JSON-RPC 2.0، سه رده پیام، واریانت‌های پاسخ و تطابق id
    ├── DiscoveryStatelessSection.tsx              # بخش ۴.۵: کشف قابلیت‌ها با server/discover، فراداده _meta و هسته بدون نشست
    └── TransportsComparisonSection.tsx            # بخش ۴.۶: ترابری STDIO محلی در برابر Streamable HTTP، الگوهای استریم، جدول و CTA فصل ۵
```

---

## ۳. کالبدشکافی مسئولیت و اینترفیس کامپوننت‌ها (Component Specifications)

### ۳.۱. کامپوننت هماهنگ‌کننده والد: `Chapter04.tsx`
* **مسیر فایل:** `src/components/chapters/Chapter04.tsx`
* **نوع کامپوننت:** Client Component (`'use client'`)
* **اینترفیس ورودی (Props):**
  ```typescript
  interface Chapter04Props {
    mode?: 'scroll' | 'slides';
    activeSlideIndex?: number;
    onSelectChapter?: (chapterId: number) => void;
  }
  ```
* **مسئولیت‌ها:**
  * در حالت `slides`: رندر اسلاید فعال بر اساس `activeSlideIndex` (بین ۰ تا ۵) با انیمیشن ورود و خروج `AnimatePresence mode="wait"`.
  * در حالت `scroll`: رندر متوالی هر ۶ بخش در یک چیدمان منظم عمودی با فاصله استاندارد (`space-y-24`).
  * هدایت رویداد خروج یا انتقال به فصل پنجم از طریق تابع ورودی `onSelectChapter`.

---

### ۳.۲. بخش ۴.۱: `ArchitectureOverviewSection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/ArchitectureOverviewSection.tsx`
* **مسئولیت‌ها:**
  * ارائه نقشه ذهنی کلان معماری MCP.
  * تفکیک صریح دو لایه بنیادین: لایه داده (**Data Layer**: معناشناسی پیام‌ها، ساختارهای JSON-RPC، متدها و قابلیت‌ها) در برابر لایه انتقال (**Transport Layer**: فریم‌بندی، تحویل، فراداده‌های ترابری، لغو، اتصالات و مشخصه‌های جریانی).
  * دیاگرام پشته‌ای لایه‌ها (Layered Stack) با هایلایت رنگ‌های فیروزه‌ای و نیلی.
  * باکس تاشوی یادداشت‌های سخنران (Presenter Notes).
* **کامپوننت‌های پایه:** `Card` (واریانت `solid`), `Badge` (واریانت `cyan`), `Button` (واریانت `ghost`).
* **آیکون‌های Lucide:** `Layers`, `Cpu`, `Network`, `Database`, `ArrowDownUp`, `ChevronDown`.

---

### ۳.۳. بخش ۴.۲: `ParticipantsRolesSection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/ParticipantsRolesSection.tsx`
* **مسئولیت‌ها:**
  * تفکیک دقیق وظایف سه بازیگر اکوسیستم:
    1. **MCP Host:** برنامه میزبان کاربر و هماهنگ‌کننده مدل و امنیت.
    2. **MCP Client:** رابط استاندارد پروتکل با قاعده قطعی ارتباط ۱ به ۱ با سرور.
    3. **MCP Server:** ارائه‌دهنده سرویس و قابلیت‌ها (بدون تصمیم‌گیری خودمختار).
  * نمایش برجسته **قانون طلایی معماری (۱ کلاینت = ۱ سرور)** در یک کادر اختصاصی.
  * دیاگرام شماتیک جریان ارتباط میان هاست، نمونه کلاینت و سرور متناظر.
* **کامپوننت‌های پایه:** `Card`, `Badge` (واریانت‌های `cyan`, `indigo`, `outline`).
* **آیکون‌های Lucide:** `AppWindow`, `Workflow`, `Server`, `CheckCircle2`, `AlertCircle`.

---

### ۳.۴. بخش ۴.۳: `MultiServerTopologySection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/MultiServerTopologySection.tsx`
* **مسئولیت‌ها:**
  * تجسم سناریوی یک برنامه میزبان با ۴ سرور تخصصی (Filesystem, PostgreSQL, Git, API Docs).
  * آموزش مفهوم تجمیع کانتکست (Context Aggregation) توسط هاست.
  * تبیین مرزبندی ارتباطی و عدم تعریف ارتباط مستقیم سرور به سرور در پروتکل: «در معماری استاندارد MCP، هر Client با یک Server مشخص ارتباط دارد. هماهنگی میان قابلیت‌های چند Server از طریق Host و سیاست‌های دسترسی آن مدیریت می‌شود؛ بنابراین Serverها به‌صورت پیش‌فرض به Context و مکالمات سایر Serverها دسترسی ندارند.»
  * اشاره به امکان تعامل مستقل سرورها با دیتابیس‌ها و سرویس‌های خارجی خارج از پروتکل MCP.
  * دیاگرام توپولوژی مفهومی ستاره‌ای (Conceptual Hub & Spoke) به عنوان الگوی آموزشی تفهیم نقش هاست (نه یک الزام صلب پروتکلی).
* **کامپوننت‌های پایه:** `Card`, `Badge`, `Button`.
* **آیکون‌های Lucide:** `FolderGit2`, `HardDrive`, `Database`, `FileCode2`, `ShieldCheck`, `XCircle`.

---

### ۳.۵. بخش ۴.۴: `JsonRpcPatternsSection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/JsonRpcPatternsSection.tsx`
* **مسئولیت‌ها:**
  * معرفی استاندارد پیام‌رسانی JSON-RPC 2.0 (سه رده اصلی پیام و دو واریانت پاسخ).
  * ارائه ۴ تب تعاملی متناسب با ساختار پیام‌ها:
    1. **`Request`:** متد، شناسه یکتا `id`، پارامترها (`params`).
    2. **`Successful Response`:** نتیجه موفقیت‌آمیز (`result`) متناظر با همان `id`.
    3. **`Notification`:** پیام‌های یک‌طرفه فاقد فیلد `id`.
    4. **`Response with Error`:** واریانت پاسخ همراه با خطا (شیء `error` شامل کد، پیام و داده‌های تشخیصی؛ بدون تلقی آن به عنوان رده مستقل چهارم).
  * کادر کد مونو LTR با برجسته‌سازی نحوه تطابق `id` میان Request و هر دو واریانت Response.
* **کامپوننت‌های پایه:** `Card`, `Badge`, `Button`.
* **آیکون‌های Lucide:** `Code2`, `ArrowRight`, `ArrowLeft`, `Bell`, `AlertTriangle`.

---

### ۳.۶. بخش ۴.۵: `DiscoveryStatelessSection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/DiscoveryStatelessSection.tsx`
* **مسئولیت‌ها:**
  * تشریح متد استاندارد کشف توانمندی‌ها: `server/discover`.
  * تبیین اقلام الزامی فراداده در هر درخواست: ارسال شناسه نسخه (`io.modelcontextprotocol/protocolVersion`) و قابلیت‌های کلاینت (`io.modelcontextprotocol/clientCapabilities`) که در تمام درخواست‌ها الزامی (MUST) هستند، همراه با الزام تطابق هدر `MCP-Protocol-Version` در ترابری وب با نسخه ارسالی در `_meta`.
  * شفاف‌سازی فیلد اطلاعاتی کلاینت (`io.modelcontextprotocol/clientInfo`) به عنوان فراداده اختیاری درون `_meta` (کلاینت‌ها توصیه اکید می‌شوند [SHOULD] خود را معرفی کنند، اما ارسال آن الزامی قطعی برای تک‌تک درخواست‌ها نیست).
  * مقایسه آموزشی رویکرد مدرن ۲۰۲۶ (هسته بدون نشست پروتکلی / Stateless Core) با مدل‌های قدیمی دست‌تکانی اجباری اولیه (`initialize` / `initialized` / `Mcp-Session-Id`).
  * تبیین گزاره دقیق مهندسی: «حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛ بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند.»
  * کارت مقایسه‌ای وضعیت Legacy در برابر Modern 2026.
* **کامپوننت‌های پایه:** `Card`, `Badge`, `Button`.
* **آیکون‌های Lucide:** `Compass`, `Sparkles`, `History`, `CheckCheck`, `RefreshCw`.

---

### ۳.۷. بخش ۴.۶: `TransportsComparisonSection.tsx`
* **مسیر فایل:** `src/components/chapters/chapter04/TransportsComparisonSection.tsx`
* **مسئولیت‌ها:**
  * تشریح ترابری محلی **STDIO** (لوله‌های `stdin` / `stdout` و ایزولاسیون لاگ با `stderr` با فریم‌بندی `\n`).
  * تشریح ترابری شبکه **Streamable HTTP** (درخواست تک‌اندپوینت `HTTP POST` با ارسال هدر نسخه و دو الگوی استریم SSE: استریم پاسخ دارای محدوده درخواست `request-scoped` و سازوکار شنونده اشتراک‌ها `subscription listening`).
  * جدول مقایسه‌ای جامع شاخص‌های فنی (محیط، فریم‌بندی، الگوهای استریم، ملاحظات نشست و توزیع بار، امنیت، کاربرد).
  * بنر سینمایی گام بعدی و دکمه CTA: **«ورود به فصل پنجم: شبیه‌سازی جریان یک درخواست در MCP»** (`onSelectChapter(5)`).
* **کامپوننت‌های پایه:** `Card`, `Badge`, `Button` (واریانت `accent`).
* **آیکون‌های Lucide:** `Terminal`, `Globe`, `ArrowLeft`, `TableProperties`, `Layers`.

---

## ۴. ماتریس استفاده مجدد از کامپوننت‌های پایه (UI Primitives Reuse Matrix)

تمام المان‌های بصری فصل ۴ با کامپوننت‌های موجود در `src/components/ui/` پیاده‌سازی می‌شوند و هیچ کامپوننت UI تکراری ساخته نخواهد شد:

| کامپوننت منبع | مسیر فایل | کاربرد اختصاصی در فصل چهارم |
|:---|:---|:---|
| **`Card`** | `@/components/ui/Card` | برای تمام کادرهای اصلی، دیاگرام‌ها و کارت‌های مقایسه‌ای (واریانت `solid` و افکت نوری `glowColor="indigo"` یا `"cyan"`). |
| **`Badge`** | `@/components/ui/Badge` | برای نمایش شماره بخش‌ها (`variant="cyan"` یا `"indigo"`)، تگ‌های LTR مونو و برچسب‌های وضعیت (`variant="success"`). |
| **`Button`** | `@/components/ui/Button` | برای تب‌های سوئیچ پیام‌های JSON-RPC، باز و بسته کردن یادداشت سخنران، و دکمه اصلی CTA ورود به فصل پنجم (`variant="accent"`). |
| **آیکون‌های Lucide** | `lucide-react` | آیکون‌های وکتور هماهنگ با طراحی دارک فیوچریستیک: `Layers`, `Cpu`, `Server`, `AppWindow`, `Terminal`, `Globe`, `Code2`, `Compass`, `ArrowLeft`. |

---

## ۵. راهبرد واکنش‌گرایی، RTL و دسترسی‌پذیری (Responsive & Accessibility Strategy)

1. **واکنش‌گرایی دقیق در ۳ اندازه نمایشگر:**
   * **دسکتاپ (1440×900):** چیدمان ۳ ستونه برای نقش‌های Host/Client/Server و ۲ ستونه برای مقایسه ترابری STDIO و HTTP.
   * **تبلت (768×1024):** تبدیل دیاگرام‌های افقی عریض به کارت‌های فشرده ۲ ستونه بدون شکستگی متن.
   * **موبایل (390×844):** بازآرایی عمودی تک‌ستونی تمام کارت‌ها، اسکرول افقی ایمن برای جعبه‌های کد JSON-RPC، و تست سرریز صفر افقی (`scrollWidth <= clientWidth`).
2. **مدیریت جهت‌گیری RTL و LTR:**
   * تمام متون توضیحی، عناوین و یادداشت‌ها دارای چیدمان راست‌به‌چپ (RTL) با فونت استاندارد Vazirmatn هستند.
   * تمامی نمونه‌های کد JSON، شناسه‌های فنی نظیر `server/discover`، `_meta`، `JSON-RPC 2.0`، `STDIO` و نام‌های متد دارای ویژگی صریح `dir="ltr"` و فونت‌های تک‌فاصله (`font-mono`) خواهند بود.
3. **دسترسی‌پذیری حرکتی و کاهش انیمیشن (`prefers-reduced-motion`):**
   * تمامی ترنزیشن‌های `motion/react` از متغیرهای ملایم بهره برده و در صورت فعال بودن ترجیح کاربر برای کاهش حرکت، انیمیشن‌های جابجایی پالس خطوط غیرفعال شده و به ترنزیشن مات شدن ملایم (`opacity`) تبدیل می‌شوند.
4. **کنتراست و خوانایی:**
   * پس‌زمینه کارت‌ها حداقل کنتراست ۷:۱ را با متون سفید و خاکستری روشن مطابق استانداردهای WCAG AAA فراهم می‌کند.

---

## ۶. طرح یکپارچه‌سازی با سامانه ارائه (System Integration Plan)

در فاز پیاده‌سازی کد (TASK-004.2)، تغییرات سیستم منحصراً محدود به اتصال فصل چهارم خواهد بود:

1. **به‌روزرسانی `src/lib/presentation.ts`:**
   * تغییر وضعیت فصل ۴ از `status: 'planned'` به `status: 'active'`.
   * ثبت ۶ اسلاید مدون برای فصل ۴ در آرایه `slides`:
     - `c4-s1`: نمای کلی معماری MCP
     - `c4-s2`: نقش Host، Client و Server
     - `c4-s3`: معماری چندسروری و مرزهای ارتباطی
     - `c4-s4`: زبان مشترک ارتباط: JSON-RPC 2.0
     - `c4-s5`: کشف قابلیت‌ها و نسخه پروتکل
     - `c4-s6`: لایه‌های انتقال: STDIO در برابر Streamable HTTP
   * به‌روزرسانی زمان تخمینی ارائه به ۷ دقیقه (`estimatedMinutes: 7`).
2. **به‌روزرسانی `src/app/presentation/page.tsx`:**
   * وارد کردن کامپوننت `Chapter04` از `@/components/chapters/Chapter04`.
   * اضافه کردن شاخه رندر `currentChapterId === 4` در حالت Presentation Mode.
   * اضافه کردن `<ChapterSection chapter={CHAPTERS[3]}><Chapter04 mode="scroll" onSelectChapter={handleSelectChapter} /></ChapterSection>` در حالت Scroll Mode.
   * تغییر برش سرفصل‌های آتی از `CHAPTERS.slice(3)` به `CHAPTERS.slice(4)` در انتهای صفحه اسکرول.

---

## ۷. فایل‌های تحت حفاظت کامل (Protected Files — Do Not Modify)

برای تضمین عدم رگرسیون، فایل‌های زیر در فاز پیاده‌سازی فصل ۴ هرگز نباید دستکاری شوند:
* `src/components/chapters/Chapter01.tsx` و زیرپوشه `chapter01/`
* `src/components/chapters/Chapter02.tsx` و زیرپوشه `chapter02/`
* `src/components/chapters/Chapter03.tsx` و زیرپوشه `chapter03/`
* `src/components/ui/` (کامپوننت‌های پایه UI بدون تغییر حفظ می‌شوند)
* `package.json` (عدم نصب هرگونه پکیج وابستگی جدید)

---

## ۸. برنامه آزمون و تضمین کیفیت (QA & Verification Plan)

پس از پیاده‌سازی در تسک بعدی، ارزیابی‌های چندمرحله‌ای زیر الزامی خواهد بود:

1. **بررسی صحت کد استاتیک:**
   * `npx tsc --noEmit`: بررسی تایپ‌اسکریپت با ۰ خطا.
   * `npm run lint`: بازرسی ESLint با ۰ خطا و ۰ هشدار.
   * `npm run build`: خروجی کامل بیلد پروداکشن Next.js Turbopack بدون خطا.
2. **ارزیابی خودکار تعاملی در مرورگر (Browser QA via Chrome CDP):**
   * آزمون تمام ۶ اسلاید در دسکتاپ (1440×900).
   * آزمون تمام ۶ اسلاید در تبلت (768×1024) با بررسی سرریز صفر افقی.
   * آزمون تمام ۶ اسلاید در موبایل (390×844) با بررسی `scrollWidth <= clientWidth`.
   * آزمون تعامل تب‌های JSON-RPC، باز شدن جدول مقایسه ترابری، و کلیک روی دکمه CTA ورود به فصل پنجم.
   * آزمون عدم رگرسیون فصول ۱، ۲ و ۳ در مسیرهای `/presentation?chapter=1` تا `3`.

---

## ۹. معیارهای پذیرش نهایی (Acceptance Criteria)

- [ ] مشخصات نسخه `2026-07-28` به عنوان مرجع قطعی اعمال شده است.
- [ ] تفکیک شفاف لایه داده (Data Layer: معناشناسی، متدها، JSON-RPC) از لایه انتقال (Transport Layer: فریم‌بندی، تحویل، فراداده ترابری، لغو، استریم) تدوین شده است.
- [ ] اصل ۱ کلاینت به ۱ سرور و مرزبندی ارتباطی («در معماری استاندارد MCP، هر Client با یک Server مشخص ارتباط دارد...») مستند شده است.
- [ ] سه رده اصلی پیام JSON-RPC 2.0 (Request, Response, Notification) و دو واریانت پاسخ (موفق و خطا در تب Response with Error) تبیین شده‌اند.
- [ ] متد `server/discover` و اقلام الزامی فراداده `_meta` (شامل `protocolVersion` و `clientCapabilities`) همگام با هدر HTTP به نام `MCP-Protocol-Version` مشخص شده است.
- [ ] گزاره دقیق بار و پراکسی در ترابری Streamable HTTP («حذف نشست پروتکلی، توزیع درخواست‌ها میان نمونه‌های مختلف سرور را ساده‌تر می‌کند؛ بااین‌حال، تنظیمات پراکسی و پشتیبانی صحیح از جریان SSE همچنان اهمیت دارند.») و دو الگوی استریم SSE ثبت شده است.
- [ ] جدول مقایسه‌ای ترابری STDIO و Streamable HTTP همراه با CTA فصل پنجم آماده پیاده‌سازی است.
- [ ] مرز محتوایی با فصل ۳ (عدم تکرار تمثیل USB-C) و فصل ۵ (عدم شبیه‌سازی کامل درخواست) حفظ شده است.
- [ ] ساختار ۶ بخشی برای مدت‌زمان دقیق حدود ۷ دقیقه (۴۲۰ ثانیه) تنظیم شده است.
- [ ] سند نقشه راه پیاده‌سازی با طراحی دارک فیوچریستیک و بدون صحنه‌های سنگین 3D تدوین شده است.
