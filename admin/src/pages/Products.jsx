import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  X,
  Save,
  Upload,
  Image,
  Loader,
} from "lucide-react";
import { API } from "../App";
import toast from "react-hot-toast";

const card = {
  background: "#0F1318",
  border: "1px solid #1A2030",
  borderRadius: 12,
  padding: 24,
};
const inp = {
  width: "100%",
  background: "#080B0F",
  border: "1px solid #1A2030",
  borderRadius: 8,
  padding: "10px 14px",
  color: "#E2E8F0",
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
};
const lbl = {
  color: "#8892A4",
  fontSize: 12,
  display: "block",
  marginBottom: 6,
};
const row2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginBottom: 16,
};

const EMPTY = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  comparePrice: "",
  category: "accessories",
  productType: "affiliate",
  affiliateLink: "",
  affiliatePlatform: "Amazon",
  stock: "",
  sku: "",
  isFeatured: false,
  isActive: true,
  specifications: [],
  images: [],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [specKey, setSpecKey] = useState("");
  const [specVal, setSpecVal] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const load = () =>
    API.get("/products", { params: { limit: 50 } })
      .then((r) => setProducts(r.products))
      .catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setEditing(null);
    setShowForm(true);
  };
  const openEdit = (p) => {
    setForm({
      ...p,
      price: p.price || "",
      comparePrice: p.comparePrice || "",
      stock: p.stock || "",
    });
    setEditing(p._id);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // ── IMAGE UPLOAD ────────────────────────────────────────────
  const uploadImage = async (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await API.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({
        ...f,
        images: [
          ...(f.images || []),
          { url: res.url, public_id: res.public_id },
        ],
      }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadImage(file);
  };

  const removeImage = (index) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  // ── SPECIFICATIONS ──────────────────────────────────────────
  const addSpec = () => {
    if (!specKey || !specVal) return;
    setForm((f) => ({
      ...f,
      specifications: [
        ...(f.specifications || []),
        { key: specKey, value: specVal },
      ],
    }));
    setSpecKey("");
    setSpecVal("");
  };
  const removeSpec = (i) =>
    setForm((f) => ({
      ...f,
      specifications: f.specifications.filter((_, idx) => idx !== i),
    }));

  // ── SAVE ────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name || !form.category || !form.productType) {
      toast.error("Fill all required fields");
      return;
    }
    setSaving(true);
    try {
      const body = {
        ...form,
        price: Number(form.price) || 0,
        comparePrice: Number(form.comparePrice) || undefined,
        stock: Number(form.stock) || 0,
      };
      if (editing) await API.put(`/products/${editing}`, body);
      else await API.post("/products", body);
      toast.success(editing ? "Product updated!" : "Product added!");
      load();
      closeForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const TYPE_COLOR = {
    self: { bg: "rgba(52,211,153,0.1)", color: "#34D399" },
    affiliate: { bg: "rgba(96,165,250,0.1)", color: "#60A5FA" },
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#E2E8F0",
            }}
          >
            Products
          </h1>
          <p style={{ color: "#8892A4", fontSize: 14, marginTop: 4 }}>
            {products.length} products in shop
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#00F5A0",
            color: "#080B0F",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div style={card}>
        {products.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "48px 0", color: "#8892A4" }}
          >
            <Package
              size={40}
              style={{ margin: "0 auto 12px", opacity: 0.3, display: "block" }}
            />
            <p>No products yet. Click "Add Product" to get started!</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #1A2030" }}>
                  {[
                    "Image",
                    "Product",
                    "Category",
                    "Type",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#8892A4",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: "1px solid #1A2030" }}>
                    <td style={{ padding: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "#080B0F",
                          border: "1px solid #1A2030",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {p.images?.[0]?.url ? (
                          <img
                            src={p.images[0].url}
                            alt={p.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Image size={18} color="#4A5568" />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: 12 }}>
                      <p style={{ color: "#E2E8F0", fontWeight: 500 }}>
                        {p.name}
                      </p>
                      <p
                        style={{ color: "#8892A4", fontSize: 12, marginTop: 2 }}
                      >
                        {p.shortDescription?.slice(0, 35)}...
                      </p>
                    </td>
                    <td
                      style={{
                        padding: 12,
                        color: "#8892A4",
                        textTransform: "capitalize",
                      }}
                    >
                      {p.category}
                    </td>
                    <td style={{ padding: 12 }}>
                      <span
                        style={{
                          ...TYPE_COLOR[p.productType],
                          padding: "3px 8px",
                          borderRadius: 12,
                          fontSize: 11,
                        }}
                      >
                        {p.productType}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: 12,
                        color:
                          p.productType === "affiliate" ? "#8892A4" : "#00F5A0",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {p.productType === "affiliate"
                        ? "—"
                        : `₹${p.price?.toLocaleString()}`}
                    </td>
                    <td style={{ padding: 12, color: "#8892A4" }}>
                      {p.productType === "affiliate" ? "—" : p.stock}
                    </td>
                    <td style={{ padding: 12 }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: 12,
                          fontSize: 11,
                          background: p.isActive
                            ? "rgba(52,211,153,0.1)"
                            : "rgba(248,113,113,0.1)",
                          color: p.isActive ? "#34D399" : "#F87171",
                        }}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => openEdit(p)}
                          style={{
                            background: "rgba(96,165,250,0.1)",
                            border: "none",
                            borderRadius: 6,
                            padding: 6,
                            color: "#60A5FA",
                            cursor: "pointer",
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                        {p.affiliateLink && (
                          <a
                            href={p.affiliateLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: "rgba(0,245,160,0.1)",
                              borderRadius: 6,
                              padding: 6,
                              color: "#00F5A0",
                              display: "flex",
                            }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          style={{
                            background: "rgba(248,113,113,0.1)",
                            border: "none",
                            borderRadius: 6,
                            padding: 6,
                            color: "#F87171",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              ...card,
              width: "100%",
              maxWidth: 720,
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#E2E8F0",
                }}
              >
                {editing ? "✏️ Edit Product" : "➕ Add New Product"}
              </h2>
              <button
                onClick={closeForm}
                style={{
                  background: "rgba(248,113,113,0.1)",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#F87171",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <X size={16} /> Close
              </button>
            </div>

            {/* IMAGE UPLOAD */}
            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Product Images</label>

              {/* Drop zone */}
              <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? "#00F5A0" : "#1A2030"}`,
                  borderRadius: 10,
                  padding: "24px 16px",
                  textAlign: "center",
                  cursor: uploading ? "not-allowed" : "pointer",
                  background: dragOver ? "rgba(0,245,160,0.05)" : "#080B0F",
                  transition: "all 0.2s",
                  marginBottom: 12,
                }}
              >
                {uploading ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Loader
                      size={28}
                      color="#00F5A0"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    <p style={{ color: "#00F5A0", fontSize: 13 }}>
                      Uploading to Cloudinary...
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Upload size={28} color="#4A5568" />
                    <p style={{ color: "#8892A4", fontSize: 13 }}>
                      <span style={{ color: "#00F5A0", fontWeight: 600 }}>
                        Click to upload
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p style={{ color: "#4A5568", fontSize: 11 }}>
                      JPG, PNG, WEBP — max 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />

              {/* Previews */}
              {form.images?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  {form.images.map((img, i) => (
                    <div
                      key={i}
                      style={{ position: "relative", width: 80, height: 80 }}
                    >
                      <img
                        src={img.url}
                        alt={`Product ${i + 1}`}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "2px solid #1A2030",
                        }}
                      />
                      <button
                        onClick={() => removeImage(i)}
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#F87171",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        ×
                      </button>
                      {i === 0 && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 4,
                            left: 4,
                            background: "rgba(0,245,160,0.9)",
                            color: "#080B0F",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "1px 5px",
                            borderRadius: 4,
                          }}
                        >
                          MAIN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BASIC INFO */}
            <div style={row2}>
              <div>
                <label style={lbl}>Product Name *</label>
                <input
                  style={inp}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Logitech MX Master 3S"
                />
              </div>
              <div>
                <label style={lbl}>Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={inp}
                >
                  {[
                    "mouse",
                    "keyboard",
                    "headphones",
                    "iot",
                    "accessories",
                    "other",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>
                Short Description (shown on product card)
              </label>
              <input
                style={inp}
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="One line summary"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Full Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                style={{ ...inp, resize: "vertical" }}
                placeholder="Detailed product description..."
              />
            </div>

            {/* PRODUCT TYPE */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Product Type *</label>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  {
                    val: "self",
                    icon: "📦",
                    title: "Self Shipping",
                    desc: "You ship it — stock + Razorpay payment",
                  },
                  {
                    val: "affiliate",
                    icon: "🔗",
                    title: "Affiliate Link",
                    desc: "Redirect to Amazon/Flipkart",
                  },
                ].map((t) => (
                  <label
                    key={t.val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      flex: 1,
                      background:
                        form.productType === t.val
                          ? "rgba(0,245,160,0.08)"
                          : "#080B0F",
                      border: `1px solid ${form.productType === t.val ? "#00F5A0" : "#1A2030"}`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="productType"
                      value={t.val}
                      checked={form.productType === t.val}
                      onChange={handleChange}
                      style={{ accentColor: "#00F5A0" }}
                    />
                    <div>
                      <p
                        style={{
                          color: "#E2E8F0",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {t.icon} {t.title}
                      </p>
                      <p
                        style={{ color: "#8892A4", fontSize: 11, marginTop: 2 }}
                      >
                        {t.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* CONDITIONAL PRICE / AFFILIATE FIELDS */}
            {form.productType === "self" ? (
              <div style={row2}>
                <div>
                  <label style={lbl}>Price (₹) *</label>
                  <input
                    style={inp}
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="799"
                  />
                </div>
                <div>
                  <label style={lbl}>Compare Price (₹)</label>
                  <input
                    style={inp}
                    name="comparePrice"
                    type="number"
                    value={form.comparePrice}
                    onChange={handleChange}
                    placeholder="1299"
                  />
                </div>
                <div>
                  <label style={lbl}>Stock Quantity</label>
                  <input
                    style={inp}
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="25"
                  />
                </div>
                <div>
                  <label style={lbl}>SKU</label>
                  <input
                    style={inp}
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    placeholder="IOT-ESP-001"
                  />
                </div>
              </div>
            ) : (
              <div style={row2}>
                <div>
                  <label style={lbl}>Affiliate Link *</label>
                  <input
                    style={inp}
                    name="affiliateLink"
                    value={form.affiliateLink}
                    onChange={handleChange}
                    placeholder="https://www.amazon.in/dp/..."
                  />
                </div>
                <div>
                  <label style={lbl}>Platform</label>
                  <select
                    name="affiliatePlatform"
                    value={form.affiliatePlatform}
                    onChange={handleChange}
                    style={inp}
                  >
                    {[
                      "Amazon",
                      "Flipkart",
                      "Myntra",
                      "Croma",
                      "Reliance Digital",
                      "Other",
                    ].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* SPECIFICATIONS */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Specifications</label>
              {(form.specifications || []).map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 6,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      background: "#080B0F",
                      border: "1px solid #1A2030",
                      borderRadius: 6,
                      padding: "5px 10px",
                      color: "#E2E8F0",
                      fontSize: 12,
                      flex: 1,
                    }}
                  >
                    <strong style={{ color: "#8892A4" }}>{s.key}:</strong>{" "}
                    {s.value}
                  </span>
                  <button
                    onClick={() => removeSpec(i)}
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      border: "none",
                      borderRadius: 6,
                      padding: "5px 8px",
                      color: "#F87171",
                      cursor: "pointer",
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input
                  style={{ ...inp, flex: 1 }}
                  placeholder="Key (e.g. Battery)"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSpec()}
                />
                <input
                  style={{ ...inp, flex: 1 }}
                  placeholder="Value (e.g. 30hrs)"
                  value={specVal}
                  onChange={(e) => setSpecVal(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSpec()}
                />
                <button
                  onClick={addSpec}
                  style={{
                    background: "rgba(0,245,160,0.1)",
                    border: "1px solid rgba(0,245,160,0.2)",
                    borderRadius: 8,
                    padding: "0 14px",
                    color: "#00F5A0",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* TOGGLES */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginBottom: 24,
                padding: "12px 0",
                borderTop: "1px solid #1A2030",
                borderBottom: "1px solid #1A2030",
              }}
            >
              {[
                { name: "isFeatured", label: "⭐ Featured on homepage" },
                { name: "isActive", label: "✅ Active (visible in shop)" },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#8892A4",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={form[name]}
                    onChange={handleChange}
                    style={{
                      width: 16,
                      height: 16,
                      accentColor: "#00F5A0",
                      cursor: "pointer",
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* SAVE BUTTON */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: saving ? "#1A2030" : "#00F5A0",
                  color: saving ? "#8892A4" : "#080B0F",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: "'Syne', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {saving ? (
                  <>
                    <Loader size={15} /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />{" "}
                    {editing ? "Update Product" : "Add Product"}
                  </>
                )}
              </button>
              <button
                onClick={closeForm}
                style={{
                  background: "none",
                  border: "1px solid #1A2030",
                  borderRadius: 8,
                  padding: "12px 20px",
                  color: "#8892A4",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
