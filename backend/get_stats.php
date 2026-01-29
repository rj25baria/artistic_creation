<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$response = [
    'users' => 0,
    'sellers' => 0,
    'orders' => 0,
    'revenue' => 0
];

// Total Users
$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM users WHERE role='buyer'");
$row = mysqli_fetch_assoc($result);
$response['users'] = $row['count'];

// Total Sellers
$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM users WHERE role='seller'");
$row = mysqli_fetch_assoc($result);
$response['sellers'] = $row['count'];

// Total Orders
$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM orders");
$row = mysqli_fetch_assoc($result);
$response['orders'] = $row['count'];

// Total Revenue
$result = mysqli_query($conn, "SELECT SUM(total_amount) as total FROM orders WHERE status != 'cancelled'");
$row = mysqli_fetch_assoc($result);
$response['revenue'] = $row['total'] ?? 0;

echo json_encode($response);
?>