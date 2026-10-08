import Product from '../models/Product.js';
import PriceHistory from '../models/PriceHistory.js';
import { scrapeProductData } from '../services/scraperService.js';

/**
 * @desc    Get all distinct product categories or platforms
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    return res.status(200).json({
      success: true,
      categories: categories.length ? categories : ['Electronics', 'Fashion', 'General'],
    });
  } catch (error) {
    console.error('Get Categories Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch categories.',
    });
  }
};

/**
 * @desc    Scrape live product data from URL & save/update in MongoDB
 * @route   POST /api/products/scrape
 * @access  Public
 */
export const scrapeAndSaveProduct = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'A valid e-commerce URL is required.',
      });
    }

    const scrapedData = await scrapeProductData(url);

    let product = await Product.findOne({ url: scrapedData.url });

    if (product) {
      product.currentPrice = scrapedData.currentPrice;
      product.title = scrapedData.title || product.title;
      product.platform = scrapedData.platform || product.platform;
      product.lastScrapedAt = new Date();
      await product.save();
    } else {
      product = await Product.create({
        title: scrapedData.title,
        url: scrapedData.url,
        platform: scrapedData.platform || 'Amazon',
        currentPrice: scrapedData.currentPrice,
        currency: scrapedData.currency || 'INR',
        lastScrapedAt: new Date(),
      });
    }

    await PriceHistory.create({
      product: product._id,
      productId: product._id,
      price: scrapedData.currentPrice,
      store: scrapedData.platform || 'Amazon',
      recordedAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: 'Product successfully scraped and saved.',
      data: product,
    });
  } catch (error) {
    console.error('Scrape and Save Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to scrape and save product.',
    });
  }
};

/**
 * @desc    Get product details along with historical price data
 * @route   GET /api/products/:id/history
 * @access  Public
 */
export const getProductPriceHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    const priceHistory = await PriceHistory.find({
      $or: [{ product: id }, { productId: id }],
    }).sort({ recordedAt: 1 });

    return res.status(200).json({
      success: true,
      product,
      history: priceHistory,
    });
  } catch (error) {
    console.error('Get Price History Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch price history.',
    });
  }
};

/**
 * @desc    Get all saved products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products.',
    });
  }
};