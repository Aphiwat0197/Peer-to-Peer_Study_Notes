"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Refresh the router to clear server cache
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-pink-400 transition-colors mt-auto rounded-xl hover:bg-slate-800/50 w-full text-left"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">ออกจากระบบ</span>
    </button>
  );
}
