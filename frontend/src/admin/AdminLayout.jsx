import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import '../styles/Admin.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Protected routes are handled by AdminRoute, but we keep this as extra safety
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (!user.isAdmin) {
                navigate('/admin/login');
            }
        } else {
            navigate('/admin/login');
        }
    }, [navigate]);

    const logoutHandler = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userInfo');
            navigate('/admin/login');
        }
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={`admin-nav-link ${isActive('/admin/dashboard')}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" className={`admin-nav-link ${isActive('/admin/products')}`}>
                        <Package size={20} /> Products
                    </Link>
                    <Link to="/admin/orders" className={`admin-nav-link ${isActive('/admin/orders')}`}>
                        <ShoppingBag size={20} /> Orders
                    </Link>
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={logoutHandler} className="logout-btn">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
