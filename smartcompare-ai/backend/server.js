import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import compareRoutes from './routes/compareRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

// Connect to MongoDB (Local with in-memory fallback)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/compare', compareRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});