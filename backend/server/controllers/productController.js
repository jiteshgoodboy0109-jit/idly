import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, stock, weight, originalPrice, discount, unit } = req.body;

        let userId;

        // If generic auth is disabled, find the first admin user
        if (req.user) {
            userId = req.user._id;
        } else {
            const adminUser = await User.findOne({ isAdmin: true });
            if (adminUser) {
                userId = adminUser._id;
            } else {
                // Fallback if no admin exists (should generally not happen if seeded)
                res.status(400);
                throw new Error('No admin user found to associate with product');
            }
        }

        const product = new Product({
            name,
            price,
            user: userId,
            image,
            category,
            stock,
            weight,
            description,
            originalPrice,
            discount,
            unit,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            image,
            category,
            stock,
            weight,
            isActive,
            originalPrice,
            discount,
            unit
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.weight = weight || product.weight;
            product.isActive = isActive !== undefined ? isActive : product.isActive;
            product.originalPrice = originalPrice || product.originalPrice;
            product.discount = discount || product.discount;
            product.unit = unit || product.unit;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};
