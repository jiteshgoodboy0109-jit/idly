import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../config';
import { ShieldCheck, Receipt, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { generateInvoice } from './Invoice';
import '../styles/Payment.css';

/**
 * Payment Page
 * Handles UTR verification, PDF receipt generation, and WhatsApp owner notification.
 * Designed for a premium, manual-style experience with perfect mobile centering.
 */
const Payment = () => {
    const { cart, getCartTotal, placeOrder, userDetails } = useShop();
    const navigate = useNavigate();
    const [receiptFile, setReceiptFile] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStep, setVerificationStep] = useState(0); // 0: input, 1: connecting, 2: checking, 3: success
    const [hasBeenToPaymentApp, setHasBeenToPaymentApp] = useState(false);
    const [showReturnNudge, setShowReturnNudge] = useState(false);
    const [showScreenshotReminder, setShowScreenshotReminder] = useState(false);

    // Detect when user returns from payment app
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && hasBeenToPaymentApp) {
                setShowReturnNudge(true);
                // Auto-scroll to Upload area
                const uploadArea = document.getElementById('receipt-upload-section');
                if (uploadArea) {
                    uploadArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [hasBeenToPaymentApp]);

    // Safety: don't stay here if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    if (cart.length === 0) return null;

    const totalAmount = getCartTotal();

    // Technical "Merchant" Transaction ID
    const trId = `TR-${Date.now()}`;

    // PERFECT SCANNER OPTIMIZATION:
    // Using the most standard UPI URI format accepted by all apps (PhonePe, GPay, Paytm, BHIM)
    const upiLink = `upi://pay?pa=${SHOP_CONFIG.upiId}` +
        `&pn=${encodeURIComponent(SHOP_CONFIG.merchantName)}` +
        `&am=${totalAmount.toFixed(2)}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent('Order ' + trId)}` +
        `&mc=${SHOP_CONFIG.mcc || '5411'}` +
        `&tr=${trId}`;

    // FALLBACK LINK (Person-to-Person style):
    // Removes the 'fixed amount' and 'merchant codes' which often trigger bank security limits
    const fallbackUpiLink = `upi://pay?pa=${SHOP_CONFIG.upiId}&pn=${encodeURIComponent(SHOP_CONFIG.merchantName)}&tn=${encodeURIComponent('Order ' + trId)}`;

    /* 
     * SHOP OWNER WHATSAPP NOTIFIER
     */
    const sendWhatsAppToOwner = (orderId, total, items) => {
        const itemText = items.map(i => `${i.quantity}x ${i.name}`).join('%0A');
        const message = `*NEW ORDER RECEIVED*%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${userDetails.name}%0A*Phone:* ${userDetails.phone}%0A*Address:* ${userDetails.address}%0A%0A*Items:*%0A${itemText}%0A%0A*Total Amount:* ₹${total.toFixed(2)}%0A*Status:* Payment Done (Screenshot Proof in WA)%0A%0A_Note: Customer will attach screenshot in next message_`;

        const whatsappUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleIntentClick = () => {
        setHasBeenToPaymentApp(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReceiptFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /* 
     * RECEIPT VERIFICATION SIMULATOR
     */
    const handleConfirmOrder = () => {
        if (!receiptFile) {
            alert("Please upload the payment receipt screenshot first!");
            return;
        }

        setIsVerifying(true);
        setVerificationStep(1);
        setShowReturnNudge(false);

        const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;

        // Fake verification delay for professional feel
        setTimeout(() => setVerificationStep(2), 1500);
        setTimeout(() => setVerificationStep(3), 3000);
        setTimeout(() => {
            generateInvoice(orderId, totalAmount, cart, userDetails);
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

                                <div className="payment-gates-hub">
                                    {/* Gate 1: Standard Automatic Flow */}
                                    <div className="gate-option gate-standard">
                                        <div className="gate-badge">Recommended</div>
                                        <a
                                            href={upiLink}
                                            className="gate-btn gate-btn-primary"
                                            onClick={handleIntentClick}
                                        >
                                            <ChevronRight size={20} /> Open Payment App
                                        </a>
                                        <p className="gate-note">Fast & Secure via PhonePe/GPay</p>
                                    </div>

                                    <div className="gate-separator">OR</div>

                                    {/* Gate 2: Alternative Bypass Flow */}
                                    <div className="gate-option gate-fallback">
                                        <a
                                            href={fallbackUpiLink}
                                            className="gate-btn gate-btn-outline"
                                            onClick={handleIntentClick}
                                        >
                                            Alternative Pay Link
                                        </a>
                                        <p className="gate-note">Safe bypass if first link shows <strong>"Bank Limit"</strong></p>
                                    </div>
                                </div>

                                {showReturnNudge && (
                                    <div className="return-nudge-manual animate-bounce-subtle">
                                        <div className="nudge-icon">📸</div>
                                        <div className="nudge-text">
                                            <strong>Finished Paying?</strong>
                                            <p>Upload a screenshot of your success screen to confirm!</p>
                                        </div>
                                    </div>
                                )}

                                <div id="receipt-upload-section" className="manual-receipt-form">
                                    <label className="upload-label">Upload Payment Receipt Screenshot</label>

                                    <div className={`upload-dropzone ${receiptFile ? 'has-file' : ''}`}>
                                        <input
                                            type="file"
                                            id="receipt-upload"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden-file-input"
                                        />
                                        <label htmlFor="receipt-upload" className="upload-trigger">
                                            {receiptPreview ? (
                                                <div className="receipt-preview-container">
                                                    <img src={receiptPreview} alt="Receipt Preview" />
                                                    <div className="change-overlay">Change Screenshot</div>
                                                </div>
                                            ) : (
                                                <div className="upload-placeholder">
                                                    <span className="upload-icon">📁</span>
                                                    <span>Click to Upload Screenshot</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    <p className="help-text">Take a screenshot after payment and upload it here.</p>
                                </div>

                                <button
                                    className="manual-verify-btn"
                                    onClick={handleConfirmOrder}
                                    disabled={!receiptFile}
                                >
                                    {receiptFile ? 'Confirm Order' : 'Upload Receipt to Confirm'}
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
