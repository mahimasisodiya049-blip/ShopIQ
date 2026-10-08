import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { TrendingDown, Loader2 } from 'lucide-react';

const PriceHistoryChart = ({ productId }) => {
    const [data, setData] = useState([]);
    const [productTitle, setProductTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const fetchPriceHistory = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/products/${productId}/history`);
                const text = await response.text();
                const result = text ? JSON.parse(text) : {};

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch price history.');
                }

                setProductTitle(result.product.title);

                const formattedData = result.history.map((item) => ({
                    date: new Date(item.recordedAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                    }),
                    price: item.price,
                }));

                setData(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPriceHistory();
    }, [productId]);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2 bg-white rounded-2xl border border-gray-200">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-sm">Loading price history...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-200 font-medium">
                {error}
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="p-6 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 text-sm">
                No price history available.
            </div>
        );
    }

    const lowestPrice = Math.min(...data.map((d) => d.price));
    const highestPrice = Math.max(...data.map((d) => d.price));

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Price Drop History</h3>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">{productTitle}</p>
                </div>

                <div className="flex gap-4 text-xs font-semibold">
                    <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        Lowest: ₹{lowestPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                        Highest: ₹{highestPrice.toLocaleString('en-IN')}
                    </span>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" tickLine={false} stroke="#94a3b8" fontSize={11} />
                        <YAxis
                            tickLine={false}
                            stroke="#94a3b8"
                            fontSize={11}
                            tickFormatter={(val) => `₹${val}`}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#2563eb"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceHistoryChart;