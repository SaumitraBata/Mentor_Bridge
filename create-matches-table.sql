-- Add Matches Table for Smart Matching
-- Run this in Supabase SQL Editor

-- Create matches table
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
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own matches" ON matches
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = alumni_id);

CREATE POLICY "System can create matches" ON matches
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update matches" ON matches
  FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_matches_student ON matches(student_id);
CREATE INDEX IF NOT EXISTS idx_matches_alumni ON matches(alumni_id);
CREATE INDEX IF NOT EXISTS idx_matches_score ON matches(match_score DESC);

-- Function to calculate and store matches
CREATE OR REPLACE FUNCTION calculate_matches_for_student(p_student_id UUID)
RETURNS void AS $$
BEGIN
  -- Delete old matches for this student
  DELETE FROM matches WHERE student_id = p_student_id;
  
  -- Calculate and insert new matches
  INSERT INTO matches (student_id, alumni_id, match_score, matching_skills, matching_interests, match_reasons)
  SELECT 
    p_student_id,
    ap.user_id,
    LEAST(100, GREATEST(0, 
      -- Base score from matching skills
      (SELECT COUNT(*) * 15 FROM unnest(sp.skills) skill WHERE skill = ANY(ap.skills)) +
      -- Score from matching interests with domain
      (SELECT COUNT(*) * 10 FROM unnest(sp.interests) interest WHERE interest ILIKE '%' || ap.domain || '%') +
      -- Bonus for matching goals with expertise
      (SELECT COUNT(*) * 20 FROM unnest(sp.goals) goal WHERE goal = ANY(ap.expertise))
    )) as match_score,
    -- Matching skills
    (SELECT ARRAY_AGG(skill) FROM unnest(sp.skills) skill WHERE skill = ANY(ap.skills)),
    -- Matching interests
    (SELECT ARRAY_AGG(interest) FROM unnest(sp.interests) interest WHERE interest ILIKE '%' || ap.domain || '%'),
    -- Match reasons
    ARRAY[
      'Shared skills in ' || (SELECT string_agg(skill, ', ') FROM unnest(sp.skills) skill WHERE skill = ANY(ap.skills)),
      'Experience in ' || ap.domain,
      ap.experience || ' of industry experience'
    ]
  FROM student_profiles sp
  CROSS JOIN alumni_profiles ap
  WHERE sp.user_id = p_student_id
  AND (
    -- Has matching skills
    EXISTS (SELECT 1 FROM unnest(sp.skills) skill WHERE skill = ANY(ap.skills))
    OR
    -- Has matching interests/domain
    EXISTS (SELECT 1 FROM unnest(sp.interests) interest WHERE interest ILIKE '%' || ap.domain || '%')
    OR
    -- Has matching goals/expertise
    EXISTS (SELECT 1 FROM unnest(sp.goals) goal WHERE goal = ANY(ap.expertise))
  );
END;
$$ LANGUAGE plpgsql;
