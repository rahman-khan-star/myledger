import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Building2, User, ArrowUpRight, ArrowDownLeft, HandCoins, RefreshCw, Calendar } from 'lucide-react';
import { mockParties, mockEntries } from '../utils/data';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const iconFor = t => ({ income:ArrowUpRight, expense:ArrowDownLeft, loan_given:HandCoins, loan_repayment:RefreshCw }[t]||ArrowUpRight);
const colorFor = t => ({ income:'bg-emerald-100 text-emerald-600', expense:'bg-red-100 text-red-600', loan_given:'bg-amber-100 text-amber-600', loan_repayment:'bg-indigo-100 text-indigo-600' }[t]||'bg-gray-100 text-gray-600');
const labelFor = t => ({ income:'Income', expense:'Expense', loan_given:'Loan Given', loan_repayment:'Loan Repayment' }[t]||t);

export default function PartyDetail() {
  const { id } = useParams();
  const party = mockParties.find(p => p.id === parseInt(id));
  const entries = mockEntries.filter(e => e.partyId === parseInt(id));

  if (!party) return <div className="text-center py-12"><h2 className="text-xl font-semibold">Party not found</h2><Link to="/parties" className="mt-4 inline-block text-indigo-600">Back to parties</Link></div>;

  const totalInc = entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const totalExp = entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex items-center gap-4">
        <Link to="/parties" className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Party Details</h1>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${party.type==='business'?'bg-indigo-100 text-indigo-600':'bg-gray-100 text-gray-600'}`}>
            {party.type==='business'?<Building2 className="h-10 w-10"/>:<User className="h-10 w-10"/>}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{party.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <div className="flex items-center gap-1.5"><Phone className="h-4 w-4" />{party.phone}</div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${party.status==='active'?'bg-emerald-50 text-emerald-700':'bg-gray-100 text-gray-600'}`}>
                    {party.status==='active'?'Active':'Inactive'}
                  </span>
                </div>
              </div>
              <Link to="/add-entry"><Button>Add Entry</Button></Link>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className={`text-3xl font-bold mt-1 ${party.balance>0?'text-emerald-600':party.balance<0?'text-red-600':'text-gray-900'}`}>{party.balance>0?'+':''}₹{Math.abs(party.balance).toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">+₹{totalInc.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600 mt-1">-₹{totalExp.toLocaleString()}</p>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Transaction History</CardTitle><span className="text-sm text-gray-500">{entries.length} transactions</span></CardHeader>
        {entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map(e => {
              const Ic = iconFor(e.type);
              return (
                <div key={e.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${colorFor(e.type)}`}><Ic className="h-5 w-5" /></div>
                    <div>
                      <p className="font-medium text-gray-900">{e.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                        <span className="capitalize">{e.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${e.type==='income'||e.type==='loan_repayment'?'text-emerald-600':'text-red-600'}`}>
                      {e.type==='income'||e.type==='loan_repayment'?'+':'-'}₹{e.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{labelFor(e.type)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8"><p className="text-gray-500">No transactions yet</p></div>
        )}
      </Card>
    </div>
  );
}