import { MessageSquare, Search, Send } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-sky-400 w-7 h-7" /> 
          แชท
        </h1>
        <p className="text-slate-400 text-sm">พูดคุยกับติวเตอร์หรือเพื่อนร่วมวิชา</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Chat List (Sidebar) */}
        <div className="w-72 hidden md:flex flex-col glass-card overflow-hidden">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input type="text" placeholder="ค้นหาแชท..." className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-sky-400 transition-colors" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ChatListItem name="พี่เอก วิศวะ" message="เดี๋ยวส่งลิงก์ Meet ให้นะ" time="10:30" unread={2} />
            <ChatListItem name="พี่พลอย อักษร" message="สอบเป็นยังไงบ้างคะ?" time="09:15" />
            <ChatListItem name="กลุ่ม Calculus Midterm" message="มีใครมีชีทบทที่ 5 มั้ย" time="เมื่อวาน" />
            <ChatListItem name="พี่เต๋อ CS" message="OK ครับ จะส่ง Code ให้ดู" time="2 วัน" />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 glass-card flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center font-bold text-indigo-400 shrink-0">เ</div>
            <div>
              <div className="font-bold text-white">พี่เอก วิศวะ</div>
              <div className="text-xs text-emerald-400">ออนไลน์</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-start">
              <div className="bg-slate-800 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[75%]">
                <p className="text-sm">สวัสดีครับ สนใจติว Calculus I เรื่องอนุพันธ์ครับ</p>
                <span className="text-[10px] text-slate-500 mt-1 block">10:28</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
                <p className="text-sm">ได้ครับ ว่างวันพุธ 14:00 - 16:00 นะครับ</p>
                <span className="text-[10px] text-emerald-200 mt-1 block">10:29</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-800 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[75%]">
                <p className="text-sm">โอเคครับ จะจองเวลานั้นเลย</p>
                <span className="text-[10px] text-slate-500 mt-1 block">10:30</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
                <p className="text-sm">เดี๋ยวส่งลิงก์ Meet ให้นะครับ 🎉</p>
                <span className="text-[10px] text-emerald-200 mt-1 block">10:30</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex gap-3">
              <input type="text" placeholder="พิมพ์ข้อความ..." className="flex-1 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl px-4 py-3 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatListItem({ name, message, time, unread }: { name: string; message: string; time: string; unread?: number }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-700/30">
      <div className="w-10 h-10 rounded-full bg-slate-700 shrink-0 flex items-center justify-center font-bold text-slate-300 text-sm">{name.charAt(0)}</div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="font-bold text-white text-sm truncate">{name}</span>
          <span className="text-[10px] text-slate-500 shrink-0 ml-2">{time}</span>
        </div>
        <p className="text-xs text-slate-400 truncate">{message}</p>
      </div>
      {unread && (
        <span className="bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">{unread}</span>
      )}
    </div>
  );
}
