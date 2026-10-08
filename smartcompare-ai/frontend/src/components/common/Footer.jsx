import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, Scale, Heart, Info } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                SmartCompare<span className="text-indigo-400">AI</span>
              </span>
            </div>
            
            <p className="text-slate-300 font-medium text-base">
              “Compare smarter. Spend better.”
            </p>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              SmartCompare AI analyzes technical specifications, multi-store prices, and authentic buyer review sentiment using intelligent heuristics and Gemini LLM models so you never overpay again.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent, objective AI recommendations</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">Compare Products</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Explore All Products</Link>
              </li>
              <li>
                <Link to="/overpaying" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Am I Overpaying?</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">AI</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=watchlist" className="hover:text-white transition-colors">Price Tracker</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=Smartphones" className="hover:text-white transition-colors">Smartphones</Link>
              </li>
              <li>
                <Link to="/products?category=Laptops" className="hover:text-white transition-colors">Laptops</Link>
              </li>
              <li>
                <Link to="/products?category=Headphones" className="hover:text-white transition-colors">Headphones</Link>
              </li>
              <li>
                <Link to="/products?category=Smart%20TVs" className="hover:text-white transition-colors">Smart TVs</Link>
              </li>
              <li>
                <Link to="/products?category=Smart%20Watches" className="hover:text-white transition-colors">Smart Watches</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); alert("SmartCompare AI is designed to help consumers compare tech specifications, prices across stores, and summarize reviews with AI."); }} className="hover:text-white transition-colors">About SmartCompare</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact support: support@smartcompare.ai"); }} className="hover:text-white transition-colors">Contact Support</a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Notice: User data and saved comparisons are stored securely and never sold."); }} className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms: Sample pricing is used for demo and educational evaluation."); }} className="hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Demo Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Evaluation Notice:</strong> Multi-store prices and product availability are currently populated with realistic demo/sample data for educational evaluation. Real shopping APIs can be connected directly via backend service integrations.
            </span>
          </div>
          <p>© {new Date().getFullYear()} SmartCompare AI. Built with React, Tailwind CSS, Node.js & Gemini.</p>
        </div>

      </div>
    </footer>
  );
};
