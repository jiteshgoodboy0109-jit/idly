import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../config';
import { ShieldCheck, Receipt, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import '../styles/Payment.css';

/**
 * Payment Page
 * Handles UTR verification, PDF receipt generation, and WhatsApp owner notification.
 * Designed for a premium, manual-style experience with perfect mobile centering.
 */
const Payment = () => {
    const { cart, getCartTotal, placeOrder, userDetails } = useShop();
    const navigate = useNavigate();
    const [utr, setUtr] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStep, setVerificationStep] = useState(0); // 0: input, 1: connecting, 2: checking, 3: success

    // Safety: don't stay here if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    if (cart.length === 0) return null;

    const totalAmount = getCartTotal();

    // UPI Link for QR and Mobile Deep Linking
    const upiLink = `upi://pay?pa=${SHOP_CONFIG.upiId}&pn=${encodeURIComponent(SHOP_CONFIG.merchantName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent('Order from ' + SHOP_CONFIG.merchantName)}`;

    /* 
     * PDF RECEIPT GENERATOR
     */
    const downloadReceipt = (orderId, total, items) => {
        const doc = new jsPDF();

        // Brand Header
        doc.setFontSize(22);
        doc.setTextColor(0, 128, 0);
        doc.text(SHOP_CONFIG.merchantName, 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text('Digital Purchase Receipt', 105, 30, { align: 'center' });
        doc.line(20, 35, 190, 35);

        // Order Summary
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`Order ID: ${orderId}`, 20, 45);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

        doc.setTextColor(255, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(`PAYMENT STATUS: PENDING (Admin Verification Required)`, 20, 55);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);

        // Address Section
        doc.text(`Customer: ${userDetails.name}`, 20, 65);
        doc.text(`Phone: ${userDetails.phone}`, 20, 70);
        doc.text(`Address: ${userDetails.address}`, 20, 75);

        // Items Table
        doc.line(20, 80, 190, 80);
        doc.text('Item', 20, 85);
        doc.text('Qty', 140, 85);
        doc.text('Price', 170, 85);
        doc.line(20, 88, 190, 88);

        let y = 95;
        items.forEach(item => {
            doc.text(item.name, 20, y);
            doc.text(item.quantity.toString(), 140, y);
            doc.text(`Rs.${(item.price * item.quantity).toFixed(2)}`, 170, y);
            y += 7;
        });

        doc.line(20, y, 190, y);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Amount: Rs.${total.toFixed(2)}`, 170, y + 10, { align: 'right' });

        // Final Footer
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150);
        doc.text('Thank you for shopping with us! Computer generated receipt.', 105, 280, { align: 'center' });

        doc.save(`${orderId}_Receipt.pdf`);
    };

    /* 
     * SHOP OWNER WHATSAPP NOTIFIER
     */
    const sendWhatsAppToOwner = (orderId, total, items) => {
        const itemText = items.map(i => `${i.quantity}x ${i.name}`).join('%0A');
        const message = `*NEW ORDER RECEIVED*%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${userDetails.name}%0A*Phone:* ${userDetails.phone}%0A*Address:* ${userDetails.address}%0A%0A*Items:*%0A${itemText}%0A%0A*Total Amount:* ₹${total.toFixed(2)}%0A*Status:* Payment Pending (UTR Proof Provided)%0A%0A_Please verify in bank account_`;

        const whatsappUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    /* 
     * UTR VERIFICATION SIMULATOR
     */
    const handleVerifyUTR = () => {
        if (utr.length !== 12) {
            alert("Please enter a valid 12-digit UTR/Transaction ID");
            return;
        }

        setIsVerifying(true);
        setVerificationStep(1);

        const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;

        // Fake verification delay for professional feel
        setTimeout(() => setVerificationStep(2), 1500);
        setTimeout(() => setVerificationStep(3), 3000);
        setTimeout(() => {
            downloadReceipt(orderId, totalAmount, cart);
            sendWhatsAppToOwner(orderId, totalAmount, cart);
            placeOrder();
            navigate('/success');
        }, 4500);
    };

    /* 
     * PAGE RENDER
     */
    return (
        <div className="checkout-page-container payment-page-manual animate-fade-in">
            <div className="payment-grid-manual">

                {/* Left Side: Summary Bill */}
                <div className="manual-bill-container glass-panel">
                    <div className="bill-manual-header">
                        <Receipt size={22} color="#008000" />
                        <h3>Order Summary</h3>
                        <span className="bill-manual-date">{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="bill-manual-items">
                        {cart.map(item => (
                            <div key={item.id} className="bill-manual-row">
                                <span className="item-qty-manual">{item.quantity}x</span>
                                <span className="item-name-manual">{item.name}</span>
                                <span className="item-price-manual">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bill-manual-divider"></div>

                    <div className="bill-manual-total">
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Delivery</span>
                            <span className="free-manual">FREE</span>
                        </div>
                        <div className="grand-total-manual">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="manual-customer-card">
                        <p><strong>Deliver to:</strong></p>
                        <p>{userDetails.name}</p>
                        <p>{userDetails.phone}</p>
                        <p className="addr-manual">{userDetails.address}</p>
                    </div>
                </div>

                {/* Right Side: Payment Hub */}
                <div className="manual-pay-hub">
                    <h2 className="hub-title-manual">Complete Payment</h2>

                    <div className="hub-card-manual glass-panel">
                        {isVerifying ? (
                            <div className="manual-loader-overlay">
                                <div className="loader-box-manual">
                                    {verificationStep < 3 ? (
                                        <Loader2 className="manual-spin animate-spin" size={40} />
                                    ) : (
                                        <CheckCircle2 color="#008000" size={40} />
                                    )}
                                    <p>
                                        {verificationStep === 1 && "Connecting..."}
                                        {verificationStep === 2 && "Verifying UTR..."}
                                        {verificationStep === 3 && "Success! Processing Order..."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="manual-upi-view">
                                <div className="manual-qr-box">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`}
                                        alt="Scan QR"
                                    />
                                    <p>Scan ₹{totalAmount.toFixed(2)} to Pay</p>
                                </div>

                                {/* Mobile Only Instant Pay Button */}
                                <div className="mobile-only-manual">
                                    <a href={upiLink} className="intent-btn-manual">
                                        Open Payment App <ChevronRight size={18} />
                                    </a>
                                </div>

                                <div className="manual-utr-form">
                                    <label>Enter 12-digit UTR/Transaction ID</label>
                                    <input
                                        type="text"
                                        placeholder="Transaction ID (12 digits)"
                                        maxLength={12}
                                        value={utr}
                                        onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
                                    />
                                    <p className="help-text">Found in your Bank Message/UPI History after payment</p>
                                </div>

                                <button
                                    className="manual-verify-btn"
                                    onClick={handleVerifyUTR}
                                    disabled={utr.length !== 12}
                                >
                                    Verify & Confirm Order
                                </button>

                                {/* Payment Help / Fallback Section */}
                                <div className="payment-help-section">
                                    <h4>Facing Payment Issues?</h4>
                                    <ul>
                                        <li><strong>Bank Limit Error?</strong> Try using a different UPI App (PhonePe, GPay, or Paytm).</li>
                                        <li><strong>Payment Failed?</strong> Ensure you have sufficient balance and try again.</li>
                                        <li><strong>Need Help?</strong> Click below to chat with us.</li>
                                    </ul>
                                    <a
                                        href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=I'm%20facing%20an%20issue%20with%20payment%20for%20my%20order.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="payment-wa-help-btn"
                                    >
                                        Chat for Payment Support
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="manual-trust-tag">
                        <ShieldCheck size={16} />
                        <span>Direct Bank-to-Bank Secure Payment</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;
