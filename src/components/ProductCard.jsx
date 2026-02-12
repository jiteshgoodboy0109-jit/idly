import { useState } from 'react';
import '../styles/ProductPage.css';

/**
 * ProductCard Component
 * Reusable card for each product
 */
const ProductCard = ({ product, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState(product.unit); // Allow unit selection if needed

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, unit }, quantity);
    };

    return (
        <div className="product-card">
            {/* Discount Badge */}
            <div className="discount-badge">Save {product.discount}%</div>

            {/* Product Image */}
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>

            {/* Product Details */}
            <h3 className="product-name">{product.name}</h3>

            <div className="product-pricing">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
            </div>

            {/* Variant Selector - Static for now */}
            <div className="variant-selector">
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value={product.unit}>{product.unit}</option>
                </select>
            </div>

            {/* Actions: Quantity & Add Button */}
            <div className="product-actions">
                <div className="quantity-selector">
                    <button onClick={handleDecrement}>−</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cart-icon-btn">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.251 2.251 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
