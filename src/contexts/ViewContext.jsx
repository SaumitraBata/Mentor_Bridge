import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ViewContext = createContext({});

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within ViewProvider');
  }
  return context;
};

export const ViewProvider = ({ children }) => {
  const { userRole } = useAuth();
  const [viewRole, setViewRole] = useState(null);

  // Initialize viewRole from localStorage or default to userRole
  useEffect(() => {
    if (userRole) {
      const savedViewRole = localStorage.getItem('viewRole');
      if (savedViewRole && (savedViewRole === 'student' || savedViewRole === 'alumni')) {
        setViewRole(savedViewRole);
      } else {
        setViewRole(userRole);
      }
    }
  }, [userRole]);

  // Save viewRole to localStorage when it changes
  useEffect(() => {
    if (viewRole) {
      localStorage.setItem('viewRole', viewRole);
    }
  }, [viewRole]);

  const switchView = () => {
    const newViewRole = viewRole === 'student' ? 'alumni' : 'student';
    setViewRole(newViewRole);
  };

  const resetView = () => {
    setViewRole(userRole);
    localStorage.removeItem('viewRole');
  };

  const value = {
    viewRole,
    switchView,
    resetView,
    isViewingSwitched: viewRole !== userRole
  };

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
};