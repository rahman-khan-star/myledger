import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockEntries } from '../utils/data';

const COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444'];
const monthly = [
  {month:'Jan',income:280000,expense:95000},{month:'Feb',income:320000,expense:110000},{month:'Mar',income:295000,expense:88000},
  {month:'Apr',income:340000,expense:125000},{month:'May',income:380000,expense:140000},{month:'Jun',income:410000,expense:155000},
  {month:'Jul',income:357500,expense:125000},
];
const pie = [{name:'Income',value:357500},{name:'Expense',value:125000},{name:'Loans Given',value:175000},{name:'Repayments',value:89000}];

const Tip = ({active,payload,label}) => {
  if (!active||!payload?.length) return null;
  return <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100"><p className="font-medium text-gray-900 mb-1">{label}</p>{payload.map((e,i)=><p key={i} className="text-sm" style={{color:e.color}}>{e.name}: ₹{e.value.toLocaleString()}</p>)}</div>;
};

export default function Reports() {
  const [range, setRange] = useState('month');

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Analyze your financial data</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['week','month','year'].map(r => (
              <button key={r} onClick={()=>setRange(r)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${range===r?'bg-white text-gray-900 shadow-sm':'text-gray-500 hover:text-gray-700'}`}>
                {r[0].toUpperCase()+r.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="secondary"><Download className="h-4 w-4" />Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue Trend</CardTitle><span className="text-sm text-gray-500">Last 7 months</span></CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:12,fill:'#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:12,fill:'#9ca3af'}} tickFormatter={v=>`₹${v/1000}k`} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[6,6,0,0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Distribution</CardTitle></CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pie.map((_,i)=><Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={v=>`₹${v.toLocaleString()}`} contentStyle={{borderRadius:12,border:'none',boxShadow:'0 4px 24px -4px rgba(0,0,0,0.12)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pie.map((item,i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor:COLORS[i]}} /><span className="text-gray-600">{item.name}</span></div>
                <span className="font-medium text-gray-900">₹{(item.value/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{l:'Avg Monthly Income',v:'₹3.4L',ic:TrendingUp,c:'bg-emerald-50',tc:'text-emerald-500'},{l:'Avg Monthly Expense',v:'₹1.2L',ic:TrendingDown,c:'bg-red-50',tc:'text-red-500'},
          {l:'Total Transactions',v:mockEntries.length,ic:Calendar,c:'bg-indigo-50',tc:'text-indigo-500'},{l:'Growth Rate',v:'+15.3%',ic:TrendingUp,c:'bg-amber-50',tc:'text-amber-500'}
        ].map(s => (
          <Card key={s.l}>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${s.c}`}><s.ic className={`h-5 w-5 ${s.tc}`} /></div>
              <div><p className="text-sm text-gray-500">{s.l}</p><p className="text-xl font-bold text-gray-900">{s.v}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>All Transactions</CardTitle><span className="text-sm text-gray-500">{mockEntries.length} entries</span></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">
              {['Date','Party','Type','Description','Amount'].map(h => <th key={h} className={`py-3 px-4 text-sm font-medium text-gray-500 ${h==='Amount'?'text-right':'text-left'}`}>{h}</th>)}
            </tr></thead>
            <tbody>
              {mockEntries.map(e => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600">{e.date}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{e.partyName}</td>
                  <td className="py-4 px-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${e.type==='income'?'bg-emerald-50 text-emerald-700':e.type==='expense'?'bg-red-50 text-red-700':e.type==='loan_given'?'bg-amber-50 text-amber-700':'bg-indigo-50 text-indigo-700'}`}>{e.type.replace('_',' ')}</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">{e.description}</td>
                  <td className={`py-4 px-4 text-sm font-semibold text-right ${e.type==='income'||e.type==='loan_repayment'?'text-emerald-600':'text-red-600'}`}>
                    {e.type==='income'||e.type==='loan_repayment'?'+':'-'}₹{e.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}