import { Routes, Route, Navigate } from 'react-router-dom';
import { Users, Calendar, Briefcase, MessageCircle, User, Target } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import RecommendedMentors from './student/RecommendedMentors';
import BookedSessions from './student/BookedSessions';
import OpportunityFeed from './student/OpportunityFeed';
import Messages from './student/Messages';
import StudentProfile from './student/StudentProfile';

const StudentDashboard = () => {
  const sidebarItems = [
    { path: '/student/mentors', label: 'Recommended Mentors', icon: Users },
    { path: '/student/sessions', label: 'Booked Sessions', icon: Calendar },
    { path: '/student/opportunities', label: 'Opportunity Feed', icon: Briefcase },
    { path: '/student/messages', label: 'Messages', icon: MessageCircle },
    { path: '/student/profile', label: 'Profile', icon: User },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="student">
      <Routes>
        <Route path="/" element={<Navigate to="/student/mentors" replace />} />
        <Route path="/mentors" element={<RecommendedMentors />} />
        <Route path="/sessions" element={<BookedSessions />} />
        <Route path="/opportunities" element={<OpportunityFeed />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;