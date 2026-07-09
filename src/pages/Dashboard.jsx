import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, HandCoins, RefreshCw, TrendingUp, TrendingDown, Plus, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockEntries } from '../utils/data';
import { WeeklyChart } from '../components/charts/WeeklyChart';

const stats = [
  { label:'Total Income', value:'₹3,57,500', change:'+12.5%', up:true, icon:ArrowUpRight, color:'bg-emerald-50 text-emerald-500' },
  { label:'Total Expenses', value:'₹1,25,000', change:'+8.2%', up:true, icon:ArrowDownLeft, color:'bg-red-50 text-red-500' },
  { label:'Loans Given', value:'₹1,75,000', change:'-3.1%', up:false, icon:HandCoins, color:'bg-amber-50 text-amber-500' },
  { label:'Repayments', value:'₹89,000', change:'+18.7%', up:true, icon:RefreshCw, color:'bg-indigo-50 text-indigo-500' },
];

export default function Dashboard() {
  const recent = mockEntries.slice(0, 5);

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your business finances</p>
        </div>
        <Link to="/add-entry"><Button><Plus className="h-5 w-5" />Add Entry</Button></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} hover className="anim-fade-up" style={{animationDelay:`${i*50}ms`}}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${s.color}`}><Icon className="h-5 w-5" /></div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {s.up ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                <span className={`text-sm font-medium ${s.up ? 'text-emerald-600' : 'text-red-600'}`}>{s.change}</span>
                <span className="text-sm text-gray-400">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Weekly Overview</CardTitle><span className="text-sm text-gray-500">This week</span></CardHeader>
          <WeeklyChart />
        </Card>
        <Card>
          <CardHeader><CardTitle>Net Balance</CardTitle></CardHeader>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-gray-900">₹1,28,000</p>
            <p className="text-sm text-emerald-600 mt-2 flex items-center justify-center gap-1"><TrendingUp className="h-4 w-4" />+15.3% from last month</p>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
              <span className="text-sm text-gray-600">Money In</span>
              <span className="font-semibold text-emerald-600">₹4,46,500</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50">
              <span className="text-sm text-gray-600">Money Out</span>
              <span className="font-semibold text-red-600">₹3,18,500</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <Link to="/reports" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">View all<ArrowRight className="h-4 w-4" /></Link>
        </CardHeader>
        <div className="space-y-3">
          {recent.map(e => (
            <div key={e.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${e.type==='income'?'bg-emerald-100 text-emerald-600':e.type==='expense'?'bg-red-100 text-red-600':e.type==='loan_given'?'bg-amber-100 text-amber-600':'bg-indigo-100 text-indigo-600'}`}>
                  {e.type==='income'?<ArrowUpRight className="h-5 w-5"/>:e.type==='expense'?<ArrowDownLeft className="h-5 w-5"/>:e.type==='loan_given'?<HandCoins className="h-5 w-5"/>:<RefreshCw className="h-5 w-5"/>}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{e.partyName}</p>
                  <p className="text-sm text-gray-500">{e.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${e.type==='income'||e.type==='loan_repayment'?'text-emerald-600':'text-red-600'}`}>
                  {e.type==='income'||e.type==='loan_repayment'?'+':'-'}₹{e.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{e.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}