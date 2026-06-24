import React, { useEffect, useState } from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { API } from '../App';
import toast from 'react-hot-toast';

const card = { background: '#0F1318', border: '1px solid #1A2030', borderRadius: 12, padding: 24 };

const STATUS = ['placed','processing','shipped','delivered','cancelled'];
const STATUS_COLOR = {
  placed:     { bg: 'rgba(251,183,36,0.1)',  text: '#FBB724' },
  processing: { bg: 'rgba(96,165,250,0.1)',  text: '#60A5FA' },
  shipped:    { bg: 'rgba(167,139,250,0.1)', text: '#A78BFA' },
  delivered:  { bg: 'rgba(52,211,153,0.1)',  text: '#34D399' },
  cancelled:  { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
};
const PAY_COLOR = {
  paid:    { bg: 'rgba(52,211,153,0.1)',  text: '#34D399' },
  pending: { bg: 'rgba(251,183,36,0.1)',  text: '#FBB724' },
  failed:  { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = () => API.get('/orders').then(r => setOrders(r.orders)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, orderStatus) => {
    try {
      await API.patch(`/orders/${id}/status`, { orderStatus });
      toast.success('Status updated');
      load();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#E2E8F0' }}>Orders</h1>
        <p style={{ color: '#8892A4', fontSize: 14, marginTop: 4 }}>{orders.length} total orders</p>
      </div>

      <div style={card}>
        {loading ? (
          <p style={{ color: '#8892A4', textAlign: 'center', padding: 40 }}>Loading...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#8892A4' }}>
            <ShoppingBag size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>No orders yet</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            {orders.map(order => (
              <div key={order._id} style={{ borderBottom: '1px solid #1A2030', marginBottom: 2 }}>
                {/* Row */}
                <div
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                  style={{ display: 'grid', gridTemplateColumns: '140px 1fr 100px 100px 120px 120px 40px', gap: 12, alignItems: 'center', padding: '14px 8px', cursor: 'pointer', fontSize: 13 }}
                >
                  <span style={{ color: '#00F5A0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{order.orderId}</span>
                  <div>
                    <p style={{ color: '#E2E8F0', fontWeight: 500 }}>{order.customer?.name}</p>
                    <p style={{ color: '#8892A4', fontSize: 11, marginTop: 2 }}>{order.customer?.email}</p>
                  </div>
                  <span style={{ color: '#E2E8F0', fontFamily: "'JetBrains Mono', monospace' " }}>₹{order.totalAmount?.toLocaleString()}</span>
                  <span style={{ ...PAY_COLOR[order.paymentStatus], padding: '3px 8px', borderRadius: 12, fontSize: 11, textAlign: 'center' }}>{order.paymentStatus}</span>
                  <select
                    value={order.orderStatus}
                    onChange={e => { e.stopPropagation(); updateStatus(order._id, e.target.value); }}
                    onClick={e => e.stopPropagation()}
                    style={{ background: STATUS_COLOR[order.orderStatus]?.bg, color: STATUS_COLOR[order.orderStatus]?.text, border: 'none', borderRadius: 8, padding: '4px 8px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span style={{ color: '#8892A4', fontSize: 11 }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                  <ChevronDown size={14} color="#8892A4" style={{ transform: expanded === order._id ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </div>

                {/* Expanded */}
                {expanded === order._id && (
                  <div style={{ background: '#080B0F', borderRadius: 8, margin: '0 8px 12px', padding: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <p style={{ color: '#8892A4', fontSize: 12, marginBottom: 6 }}>SHIPPING ADDRESS</p>
                        <p style={{ color: '#E2E8F0', fontSize: 13 }}>{order.customer?.name}</p>
                        <p style={{ color: '#8892A4', fontSize: 12 }}>{order.customer?.address?.line1}</p>
                        {order.customer?.address?.line2 && <p style={{ color: '#8892A4', fontSize: 12 }}>{order.customer?.address?.line2}</p>}
                        <p style={{ color: '#8892A4', fontSize: 12 }}>{order.customer?.address?.city}, {order.customer?.address?.state} - {order.customer?.address?.pincode}</p>
                        <p style={{ color: '#8892A4', fontSize: 12 }}>{order.customer?.phone}</p>
                      </div>
                      {order.razorpay?.paymentId && (
                        <div>
                          <p style={{ color: '#8892A4', fontSize: 12, marginBottom: 6 }}>PAYMENT</p>
                          <p style={{ color: '#E2E8F0', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{order.razorpay.paymentId}</p>
                        </div>
                      )}
                    </div>
                    <p style={{ color: '#8892A4', fontSize: 12, marginBottom: 8 }}>ITEMS</p>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1A2030' }}>
                        <span style={{ color: '#E2E8F0' }}>{item.name} × {item.quantity}</span>
                        <span style={{ color: '#00F5A0' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
