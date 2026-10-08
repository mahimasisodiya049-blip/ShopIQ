import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Product URL is required'],
      unique: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Other'],
      default: 'Other',
    },
    currentPrice: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;