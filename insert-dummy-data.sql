-- Add Dummy Mentors - Simple Approach
-- Run this in your Supabase SQL Editor

-- Temporarily disable foreign key constraint
ALTER TABLE alumni_profiles DROP CONSTRAINT IF EXISTS alumni_profiles_user_id_fkey;
ALTER TABLE mentorship_slots DROP CONSTRAINT IF EXISTS mentorship_slots_alumni_id_fkey;
ALTER TABLE opportunities DROP CONSTRAINT IF EXISTS opportunities_alumni_id_fkey;

-- Insert dummy mentors
DO $$
DECLARE
  mentor1_id UUID := gen_random_uuid();
  mentor2_id UUID := gen_random_uuid();
  mentor3_id UUID := gen_random_uuid();
  mentor4_id UUID := gen_random_uuid();
  mentor5_id UUID := gen_random_uuid();
BEGIN
  -- Insert alumni profiles
  INSERT INTO alumni_profiles (user_id, company, title, experience, domain, skills, expertise, bio, linkedin) VALUES
  (mentor1_id, 'Google', 'Senior Software Engineer', '8 years', 'Software Engineering', 
   ARRAY['React', 'Node.js', 'Python', 'AWS', 'System Design'], 
   ARRAY['Web Development', 'Cloud Architecture'], 
   'Passionate about building scalable systems and mentoring the next generation of engineers.', 
   'https://linkedin.com/in/johndoe'),
  
  (mentor2_id, 'Microsoft', 'Product Manager', '6 years', 'Product Management', 
   ARRAY['Product Strategy', 'Agile', 'Data Analysis', 'User Research'], 
   ARRAY['Product Development', 'Team Leadership'], 
   'Experienced PM helping students navigate tech careers and product thinking.', 
   'https://linkedin.com/in/sarahchen'),
  
  (mentor3_id, 'Amazon', 'Data Scientist', '5 years', 'Data Science', 
   ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'], 
   ARRAY['ML Engineering', 'Data Analytics'], 
   'Data scientist passionate about AI/ML and helping students break into data careers.', 
   'https://linkedin.com/in/mikejohnson'),
  
  (mentor4_id, 'Meta', 'Frontend Engineer', '4 years', 'Software Engineering', 
   ARRAY['JavaScript', 'React', 'TypeScript', 'CSS', 'GraphQL'], 
   ARRAY['UI/UX Development', 'Performance Optimization'], 
   'Frontend specialist who loves creating beautiful user experiences.', 
   'https://linkedin.com/in/emilyrodriguez'),
  
  (mentor5_id, 'Apple', 'iOS Developer', '7 years', 'Mobile Development', 
   ARRAY['Swift', 'iOS', 'UIKit', 'SwiftUI', 'Xcode'], 
   ARRAY['Mobile Apps', 'iOS Development'], 
   'iOS developer with a passion for creating delightful mobile experiences.', 
   'https://linkedin.com/in/davidlee');

  -- Insert mentorship slots
  INSERT INTO mentorship_slots (alumni_id, title, description, date, time, duration, topics, is_active) VALUES
  (mentor1_id, 'Web Development Career Chat', 'Discuss web development career paths and technologies', CURRENT_DATE + 5, '18:00:00', 60, ARRAY['Career Advice', 'Web Development'], true),
  (mentor1_id, 'System Design Basics', 'Learn fundamentals of system design', CURRENT_DATE + 12, '19:00:00', 60, ARRAY['System Design', 'Technical Skills'], true),
  (mentor2_id, 'Product Management 101', 'Introduction to product management', CURRENT_DATE + 7, '17:00:00', 60, ARRAY['Product Management', 'Career Advice'], true),
  (mentor3_id, 'Data Science Career Path', 'Breaking into data science', CURRENT_DATE + 10, '18:30:00', 60, ARRAY['Data Science', 'Career Advice'], true),
  (mentor4_id, 'Frontend Interview Prep', 'Prepare for frontend interviews', CURRENT_DATE + 8, '19:00:00', 60, ARRAY['Interview Prep', 'Frontend'], true),
  (mentor5_id, 'iOS Development Tips', 'iOS development best practices', CURRENT_DATE + 15, '18:00:00', 60, ARRAY['Mobile Development', 'iOS'], true);

  -- Insert opportunities
  INSERT INTO opportunities (alumni_id, title, company, type, domain, location, description, requirements, application_link, deadline, is_remote, is_active) VALUES
  (mentor1_id, 'Software Engineering Intern', 'Google', 'Internship', 'Software Engineering', 'Mountain View, CA', 
   'Join our team as a software engineering intern and work on cutting-edge projects.', 
   ARRAY['CS student', 'Strong programming skills', 'Problem solving'], 
   'https://careers.google.com/apply', CURRENT_DATE + 60, false, true),
  
  (mentor2_id, 'Product Management Intern', 'Microsoft', 'Internship', 'Product Management', 'Redmond, WA', 
   'Learn product management from industry leaders.', 
   ARRAY['Business or CS background', 'Analytical skills', 'Communication'], 
   'https://careers.microsoft.com/apply', CURRENT_DATE + 45, false, true),
  
  (mentor3_id, 'Data Science Intern', 'Amazon', 'Internship', 'Data Science', 'Seattle, WA', 
   'Work with big data and machine learning at scale.', 
   ARRAY['Python', 'Statistics', 'ML knowledge'], 
   'https://amazon.jobs/apply', CURRENT_DATE + 50, true, true),
  
  (mentor4_id, 'Frontend Developer', 'Meta', 'Full-time', 'Software Engineering', 'Menlo Park, CA', 
   'Build the next generation of social experiences.', 
   ARRAY['React', 'JavaScript', '2+ years experience'], 
   'https://metacareers.com/apply', CURRENT_DATE + 30, false, true);

END $$;

-- Re-enable foreign key constraints (optional - only if you want to enforce them later)
-- ALTER TABLE alumni_profiles ADD CONSTRAINT alumni_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE mentorship_slots ADD CONSTRAINT mentorship_slots_alumni_id_fkey FOREIGN KEY (alumni_id) REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE opportunities ADD CONSTRAINT opportunities_alumni_id_fkey FOREIGN KEY (alumni_id) REFERENCES auth.users(id) ON DELETE CASCADE;
