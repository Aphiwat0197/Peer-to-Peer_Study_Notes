import { Search, Star, Users, MapPin, ChevronRight } from "lucide-react";

export default function TutorsPage() {
  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-0">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Users className="text-pink-400 w-8 h-8" /> 
            ค้นหาติวเตอร์
          </h1>
          <p className="text-slate-400 mt-1">ค้นหาติวเตอร์ที่เก่งในวิชาที่คุณต้องการ</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] whitespace-nowrap">
          สมัครเป็นติวเตอร์
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="ค้นหาชื่อติวเตอร์ หรือวิชาที่ต้องการติว..."
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
        />
      </div>

      {/* Subject Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-400 font-medium whitespace-nowrap border border-pink-500/30">ทั้งหมด</button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">คณิตศาสตร์</button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">ฟิสิกส์</button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">ภาษาอังกฤษ</button>
        <button className="px-4 py-1.5 rounded-full glass-card text-slate-300 hover:text-white whitespace-nowrap">โปรแกรมมิ่ง</button>
      </div>

      {/* Tutor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TutorDetailCard name="พี่เอก วิศวะ" subject="Calculus I, II" rating="5.0" reviews={48} price="30" bio="เกรด A ทุกตัว พร้อมสอนตั้งแต่พื้นฐาน" />
        <TutorDetailCard name="พี่พลอย อักษร" subject="English, TOEIC" rating="4.9" reviews={32} price="25" bio="TOEIC 950 สอนสนุก เข้าใจง่าย" />
        <TutorDetailCard name="พี่เคน วิทย์" subject="Physics I, II" rating="4.8" reviews={27} price="35" bio="เคยเป็น TA ฟิสิกส์ 2 ปี" />
        <TutorDetailCard name="พี่เต๋อ CS" subject="Python, Database" rating="4.9" reviews={41} price="40" bio="Software Engineer สอนเขียนโปรแกรมตั้งแต่เริ่มต้น" />
        <TutorDetailCard name="พี่แนน เคมี" subject="Chemistry I" rating="4.7" reviews={19} price="20" bio="สอนเคมีให้เข้าใจง่าย เน้นสรุป" />
        <TutorDetailCard name="พี่บอส กลศาสตร์" subject="Statics, Dynamics" rating="4.8" reviews={23} price="35" bio="จบวิศวะเครื่องกล สอนละเอียดมาก" />
      </div>
    </div>
  );
}

function TutorDetailCard({ name, subject, rating, reviews, price, bio }: any) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 hover:bg-slate-800/80 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 shrink-0 flex items-center justify-center text-xl font-bold text-indigo-400">
          {name.charAt(0)}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-white text-lg truncate">{name}</h3>
          <p className="text-xs text-slate-400">{subject}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" /> {rating}
            </div>
            <span className="text-xs text-slate-500">({reviews} รีวิว)</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-300">{bio}</p>

      <div className="flex justify-between items-center border-t border-slate-700/50 pt-4">
        <div className="text-emerald-400 font-bold">{price} เครดิต / ชม.</div>
        <button className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 font-bold px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-1">
          จองเวลา <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
