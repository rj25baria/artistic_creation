const express = require('express');
const router = express.Router();
const { readUsers, readProducts, readOrders } = require('../db_local');

router.get('/', async (req, res) => {
    try {
        const users = readUsers();
        const products = readProducts();
        const orders = readOrders();
        
        const revenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

        res.json({
            users: users.length,
            products: products.length,
            orders: orders.length,
            revenue: revenue
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
