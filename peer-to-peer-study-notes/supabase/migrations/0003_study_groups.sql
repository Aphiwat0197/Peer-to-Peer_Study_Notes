-- สร้างตาราง study_groups สำหรับการจัดกลุ่มติว
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  tutor_id UUID REFERENCES tutor_profiles(id) ON DELETE SET NULL,
  max_participants INTEGER DEFAULT 10,
  meeting_type TEXT DEFAULT 'online',
  meet_url TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'open',
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- สร้างตาราง study_group_participants สำหรับผู้เข้าร่วมกลุ่ม
CREATE TABLE IF NOT EXISTS study_group_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- สร้างตาราง study_group_messages สำหรับแชตในกลุ่ม
CREATE TABLE IF NOT EXISTS study_group_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- สร้าง indexes
CREATE INDEX IF NOT EXISTS idx_study_groups_subject ON study_groups(subject_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_tutor ON study_groups(tutor_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_status ON study_groups(status);
CREATE INDEX IF NOT EXISTS idx_study_group_participants_group ON study_group_participants(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_messages_group ON study_group_messages(group_id);
