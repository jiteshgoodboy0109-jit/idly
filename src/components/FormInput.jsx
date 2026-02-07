import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';
import '../styles/FormInput.css';

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, error, maxLength, ...props }) => {

    // Determine icon based on field name (simple helper)
    const getIcon = () => {
        if (name === 'name') return <User size={18} />;
        if (name === 'phone') return <Phone size={18} />;
        if (name === 'address') return <MapPin size={18} />;
        return null;
    };

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <div className="form-input-wrapper">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`form-input ${error ? 'error' : ''}`}
                    maxLength={maxLength}
                    {...props}
                />
                <div className="input-icon">
                    {getIcon()}
                </div>
            </div>
            {error && (
                <span className="form-error-text">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormInput;
