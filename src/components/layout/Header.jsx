import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MobileNav } from './MobileNav';

export function Header() {
  const { user } = useAuth();
  const [mobOpen, setMobOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => setMobOpen(true)} className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Search transactions, parties..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobOpen} onClose={() => setMobOpen(false)} />
    </>
  );
}