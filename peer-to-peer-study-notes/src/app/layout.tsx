import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
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

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
    profile = data;
  }

  const fullName = profile?.full_name || "ผู้ใช้งาน";
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Header - ยึดหลัก Alignment และ Contrast */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
          <div className="container mx-auto h-16 px-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-emerald-400">Note TCT</Link>
            {/* Middle Menu: Show only when logged in */}
            {user && (
              <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
                <Link href="/" className="hover:text-emerald-400 transition-colors">หน้าแรก</Link>
                <Link href="/dashboard/notes" className="hover:text-emerald-400 transition-colors">ชีทสรุป</Link>
                <Link href="/dashboard/tutors" className="hover:text-emerald-400 transition-colors">หาติวเตอร์</Link>
              </nav>
            )}
            
            {/* Right Side: Profile or Login Button */}
            {user ? (
              <Link href="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="hidden md:block text-sm text-right">
                  <div className="text-white font-bold">{fullName}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 shrink-0 shadow-lg">
                  {initial}
                </div>
              </Link>
            ) : (
              <Link href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-4 py-2 rounded-xl transition-all">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
