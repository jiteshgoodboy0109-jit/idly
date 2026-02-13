import { SHOP_CONFIG } from '../config';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in">
            <div className="container footer-content">
                <span className="footer-brand">{SHOP_CONFIG.footerBrand}</span>
                <p>&copy; {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.</p>
                <p className="footer-blessing">"{SHOP_CONFIG.blessing}"</p>
            </div>
        </footer>
    );
};

export default Footer;
