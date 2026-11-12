import type { Metadata, Viewport } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مدلهای زبانی و Model Context Protocol (MCP) | ارائه تعاملی",
  description: "ارائه تعاملی و جامع پیرامون Model Context Protocol (MCP): از تولید متن تا تعامل استاندارد با ابزارها و داده‌های خارجی",
  keywords: ["MCP", "Model Context Protocol", "LLM", "هوش مصنوعی", "مدل‌های زبانی", "Function Calling", "اتصال ابزار"],
  authors: [{ name: "MCP Interactive Presentation" }],
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0B1020] text-[#F8FAFC] antialiased selection:bg-[#6366F1]/30 selection:text-[#22D3EE] font-[family-name:var(--font-vazirmatn)]">
        {children}
      </body>
    </html>
  );
}
