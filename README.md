# 🍚 Annapoorani Idly Shop

A modern e-commerce platform for selling Idly & Dosa batter, built with the MERN stack (MongoDB, Express, React, Node.js).

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org)

---

## 🏗️ Project Structure

The project is split into two separate directories for better organization:

```
idly/
├── frontend/        # React + Vite application
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── backend/         # Node.js + Express server
│   ├── server/
│   └── .env
│
└── package.json     # Root script to run both
```

---

## 🚀 Quick Start (Recommended)

1. **Install Dependencies** (Run this once in the root folder)
   ```bash
   npm run install:all
   ```

2. **Start Everything**
   ```bash
   npm run dev
   ```
   *This starts both Backend (port 5000) and Frontend (port 5173/5174).*

---

## 📦 Run Separately (Optional)

If you prefer to run them in separate terminals:

**Terminal 1: Backend**
```bash
npm run server
```

**Terminal 2: Frontend**
```bash
npm run client
```

---

## 🌐 URLs

- **Website**: http://localhost:5173/
- **Backend API**: http://localhost:5000/
- **Admin Panel**: http://localhost:5173/#/admin/login

---

## ✨ Features

### Customer
- 🛒 Premium Cart & Checkout
- 📱 Mobile-First Design
- 📄 Invoice Generation (PDF)
- 💹 Dynamic Pricing

### Admin Panel
- 📊 Real-time Dashboard
- 📦 Product Management (Add/Edit/Delete)
- 📈 Sales Statistics
- 🎨 Customizable Theme

---

## 🔧 Configuration

### Environment Variables (`backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### IP Whitelist
If you see MongoDB connection errors, ensure your IP is whitelisted in MongoDB Atlas.

---

## 👨‍💻 Author

**Jitesh**  
Developed with ❤️ for Gliffy Shop.
