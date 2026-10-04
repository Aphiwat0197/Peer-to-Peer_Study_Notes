import Link from "next/link";
import { BookOpen, Users, Award, Sparkles, Search, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section (เน้น Dark Theme + Green Accent) */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-24 flex flex-col items-center text-center">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-emerald-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>สังคมการเรียนรู้ของเด็ก KMUTNB</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
          แบ่งปันความรู้ สู่ความสำเร็จ <br />
          <span className="text-emerald-400">เพื่อนช่วยเพื่อน</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          แพลตฟอร์มแชร์ชีทสรุปและค้นหาติวเตอร์สำหรับนักศึกษา 
          แลกเปลี่ยนความรู้ สะสมแต้ม และสร้างรายได้จากสรุปของคุณ
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
            เข้าสู่ระบบ / เริ่มต้นฟรี
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="px-8 py-4 rounded-2xl glass-card text-white hover:bg-white/10 font-bold text-lg transition-all flex items-center justify-center">
            ดูฟีเจอร์หลัก
          </Link>
        </div>
      </section>

      {/* Features Section (30% White Cards for Contrast) */}
      <section id="features" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ฟีเจอร์เด่นของเรา</h2>
          <p className="text-slate-400">ทุกอย่างที่คุณต้องการ เพื่อการเรียนที่มีประสิทธิภาพมากขึ้น</p>
        </div>
        
        {/* Grid System: 3 คอลัมน์ รองรับ Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="white-card p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">โน้ตคุณภาพสูง</h3>
            <p className="text-slate-600 leading-relaxed">
              เข้าถึงสรุปบทเรียนและแนวข้อสอบจากเพื่อนร่วมสถาบัน อัปเดตใหม่เสมอ พร้อมระบบรีวิว
            </p>
          </div>

          {/* Card 2 */}
          <div className="white-card p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">แบ่งปันและสร้างรายได้</h3>
            <p className="text-slate-600 leading-relaxed">
              แชร์โน้ตของคุณเพื่อรับ Points อัปเลเวล หรือตั้งราคาเป็น Credits เพื่อนำไปใช้ต่อได้
            </p>
          </div>

          {/* Card 3 */}
          <div className="white-card p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">ติวเตอร์เพื่อนช่วยเพื่อน</h3>
            <p className="text-slate-600 leading-relaxed">
              ค้นหาติวเตอร์ที่เก่งในวิชาที่คุณต้องการ หรือสมัครเป็นติวเตอร์เพื่อหารายได้พิเศษ
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Search Bar Section */}
      <section className="container mx-auto px-4 mt-8">
        <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">ค้นหาวิชาที่ต้องการติว?</h2>
            <p className="text-emerald-100/70 mb-6">พิมพ์ชื่อวิชา รหัสวิชา หรือคณะ เพื่อดูโน้ตและติวเตอร์ที่มีอยู่</p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="เช่น Calculus I, 04011301..." 
                className="w-full bg-slate-900/50 border border-slate-600 text-white placeholder-slate-400 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>
          
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">1.2k+</div>
              <div className="text-sm text-slate-300">ชีทสรุป</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">350+</div>
              <div className="text-sm text-slate-300">ติวเตอร์</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
