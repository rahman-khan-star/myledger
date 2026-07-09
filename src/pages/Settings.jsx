import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const tabs = [
  { id:'profile', label:'Profile', icon:User },
  { id:'notifications', label:'Notifications', icon:Bell },
  { id:'security', label:'Security', icon:Shield },
  { id:'billing', label:'Billing', icon:CreditCard },
];

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [prof, setProf] = useState({ name:user?.name||'Admin User', email:user?.email||'admin@myledger.com', phone:user?.phone||'+91 99999 88888', company:'MyLedger Business' });
  const [notifs, setNotifs] = useState({ email:true, push:true, sms:false, weekly:true });

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  return (
    <div className="space-y-6 anim-fade-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(t => {
              const Ic = t.icon;
              return <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${tab===t.id?'bg-indigo-50 text-indigo-700':'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Ic className="h-5 w-5" />{t.label}</button>;
            })}
          </nav>
        </div>
        <div className="flex-1">
          {tab==='profile' && (
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">{prof.name.charAt(0)}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                  <p className="text-sm text-gray-500">{prof.email}</p>
                  <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">Change avatar</button>
                </div>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" value={prof.name} onChange={e=>setProf({...prof,name:e.target.value})} />
                  <Input label="Email" type="email" value={prof.email} onChange={e=>setProf({...prof,email:e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Phone" value={prof.phone} onChange={e=>setProf({...prof,phone:e.target.value})} />
                  <Input label="Company" value={prof.company} onChange={e=>setProf({...prof,company:e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                <Button onClick={save}><Save className="h-4 w-4" />{saved?'Saved!':'Save Changes'}</Button>
              </div>
            </Card>
          )}
          {tab==='notifications' && (
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <div className="space-y-6">
                {[{k:'email',l:'Email Notifications',d:'Receive email alerts'},{k:'push',l:'Push Notifications',d:'Get push notifications'},{k:'sms',l:'SMS Notifications',d:'Receive text messages'},{k:'weekly',l:'Weekly Reports',d:'Weekly summary of finances'}].map(n => (
                  <div key={n.k} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div><p className="font-medium text-gray-900">{n.l}</p><p className="text-sm text-gray-500">{n.d}</p></div>
                    <button onClick={()=>setNotifs({...notifs,[n.k]:!notifs[n.k]})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifs[n.k]?'bg-indigo-600':'bg-gray-300'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifs[n.k]?'translate-x-6':'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                <Button onClick={save}><Save className="h-4 w-4" />{saved?'Saved!':'Save Preferences'}</Button>
              </div>
            </Card>
          )}
          {tab==='security' && (
            <Card>
              <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" placeholder="Enter current password" />
                    <Input label="New Password" type="password" placeholder="Enter new password" />
                    <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div><h4 className="font-medium text-gray-900">Two-Factor Authentication</h4><p className="text-sm text-gray-500">Extra security layer</p></div>
                    <Button variant="secondary" size="sm">Enable</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {tab==='billing' && (
            <Card>
              <CardHeader><CardTitle>Billing & Subscription</CardTitle></CardHeader>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100">Current Plan</p>
                    <h3 className="text-2xl font-bold mt-1">Professional</h3>
                    <p className="text-indigo-200 mt-2">₹999/month • Renews Aug 15, 2026</p>
                  </div>
                  <Button variant="secondary">Upgrade</Button>
                </div>
              </div>
              <ul className="space-y-3">
                {['Unlimited transactions','Unlimited parties','Advanced reports','Priority support','Data export'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>{f}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}