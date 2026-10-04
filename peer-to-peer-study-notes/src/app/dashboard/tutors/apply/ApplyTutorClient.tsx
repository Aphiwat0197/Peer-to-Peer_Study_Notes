"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { GraduationCap, ArrowLeft, CheckCircle, AlertCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

const DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

export default function ApplyTutorClient({ 
  userId, 
  existingProfile, 
  subjects 
}: { 
  userId: string; 
  existingProfile: any; 
  subjects: any[];
}) {
  const router = useRouter();
  const supabase = createClient();
  
  const [bio, setBio] = useState(existingProfile?.bio || "");
  const [hourlyRate, setHourlyRate] = useState(existingProfile?.hourly_rate || 0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(existingProfile?.teaching_subjects || []);
  const [availableDays, setAvailableDays] = useState<string[]>(existingProfile?.available_days || []);
  const [timeStart, setTimeStart] = useState(existingProfile?.time_start || "09:00");
  const [timeEnd, setTimeEnd] = useState(existingProfile?.time_end || "17:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(s => s !== subjectId) : [...prev, subjectId]
    );
  };

  const toggleDay = (day: string) => {
    setAvailableDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bio.trim()) {
      setError("กรุณากรอกประวัติแนะนำตัว");
      return;
    }
    if (selectedSubjects.length === 0) {
      setError("กรุณาเลือกวิชาที่สอนอย่างน้อย 1 วิชา");
      return;
    }
    if (availableDays.length === 0) {
      setError("กรุณาเลือกวันที่ว่างสอนอย่างน้อย 1 วัน");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from("tutor_profiles")
        .upsert({
          id: userId,
          bio,
          hourly_rate: Number(hourlyRate),
          teaching_subjects: selectedSubjects,
          available_days: availableDays,
          time_start: timeStart,
          time_end: timeEnd,
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
        <p className="text-slate-400 mb-6">โปรไฟล์ติวเตอร์ของคุณพร้อมใช้งานแล้ว กำลังกลับไปหน้าหลัก...</p>
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bio */}
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

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" /> 
              วิชาที่สอน <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => toggleSubject(subject.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selectedSubjects.includes(subject.id)
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>

          {/* Available Days */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-400" /> 
              วันที่ว่างสอน <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    availableDays.includes(day)
                      ? "bg-pink-500/20 border-pink-500/50 text-pink-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              ช่วงเวลาที่ว่าง
            </label>
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="text-slate-400 font-medium">ถึง</span>
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Hourly Rate */}
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
