import React from 'react';
import { Role } from '../types';

interface LandingProps {
  onSelectRole: (role: Role) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  const roles: { id: Role; label: string }[] = [
    { id: 'government', label: 'Government' },
    { id: 'citizen', label: 'Citizen' },
    { id: 'institution', label: 'Institution' },
    { id: 'college', label: 'College' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9fff6] to-white p-4">
      <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-[0_12px_40px_rgba(10,60,50,0.08)] p-8 md:p-10 fade-in border border-emerald-50/50">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center text-xl shadow-sm border border-emerald-100/50">
              🌱
            </div>
            <h1 className="text-2xl font-extrabold text-emerald-900 tracking-tight">EcoPortal</h1>
          </div>
          <p className="text-sm text-emerald-600 font-medium pl-1">
            Track CO₂ savings, leaderboards, rewards & live hotspots
          </p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 pl-1">Select your role</h2>

        {/* Role List */}
        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="group relative flex items-center justify-between w-full p-5 bg-[#EAFBF5] hover:bg-[#d6f7eb] rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200/50 text-left outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              <div>
                <span className="block text-emerald-900 font-bold text-lg mb-0.5">{role.label}</span>
                <span className="block text-emerald-600/80 text-xs font-medium uppercase tracking-wide">Click to continue</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-emerald-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-8 pt-6 border-t border-emerald-50 text-center">
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
            Tip: Use Government → Analytics → Live Activity Map to see heatmap. Use 'Load real dataset' for sample hotspot data.
          </p>
        </div>
      </div>
    </div>
  );
};
