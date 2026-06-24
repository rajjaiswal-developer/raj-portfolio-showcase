const mongoose = require('mongoose');

// ── ORDER ──────────────────────────────────────────────────
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    image: String
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate order ID
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'RJ' + Date.now().toString(36).toUpperCase();
  }
  next();
});

// ── PROJECT ──────────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  techStack: [String],
  image: { url: String, public_id: String },
  githubUrl: String,
  liveUrl: String,
  category: {
    type: String,
    enum: ['web', 'iot', 'data', 'other'],
    default: 'web'
  },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// ── CONTACT ──────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Order: mongoose.model('Order', orderSchema),
  Project: mongoose.model('Project', projectSchema),
  Contact: mongoose.model('Contact', contactSchema)
};
