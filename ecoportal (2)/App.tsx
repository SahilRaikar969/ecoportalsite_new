import React, { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Role, UserSession } from './types';

function App() {
  const [view, setView] = useState<'landing' | 'code' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [code, setCode] = useState<string[]>([]);

  // Sample data mapper
  const getSampleSession = (role: Role): UserSession => {
    switch(role) {
      case 'government': return { role, name: 'State Green Dept', avatar: '🏛️', details: 'Admin: S. Gupta' };
      case 'citizen': return { role, name: 'Chrish Cardoza', avatar: '👤', details: 'Age: 21 · Aadhaar: XXXX' };
      case 'institution': return { role, name: 'DELL College', avatar: '🏫', details: 'Admin: Dr. A. Rao' };
      case 'college': return { role, name: 'SHREE College', avatar: '🎓', details: 'Admin: Prof. S. Patel' };
      default: return { role, name: 'Neighborhood Collective', avatar: '🌐' };
    }
  };

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setCode(new Array(role === 'citizen' ? 12 : 10).fill(''));
    setView('code');
  };

  const handleCodeSubmit = () => {
    if (selectedRole) {
      setSession(getSampleSession(selectedRole));
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setSession(null);
    setSelectedRole(null);
    setView('landing');
  };

  if (view === 'dashboard' && session) {
    return <Dashboard session={session} onLogout={handleLogout} onHome={handleLogout} />;
  }

  if (view === 'code' && selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[24px] shadow-xl max-w-md w-full fade-in">
          <button onClick={() => setView('landing')} className="text-emerald-600 font-bold text-sm mb-6 hover:underline">← Back</button>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Enter Details</h2>
          <p className="text-slate-500 text-sm mb-6">Please enter your {selectedRole === 'citizen' ? '12-digit Aadhaar' : '10-digit ID'} to continue.</p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {code.map((digit, idx) => (
              <input 
                key={idx}
                type="text" 
                maxLength={1}
                className="w-8 h-10 text-center border border-slate-200 rounded-lg text-lg font-bold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g,'');
                  const newCode = [...code];
                  newCode[idx] = val;
                  setCode(newCode);
                  if (val && idx < code.length - 1) {
                    const next = document.querySelector(`input:nth-child(${idx + 2})`) as HTMLInputElement;
                    next?.focus();
                  }
                }}
              />
            ))}
          </div>

          <button 
            onClick={handleCodeSubmit}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-1"
          >
            Enter / Login
          </button>
        </div>
      </div>
    );
  }

  return <Landing onSelectRole={handleSelectRole} />;
}

export default App;
