import Product from '../models/Product.js';
import Comparison from '../models/Comparison.js';
import { generateProductComparison } from '../services/aiService.js';

/**
 * @desc    Compare products by IDs using Gemini AI
 * @route   POST /api/compare
 * @access  Public
 */
export const compareProducts = async (req, res) => {
  try {
    const { productIds, rawProducts } = req.body;

    let itemsToCompare = [];

    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      itemsToCompare = await Product.find({ _id: { $in: productIds } });
    } else if (rawProducts && Array.isArray(rawProducts)) {
      itemsToCompare = rawProducts;
    }

    if (itemsToCompare.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least 2 products are required to generate a comparison.',
      });
    }

    const aiAnalysis = await generateProductComparison(itemsToCompare);

    return res.status(200).json({
      success: true,
      products: itemsToCompare,
      analysis: aiAnalysis,
    });
  } catch (error) {
    console.error('Compare Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate product comparison.',
    });
  }
};

/**
 * @desc    Save a comparison result
 * @route   POST /api/compare/save
 * @access  Public / Optional Auth
 */
export const saveComparison = async (req, res) => {
  try {
    const { productIds, aiAnalysis } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!productIds || productIds.length < 2) {
      return res.status(400).json({ success: false, message: 'Invalid products for comparison.' });
    }

    const comparison = await Comparison.create({
      userId,
      products: productIds,
      aiAnalysis,
    });

    res.status(201).json({
      success: true,
      data: comparison,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save comparison.',
    });
  }
};

/**
 * @desc    Get user comparison history
 * @route   GET /api/compare/history
 * @access  Private
 */
export const getComparisonHistory = async (req, res) => {
  try {
    const history = await Comparison.find({ userId: req.user._id })
      .populate('products')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch comparison history.',
    });
  }
};