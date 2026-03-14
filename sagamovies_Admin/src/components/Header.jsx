import { Menu } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between h-16 px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">Welcome, Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;