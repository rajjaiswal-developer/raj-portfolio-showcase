import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-accent" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-text mb-3">Order Placed!</h1>
        <p className="text-text-dim mb-2">Thank you for your purchase.</p>
        <p className="text-text-dim text-sm mb-2">Order ID: <span className="text-accent font-mono">{orderId}</span></p>
        <p className="text-text-dim text-sm mb-8">You'll receive a confirmation email shortly.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="btn-outline"><ShoppingBag size={16} /> Continue Shopping</Link>
          <Link to="/" className="btn-primary"><Home size={16} /> Go Home</Link>
        </div>
      </motion.div>
    </main>
  );
}
