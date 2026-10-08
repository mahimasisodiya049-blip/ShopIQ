import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scale, X, ArrowRight, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

export const CompareDrawer = () => {
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
    drawerOpen,
    setDrawerOpen,
  } = useCompare();

  const navigate = useNavigate();
  const location = useLocation();

  // Hide drawer when already on the Compare page to avoid redundancy
  if (compareItems.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-b-0 border-slate-200/90 transition-all duration-300 transform translate-y-0">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              Comparison Queue
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {compareItems.length}/4 Selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              {drawerOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Expandable Content Area */}
        {drawerOpen && (
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Selected Items Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {compareItems.map((item) => (
                <div
                  key={item._id}
                  className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-6 shrink-0 group hover:border-indigo-300 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-lg bg-white p-0.5 border border-slate-100"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                      {item.name}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCompare(item._id)}
                    className="absolute top-1.5 right-1 text-slate-400 hover:text-red-500 p-1"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Empty slot indicators up to 4 */}
              {Array.from({ length: Math.max(0, 4 - compareItems.length) }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/products')}
                  className="hidden md:flex items-center justify-center w-24 h-14 border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 font-medium cursor-pointer hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all shrink-0"
                >
                  + Add Item
                </div>
              ))}
            </div>

            {/* Launch Compare Action Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
              {compareItems.length < 2 ? (
                <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                  Select at least 2 items to compare
                </span>
              ) : (
                <button
                  onClick={() => navigate('/compare')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-600/30 hover:scale-[1.02] transition-all"
                >
                  <span>Compare Now ({compareItems.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
