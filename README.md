# 🚀 Raj Jaiswal — Portfolio + Tech Shop

A full-stack developer portfolio with integrated tech shop, built with React, Node.js, Express, MongoDB, and Razorpay.
- Portfolio: [rajjaiswaldev.in](https://rajjaiswaldev.in/)
---

## 📁 Project Structure

```
raj-portfolio/
├── backend/          → Node.js + Express API
├── frontend/         → React.js Portfolio + Shop (port 3000)
└── admin/            → React.js Admin Dashboard (port 3001)
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Razorpay account (test keys)
- Cloudinary account (free tier)

---

### Step 1 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# → Fill in your .env values (see below)
npm run dev
# ✅ Backend running on http://localhost:5000
```

**Required .env values:**
```
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/raj-portfolio
JWT_SECRET=any_long_random_string_here
ADMIN_EMAIL=admin@rajjaiswal.dev
ADMIN_PASSWORD=YourSecurePassword123
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

> 🟢 On first run, the backend **auto-seeds**: admin user + 6 projects + 6 products.

---

### Step 2 — Frontend Setup

```bash
cd frontend
npm install
# Create .env file:
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
# ✅ Portfolio running on http://localhost:3000
```

---

### Step 3 — Admin Dashboard Setup

```bash
cd admin
npm install
# Create .env file:
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
# ✅ Admin running on http://localhost:3001
```

**Login credentials:**
- Email: `admin@rajjaiswal.dev` (or your ADMIN_EMAIL)
- Password: `YourSecurePassword123` (or your ADMIN_PASSWORD)

---

## 🌐 Production Deployment

### Backend → Render.com (Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select `backend/` folder
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all Environment Variables from `.env`
7. Deploy → copy your URL (e.g. `https://raj-api.onrender.com`)

### Frontend → Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import GitHub repo → set **Root Directory** to `frontend`
3. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://raj-api.onrender.com/api`
4. Deploy → your portfolio is live!

### Admin → Vercel (Free, separate project)

1. Vercel → New Project → same repo, root = `admin`
2. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://raj-api.onrender.com/api`
3. Deploy → keep the admin URL **private**

### Backend CORS Update

After deploying, update your backend `.env`:
```
FRONTEND_URL=https://your-portfolio.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

---

## 📦 Adding Your Resume PDF

Place `Raj_Jaiswal_CV.pdf` inside `frontend/public/` folder.
The download button in the Hero section links to `/Raj_Jaiswal_CV.pdf`.

---

## 🛠️ Admin Panel Guide

Access: `http://localhost:3001` (local) or your admin Vercel URL

| Page | What you can do |
|------|----------------|
| Dashboard | View stats — orders, products, messages, revenue |
| Products | Add/Edit/Delete products (Self-ship OR Affiliate) |
| Projects | Add/Edit/Delete portfolio projects |
| Orders | View all orders, update shipping status |
| Messages | Read contact form submissions, reply by email |

### Adding a Product

**Option 1 — Self Shipping Product:**
- Set price, stock quantity, SKU
- Customers pay via Razorpay, order tracked in admin

**Option 2 — Affiliate Product:**
- Add affiliate link (Amazon/Flipkart)
- When user clicks "Buy Now", they're redirected to the affiliate URL
- No payment processing needed

---

## 💳 Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Dashboard → Settings → API Keys → Generate Test Keys
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to backend `.env`
4. Test with card: `4111 1111 1111 1111`, any future date, any CVV
5. For production: complete KYC on Razorpay and switch to live keys

---

## ☁️ Cloudinary Setup (Image Uploads)

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Dashboard → copy Cloud Name, API Key, API Secret
3. Add to backend `.env`
4. Images are auto-optimized and stored in `raj-portfolio/` folder

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (30-day tokens) |
| Payment | Razorpay |
| Images | Cloudinary |
| Fonts | Syne, DM Sans, JetBrains Mono |

---

## 📧 Contact Info (from CV)

- **Name:** Raj Ramji Jaiswal
- **Email:** rajjaiswal7450@gmail.com
- **Phone:** +91 90821 05013
- **GitHub:** github.com/rajjaiswal-developer
- **LinkedIn:** linkedin.com/in/raj-ramji-jaiswal-087822372
- **College:** Ramniranjan Jhunjhunwala College, Mumbai (SGPA: 9.18)

---

## 🐛 Common Issues

**MongoDB connection fails:**
→ Whitelist your IP in MongoDB Atlas: Network Access → Add IP → `0.0.0.0/0`

**CORS errors:**
→ Set correct `FRONTEND_URL` and `ADMIN_URL` in backend `.env`

**Razorpay not loading:**
→ Check that `RAZORPAY_KEY_ID` starts with `rzp_test_` for test mode

**Images not uploading:**
→ Verify all 3 Cloudinary env vars are set correctly

---

*Built for Raj Jaiswal · Mumbai, India · 2025*
