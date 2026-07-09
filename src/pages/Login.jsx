import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    const ok = await login(email, password);
    ok ? navigate('/dashboard') : setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md anim-fade-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30 mb-4">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MyLedger</h1>
          <p className="text-gray-500 mt-2">Business Management Made Simple</p>
        </div>

        <div className="bg-white rounded-3xl p-8 card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue to your ledger</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Email address" type="email" icon={Mail} placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} error={error && !email ? error : ''} />
            <Input label="Password" type="password" icon={Lock} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} error={error && !password ? error : ''} />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password?</button>
            </div>

            {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100"><p className="text-sm text-red-600 text-center">{error}</p></div>}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Don't have an account? <button className="font-medium text-indigo-600 hover:text-indigo-700">Contact admin</button></p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">&copy; 2026 MyLedger. All rights reserved.</p>
      </div>
    </div>
  );
}