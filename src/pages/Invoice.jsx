import jsPDF from 'jspdf';
import { SHOP_CONFIG } from '../config';

/**
 * Generate and download a PDF invoice/receipt
 * @param {string} orderId - Unique order identifier
 * @param {number} total - Total order amount
 * @param {Array} items - Array of cart items
 * @param {Object} userDetails - Customer information
 */
export const generateInvoice = (orderId, total, items, userDetails) => {
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
    doc.text(`PAYMENT STATUS: Loading... (Receipt Uploaded)`, 20, 55);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    // Customer Details Section
    doc.text(`Customer: ${userDetails.name}`, 20, 65);
    doc.text(`Phone: ${userDetails.phone}`, 20, 70);
    doc.text(`Address: ${userDetails.address}`, 20, 75);

    // Items Table Header
    doc.line(20, 80, 190, 80);
    doc.text('Item', 20, 85);
    doc.text('Qty', 140, 85);
    doc.text('Price', 170, 85);
    doc.line(20, 88, 190, 88);

    // Items List
    let y = 95;
    items.forEach(item => {
        doc.text(item.name, 20, y);
        doc.text(item.quantity.toString(), 140, y);
        doc.text(`Rs.${(item.price * item.quantity).toFixed(2)}`, 170, y);
        y += 7;
    });

    // Total Amount
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs.${total.toFixed(2)}`, 170, y + 10, { align: 'right' });

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150);
    doc.text('Thank you for shopping with us! Receipt proof attached.', 105, 280, { align: 'center' });

    // Download PDF
    doc.save(`${orderId}_Receipt.pdf`);
};
