import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Phone } from 'lucide-react';
import '../styles/BottomNav.css';

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
                <Home size={24} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
                <Info size={24} />
                <span>About</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
                <Phone size={24} />
                <span>Contact</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
