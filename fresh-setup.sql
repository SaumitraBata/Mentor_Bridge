-- FRESH SETUP - Drops existing policies and recreates everything
-- Run this if you get "policy already exists" errors

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own student profile" ON student_profiles;
DROP POLICY IF EXISTS "Users can update own student profile" ON student_profiles;
DROP POLICY IF EXISTS "Users can insert own student profile" ON student_profiles;
DROP POLICY IF EXISTS "Everyone can view alumni profiles" ON alumni_profiles;
DROP POLICY IF EXISTS "Users can update own alumni profile" ON alumni_profiles;
DROP POLICY IF EXISTS "Users can insert own alumni profile" ON alumni_profiles;
DROP POLICY IF EXISTS "Everyone can view active slots" ON mentorship_slots;
DROP POLICY IF EXISTS "Alumni can manage own slots" ON mentorship_slots;
DROP POLICY IF EXISTS "Users can view own bookings" ON mentorship_bookings;
DROP POLICY IF EXISTS "Students can create bookings" ON mentorship_bookings;
DROP POLICY IF EXISTS "Everyone can view active opportunities" ON opportunities;
DROP POLICY IF EXISTS "Alumni can manage own opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "Users can view own matches" ON matches;
DROP POLICY IF EXISTS "System can create matches" ON matches;
DROP POLICY IF EXISTS "System can update matches" ON matches;

-- Create tables
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT,
  email TEXT,
  role TEXT CHECK (role IN ('student', 'alumni')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  university TEXT,
  year TEXT,
  major TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  company TEXT,
  title TEXT,
  experience TEXT,
  domain TEXT,
  skills TEXT[] DEFAULT '{}',
  expertise TEXT[] DEFAULT '{}',
  bio TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alumni_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 60,
  capacity INTEGER DEFAULT 1,
  topics TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES mentorship_slots(id) ON DELETE CASCADE,
  topic TEXT,
  message TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, slot_id)
);

CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alumni_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT NOT NULL,
  domain TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  application_link TEXT,
  deadline DATE,
  is_remote BOOLEAN DEFAULT false,
  salary TEXT,
  duration TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alumni_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  matching_skills TEXT[] DEFAULT '{}',
  matching_interests TEXT[] DEFAULT '{}',
  match_reasons TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, alumni_id)
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own student profile" ON student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own student profile" ON student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own student profile" ON student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view alumni profiles" ON alumni_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own alumni profile" ON alumni_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own alumni profile" ON alumni_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view active slots" ON mentorship_slots FOR SELECT USING (is_active = true);
CREATE POLICY "Alumni can manage own slots" ON mentorship_slots FOR ALL USING (auth.uid() = alumni_id);

CREATE POLICY "Users can view own bookings" ON mentorship_bookings FOR SELECT USING (auth.uid() = student_id OR auth.uid() IN (SELECT alumni_id FROM mentorship_slots WHERE id = slot_id));
CREATE POLICY "Students can create bookings" ON mentorship_bookings FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Everyone can view active opportunities" ON opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "Alumni can manage own opportunities" ON opportunities FOR ALL USING (auth.uid() = alumni_id);

CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view own matches" ON matches FOR SELECT USING (auth.uid() = student_id OR auth.uid() = alumni_id);
CREATE POLICY "System can create matches" ON matches FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update matches" ON matches FOR UPDATE USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_matches_student ON matches(student_id);
CREATE INDEX IF NOT EXISTS idx_matches_alumni ON matches(alumni_id);
CREATE INDEX IF NOT EXISTS idx_matches_score ON matches(match_score DESC);
