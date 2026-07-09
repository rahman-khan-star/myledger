import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { weeklyData } from '../../utils/data';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
      <p className="font-medium text-gray-900 mb-1">{label}</p>
      {payload.map((e, i) => <p key={i} className="text-sm" style={{color:e.color}}>{e.name}: ₹{e.value.toLocaleString()}</p>)}
    </div>
  );
};

export function WeeklyChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize:12,fill:'#9ca3af'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize:12,fill:'#9ca3af'}} tickFormatter={v=>`₹${v/1000}k`} />
          <Tooltip content={<Tip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{paddingTop:'20px'}} />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[6,6,0,0]} maxBarSize={40} />
          <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6,6,0,0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}