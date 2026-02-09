# Gliffy Foods - E-Commerce Website

## 🌟 Overview

This is a modern, production-ready e-commerce website for **Gliffy Foods**, specializing in Idly Maavu (Idli batter) and related products. The website features a complete shopping experience with UPI payment integration, WhatsApp notifications, and a seamless mobile-first design.

---

## 📁 Project Structure

```
idly-web/
├── public/
│   └── assets/           # Product images and static assets
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── context/
│   │   └── ShopContext.jsx    # Global state management
│   ├── data/
│   │   └── products.js        # Product catalog
│   ├── pages/             # Main application pages
│   │   ├── Products.jsx       # Product listing page
│   │   ├── Cart.jsx           # Shopping cart
│   │   ├── CustomerDetails.jsx # Customer information form
│   │   ├── Payment.jsx        # Payment & order confirmation
│   │   └── OrderSuccess.jsx   # Order success page
│   ├── styles/           # CSS stylesheets
│   │   ├── index.css          # Global styles & theme
│   │   ├── Navbar.css
│   │   ├── Products.css
│   │   ├── Cart.css
│   │   ├── Payment.css
│   │   └── OrderSuccess.css
│   ├── config.js         # Shop configuration (UPI, WhatsApp, etc.)
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Application entry point
├── HOSTING_GUIDE.md      # Deployment instructions
├── MERCHANT_UPGRADE.md   # Business UPI account guide
├── vite.config.js        # Vite build configuration
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies and scripts
```

---

## 🚀 How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📱 Application Flow

### 1. **Products Page** (`/`)
- **Purpose:** Browse and add products to cart
- **Features:**
  - Grid layout of all available products
  - Product cards with images, names, prices
  - "Add to Cart" buttons with quantity controls
  - Real-time cart badge in navbar
  - Responsive design for mobile/desktop

### 2. **Cart Page** (`/cart`)
- **Purpose:** Review selected items before checkout
- **Features:**
  - List of all cart items with quantities
  - Ability to increase/decrease quantities
  - Remove items from cart
  - Total price calculation
  - "Proceed to Checkout" button
  - Empty cart validation

### 3. **Customer Details Page** (`/customer-details`)
- **Purpose:** Collect customer information
- **Features:**
  - Form fields: Name, Phone, Address
  - Input validation
  - Data stored in localStorage
  - "Continue to Payment" button
  - Auto-redirect if cart is empty

### 4. **Payment Page** (`/payment`) ⭐ MAIN FEATURE
- **Purpose:** Complete payment and confirm order
- **Features:** See detailed section below

### 5. **Order Success Page** (`/success`)
- **Purpose:** Confirmation screen after order placement
- **Features:**
  - Success animation
  - Order confirmation message
  - "Continue Shopping" button
  - Auto-redirect if no order exists

---

## 💳 Payment System - Detailed Explanation

The payment page is the **core feature** of this website. Here's exactly how it works:

### Visual Layout

The page is split into two sections:

**LEFT SIDE: Bill Summary**
- Shop name and logo
- List of ordered items with quantities
- Total amount
- Customer details (name, phone, address)

**RIGHT SIDE: Payment Hub**
- QR code for UPI payment
- Two payment options (gates)
- Receipt upload section
- WhatsApp notification system

---

### Payment Flow - Step by Step

#### **Step 1: Customer Arrives at Payment Page**
```
User sees:
├── Bill on left side
└── Payment hub on right side
    ├── QR Code (₹60.00)
    └── Two payment buttons:
        ├── "Open Payment App" (Recommended)
        └── "Alternative Pay Link" (Bypass)
```

#### **Step 2: Customer Chooses Payment Method**

**Option A: Standard Payment (Recommended)**
- Customer clicks "Open Payment App" button
- UPI deep link opens their payment app (PhonePe/GPay/Paytm)
- Amount is pre-filled: ₹60.00
- Customer completes payment in the app

**Option B: Alternative Payment (Bank Limit Bypass)**
- If the first option shows "Bank Limit Error"
- Customer clicks "Alternative Pay Link"
- UPI app opens WITHOUT pre-filled amount
- Customer manually types ₹60.00
- This bypasses bank security limits on personal accounts

**Technical Details:**
```javascript
// Standard UPI Link (with amount)
upi://pay?pa=8420945204@pbl&pn=Gliffy%20Foods&am=60.00&cu=INR&tn=Order%20TR-123&mc=5411&tr=TR-123

// Alternative UPI Link (without amount - bypass)
upi://pay?pa=8420945204@pbl&pn=Gliffy%20Foods&tn=Order%20TR-123
```

#### **Step 3: Payment Completion Detection**

When the customer returns from the payment app:
```
Browser detects visibility change
    ↓
Shows green "Return Nudge" box
    ↓
Message: "Finished Paying? Upload a screenshot!"
    ↓
Auto-scrolls to upload section
```

#### **Step 4: Screenshot Upload**

