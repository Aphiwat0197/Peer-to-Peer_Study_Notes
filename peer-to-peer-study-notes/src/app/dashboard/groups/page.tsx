import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Users, Plus, Calendar, Clock, Video, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function StudyGroupsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: groups } = await supabase
    .from("study_groups")
    .select(`
      *,
      subjects(name),
      profiles(full_name),
      study_group_participants(count)
    `)
    .eq("status", "open")
    .order("scheduled_at", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-400 w-7 h-7" />
            กลุ่มติว
          </h1>
          <p className="text-slate-400 text-sm">เข้าร่วมกลุ่มติวหรือสร้างกลุ่มของคุณเอง</p>
        </div>
        <Link
          href="/dashboard/groups/create"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">สร้างกลุ่ม</span>
        </Link>
      </div>

      <div className="space-y-4">
        {groups && groups.length > 0 ? (
          groups.map((group: any) => (
            <Link
              key={group.id}
              href={`/dashboard/groups/${group.id}`}
              className="glass-card p-5 hover:border-emerald-500/50 transition-all block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{group.title}</h3>
                  {group.description && (
                    <p className="text-slate-400 text-sm mb-3">{group.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    {group.subjects && (
                      <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-1 rounded-lg">
                        {group.subjects.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(group.scheduled_at).toLocaleDateString('th-TH', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(group.scheduled_at).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      {group.meeting_type === 'online' ? (
                        <>
                          <Video className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">ออนไลน์</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-pink-400" />
                          <span className="text-pink-400">ในมหาลัย</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-white">
                    {group.study_group_participants?.[0]?.count || 0}/{group.max_participants}
                  </div>
                  <div className="text-xs text-slate-500">ผู้เข้าร่วม</div>
                </div>
              </div>
              {group.profiles && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-indigo-400">
                    {group.profiles.full_name?.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-400">จัดโดย {group.profiles.full_name}</span>
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="glass-card p-10 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">ยังไม่มีกลุ่มติวที่เปิด</p>
            <Link
              href="/dashboard/groups/create"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              สร้างกลุ่มแรกของคุณ →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
