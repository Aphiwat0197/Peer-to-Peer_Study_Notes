"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // ล็อกอินสำเร็จ พาไปหน้า Dashboard
      router.push("/dashboard");
      
    } catch (err: any) {
      setError(err.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">เข้าสู่ระบบ</h1>
          <p className="text-slate-400 text-sm">ยินดีต้อนรับกลับสู่ Note TCT</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start gap-2 mb-6 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">อีเมล</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="student@email.kmutnb.ac.th" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
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
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] mt-4 flex items-center justify-center">
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          ยังไม่มีบัญชี? <Link href="/register" className="text-emerald-400 font-bold hover:underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}
