-- Verify Dummy Data
-- Run this to check if data was inserted

-- Check alumni profiles
SELECT COUNT(*) as alumni_count FROM alumni_profiles;
SELECT company, title FROM alumni_profiles LIMIT 5;

-- Check mentorship slots
SELECT COUNT(*) as slots_count FROM mentorship_slots;

-- Check opportunities
SELECT COUNT(*) as opportunities_count FROM opportunities;

-- Check if you have a student profile
SELECT * FROM student_profiles;

-- If no student profile exists, create one for your user
-- Replace 'YOUR_USER_ID' with your actual user_id from user_profiles
-- INSERT INTO student_profiles (user_id, skills, interests, goals) 
-- VALUES ('YOUR_USER_ID', ARRAY['JavaScript', 'React'], ARRAY['Web Development'], ARRAY['Get internship']);
