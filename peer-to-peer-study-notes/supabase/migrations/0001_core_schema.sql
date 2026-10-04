-- ==========================================
-- 0001_core_schema.sql
-- Core Database Schema for NoteHub
-- ==========================================

-- 1. Faculties & Subjects
CREATE TABLE faculties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE
);

CREATE TABLE subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL
);

-- 2. User Profiles (Extends Supabase auth.users)
CREATE TYPE user_role AS ENUM ('student', 'admin');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  student_id TEXT UNIQUE,
  faculty_id UUID REFERENCES faculties(id),
  avatar_url TEXT,
  role user_role DEFAULT 'student',
  points INT DEFAULT 0,    -- สำหรับ Gamification/Level
  credits INT DEFAULT 0,   -- สกุลเงินสำหรับซื้อขาย
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tutor Profiles (1-to-1 with Profiles)
CREATE TYPE tutor_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

CREATE TABLE tutor_profiles (
  id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  status tutor_status DEFAULT 'pending',
  bio TEXT,
  transcript_url TEXT,
  avg_rating NUMERIC(3, 2) DEFAULT 0.00,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Study Notes
CREATE TYPE note_status AS ENUM ('active', 'flagged', 'hidden');

CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  price_credits INT DEFAULT 0, -- 0 = Free
  status note_status DEFAULT 'active',
  view_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  avg_rating NUMERIC(3, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Bookings (Tutor Sessions)
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'disputed');

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id),
  tutor_id UUID REFERENCES tutor_profiles(id),
  subject_id UUID REFERENCES subjects(id),
  status booking_status DEFAULT 'pending',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  price_credits INT NOT NULL,
  meeting_url TEXT, -- ลิงก์นัดหมายภายนอก (Google Meet) หรือสถานที่
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Transactions (Ledger for Points and Credits)
CREATE TYPE transaction_type AS ENUM ('credit', 'point');

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL, -- บวกหรือลบ
  type transaction_type NOT NULL,
  description TEXT NOT NULL,
  reference_id UUID, -- โยงไปหา Note หรือ Booking ID
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Reviews (Polymorphic for both Notes and Tutors)
CREATE TYPE review_target AS ENUM ('note', 'tutor');

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_type review_target NOT NULL,
  target_id UUID NOT NULL, -- ID ของ Note หรือ Tutor Profile
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
