# Content Structure: MCP Interactive Presentation
**ساختار محتوایی ارائه: مدلهای زبانی و Model Context Protocol (MCP)**

Planned Presentation Duration: ~25 minutes (calibrated for 20–30 minute sessions).

---

## High-Level Syllabus Overview

| فصل (Chapter) | عنوان فصل (Title) | مدت زمان تخمینی | وضعیت محتوا |
|---|---|---|---|
| **فصل ۱** | مقدمه و مسئله اصلی (Introduction and the Main Problem) | ~3 دقیقه | پیاده‌سازی اولیه (تسک حاضر) |
| **فصل ۲** | مدل‌های زبانی و نیاز به ابزارهای خارجی (LLMs & The Need for External Tools) | ~4 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |
| **فصل ۳** | معرفی Model Context Protocol (Introduction to MCP) | ~4 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |
| **فصل ۴** | معماری MCP و مؤلفه‌های کلیدی (Architecture & Core Components) | ~4 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |
| **فصل ۵** | نحوه کارکرد پروتکل MCP (How MCP Works) | ~4 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |
| **فصل ۶** | مقایسه MCP با REST API و روش‌های سنتی (MCP vs REST, Function Calling) | ~3 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |
| **فصل ۷** | کاربردها، امنیت، محدودیت‌ها و آینده (Applications, Security, and Future) | ~3 دقیقه | تعریف ساختار (محتوای فنی در انتظار پژوهش) |

---

## Detailed Chapter Breakdowns

### فصل ۱: مقدمه و مسئله اصلی (Introduction and the Main Problem)
*Status: Approved and Implemented in TASK-001*

- **۱.۱ پیام ورودی و هدف ارائه (Welcome & Premise):**
  - عنوان: مدلهای زبانی و Model Context Protocol (MCP): از تولید متن تا تعامل با ابزارهای خارجی.
  - مسئله بنیادین: هوش مصنوعی زبانی قادر به تحلیل عمیق و نگارش متن است، اما به صورت پیش‌فرض در یک «اتاق ایزوله» زندگی می‌کند.
- **۱.۲ مقایسه تصویری: تولید متن در برابر اجرای عملیات (Text Generation vs. Real Action):**
  - سناریوی A (فقط پیش‌بینی متن): پاسخ به یک درخواست محاسباتی یا پایگاه داده با تقریب آماری بدون دسترسی به داده واقعی.
  - سناریوی B (اقدام عملیاتی در دنیای واقعی): اتصال امن به منبع داده، کوئری گرفتن و انجام عملیات معتبر.
- **۱.۳ سوال بنیادین آموزشی (The Core Question):**
  - چگونه می‌توان بدون به خطر انداختن امنیت و بدون نوشتن کدهای چسبنده‌ی غیرقابل مقیاس برای هر مدل و هر ابزار، پلی استاندارد بین مدل‌های زبانی و اکوسیستم نرم‌افزاری ایجاد کرد؟
- **۱.۴ پرسش تعاملی سنجش درک مفهوم (Interactive Concept Check):**
  - پرسش چندگزینه‌ای تشخیصی برای درگیر کردن دانشجویان در ابتدای جلسه.

---

### فصل ۲: مدل‌های زبانی و نیاز به ابزارهای خارجی (LLMs & The Need for External Tools)
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - تبیین محدودیت‌های ذاتی LLMها (عدم دسترسی به داده‌های لحظه‌ای، توهم در محاسبات دقیق، فقدان توانایی مستقیم خواندن/نوشتن در دیسک یا پایگاه داده).
  - مفهوم Augmented Language Models و Tool-Assisted AI.
  - گذار از پاسخ‌دهنده منفعل به عامل‌های هوشمند (AI Agents).

---

### فصل ۳: معرفی Model Context Protocol (Introduction to MCP)
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - پروتکل MCP چیست و توسط چه کنسرسیومی/سازمانی به عنوان استاندارد باز معرفی شد؟
  - تمثیل جهانی: MCP به مثابه استاندارد USB-C برای هوش مصنوعی و اتصال ابزارها.
  - چالش وضعیت فعلی (اتصالات اختصاصی N×M در برابر استاندارد N+M).

---

### فصل ۴: معماری MCP و مؤلفه‌های کلیدی (Architecture & Core Components)
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - ساختار ۳ لایه: Host (میزبان مانند Claude Desktop / IDE)، Client (کلاینت MCP)، و Server (سرورهای ابزار و داده).
  - سه نوع منبع محتوایی در MCP:
    1. Prompts (پرامپت‌های از پیش آماده)
    2. Resources (منابع داده‌ای فقط‌خواندنی)
    3. Tools (ابزارهای اجرایی با اثرات جانبی)

---

### فصل ۵: نحوه کارکرد پروتکل MCP (How MCP Works)
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - پروتکل پیام‌رسانی بر پایه JSON-RPC 2.0.
  - مکانیزم لایه‌های ترابری (Transport Layers: Stdio و SSE / Server-Sent Events).
  - چرخه حیات نشست (Lifecycle): Handshake، اعتبارسنجی قابلیت‌ها (Capabilities)، ارسال درخواست و بازگشت نتیجه.

---

### فصل ۶: مقایسه MCP با REST API، Function Calling و روش‌های اختصاصی
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - تفاوت بنیادین میان Function Calling خام (وابسته به مدل خاص) و پروتکل استاندارد باز (MCP).
  - مقایسه معماری REST API سنتی در برابر قراردادهای داده‌ای دوطرفه MCP.
  - ماتریس مقایسه‌ای: انعطاف‌پذیری، قابلیت تعویض مدل، امنیت و سهولت توسعه.

---

### فصل ۷: کاربردها، امنیت، محدودیت‌ها و آینده (Applications, Security, and Future)
*Status: Planned (Pending detailed research in future task)*

- **اهداف آموزشی:**
  - سناریوهای عملی (اتصال به پایگاه‌های داده، سیستم‌های فایل، گیت‌هاب، Slack و ابزارهای مهندسی).
  - امنیت و سطوح دسترسی (Human-in-the-loop، تایید دسترسی‌ها و کنترل‌های ایزوله‌سازی).
  - چشم‌انداز آینده اکوسیستم هوش مصنوعی عامل‌محور و استانداردهای باز.
- **جمع‌بندی و پرسش و پاسخ (Q&A).**

