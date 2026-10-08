import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import PriceHistory from './models/PriceHistory.js';
import connectDB from './config/db.js';

dotenv.config();

const sampleProducts = [
    {
        title: 'Sony WH-1000XM5 Wireless Headphones',
        url: 'https://www.amazon.in/dp/B09XS7JWHH',
        platform: 'Amazon',
        currentPrice: 28990,
        originalPrice: 34990,
        currency: 'INR',
        rating: 4.6,
    },
    {
        title: 'Bose QuietComfort Ultra Headphones',
        url: 'https://www.flipkart.com/bose-quietcomfort-ultra/p/itm12345678',
        platform: 'Flipkart',
        currentPrice: 34900,
        originalPrice: 35900,
        currency: 'INR',
        rating: 4.5,
    },
];

const generateHistoricalPrices = (productId, basePrice) => {
    const history = [];
    const now = new Date();

    // Generate 30 days of synthetic price trend data
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Simulate occasional price drops/fluctuations
        let fluctuation = 0;
        if (i > 20) fluctuation = 2000;
        else if (i > 10) fluctuation = 1000;
        else if (i > 5) fluctuation = 3000; // Big sale price drop
        else fluctuation = 0;

        history.push({
            product: productId,
            price: basePrice + fluctuation,
            recordedAt: date,
        });
    }

    return history;
};

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('Clearing existing products and price histories...');
        await Product.deleteMany({});
        await PriceHistory.deleteMany({});

        console.log('Inserting seed products...');
        const createdProducts = await Product.insertMany(sampleProducts);

        let allPriceHistories = [];
        for (const prod of createdProducts) {
            const historyPoints = generateHistoricalPrices(prod._id, prod.currentPrice);
            allPriceHistories = allPriceHistories.concat(historyPoints);
        }

        await PriceHistory.insertMany(allPriceHistories);

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database Seeding Failed:', error);
        process.exit(1);
    }
};

seedDatabase();