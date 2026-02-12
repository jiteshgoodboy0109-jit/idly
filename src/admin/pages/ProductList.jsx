import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import '../../styles/Admin.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
                await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${adminInfo.token}`,
                    },
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
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
