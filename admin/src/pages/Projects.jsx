import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, FolderOpen } from 'lucide-react';
import { API } from '../App';
import toast from 'react-hot-toast';

const card = { background: '#0F1318', border: '1px solid #1A2030', borderRadius: 12, padding: 24 };
const inp = { width: '100%', background: '#080B0F', border: '1px solid #1A2030', borderRadius: 8, padding: '10px 14px', color: '#E2E8F0', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none' };
const lbl = { color: '#8892A4', fontSize: 12, display: 'block', marginBottom: 6 };
const EMPTY = { title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', category: 'web', isFeatured: false, order: 0 };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => API.get('/projects').then(r => setProjects(r.projects)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, techStack: (p.techStack || []).join(', ') }); setEditing(p._id); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title) { toast.error('Title required'); return; }
    setSaving(true);
    try {
      const body = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) };
      if (editing) await API.put(`/projects/${editing}`, body);
      else await API.post('/projects', body);
      toast.success(editing ? 'Project updated!' : 'Project added!');
      load(); setShowForm(false);
    } catch (err) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try { await API.delete(`/projects/${id}`); toast.success('Deleted'); load(); } catch (err) { toast.error(err.message); }
  };

  const CAT_COLOR = { web: '#60A5FA', data: '#FBB724', iot: '#34D399', other: '#A78BFA' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#E2E8F0' }}>Projects</h1>
          <p style={{ color: '#8892A4', fontSize: 14, marginTop: 4 }}>{projects.length} portfolio projects</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#00F5A0', color: '#080B0F', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {projects.map(p => (
          <div key={p._id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 12, background: `${CAT_COLOR[p.category]}20`, color: CAT_COLOR[p.category] }}>{p.category?.toUpperCase()}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(p)} style={{ background: 'rgba(96,165,250,0.1)', border: 'none', borderRadius: 6, padding: 6, color: '#60A5FA', cursor: 'pointer' }}><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(p._id, p.title)} style={{ background: 'rgba(248,113,113,0.1)', border: 'none', borderRadius: 6, padding: 6, color: '#F87171', cursor: 'pointer' }}><Trash2 size={13} /></button>
              </div>
            </div>
            <h3 style={{ color: '#E2E8F0', fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ color: '#8892A4', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.description?.slice(0, 100)}...</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.techStack?.slice(0, 4).map(t => (
                <span key={t} style={{ fontSize: 11, padding: '2px 8px', background: '#080B0F', border: '1px solid #1A2030', borderRadius: 4, color: '#8892A4', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
              ))}
            </div>
            {p.isFeatured && <span style={{ display: 'inline-block', marginTop: 10, fontSize: 11, color: '#00F5A0' }}>⭐ Featured</span>}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ ...card, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#E2E8F0' }}>{editing ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#8892A4', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            {[
              { l: 'Title *', n: 'title', t: 'text' },
              { l: 'Description', n: 'description', t: 'textarea' },
              { l: 'Tech Stack (comma-separated)', n: 'techStack', t: 'text', ph: 'React, Node.js, MongoDB' },
              { l: 'GitHub URL', n: 'githubUrl', t: 'text', ph: 'https://github.com/...' },
              { l: 'Live URL', n: 'liveUrl', t: 'text', ph: 'https://...' },
            ].map(({ l, n, t, ph }) => (
              <div key={n} style={{ marginBottom: 16 }}>
                <label style={lbl}>{l}</label>
                {t === 'textarea'
                  ? <textarea name={n} value={form[n]} onChange={e => setForm(f => ({ ...f, [n]: e.target.value }))} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder={ph} />
                  : <input name={n} value={form[n]} onChange={e => setForm(f => ({ ...f, [n]: e.target.value }))} style={inp} placeholder={ph} />
                }
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={lbl}>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
                  {['web','data','iot','other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Order (display sequence)</label>
                <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} style={inp} />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892A4', fontSize: 13, marginBottom: 24, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} />
              Mark as Featured
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSave} disabled={saving}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#00F5A0', color: '#080B0F', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                <Save size={15} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: '1px solid #1A2030', borderRadius: 8, padding: '10px 20px', color: '#8892A4', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
