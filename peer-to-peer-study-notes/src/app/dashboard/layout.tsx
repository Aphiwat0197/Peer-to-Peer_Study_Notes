import Link from "next/link";
import { Home, BookOpen, Users, MessageSquare, User, LogOut, Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 hidden md:flex flex-col border-r border-slate-700/50 bg-slate-900/50 p-4">
        {/* User Mini Profile */}
        <div className="glass-card p-4 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
            S
          </div>
          <div>
            <div className="text-sm font-bold text-white">Somchai K.</div>
            <div className="text-xs text-emerald-400">Lv.15 • 3,450 XP</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />} label="หน้าหลัก" active />
          <NavItem href="/dashboard/notes" icon={<BookOpen className="w-5 h-5" />} label="ชีทสรุปของฉัน" />
          <NavItem href="/dashboard/tutors" icon={<Users className="w-5 h-5" />} label="นัดหมายติว" />
          <NavItem href="/dashboard/chat" icon={<MessageSquare className="w-5 h-5" />} label="แชท" />
          <NavItem href="/dashboard/profile" icon={<User className="w-5 h-5" />} label="โปรไฟล์" />
        </nav>

        {/* Bottom Action */}
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-pink-400 transition-colors mt-auto rounded-xl hover:bg-slate-800/50">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">ออกจากระบบ</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900">
        {/* Mobile Header Top Bar (Visible only on mobile) */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
              S
            </div>
            <div>
              <div className="text-sm font-bold text-white">Somchai K.</div>
            </div>
          </div>
          <button className="p-2 bg-slate-800 rounded-full relative text-slate-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-800"></span>
          </button>
        </div>

        {children}
      </main>

      {/* Mobile Bottom Navigation (Visible only on mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex justify-around items-center px-2 z-50">
        <MobileNavItem href="/dashboard" icon={<Home className="w-6 h-6" />} label="หน้าหลัก" active />
        <MobileNavItem href="/dashboard/notes" icon={<BookOpen className="w-6 h-6" />} label="ชีทสรุป" />
        <MobileNavItem href="/dashboard/tutors" icon={<Users className="w-6 h-6" />} label="ติวเตอร์" />
        <MobileNavItem href="/dashboard/chat" icon={<MessageSquare className="w-6 h-6" />} label="แชท" />
        <MobileNavItem href="/dashboard/profile" icon={<User className="w-6 h-6" />} label="ฉัน" />
      </nav>
    </div>
  );
}

// Subcomponents for Repetition standard
function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? "bg-emerald-500/10 text-emerald-400 font-bold" 
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1 p-2 ${
      active ? "text-emerald-400" : "text-slate-500"
    }`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
