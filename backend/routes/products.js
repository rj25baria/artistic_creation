const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../img/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.execute(`
            SELECT p.*, u.username as seller_name 
            FROM products p 
            LEFT JOIN users u ON p.seller_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add product
router.post('/', upload.single('image'), async (req, res) => {
    const { seller_id, name, category, price, description } = req.body;
    let image_url = '';

    if (req.file) {
        // Store relative path for frontend usage
        image_url = 'img/uploads/' + req.file.filename;
    }

    try {
        await db.execute(
            'INSERT INTO products (seller_id, name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?, ?)',
            [seller_id, name, description, price, image_url, category]
        );
        res.json({ success: true, message: 'Product added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding product' });
    }
});

module.exports = router;
