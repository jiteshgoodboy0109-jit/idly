import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../config';
import '../styles/ProductPage.css';

const Products = () => {
    const { addToCart } = useShop();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading products...</div>;
    }

    return (
        <div className="product-page">
            <div className="product-page-container">
                {/* Single Top Banner */}
                <div className="header-banner">
                    <img src={SHOP_CONFIG.banner} alt="Store Banner" className="banner-image" />
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id || product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
