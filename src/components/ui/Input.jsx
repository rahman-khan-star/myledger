import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({ label, error, icon: Icon, type = 'text', className = '', ...props }) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
        <input
          type={inputType}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${Icon ? 'pl-11' : ''} ${type === 'password' ? 'pr-11' : ''} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}`}
          {...props}
        />
        {type === 'password' && (
          <button type="button" onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600">
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}