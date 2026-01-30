const express = require('express');
const router = express.Router();
const { readOrders, writeOrders } = require('../db_local');

// Place Order
router.post('/', async (req, res) => {
    const { user_id, items, total_amount } = req.body;

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    try {
        const orders = readOrders();
        
        const newOrder = {
            id: orders.length + 1,
            user_id,
            total_amount,
            status: 'pending',
            created_at: new Date(),
            items: items // Embedding items directly
        };
        
        orders.push(newOrder);
        writeOrders(orders);

        res.json({ success: true, message: 'Order placed successfully', order_id: newOrder.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
});

// Get Orders
router.get('/', async (req, res) => {
    const userId = req.query.user_id;
    
    try {
        let orders = readOrders();
        
        if (userId) {
            orders = orders.filter(o => o.user_id == userId);
        }
        
        // Sort by created_at DESC
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
