# Idly Shop Website - Complete Guide

## 📋 Prerequisites

Before running the website, ensure you have:

1. **Node.js** installed (v14 or higher)
2. **MongoDB Atlas** account with database set up
3. **Git** (optional, for version control)
4. **Code Editor** (VS Code recommended)

---

## 🚀 Quick Start (Recommended)

### 1. **Start Everything**
Run this single command in the root folder (`d:\idly web`) to start both the Backend and Frontend:
```bash
npm run dev
```

This single command starts:
- ✅ Backend server (Port 5000)
- ✅ Frontend development server (Port 5174)

**Access your website at**: `http://localhost:5174/`

---

## 🔧 Detailed Setup Instructions

### Step 1: Install Dependencies

First time setup only:

```bash
# Navigate to project folder
cd "d:\idly web"

# Install all dependencies
npm install && npm run install:all
```

### Step 2: Configure Environment Variables

Check your `.env` file in `backend/` folder has these settings:

```env
NODE_ENV=development
PORT=5000
MONOGO_URI=your_mongodb_connection_string
JWT_SECRET=secret123
```

### Step 3: Whitelist Your IP in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Network Access** in left sidebar
3. Click **Add IP Address**
4. Click **Add Current IP Address**
5. Click **Confirm**

---

## 🎯 Running Options

### Option A: Run Backend + Frontend Together (Best)

```bash
npm run dev
```

**Access**:
- Main website: `http://localhost:5174/`
- Admin panel: `http://localhost:5174/#/admin/login`
- API: `http://localhost:5000/api/`

---

### Option B: Run Backend Only

```bash
npm run server
```

**What it does**:
- Starts only the backend server
- Runs on `http://localhost:5000`
- Good for testing API endpoints

---

### Option C: Run Frontend Only

```bash
npm run client
```

**What it does**:
- Starts only the frontend
- Runs on `http://localhost:5174`
- **Note**: Admin panel won't work without backend for real data

---

## 📦 Seeding Sample Data (Optional)

To populate your database with sample products and users:

```bash
node backend/server/seeder.js
```

**Sample Admin Credentials**:
- Email: `admin@example.com`
- Password: `adminpassword`

---

## 🌐 Accessing Your Website

### Main Website (Customer View)
```
http://localhost:5174/
```

Features:
- Browse products
- Add to cart
- Place orders
- View order success page

### Admin Panel (Admin View)
```
http://localhost:5174/#/admin/login
```

**Admin Features**:
- Login with seeded admin credentials
- View real statistics (Sales, Orders)
- Manage products (Add/Edit/Delete)
- Manage Orders (View/Update Status)
- Download Excel Reports

---

## 📝 Available NPM Scripts

```bash
# Run both backend + frontend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build
```

---

## 🎨 Project Structure

```
d:\idly web\
├── backend/            # Backend code
│   ├── server/         # Server logic
│   ├── .env            # Environment variables
│   └── package.json    # Backend dependencies
├── frontend/           # Frontend code
│   ├── src/            # React source
│   ├── vite.config.js  # Vite config
│   └── package.json    # Frontend dependencies
├── package.json        # Root dependencies & scripts
└── README.md           # This file
```

---

## 📞 Quick Reference

| What | Command | URL |
|------|---------|-----|
| Full App | `npm run dev` | `http://localhost:5174/` |
| Frontend Only | `npm run client` | `http://localhost:5174/` |
| Backend Only | `npm run server` | `http://localhost:5000/` |
| Admin Panel | - | `http://localhost:5174/#/admin/login` |
