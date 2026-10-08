import React from 'react';
import { Flame, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const StorePriceList = ({ stores = [], productName = 'Product' }) => {
  if (!stores || stores.length === 0) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
        No store price listings available.
      </div>
    );
  }

  // Sort stores with lowest price first
  const sortedStores = [...stores].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedStores[0]?.price;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Where to Buy & Multi-Store Price Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Real-time scraped pricing across major verified retailers (Sample/Demo Data)
          </p>
        </div>
        
        {lowestPrice && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold shadow-xs">
            <Flame className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Lowest Price: ₹{lowestPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* Store Rows */}
      <div className="divide-y divide-slate-100">
        {sortedStores.map((store, idx) => {
          const isLowest = store.price === lowestPrice;

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                isLowest ? 'bg-emerald-50/40 hover:bg-emerald-50/70' : 'hover:bg-slate-50/70'
              }`}
            >
              {/* Store Name & Stock Info */}
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 text-sm">
                  {store.store[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {store.store}
                    </span>
                    {isLowest && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase tracking-wider">
                        Best Deal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{store.availability || 'In Stock'}</span>
                    <span>•</span>
                    <span className="text-slate-400">Free Delivery eligible</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      ₹{store.price?.toLocaleString('en-IN')}
                    </span>
                    {store.originalPrice && store.originalPrice > store.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{store.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {store.discount > 0 && (
                    <span className="text-xs font-semibold text-emerald-600">
                      Save ₹{((store.originalPrice || store.price) - store.price).toLocaleString('en-IN')} ({store.discount}%)
                    </span>
                  )}
                </div>

                <a
                  href={store.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                    isLowest
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-600/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-600/20'
                  }`}
                >
                  <span>Buy Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>SmartCompare AI monitors store updates every 30 minutes</span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">Demo Store Prices</span>
      </div>

    </div>
  );
};
