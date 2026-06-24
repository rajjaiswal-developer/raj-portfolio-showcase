import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ExternalLink, Package, CheckCircle } from 'lucide-react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    productsAPI.getOne(id)
      .then(r => setProduct(r.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4 text-text-dim">
      <Package size={48} className="opacity-20" />
      <p>Product not found</p>
      <Link to="/shop" className="btn-outline">Back to Shop</Link>
    </div>
  );

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Back */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-text-dim hover:text-accent text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-surface border border-border rounded-2xl overflow-hidden flex items-center justify-center">
              {product.images?.[0]?.url ? (
                <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package size={80} className="text-muted" />
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 bg-accent/10 text-accent border border-accent/10 rounded-full capitalize">
                {product.category}
              </span>
              {product.productType === 'affiliate' && (
                <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/10 rounded-full">
                  {product.affiliatePlatform}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-4">{product.name}</h1>

            {product.productType !== 'affiliate' && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-accent">₹{product.price?.toLocaleString()}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-muted line-through">₹{product.comparePrice?.toLocaleString()}</span>
                    <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-2 py-0.5 rounded">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
            )}

            <p className="text-text-dim leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            {product.specifications?.length > 0 && (
              <div className="bg-surface border border-border rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-text mb-3 text-sm">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map(s => (
                    <div key={s.key} className="flex justify-between text-sm">
                      <span className="text-text-dim">{s.key}</span>
                      <span className="text-text font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock info */}
            {product.productType === 'self' && (
              <div className="flex items-center gap-2 mb-6 text-sm">
                <CheckCircle size={14} className={product.stock > 0 ? 'text-green-400' : 'text-red-400'} />
                <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            )}

            {/* CTA */}
            {product.productType === 'affiliate' ? (
              <a href={product.affiliateLink} target="_blank" rel="noreferrer"
                 className="btn-primary w-full justify-center text-base py-4">
                <ExternalLink size={18} /> Buy on {product.affiliatePlatform || 'Store'}
              </a>
            ) : (
              <button
                onClick={() => addItem(product)}
                disabled={product.stock === 0}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
