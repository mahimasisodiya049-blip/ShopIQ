const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
};

export const scrapeProductUrl = async (url) => {
    const response = await fetch(`${API_BASE_URL}/products/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    return response.json();
};

export const fetchProductPriceHistory = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/history`);
    return response.json();
};

export const compareProducts = async (products) => {
    const response = await fetch(`${API_BASE_URL}/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
    });
    return response.json();
};