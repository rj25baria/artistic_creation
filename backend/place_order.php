<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $user_id = $data['user_id'] ?? 0;
    $items = $data['items'] ?? [];
    $total_amount = $data['total_amount'] ?? 0;

    if (empty($items) || $user_id == 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid order data']);
        exit;
    }

    mysqli_begin_transaction($conn);

    try {
        // Insert Order
        $sql = "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "id", $user_id, $total_amount);
        mysqli_stmt_execute($stmt);
        $order_id = mysqli_insert_id($conn);
        mysqli_stmt_close($stmt);

        // Insert Items
        $sql_item = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        $stmt_item = mysqli_prepare($conn, $sql_item);

        foreach ($items as $item) {
            // Ensure item keys match what frontend sends
            $product_id = $item['id'];
            $quantity = $item['quantity'];
            $price = $item['price'];
            
            mysqli_stmt_bind_param($stmt_item, "iiid", $order_id, $product_id, $quantity, $price);
            mysqli_stmt_execute($stmt_item);
        }
        mysqli_stmt_close($stmt_item);

        mysqli_commit($conn);
        echo json_encode(['success' => true, 'message' => 'Order placed successfully', 'order_id' => $order_id]);

    } catch (Exception $e) {
        mysqli_rollback($conn);
        echo json_encode(['success' => false, 'message' => 'Error placing order: ' . $e->getMessage()]);
    }
}
?>