import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, PlusCircle, Users, FileText, Settings, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { name:'Dashboard', href:'/dashboard', icon:LayoutDashboard },
  { name:'Add Entry', href:'/add-entry', icon:PlusCircle },
  { name:'Parties', href:'/parties', icon:Users },
  { name:'Reports', href:'/reports', icon:FileText },
  { name:'Settings', href:'/settings', icon:Settings },
];

export function MobileNav({ isOpen, onClose }) {
  const { logout, user } = useAuth();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl anim-slide-left">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">MyLedger</h1>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'admin@myledger.com'}</p>
            </div>
          </div>
        </div>
        <nav className="px-4 py-6 space-y-1">
          {nav.map(item => (
            <NavLink key={item.name} to={item.href} onClick={onClose}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => { logout(); onClose(); }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}