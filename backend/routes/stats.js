const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT COUNT(*) as count FROM users');
        const [products] = await db.execute('SELECT COUNT(*) as count FROM products');
        const [orders] = await db.execute('SELECT COUNT(*) as count FROM orders');
        const [revenue] = await db.execute('SELECT SUM(total_amount) as total FROM orders');

        res.json({
            users: users[0].count,
            products: products[0].count,
            orders: orders[0].count,
            revenue: revenue[0].total || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
