import express from 'express';
import { addOrderItems, getOrderStats, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getOrders);
router.route('/stats').get(getOrderStats);
router.route('/:id/status').put(updateOrderStatus);

export default router;
