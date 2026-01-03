import { NavLink } from 'react-router-dom';
import { ChevronRight, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useView } from '../contexts/ViewContext';
import { useToast } from './Toast';

const Sidebar = ({ items, userType }) => {
  const { signOut } = useAuth();
  const { viewRole, switchView, isViewingSwitched } = useView();
  const { addToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      addToast('Logged out successfully', 'success');
    } catch (error) {
      addToast('Error logging out', 'error');
    }
  };

  const handleSwitchView = () => {
    switchView();
    const newView = viewRole === 'student' ? 'Alumni' : 'Student';
    addToast(`Switched to ${newView} view`, 'info');
  };

  return (
    <div className="w-64 bg-card-bg shadow-soft h-screen fixed left-0 top-0 border-r border-border animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-text-primary">
            {userType === 'student' ? 'Student' : 'Alumni'} Dashboard
          </h2>
          <p className="text-sm text-text-muted mt-1 font-medium">
            {userType === 'student' ? 'Discover & Learn' : 'Mentor & Share'}
          </p>
        </div>
        {isViewingSwitched && (
          <div className="px-3 py-2 bg-warning/10 text-warning border border-warning/20 text-xs rounded-xl font-medium animate-scale-in">
            Viewing as {userType === 'student' ? 'Student' : 'Alumni'}
          </div>
        )}
      </div>
      
      <nav className="mt-2 px-3">
        {items.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between px-4 py-3 mb-1 text-sm font-medium rounded-xl transition-all duration-220 hover-lift animate-stagger ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20 shadow-soft'
                  : 'text-text-muted hover:bg-primary/5 hover:text-text-primary'
              }`
            }
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 transition-all duration-220 ${
                    isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-primary'
                  }`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all duration-220 ${
                  isActive ? 'text-accent opacity-100' : 'text-text-muted opacity-0 group-hover:opacity-100'
                }`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-3">
        <button
          onClick={handleSwitchView}
          title="Switch view to explore other role"
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/10 rounded-xl transition-all duration-220 border border-accent/20 hover-scale md:justify-start md:space-x-3"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden md:inline">Switch View</span>
          <span className="md:hidden">Switch</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-text-muted hover:bg-primary/5 hover:text-text-primary rounded-xl transition-all duration-220 hover-scale"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
        
        <div className="text-xs text-text-muted text-center pt-2">
          <p className="font-medium">AlumBridge</p>
          <p className="mt-1 opacity-75">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;