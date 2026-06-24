import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, ExternalLink, ShoppingCart, Filter } from 'lucide-react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'mouse', label: 'Mouse' },
  { value: 'keyboard', label: 'Keyboard' },
  { value: 'headphones', label: 'Headphones' },
  { value: 'iot', label: 'IoT' },
  { value: 'accessories', label: 'Accessories' },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    const params = { category, limit: 20 };
    if (search) params.search = search;
    productsAPI.getAll(params)
      .then(r => setProducts(r.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <main className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 hero-gradient border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-tag"><ShoppingBag size={12} /> Tech Shop</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-2">
                Curated Tech Gear
              </h1>
              <p className="text-text-dim mt-3">Hand-picked tools for developers & makers</p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-3 bg-surface border border-border rounded-lg text-text text-sm
                           placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                category === c.value
                  ? 'bg-accent text-bg border-accent font-semibold'
                  : 'border-border text-text-dim hover:border-accent/50 hover:text-text'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-surface border border-border rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-text-dim">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="product-card card-glass flex flex-col overflow-hidden group"
              >
                {/* Image */}
                <Link to={`/shop/${p._id}`}>
                  <div className="h-44 bg-bg border border-border rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    {p.images?.[0]?.url ? (
                      <img src={p.images[0].url} alt={p.name}
                           className="product-img w-full h-full object-cover" />
                    ) : (
                      <ShoppingBag size={40} className="text-muted" />
                    )}
                  </div>
                </Link>

                <div className="flex-1 flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/10 rounded-full capitalize">
                      {p.category}
                    </span>
                    {p.productType === 'affiliate' && (
                      <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/10 rounded-full">
                        {p.affiliatePlatform || 'Affiliate'}
                      </span>
                    )}
                    {p.productType === 'self' && p.stock <= 5 && p.stock > 0 && (
                      <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/10 rounded-full">
                        Low Stock
                      </span>
                    )}
                    {p.productType === 'self' && p.stock === 0 && (
                      <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/10 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <Link to={`/shop/${p._id}`}>
                    <h3 className="font-semibold text-text mb-1 line-clamp-2 hover:text-accent transition-colors text-sm">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="text-text-dim text-xs mb-4 line-clamp-2 flex-1">{p.shortDescription}</p>

                  {/* Price + CTA */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {p.productType !== 'affiliate' && (
                        <>
                          <span className="font-display font-bold text-accent">₹{p.price?.toLocaleString()}</span>
                          {p.comparePrice && (
                            <span className="text-muted text-xs line-through">₹{p.comparePrice?.toLocaleString()}</span>
                          )}
                          {p.comparePrice && (
                            <span className="text-green-400 text-xs">
                              {Math.round((1 - p.price / p.comparePrice) * 100)}% off
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {p.productType === 'affiliate' ? (
                      <a href={p.affiliateLink} target="_blank" rel="noreferrer"
                         className="flex items-center justify-center gap-2 w-full py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/20 transition-all">
                        <ExternalLink size={12} /> Buy on {p.affiliatePlatform || 'Amazon'}
                      </a>
                    ) : (
                      <button
                        onClick={() => addItem(p)}
                        disabled={p.stock === 0}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-accent/10 border border-accent/20 text-accent rounded-lg text-xs hover:bg-accent hover:text-bg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart size={12} />
                        {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
