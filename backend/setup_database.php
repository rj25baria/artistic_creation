<?php
require_once 'config.php';

// Create connection without DB name first to ensure DB exists
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create Database
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully\n";
} else {
    echo "Error creating database: " . mysqli_error($conn) . "\n";
}

// Select Database
mysqli_select_db($conn, DB_NAME);

// Users Table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('buyer', 'seller', 'admin') DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if (mysqli_query($conn, $sql)) echo "Table users created successfully\n";
else echo "Error creating table users: " . mysqli_error($conn) . "\n";

// Products Table
$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    seller_id INT(6) UNSIGNED,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    image_url VARCHAR(255),
    category VARCHAR(50),
    rating DECIMAL(2, 1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
)";
if (mysqli_query($conn, $sql)) echo "Table products created successfully\n";
else echo "Error creating table products: " . mysqli_error($conn) . "\n";

// Orders Table
$sql = "CREATE TABLE IF NOT EXISTS orders (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6) UNSIGNED,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";
if (mysqli_query($conn, $sql)) echo "Table orders created successfully\n";
else echo "Error creating table orders: " . mysqli_error($conn) . "\n";

// Order Items Table
$sql = "CREATE TABLE IF NOT EXISTS order_items (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT(6) UNSIGNED,
    product_id INT(6) UNSIGNED,
    quantity INT(6) UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)";
if (mysqli_query($conn, $sql)) echo "Table order_items created successfully\n";
else echo "Error creating table order_items: " . mysqli_error($conn) . "\n";

// Insert some dummy data if empty
$check_users = mysqli_query($conn, "SELECT * FROM users");
if (mysqli_num_rows($check_users) == 0) {
    // Default Admin
    $password = password_hash("admin123", PASSWORD_DEFAULT);
    mysqli_query($conn, "INSERT INTO users (username, email, password, role) VALUES ('Admin', 'admin@artistic.com', '$password', 'admin')");
    
    // Default Seller
    $password = password_hash("seller123", PASSWORD_DEFAULT);
    mysqli_query($conn, "INSERT INTO users (username, email, password, role) VALUES ('Seller One', 'seller@artistic.com', '$password', 'seller')");
    
    echo "Dummy users inserted\n";
}

mysqli_close($conn);
?>