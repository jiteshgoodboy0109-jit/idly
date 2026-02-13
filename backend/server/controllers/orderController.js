import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            totalPrice,
            // paymentMethod, // Future use
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        }

        const order = new Order({
            orderItems,
            shippingAddress,
            totalPrice,
            isPaid: true, // Since we manually verify payment
            paidAt: Date.now(),
            status: 'Processing'
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Order creation failed: ' + error.message });
    }
};

// @desc    Get order statistics (For Admin Dashboard)
// @route   GET /api/orders/stats
// @access  Public/Admin
const getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        // Calculate total sales
        const orders = await Order.find();
        const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

        // Count distinct users (based on unique names for now if guest)
        const uniqueCustomers = new Set(orders.map(o => o.shippingAddress.name)).size;

        res.json({
            totalOrders,
            totalSales,
            uniqueCustomers,
            salesData: [ // Mock data for chart if needed, or real aggregation
                { name: 'Jan', sales: 4000 },
                { name: 'Feb', sales: 3000 },
                { name: 'Mar', sales: totalSales },
            ]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};

// @desc    Get all orders (For Admin Reporting)
// @route   GET /api/orders
// @access  Public/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
};

export { addOrderItems, getOrderStats, getOrders, updateOrderStatus };
