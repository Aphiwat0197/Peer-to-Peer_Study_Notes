import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">เข้าสู่ระบบ</h1>
          <p className="text-slate-400 text-sm">ยินดีต้อนรับกลับสู่ Note TCT</p>
        </div>

        <form className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">อีเมล</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="email" placeholder="student@kmutnb.ac.th" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-slate-300">รหัสผ่าน</label>
              <a href="#" className="text-xs text-emerald-400 hover:underline">ลืมรหัสผ่าน?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <Link href="/dashboard" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] mt-4 flex items-center justify-center">
            เข้าสู่ระบบ
          </Link>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          ยังไม่มีบัญชี? <Link href="/register" className="text-emerald-400 font-bold hover:underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}
