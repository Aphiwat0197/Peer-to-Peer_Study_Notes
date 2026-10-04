import { BookOpen, Star, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 md:pb-0">
      
      {/* Welcome & Gamification Section (Proximity) */}
      <section className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
            สวัสดี, Somchai! <Sparkles className="text-yellow-400 w-6 h-6" />
          </h1>
          <p className="text-slate-400">มาเรียนรู้และแบ่งปันไปด้วยกันวันนี้</p>
        </div>
        
        {/* Credits & Points Badges */}
        <div className="flex gap-4">
          <div className="bg-slate-800/80 px-4 py-3 rounded-2xl flex flex-col items-center min-w-[100px]">
            <span className="text-xs text-slate-400 mb-1">เครดิต</span>
            <div className="text-xl font-bold text-emerald-400">125</div>
          </div>
          <div className="bg-slate-800/80 px-4 py-3 rounded-2xl flex flex-col items-center min-w-[100px]">
            <span className="text-xs text-slate-400 mb-1">แต้มสะสม</span>
            <div className="text-xl font-bold text-sky-400">3,450</div>
          </div>
        </div>
      </section>

      {/* Recent Notes (Visual Hierarchy & Grid) */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" /> ชีทสรุปล่าสุด
          </h2>
          <Link href="/dashboard/notes" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
            ดูทั้งหมด <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          <NoteCard 
            title="Calculus I: อนุพันธ์และการประยุกต์"
            subject="คณิตศาสตร์"
            rating="4.9"
            author="Nadech K."
            price="ฟรี"
            color="sky"
          />
          <NoteCard 
            title="Physics: กลศาสตร์ควอนตัมเบื้องต้น"
            subject="ฟิสิกส์"
            rating="4.8"
            author="Yaya U."
            price="5 เครดิต"
            color="emerald"
          />
          <NoteCard 
            title="Database Systems: ER Diagram"
            subject="วิทยาการคอมพิวเตอร์"
            rating="5.0"
            author="Mario M."
            price="10 เครดิต"
            color="pink"
          />
        </div>
      </section>

      {/* Top Tutors (Repetition & Grid) */}
      <section>
        <div className="flex justify-between items-end mb-4 mt-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-400" /> ติวเตอร์ยอดฮิต
          </h2>
          <Link href="/dashboard/tutors" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
            ดูทั้งหมด <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TutorCard name="พี่เอก" subject="คณิตศาสตร์" rating="5.0" />
          <TutorCard name="พี่พลอย" subject="ภาษาอังกฤษ" rating="4.9" />
          <TutorCard name="พี่เคน" subject="ฟิสิกส์" rating="4.8" />
          <TutorCard name="พี่เต๋อ" subject="โปรแกรมมิ่ง" rating="4.9" />
        </div>
      </section>

    </div>
  );
}

// --- Subcomponents ---

function NoteCard({ title, subject, rating, author, price, color }: any) {
  // Map color strings to Tailwind pastel classes
  const colorMap: Record<string, string> = {
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
    pink: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="white-card p-5 group cursor-pointer hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorMap[color]}`}>
          {subject}
        </span>
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
          <Star className="w-4 h-4 fill-yellow-500" />
          {rating}
        </div>
      </div>
      <h3 className="font-bold text-lg mb-4 line-clamp-2 leading-snug">{title}</h3>
      <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200" />
          <span className="text-xs text-slate-500 font-medium">{author}</span>
        </div>
        <span className={`text-sm font-bold ${price === 'ฟรี' ? 'text-emerald-500' : 'text-slate-700'}`}>
          {price}
        </span>
      </div>
    </div>
  );
}

function TutorCard({ name, subject, rating }: any) {
  return (
    <div className="glass-card p-4 flex flex-col items-center text-center cursor-pointer hover:bg-slate-800/80 transition-colors">
      <div className="w-20 h-20 rounded-full bg-indigo-500/20 mb-3 border-2 border-indigo-500/50" />
      <h3 className="font-bold text-white text-lg">{name}</h3>
      <p className="text-xs text-slate-400 mb-2">{subject}</p>
      <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm bg-slate-900/50 px-2 py-1 rounded-lg">
        <Star className="w-3 h-3 fill-yellow-400" />
        {rating}
      </div>
    </div>
  );
}
