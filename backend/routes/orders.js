const express = require('express');
const router = express.Router();
const db = require('../db');

// Place Order
router.post('/', async (req, res) => {
    const { user_id, items, total_amount } = req.body;

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Create Order
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [user_id, total_amount]
        );
        const orderId = orderResult.insertId;

        // Create Order Items
        for (const item of items) {
            await connection.execute(
                'INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.name, item.quantity, item.price]
            );
        }

        await connection.commit();
        res.json({ success: true, message: 'Order placed successfully', order_id: orderId });
    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: 'Error placing order' });
    } finally {
        connection.release();
    }
});

// Get Orders (for specific user or all for admin - simplified here)
router.get('/', async (req, res) => {
    const userId = req.query.user_id;
    
    try {
        let query = 'SELECT * FROM orders ORDER BY created_at DESC';
        let params = [];
        
        if (userId) {
            query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
            params = [userId];
        }
        
        const [orders] = await db.execute(query, params);
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
