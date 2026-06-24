const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Validate cart items and return with fresh prices
router.post('/validate', async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    const validated = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) continue;

      const validatedItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || '',
        productType: product.productType,
        stock: product.stock,
        quantity: Math.min(item.quantity, product.productType === 'self' ? product.stock : 10),
        affiliateLink: product.affiliateLink
      };

      validated.push(validatedItem);
      if (product.productType === 'self') {
        total += product.price * validatedItem.quantity;
      }
    }

    res.json({ success: true, items: validated, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
