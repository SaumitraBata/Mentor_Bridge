import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children, sidebarItems, userType }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} userType={userType} />
      <div className="flex-1 ml-64">
        <main className="p-8 page-transition">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;