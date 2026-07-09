import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Phone, ArrowRight, Building2, User } from 'lucide-react';
import { mockParties } from '../utils/data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

export default function Parties() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newP, setNewP] = useState({ name:'', phone:'', type:'individual' });

  const filtered = mockParties.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parties</h1>
          <p className="text-gray-500 mt-1">{mockParties.length} contacts in your ledger</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-5 w-5" />Add Party</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 card" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <Link key={p.id} to={`/parties/${p.id}`}>
            <Card hover className="h-full anim-fade-up cursor-pointer" style={{animationDelay:`${i*50}ms`}}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.type==='business' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {p.type==='business' ? <Building2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5"><Phone className="h-3.5 w-3.5" />{p.phone}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300" />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Balance</span>
                  <span className={`font-semibold ${p.balance>0?'text-emerald-600':p.balance<0?'text-red-600':'text-gray-500'}`}>{p.balance>0?'+':''}₹{Math.abs(p.balance).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status==='active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {p.status==='active'?'Active':'Inactive'}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length===0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4"><Search className="h-8 w-8 text-gray-400" /></div>
          <h3 className="text-lg font-medium text-gray-900">No parties found</h3>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Party">
        <form onSubmit={e => { e.preventDefault(); setShowModal(false); }} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Party Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['individual','business'].map(t => (
                <button key={t} type="button" onClick={() => setNewP({...newP, type:t})}
                  className={`p-4 rounded-xl border-2 transition-all ${newP.type===t ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  {t==='individual' ? <User className="h-6 w-6 mx-auto mb-2 text-gray-400" /> : <Building2 className="h-6 w-6 mx-auto mb-2 text-gray-400" />}
                  <span className="text-sm font-medium text-gray-700 capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
          <Input label="Party Name" value={newP.name} onChange={e => setNewP({...newP, name:e.target.value})} placeholder="Enter party name" required />
          <Input label="Phone Number" value={newP.phone} onChange={e => setNewP({...newP, phone:e.target.value})} placeholder="+91 98765 43210" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Add Party</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}