import React, { useState } from 'react';
import '../styles/Contact.css';
import contactHero from '../assets/contact_hero_v2.png';

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, message }),
            });

            if (res.ok) {
                setStatus({ type: 'success', msg: 'Message sent successfully! We will contact you soon.' });
                setName('');
                setPhone('');
                setMessage('');
            } else {
                const data = await res.json();
                setStatus({ type: 'error', msg: data.message || 'Error sending message' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Server error. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="hero-overlay">
                    <h1></h1>
                    <p>Experience the Warmth of Our Tradition</p>
                </div>
            </div>

            <div className="contact-container">
                <div className="contact-grid">
                    {/* Left Column: Contact Info */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <div className="info-text">
                                <h3>Visit Us</h3>
                                <p>123 Idly Street, South Indian Garden,<br />Delicious Nagar, 600001</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📞</div>
                            <div className="info-text">
                                <h3>Call Us</h3>
                                <p>+91 98765 43210</p>
                                <button className="call-now-btn">Call Now</button>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">⏰</div>
                            <div className="info-text">
                                <h3>Open Hours</h3>
                                <p>Mon - Sun: 7:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-form-section">
                        <div className="form-card">
                            <h2>Send us a Message</h2>
                            <p>We'd love to hear from you!</p>

                            {status.msg && (
                                <div className={`status-msg ${status.type}`}>
                                    {status.msg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="modern-form">
                                <div className="form-input-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label>Your Message</label>
                                    <textarea
                                        placeholder="What's on your mind?"
                                        rows="4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="steam-decoration">
                    <div className="steam-wave"></div>
                    <div className="steam-wave"></div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
