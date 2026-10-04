"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { GraduationCap, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ApplyTutorClient({ userId, existingProfile }: { userId: string, existingProfile: any }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [bio, setBio] = useState(existingProfile?.bio || "");
  const [hourlyRate, setHourlyRate] = useState(existingProfile?.hourly_rate || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bio.trim()) {
      setError("กรุณากรอกประวัติแนะนำตัว");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from("tutor_profiles")
        .upsert({
          id: userId,
          bio: bio,
          hourly_rate: Number(hourlyRate),
          is_verified: existingProfile?.is_verified || false
        }, { onConflict: 'id' });

      if (submitError) throw submitError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/tutors");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 flex flex-col items-center text-center max-w-md mx-auto mt-10">
        <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">บันทึกข้อมูลสำเร็จ!</h2>
        <p className="text-slate-400 mb-6">คุณได้อัปเดตโปรไฟล์ติวเตอร์เรียบร้อยแล้ว ระบบกำลังพากลับไปยังหน้าหลัก...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Link href="/dashboard/tutors" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้าหาติวเตอร์
      </Link>

      <div className="glass-card p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <GraduationCap className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {existingProfile ? "แก้ไขโปรไฟล์ติวเตอร์" : "สมัครเป็นติวเตอร์"}
            </h1>
            <p className="text-slate-400">กรอกข้อมูลของคุณเพื่อให้ผู้เรียนรู้จักคุณมากขึ้น</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              แนะนำตัวเอง (Bio) <span className="text-red-400">*</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="เช่น พี่เรียนอยู่วิศวะ เกรด A ทุกตัว มีประสบการณ์สอนมาแล้ว 2 ปี..."
              className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              เรทราคาต่อชั่วโมง (เครดิต)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full max-w-[200px] bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="text-slate-400">เครดิต / ชม.</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">ใส่ 0 หากต้องการสอนฟรี</p>
          </div>

          <hr className="border-slate-700/50" />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              {loading ? "กำลังบันทึก..." : (existingProfile ? "บันทึกการเปลี่ยนแปลง" : "สมัครเป็นติวเตอร์")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
