import express from 'express';
import Contact from '../models/contactModel.js';

const router = express.Router();

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contact = new Contact({
            name,
            phone,
            message,
        });

        const createdContact = await contact.save();
        res.status(201).json(createdContact);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});

export default router;
