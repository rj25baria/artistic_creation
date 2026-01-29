<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $role = $data['role'] ?? 'buyer'; // Default to buyer

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
        exit;
    }

    // Check if email already exists
    $check_sql = "SELECT id FROM users WHERE email = ?";
    $stmt = mysqli_prepare($conn, $check_sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    
    if (mysqli_stmt_num_rows($stmt) > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    mysqli_stmt_close($stmt);

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssss", $username, $email, $hashed_password, $role);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error registering user']);
    }

    mysqli_stmt_close($stmt);
}
?>