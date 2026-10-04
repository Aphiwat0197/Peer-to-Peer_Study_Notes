"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    faculty: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ตรวจสอบว่ากรอกข้อมูลครบไหม
      if (!formData.name || !formData.email || !formData.faculty || !formData.password) {
        throw new Error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      }

      // สมัครสมาชิกผ่าน Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            faculty_id: formData.faculty,
          }
        }
      });

      if (signUpError) throw signUpError;

      // สมัครสำเร็จ
      setSuccess("สมัครสมาชิกสำเร็จ! กำลังพาดึงเข้าสู่ระบบ...");
      
      // หน่วงเวลา 1.5 วินาทีแล้วพาไปหน้า Dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">สร้างบัญชีผู้ใช้</h1>
          <p className="text-slate-400 text-sm">เข้าร่วมสังคมการเรียนรู้และแบ่งปันชีทสรุป</p>
        </div>

        {/* แจ้งเตือนเมื่อ Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start gap-2 mb-6 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* แจ้งเตือนเมื่อ Success */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-xl flex items-start gap-2 mb-6 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">ชื่อ-นามสกุล</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="สมชาย เรียนดี" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">อีเมลนักศึกษา</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="student@email.kmutnb.ac.th" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Faculty */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">คณะ</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select name="faculty" value={formData.faculty} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 text-slate-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
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
            <label className="text-sm font-medium text-slate-300">รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] mt-4">
            {loading ? "กำลังสร้างบัญชี..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          มีบัญชีอยู่แล้ว? <Link href="/login" className="text-emerald-400 font-bold hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
