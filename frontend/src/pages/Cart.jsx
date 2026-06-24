import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-6">
      <ShoppingBag size={60} className="text-muted opacity-30" />
      <h2 className="font-display text-2xl text-text">Your cart is empty</h2>
      <p className="text-text-dim text-sm">Browse our tech gear and add some products</p>
      <Link to="/shop" className="btn-primary">Browse Shop <ArrowRight size={16} /></Link>
    </div>
  );

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-text mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map(item => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card-glass flex gap-4"
              >
                <div className="w-20 h-20 bg-bg border border-border rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.images?.[0]?.url ? (
                    <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag size={24} className="text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-accent font-bold mb-3">₹{(item.price * item.quantity).toLocaleString()}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-bg border border-border rounded-lg p-1">
                      <button onClick={() => updateQty(item._id, item.quantity - 1)}
                              className="p-1 hover:text-accent transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, item.quantity + 1)}
                              className="p-1 hover:text-accent transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item._id)}
                            className="text-muted hover:text-red-400 transition-colors p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="card-glass h-fit">
            <h2 className="font-display font-semibold text-text mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-dim">Subtotal ({items.length} items)</span>
                <span className="text-text">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-dim">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span className="text-text">Total</span>
                <span className="text-accent text-lg">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary w-full justify-center">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <button onClick={clearCart}
                    className="w-full mt-3 text-center text-text-dim text-xs hover:text-red-400 transition-colors">
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
