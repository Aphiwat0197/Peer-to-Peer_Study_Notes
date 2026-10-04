import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

// 1. เปลี่ยนมาใช้ Font Prompt ที่มีความทันสมัย และอ่านง่าย เหมาะกับภาษาไทย
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Note TCT | Peer-to-Peer Study Notes",
  description: "แพลตฟอร์มแบ่งปันชีทสรุปและคอร์สติวสำหรับนักศึกษา",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Header - ยึดหลัก Alignment และ Contrast */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
          <div className="container mx-auto h-16 px-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-400">Note TCT</div>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-emerald-400 transition-colors">หน้าแรก</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">ชีทสรุป</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">หาติวเตอร์</a>
            </nav>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-4 py-2 rounded-xl transition-all">
              เข้าสู่ระบบ
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
