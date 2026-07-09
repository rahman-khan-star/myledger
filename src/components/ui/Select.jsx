import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function Select({ label, options, value, onChange, placeholder = 'Select an option', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div ref={ref} className="relative">
        <button type="button" onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${open ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}>
          <span className={selected ? 'text-gray-900' : 'text-gray-400'}>{selected ? selected.label : placeholder}</span>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden anim-scale-in">
            <div className="max-h-60 overflow-y-auto">
              {options.map(opt => (
                <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${value === opt.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'} ${opt.highlight ? 'text-indigo-600 font-medium' : ''}`}>
                  <span>{opt.label}</span>
                  {value === opt.value && <Check className="h-5 w-5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}