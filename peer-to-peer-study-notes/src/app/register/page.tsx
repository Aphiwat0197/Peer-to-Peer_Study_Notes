import Link from "next/link";
import { User, Mail, Lock, BookOpen } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">สร้างบัญชีผู้ใช้</h1>
          <p className="text-slate-400 text-sm">เข้าร่วมสังคมการเรียนรู้และแบ่งปันชีทสรุป</p>
        </div>

        <form className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">ชื่อ-นามสกุล</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="text" placeholder="สมชาย เรียนดี" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">อีเมลนักศึกษา</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="email" placeholder="student@kmutnb.ac.th" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Faculty */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">คณะ</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select className="w-full bg-slate-900/50 border border-slate-700 text-slate-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                <option value="">เลือกคณะของคุณ...</option>
                <option value="eng">วิศวกรรมศาสตร์</option>
                <option value="sci">วิทยาศาสตร์ประยุกต์</option>
                <option value="ind">ครุศาสตร์อุตสาหกรรม</option>
                <option value="cit">วิทยาลัยเทคโนโลยีอุตสาหกรรม</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">รหัสผ่าน</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <button type="button" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] mt-4">
            สมัครสมาชิก
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          มีบัญชีอยู่แล้ว? <Link href="/login" className="text-emerald-400 font-bold hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