Customer uploads payment receipt:
```
1. Clicks upload area (dashed border box)
2. Selects screenshot from gallery
3. Preview appears instantly
4. "Confirm Order" button activates (green)
```

**Technical Implementation:**
```javascript
const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceiptFile(file);
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
        setReceiptPreview(reader.result);
    };
    reader.readAsDataURL(file);
};
```

#### **Step 5: Order Confirmation**

Customer clicks "Confirm Order":
```
1. Verification animation starts (1.5 seconds)
   - "Connecting..."
   - "Verifying UTR..."
   - "Success! Processing Order..."

2. PDF receipt downloads to customer's device
   - Contains: Order ID, Items, Amount, Customer details
   - Status: "PENDING (Receipt Uploaded)"

3. ✨ NEW: Screenshot Reminder Popup appears
```

#### **Step 6: Screenshot Reminder Modal** ⭐ NEW FEATURE

A beautiful popup appears with:
```
┌─────────────────────────────────┐
│         ✅ (animated icon)       │
│     Order Confirmed!            │
│                                 │
│  📎 Important Next Step:        │
│  1. WhatsApp will open          │
│  2. Attach payment screenshot   │
│  3. Send message                │
│                                 │
│  [Open WhatsApp & Send Order]   │
└─────────────────────────────────┘
```

**Why this popup?**
- Ensures customer doesn't forget to attach screenshot
- Clear step-by-step instructions
- Professional user experience
- Blocks screen until acknowledged

#### **Step 7: WhatsApp Notification**

Customer clicks "Open WhatsApp & Send Order":
```
1. WhatsApp opens with pre-filled message:

   *NEW ORDER RECEIVED*
   
   *Order ID:* ORD-1234
   *Customer:* John Doe
   *Phone:* 9876543210
   *Address:* 123 Main St, City
   
   *Items:*
   2x Idly Maavu (1kg)
   
   *Total Amount:* ₹60.00
   *Status:* Payment Done (Screenshot Proof in WA)
   
   _Note: Customer will attach screenshot in next message_

2. Customer manually attaches the screenshot they uploaded
3. Customer sends message to owner
4. Customer is redirected to Success page
```

**Technical Implementation:**
```javascript
const sendWhatsAppToOwner = (orderId, total, items) => {
    const itemText = items.map(i => `${i.quantity}x ${i.name}`).join('%0A');
    const message = `*NEW ORDER RECEIVED*%0A%0A*Order ID:* ${orderId}...`;
    const whatsappUrl = `https://wa.me/918420945204?text=${message}`;
    window.open(whatsappUrl, '_blank');
};
```

---

## 🎨 Design Features

### Theme Colors
- **Primary:** Green (`#008000`) - Professional, fresh, food-related
- **Accents:** White background, clean typography
- **Shadows:** Subtle depth with green glow effects

### Responsive Design
- **Mobile-first approach**
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly buttons (minimum 44px height)
- Optimized images and layouts

### Animations
- Fade-in effects on page load
- Bounce animations for success states
- Smooth hover transitions
- Loading spinners during verification

---

## ⚙️ Configuration

### Edit Shop Details (`src/config.js`)

```javascript
export const SHOP_CONFIG = {
    merchantName: 'Gliffy Foods',
    upiId: '8420945204@pbl',        // Change to your UPI ID
    whatsappNumber: '918420945204',  // Change to your WhatsApp
    mcc: '5411',                     // Merchant Category Code
};
```

### Add/Edit Products (`src/data/products.js`)

```javascript
{
    id: 1,
    name: 'Idly Maavu (1kg)',
    price: 60,
    image: '/assets/logo1.png',
    description: 'Fresh Idli batter'
}
```

---

## 🚨 Important Notes

### Payment Limitations
- **WhatsApp cannot auto-attach files** - This is a WhatsApp security restriction
- Customer must manually attach screenshot after WhatsApp opens
- This is standard practice for small businesses

### Bank Limits
- Personal UPI accounts have daily transaction limits
- **Solution:** Upgrade to PhonePe Business / Google Pay Business
- See `MERCHANT_UPGRADE.md` for instructions

### Hosting
- Configured for Vercel/GitHub Pages
- Uses relative paths (`base: './'` in vite.config.js)
- HashRouter prevents 404 errors on refresh
- See `HOSTING_GUIDE.md` for deployment

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "lucide-react": "^0.469.0",
  "jspdf": "^2.5.2"
}
```

---

## 🛠️ Troubleshooting

### "Bank Limit" Error
- Use the "Alternative Pay Link" button
- Or upgrade to Merchant UPI account

### Images Not Loading After Hosting
- Check `vite.config.js` has `base: './'`
- Verify image paths in `products.js`

### WhatsApp Not Opening
- Check `SHOP_CONFIG.whatsappNumber` format: `91XXXXXXXXXX`
- Ensure no spaces or special characters

---

## 📞 Support

For issues or questions:
- WhatsApp: +91 8420945204
- Email: support@gliffyfoods.com

---

## 📄 License

This project is proprietary software for Gliffy Foods.

---

**Built with ❤️ using React + Vite**
