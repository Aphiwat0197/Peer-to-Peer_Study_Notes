import { createClient } from "@/utils/supabase/server";
import { Search, Star, Users, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function TutorsPage() {
  const supabase = await createClient();

  // ดึงข้อมูลติวเตอร์ทั้งหมดจากฐานข้อมูล (join กับ profiles และ subjects)
  const { data: tutors } = await supabase
    .from("tutor_profiles")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false });

  // ดึงรายการวิชาทั้งหมด
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .order("name");

  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-0">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Users className="text-pink-400 w-8 h-8" /> 
            ค้นหาติวเตอร์
          </h1>
          <p className="text-slate-400 mt-1">ค้นหาติวเตอร์ที่เก่งในวิชาที่คุณต้องการ</p>
        </div>
        <Link href="/dashboard/tutors/apply" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] whitespace-nowrap text-center inline-block">
          สมัครเป็นติวเตอร์
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="ค้นหาชื่อติวเตอร์ หรือวิชาที่ต้องการติว..."
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
        />
      </div>

      {/* Tutor Grid - Real Data */}
      {tutors && tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => {
            const name = (tutor.profiles as any)?.full_name || "ติวเตอร์";
            const initial = name.charAt(0).toUpperCase();
            const teachingSubjects = tutor.teaching_subjects || [];
            const subjectNames = subjects?.filter(s => teachingSubjects.includes(s.id)).map(s => s.name) || [];
            const availDays = tutor.available_days || [];

            return (
              <div key={tutor.id} className="glass-card p-6 flex flex-col gap-4 hover:bg-slate-800/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 shrink-0 flex items-center justify-center text-xl font-bold text-indigo-400">
                    {initial}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-white text-lg truncate">{name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" /> {tutor.rating || "5.0"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-300 line-clamp-2">{tutor.bio || "ยังไม่ได้เขียนแนะนำตัว"}</p>

                {/* Subjects */}
                {subjectNames.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {subjectNames.map((s, i) => (
                      <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2.5 py-0.5 rounded-lg text-xs font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Available Days */}
                {availDays.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {availDays.map((d: string, i: number) => (
                      <span key={i} className="bg-pink-500/10 text-pink-400 border border-pink-500/30 px-2.5 py-0.5 rounded-lg text-xs font-medium">
                        {d}
                      </span>
                    ))}
                    {tutor.time_start && tutor.time_end && (
                      <span className="text-slate-400 text-xs flex items-center gap-1 ml-1">
                        <Clock className="w-3 h-3" /> {tutor.time_start} - {tutor.time_end}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-slate-700/50 pt-4 mt-auto">
                  <div className="text-emerald-400 font-bold">
                    {tutor.hourly_rate === 0 ? "ฟรี" : `${tutor.hourly_rate} เครดิต / ชม.`}
                  </div>
                  <Link 
                    href={`/dashboard/tutors/book/${tutor.id}`}
                    className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 font-bold px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-1"
                  >
                    จองเวลา <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-10 text-center">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">ยังไม่มีติวเตอร์ในระบบ</h3>
          <p className="text-slate-400 text-sm mb-4">เป็นคนแรกที่สมัครเป็นติวเตอร์สิ!</p>
          <Link href="/dashboard/tutors/apply" className="text-emerald-400 hover:text-emerald-300 font-bold">
            สมัครเลย →
          </Link>
        </div>
      )}
    </div>
  );
}
