export function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  const vars = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-[0_4px_12px_-2px_rgba(99,102,241,0.5)] hover:shadow-[0_6px_16px_-2px_rgba(99,102,241,0.6)]',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
  };
  const sz = { sm:'px-3 py-1.5 text-sm gap-1.5', md:'px-4 py-2.5 text-sm gap-2', lg:'px-6 py-3 text-base gap-2.5' };
  return <button className={`${base} ${vars[variant]} ${sz[size]} ${className}`} disabled={disabled} {...props}>{children}</button>;
}