import express from 'express';
import {
  scrapeAndSaveProduct,
  getProductPriceHistory,
  getProducts,
  getCategories,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.post('/scrape', scrapeAndSaveProduct);
router.get('/:id/history', getProductPriceHistory);

export default router;