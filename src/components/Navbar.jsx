import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import logo from '../assets/logo1.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const { cart } = useShop();

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo-icon">
                        <img src={logo} alt="Gliffy Foods Logo" className="navbar-logo-img" />
                    </div>
                    <span>Gliffy Foods</span>
                </Link>

                <Link to="/cart" className="navbar-cart-link">
                    <ShoppingBasket size={24} />
                    {cart.length > 0 && (
                        <span className="cart-badge animate-fade-in">
                            {cart.length}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
