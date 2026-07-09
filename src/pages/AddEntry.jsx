import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus, Check, ArrowUpRight, ArrowDownLeft, HandCoins, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockParties } from '../utils/data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';

const types = [
  { value:'income', label:'Income', icon:ArrowUpRight, color:'text-emerald-500' },
  { value:'expense', label:'Expense', icon:ArrowDownLeft, color:'text-red-500' },
  { value:'loan_given', label:'Loan Given', icon:HandCoins, color:'text-amber-500' },
  { value:'loan_repayment', label:'Loan Repayment', icon:RefreshCw, color:'text-indigo-500' },
];
const methods = [
  { value:'cash', label:'Cash' },
  { value:'bank', label:'Bank Transfer' },
  { value:'online', label:'Online Payment' },
];

export default function AddEntry() {
  const { user } = useAuth();
  const [selType, setSelType] = useState('income');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [partyId, setPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [method, setMethod] = useState('bank');
  const [ok, setOk] = useState(false);
  const [partyModal, setPartyModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [parties, setParties] = useState(mockParties);

  const partyOpts = [{ value:'add_new', label:'+ Add New Party', highlight:true }, ...parties.map(p => ({ value:p.id.toString(), label:p.name }))];

  const onPartyChange = v => { if (v === 'add_new') setPartyModal(true); else setPartyId(v); };

  const addParty = e => {
    e.preventDefault();
    if (!newName) return;
    const np = { id: parties.length+1, name:newName, phone:newPhone, type:'individual', balance:0, status:'active' };
    setParties([...parties, np]);
    setPartyId(np.id.toString());
    setNewName(''); setNewPhone(''); setPartyModal(false);
  };

  const submit = e => {
    e.preventDefault();
    setOk(true);
    setTimeout(() => { setOk(false); setAmount(''); setDesc(''); }, 2000);
  };

  const t = types.find(x => x.value === selType);
  const TypeIcon = t.icon;

  return (
    <div className="max-w-2xl mx-auto space-y-6 anim-fade-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Entry</h1>
        <p className="text-gray-500 mt-1">Record a new transaction or ledger entry</p>
      </div>

      <Card>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Entry Type</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {types.map(tp => {
              const Ic = tp.icon;
              return (
                <button key={tp.value} onClick={() => setSelType(tp.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${selType===tp.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                  <Ic className={`h-6 w-6 ${selType===tp.value ? 'text-indigo-600' : tp.color}`} />
                  <span className={`text-sm font-medium ${selType===tp.value ? 'text-indigo-700' : 'text-gray-700'}`}>{tp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Date" type="date" icon={Calendar} value={date} onChange={e => setDate(e.target.value)} />
            <Select label="Party / Person" options={partyOpts} value={partyId} onChange={onPartyChange} placeholder="Select a party" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-300" />
              </div>
            </div>
            <Select label="Payment Method" options={methods} value={method} onChange={setMethod} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Description / Notes</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Add a note about this entry..." rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-300 resize-none" />
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-700 font-semibold text-sm">{user?.name?.charAt(0)||'A'}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Added by</p>
                <p className="text-sm text-gray-500">{user?.name||'Admin User'}</p>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg"><Plus className="h-5 w-5" />Add Entry</Button>
        </form>
      </Card>

      <Modal isOpen={partyModal} onClose={() => setPartyModal(false)} title="Add New Party">
        <form onSubmit={addParty} className="space-y-4">
          <Input label="Party Name" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Enter party name" required />
          <Input label="Phone Number" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="+91 98765 43210" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setPartyModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1"><Check className="h-5 w-5" />Add Party</Button>
          </div>
        </form>
      </Modal>

      {ok && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-80 p-4 bg-emerald-500 text-white rounded-xl shadow-lg anim-slide-up z-50">
          <div className="flex items-center gap-3"><Check className="h-5 w-5" /><span className="font-medium">Entry added successfully!</span></div>
        </div>
      )}
    </div>
  );
}