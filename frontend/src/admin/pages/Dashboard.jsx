import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    RadialBarChart, RadialBar, Legend
} from 'recharts';
import { ShoppingBag, CreditCard, Package, TrendingUp, Download, Users } from 'lucide-react';
import * as XLSX from 'xlsx';
import '../../styles/Admin.css';

const Dashboard = () => {
    // Mock data for UI-only mode
    const [stats, setStats] = useState({
        totalSales: 245680,
        totalOrders: 1247,
        totalItemsSold: 3891,
        usersCount: 892,
        salesData: [
            { Month: 'Jan', Sales: 18500 },
            { Month: 'Feb', Sales: 22300 },
            { Month: 'Mar', Sales: 19800 },
            { Month: 'Apr', Sales: 25600 },
            { Month: 'May', Sales: 28900 },
            { Month: 'Jun', Sales: 31200 },
            { Month: 'Jul', Sales: 29500 },
            { Month: 'Aug', Sales: 33800 },
            { Month: 'Sep', Sales: 27400 },
            { Month: 'Oct', Sales: 35200 },
            { Month: 'Nov', Sales: 38900 },
            { Month: 'Dec', Sales: 42500 }
        ]
    });

    // Fetch real data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products for stats
                const res = await fetch('/api/products');
                const products = await res.json();

                // Calculate real stats
                const totalProducts = products.length;
                // Calculate total potential revenue (Inventory Value)
                const inventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

                setStats(prev => ({
                    ...prev,
                    totalItemsSold: totalProducts, // Using this field for Total Products count
                    totalSales: inventoryValue,
                    usersCount: 0, // Placeholder until user API is connected
                    totalOrders: 0 // Placeholder until order API is connected
                }));
            } catch (e) {
                console.error("Error fetching dashboard data:", e);
            }
        };
        fetchData();
    }, []);

    const downloadReport = () => {
        if (!stats.salesData || stats.salesData.length === 0) return alert("No data to export");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(stats.salesData);
        XLSX.utils.book_append_sheet(wb, ws, "Monthly Sales");
        XLSX.writeFile(wb, "Monthly_Sales_Report.xlsx");
    };

    // Device Data (Mock for Visuals as requested)
    const deviceData = [
        { name: 'Desktop', uv: 31.47, fill: '#8b5cf6' },
        { name: 'Mobile', uv: 26.69, fill: '#f97316' },
        { name: 'Tablets', uv: 15.69, fill: '#10b981' },
    ];

    return (
        <div className="performance-dashboard">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button onClick={downloadReport} className="admin-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <Download size={18} /> Download Report
                </button>
            </div>

            {/* Top Grid: Performance Wave & Device Radial */}
            <div className="dashboard-grid-top">
                {/* 1. Performance Wave Chart (Real Sales Data) */}
                <div className="admin-card">
                    <div className="card-header">
                        <div className="card-title">Performance</div>
                    </div>
                    <div style={{ height: '300px' }}>
                        {stats.salesData && stats.salesData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.salesData}>
                                    <defs>
                                        <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Sales"
                                        stroke="#7c3aed"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorWave)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                <TrendingUp size={40} opacity={0.5} style={{ marginRight: '10px' }} />
                                <span>No Sales Data Available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Sessions By Device (Radial Chart - Visual Mock) */}
                <div className="admin-card">
                    <div className="card-header">
                        <div className="card-title">Sessions By Device</div>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Values</span>
                    </div>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="30%"
                                outerRadius="100%"
                                data={deviceData}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar minAngle={15} background clockWise={true} dataKey="uv" />
                                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Middle Row: Stats Cards */}
            <div className="stats-row">
                <div className="stat-box">
                    <div className="stat-icon-wrapper bg-blue-light">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-number">{stats.totalOrders}</div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon-wrapper bg-orange-light">
                        <Package size={24} />
                    </div>
                    <div className="stat-label">Total Products</div>
                    <div className="stat-number">{stats.totalItemsSold || 0}</div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon-wrapper bg-purple-light">
                        <CreditCard size={24} />
                    </div>
                    <div className="stat-label">Inventory Value</div>
                    <div className="stat-number">₹{stats.totalSales?.toLocaleString()}</div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon-wrapper bg-green-light">
                        <Users size={24} />
                    </div>
                    <div className="stat-label">Customers</div>
                    <div className="stat-number">{stats.usersCount}</div>
                </div>
            </div>

            {/* Bottom: Daily Overview (Users/Sales) */}
            <div className="dashboard-grid-bottom">
                <div className="admin-card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-header">
                        <div className="card-title">Daily Overview</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '150px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{stats.usersCount}</h3>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Users</span>
                        </div>

                        {/* Circular Progress Visual */}
                        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="60" cy="60" r="50" stroke="#f3e8ff" strokeWidth="10" fill="transparent" />
                                <circle cx="60" cy="60" r="50" stroke="#7c3aed" strokeWidth="10" fill="transparent" strokeDasharray="314" strokeDashoffset="100" />
                            </svg>
                            <span style={{ position: 'absolute', fontWeight: 700, color: '#7c3aed', fontSize: '0.9rem' }}>USERS</span>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{stats.totalOrders}</h3>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Orders</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
