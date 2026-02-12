import React from 'react';
import '../../styles/Admin.css';

const Dashboard = () => {
    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Dashboard</h1>
            </header>
            <div className="dashboard-stats">
                <div className="stat-card glass-panel">
                    <h3>Total Sales</h3>
                    <p className="stat-value">₹0</p>
                </div>
                <div className="stat-card glass-panel">
                    <h3>Total Orders</h3>
                    <p className="stat-value">0</p>
                </div>
                <div className="stat-card glass-panel">
                    <h3>Products</h3>
                    <p className="stat-value">0</p>
                </div>
            </div>
            {/* Charts can be added here later */}
            <div className="dashboard-recent glass-panel">
                <h3>Recent Activity</h3>
                <p>No recent activity</p>
            </div>
        </div>
    );
};

export default Dashboard;
