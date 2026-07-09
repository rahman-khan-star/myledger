import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Users, FileText, Settings, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { name:'Dashboard', href:'/dashboard', icon:LayoutDashboard },
  { name:'Add Entry', href:'/add-entry', icon:PlusCircle },
  { name:'Parties', href:'/parties', icon:Users },
  { name:'Reports', href:'/reports', icon:FileText },
  { name:'Settings', href:'/settings', icon:Settings },
];

export function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-100">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Wallet className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">MyLedger</h1>
          <p className="text-xs text-gray-500">Business Manager</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {nav.map(item => (
          <NavLink key={item.name} to={item.href}
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}