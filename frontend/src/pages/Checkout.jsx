import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../utils/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: '', pincode: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async () => {
    const { name, email, phone, line1, city, state, pincode } = form;
    if (!name || !email || !phone || !line1 || !city || !state || !pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const orderData = await paymentAPI.createOrder({
        items: items.map(i => ({ productId: i._id, quantity: i.quantity })),
        customer: {
          name, email, phone,
          address: { line1, line2: form.line2, city, state, pincode }
        }
      });

      // Load Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.razorpayOrderId,
          name: 'Raj Jaiswal Tech Shop',
          description: 'Tech Accessories Order',
          prefill: { name, email, contact: phone },
          theme: { color: '#00F5A0' },
          handler: async (response) => {
            try {
              await paymentAPI.verify({
                orderId: orderData.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              });
              clearCart();
              navigate(`/order-success/${orderData.orderId}`);
            } catch {
              toast.error('Payment verification failed');
            }
          },
          modal: { ondismiss: () => setLoading(false) }
        });
        rzp.open();
      };
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-text-dim">Your cart is empty</p>
      <Link to="/shop" className="btn-primary">Go to Shop</Link>
    </div>
  );

  const inputCls = "w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-colors";
  const labelCls = "text-xs text-text-dim mb-1.5 block";

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-text-dim hover:text-accent text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="font-display text-3xl font-bold text-text mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping form */}
          <div className="space-y-5">
            <h2 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Lock size={15} className="text-accent" /> Shipping Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Raj Jaiswal" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Address Line 1 *</label>
              <input name="line1" value={form.line1} onChange={handleChange} placeholder="House no, Street" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Address Line 2</label>
              <input name="line2" value={form.line2} onChange={handleChange} placeholder="Landmark (optional)" className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>City *</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>State *</label>
                <input name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="card-glass h-fit">
            <h2 className="font-semibold text-text mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item._id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-12 h-12 bg-bg border border-border rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.images?.[0]?.url ? (
                      <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                    ) : <CreditCard size={16} className="text-muted" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text text-sm truncate">{item.name}</p>
                    <p className="text-text-dim text-xs">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-accent text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-4 mb-6">
              <span className="text-text">Total</span>
              <span className="text-accent text-xl">₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={handlePay}
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed text-base py-4"
            >
              <CreditCard size={18} />
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
            </button>
            <p className="text-center text-text-dim text-xs mt-3 flex items-center justify-center gap-1">
              <Lock size={11} /> Secured by Razorpay
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
