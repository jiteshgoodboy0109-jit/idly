import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin.css'; // We will create this

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        // UI-only mode - mock authentication
        try {
            // Simulate a brief loading delay for realism
            await new Promise(resolve => setTimeout(resolve, 500));

            // Create mock admin data
            const mockAdminData = {
                _id: 'mock-admin-123',
                name: 'Admin User',
                email: email,
                isAdmin: true,
                token: 'mock-token-' + Date.now()
            };

            // Store in localStorage
            localStorage.setItem('adminInfo', JSON.stringify(mockAdminData));

            // Redirect to dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="glass-panel admin-login-box">
                <h2>Admin Panel</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
