import { User, Mail, BookOpen, Award, Coins, Edit, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // ดึงข้อมูล Profile จริงจาก Database
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, faculties(name)")
    .eq("id", user!.id)
    .single();

  const fullName = profile?.full_name || "ผู้ใช้งาน";
  const email = user?.email || "-";
  const facultyName = (profile?.faculties as any)?.name || "ยังไม่ได้ระบุ";
  const initial = fullName.charAt(0).toUpperCase();
  const credits = profile?.credits || 0;
  const points = profile?.points || 0;
  const role = profile?.role || "student";
  const createdAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })
    : "-";

  return (
    <div className="flex flex-col gap-8 pb-20 md:pb-0 max-w-3xl mx-auto">
      
      {/* Profile Header Card */}
      <section className="glass-card p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-4xl font-bold text-slate-900 mb-4 shadow-lg">
          {initial}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{fullName}</h1>
        <p className="text-slate-400 text-sm mb-4">{email}</p>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            {role === "admin" ? "แอดมิน" : "นักศึกษา"}
          </span>
          <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
            เข้าร่วมเมื่อ {createdAt}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex gap-6 w-full justify-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-emerald-400">{credits}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1"><Coins className="w-3 h-3" /> เครดิต</div>
          </div>
          <div className="w-px bg-slate-700"></div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-sky-400">{points}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1"><Award className="w-3 h-3" /> แต้มสะสม</div>
          </div>
          <div className="w-px bg-slate-700"></div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-pink-400">Lv.1</div>
            <div className="text-xs text-slate-400">เลเวล</div>
          </div>
        </div>
      </section>

      {/* Profile Details Card */}
      <section className="glass-card p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">ข้อมูลส่วนตัว</h2>
          <button className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm font-medium">
            <Edit className="w-4 h-4" /> แก้ไข
          </button>
        </div>

        <div className="space-y-5">
          <ProfileRow icon={<User className="w-5 h-5 text-slate-500" />} label="ชื่อ-นามสกุล" value={fullName} />
          <ProfileRow icon={<Mail className="w-5 h-5 text-slate-500" />} label="อีเมล" value={email} />
          <ProfileRow icon={<BookOpen className="w-5 h-5 text-slate-500" />} label="คณะ" value={facultyName} />
        </div>
      </section>

      {/* Tutor Profile Section */}
      <section className="glass-card p-6 md:p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">สนใจเป็นติวเตอร์ไหม?</h2>
        <p className="text-slate-400 text-sm mb-6">เปิดโปรไฟล์ติวเตอร์เพื่อรับงานติวและสร้างรายได้พิเศษ</p>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
          สมัครเป็นติวเตอร์
        </button>
      </section>
    </div>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-700/50 last:border-b-0">
      {icon}
      <div className="flex-1">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-white font-medium">{value}</div>
      </div>
    </div>
  );
}
