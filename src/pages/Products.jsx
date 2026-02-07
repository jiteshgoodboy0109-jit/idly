import React from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';
import '../styles/ProductPage.css';

import banner1 from '../assets/banner1.png';

const Products = () => {
    const { addToCart } = useShop();

    return (
        <div className="product-page">
            <div className="product-page-container">
                {/* Single Top Banner */}
                <div className="header-banner">
                    <img src={banner1} alt="Store Banner" className="banner-image" />
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
