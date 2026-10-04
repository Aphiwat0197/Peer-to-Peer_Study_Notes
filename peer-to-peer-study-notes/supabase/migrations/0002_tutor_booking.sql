-- อัปเดตตาราง tutor_profiles เพิ่มคอลัมน์วิชา, วันที่ว่าง, เวลา
ALTER TABLE tutor_profiles ADD COLUMN IF NOT EXISTS teaching_subjects TEXT[] DEFAULT '{}';
ALTER TABLE tutor_profiles ADD COLUMN IF NOT EXISTS available_days TEXT[] DEFAULT '{}';
ALTER TABLE tutor_profiles ADD COLUMN IF NOT EXISTS time_start TEXT DEFAULT '09:00';
ALTER TABLE tutor_profiles ADD COLUMN IF NOT EXISTS time_end TEXT DEFAULT '17:00';

-- สร้างตาราง bookings สำหรับจองเวลาติว
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES tutor_profiles(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  meeting_type TEXT DEFAULT 'online',
  note TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
