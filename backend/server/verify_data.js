import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const verifyData = async () => {
    try {
        await connectDB();

        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();

        console.log(`\n--- Verification Results ---`);
        console.log(`Products in DB: ${productCount}`);
        console.log(`Users in DB:    ${userCount}`);
        console.log(`Orders in DB:   ${orderCount}`);
        console.log(`--------------------------\n`);

        if (productCount === 0 || userCount === 0) {
            console.log('WARNING: Data missing!');
        } else {
            console.log('SUCCESS: Data found in local database.');
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

verifyData();
