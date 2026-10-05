"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle, MapPin, Video } from "lucide-react";
import Link from "next/link";

export default function BookTutorClient({ 
  tutorProfile, 
  tutorName, 
  subjectNames, 
  userId 
}: { 
  tutorProfile: any; 
  tutorName: string;
  subjectNames: string[];
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  
  const availDays = tutorProfile.available_days || [];
  const timeStart = tutorProfile.time_start || "09:00";
  const timeEnd = tutorProfile.time_end || "17:00";

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState(timeStart);
  const [meetingType, setMeetingType] = useState<"online" | "onsite">("online");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay) {
      setError("กรุณาเลือกวันที่ต้องการติว");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: bookError } = await supabase
        .from("bookings")
        .insert({
          student_id: userId,
          tutor_id: tutorProfile.id,
          day: selectedDay,
          time: selectedTime,
          meeting_type: meetingType,
          note: note,
          status: "pending",
        });

      if (bookError) throw bookError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/tutors");
        router.refresh();
      }, 2500);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการจองเวลา");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 flex flex-col items-center text-center max-w-md mx-auto mt-10">
        <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">จองเวลาสำเร็จ!</h2>
        <p className="text-slate-400 mb-6">รอ {tutorName} ยืนยันนัดหมาย จากนั้นจะส่งลิงก์ให้คุณทางแชท</p>
        <div className="flex gap-3">
          <Link
            href="/dashboard/chat"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
          >
            แชทกับอาจารย์
          </Link>
          <Link
            href="/dashboard/tutors"
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-xl transition-all border border-slate-700"
          >
            กลับไปหาติวเตอร์
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Link href="/dashboard/tutors" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้าหาติวเตอร์
      </Link>

      {/* Tutor Info Card */}
      <div className="glass-card p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 shrink-0 flex items-center justify-center text-xl font-bold text-indigo-400">
          {tutorName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{tutorName}</h2>
          <p className="text-sm text-slate-400">{tutorProfile.bio || "ติวเตอร์"}</p>
          {subjectNames.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {subjectNames.map((s, i) => (
                <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-lg text-xs">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Form */}
      <div className="glass-card p-6 md:p-10">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-pink-400" /> จองเวลาติว
        </h1>
        <p className="text-slate-400 text-sm mb-8">เลือกวัน เวลา และรูปแบบที่ต้องการ</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleBook} className="space-y-8">
          {/* Day Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              เลือกวันที่ต้องการ <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availDays.map((day: string) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    selectedDay === day
                      ? "bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-lg"
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" /> เลือกเวลา
            </label>
            <p className="text-xs text-slate-500 mb-2">ว่างระหว่าง {timeStart} - {timeEnd}</p>
            <input
              type="time"
              value={selectedTime}
              min={timeStart}
              max={timeEnd}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Meeting Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              รูปแบบการติว
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMeetingType("online")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  meetingType === "online"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                <Video className="w-4 h-4" /> ออนไลน์ (Google Meet)
              </button>
              <button
                type="button"
                onClick={() => setMeetingType("onsite")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  meetingType === "onsite"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                <MapPin className="w-4 h-4" /> เจอกันในมหาลัย
              </button>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              หมายเหตุถึงติวเตอร์ (ไม่จำเป็น)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น อยากให้เน้นเรื่อง Limit กับ Derivative ครับ..."
              className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors h-24 resize-none"
            />
          </div>

          {/* Price Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex justify-between items-center">
            <span className="text-slate-300 font-medium">ค่าติว</span>
            <span className="text-emerald-400 font-bold text-lg">
              {tutorProfile.hourly_rate === 0 ? "ฟรี" : `${tutorProfile.hourly_rate} เครดิต / ชม.`}
            </span>
          </div>

          <hr className="border-slate-700/50" />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              {loading ? "กำลังจอง..." : "ยืนยันจองเวลา"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
