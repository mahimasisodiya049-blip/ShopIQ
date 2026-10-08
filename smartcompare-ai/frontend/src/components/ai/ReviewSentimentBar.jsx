import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Sparkles, Quote } from 'lucide-react';

export const ReviewSentimentBar = ({ summary = {}, reviews = [] }) => {
  const {
    sentimentOverview = 'Positive',
    whatUsersLike = [],
    whatUsersDislike = [],
    insightQuote = '',
    positivePercent = 82,
    neutralPercent = 10,
    negativePercent = 8,
  } = summary;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              AI Customer Review Intelligence
            </h3>
            <p className="text-xs text-slate-500">
              Summarized from verified customer purchase reviews across major retailers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Overall Consensus:</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {sentimentOverview}
          </span>
        </div>
      </div>

      {/* Sentiment Percentage Multi-bar */}
      <div>
        <div className="flex justify-between items-center text-xs font-bold mb-2">
          <span className="text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Positive: {positivePercent}%
          </span>
          <span className="text-amber-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Neutral: {neutralPercent}%
          </span>
          <span className="text-rose-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Negative: {negativePercent}%
          </span>
        </div>

        {/* Stacked Bar */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${positivePercent}%` }}
            className="h-full bg-emerald-500 transition-all duration-700"
            title={`Positive: ${positivePercent}%`}
          />
          <div
            style={{ width: `${neutralPercent}%` }}
            className="h-full bg-amber-400 transition-all duration-700"
            title={`Neutral: ${neutralPercent}%`}
          />
          <div
            style={{ width: `${negativePercent}%` }}
            className="h-full bg-rose-500 transition-all duration-700"
            title={`Negative: ${negativePercent}%`}
          />
        </div>
      </div>

      {/* What Users Like vs What Users Dislike */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* What Users Like */}
        <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3.5">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>What Users Like Most</span>
          </h4>
          <ul className="space-y-2.5">
            {whatUsersLike.length > 0 ? (
              whatUsersLike.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5 font-medium">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400 italic">No standout highlights recorded.</li>
            )}
          </ul>
        </div>

        {/* What Users Dislike */}
        <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-3.5">
            <ThumbsDown className="w-4 h-4 text-rose-600" />
            <span>Common User Complaints</span>
          </h4>
          <ul className="space-y-2.5">
            {whatUsersDislike.length > 0 ? (
              whatUsersDislike.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-rose-950 flex items-start gap-2.5 font-medium">
                  <span className="text-rose-500 font-bold mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400 italic">No major complaints recorded.</li>
            )}
          </ul>
        </div>

      </div>

      {/* AI Review Insight Pull-Quote */}
      {insightQuote && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 relative overflow-hidden">
          <Quote className="w-10 h-10 text-slate-200 absolute -top-1 -right-1 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1.5">
              AI Synthesized Sentiment Insight:
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
              “{insightQuote}”
            </p>
          </div>
        </div>
      )}

      {/* Recent Sample Customer Reviews */}
      {reviews && reviews.length > 0 && (
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified Purchaser Snippets ({reviews.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reviews.slice(0, 4).map((rev, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{rev.user}</span>
                  <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                </div>
                <p className="font-medium text-slate-700 mb-1">{rev.title}</p>
                <p className="text-slate-500 text-[11px] line-clamp-2">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
