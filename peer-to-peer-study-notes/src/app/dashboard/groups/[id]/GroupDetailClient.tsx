"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft, Calendar, Clock, Video, MapPin, Users,
  CheckCircle, AlertCircle, MessageSquare, ExternalLink, UserPlus, UserMinus
} from "lucide-react";
import Link from "next/link";

export default function GroupDetailClient({
  group,
  isJoined,
  isOwner,
  participantCount,
  userId
}: {
  group: any;
  isJoined: boolean;
  isOwner: boolean;
  participantCount: number;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(isJoined);

  const handleJoinLeave = async () => {
    setLoading(true);
    setError(null);

    try {
      if (joined) {
        const { error: leaveError } = await supabase
          .from("study_group_participants")
          .delete()
          .eq("group_id", group.id)
          .eq("user_id", userId);
        if (leaveError) throw leaveError;
        setJoined(false);
      } else {
        const { error: joinError } = await supabase
          .from("study_group_participants")
          .insert({ group_id: group.id, user_id: userId });
        if (joinError) throw joinError;
        setJoined(true);
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const scheduledDate = new Date(group.scheduled_at);

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Link href="/dashboard/groups" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้ากลุ่มติว
      </Link>

      <div className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{group.title}</h1>
          {group.description && (
            <p className="text-slate-400">{group.description}</p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Calendar className="w-3 h-3" /> วันที่
            </div>
            <div className="text-white font-medium">
              {scheduledDate.toLocaleDateString('th-TH', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Clock className="w-3 h-3" /> เวลา
            </div>
            <div className="text-white font-medium">
              {scheduledDate.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit'
              })} น. ({group.duration_minutes} นาที)
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              {group.meeting_type === 'online' ? (
                <Video className="w-3 h-3 text-emerald-400" />
              ) : (
                <MapPin className="w-3 h-3 text-pink-400" />
              )}
              รูปแบบ
            </div>
            <div className={`font-medium ${group.meeting_type === 'online' ? 'text-emerald-400' : 'text-pink-400'}`}>
              {group.meeting_type === 'online' ? 'ออนไลน์ (Google Meet)' : 'เจอกันในมหาลัย'}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Users className="w-3 h-3" /> ผู้เข้าร่วม
            </div>
            <div className="text-white font-medium">
              {participantCount}/{group.max_participants} คน
            </div>
          </div>
        </div>

        {/* Subject & Owner */}
        <div className="flex flex-wrap gap-3 mb-6">
          {group.subjects && (
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg text-sm">
              {group.subjects.name}
            </span>
          )}
          {group.profiles && (
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-sm">
              จัดโดย {group.profiles.full_name}
            </span>
          )}
        </div>

        {/* Meet Link */}
        {group.meet_url && group.meeting_type === 'online' && (
          <a
            href={group.meet_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-medium px-4 py-3 rounded-xl mb-6 hover:bg-emerald-500/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            เปิดลิงก์ Google Meet
          </a>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!isOwner && (
            <button
              onClick={handleJoinLeave}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                joined
                  ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
              }`}
            >
              {joined ? (
                <>
                  <UserMinus className="w-4 h-4" /> ออกจากกลุ่ม
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> เข้าร่วมกลุ่ม
                </>
              )}
            </button>
          )}
          <Link
            href="/dashboard/chat"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-3 rounded-xl transition-all border border-slate-700"
          >
            <MessageSquare className="w-4 h-4" /> แชทกลุ่ม
          </Link>
        </div>
      </div>
    </div>
  );
}
