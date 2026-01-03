-- Database Schema for Alumni Mentorship Portal
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- User profiles table (already exists from auth setup, but adding columns)
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS name TEXT;

-- Student profiles table
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

-- Alumni profiles table
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

-- Mentorship slots table
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

-- Mentorship bookings table
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

-- Opportunities table
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

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for student_profiles
CREATE POLICY "Users can view own student profile" ON student_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own student profile" ON student_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own student profile" ON student_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for alumni_profiles
CREATE POLICY "Everyone can view alumni profiles" ON alumni_profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own alumni profile" ON alumni_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own alumni profile" ON alumni_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for mentorship_slots
CREATE POLICY "Everyone can view active slots" ON mentorship_slots
  FOR SELECT USING (is_active = true);
CREATE POLICY "Alumni can manage own slots" ON mentorship_slots
  FOR ALL USING (auth.uid() = alumni_id);

-- RLS Policies for mentorship_bookings
CREATE POLICY "Users can view own bookings" ON mentorship_bookings
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() IN (
    SELECT alumni_id FROM mentorship_slots WHERE id = slot_id
  ));
CREATE POLICY "Students can create bookings" ON mentorship_bookings
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- RLS Policies for opportunities
CREATE POLICY "Everyone can view active opportunities" ON opportunities
  FOR SELECT USING (is_active = true);
CREATE POLICY "Alumni can manage own opportunities" ON opportunities
  FOR ALL USING (auth.uid() = alumni_id);

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);