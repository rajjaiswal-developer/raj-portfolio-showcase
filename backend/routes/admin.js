const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const Product = require('../models/Product');
const { Order, Project, Contact } = require('../models/index');

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalProjects,
      unreadMessages,
      recentOrders,
      revenue
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Project.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('items.product', 'name'),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalProjects,
        unreadMessages,
        revenue: revenue[0]?.total || 0
      },
      recentOrders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
