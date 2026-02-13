# 🍚 Annapoorani Idly Shop - E-Commerce Platform

A full-stack e-commerce web application for selling Idly Maavu (Idly batter) and Dosa Maavu products, built with React, Node.js, Express, and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

---

## ✨ Features

### Customer Features
- 🛍️ Browse products with beautiful UI
- 🛒 Shopping cart with side drawer
- 📦 Order placement and tracking
- 📱 Responsive design (mobile, tablet, desktop)
- ✅ Order success page with invoice download

### Admin Panel Features
- 📊 Dashboard with statistics and charts
- 📈 Sales analytics and reporting
- 🏷️ Product management (CRUD operations)
- 👥 User management
- 📥 Export reports to Excel
- 🎨 Premium UI with Poppins font
- 🔴 Red accent theme
- 🔐 UI-only mode (works without backend)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jiteshgoodboy0109-jit/idly.git
cd idly
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. **Whitelist your IP in MongoDB Atlas**
- Go to MongoDB Atlas → Network Access
- Add your current IP address

5. **Seed database (optional)**
```bash
node server/seeder.js
```

6. **Run the application**
```bash
npm run dev:full
```

The application will be available at:
- **Frontend**: http://localhost:5174/
- **Backend API**: http://localhost:5000/
- **Admin Panel**: http://localhost:5174/#/admin/login

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend only (Vite dev server) |
| `npm run server` | Run backend only (Node.js server) |
| `npm run dev:full` | Run both frontend and backend concurrently |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `node server/seeder.js` | Seed database with sample data |

---

## 🏗️ Project Structure

```
idly/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── data/              # Sample data for seeding
│   ├── seeder.js          # Database seeder
│   └── server.js          # Express server entry point
├── src/                   # Frontend (React + Vite)
│   ├── admin/             # Admin panel components
│   │   ├── pages/         # Dashboard, Products, etc.
│   │   └── AdminLayout.jsx
│   ├── components/        # Reusable components
│   ├── context/           # React Context (state management)
│   ├── pages/             # Customer-facing pages
│   ├── styles/            # CSS files
│   ├── App.jsx            # Main app component
│   └── main.jsx           # React entry point
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

## 🔑 Admin Panel Access

### UI-Only Mode (No Backend Required)
- URL: `http://localhost:5174/#/admin/login`
- Login with **any email and password**
- Features mock data for demonstration

### With Backend (Real Data)
- URL: `http://localhost:5174/#/admin/login`
- **Email**: `jiteshgoodboy.0109@gmail.com`
- **Password**: `12345678`
- Requires backend server running and database seeded

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **XLSX** - Excel export functionality
- **jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server
- **dotenv** - Environment variables

---

## 🎨 Design Features

- ✅ Clean white background
- ✅ Poppins font throughout
- ✅ Red accent color (#ef4444)
- ✅ Black text for readability
- ✅ Responsive design
- ✅ Glassmorphism effects
- ✅ Smooth animations
- ✅ Premium UI/UX

---

## 📱 Pages & Routes

### Customer Routes
- `/` - Home page (Products)
- `/success` - Order success page

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard with analytics
- `/admin/products` - Product list
- `/admin/products/new` - Add new product
- `/admin/products/edit/:id` - Edit product

---

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5000  # Kill backend
npx kill-port 5174  # Kill frontend
```

### MongoDB Connection Error
1. Check IP whitelist in MongoDB Atlas
2. Verify `MONGO_URI` in `.env`
3. Ensure internet connection

### Module Not Found
```bash
rm -rf node_modules
npm install
```

---

## 📄 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/login` - User login
- `POST /api/users/` - Register user

### Orders
- `GET /api/orders/stats` - Get order statistics (Admin)

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Heroku)
- Set environment variables
- Deploy from GitHub repository

---

## 👥 Admin Credentials (After Seeding)

- **Email**: jiteshgoodboy.0109@gmail.com
- **Password**: 12345678

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jitesh**
- GitHub: [@jiteshgoodboy0109-jit](https://github.com/jiteshgoodboy0109-jit)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database platform
- Vite for the blazing-fast build tool
- All open-source contributors

---

## 📞 Support

For support, email jiteshgoodboy.0109@gmail.com or open an issue on GitHub.

---

**Made with ❤️ for Annapoorani Idly Shop**
