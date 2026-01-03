import { Routes, Route } from 'react-router-dom';
import { useView } from '../contexts/ViewContext';
import DashboardLayout from '../layouts/DashboardLayout';

// Student Components
import RecommendedMentors from './student/RecommendedMentors';
import BookedSessions from './student/BookedSessions';
import StudentMessages from './student/Messages';
import StudentProfile from './student/StudentProfile';

// Alumni Components  
import CreateMentorshipSlot from './alumni/CreateMentorshipSlot';
import MySessions from './alumni/MySessions';
import PostOpportunity from './alumni/PostOpportunity';
import AlumniMessages from './alumni/Messages';
import AlumniProfile from './alumni/AlumniProfile';

// Icons
import { Users, Calendar, MessageCircle, User, Plus, Briefcase } from 'lucide-react';

const UnifiedDashboard = () => {
  const { viewRole } = useView();

  // Define sidebar items based on viewRole
  const studentSidebarItems = [
    { path: '/dashboard', label: 'Recommended Mentors', icon: Users },
    { path: '/dashboard/sessions', label: 'Booked Sessions', icon: Calendar },
    { path: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const alumniSidebarItems = [
    { path: '/dashboard', label: 'Create Mentorship Slot', icon: Plus },
    { path: '/dashboard/sessions', label: 'My Sessions', icon: Calendar },
    { path: '/dashboard/opportunities', label: 'Post Opportunity', icon: Briefcase },
    { path: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const sidebarItems = viewRole === 'student' ? studentSidebarItems : alumniSidebarItems;

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType={viewRole}>
      <Routes>
        {viewRole === 'student' ? (
          <>
            <Route path="/" element={<RecommendedMentors />} />
            <Route path="/sessions" element={<BookedSessions />} />
            <Route path="/messages" element={<StudentMessages />} />
            <Route path="/profile" element={<StudentProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<CreateMentorshipSlot />} />
            <Route path="/sessions" element={<MySessions />} />
            <Route path="/opportunities" element={<PostOpportunity />} />
            <Route path="/messages" element={<AlumniMessages />} />
            <Route path="/profile" element={<AlumniProfile />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default UnifiedDashboard;