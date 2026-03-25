import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col bg-panel-grid bg-[size:32px_32px]">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 xl:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
