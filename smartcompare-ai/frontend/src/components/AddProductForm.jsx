import React, { useState } from 'react';
import { Link2, Plus, Loader2 } from 'lucide-react';

const AddProductForm = ({ onProductAdded }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/products/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const text = await response.text();
            let data = {};

            try {
                data = text ? JSON.parse(text) : {};
            } catch (parseErr) {
                throw new Error('Server returned an invalid non-JSON response.');
            }

            if (!response.ok) {
                throw new Error(data.message || `Server Error (${response.status})`);
            }

            setUrl('');
            if (onProductAdded && data.data) {
                onProductAdded(data.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-1">
                <Link2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Add Product via URL</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
                Supports pasting Amazon, Flipkart, Myntra, and Ajio product links.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste e-commerce product link..."
                    required
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Scraping...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" />
                            <span>Scrape & Add</span>
                        </>
                    )}
                </button>
            </form>

            {error && <p className="text-red-500 text-sm font-medium mt-3">{error}</p>}
        </div>
    );
};

export default AddProductForm;