<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$user_id = $_GET['user_id'] ?? 0;
$role = $_GET['role'] ?? 'buyer';

$orders = [];

if ($role === 'admin') {
    $sql = "SELECT o.*, u.username as buyer_name FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $orders[] = $row;
        }
    }
} elseif ($role === 'seller') {
    $sql = "SELECT DISTINCT o.*, u.username as buyer_name FROM orders o 
            JOIN order_items oi ON o.id = oi.order_id 
            JOIN products p ON oi.product_id = p.id 
            JOIN users u ON o.user_id = u.id
            WHERE p.seller_id = ? ORDER BY o.created_at DESC";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
} else {
    // Buyer
    $sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
}

echo json_encode($orders);
?>