# 📚 Note TCT (Peer-to-Peer Study Notes)

แพลตฟอร์มแชร์ชีทสรุปและระบบติวเตอร์เพื่อนช่วยเพื่อน สำหรับนักศึกษา (ออกแบบเพื่อ KMUTNB) เน้นการแบ่งปันความรู้ สะสมแต้ม และสร้างรายได้พิเศษผ่านระบบเครดิต

---

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 + shadcn/ui
* **Icons:** Lucide React
* **Font:** Prompt (Google Fonts)
* **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)

---

## 🚀 Workflow การรันโปรเจกต์ (Getting Started)

### 1. การติดตั้ง (Installation)
ตรวจสอบให้แน่ใจว่าเครื่องของคุณมี **Node.js (v22+)** ติดตั้งอยู่
```bash
# เข้าสู่โฟลเดอร์โปรเจกต์
cd peer-to-peer-study-notes

# ติดตั้ง Dependencies
npm install
```

### 2. การตั้งค่า Environment (Environment Variables)
สร้างไฟล์ `.env.local` ในโฟลเดอร์รันโปรเจกต์ และใส่ค่าของ Supabase Project ของคุณ:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. การรันเซิร์ฟเวอร์จำลอง (Development)
```bash
npm run dev
```
เปิดเบราว์เซอร์และเข้าไปที่ [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design System & UI Standards
โปรเจกต์นี้ถูกออกแบบภายใต้ข้อกำหนด (Constraints) ดังนี้:

* **Theme Color:** Dark 70% (`slate-900`) / White 30% (`white-card`) / Primary Accent เป็นสีเขียว (`emerald-500`)
* **Vibe:** ทันสมัย, Pixar-inspired, Kawaii, มุมโค้งมน (Rounded shapes)
* **6 หลักการออกแบบที่บังคับใช้:**
  1. **Grid System:** ใช้ Tailwind Grid (`grid-cols-1 md:grid-cols-3`) เพื่อความมีระเบียบและ Responsive
  2. **Visual Hierarchy:** ลำดับความสำคัญด้วยขนาด Font และสี (เช่น ชื่อวิชาใหญ่กว่าชื่อคนเขียน)
  3. **Proximity:** จัดกลุ่มข้อมูลที่เกี่ยวข้องกันไว้ใกล้กัน (เช่น ดาวเรตติ้งอยู่ติดกับตัวเลขคะแนน)
  4. **Alignment:** จัดวางแนวข้อความและองค์ประกอบให้ตรงกัน
  5. **Repetition:** ใช้ Component ซ้ำๆ เช่น `<NoteCard />` หรือ `<TutorCard />` เพื่อให้หน้าตาเป็นมาตรฐาน
  6. **Contrast:** ใช้พื้นหลังสีเข้ม ตัดกับการ์ดสีขาว และปุ่มสีเขียว เพื่อเน้นจุด Call to Action

---

## 🗄️ Database & Domain Workflow
อ้างอิงจาก `GLOSSARY.md` และการตัดสินใจในรอบ Grilling Session:

1. **User & Tutor:** ใช้บัญชีผู้ใช้เดียวกัน (Single Account) โดยผู้ใช้สามารถเปิดโหมด "Tutor Profile" ได้หากต้องการสอน
2. **ระบบเศรษฐกิจ (Points vs Credits):**
   * **Points (แต้ม):** ได้จากการทำกิจกรรม (ล็อกอิน, อัปโหลดชีท) ใช้เพื่ออัปเลเวลและรับเหรียญตรา (Gamification)
   * **Credits (เครดิต):** ได้จากการขายชีท, รับติว, หรือเติมเงิน ใช้สำหรับซื้อชีทหรือจองติวเตอร์ (ห้ามนำแต้มมาแลกเครดิต)
3. **การเข้าถึงชีท (Note Access):** เมื่อใช้เครดิตซื้อแล้ว ผู้ใช้สามารถดาวน์โหลดเป็นไฟล์ PDF ลงเครื่องได้เลย (ลดความซับซ้อนของการทำ In-app viewer)
4. **การติว (Tutoring Session):** แพลตฟอร์มจะจัดการแค่เรื่องการจอง (Booking) และตัดเครดิต ส่วนการสอนจริงให้ติวเตอร์แปะลิงก์ภายนอก เช่น Google Meet หรือ MS Teams

---

## 📂 โครงสร้างโฟลเดอร์หลัก (Folder Structure)
```
peer-to-peer-study-notes/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # โครงสร้าง Layout หลัก + Font Prompt
│   │   ├── globals.css        # ตั้งค่า Design Tokens (สี, ความโค้ง)
│   │   ├── page.tsx           # หน้า Landing Page
│   │   └── dashboard/         # หน้าสำหรับผู้ใช้งานที่ล็อกอินแล้ว
│   └── components/            # UI Components ที่ใช้ซ้ำ (Cards, Buttons)
├── supabase/
│   └── migrations/            # SQL Scripts สำหรับสร้าง Database Schema
└── README.md                  # เอกสารนี้
```
