import React from 'react';
import { X, Star, Sparkles, Award, ShoppingBag, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompareTable = ({
  products = [],
  specMatrix = [],
  badges = [],
  onRemoveProduct,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
        <p className="text-slate-500 font-medium">Please add at least 2 products to compare.</p>
      </div>
    );
  }

  // Get all badges for a specific product ID
  const getProductBadges = (productId) => {
    return badges.filter((b) => b.productId === productId);
  };

  // Badge visual styles
  const badgeColor = (badgeName) => {
    if (badgeName === 'Best Overall') return 'bg-amber-100 text-amber-900 border-amber-300';
    if (badgeName === 'Best Price') return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (badgeName === 'Best Performance') return 'bg-indigo-100 text-indigo-900 border-indigo-300';
    if (badgeName === 'Best Camera') return 'bg-pink-100 text-pink-900 border-pink-300';
    if (badgeName === 'Best Battery') return 'bg-cyan-100 text-cyan-900 border-cyan-300';
    return 'bg-purple-100 text-purple-900 border-purple-300';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Scrollable Container for responsive table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header: Products Column Cards */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-5 w-48 min-w-[180px] text-xs font-bold uppercase tracking-wider text-slate-400 align-top">
                <span>Specification</span>
              </th>

              {products.map((product) => {
                const itemBadges = getProductBadges(product._id);

                return (
                  <th
                    key={product._id}
                    className="p-5 min-w-[220px] max-w-[280px] align-top border-l border-slate-200/80 bg-white"
                  >
                    <div className="relative flex flex-col h-full">
                      {/* Remove from comparison button */}
                      {onRemoveProduct && products.length > 2 && (
                        <button
                          onClick={() => onRemoveProduct(product._id)}
                          className="absolute -top-1 -right-1 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-100 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Product Thumbnail */}
                      <Link to={`/products/${product._id}`} className="block mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-28 h-28 mx-auto object-cover rounded-xl p-1 bg-white border border-slate-100 shadow-xs hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Brand & Name */}
                      <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <Link to={`/products/${product._id}`}>
                        <h4 className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors line-clamp-2 mt-0.5">
                          {product.name}
                        </h4>
                      </Link>

                      {/* Price */}
                      <div className="mt-2 mb-3">
                        <span className="text-lg font-black text-slate-900">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Highlight Winner Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2 mt-auto">
                        {itemBadges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 shadow-xs ${badgeColor(b.badge)}`}
                          >
                            <Award className="w-3 h-3" />
                            {b.badge}
                          </span>
                        ))}
                      </div>

                      {/* View Details Link */}
                      <Link
                        to={`/products/${product._id}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 block"
                      >
                        Full Product Details →
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body: Key Matrix Rows */}
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            
            {/* Price Row */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Price (Lowest Store)
              </td>
              {products.map((p) => {
                const isLowest = Math.min(...products.map(x => x.price)) === p.price;
                return (
                  <td key={p._id} className="p-4 border-l border-slate-100 font-semibold text-slate-800">
                    <div className="flex items-center justify-between">
                      <span>₹{p.price?.toLocaleString('en-IN')}</span>
                      {isLowest && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Lowest
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* AI Score Row */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                AI SmartScore
              </td>
              {products.map((p) => {
                const isHighest = Math.max(...products.map(x => x.aiScore || 0)) === (p.aiScore || 0);
                return (
                  <td key={p._id} className="p-4 border-l border-slate-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xs">
                        {p.aiScore}
                      </div>
                      <span className="text-xs font-medium text-slate-600">/ 100</span>
                      {isHighest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                          Winner
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Rating Row */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Customer Rating
              </td>
              {products.map((p) => (
                <td key={p._id} className="p-4 border-l border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{p.rating}</span>
                    <span className="text-xs text-slate-400">({p.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Dynamic Specifications Matrix Rows */}
            {specMatrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                  {row.feature}
                </td>
                {products.map((p) => {
                  const val = row.values[p._id.toString()] || '—';
                  return (
                    <td
                      key={p._id}
                      className="p-4 border-l border-slate-100 text-slate-700 font-medium leading-relaxed"
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* "Am I Overpaying?" Row */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Overpaying Check
              </td>
              {products.map((p) => {
                const verdict = p.overpayingAnalysis?.verdict;
                return (
                  <td key={p._id} className="p-4 border-l border-slate-100">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        verdict === 'good_deal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : verdict === 'overpriced'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {verdict === 'good_deal' ? '✓ Good Deal' : verdict === 'overpriced' ? '⚠️ Overpriced' : 'Fair Price'}
                    </span>
                  </td>
                );
              })}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
