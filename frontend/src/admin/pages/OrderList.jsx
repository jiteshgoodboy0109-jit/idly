import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import '../../styles/Admin.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
            setFilteredOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = orders;
        if (statusFilter !== 'All') {
            result = result.filter(o => o.status === statusFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(o =>
                o._id.toLowerCase().includes(term) ||
                (o.shippingAddress?.name || '').toLowerCase().includes(term) ||
                (o.shippingAddress?.phone || '').includes(term)
            );
        }
        setFilteredOrders(result);
    }, [searchTerm, statusFilter, orders]);

    const handleStatusUpdate = async (id, newStatus) => {
        if (!window.confirm(`Update order status to ${newStatus}?`)) return;

        try {
            const res = await fetch(`/api/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                fetchOrders(); // Refresh list
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <div>
                    <h1>Order Management</h1>
                    <p>View and manage customer orders</p>
                </div>
            </div>

            {/* Filters */}
            <div className="admin-toolbar glass-panel">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Name, Phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <Filter size={18} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="data-table-container glass-panel">
                {loading ? (
                    <div className="loading-state">Loading orders...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order._id}>
                                    <td className="font-mono text-sm">{order._id.substring(0, 8)}...</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="customer-cell">
                                            <span className="font-bold">{order.shippingAddress?.name}</span>
                                            <span className="text-xs text-gray-500">{order.shippingAddress?.phone}</span>
                                        </div>
                                    </td>
                                    <td className="font-bold">₹{order.totalPrice}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {/* Quick Status Actions */}
                                            {order.status === 'Processing' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                                                    className="icon-btn text-blue-600"
                                                    title="Mark as Shipped"
                                                >
                                                    <Truck size={18} />
                                                </button>
                                            )}
                                            {order.status === 'Shipped' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                                    className="icon-btn text-green-600"
                                                    title="Mark as Delivered"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            {/* Placeholder for View Details Modal if needed later */}
                                            {/* <button className="icon-btn text-gray-600">
                                                <Eye size={18} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderList;
