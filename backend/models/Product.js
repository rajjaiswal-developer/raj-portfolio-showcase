const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, maxlength: 160 },
  price: { type: Number, min: 0 },
  comparePrice: { type: Number },
  images: [{ url: String, public_id: String }],
  category: {
    type: String,
    required: true,
    enum: ['mouse', 'keyboard', 'headphones', 'iot', 'accessories', 'other']
  },
  tags: [String],
  // Product type
  productType: {
    type: String,
    enum: ['self', 'affiliate'],
    required: true,
    default: 'self'
  },
  // Self-shipping fields
  stock: { type: Number, default: 0 },
  sku: { type: String },
  // Affiliate fields
  affiliateLink: { type: String },
  affiliatePlatform: { type: String }, // Amazon, Flipkart, etc.
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  // Meta
  specifications: [{
    key: String,
    value: String
  }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
