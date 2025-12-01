import React, { useState } from 'react';
import { UserSession, Role } from '../types';
import { ACTIVITIES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Map } from './Map';
import { Scanner } from './Scanner';

interface DashboardProps {
  session: UserSession;
  onLogout: () => void;
  onHome: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ session, onLogout, onHome }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const getTabs = () => {
    if (session.role === 'government') return ['overview', 'activities', 'analytics', 'heatmap', 'rewards'];
    if (session.role === 'citizen') return ['submit', 'history', 'rewards', 'map'];
    if (session.role === 'institution') return ['submissions', 'progress', 'heatmap', 'rewards'];
    return ['overview', 'rewards'];
  };

  const tabs = getTabs();

  // Metrics Logic
  const totalEP = ACTIVITIES.reduce((acc, curr) => acc + curr.ep, 0);
  const totalCO2 = ACTIVITIES.reduce((acc, curr) => acc + curr.co2, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 fade-in pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-white p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm border border-emerald-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl shadow-inner">
            {session.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-900">{session.name}</h2>
            <p className="text-sm text-emerald-600">{session.details || `Logged in as ${session.role}`}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onHome} className="px-4 py-2 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors">Home</button>
          <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5">Logout</button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total CO₂ Saved</div>
          <div className="text-2xl font-black text-emerald-600">{session.role === 'citizen' ? '34 kg' : `${totalCO2.toFixed(1)} kg`}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">EcoPoints</div>
          <div className="text-2xl font-black text-emerald-600">{session.role === 'citizen' ? '420 EP' : totalEP}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Status</div>
          <div className="text-2xl font-black text-emerald-600">Active</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === t 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
              : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-transparent'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
        
        {/* Generic Map/Heatmap Tab */}
        {(activeTab === 'heatmap' || activeTab === 'map') && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Live Activity Heatmap</h3>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
               <Map id="main-map" />
            </div>
            <p className="text-xs text-slate-500 text-center">Data updated in real-time based on verified submissions.</p>
          </div>
        )}

        {/* Analytics Tab (Charts) */}
        {(activeTab === 'analytics' || activeTab === 'overview' || activeTab === 'progress') && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Activity Analytics</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  {name: 'W1', ep: 120, co2: 10}, {name: 'W2', ep: 150, co2: 14}, 
                  {name: 'W3', ep: 180, co2: 20}, {name: 'W4', ep: 240, co2: 25}
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f0fdf4'}} />
                  <Bar dataKey="ep" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tables (Activities/History/Submissions) */}
        {(activeTab === 'activities' || activeTab === 'history' || activeTab === 'submissions') && (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Log</h3>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">User</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">EP</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITIES.slice(0, 10).map((a, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">{a.user}</td>
                    <td className="px-4 py-3 text-slate-500">{a.type}</td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">{a.category}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-600">{a.ep}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${a.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Citizen Submit Tab */}
        {activeTab === 'submit' && session.role === 'citizen' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Scan QR Code</h3>
              <Scanner onScan={(val) => alert(val)} />
            </div>
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
               <h3 className="font-bold text-slate-800">Manual Entry</h3>
               <div className="space-y-3">
                 <select className="w-full p-3 rounded-xl border border-slate-200 bg-white">
                   <option>Paper</option>
                   <option>Plastic</option>
                   <option>Metal</option>
                 </select>
                 <input type="text" placeholder="Description" className="w-full p-3 rounded-xl border border-slate-200" />
                 <input type="number" placeholder="Estimated Points" className="w-full p-3 rounded-xl border border-slate-200" />
                 <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">Submit Activity</button>
               </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
           <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800">Available Rewards</h3>
             <div className="grid gap-3">
                {[
                  {title: "Property Tax Rebate", cost: "20,000 EP", tag: "Gov Cert"},
                  {title: "Electricity Bill Cashback", cost: "4,000 EP", tag: "Instant"},
                  {title: "Public Transport Credit", cost: "3,000 EP", tag: "Wallet"},
                  {title: "Green Business Certification", cost: "50,000 EP", tag: "Biz"}
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{r.title}</span>
                      <span className="text-xs text-slate-400">{r.tag}</span>
                    </div>
                    <div className="font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg text-sm">{r.cost}</div>
                  </div>
                ))}
             </div>
           </div>
        )}

      </div>
    </div>
  );
};
