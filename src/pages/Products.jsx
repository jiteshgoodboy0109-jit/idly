import React from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../config';
import '../styles/ProductPage.css';

const Products = () => {
    const { addToCart } = useShop();

    return (
        <div className="product-page">
            <div className="product-page-container">
                {/* Single Top Banner */}
                <div className="header-banner">
                    <img src={SHOP_CONFIG.banner} alt="Store Banner" className="banner-image" />
                </div>

                <div className="products-grid">
                    {PRODUCTS_DATA.map((product) => (
                        <ProductCard
                            key={product.id}
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
