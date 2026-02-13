import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import '../../styles/Admin.css';

const ProductList = () => {
    // Mock product data for UI-only mode
    const [products, setProducts] = useState([
        {
            _id: '1',
            name: 'Premium Idly Maavu (1 kg)',
            price: 120,
            stock: 150,
            category: 'Idly Maavu',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop'
        },
        {
            _id: '2',
            name: 'Organic Dosa Maavu (500g)',
            price: 85,
            stock: 200,
            category: 'Dosa Maavu',
            image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop'
        },
        {
            _id: '3',
            name: 'Special Idly Maavu (2 kg)',
            price: 220,
            stock: 75,
            category: 'Idly Maavu',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop'
        },
        {
            _id: '4',
            name: 'Ragi Dosa Maavu (1 kg)',
            price: 140,
            stock: 120,
            category: 'Dosa Maavu',
            image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop'
        },
        {
            _id: '5',
            name: 'Wheat Dosa Maavu (500g)',
            price: 95,
            stock: 180,
            category: 'Dosa Maavu',
            image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop'
        }
    ]);
    const navigate = useNavigate();

    // No API calls needed in UI-only mode
    // const fetchProducts = async () => {
    //     try {
    //         const res = await fetch('/api/products');
    //         const data = await res.json();
    //         setProducts(data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // UI-only mode - just remove from state
            setProducts(products.filter(p => p._id !== id));
            alert('Product deleted (UI-only mode)');
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Products</h1>
                <Link to="/admin/products/new" className="add-btn">
                    <Plus size={20} /> Add Product
                </Link>
            </header>
            <div className="glass-panel">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.category}</td>
                                <td>
                                    <Link to={`/admin/products/edit/${product._id}`} className="action-btn edit-btn">
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(product._id)}
                                        className="action-btn delete-btn"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
