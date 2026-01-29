<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $seller_id = $_POST['seller_id'] ?? 0;
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? 0;
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';

    // Handle Image Upload
    $image_url = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $target_dir = "../img/uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        // Rename if exists to avoid overwrite (simple timestamp prefix)
        if (file_exists($target_file)) {
             $target_file = $target_dir . time() . "_" . basename($_FILES["image"]["name"]);
        }
        
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Store relative path
            $image_url = "img/uploads/" . basename($target_file);
        }
    }

    $sql = "INSERT INTO products (seller_id, name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "issdss", $seller_id, $name, $description, $price, $image_url, $category);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Product added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding product: ' . mysqli_error($conn)]);
    }
}
?>