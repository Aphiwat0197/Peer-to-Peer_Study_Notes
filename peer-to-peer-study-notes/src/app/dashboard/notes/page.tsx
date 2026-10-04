import { Search, Filter, BookOpen, Star, Download } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-0">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-sky-400 w-8 h-8" /> 
            คลังชีทสรุป
          </h1>
          <p className="text-slate-400 mt-1">ค้นหาและดาวน์โหลดชีทสรุปจากเพื่อนๆ ทุกคณะ</p>
        </div>
        
        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] whitespace-nowrap">
          + อัปโหลดชีทสรุป
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mt-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="ค้นหาชื่อวิชา, รหัสวิชา, หรือหัวข้อ..." 
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
          />
        </div>
        <button className="glass-card px-4 py-3 text-slate-300 hover:text-white transition-colors flex items-center justify-center">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium whitespace-nowrap border border-emerald-500/30">
          ทั้งหมด
        </button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">
          วิศวกรรมศาสตร์
        </button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">
          วิทยาศาสตร์ประยุกต์
        </button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">
          ครุศาสตร์อุตสาหกรรม
        </button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">
          บริหารธุรกิจ
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        <NoteCard 
          title="Calculus I: อนุพันธ์และการประยุกต์ (สรุปสอบ Midterm)"
          subject="คณิตศาสตร์"
          rating="4.9"
          author="Nadech K."
          price="ฟรี"
          color="sky"
          downloads={128}
        />
        <NoteCard 
          title="Physics: กลศาสตร์ควอนตัมเบื้องต้น"
          subject="ฟิสิกส์"
          rating="4.8"
          author="Yaya U."
          price="5 เครดิต"
          color="emerald"
          downloads={84}
        />
        <NoteCard 
          title="Database Systems: ER Diagram & Normalization"
          subject="วิทยาการคอมพิวเตอร์"
          rating="5.0"
          author="Mario M."
          price="10 เครดิต"
          color="pink"
          downloads={256}
        />
        <NoteCard 
          title="Thermodynamics: กฎข้อที่ 1 และ 2"
          subject="วิศวกรรมเครื่องกล"
          rating="4.7"
          author="Weir S."
          price="ฟรี"
          color="yellow"
          downloads={312}
        />
      </div>
    </div>
  );
}

// Subcomponent
function NoteCard({ title, subject, rating, author, price, color, downloads }: any) {
  const colorMap: Record<string, string> = {
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
    pink: "bg-pink-100 text-pink-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="white-card p-5 group flex flex-col h-full cursor-pointer hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorMap[color] || "bg-slate-100 text-slate-700"}`}>
          {subject}
        </span>
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
          <Star className="w-4 h-4 fill-yellow-500" />
          {rating}
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-2 line-clamp-3 leading-snug">{title}</h3>
      
      <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
        <Download className="w-3.5 h-3.5" />
        <span>ดาวน์โหลด {downloads} ครั้ง</span>
      </div>

      <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
            {author.charAt(0)}
          </div>
          <span className="text-sm text-slate-600 font-medium">{author}</span>
        </div>
        <span className={`text-sm font-bold px-2 py-1 rounded-lg ${price === 'ฟรี' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'}`}>
          {price}
        </span>
      </div>
    </div>
  );
}
