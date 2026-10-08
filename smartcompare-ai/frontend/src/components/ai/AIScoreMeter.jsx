import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AIScoreMeter = ({ score = 85, breakdown = {}, productName = '' }) => {
  // Score color tiers
  const getScoreColor = (val) => {
    if (val >= 90) return { stroke: '#4f46e5', text: 'text-indigo-600', label: 'Exceptional Choice', bg: 'bg-indigo-50' };
    if (val >= 80) return { stroke: '#10b981', text: 'text-emerald-600', label: 'Great Value', bg: 'bg-emerald-50' };
    if (val >= 70) return { stroke: '#f59e0b', text: 'text-amber-600', label: 'Average Value', bg: 'bg-amber-50' };
    return { stroke: '#ef4444', text: 'text-rose-600', label: 'Below Average', bg: 'bg-rose-50' };
  };

  const currentTier = getScoreColor(score);

  // SVG Circular Gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Breakdown metrics
  const criteria = [
    { name: 'Specifications', weight: '30%', max: 30, val: breakdown.specs || 27, color: 'bg-indigo-500' },
    { name: 'Price & Value', weight: '25%', max: 25, val: breakdown.price || 22, color: 'bg-emerald-500' },
    { name: 'Review Sentiment', weight: '20%', max: 20, val: breakdown.reviews || 18, color: 'bg-violet-500' },
    { name: 'User Rating', weight: '15%', max: 15, val: breakdown.rating || 14, color: 'bg-amber-500' },
    { name: 'Feature Synergy', weight: '10%', max: 10, val: breakdown.value || 9, color: 'bg-cyan-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              AI SmartScore Breakdown
            </h4>
            <p className="text-xs text-slate-500">
              Evaluated across 5 weighted consumer dimensions
            </p>
          </div>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentTier.bg} ${currentTier.text} border border-current/20`}>
          {currentTier.label}
        </span>
      </div>

      {/* Main Score & Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-200 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={currentTier.stroke}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 leading-none">
                {score}
              </span>
              <span className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                / 100
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700 mt-2 text-center">
            Weighted AI Score
          </span>
        </div>

        {/* Weighted Breakdown Bars (Col 2 & 3) */}
        <div className="md:col-span-2 space-y-3">
          {criteria.map((item, idx) => {
            const percentage = Math.min(100, Math.round((item.val / item.max) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.weight})</span>
                  </span>
                  <span className="text-slate-900 font-bold">
                    {item.val} / {item.max} pts
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
