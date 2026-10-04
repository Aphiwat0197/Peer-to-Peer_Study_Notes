"use client";

import { useState } from "react";
import { Edit, X, Save, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function EditProfileModal({ 
  userId, 
  currentName 
}: { 
  userId: string; 
  currentName: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    if (!name.trim()) {
      setError("กรุณากรอกชื่อ-นามสกุล");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // อัปเดตข้อมูลในตาราง profiles (ใช้ upsert เผื่อกรณีที่ตอนสมัคร trigger ไม่ทำงานแล้วไม่มีแถวข้อมูล)
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({ 
          id: userId, 
          full_name: name 
        }, { onConflict: 'id' });

      if (updateError) throw updateError;

      setIsOpen(false);
      router.refresh(); // รีเฟรชหน้าเว็บเพื่อดึงข้อมูลใหม่จาก Server
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm font-medium transition-colors bg-emerald-500/10 px-3 py-1.5 rounded-lg"
      >
        <Edit className="w-4 h-4" /> แก้ไขชื่อ
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">แก้ไขข้อมูลส่วนตัว</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start gap-2 mb-4 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">ชื่อ-นามสกุล</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="กรอกชื่อ-นามสกุลใหม่..."
                  className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-700 font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-900 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
                >
                  {loading ? "กำลังบันทึก..." : <><Save className="w-4 h-4" /> บันทึก</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
