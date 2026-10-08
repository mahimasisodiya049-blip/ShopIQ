import React from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCompare();

  if (!toastMessage) return null;

  const { msg, type } = toastMessage;

  const bgColors = {
    success: 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-emerald-500/10',
    warning: 'bg-amber-50 text-amber-900 border-amber-200 shadow-amber-500/10',
    info: 'bg-indigo-50 text-indigo-900 border-indigo-200 shadow-indigo-500/10',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-sm">
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${bgColors[type] || bgColors.info}`}>
        {icons[type] || icons.info}
        <p className="text-sm font-medium pr-2">{msg}</p>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-slate-700 ml-auto p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
