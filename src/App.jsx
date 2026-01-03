import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ViewProvider } from './contexts/ViewContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UnifiedDashboard from './pages/UnifiedDashboard';
import OpportunityFeed from './pages/OpportunityFeed';
import SmartMatchmaking from './pages/SmartMatchmaking';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <UnifiedDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/opportunities" element={
        <ProtectedRoute>
          <OpportunityFeed />
        </ProtectedRoute>
      } />
      
      <Route path="/matchmaking" element={
        <ProtectedRoute requiredRole="student">
          <SmartMatchmaking />
        </ProtectedRoute>
      } />
    </Routes>
  );
};



function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ViewProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <AppRoutes />
            </div>
          </Router>
        </ViewProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;