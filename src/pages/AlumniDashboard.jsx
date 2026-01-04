import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Plus, Briefcase, MessageCircle, User, BarChart3 } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import CreateMentorshipSlot from './alumni/CreateMentorshipSlot';
import MySessions from './alumni/MySessions';
import PostOpportunity from './alumni/PostOpportunity';
import Messages from './alumni/Messages';
import AlumniProfile from './alumni/AlumniProfile';
import AnalyticsDashboard from './AnalyticsDashboard';

const AlumniDashboard = () => {
  const sidebarItems = [
    { path: '/alumni/analytics', label: 'Analytics Dashboard', icon: BarChart3 },
    { path: '/alumni/create-slot', label: 'Create Mentorship Slot', icon: Plus },
    { path: '/alumni/sessions', label: 'My Sessions', icon: Calendar },
    { path: '/alumni/post-opportunity', label: 'Post Opportunity', icon: Briefcase },
    { path: '/alumni/messages', label: 'Messages', icon: MessageCircle },
    { path: '/alumni/profile', label: 'Profile', icon: User },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="alumni">
      <Routes>
        <Route path="/" element={<Navigate to="/alumni/analytics" replace />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/create-slot" element={<CreateMentorshipSlot />} />
        <Route path="/sessions" element={<MySessions />} />
        <Route path="/post-opportunity" element={<PostOpportunity />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<AlumniProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AlumniDashboard;