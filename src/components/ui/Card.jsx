export function Card({ children, className = '', hover = false, ...props }) {
  return <div className={`bg-white rounded-2xl p-6 card ${hover ? 'card-hover' : ''} ${className}`} {...props}>{children}</div>;
}
export function CardHeader({ children, className = '' }) {
  return <div className={`flex items-center justify-between mb-6 ${className}`}>{children}</div>;
}
export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
}