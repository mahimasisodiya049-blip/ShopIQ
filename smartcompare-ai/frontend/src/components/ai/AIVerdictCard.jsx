import React from 'react';
import { Award, Check, X, Sparkles, UserCheck, ThumbsUp, ShieldCheck } from 'lucide-react';

export const AIVerdictCard = ({ verdict, scores = [], prosCons = [], summary = '' }) => {
  if (!verdict) return null;

  // Find winner's score
  const winnerScoreObj = scores.find(
    (s) => s.productId === verdict.winnerId || s.productName === verdict.winnerName
  );
  const winnerScore = winnerScoreObj?.score || 92;

  // Find winner's pros and cons
  const winnerProsCons = prosCons.find(
    (pc) => pc.productId === verdict.winnerId
  );

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-2.5 bg-indigo-500/30 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase text-indigo-200 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-indigo-300 animate-pulse" />
          <span>SmartCompare AI Recommendation</span>
        </div>

        {/* AI Score Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/15">
          <span className="text-xs text-slate-300 font-medium">Winner AI Score:</span>
          <span className="text-xl font-black text-amber-300 leading-none">
            {winnerScore}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Winner Title & Reason */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {verdict.title || `Best Overall: ${verdict.winnerName}`}
          </h2>
        </div>

        <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed max-w-3xl mt-3 pl-1">
          {verdict.reason}
        </p>
      </div>

      {/* Best For Personas */}
      {verdict.bestFor && verdict.bestFor.length > 0 && (
        <div className="mb-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
            <UserCheck className="w-4 h-4" />
            <span>Recommended Especially For</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {verdict.bestFor.map((persona, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white backdrop-blur-sm"
              >
                ✓ {persona}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pros & Cons Grid */}
      {winnerProsCons && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 pt-6 border-t border-indigo-800/60 relative z-10">
          {/* Pros */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
              <Check className="w-4 h-4" />
              <span>Key Advantages</span>
            </span>
            <ul className="space-y-2">
              {winnerProsCons.pros.map((p, idx) => (
                <li key={idx} className="text-xs text-emerald-100 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
              <X className="w-4 h-4" />
              <span>Points to Consider</span>
            </span>
            <ul className="space-y-2">
              {winnerProsCons.cons.map((c, idx) => (
                <li key={idx} className="text-xs text-rose-100 flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✗</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Final Verdict Callout */}
      <div className="mt-6 pt-4 border-t border-indigo-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
          <ThumbsUp className="w-4 h-4" />
          <span>Final Verdict:</span>
          <span className="text-slate-100 font-normal italic">
            “{verdict.verdictText || 'Best value for money among the selected products.'}”
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-indigo-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Unbiased algorithmic assessment</span>
        </div>
      </div>

    </div>
  );
};
