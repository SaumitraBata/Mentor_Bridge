-- Create Student Profile for Current User
-- First, find your user_id by running:
SELECT user_id, email FROM user_profiles WHERE role = 'student';

-- Then insert a student profile (replace the user_id with yours from above query)
-- INSERT INTO student_profiles (user_id, skills, interests, goals, university, year, major) 
-- VALUES (
--   'YOUR_USER_ID_HERE',
--   ARRAY['JavaScript', 'Python', 'React'],
--   ARRAY['Web Development', 'Software Engineering'],
--   ARRAY['Get internship', 'Learn new skills'],
--   'Tech University',
--   'Junior',
--   'Computer Science'
-- );

-- OR use this to auto-create for all students without profiles:
INSERT INTO student_profiles (user_id, skills, interests, goals, university, year, major)
SELECT 
  user_id,
  ARRAY['JavaScript', 'Python', 'React'],
  ARRAY['Web Development', 'Software Engineering'],
  ARRAY['Get internship', 'Learn new skills'],
  'Tech University',
  'Junior',
  'Computer Science'
FROM user_profiles
WHERE role = 'student' 
AND user_id NOT IN (SELECT user_id FROM student_profiles);
