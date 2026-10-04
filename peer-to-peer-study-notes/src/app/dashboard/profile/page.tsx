import { User, Hammer } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center gap-6">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
        <User className="w-10 h-10 text-pink-400" />
      </div>
      <h1 className="text-3xl font-bold text-white">โปรไฟล์ของคุณ</h1>
      <p className="text-slate-400 max-w-md">
        จัดการข้อมูลส่วนตัว ดูประวัติการโหลดชีท และตั้งค่าบัญชีติวเตอร์ของคุณได้ที่นี่ 
        (อยู่ในระหว่างการพัฒนา)
      </p>
    </div>
  );
}
