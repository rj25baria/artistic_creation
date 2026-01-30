const express = require('express');
const router = express.Router();
const { readProducts, writeProducts, readUsers } = require('../db_local');
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
        const products = readProducts();
        const users = readUsers();
        
        // Join with seller info
        const productsWithSeller = products.map(p => {
            const seller = users.find(u => u.id == p.seller_id);
            return {
                ...p,
                seller_name: seller ? seller.username : 'Unknown'
            };
        });
        
        // Sort by created_at DESC
        productsWithSeller.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        res.json(productsWithSeller);
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
        const products = readProducts();
        
        const newProduct = {
            id: products.length + 1,
            seller_id: parseInt(seller_id),
            name,
            description,
            price: parseFloat(price),
            image_url,
            category,
            created_at: new Date()
        };
        
        products.push(newProduct);
        writeProducts(products);
        
        res.json({ success: true, message: 'Product added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding product' });
    }
});

module.exports = router;
