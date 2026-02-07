import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import '../styles/CustomerDetails.css';

const CustomerDetails = () => {
    const { userDetails, setUserDetails, cart } = useShop();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    if (cart.length === 0) {
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!userDetails.name.trim()) newErrors.name = 'Name is required.';
        if (!userDetails.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter valid 10-digit number.';
        if (!userDetails.address.trim()) newErrors.address = 'Address is needed.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate('/payment');
        }
    };

    return (
        <div className="container section-padding animate-fade-in details-container">
            <div className="glass-card details-card">
                <h2 className="details-title">
                    Delivery Details
                </h2>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Name / Receiver"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        placeholder="e.g. Anand Kumar"
                        error={errors.name}
                    />

                    <FormInput
                        label="Mobile Number"
                        name="phone"
                        type="tel"
                        value={userDetails.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        error={errors.phone}
                        maxLength="10"
                    />

                    <div className="details-form-group">
                        <label className="details-label">Address</label>
                        <textarea
                            name="address"
                            value={userDetails.address}
                            onChange={handleChange}
                            placeholder="Flat No, Street, Area, City"
                            className={`details-textarea ${errors.address ? 'error' : ''}`}
                        />
                        {errors.address && (
                            <span className="details-error-text">
                                {errors.address}
                            </span>
                        )}
                    </div>

                    <Button type="submit" variant="primary" className="details-submit-btn">
                        Proceed to Payment
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CustomerDetails;
