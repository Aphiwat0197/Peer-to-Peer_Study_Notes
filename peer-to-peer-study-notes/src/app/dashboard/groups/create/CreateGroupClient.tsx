"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Video, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CreateGroupClient({
  subjects,
  userId
}: {
  subjects: { id: string; name: string }[];
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [meetingType, setMeetingType] = useState<"online" | "onsite">("online");
  const [meetUrl, setMeetUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("กรุณากรอกหัวข้อกลุ่มติว");
      return;
    }
    if (!scheduledAt) {
      setError("กรุณาเลือกวันและเวลา");
      return;
    }
    if (meetingType === "online" && !meetUrl.trim()) {
      setError("กรุณากรอกลิงก์ Google Meet");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("study_groups")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          subject_id: subjectId || null,
          max_participants: maxParticipants,
          meeting_type: meetingType,
          meet_url: meetingType === "online" ? meetUrl.trim() : null,
          scheduled_at: new Date(scheduledAt).toISOString(),
          duration_minutes: duration,
          status: "open",
          created_by: userId,
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/groups");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการสร้างกลุ่ม");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 flex flex-col items-center text-center max-w-md mx-auto mt-10">
        <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">สร้างกลุ่มสำเร็จ!</h2>
        <p className="text-slate-400 mb-6">กลุ่มติวของคุณพร้อมให้ผู้คนเข้าร่วมแล้ว</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Link href="/dashboard/groups" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้ากลุ่มติว
      </Link>

      <div className="glass-card p-6 md:p-10">
        <h1 className="text-2xl font-bold text-white mb-2">สร้างกลุ่มติว</h1>
        <p className="text-slate-400 text-sm mb-8">จัดกลุ่มติวแบบออนไลน์หรือในมหาลัย</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              หัวข้อกลุ่มติว <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น ติว Calculus ก่อน Midterm"
              className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              รายละเอียด
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="อธิบายเนื้อหาที่จะติว..."
              className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors h-24 resize-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              วิชา
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="">เลือกวิชา</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              จำนวนผู้เข้าร่วมสูงสุด: <span className="text-emerald-400">{maxParticipants}</span> คน
            </label>
            <input
              type="range"
              min="2"
              max="30"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              className="w-full accent-emerald-500"
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

          {/* Meet URL */}
          {meetingType === "online" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ลิงก์ Google Meet <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          )}

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              วันและเวลา <span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ระยะเวลา: <span className="text-emerald-400">{duration}</span> นาที
            </label>
            <input
              type="range"
              min="30"
              max="180"
              step="30"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <hr className="border-slate-700/50" />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              {loading ? "กำลังสร้าง..." : "สร้างกลุ่มติว"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
