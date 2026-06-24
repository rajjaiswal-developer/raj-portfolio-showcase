import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

// ── API ──────────────────────────────────────────────────────
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });
API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('adminToken');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
API.interceptors.response.use(r => r.data, e => Promise.reject(new Error(e.response?.data?.message || 'Error')));
export { API };

// ── AUTH CONTEXT ─────────────────────────────────────────────
const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      API.get('/auth/me').then(r => setAdmin(r.user)).catch(() => localStorage.removeItem('adminToken'))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const r = await API.post('/auth/login', { email, password });
    localStorage.setItem('adminToken', r.token);
    setAdmin(r.user);
  };

  const logout = () => { localStorage.removeItem('adminToken'); setAdmin(null); };

  return <AuthCtx.Provider value={{ admin, login, logout, loading }}>{children}</AuthCtx.Provider>;
}

// ── PAGES (lazy imports) ──────────────────────────────────────
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import AdminLayout from './components/AdminLayout';

function Protected({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{color:'#00F5A0'}}>Loading...</div>;
  return admin ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <Protected>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/messages" element={<Messages />} />
                </Routes>
              </AdminLayout>
            </Protected>
          } />
        </Routes>
        <Toaster position="bottom-right" toastOptions={{ style: { background:'#0F1318', color:'#E2E8F0', border:'1px solid #1A2030' } }} />
      </AuthProvider>
    </BrowserRouter>
  );
}
