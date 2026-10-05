import Link from "next/link";
import { redirect } from "next/navigation";
import { Home, BookOpen, Users, MessageSquare, User, Bell, UsersRound } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  
  // เช็คว่าล็อกอินหรือยัง
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // ดึงข้อมูล Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || "ผู้ใช้งาน";
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 hidden md:flex flex-col border-r border-slate-700/50 bg-slate-900/50 p-4">
        {/* User Mini Profile */}
        <div className="glass-card p-4 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 shrink-0">
            {initial}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">{fullName}</div>
            <div className="text-xs text-emerald-400">Lv.1 • {profile?.points || 0} XP</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />} label="หน้าหลัก" />
          <NavItem href="/dashboard/notes" icon={<BookOpen className="w-5 h-5" />} label="ชีทสรุปของฉัน" />
          <NavItem href="/dashboard/tutors" icon={<Users className="w-5 h-5" />} label="นัดหมายติว" />
          <NavItem href="/dashboard/groups" icon={<UsersRound className="w-5 h-5" />} label="กลุ่มติว" />
          <NavItem href="/dashboard/chat" icon={<MessageSquare className="w-5 h-5" />} label="แชท" />
          <NavItem href="/dashboard/profile" icon={<User className="w-5 h-5" />} label="โปรไฟล์" />
        </nav>

        {/* Bottom Action */}
        <LogoutButton />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900">
        {/* Mobile Header Top Bar */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
              {initial}
            </div>
            <div>
              <div className="text-sm font-bold text-white truncate max-w-[150px]">{fullName}</div>
            </div>
          </div>
          <button className="p-2 bg-slate-800 rounded-full relative text-slate-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-800"></span>
          </button>
        </div>

        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex justify-around items-center px-2 z-50">
        <MobileNavItem href="/dashboard" icon={<Home className="w-6 h-6" />} label="หลัก" />
        <MobileNavItem href="/dashboard/notes" icon={<BookOpen className="w-6 h-6" />} label="ชีทสรุป" />
        <MobileNavItem href="/dashboard/tutors" icon={<Users className="w-6 h-6" />} label="ติวเตอร์" />
        <MobileNavItem href="/dashboard/groups" icon={<UsersRound className="w-6 h-6" />} label="กลุ่มติว" />
        <MobileNavItem href="/dashboard/chat" icon={<MessageSquare className="w-6 h-6" />} label="แชท" />
        <MobileNavItem href="/dashboard/profile" icon={<User className="w-6 h-6" />} label="โปรไฟล์" />
      </nav>
    </div>
  );
}

// Subcomponents
function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-slate-800/50 hover:text-slate-200">
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-emerald-400">
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}

