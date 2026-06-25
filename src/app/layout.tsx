import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import NavBar from "@/components/ui/NavBar";
import Sidebar from "@/components/ui/Sidebar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CM Blog",
    template: "%s | CM Blog",
  },
  description: "专注于 Web 开发、前端技术和开源工具的个人博客。分享学习心得，推荐实用资源。",
  openGraph: {
    title: "CM Blog",
    description: "专注于 Web 开发、前端技术和开源工具的个人博客。",
    type: "website",
    locale: "zh_CN",
    siteName: "CM Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "CM Blog",
    description: "专注于 Web 开发、前端技术和开源工具的个人博客。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <ThemeProvider>
          <NavBar />
          <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8">
            <main className="min-w-0 flex-1">{children}</main>
            <Sidebar />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
