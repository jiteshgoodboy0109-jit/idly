import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Check if user is logged in and is an admin
    if (userInfo && userInfo.isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/admin/login" replace />;
    }
};

export default AdminRoute;
