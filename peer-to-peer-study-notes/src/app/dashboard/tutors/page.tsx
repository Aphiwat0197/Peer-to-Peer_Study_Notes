import { Users, Hammer } from "lucide-react";

export default function TutorsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center gap-6">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
        <Hammer className="w-10 h-10 text-emerald-400" />
      </div>
      <h1 className="text-3xl font-bold text-white">หน้านี้กำลังอยู่ระหว่างการพัฒนา</h1>
      <p className="text-slate-400 max-w-md">
        ระบบ "ติวเตอร์เพื่อนช่วยเพื่อน" (Tutors) กำลังถูกสร้างขึ้นในเฟสถัดไป 
        คุณจะสามารถค้นหาและจองเวลาติวเตอร์ได้ที่นี่เร็วๆ นี้!
      </p>
    </div>
  );
}
