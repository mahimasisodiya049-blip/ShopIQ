import React, { useState, useEffect } from 'react';
import CompareView from './components/CompareView';
import AddProductForm from './components/AddProductForm';
import PriceHistoryChart from './components/PriceHistoryChart';

function App() {
  const [products, setProducts] = useState([]);
  const [activeChartId, setActiveChartId] = useState(null);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveChartId(newProduct._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">ShopIQ Dashboard</h1>

        {/* URL Scraper Input */}
        <AddProductForm onProductAdded={handleProductAdded} />

        {/* Dynamic Price Drop Chart */}
        {activeChartId && (
          <div className="mb-6">
            <PriceHistoryChart productId={activeChartId} />
          </div>
        )}

        {/* AI Compare View */}
        <CompareView productList={products} />
      </div>
    </div>
  );
}

export default App;