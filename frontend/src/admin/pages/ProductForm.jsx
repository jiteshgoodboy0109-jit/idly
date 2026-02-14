import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/Admin.css';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [weight, setWeight] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`/api/products/${id}`);
                    const data = await res.json();
                    setName(data.name);
                    setPrice(data.price);
                    setImage(data.image);
                    setCategory(data.category);
                    setDescription(data.description);
                    setStock(data.stock);
                    setWeight(data.weight || '');
                } catch (err) {
                    setError('Failed to fetch product');
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            // Note: In fetch, when sending FormData, do NOT set Content-Type header manually.
            // The browser will set it with the boundary automatically.
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const productData = {
            name,
            price,
            image,
            category,
            description,
            stock,
            weight,
        };

        try {
            const url = isEditMode
                ? `/api/products/${id}`
                : '/api/products';

            const method = isEditMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization header removed as backend routes are currently unprotected
                },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                navigate('/admin/products');
            } else {
                const data = await res.json();
                setError(data.message || 'Operation failed');
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
            </header>
            <div className="glass-panel" style={{ maxWidth: '800px' }}>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <div className="image-upload-container">
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter image URL"
                                className="image-url-input"
                                style={{ marginBottom: '10px', display: 'none' }}
                            />
                            <div className="image-preview-box" onClick={() => document.getElementById('image-file').click()}>
                                {image ? (
                                    <img src={image} alt="Product Preview" className="image-preview" />
                                ) : (
                                    <div className="placeholder-text">Click to Upload Image</div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="image-file"
                                onChange={uploadFileHandler}
                                style={{ display: 'none' }}
                            />
                            {uploading && <div className="loading-text">Uploading...</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock Count</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Weight (Optional)</label>
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="e.g. 1 kg"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="admin-btn" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
