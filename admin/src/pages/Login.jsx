import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080B0F', fontFamily: "'DM Sans', sans-serif" },
  card: { background: '#0F1318', border: '1px solid #1A2030', borderRadius: 16, padding: 40, width: '100%', maxWidth: 400 },
  logo: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: '#E2E8F0', textAlign: 'center', marginBottom: 8 },
  sub: { color: '#8892A4', fontSize: 14, textAlign: 'center', marginBottom: 32 },
  label: { color: '#8892A4', fontSize: 12, display: 'block', marginBottom: 6 },
  inputWrap: { position: 'relative', marginBottom: 16 },
  input: { width: '100%', background: '#080B0F', border: '1px solid #1A2030', borderRadius: 8, padding: '12px 40px 12px 40px', color: '#E2E8F0', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', fontFamily: "'DM Sans', sans-serif" },
  icon: { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4A5568', pointerEvents: 'none' },
  eyeBtn: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4A5568', cursor: 'pointer', padding: 0 },
  btn: { width: '100%', background: '#00F5A0', color: '#080B0F', border: 'none', borderRadius: 8, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Syne', sans-serif", marginTop: 8 },
  warn: { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 8, padding: '10px 14px', color: '#FBB724', fontSize: 12, marginBottom: 24 },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>RJ<span style={{ color: '#00F5A0' }}>.</span></div>
        <p style={s.sub}>Admin Dashboard — Private Access</p>
        <div style={s.warn}>
          ⚠️ Authorized personnel only. All access attempts are logged.
        </div>
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email Address</label>
          <div style={s.inputWrap}>
            <Mail size={16} style={s.icon} />
            <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)}
                   placeholder="admin@rajjaiswal.dev" required
                   onFocus={e => e.target.style.borderColor = '#00F5A0'}
                   onBlur={e => e.target.style.borderColor = '#1A2030'} />
          </div>
          <label style={s.label}>Password</label>
          <div style={s.inputWrap}>
            <Lock size={16} style={s.icon} />
            <input style={s.input} type={showPw ? 'text' : 'password'} value={password}
                   onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                   onFocus={e => e.target.style.borderColor = '#00F5A0'}
                   onBlur={e => e.target.style.borderColor = '#1A2030'} />
            <button type="button" style={s.eyeBtn} onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button type="submit" style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
