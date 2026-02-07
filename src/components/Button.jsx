import React from 'react';
import '../styles/Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', style, className = '', disabled, ...props }) => {
    const variantClass = `btn-${variant}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${variantClass} ${className}`}
            disabled={disabled}
            style={style} // Keep style prop for overrides if absolutely needed
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
