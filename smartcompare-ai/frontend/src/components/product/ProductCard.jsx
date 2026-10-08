import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Scale, Check, Heart, ShieldAlert, Sparkles, ShoppingBag } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';

export const ProductCard = ({ product }) => {
  const { toggleCompare, isInCompare } = useCompare();
  const { user, toggleBookmark, isProductSaved } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const inCompare = isInCompare(product._id);
  const saved = isProductSaved(product._id);

  // Find lowest price store
  const lowestStore = product.stores?.find((s) => s.isLowest) || product.stores?.[0];

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    await toggleBookmark(product._id);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  // Overpaying status badge color
  const overpayingBadge = () => {
    const verdict = product.overpayingAnalysis?.verdict;
    if (verdict === 'good_deal') {
      return (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Good Deal
        </span>
      );
    } else if (verdict === 'overpriced') {
      return (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-rose-500" />
          Overpriced
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
        Fair Price
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      
      {/* Top badges & actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5">
          {overpayingBadge()}
          {product.discount > 0 && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleBookmarkClick}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
            saved
              ? 'bg-rose-50 text-rose-500 shadow-xs'
              : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={saved ? 'Remove from saved' : 'Save product'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="block relative pt-[75%] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 p-4"
          loading="lazy"
        />
        {product.isDemo && (
          <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-slate-800/70 text-slate-200 px-1.5 py-0.5 rounded backdrop-blur-xs">
            Demo Specs & Prices
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
          <span className="uppercase tracking-wider font-semibold text-indigo-600">
            {product.brand}
          </span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-900">{product.rating}</span>
          </div>
          <span className="text-xs text-slate-400">
            ({product.reviewCount?.toLocaleString()} reviews)
          </span>

          {/* AI Score Badge */}
          <div className="ml-auto flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700">AI {product.aiScore}/100</span>
          </div>
        </div>

        {/* Price & Store */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-black text-slate-900">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {lowestStore && (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1 text-slate-600">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                <span>Lowest at <strong className="text-slate-800">{lowestStore.store}</strong></span>
              </span>
              <span className="text-emerald-600 font-semibold">{lowestStore.availability}</span>
            </div>
          )}

          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
              inCompare
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                : 'bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-indigo-600'
            }`}
          >
            {inCompare ? (
              <>
                <Check className="w-4 h-4 text-indigo-600" />
                <span>In Comparison Queue</span>
              </>
            ) : (
              <>
                <Scale className="w-4 h-4" />
                <span>Add to Compare</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
