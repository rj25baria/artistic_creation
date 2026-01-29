<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$sql = "SELECT p.*, u.username as seller_name FROM products p LEFT JOIN users u ON p.seller_id = u.id ORDER BY p.created_at DESC";
$result = mysqli_query($conn, $sql);

$products = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }
}

echo json_encode($products);
?>