import { MessageSquare, Hammer } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center gap-6">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
        <MessageSquare className="w-10 h-10 text-sky-400" />
      </div>
      <h1 className="text-3xl font-bold text-white">ระบบแชทกำลังจะมา!</h1>
      <p className="text-slate-400 max-w-md">
        หน้านี้จะใช้สำหรับติดต่อสอบถามติวเตอร์หรือคุยเรื่องชีทสรุป 
        (อยู่ในระหว่างการพัฒนา)
      </p>
    </div>
  );
}
