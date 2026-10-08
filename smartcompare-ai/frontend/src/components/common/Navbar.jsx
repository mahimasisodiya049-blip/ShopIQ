import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Scale,
  TrendingDown,
  User as UserIcon,
  LogOut,
  Layers,
  Heart,
  ChevronDown,
  Menu,
  X,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCompare } from '../../context/CompareContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { compareItems, setDrawerOpen } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare' },
    { name: 'Products', path: '/products' },
    { name: 'Am I Overpaying?', path: '/overpaying', badge: 'AI Tool' },
    { name: 'Price Tracker', path: '/dashboard?tab=watchlist' },
  ];

  const isActive = (path) => {
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Tagline */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  SmartCompare<span className="text-indigo-600 font-black">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:inline">
                  Stop Overpaying • Buy Smarter
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative w-64">
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search products, brands..."
                className="w-full bg-slate-100/90 text-sm rounded-full pl-9 pr-4 py-2 border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            {/* Compare Floating Trigger */}
            <button
              onClick={() => {
                setDrawerOpen(true);
                navigate('/compare');
              }}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              title="View Comparison Queue"
            >
              <Scale className="w-5 h-5" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {compareItems.length}
                </span>
              )}
            </button>

            {/* User Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard?tab=comparisons"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Scale className="w-4 h-4" />
                      <span>My Comparisons</span>
                    </Link>
                    <Link
                      to="/dashboard?tab=saved"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Saved Products</span>
                    </Link>
                    <Link
                      to="/dashboard?tab=watchlist"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <TrendingDown className="w-4 h-4" />
                      <span>Price Watchlist</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm shadow-indigo-600/20 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Compare Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => {
                setDrawerOpen(true);
                navigate('/compare');
              }}
              className="relative p-2 text-slate-600"
            >
              <Scale className="w-5 h-5" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="mb-4 relative">
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-100 rounded-lg pl-9 pr-4 py-2 text-sm border border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-base font-medium ${
                    isActive(link.path)
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700"
                    >
                      Dashboard ({user.name})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-600"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-2 px-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2 border border-slate-300 rounded-lg text-sm font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
