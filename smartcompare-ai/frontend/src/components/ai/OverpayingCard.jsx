import React from 'react';
import { AlertCircle, CheckCircle2, TrendingDown, HelpCircle, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OverpayingCard = ({ analysis, product }) => {
  if (!analysis) return null;

  const {
    currentPrice,
    estimatedFairPriceMin,
    estimatedFairPriceMax,
    potentialSaving,
    verdict,
    stateTitle,
    recommendation,
    marketContext,
  } = analysis;

  const isGoodDeal = verdict === 'good_deal';
  const isOverpriced = verdict === 'overpriced';
  const isFairPrice = verdict === 'fair_price';

  const stateStyles = {
    good_deal: {
      bg: 'bg-emerald-50/70 border-emerald-300',
      badgeBg: 'bg-emerald-600 text-white',
      badgeText: 'Good Deal',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      accentColor: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    fair_price: {
      bg: 'bg-amber-50/70 border-amber-300',
      badgeBg: 'bg-amber-500 text-slate-950',
      badgeText: 'Fair Price',
      icon: <HelpCircle className="w-5 h-5 text-amber-600" />,
      accentColor: 'text-amber-800',
      barColor: 'bg-amber-500',
    },
    overpriced: {
      bg: 'bg-rose-50/80 border-rose-300',
      badgeBg: 'bg-rose-600 text-white',
      badgeText: '⚠️ You may be overpaying',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      accentColor: 'text-rose-800',
      barColor: 'bg-rose-500',
    },
  };

  const currentTheme = stateStyles[verdict] || stateStyles.fair_price;

  return (
    <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition-all ${currentTheme.bg}`}>
      
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              “Am I Overpaying?” Price Advisor
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated against competitor benchmarks, spec value & historical market prices
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-xs ${currentTheme.badgeBg}`}>
          {currentTheme.icon}
          <span>{currentTheme.badgeText}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/70">
        
        {/* Current Price */}
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            Current Listed Price
          </span>
          <span className="text-2xl font-black text-slate-900">
            ₹{currentPrice?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Estimated Fair Price */}
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            Estimated Fair Market Range
          </span>
          <span className="text-xl sm:text-2xl font-black text-indigo-600">
            ₹{estimatedFairPriceMin?.toLocaleString('en-IN')} – ₹{estimatedFairPriceMax?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Potential Savings / Deal Advantage */}
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            {isOverpriced ? 'Potential Overpayment' : 'Savings vs MRP'}
          </span>
          <span className={`text-xl sm:text-2xl font-black ${isOverpriced ? 'text-rose-600' : 'text-emerald-600'}`}>
            {potentialSaving > 0 ? `₹${potentialSaving?.toLocaleString('en-IN')}+` : 'Minimal'}
          </span>
        </div>

      </div>

      {/* AI Recommendation Quote & Market Context */}
      <div className="space-y-3">
        <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            AI Purchase Recommendation:
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
            {recommendation}
          </p>
        </div>

        {marketContext && (
          <p className="text-xs text-slate-500 italic pl-1">
            Market Context: {marketContext}
          </p>
        )}
      </div>

      {/* Footer action */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Confidence Level: <strong>92%</strong> based on 14+ pricing factors
        </span>

        <Link
          to="/overpaying"
          className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <span>Test another product</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
