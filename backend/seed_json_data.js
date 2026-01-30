const { writeProducts } = require('./db_local');

const products = [
    {
        id: 1,
        seller_id: 1,
        name: 'Vignaharta Wall Art',
        price: 189,
        old_price: 250,
        category: 'spritual',
        image_url: 'img/product_1 (2).png',
        rating: 4.4,
        description: 'Beautiful Vignaharta Wall Art',
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        seller_id: 1,
        name: 'Wall Hand-Decoreted Mirror',
        price: 399,
        old_price: 500,
        category: 'wall-decor',
        image_url: 'img/product_2.jpeg',
        rating: 4.5,
        description: 'Hand-decorated mirror for wall',
        created_at: new Date().toISOString()
    },
    {
        id: 3,
        seller_id: 1,
        name: 'Buddha Meditation Canvas',
        price: 499,
        old_price: 650,
        category: 'spritual',
        image_url: 'img/product_3.png',
        rating: 4.2,
        description: 'Serene Buddha meditation canvas',
        created_at: new Date().toISOString()
    },
    {
        id: 4,
        seller_id: 1,
        name: 'Elegant Key Holder',
        price: 264,
        old_price: 299,
        category: 'key-holders',
        image_url: 'img/product_4.png',
        rating: 4.9,
        description: 'Elegant key holder for home',
        created_at: new Date().toISOString()
    },
    {
        id: 5,
        seller_id: 1,
        name: 'Spritual Abstract Art',
        price: 156,
        old_price: 199,
        category: 'spritual',
        image_url: 'img/product_5.png',
        rating: 4.5,
        description: 'Abstract spiritual art piece',
        created_at: new Date().toISOString()
    },
    {
        id: 6,
        seller_id: 1,
        name: 'Lord Shiva Meditation Canvas',
        price: 199,
        old_price: 299,
        category: 'spritual',
        image_url: 'img/product_6.png',
        rating: 4.3,
        description: 'Lord Shiva meditation canvas',
        created_at: new Date().toISOString()
    },
    {
        id: 7,
        seller_id: 1,
        name: 'Royal Trunk Lights',
        price: 299,
        old_price: 450,
        category: 'decor',
        image_url: 'img/product_7.png',
        rating: 4.3,
        description: 'Royal trunk lights for decor',
        created_at: new Date().toISOString()
    },
    {
        id: 8,
        seller_id: 1,
        name: 'Mandala Bloom Wall Art',
        price: 650,
        old_price: 1100,
        category: 'wall-decor',
        image_url: 'img/product_13.png',
        rating: 4.6,
        description: 'Mandala bloom wall art',
        created_at: new Date().toISOString()
    },
    {
        id: 9,
        seller_id: 1,
        name: 'Color Bloom Box Set',
        price: 350,
        old_price: 650,
        category: 'table-decor',
        image_url: 'img/product_9 (2).png',
        rating: 4.2,
        description: 'Color bloom box set',
        created_at: new Date().toISOString()
    },
    {
        id: 10,
        seller_id: 1,
        name: 'Textured Basket',
        price: 400,
        old_price: 500,
        category: 'decor',
        image_url: 'img/product_10.png',
        rating: 5.2,
        description: 'Textured basket for storage',
        created_at: new Date().toISOString()
    },
    {
        id: 11,
        seller_id: 1,
        name: 'Luminous Tree of Life Wall Art',
        price: 800,
        old_price: 1400,
        category: 'wall-decor',
        image_url: 'img/product_11.png',
        rating: 5.3,
        description: 'Luminous Tree of Life wall art',
        created_at: new Date().toISOString()
    },
    {
        id: 12,
        seller_id: 1,
        name: 'FolkArt Key Keeper',
        price: 999,
        old_price: 1400,
        category: 'key-holders',
        image_url: 'img/product_12.png',
        rating: 4.3,
        description: 'FolkArt key keeper',
        created_at: new Date().toISOString()
    }
];

writeProducts(products);
console.log('Products seeded successfully');
