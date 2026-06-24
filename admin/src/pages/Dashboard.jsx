import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, FolderOpen, ShoppingBag, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { API } from '../App';

const card = { background: '#0F1318', border: '1px solid #1A2030', borderRadius: 12, padding: 24 };
const h2 = { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: '#E2E8F0', marginBottom: 24 };
const statCard = { ...card, display: 'flex', alignItems: 'center', gap: 16 };

function StatCard({ icon: Icon, label, value, color, to }) {
  return (
    <Link to={to} style={{ ...statCard, textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = color}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#1A2030'}>
      <div style={{ background: `${color}15`, borderRadius: 10, padding: 12 }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={{ color: '#8892A4', fontSize: 13, marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: '#E2E8F0' }}>{value ?? '—'}</p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/admin/stats').then(r => {
      setStats(r.stats);
      setOrders(r.recentOrders || []);
    }).catch(() => {});
  }, []);

  const STATUS_COLOR = { placed: '#FBB724', processing: '#60A5FA', shipped: '#A78BFA', delivered: '#34D399', cancelled: '#F87171' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#E2E8F0' }}>
            Dashboard
          </h1>
          <p style={{ color: '#8892A4', fontSize: 14, marginTop: 4 }}>Welcome back, Raj 👋</p>
        </div>
        <div style={{ background: '#0F1318', border: '1px solid #1A2030', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#8892A4' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon={Package} label="Total Products" value={stats?.totalProducts} color="#00F5A0" to="/products" />
        <StatCard icon={FolderOpen} label="Projects" value={stats?.totalProjects} color="#60A5FA" to="/projects" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats?.totalOrders} color="#A78BFA" to="/orders" />
        <StatCard icon={MessageSquare} label="Unread Messages" value={stats?.unreadMessages} color="#FBB724" to="/messages" />
        <div style={{ ...statCard, gridColumn: 'span 1' }}>
          <div style={{ background: 'rgba(52,211,153,0.1)', borderRadius: 10, padding: 12 }}>
            <TrendingUp size={22} color="#34D399" />
          </div>
          <div>
            <p style={{ color: '#8892A4', fontSize: 13, marginBottom: 4 }}>Revenue</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: '#E2E8F0' }}>
              ₹{stats?.revenue?.toLocaleString() || '0'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ ...h2, marginBottom: 0 }}>Recent Orders</h2>
          <Link to="/orders" style={{ color: '#00F5A0', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>
        {orders.length === 0 ? (
          <p style={{ color: '#8892A4', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>No orders yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map(o => (
              <div key={o._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1A2030' }}>
                <div>
                  <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 500 }}>{o.orderId}</p>
                  <p style={{ color: '#8892A4', fontSize: 12, marginTop: 2 }}>{o.customer?.name} — {o.customer?.email}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#00F5A0', fontWeight: 700 }}>₹{o.totalAmount?.toLocaleString()}</p>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: `${STATUS_COLOR[o.orderStatus]}20`, color: STATUS_COLOR[o.orderStatus] }}>
                    {o.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
