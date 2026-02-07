import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in">
            <div className="container footer-content">
                <span className="footer-brand">Annapoorani Foods</span>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <p className="footer-blessing">"Served with Love & Devotion"</p>
            </div>
        </footer>
    );
};

export default Footer;
