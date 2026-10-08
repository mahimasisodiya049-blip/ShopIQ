import express from 'express';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/compare
 * @desc    Compare selected products using AI analysis
 * @access  Public / Optional Auth
 */
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of products to compare.',
      });
    }

    // Basic structure for comparison analysis
    const bestValue = products.reduce((prev, curr) =>
      curr.currentPrice < prev.currentPrice ? curr : prev
    );

    return res.status(200).json({
      success: true,
      summary: `Analyzed ${products.length} products across platforms.`,
      bestValueProduct: bestValue,
      products,
    });
  } catch (error) {
    console.error('Compare Route Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate product comparison.',
    });
  }
});

export default router;