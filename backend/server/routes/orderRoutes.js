import express from 'express';
import { addOrderItems, getOrderStats } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems);
router.route('/stats').get(getOrderStats);

export default router;
