const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Order } = require('../models/index');
const Product = require('../models/Product');

let Razorpay;
try {
  Razorpay = require('razorpay');
} catch (e) {
  console.log('Razorpay not installed, payment routes disabled');
}

const getRazorpay = () => {
  if (!Razorpay) throw new Error('Razorpay not configured');
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { items, customer } = req.body;

    // Calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      if (product.productType === 'self' && product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url || ''
      });
    }

    // Create Razorpay order
    const instance = getRazorpay();
    const razorpayOrder = await instance.orders.create({
      amount: totalAmount * 100, // paise
      currency: 'INR',
      receipt: 'rj_' + Date.now()
    });

    // Save order in DB
    const order = await Order.create({
      customer,
      items: orderItems,
      totalAmount,
      razorpay: { orderId: razorpayOrder.id }
    });

    res.json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/payment/verify
router.post('/verify', async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Update order
    const order = await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      orderStatus: 'processing',
      'razorpay.paymentId': razorpayPaymentId,
      'razorpay.signature': razorpaySignature
    }, { new: true });

    // Update stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, sold: item.quantity }
      });
    }

    res.json({ success: true, message: 'Payment verified', order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
